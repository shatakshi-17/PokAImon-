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
  const inFlightRequestRef = useRef(null);

  const resetAnalysis = useCallback(() => {
    setStatus(ANALYSIS_STATUS.IDLE);
    setError(null);
    setRawResponse(null);
    setCandidates([]);
  }, []);

  const analyzeSketch = useCallback(async (imageData) => {
    if (inFlightRequestRef.current) {
      console.warn(
        '[useSketchAnalysis] Analysis already in progress; ignoring duplicate trigger',
      );
      return inFlightRequestRef.current;
    }

    if (isRequestActiveRef.current) {
      console.warn(
        '[useSketchAnalysis] Request lock active; ignoring duplicate trigger',
      );
      return null;
    }

    if (!imageData) {
      setStatus(ANALYSIS_STATUS.ERROR);
      setError('Export a sketch before starting analysis.');
      setRawResponse(null);
      setCandidates([]);
      return null;
    }

    console.log('[useSketchAnalysis] Analysis started');

    isRequestActiveRef.current = true;
    setStatus(ANALYSIS_STATUS.LOADING);
    setError(null);
    setRawResponse(null);
    setCandidates([]);

    const requestPromise = (async () => {
      try {
        const responseText = await analyzeSketchRequest(imageData);
        console.log('[useSketchAnalysis] Gemini returned; parsing candidates');

        setRawResponse(responseText);

        try {
          const parsedCandidates = parseGeminiCandidates(responseText);
          setCandidates(parsedCandidates);
          setStatus(ANALYSIS_STATUS.SUCCESS);
          console.log('[useSketchAnalysis] Analysis completed', {
            candidateCount: parsedCandidates.length,
          });
          return parsedCandidates;
        } catch (parseError) {
          setCandidates([]);
          setError(toUserFriendlyAnalysisError(parseError));
          setStatus(ANALYSIS_STATUS.ERROR);
          console.error('[useSketchAnalysis] Failed to parse Gemini response', parseError);
          return null;
        }
      } catch (analysisError) {
        setError(toUserFriendlyAnalysisError(analysisError));
        setStatus(ANALYSIS_STATUS.ERROR);
        setRawResponse(null);
        setCandidates([]);
        console.error('[useSketchAnalysis] Analysis failed', analysisError);
        return null;
      } finally {
        isRequestActiveRef.current = false;
        inFlightRequestRef.current = null;
        console.log('[useSketchAnalysis] Analysis request finished');
      }
    })();

    inFlightRequestRef.current = requestPromise;
    return requestPromise;
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
