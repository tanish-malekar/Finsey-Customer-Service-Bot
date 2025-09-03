import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Mic, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { VoicePlayer } from "./VoicePlayer";
import { useState, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  wasVoiceQuestion?: boolean;
}

interface ChatMessageProps {
  message: Message;
  previousMessage?: Message;
}

export const ChatMessage = ({ message, previousMessage }: ChatMessageProps) => {
  const [isAutoSpeaking, setIsAutoSpeaking] = useState(false);

  // Auto-speak for bot messages if the user asked via voice
  useEffect(() => {
    if (!message.isUser && previousMessage?.wasVoiceQuestion) {
      setIsAutoSpeaking(true);
      const timer = setTimeout(() => setIsAutoSpeaking(false), 3000); // Hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, previousMessage]);

  return (
    <div
      className={cn(
        "flex gap-3 max-w-4xl mx-auto px-4 py-3 animate-in fade-in-0 slide-in-from-bottom-2",
        message.isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback
          className={cn(
            "text-sm font-medium",
            message.isUser
              ? "bg-chat-user text-chat-user-foreground"
              : "bg-primary text-primary-foreground"
          )}
        >
          {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "group relative max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl px-4 py-3 shadow-sm transition-all duration-200",
          message.isUser
            ? "bg-chat-user text-chat-user-foreground rounded-br-md"
            : "bg-chat-bot text-chat-bot-foreground border rounded-bl-md"
        )}
        style={{
          boxShadow: "var(--shadow-message)"
        }}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.text}
        </p>
        
        {/* Voice indicator for user messages */}
        {message.isUser && message.wasVoiceQuestion && (
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <Mic className="h-3 w-3" />
            <span>Voice message</span>
          </div>
        )}
        
        {/* Auto-speaking indicator for bot messages */}
        {!message.isUser && isAutoSpeaking && (
          <div className="flex items-center gap-1 mt-2 text-xs text-primary animate-pulse">
            <Volume2 className="h-3 w-3" />
            <span>Speaking...</span>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-2">
          <div
            className={cn(
              "text-xs opacity-70",
              message.isUser ? "text-right" : "text-left"
            )}
          >
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          
          {!message.isUser && (
            <VoicePlayer text={message.text} />
          )}
        </div>
      </div>
    </div>
  );
};