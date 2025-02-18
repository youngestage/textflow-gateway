
export type Language = "en" | "pt" | "es" | "ru" | "tr" | "fr";

export type Message = {
  id: string;
  text: string;
  language?: string;
  summary?: string;
  translation?: string;
  selectedLanguage?: Language;
};
