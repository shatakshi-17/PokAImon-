export function parseGeminiErrorBody(errorBody) {
  try {
    const parsed = JSON.parse(errorBody);
    return parsed?.error ?? null;
  } catch {
    return null;
  }
}

export function createGeminiApiError(status, errorBody) {
  const normalizedBody = String(errorBody ?? '');
  const parsedError = parseGeminiErrorBody(normalizedBody);
  const message = parsedError?.message ?? normalizedBody;
  const statusCode = parsedError?.code ?? status;

  if (
    message.includes('API key expired') ||
    message.includes('API_KEY_INVALID') ||
    statusCode === 401
  ) {
    return new Error('GEMINI_INVALID_API_KEY');
  }

  if (
    message.includes('limit: 0') ||
    message.includes('free_tier_requests, limit: 0')
  ) {
    return new Error('GEMINI_MODEL_QUOTA_UNAVAILABLE');
  }

  if (
    statusCode === 429 ||
    parsedError?.status === 'RESOURCE_EXHAUSTED' ||
    message.includes('RESOURCE_EXHAUSTED') ||
    message.includes('rate limit') ||
    message.includes('quota')
  ) {
    return new Error('GEMINI_RATE_LIMIT');
  }

  return new Error(
    `Gemini API request failed (${statusCode}): ${message}`,
  );
}
