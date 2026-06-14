export function parseDataUrl(dataUrl) {
  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);

  if (!match) {
    throw new Error('Invalid image data URL.');
  }

  return {
    mimeType: match[1],
    base64Data: match[2],
  };
}
