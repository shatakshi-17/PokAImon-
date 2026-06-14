export const GEMINI_CONFIG = {
  apiBaseUrl: 'https://generativelanguage.googleapis.com/v1beta',
  model: import.meta.env.VITE_GEMINI_MODEL ?? 'gemini-2.5-flash',
};

export function getGeminiApiKey() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Missing VITE_GEMINI_API_KEY. Add it to your .env file before analyzing sketches.',
    );
  }

  return apiKey;
}

export function isGeminiConfigured() {
  return Boolean(import.meta.env.VITE_GEMINI_API_KEY);
}
