import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Sparkles } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 max-w-4xl mx-auto px-4 py-2 animate-in fade-in-0 slide-in-from-bottom-2">
      <Avatar className="h-8 w-8 shrink-0 ring-2 ring-white shadow-sm">
        <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 border border-gray-200">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>

      <div className="bg-white border border-gray-100 rounded-xl rounded-bl-md px-4 py-3 shadow-md">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Sparkles className="h-3 w-3" />
            <span>AI is thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
};