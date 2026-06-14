import { useCallback, useRef, useState } from 'react';
import { analyzeSketch as analyzeSketchRequest } from '../services/geminiService';
import { ANALYSIS_STATUS } from '../utils/analysisConstants';
import { toUserFriendlyAnalysisError } from '../utils/analysisErrors';
import { parseGeminiCandidates } from '../utils/parseGeminiResponse';

export function useSketchAnalysis() {
  const [status, setStatus] = useState(ANALYSIS_STATUS.IDLE);
  const [error, setError] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const isRequestActiveRef = useRef(false);

  const resetAnalysis = useCallback(() => {
    setStatus(ANALYSIS_STATUS.IDLE);
    setError(null);
    setRawResponse(null);
    setCandidates([]);
  }, []);

  const analyzeSketch = useCallback(async (imageData) => {
    if (isRequestActiveRef.current) {
      return null;
    }

    if (!imageData) {
      setStatus(ANALYSIS_STATUS.ERROR);
      setError('Export a sketch before starting analysis.');
      setRawResponse(null);
      setCandidates([]);
      return null;
    }

    isRequestActiveRef.current = true;
    setStatus(ANALYSIS_STATUS.LOADING);
    setError(null);
    setRawResponse(null);
    setCandidates([]);

    try {
      const responseText = await analyzeSketchRequest(imageData);
      setRawResponse(responseText);

      try {
        const parsedCandidates = parseGeminiCandidates(responseText);
        setCandidates(parsedCandidates);
        setStatus(ANALYSIS_STATUS.SUCCESS);
        return parsedCandidates;
      } catch (parseError) {
        setCandidates([]);
        setError(toUserFriendlyAnalysisError(parseError));
        setStatus(ANALYSIS_STATUS.ERROR);
        return null;
      }
    } catch (analysisError) {
      setError(toUserFriendlyAnalysisError(analysisError));
      setStatus(ANALYSIS_STATUS.ERROR);
      setRawResponse(null);
      setCandidates([]);
      return null;
    } finally {
      isRequestActiveRef.current = false;
    }
  }, []);

  return {
    status,
    error,
    rawResponse,
    candidates,
    analyzeSketch,
    resetAnalysis,
    isLoading: status === ANALYSIS_STATUS.LOADING,
  };
}
