# Finsey Customer Service Bot

A comprehensive customer service chatbot with voice interaction capabilities powered by Google Cloud AI services.

## Features

### 🤖 Chat Interface
- **RAG-powered responses** using Pinecone vector database and Google Vertex AI
- **Real-time chat** with typing indicators and message history
- **Responsive design** optimized for all devices

### 🎤 Voice Interaction
- **Speech-to-Text**: Convert voice input to text using Google Cloud Speech-to-Text
- **Text-to-Speech**: Play back bot responses using Google Cloud Text-to-Speech
- **Voice recording**: Click the microphone button to record and send voice messages
- **Auto-playback**: Automatically play bot responses when voice is enabled
- **Voice toggle**: Enable/disable voice features with the header button

### 🔒 Security & Performance
- **Secure chat** with proper authentication
- **Real-time processing** with loading states
- **Error handling** with user-friendly messages

## Tech Stack

### Backend
- **Django** with Django REST Framework
- **Pinecone** for vector database
- **Google Cloud Vertex AI** for embeddings and LLM
- **Google Cloud Speech-to-Text** for voice recognition
- **Google Cloud Text-to-Speech** for voice synthesis

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Shadcn/ui** components
- **Web Audio API** for voice recording

## Setup Instructions

### Prerequisites
1. **Google Cloud Project** with billing enabled
2. **Pinecone account** and API key
3. **Python 3.9+** and **Node.js 18+**

### Backend Setup

1. **Clone and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file in the backend directory:
   ```env
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_INDEX=your_pinecone_index_name
   GCP_PROJECT=your_gcp_project_id
   GCP_LOCATION=us-central1
   EMBED_MODEL=gemini-embedding-001
   LLM_MODEL=gemini-2.5-pro
   GOOGLE_APPLICATION_CREDENTIALS=path/to/your/gcp_key.json
   ```

5. **Set up Google Cloud credentials:**
   - Download your service account key JSON file
   - Place it in the backend directory
   - Update the `GOOGLE_APPLICATION_CREDENTIALS` path in `.env`

6. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

7. **Start the backend server:**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Voice Features Configuration

### Google Cloud Speech-to-Text
- **Audio format**: WebM with Opus codec (48kHz)
- **Language**: English (US)
- **Model**: Latest long-form model
- **Features**: Automatic punctuation, enhanced models

### Google Cloud Text-to-Speech
- **Voice**: en-US-Neural2-F (Female)
- **Audio format**: MP3
- **Rate**: 0.9x (slightly slower for clarity)
- **Pitch**: Natural

### Browser Compatibility
- **Chrome/Edge**: Full support for all voice features
- **Firefox**: Limited support for Web Audio API
- **Safari**: Basic support, may require HTTPS

## Usage

### Voice Input
1. **Click the microphone button** in the chat input area
2. **Speak your message** clearly
3. **Click again to stop** recording
4. **Review the transcript** and send if correct

### Voice Output
1. **Enable voice** using the toggle in the header
2. **Bot responses** will automatically play
3. **Click the speaker icon** on any bot message to replay
4. **Disable voice** to stop auto-playback

### Tips for Best Results
- **Clear speech**: Speak clearly and at a normal pace
- **Quiet environment**: Minimize background noise
- **Good microphone**: Use a quality microphone for better recognition
- **Internet connection**: Ensure stable connection for API calls

## API Endpoints

- `POST /api/ask/` - Send chat message and get RAG response
- `POST /api/speech-to-text/` - Convert audio to text
- `POST /api/text-to-speech/` - Convert text to audio

## Troubleshooting

### Common Issues

1. **Voice recording not working:**
   - Check microphone permissions in browser
   - Ensure HTTPS connection (required for media access)
   - Verify browser supports MediaRecorder API

2. **Speech recognition errors:**
   - Check Google Cloud credentials
   - Verify audio format compatibility
   - Check network connectivity

3. **Text-to-speech not working:**
   - Verify Google Cloud TTS API is enabled
   - Check service account permissions
   - Ensure text is not empty

### Performance Optimization
- **Batch processing**: Process multiple audio chunks efficiently
- **Caching**: Cache generated audio for repeated playback
- **Error handling**: Graceful fallbacks for API failures

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Check the troubleshooting section
- Review Google Cloud documentation
- Open an issue on GitHub
