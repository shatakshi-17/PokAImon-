import { useCallback, useRef, useState } from 'react';
import { analyzeSketch as analyzeSketchRequest } from '../services/geminiService';
import { ANALYSIS_STATUS } from '../utils/analysisConstants';
import { toUserFriendlyAnalysisError } from '../utils/analysisErrors';
import { parseGeminiCandidates } from '../utils/parseGeminiResponse';

export function useSketchAnalysis() {
  const [status, setStatus] = useState(ANALYSIS_STATUS.IDLE);
  const [error, setError] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const inFlightRequestRef = useRef(null);

  const resetAnalysis = useCallback(() => {
    setStatus(ANALYSIS_STATUS.IDLE);
    setError(null);
    setCandidates([]);
  }, []);

  const analyzeSketch = useCallback(async (imageData) => {
    if (inFlightRequestRef.current) {
      return inFlightRequestRef.current;
    }

    if (!imageData) {
      setStatus(ANALYSIS_STATUS.ERROR);
      setError('Export a sketch before starting analysis.');
      setCandidates([]);
      return null;
    }

    const requestPromise = (async () => {
      setStatus(ANALYSIS_STATUS.LOADING);
      setError(null);
      setCandidates([]);

      try {
        const responseText = await analyzeSketchRequest(imageData);
        const parsedCandidates = parseGeminiCandidates(responseText);
        setCandidates(parsedCandidates);
        setStatus(ANALYSIS_STATUS.SUCCESS);
        return parsedCandidates;
      } catch (analysisError) {
        setError(toUserFriendlyAnalysisError(analysisError));
        setStatus(ANALYSIS_STATUS.ERROR);
        setCandidates([]);
        return null;
      } finally {
        inFlightRequestRef.current = null;
      }
    })();

    inFlightRequestRef.current = requestPromise;
    return requestPromise;
  }, []);

  return {
    status,
    error,
    candidates,
    analyzeSketch,
    resetAnalysis,
    isLoading: status === ANALYSIS_STATUS.LOADING,
  };
}
