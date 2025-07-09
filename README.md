# Finsey Customer Service Bot

A Retrieval-Augmented Generation (RAG) chatbot system for the customer care service of Bajaj Allianz General Insurance Company (BAGIC).

## Overview
This application leverages state-of-the-art AI and vector search to provide accurate, context-aware answers to customer queries. It is designed to reduce the customer contact footprint and move interactions to chat, voice, and video bots.

## How it Works
- **Data Collection:** Website data is scraped from the BAGIC website using BeautifulSoup.
- **Embedding:** The scraped data is embedded using Google's `gemini-embedding-001` model via Vertex AI.
- **Vector Database:** Embeddings and metadata are stored in PineconeDB for fast semantic search.
- **RAG Agent:** LangChain orchestrates retrieval and answer generation, using Gemini LLMs for final response synthesis.
- **Backend:** Django is used to create REST APIs that power the chat interface and connect all components.
- **Frontend:** Built with React, Vite, and TailwindCSS for a modern, responsive chat UI.

## Features
- Chatbot interface (text-based, extendable to voice/video)
- RAG pipeline for accurate, context-aware answers
- Fast semantic search with PineconeDB
- Scalable, production-ready backend and frontend

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Django, Django REST Framework
- **RAG Orchestration:** LangChain
- **Embeddings:** Gemini (`gemini-embedding-001` via Vertex AI)
- **Vector DB:** PineconeDB
- **Scraping:** BeautifulSoup

## Setup
1. **Backend:**
   - Python 3.9+
   - Install dependencies: `pip install -r requirements.txt`
   - Set environment variables (see `.env` template)
   - Run Django server: `python manage.py runserver`
2. **Frontend:**
   - Node.js 16+
   - `cd frontend`
   - `npm install`
   - `npm run dev` (for Vite)

## License
MIT
