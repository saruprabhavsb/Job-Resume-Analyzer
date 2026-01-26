import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ParsedResumeData {
  skills: string[];
  experience: string;
  education: string;
  tools: string[];
  keywords: string[];
}

interface UseResumeParserReturn {
  parseResume: (file: File) => Promise<ParsedResumeData | null>;
  isLoading: boolean;
  error: string | null;
}

export const useResumeParser = (): UseResumeParserReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseResume = async (file: File): Promise<ParsedResumeData | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data, error: fnError } = await supabase.functions.invoke("parse-resume", {
        body: formData,
      });

      if (fnError) {
        throw new Error(fnError.message || "Failed to parse resume");
      }

      if (!data?.success) {
        throw new Error(data?.error || "Failed to extract resume data");
      }

      return data.data as ParsedResumeData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to parse resume";
      setError(errorMessage);
      console.error("Resume parsing error:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { parseResume, isLoading, error };
};
