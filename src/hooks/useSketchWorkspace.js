import { useCallback, useState } from 'react';
import { exportCanvasToImage } from '../utils/canvasExport';
import { useDrawingCanvas } from './useDrawingCanvas';

export function useSketchWorkspace(options = {}) {
  const {
    canvasRef,
    handlers,
    width,
    height,
    clearCanvas: clearDrawingCanvas,
    undoLastStroke,
    canUndo,
  } = useDrawingCanvas(options);
  const [exportedSketch, setExportedSketch] = useState(null);

  const exportSketch = useCallback(() => {
    const dataUrl = exportCanvasToImage(canvasRef.current);
    if (!dataUrl) {
      return null;
    }

    setExportedSketch(dataUrl);
    return dataUrl;
  }, [canvasRef]);

  const clearCanvas = useCallback(() => {
    clearDrawingCanvas();
    setExportedSketch(null);
  }, [clearDrawingCanvas]);

  return {
    canvasRef,
    handlers,
    width,
    height,
    clearCanvas,
    undoLastStroke,
    canUndo,
    exportedSketch,
    exportSketch,
  };
}
