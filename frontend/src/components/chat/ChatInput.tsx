import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { VoiceRecorder } from "./VoiceRecorder";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
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

  const handleVoiceTranscript = (transcript: string) => {
    setMessage(transcript);
  };

  return (
    <div className="border-t bg-background/80 backdrop-blur-sm p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-3 items-end">
          <div className="flex-1">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about BAGIC services... or click the mic to speak"
              className={cn(
                "min-h-12 max-h-32 resize-none rounded-xl border-2 transition-all duration-200",
                "focus:border-primary focus:ring-2 focus:ring-primary/20",
                "placeholder:text-muted-foreground/70"
              )}
              disabled={disabled}
              rows={1}
            />
          </div>
          
          <VoiceRecorder 
            onTranscript={handleVoiceTranscript}
            disabled={disabled || isLoading}
          />
          
          <Button
            type="submit"
            disabled={!message.trim() || isLoading || disabled}
            className={cn(
              "h-12 w-12 rounded-xl shrink-0 transition-all duration-200",
              "hover:scale-105 active:scale-95",
              "disabled:opacity-50 disabled:scale-100"
            )}
            style={{
              background: "var(--gradient-primary)"
            }}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
        
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send, Shift+Enter for new line, or use voice input
        </p>
      </div>
    </div>
  );
};