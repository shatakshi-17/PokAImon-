import { GEMINI_CONFIG, getGeminiApiKey } from '../utils/geminiConfig';
import { parseDataUrl } from '../utils/imageData';
import { SKETCH_ANALYSIS_PROMPT } from './geminiPrompt';

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
  if (!imageDataUrl) {
    throw new Error('Image data is required for sketch analysis.');
  }

  const apiKey = getGeminiApiKey();
  const { mimeType, base64Data } = parseDataUrl(imageDataUrl);

  const response = await fetch(buildGenerateContentUrl(apiKey), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      buildSketchAnalysisPayload({ mimeType, base64Data }),
    ),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Gemini API request failed (${response.status}): ${errorBody}`,
    );
  }

  const payload = await response.json();
  const responseText = extractResponseText(payload);

  if (!responseText) {
    throw new Error('Gemini API returned an empty response.');
  }

  return responseText;
}

export { SKETCH_ANALYSIS_PROMPT } from './geminiPrompt';
