
export const isChromeAIAvailable = (): boolean => {
  return !!(window.chrome && chrome.ai);
};

export const getChromeAIGuidance = (): string => {
  if (!window.chrome) {
    return "This feature requires Google Chrome browser. Please switch to Chrome to use AI features.";
  }
  
  return "To enable AI features:\n1. Open chrome://flags\n2. Search for 'Experimental AI'\n3. Enable the features\n4. Restart Chrome";
};
