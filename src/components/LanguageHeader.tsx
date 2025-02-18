
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Language } from "@/types";
import { Globe } from "lucide-react";

type LanguageHeaderProps = {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
};

const languages: Record<Language, string> = {
  en: "English",
  pt: "Portuguese",
  es: "Spanish",
  ru: "Russian",
  tr: "Turkish",
  fr: "French",
};

export const LanguageHeader = ({
  currentLanguage,
  onLanguageChange,
}: LanguageHeaderProps) => {
  return (
    <header className="glass sticky top-0 z-50 border-b">
      <div className="container flex items-center justify-between h-14 px-4 max-w-3xl mx-auto">
        <h1 className="text-lg font-semibold text-gray-900">TextFlow</h1>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-500" />
          <Select
            value={currentLanguage}
            onValueChange={(value) => onLanguageChange(value as Language)}
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
        </div>
      </div>
    </header>
  );
};
