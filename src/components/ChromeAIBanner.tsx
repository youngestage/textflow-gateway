
import { Alert, AlertDescription } from "./ui/alert";
import { AlertTriangle } from "lucide-react";
import { isChromeAIAvailable, getChromeAIGuidance } from "@/utils/chrome-ai";

export const ChromeAIBanner = () => {
  if (isChromeAIAvailable()) {
    return null;
  }

  return (
    <Alert variant="destructive" className="mx-auto max-w-3xl mt-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="whitespace-pre-line">
        {getChromeAIGuidance()}
      </AlertDescription>
    </Alert>
  );
};
