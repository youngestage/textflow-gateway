
import { Language, Message } from "@/types";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { translateText, summarizeText } from "@/services/ai";
import { Loader2 } from "lucide-react";

type MessageBubbleProps = {
  message: Message;
};

const languages: Record<Language, string> = {
  en: "English",
  pt: "Portuguese",
  es: "Spanish",
  ru: "Russian",
  tr: "Turkish",
  fr: "French",
};

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");

  const handleTranslate = async () => {
    try {
      setIsLoading(true);
      const translation = await translateText(message.text, selectedLanguage);
      message.translation = translation;
      message.selectedLanguage = selectedLanguage;
    } catch (error) {
      toast.error("Translation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarize = async () => {
    try {
      setIsLoading(true);
      const summary = await summarizeText(message.text);
      message.summary = summary;
    } catch (error) {
      toast.error("Summarization failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const showSummarizeButton =
    message.language === "en" && message.text.length > 150 && !message.summary;

  return (
    <div className="message-bubble space-y-3">
      <p className="text-sm text-gray-900">{message.text}</p>
      
      {message.language && (
        <p className="text-xs text-gray-500">
          Detected Language: {languages[message.language as Language] || message.language}
        </p>
      )}

      <div className="flex items-center gap-2 mt-2">
        {showSummarizeButton && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleSummarize}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            Summarize
          </Button>
        )}

        <Select
          value={selectedLanguage}
          onValueChange={(value) => setSelectedLanguage(value as Language)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(languages).map(([code, name]) => (
              <SelectItem key={code} value={code}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={handleTranslate}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : null}
          Translate
        </Button>
      </div>

      {message.summary && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-900">Summary:</p>
          <p className="text-sm text-gray-600">{message.summary}</p>
        </div>
      )}

      {message.translation && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-900">
            Translation ({languages[message.selectedLanguage!]}):
          </p>
          <p className="text-sm text-gray-600">{message.translation}</p>
        </div>
      )}
    </div>
  );
};
