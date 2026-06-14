import { useCallback } from 'react';
import { useSketchAnalysis } from './useSketchAnalysis';
import { useSketchWorkspace } from './useSketchWorkspace';

export function usePokAImonWorkflow() {
  const {
    canvasRef,
    handlers,
    width,
    height,
    clearCanvas,
    undoLastStroke,
    canUndo,
    exportSketch,
    exportedSketch,
  } = useSketchWorkspace();
  const {
    analyzeSketch,
    resetAnalysis,
    isLoading,
    error,
    status,
    rawResponse,
    candidates,
  } = useSketchAnalysis();

  const handleClearCanvas = useCallback(() => {
    clearCanvas();
    resetAnalysis();
  }, [clearCanvas, resetAnalysis]);

  const handleAnalyzeSketch = useCallback(() => {
    console.log('[usePokAImonWorkflow] Analyze Sketch button clicked');

    if (!exportedSketch) {
      console.warn(
        '[usePokAImonWorkflow] Analysis skipped because no sketch is exported',
      );
      return;
    }

    analyzeSketch(exportedSketch);
  }, [analyzeSketch, exportedSketch]);

  return {
    drawing: {
      canvasRef,
      handlers,
      width,
      height,
      undoLastStroke,
      canUndo,
      exportSketch,
      exportedSketch,
      clearCanvas: handleClearCanvas,
    },
    analysis: {
      onAnalyze: handleAnalyzeSketch,
      canAnalyze: Boolean(exportedSketch),
      isLoading,
      error,
      status,
      rawResponse,
      candidates,
    },
  };
}
