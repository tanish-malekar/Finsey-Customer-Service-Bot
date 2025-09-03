import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useVoice } from "./useVoice";

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
}

export const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm Finsey, your BAGIC customer care assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isVoiceEnabled, speakText } = useVoice();

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: generateId(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/ask/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: text
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract the response text (adjust based on actual API response structure)
      const botResponseText = data.answer.result || "I'm sorry, I couldn't process your request.";

      const botMessage: Message = {
        id: generateId(),
        text: botResponseText,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Auto-play voice if enabled
      if (isVoiceEnabled) {
        speakText(botResponseText);
      }
      
    } catch (error) {
      console.error("Chat API error:", error);
      
      const errorMessage: Message = {
        id: generateId(),
        text: "I'm sorry, I'm having trouble connecting to our service right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Unable to reach the chat service. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, isVoiceEnabled, speakText]);

  const clearMessages = useCallback(() => {
    setMessages([{
      id: "welcome",
      text: "Hello! I'm Finsey, your BAGIC customer care assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages
  };
};