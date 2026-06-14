import { CANVAS_DEFAULTS } from './canvasConstants';

export function exportCanvasToImage(
  canvas,
  mimeType = CANVAS_DEFAULTS.exportMimeType,
) {
  if (!canvas) {
    return null;
  }

  return canvas.toDataURL(mimeType);
}
