import { useCallback, useState } from 'react';
import { analyzeSketch as analyzeSketchRequest } from '../services/geminiService';
import { ANALYSIS_STATUS } from '../utils/analysisConstants';

export function useSketchAnalysis() {
  const [status, setStatus] = useState(ANALYSIS_STATUS.IDLE);
  const [error, setError] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);

  const resetAnalysis = useCallback(() => {
    setStatus(ANALYSIS_STATUS.IDLE);
    setError(null);
    setRawResponse(null);
  }, []);

  const analyzeSketch = useCallback(async (imageData) => {
    if (!imageData) {
      setStatus(ANALYSIS_STATUS.ERROR);
      setError('Export a sketch before starting analysis.');
      setRawResponse(null);
      return null;
    }

    setStatus(ANALYSIS_STATUS.LOADING);
    setError(null);
    setRawResponse(null);

    try {
      const responseText = await analyzeSketchRequest(imageData);
      setRawResponse(responseText);
      setStatus(ANALYSIS_STATUS.SUCCESS);
      return responseText;
    } catch (analysisError) {
      const message =
        analysisError instanceof Error
          ? analysisError.message
          : 'Sketch analysis failed.';
      setError(message);
      setStatus(ANALYSIS_STATUS.ERROR);
      return null;
    }
  }, []);

  return {
    status,
    error,
    rawResponse,
    analyzeSketch,
    resetAnalysis,
    isLoading: status === ANALYSIS_STATUS.LOADING,
  };
}
