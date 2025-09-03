# Voice Auto-Speaking Test Guide

## Overview
This feature automatically starts speaking bot replies when the user asks a question through voice input.

## How It Works
1. **Voice Input Detection**: When a user records a voice message, it's marked with `wasVoiceQuestion: true`
2. **Auto-Speaking**: When the bot responds to a voice question, it automatically starts speaking the reply
3. **Visual Indicators**: 
   - Voice messages show a microphone icon and "Voice message" label
   - Bot replies to voice questions show a "Speaking..." indicator

## Test Steps

### 1. Start Both Servers
```bash
# Terminal 1 - Backend
cd backend
python manage.py runserver

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### 2. Test Voice Auto-Speaking
1. Open `http://localhost:8080` in your browser
2. Click the microphone button (🎤) to start recording
3. Ask a question like "What are the benefits of BAGIC insurance?"
4. Click the microphone again to stop recording
5. **Expected Behavior**: 
   - Your voice message appears with a microphone icon
   - Bot responds with text
   - Bot automatically starts speaking the reply
   - "Speaking..." indicator appears briefly

### 3. Test Text Input (No Auto-Speaking)
1. Type a question in the text input
2. Press Enter or click Send
3. **Expected Behavior**:
   - No microphone icon on your message
   - Bot responds with text
   - No automatic speaking (unless voice is enabled in settings)

### 4. Verify Voice Indicators
- ✅ Voice messages show microphone icon + "Voice message" label
- ✅ Bot replies to voice questions show "Speaking..." indicator
- ✅ Text messages show no special indicators
- ✅ Auto-speaking only happens for voice questions

## Technical Implementation

### Key Changes Made:
1. **Message Interface**: Added `wasVoiceQuestion?: boolean` flag
2. **VoiceRecorder**: Passes `wasVoiceQuestion: true` for voice messages
3. **useChat Hook**: Auto-plays TTS for voice questions using the TTS API
4. **ChatMessage**: Shows visual indicators for voice messages and auto-speaking
5. **Index Component**: Passes previous message context for auto-speaking detection

### API Endpoints Used:
- `POST /api/speech-to-text/` - Converts voice to text
- `POST /api/ask/` - Gets bot response
- `POST /api/text-to-speech/` - Auto-plays bot replies

## Troubleshooting

### If Auto-Speaking Doesn't Work:
1. Check browser console for errors
2. Verify backend TTS API is working
3. Ensure microphone permissions are granted
4. Check if voice recording is being processed

### If Voice Recording Fails:
1. Check browser console for MediaRecorder errors
2. Verify microphone access permissions
3. Test with different browsers (Chrome recommended)

## Expected User Experience
- **Voice Question** → **Auto-Spoken Reply** ✅
- **Text Question** → **Silent Reply** (unless voice enabled) ✅
- **Visual Feedback** for voice interactions ✅
- **Seamless Voice Conversation** ✅
