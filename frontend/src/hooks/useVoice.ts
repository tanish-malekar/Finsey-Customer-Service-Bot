import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseVoiceReturn {
  isVoiceEnabled: boolean;
  toggleVoice: () => void;
  speakText: (text: string) => Promise<void>;
  stopSpeaking: () => void;
}

export const useVoice = (): UseVoiceReturn => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  const toggleVoice = useCallback(() => {
    setIsVoiceEnabled(prev => !prev);
  }, []);

  const speakText = useCallback(async (text: string) => {
    if (!isVoiceEnabled) return;

    try {
      // Stop any current speech
      if (currentUtterance) {
        window.speechSynthesis.cancel();
      }

      // Create new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;

      // Set voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang === 'en-US' && voice.name.includes('Female')
      ) || voices.find(voice => voice.lang === 'en-US') || voices[0];
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => {
        setCurrentUtterance(null);
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setCurrentUtterance(null);
        toast({
          title: "Voice Error",
          description: "Unable to play voice message. Please try again.",
          variant: "destructive",
        });
      };

      setCurrentUtterance(utterance);
      window.speechSynthesis.speak(utterance);

    } catch (error) {
      console.error('Error with speech synthesis:', error);
      toast({
        title: "Voice Error",
        description: "Unable to play voice message. Please try again.",
        variant: "destructive",
      });
    }
  }, [isVoiceEnabled, currentUtterance, toast]);

  const stopSpeaking = useCallback(() => {
    if (currentUtterance) {
      window.speechSynthesis.cancel();
      setCurrentUtterance(null);
    }
  }, [currentUtterance]);

  return {
    isVoiceEnabled,
    toggleVoice,
    speakText,
    stopSpeaking
  };
};
