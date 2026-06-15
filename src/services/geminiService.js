import { GEMINI_CONFIG, getGeminiApiKey } from '../utils/geminiConfig';
import { createGeminiApiError } from '../utils/geminiApiErrors';
import { parseDataUrl } from '../utils/imageData';
import { SKETCH_ANALYSIS_PROMPT } from './geminiPrompt';

let inFlightAnalysisRequest = null;

function buildGenerateContentUrl(apiKey) {
  return `${GEMINI_CONFIG.apiBaseUrl}/models/${GEMINI_CONFIG.model}:generateContent?key=${apiKey}`;
}

function buildSketchAnalysisPayload({ mimeType, base64Data }) {
  return {
    contents: [
      {
        parts: [
          { text: SKETCH_ANALYSIS_PROMPT },
          {
            inline_data: {
              mime_type: mimeType,
              data: base64Data,
            },
          },
        ],
      },
    ],
  };
}

function extractResponseText(payload) {
  return payload?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
}

export async function analyzeSketch(imageDataUrl) {
  if (inFlightAnalysisRequest) {
    return inFlightAnalysisRequest;
  }

  if (!imageDataUrl) {
    throw new Error('Image data is required for sketch analysis.');
  }

  const requestPromise = (async () => {
    const apiKey = getGeminiApiKey();
    const { mimeType, base64Data } = parseDataUrl(imageDataUrl);

    const response = await fetch(buildGenerateContentUrl(apiKey), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        buildSketchAnalysisPayload({ mimeType, base64Data }),
      ),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw createGeminiApiError(response.status, errorBody);
    }

    const payload = await response.json();
    const responseText = extractResponseText(payload);

    if (!responseText) {
      throw new Error('Gemini API returned an empty response.');
    }

    return responseText;
  })();

  inFlightAnalysisRequest = requestPromise;

  try {
    return await requestPromise;
  } finally {
    inFlightAnalysisRequest = null;
  }
}
