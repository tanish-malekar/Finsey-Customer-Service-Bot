import { useEffect, useRef } from "react";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { useChat } from "@/hooks/useChat";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        background: "var(--gradient-chat)"
      }}
    >
      <ChatHeader />
      
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea 
          ref={scrollAreaRef}
          className="flex-1 chat-background"
          style={{
            background: "var(--chat-background)"
          }}
        >
          <div className="py-4">
            {messages.map((message, index) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                previousMessage={index > 0 ? messages[index - 1] : undefined}
              />
            ))}
            
            {isLoading && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <ChatInput 
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Index;
