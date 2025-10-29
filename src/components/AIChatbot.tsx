import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { logger } from "@/lib/logger";
import { sanitizeInput } from "@/lib/sanitization";
import { handleError } from "@/lib/errorHandler";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hallo! Ich bin dein KI-Lernberater und unterstütze dich bei der Vorbereitung auf deine IHK-Prüfung. Wie kann ich dir heute helfen?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: string, retryCount = 0) => {
    const userMsg: Message = { role: "user", content: userMessage };
    
    if (retryCount === 0) {
      setMessages((prev) => [...prev, userMsg]);
    }
    
    setIsLoading(true);

    let assistantContent = "";

    try {
      const response = await fetch(
        `https://bjjxfcpxnoivjkplxktw.supabase.co/functions/v1/ai-tutor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqanhmY3B4bm9pdmprcGx4a3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2OTMyMzEsImV4cCI6MjA3NDI2OTIzMX0.Jfx5Hj3mUSAtDopLwXL1NNgA1In2zyahaM7AGTEby74`,
          },
          body: JSON.stringify({ messages: [...messages, userMsg] }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error("Fehler beim Abrufen der Antwort");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      // Add empty assistant message that will be updated
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: "assistant",
                  content: assistantContent,
                };
                return newMessages;
              });
            }
          } catch (e) {
            logger.error("Error parsing JSON:", e);
          }
        }
      }
    } catch (error) {
      // Retry logic with exponential backoff
      if (retryCount < MAX_RETRIES) {
        const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        
        toast({
          title: "Verbindungsfehler",
          description: `Versuche erneut... (${retryCount + 1}/${MAX_RETRIES})`,
        });
        
        // Remove the empty assistant message before retry
        if (retryCount === 0) {
          setMessages((prev) => prev.slice(0, -1));
        }
        
        setTimeout(() => {
          streamChat(userMessage, retryCount + 1);
        }, delay);
      } else {
        handleError(error, {
          title: "Fehler",
          description: "Konnte keine Antwort vom KI-Tutor erhalten. Bitte versuche es später erneut.",
        });
        // Remove the empty assistant message if there was an error
        if (retryCount === 0) {
          setMessages((prev) => prev.slice(0, -1));
        }
      }
    } finally {
      if (retryCount >= MAX_RETRIES || retryCount === 0) {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const sanitized = sanitizeInput(input, 500);
    if (!sanitized) return;
    
    setInput("");
    await streamChat(sanitized);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-elegant hover:shadow-glow transition-all duration-300 bg-gradient-to-br from-primary via-primary to-primary-glow hover:scale-110 group"
      >
        <MessageCircle className="h-7 w-7 group-hover:rotate-12 transition-transform" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[400px] h-[650px] flex flex-col shadow-elegant border-0 animate-in slide-in-from-bottom-4 duration-300 bg-background/95 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-border/50 bg-gradient-to-r from-primary via-primary to-primary-glow text-primary-foreground rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-foreground/20 rounded-lg backdrop-blur-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-base">KI-Tutor</h3>
            <p className="text-xs opacity-90">Immer für dich da</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-primary-foreground hover:bg-primary-foreground/20 h-9 w-9 rounded-lg"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-5" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={`message-${index}-${message.role}-${message.content.substring(0, 30)}`}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted/80 text-foreground rounded-bl-sm border border-border/50"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted/80 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-3 border border-border/50">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Denke nach...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border/50 bg-background/50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Stelle eine Frage..."
            disabled={isLoading}
            className="flex-1 rounded-xl border-border/50 bg-background focus-visible:ring-primary"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()} 
            size="icon"
            className="h-10 w-10 rounded-xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};