import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Loader2, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VoiceRecorderProps {
  onSendMessage: (message: string, wasVoiceQuestion?: boolean) => void;
  onProcessingChange: (processing: boolean) => void;
  disabled?: boolean;
}

export const VoiceRecorder = ({ onSendMessage, onProcessingChange, disabled }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsProcessing(true);
        onProcessingChange(true);
        
        try {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const reader = new FileReader();
          
          reader.onload = async () => {
            try {
              const base64Audio = reader.result as string;
              
              // Send to speech-to-text API
              const response = await fetch('http://localhost:8000/api/speech-to-text/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  audio: base64Audio
                })
              });

              if (response.ok) {
                const data = await response.json();
                const transcript = data.transcript;
                
                // Auto-send the message if it's not empty (don't populate input)
                if (transcript.trim()) {
                  onSendMessage(transcript.trim(), true); // Mark as voice question
                }
              } else {
                console.error('Speech-to-text failed:', response.statusText);
              }
            } catch (error) {
              console.error('Error in reader.onload:', error);
            } finally {
              // Set processing to false after everything is complete
              setIsProcessing(false);
              onProcessingChange(false);
            }
          };
          
          reader.readAsDataURL(audioBlob);
        } catch (error) {
          console.error('Error processing audio:', error);
          setIsProcessing(false);
          onProcessingChange(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, [onSendMessage, onProcessingChange]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  }, [isRecording]);

  const handleClick = () => {
    if (isRecording) {
      stopRecording();
    } else if (!isProcessing) {
      startRecording();
    }
  };

  const getTooltipText = () => {
    if (isRecording) return "Click to stop recording and send message";
    if (isProcessing) return "Processing your voice message...";
    return "Click to record voice message (auto-sends when done)";
  };

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleClick}
              disabled={disabled || isProcessing}
              className={cn(
                "h-14 w-14 rounded-2xl shrink-0 transition-all duration-200 shadow-lg",
                "hover:scale-105 active:scale-95",
                "disabled:opacity-50 disabled:scale-100 disabled:shadow-lg",
                "focus:ring-4 focus:ring-blue-500/20",
                isRecording 
                  ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/25" 
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              )}
            >
              {isRecording ? (
                <div className="flex items-center gap-1">
                  <MicOff className="h-5 w-5 text-white" />
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-white rounded-full animate-pulse" />
                    <div className="w-1 h-3 bg-white rounded-full animate-pulse [animation-delay:0.1s]" />
                    <div className="w-1 h-3 bg-white rounded-full animate-pulse [animation-delay:0.2s]" />
                  </div>
                </div>
              ) : isProcessing ? (
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              ) : (
                <Mic className="h-5 w-5 text-white" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
            <div className="flex items-center gap-2">
              <Radio className="h-3 w-3" />
              <p>{getTooltipText()}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
