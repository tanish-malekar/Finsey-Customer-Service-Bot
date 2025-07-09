import os
import requests
from bs4 import BeautifulSoup
from tqdm import tqdm
from uuid import uuid4

from pinecone import Pinecone
from langchain_google_vertexai import VertexAIEmbeddings
from dotenv import load_dotenv

load_dotenv()


# --- CONFIGURATION ---
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
PINECONE_INDEX = os.environ.get("PINECONE_INDEX")
GCP_PROJECT = os.environ.get("GCP_PROJECT")
GCP_LOCATION = os.environ.get("GCP_LOCATION", "us-central1")
EMBED_MODEL = os.environ.get("EMBED_MODEL", "gemini-embedding-001")

# --- SETUP ---
pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index(PINECONE_INDEX)
embeddings = VertexAIEmbeddings(
    project=GCP_PROJECT,
    location=GCP_LOCATION,
    model_name=EMBED_MODEL
)

def crawl_website(url, max_pages=10):
    """Crawl a website and return a list of (url, text) tuples."""
    visited = set()
    to_visit = [url]
    results = []

    while to_visit and len(visited) < max_pages:
        current = to_visit.pop(0)
        if current in visited:
            continue
        try:
            resp = requests.get(current, timeout=10)
            soup = BeautifulSoup(resp.text, "html.parser")
            text = soup.get_text(separator=" ", strip=True)
            results.append((current, text))
            visited.add(current)
            # Add new links
            for link in soup.find_all("a", href=True):
                href = link["href"]
                if href.startswith("http") and href not in visited:
                    to_visit.append(href)
        except Exception as e:
            print(f"Failed to crawl {current}: {e}")
    return results

def chunk_text(text, chunk_size=500, overlap=50):
    """Split text into chunks for embedding."""
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i+chunk_size])
        if chunk:
            chunks.append(chunk)
    return chunks

def main():
    website_url = "https://www.bajajallianz.com/health-insurance-plans/comprehensive-health-insurance.html"
    print("Crawling website...")
    pages = crawl_website(website_url, max_pages=10)
    print(f"Found {len(pages)} pages.")

    all_vectors = []
    for url, text in tqdm(pages, desc="Processing pages"):
        for chunk in chunk_text(text):
            # Get embedding
            vec = embeddings.embed_query(chunk)
            # Prepare Pinecone upsert
            vector = {
                "id": str(uuid4()),
                "values": vec,
                "metadata": {
                    "url": url,
                    "text": chunk
                }
            }
            all_vectors.append(vector)
            # Upsert in batches of 100
            if len(all_vectors) >= 100:
                index.upsert(vectors=all_vectors)
                all_vectors = []
    # Upsert any remaining vectors
    if all_vectors:
        index.upsert(vectors=all_vectors)
    print("Done! All content indexed in Pinecone.")

if __name__ == "__main__":
    main()