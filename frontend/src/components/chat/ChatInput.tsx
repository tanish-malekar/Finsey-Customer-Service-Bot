import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Mic, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { VoiceRecorder } from "./VoiceRecorder";

interface ChatInputProps {
  onSendMessage: (message: string, wasVoiceQuestion?: boolean) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !isProcessing && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleProcessingChange = (processing: boolean) => {
    setIsProcessing(processing);
  };

  return (
    <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm p-6">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div className="flex-1 relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about this website..."
              className={cn(
                "min-h-14 max-h-32 resize-none rounded-2xl border-2 transition-all duration-200 text-base",
                "py-3.5 leading-6",
                "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
                "placeholder:text-gray-400 placeholder:font-medium",
                "bg-white shadow-sm hover:shadow-md",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              disabled={disabled || isLoading || isProcessing}
              rows={1}
            />
            
          </div>
          
          <VoiceRecorder 
            onSendMessage={onSendMessage}
            onProcessingChange={handleProcessingChange}
            disabled={disabled || isLoading}
          />
          
          <Button
            type="submit"
            disabled={!message.trim() || isLoading || isProcessing || disabled}
            className={cn(
              "h-14 w-14 rounded-2xl shrink-0 transition-all duration-200 shadow-lg",
              "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
              "hover:shadow-xl hover:scale-105 active:scale-95",
              "disabled:opacity-50 disabled:scale-100 disabled:shadow-lg",
              "focus:ring-4 focus:ring-blue-500/20"
            )}
          >
            {isLoading || isProcessing ? (
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
              <Send className="h-5 w-5 text-white" />
            )}
          </Button>
        </form>
        
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Mic className="h-3 w-3" />
            <span>Voice input available</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <div className="flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            <span>Powered by RAGify AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};