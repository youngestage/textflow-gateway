
interface Chrome {
  ai: {
    detectLanguage: (params: { text: string }) => Promise<{ languages: Array<{ language: string }> }>;
    summarize: (params: { text: string }) => Promise<{ summary: string }>;
    translate: (params: { text: string; targetLanguage: string }) => Promise<{ translation: string }>;
  };
}

interface Window {
  chrome?: Chrome;
}
