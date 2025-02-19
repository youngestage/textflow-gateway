
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { Language, Message } from "@/types";
import { detectLanguage } from "@/services/ai";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import { LanguageHeader } from "./LanguageHeader";
import { ChromeAIBanner } from "./ChromeAIBanner";

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

  const handleSend = async () => {
    if (!input.trim()) {
      toast.error("Please enter some text");
      return;
    }

    setIsLoading(true);
    const newMessage: Message = {
      id: nanoid(),
      text: input.trim(),
    };

    try {
      const language = await detectLanguage(input);
      newMessage.language = language;
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to process message. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <LanguageHeader
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      <ChromeAIBanner />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message}
            defaultLanguage={currentLanguage}
          />
        ))}
      </div>

      <div className="glass p-4 border-t">
        <div className="flex gap-2 items-end max-w-3xl mx-auto">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="resize-none"
            rows={1}
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
