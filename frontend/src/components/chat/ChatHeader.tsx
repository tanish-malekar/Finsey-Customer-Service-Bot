import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Shield, Volume2, VolumeX } from "lucide-react";
import { useVoice } from "@/hooks/useVoice";

export const ChatHeader = () => {
  const { isVoiceEnabled, toggleVoice } = useVoice();

  return (
    <div 
      className="border-b bg-background/80 backdrop-blur-sm p-4"
      style={{
        background: "var(--gradient-chat)"
      }}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
              <Building2 className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h1 className="text-xl font-bold text-foreground">Finsey</h1>
            <p className="text-sm text-muted-foreground">BAGIC Customer Care Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleVoice}
            className="h-8 w-8 p-0 rounded-full hover:bg-primary/10"
          >
            {isVoiceEnabled ? (
              <Volume2 className="h-4 w-4 text-primary" />
            ) : (
              <VolumeX className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
          
          <Badge variant="secondary" className="text-xs">
            <Shield className="h-3 w-3 mr-1" />
            Secure Chat
          </Badge>
        </div>
      </div>
    </div>
  );
};