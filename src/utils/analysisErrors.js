export function toUserFriendlyAnalysisError(error) {
  const message =
    error instanceof Error ? error.message : 'Sketch analysis failed.';

  if (message.includes('Missing VITE_GEMINI_API_KEY')) {
    return 'Gemini API key is not configured. Add VITE_GEMINI_API_KEY to your .env file.';
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

  if (message.includes('(429)')) {
    return 'Too many requests. Wait a moment and try again.';
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

  return message;
}
