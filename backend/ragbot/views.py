from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
from pinecone import Pinecone
from langchain_google_vertexai import VertexAIEmbeddings, VertexAI
from langchain_pinecone import PineconeVectorStore
from langchain.chains import RetrievalQA
from dotenv import load_dotenv

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