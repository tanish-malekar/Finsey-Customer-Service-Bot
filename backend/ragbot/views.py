from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
import os
import base64
import json
from pinecone import Pinecone, ServerlessSpec
from langchain_google_vertexai import VertexAIEmbeddings, VertexAI
from langchain_pinecone import PineconeVectorStore
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
from google.cloud import speech
from google.cloud import texttospeech
import io
import threading
import time
from urllib.parse import urljoin, urlparse
import requests
from bs4 import BeautifulSoup
from tqdm import tqdm
from uuid import uuid4

from .models import WebsiteProject, CrawledPage
from .serializers import (
    WebsiteProjectSerializer, 
    CreateWebsiteProjectSerializer,
    ChatRequestSerializer
)

load_dotenv()

# Pinecone setup
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
GCP_PROJECT = os.environ.get("GCP_PROJECT")
GCP_LOCATION = os.environ.get("GCP_LOCATION", "us-central1")
EMBED_MODEL = os.environ.get("EMBED_MODEL", "gemini-embedding-001")
LLM_MODEL = os.environ.get("LLM_MODEL", "gemini-2.5-pro")

pc = Pinecone(api_key=PINECONE_API_KEY)

# LangChain Embeddings (Vertex AI)
embeddings = VertexAIEmbeddings(
    project=GCP_PROJECT,
    location=GCP_LOCATION,
    model_name=EMBED_MODEL
)

# Google Cloud Speech and TTS clients
speech_client = speech.SpeechClient()
tts_client = texttospeech.TextToSpeechClient()

