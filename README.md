# 🎙️ Ragify – Transform Any Website into an Intelligent AI Assistant  

Instantly create conversational AI chatbots from your website content.  
No coding required. Just paste a URL and start chatting.  

---

## 📖 Overview  

**Ragify** turns any website into an AI-powered assistant by combining **Retrieval-Augmented Generation (RAG)** with real-time voice interaction.  
It crawls and indexes your website content, then uses advanced AI models to provide accurate, context-aware responses in both **chat** and **voice** formats.  

---

## ✨ Key Highlights  

- 🚀 **Instant Setup:** Enter a website URL, and Ragify automatically builds a chatbot trained on its content.  
- 🔒 **Secure & Private:** Your data is handled safely with industry-grade security.  
- 🤖 **AI-Powered:** Powered by Google’s **Gemini models**, with RAG for precise, reliable answers.  
- 🎤 **Voice Interaction:** Talk to your assistant with real-time speech-to-text and natural text-to-speech voices.  

---

## 🧠 How it Works  

1. **Website Crawling:** Content is scraped using `BeautifulSoup`.  
2. **Embedding:** The content is embedded with **Gemini (`gemini-embedding-001`)** via Vertex AI.  
3. **Vector Database:** Indexed in **PineconeDB** for fast semantic search.  
4. **RAG Pipeline:** Orchestrated with **LangChain**, combining retrieval with **Gemini LLMs** for contextual answers.  
5. **Voice Features:**  
   - **Speech-to-Text:** Real-time transcription with **Google Cloud Speech-to-Text**  
   - **Text-to-Speech:** Human-like voice replies using **Google Cloud Text-to-Speech**  

---

## 🧰 Tech Stack  

- **Frontend:** React, Vite, TailwindCSS  
- **Backend:** Django, SQLite
- **RAG Engine:** LangChain + Gemini Models  
- **Vector DB:** PineconeDB  
- **Scraping:** BeautifulSoup  
- **Voice AI:** Google Cloud Speech-to-Text & Text-to-Speech  

---


### ⚙️ Setup

#### 1. 🛠️ Backend

* **Requirements:** Python 3.9+

* **Install dependencies:**
    ```
    cd backend
    pip install -r requirements.txt
    ```
* Configure environment variables.
* Run DB migrations
    ```
    python manage.py migrate
    ```
* **Run the server:**
    ```
    python manage.py runserver
    ```
#### 2. 💻 Frontend

* **Requirements:** Node.js 16+

* **Commands:**
    ```
    cd frontend
    npm install
    npm run dev
    ```
#### 3. 🎤 Google Cloud Support

* Enable APIs in Google Cloud Console:
    * ✅ Google Cloud Speech-to-Text
    * ✅ Google Cloud Text-to-Speech
* Create a service account & download credentials JSON.
* **Export credentials path:**
    ```
    export GOOGLE_APPLICATION_CREDENTIALS="/path/to/credentials.json"
    ```

---
### 📝 License

MIT

---
### 🧠 Powered By

* Google Vertex AI
* Google Cloud Platform 
* Pinecone Vector DB
* LangChain
* React
* Django
* SQLite
  
