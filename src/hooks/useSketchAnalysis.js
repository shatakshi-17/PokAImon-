import { useCallback, useRef, useState } from 'react';
import { analyzeSketch as analyzeSketchRequest } from '../services/geminiService';
import { ANALYSIS_STATUS } from '../utils/analysisConstants';
import { toUserFriendlyAnalysisError } from '../utils/analysisErrors';

export function useSketchAnalysis() {
  const [status, setStatus] = useState(ANALYSIS_STATUS.IDLE);
  const [error, setError] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);
  const isRequestActiveRef = useRef(false);

  const resetAnalysis = useCallback(() => {
    setStatus(ANALYSIS_STATUS.IDLE);
    setError(null);
    setRawResponse(null);
  }, []);

  const analyzeSketch = useCallback(async (imageData) => {
    if (isRequestActiveRef.current) {
      return null;
    }

    if (!imageData) {
      setStatus(ANALYSIS_STATUS.ERROR);
      setError('Export a sketch before starting analysis.');
      setRawResponse(null);
      return null;
    }

    isRequestActiveRef.current = true;
    setStatus(ANALYSIS_STATUS.LOADING);
    setError(null);
    setRawResponse(null);

    try {
      const responseText = await analyzeSketchRequest(imageData);
      setRawResponse(responseText);
      setStatus(ANALYSIS_STATUS.SUCCESS);
      return responseText;
    } catch (analysisError) {
      setError(toUserFriendlyAnalysisError(analysisError));
      setStatus(ANALYSIS_STATUS.ERROR);
      setRawResponse(null);
      return null;
    } finally {
      isRequestActiveRef.current = false;
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
