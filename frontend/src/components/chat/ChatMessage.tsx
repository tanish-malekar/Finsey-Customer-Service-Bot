import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Mic, Volume2, Sparkles } from "lucide-react";
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
        "flex gap-3 max-w-4xl mx-auto px-4 py-2 animate-in fade-in-0 slide-in-from-bottom-2",
        message.isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className="h-8 w-8 shrink-0 ring-2 ring-white shadow-sm">
        <AvatarFallback
          className={cn(
            "text-sm font-semibold",
            message.isUser
              ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
              : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 border border-gray-200"
          )}
        >
          {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          "group relative max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl rounded-xl px-4 py-3 shadow-md transition-all duration-200",
          message.isUser
            ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-br-md shadow-blue-500/25"
            : "bg-white text-gray-900 border border-gray-100 rounded-bl-md shadow-gray-500/10 hover:shadow-gray-500/20"
        )}
      >
        {/* Message content */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center">
              <p className="text-[15px] leading-snug whitespace-pre-wrap break-words">
                {message.text}
              </p>
            </div>
            {!message.isUser && (
              <div className="shrink-0 flex items-center">
                <VoicePlayer text={message.text} />
              </div>
            )}
          </div>
          
          {/* Voice indicator for user messages */}
          {message.isUser && message.wasVoiceQuestion && (
            <div className="flex items-center gap-2 text-xs text-blue-100">
              <div className="flex items-center gap-1 bg-blue-500/20 px-2 py-1 rounded-full">
                <Mic className="h-3 w-3" />
                <span>Voice message</span>
              </div>
            </div>
          )}
          
          {/* Auto-speaking indicator for bot messages */}
          {!message.isUser && isAutoSpeaking && (
            <div className="flex items-center gap-2 text-xs text-blue-600 animate-pulse">
              <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                <Volume2 className="h-3 w-3" />
                <span>Speaking...</span>
              </div>
            </div>
          )}
        </div>
     
      </div>
    </div>
  );
};