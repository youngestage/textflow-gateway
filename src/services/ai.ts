
export const detectLanguage = async (text: string): Promise<string> => {
  try {
    const result = await chrome.ai.detectLanguage({ text });
    return result.languages[0].language;
  } catch (error) {
    console.error("Language detection failed:", error);
    throw new Error("Failed to detect language");
  }
};

export const summarizeText = async (text: string): Promise<string> => {
  try {
    const result = await chrome.ai.summarize({ text });
    return result.summary;
  } catch (error) {
    console.error("Summarization failed:", error);
    throw new Error("Failed to summarize text");
  }
};

export const translateText = async (
  text: string,
  targetLanguage: string
): Promise<string> => {
  try {
    const result = await chrome.ai.translate({
      text,
      targetLanguage,
    });
    return result.translation;
  } catch (error) {
    console.error("Translation failed:", error);
    throw new Error("Failed to translate text");
  }
};
