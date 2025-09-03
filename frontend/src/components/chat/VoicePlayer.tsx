import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoicePlayerProps {
  text: string;
  disabled?: boolean;
}

export const VoicePlayer = ({ text, disabled }: VoicePlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const playAudio = useCallback(async () => {
    if (isPlaying && audioUrl) {
      // Stop current playback
      setIsPlaying(false);
      setAudioUrl(null);
      return;
    }

    if (audioUrl) {
      // Resume playback with existing audio
      const audio = new Audio(audioUrl);
      audio.play();
      setIsPlaying(true);
      
      audio.onended = () => {
        setIsPlaying(false);
      };
      return;
    }

    // Generate new audio
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/text-to-speech/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Convert base64 to blob URL
        const audioBytes = atob(data.audio);
        const audioArray = new Uint8Array(audioBytes.length);
        for (let i = 0; i < audioBytes.length; i++) {
          audioArray[i] = audioBytes.charCodeAt(i);
        }
        
        const audioBlob = new Blob([audioArray], { type: 'audio/mp3' });
        const url = URL.createObjectURL(audioBlob);
        
        setAudioUrl(url);
        
        // Play the audio
        const audio = new Audio(url);
        audio.play();
        setIsPlaying(true);
        
        audio.onended = () => {
          setIsPlaying(false);
        };
        
        audio.onerror = () => {
          setIsPlaying(false);
          setAudioUrl(null);
        };
      } else {
        console.error('Text-to-speech failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setIsLoading(false);
    }
  }, [text, isPlaying, audioUrl]);

  return (
    <Button
      onClick={playAudio}
      disabled={disabled || isLoading}
      variant="ghost"
      size="sm"
      className={cn(
        "h-8 w-8 p-0 rounded-full transition-all duration-200",
        "hover:bg-primary/10 hover:scale-105",
        "disabled:opacity-50 disabled:scale-100",
        isPlaying && "text-primary"
      )}
    >
      {isLoading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : isPlaying ? (
        <VolumeX className="h-3 w-3" />
      ) : (
        <Volume2 className="h-3 w-3" />
      )}
    </Button>
  );
};
