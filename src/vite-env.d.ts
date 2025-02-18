
/// <reference types="vite/client" />

interface Chrome {
  ai: {
    detectLanguage: (params: { text: string }) => Promise<{
      languages: Array<{
        language: string;
        confidence: number;
      }>;
    }>;
    summarize: (params: { text: string }) => Promise<{
      summary: string;
    }>;
    translate: (params: {
      text: string;
      targetLanguage: string;
    }) => Promise<{
      translation: string;
    }>;
  };
}

declare const chrome: Chrome;
