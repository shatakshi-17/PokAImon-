export function toUserFriendlyAnalysisError(error) {
  const message =
    error instanceof Error ? error.message : 'Sketch analysis failed.';

  if (message.includes('Missing VITE_GEMINI_API_KEY')) {
    return 'Gemini API key is not configured. Add VITE_GEMINI_API_KEY to your .env file.';
  }

  if (message === 'GEMINI_INVALID_API_KEY') {
    return 'Your Gemini API key is invalid or expired. Create a new key in Google AI Studio, update .env, and restart the dev server.';
  }

  if (message === 'GEMINI_MODEL_QUOTA_UNAVAILABLE') {
    return 'This Gemini model has no free-tier quota on your API key. Set VITE_GEMINI_MODEL=gemini-2.5-flash in .env and restart the dev server.';
  }

  if (message.includes('Export a sketch')) {
    return message;
  }

  if (message.includes('Invalid image data URL')) {
    return 'The exported sketch could not be read. Export your drawing again.';
  }

  if (message.includes('(401)') || message.includes('(403)')) {
    return 'Gemini rejected the request. Check that your API key is valid.';
  }

  if (
    message === 'GEMINI_RATE_LIMIT' ||
    message.includes('(429)') ||
    message.includes('RESOURCE_EXHAUSTED')
  ) {
    return 'Gemini rate limit reached. Wait a minute, then try analyzing again.';
  }

  if (
    message.includes('Failed to fetch') ||
    message.includes('NetworkError') ||
    message.includes('network')
  ) {
    return 'Network error while contacting Gemini. Check your connection and try again.';
  }

  if (message.includes('empty response')) {
    return 'Gemini returned an empty response. Try analyzing again.';
  }

  if (message.includes('Could not parse Gemini response as JSON')) {
    return 'Gemini returned a response that could not be parsed. Try analyzing again.';
  }

  if (message.includes('did not include any candidates')) {
    return 'Gemini did not return any Pokemon candidates. Try analyzing again.';
  }

  return message;
}
