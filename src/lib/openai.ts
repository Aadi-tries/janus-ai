import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini client using the GEMINI_API_KEY from environment variables
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

/**
 * Helper to call Gemini with a JSON response type using structured outputs.
 * Note: Kept filename as openai.ts to avoid breaking imports in other files.
 */
export async function getStructuredResponse<T>(
  systemPrompt: string,
  userMessage: string,
  model: string = "gemini-2.5-flash"
): Promise<T | null> {
  try {
    // We override the model to gemini-2.5-flash
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
    });

    const content = response.text;
    if (!content) return null;

    return JSON.parse(content) as T;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}
