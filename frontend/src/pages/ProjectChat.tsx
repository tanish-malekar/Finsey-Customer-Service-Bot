import { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  wasVoiceQuestion?: boolean;
}

interface ProjectInfo {
  id: string;
  name: string;
  url: string;
}

const ProjectChat = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your AI assistant. I've been trained on the content of this website and can answer questions about it. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get project info from navigation state or fetch it
  useEffect(() => {
    if (location.state?.projectName && location.state?.projectUrl) {
      setProjectInfo({
        id: projectId!,
        name: location.state.projectName,
        url: location.state.projectUrl
      });
    } else {
      // Fetch project info if not available in state
      fetchProjectInfo();
    }
  }, [projectId, location.state]);

  const fetchProjectInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/projects/${projectId}/`);
      if (response.ok) {
        const project = await response.json();
        setProjectInfo({
          id: project.id,
          name: project.name,
          url: project.url
        });
      } else {
        toast({
          title: "Project Not Found",
          description: "The requested project could not be found.",
          variant: "destructive",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to fetch project information.",
        variant: "destructive",
      });
      navigate("/");
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const sendMessage = async (text: string, wasVoiceQuestion: boolean = false) => {
    if (!projectInfo) return;

    const userMessage: Message = {
      id: generateId(),
      text,
      isUser: true,
      timestamp: new Date(),
      wasVoiceQuestion
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
          question: text,
          project_id: projectInfo.id
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract the response text (adjust based on actual API response structure)
      const botResponseText = data.answer.result || data.answer || "I'm sorry, I couldn't process your request.";

      const botMessage: Message = {
        id: generateId(),
        text: botResponseText,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Auto-play voice if the question was asked via voice
      if (wasVoiceQuestion) {
        // Use the TTS API instead of browser speech synthesis for better quality
        try {
          const ttsResponse = await fetch('http://localhost:8000/api/text-to-speech/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: botResponseText
            })
          });

          if (ttsResponse.ok) {
            const ttsData = await ttsResponse.json();
            
            // Convert base64 to blob URL and play
            const audioBytes = atob(ttsData.audio);
            const audioArray = new Uint8Array(audioBytes.length);
            for (let i = 0; i < audioBytes.length; i++) {
              audioArray[i] = audioBytes.charCodeAt(i);
            }
            
            const audioBlob = new Blob([audioArray], { type: 'audio/mp3' });
            const url = URL.createObjectURL(audioBlob);
            
            const audio = new Audio(url);
            audio.play();
            
            audio.onended = () => {
              URL.revokeObjectURL(url); // Clean up the blob URL
            };
          }
        } catch (ttsError) {
          console.error('TTS auto-play failed:', ttsError);
        }
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
  };

  const clearMessages = () => {
    setMessages([{
      id: "welcome",
      text: "Hello! I'm your AI assistant. I've been trained on the content of this website and can answer questions about it. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }]);
  };

  if (!projectInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Loading project information...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        background: "var(--gradient-chat)"
      }}
    >
      {/* Custom Header with Project Info */}
      <div className="bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="p-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">{projectInfo.name}</h1>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {projectInfo.url}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearMessages}
              >
                Clear Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
      
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

export default ProjectChat;