class WebsiteProjectViewSet(ModelViewSet):
    """ViewSet for managing website projects"""
    queryset = WebsiteProject.objects.all()
    serializer_class = WebsiteProjectSerializer
    
    def get_serializer_class(self):
        if self.action == 'create':
            return CreateWebsiteProjectSerializer
        return WebsiteProjectSerializer
    
    def create(self, request, *args, **kwargs):
        """Create a new website project and start crawling"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Create the project
        project = serializer.save()
        project.pinecone_index_name = project.get_pinecone_index_name()
        project.save()
        
        # Start crawling in background thread
        thread = threading.Thread(target=self._crawl_and_index_website, args=(project.id,))
        thread.daemon = True
        thread.start()
        
        return Response(WebsiteProjectSerializer(project).data, status=status.HTTP_201_CREATED)
    
    def _crawl_and_index_website(self, project_id):
        """Background task to crawl and index website"""
        try:
            project = WebsiteProject.objects.get(id=project_id)
            project.status = 'crawling'
            project.save()
            
            # Create Pinecone index
            index_name = project.pinecone_index_name
            try:
                # Check if index exists, if not create it
                if index_name not in pc.list_indexes().names():
                    pc.create_index(
                        name=index_name,
                        dimension=3072,  # Gemini embedding dimension (corrected from 768)
                        metric="cosine",
                        spec=ServerlessSpec(
                            cloud="aws",
                            region="us-east-1"
                        )
                    )
                    # Wait for index to be ready
                    while not pc.describe_index(index_name).status['ready']:
                        time.sleep(1)
                
                index = pc.Index(index_name)
            except Exception as e:
                project.status = 'failed'
                project.error_message = f"Failed to create Pinecone index: {str(e)}"
                project.save()
                return
            
            # Crawl website
            pages = self._crawl_website(project.url, project_id, max_pages=20)
            project.pages_crawled = len(pages)
            project.status = 'indexing'
            project.save()
            
            # Index content
            vectors_created = self._index_content(project, pages, index)
            project.vectors_created = vectors_created
            project.status = 'completed'
            project.save()
            
        except Exception as e:
            project = WebsiteProject.objects.get(id=project_id)
            project.status = 'failed'
            project.error_message = str(e)
            project.save()
    
    def _crawl_website(self, url, project_id, max_pages=1):
        """Crawl a single page and return a list of (url, title, text) tuples."""
        results = []
        
        try:
            resp = requests.get(url, timeout=10, headers={
                'User-Agent': 'Mozilla/5.0 (compatible; WebsiteCrawler/1.0)'
            })
            soup = BeautifulSoup(resp.text, 'html.parser')
            
            # Extract title
            title = soup.find('title')
            title_text = title.get_text().strip() if title else "No Title"
            
            # Extract main content (remove scripts, styles, etc.)
            for script in soup(["script", "style", "nav", "footer", "header"]):
                script.decompose()
            
            text = soup.get_text(separator=" ", strip=True)
            
            # Store in database
            CrawledPage.objects.create(
                project=WebsiteProject.objects.get(id=project_id),
                url=url,
                title=title_text,
                content=text,
                word_count=len(text.split())
            )
            
            results.append((url, title_text, text))
            print(f"✅ Successfully crawled: {url} - {title_text} ({len(text.split())} words)")
                        
        except Exception as e:
            print(f"❌ Failed to crawl {url}: {e}")
                
        return results
    
    def _index_content(self, project, pages, index):
        """Index crawled content in Pinecone"""
        vectors_created = 0
        
        for url, title, text in pages:
            # Split text into chunks
            chunks = self._chunk_text(text, chunk_size=500, overlap=50)
            
            for i, chunk in enumerate(chunks):
                try:
                    # Get embedding
                    vec = embeddings.embed_query(chunk)
                    
                    # Prepare Pinecone upsert
                    vector = {
                        "id": str(uuid4()),
                        "values": vec,
                        "metadata": {
                            "url": url,
                            "title": title,
                            "text": chunk,
                            "project_id": str(project.id)
                        }
                    }
                    
                    # Upsert to Pinecone
                    index.upsert(vectors=[vector])
                    vectors_created += 1
                    
                except Exception as e:
                    print(f"Failed to index chunk {i} from {url}: {e}")
        
        return vectors_created
    
    def _chunk_text(self, text, chunk_size=500, overlap=50):
        """Split text into chunks for embedding."""
        words = text.split()
        chunks = []
        for i in range(0, len(words), chunk_size - overlap):
            chunk = " ".join(words[i:i+chunk_size])
            if chunk:
                chunks.append(chunk)
        return chunks
    
    @action(detail=True, methods=['post'])
    def start_crawling(self, request, pk=None):
        """Manually start crawling for a project"""
        project = self.get_object()
        if project.status == 'pending':
            thread = threading.Thread(target=self._crawl_and_index_website, args=(project.id,))
            thread.daemon = True
            thread.start()
            return Response({"message": "Crawling started"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Project is not in pending state"}, status=status.HTTP_400_BAD_REQUEST)

class RAGAnswerView(APIView):
    """RAG answer view that works with specific project indexes"""
    
    def post(self, request):
        serializer = ChatRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        question = serializer.validated_data['question']
        project_id = serializer.validated_data['project_id']
        
        try:
            # Get the project
            project = WebsiteProject.objects.get(id=project_id)
            
            # Check if project is ready
            if project.status != 'completed':
                return Response({
                    "error": f"Project is not ready. Current status: {project.status}"
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Get the project's Pinecone index
            try:
                index = pc.Index(project.pinecone_index_name)
            except Exception as e:
                return Response({
                    "error": f"Failed to access Pinecone index: {str(e)}"
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            # Create vector store and RAG chain for this project
            vectorstore = PineconeVectorStore(index, embeddings, "text")
            
            # LLM (Gemini via Vertex AI)
            llm = VertexAI(
                project=GCP_PROJECT,
                location=GCP_LOCATION,
                model_name=LLM_MODEL
            )
            
            # RAG Chain
            qa_chain = RetrievalQA.from_chain_type(
                llm=llm,
                chain_type="stuff",
                retriever=vectorstore.as_retriever()
            )
            
            # Get answer
            answer = qa_chain.invoke(question)
            
            return Response({"answer": answer})
            
        except WebsiteProject.DoesNotExist:
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SpeechToTextView(APIView):
    def post(self, request):
        try:
            # Get audio data from request
            audio_data = request.data.get("audio")
            if not audio_data:
                return Response({"error": "No audio data provided."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Decode base64 audio data
            audio_bytes = base64.b64decode(audio_data.split(',')[1] if ',' in audio_data else audio_data)
            
            # Configure audio recognition
            audio = speech.RecognitionAudio(content=audio_bytes)
            config = speech.RecognitionConfig(
                encoding=speech.RecognitionConfig.AudioEncoding.WEBM_OPUS,
                sample_rate_hertz=48000,
                language_code="en-US",
                enable_automatic_punctuation=True,
                model="latest_long"
            )
            
            # Perform speech recognition
            response = speech_client.recognize(config=config, audio=audio)
            
            if not response.results:
                return Response({"error": "No speech detected."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Get the transcribed text
            transcript = response.results[0].alternatives[0].transcript
            
            return Response({"transcript": transcript})
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TextToSpeechView(APIView):
    def post(self, request):
        try:
            text = request.data.get("text")
            if not text:
                return Response({"error": "No text provided."}, status=status.HTTP_400_BAD_REQUEST)
            
            # Configure TTS request
            synthesis_input = texttospeech.SynthesisInput(text=text)
            
            # Configure voice parameters
            voice = texttospeech.VoiceSelectionParams(
                language_code="en-US",
                name="en-US-Neural2-F",
                ssml_gender=texttospeech.SsmlVoiceGender.FEMALE
            )
            
            # Configure audio parameters
            audio_config = texttospeech.AudioConfig(
                audio_encoding=texttospeech.AudioEncoding.MP3,
                speaking_rate=0.9,
                pitch=0.0
            )
            
            # Perform TTS
            response = tts_client.synthesize_speech(
                input=synthesis_input, voice=voice, audio_config=audio_config
            )
            
            # Encode audio to base64
            audio_base64 = base64.b64encode(response.audio_content).decode('utf-8')
            
            return Response({"audio": audio_base64})
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)