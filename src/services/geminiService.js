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
  console.log('[geminiService] analyzeSketch called');

  if (inFlightAnalysisRequest) {
    console.warn(
      '[geminiService] Duplicate Gemini request blocked; reusing in-flight request',
    );
    return inFlightAnalysisRequest;
  }

  if (!imageDataUrl) {
    throw new Error('Image data is required for sketch analysis.');
  }

  const requestPromise = (async () => {
    const apiKey = getGeminiApiKey();
    const { mimeType, base64Data } = parseDataUrl(imageDataUrl);

    console.log('[geminiService] Calling Gemini API', {
      model: GEMINI_CONFIG.model,
    });

    const response = await fetch(buildGenerateContentUrl(apiKey), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        buildSketchAnalysisPayload({ mimeType, base64Data }),
      ),
    });

    console.log('[geminiService] Gemini response received', {
      status: response.status,
      ok: response.ok,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('[geminiService] Gemini error response body', errorBody);
      throw createGeminiApiError(response.status, errorBody);
    }

    const payload = await response.json();
    const responseText = extractResponseText(payload);

    if (!responseText) {
      throw new Error('Gemini API returned an empty response.');
    }

    console.log('[geminiService] Gemini analysis completed successfully');
    return responseText;
  })();

  inFlightAnalysisRequest = requestPromise;

  try {
    return await requestPromise;
  } catch (error) {
    console.error('[geminiService] Gemini analysis failed', error);
    throw error;
  } finally {
    inFlightAnalysisRequest = null;
  }
}

export { SKETCH_ANALYSIS_PROMPT } from './geminiPrompt';
