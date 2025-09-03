from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
import base64
import json
from pinecone import Pinecone
from langchain_google_vertexai import VertexAIEmbeddings, VertexAI
from langchain_pinecone import PineconeVectorStore
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
from google.cloud import speech
from google.cloud import texttospeech
import io

load_dotenv()

# Pinecone setup
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
PINECONE_INDEX = os.environ.get("PINECONE_INDEX")
GCP_PROJECT = os.environ.get("GCP_PROJECT")
GCP_LOCATION = os.environ.get("GCP_LOCATION", "us-central1")
EMBED_MODEL = os.environ.get("EMBED_MODEL", "gemini-embedding-001")
LLM_MODEL = os.environ.get("LLM_MODEL", "gemini-2.5-pro")

pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index(PINECONE_INDEX)

# LangChain Embeddings (Vertex AI)
embeddings = VertexAIEmbeddings(
    project=GCP_PROJECT,
    location=GCP_LOCATION,
    model_name=EMBED_MODEL
)

# LangChain VectorStore
vectorstore = PineconeVectorStore(index, embeddings, "text")

# LLM (Gemini via Vertex AI)
llm = VertexAI(
    project=GCP_PROJECT,
    location=GCP_LOCATION,
    model_name=LLM_MODEL  # or another Gemini model name
)

# RAG Chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever()
)

# Google Cloud Speech and TTS clients
speech_client = speech.SpeechClient()
tts_client = texttospeech.TextToSpeechClient()

class RAGAnswerView(APIView):
    def post(self, request):
        question = request.data.get("question")
        if not question:
            return Response({"error": "No question provided."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            answer = qa_chain.invoke(question)
            return Response({"answer": answer})
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