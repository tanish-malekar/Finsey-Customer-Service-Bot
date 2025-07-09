# 🎙️ Finsey Customer Service Bot

A Retrieval-Augmented Generation (RAG) chatbot and voice assistant system for the customer care service of **Bajaj Allianz General Insurance Company (BAGIC)**.

---

## 📖 Overview

This application leverages state-of-the-art AI, vector search, and voice processing to provide accurate, context-aware answers to customer queries.  
It is designed to reduce the customer contact footprint by moving interactions to **automated chat and voice bots**.

---

## 🧠 How it Works

- **Data Collection:** Website data is scraped from the BAGIC website using `BeautifulSoup`.
- **Embedding:** The scraped data is embedded using Google's `gemini-embedding-001` model via **Vertex AI**.
- **Vector Database:** Embeddings and metadata are stored in **PineconeDB** for fast semantic search.
- **RAG Agent:** **LangChain** orchestrates retrieval and answer generation, using **Gemini LLMs** for final response synthesis.
- **Backend:** **Django** is used to create REST APIs that power both the chat and voice interfaces.
- **Frontend:** Built with **React**, **Vite**, and **TailwindCSS** for a modern, responsive UI.
- **Voice Support:**
  - Real-time **speech-to-text** via **Google Vertex AI Speech-to-Text**
  - Human-like audio responses using **Google Vertex AI Text-to-Speech (WaveNet voices)**

---

## ✨ Features

- Chatbot interface (text and voice-enabled)
- RAG pipeline for accurate, context-aware answers
- Fast semantic search with **PineconeDB**
- Real-time voice support via **Vertex AI Speech-to-Text** and **Text-to-Speech**
- Scalable, production-ready backend and frontend

---

## 🧰 Tech Stack

- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Django, Django REST Framework
- **RAG Orchestration:** LangChain
- **Embeddings:** Gemini (`gemini-embedding-001` via Vertex AI)
- **Vector DB:** PineconeDB
- **Scraping:** BeautifulSoup
- **Voice Integration:**
  - Google Vertex AI Speech-to-Text
  - Google Vertex AI Text-to-Speech (WaveNet)

---

## ⚙️ Setup

### 1. 🛠️ Backend

- **Requirements:** Python 3.9+
- Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

- Set environment variables (see `.env` template)
- Run server:

    ```bash
    python manage.py runserver
    ```

---

### 2. 💻 Frontend

- **Requirements:** Node.js 16+
- Commands:

    ```bash
    cd frontend
    npm install
    npm run dev
    ```

---

### 3. 🎤 Voice Support with Vertex AI

- Enable the following in **Google Cloud Console**:
  - ✅ Vertex AI Speech-to-Text
  - ✅ Vertex AI Text-to-Speech
- Create a service account and download the credentials JSON
- Set the authentication environment variable:

    ```bash
    export GOOGLE_APPLICATION_CREDENTIALS="/path/to/credentials.json"
    ```

---

## 📝 License

**MIT**

---

## 🧠 Powered By

- [Google Vertex AI](https://cloud.google.com/vertex-ai)
- [Vertex AI Speech-to-Text](https://cloud.google.com/vertex-ai/docs/speech)
- [Vertex AI Text-to-Speech](https://cloud.google.com/vertex-ai/docs/text-to-speech)
- [Pinecone Vector DB](https://www.pinecone.io/)
- [LangChain](https://www.langchain.com/)
- [React](https://reactjs.org/)
- [Django](https://www.djangoproject.com/)
