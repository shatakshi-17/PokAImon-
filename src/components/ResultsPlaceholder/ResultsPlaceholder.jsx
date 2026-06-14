import { ANALYSIS_STATUS } from '../../utils/analysisConstants';

function ResultsPlaceholder({
  onAnalyze,
  canAnalyze = false,
  isLoading = false,
  error = null,
  status = ANALYSIS_STATUS.IDLE,
}) {
  const showIdleMessage = status === ANALYSIS_STATUS.IDLE && !error;

  return (
    <section
      aria-label="AI results placeholder"
      className="rounded-lg border border-dashed border-slate-700 bg-slate-900 p-6 text-center"
    >
      <h2 className="mb-2 text-lg font-semibold text-white">AI Results</h2>

      {showIdleMessage && (
        <p className="text-sm text-slate-400">
          Export a sketch, then analyze it to generate Pokemon-style flashcards.
        </p>
      )}

      {isLoading && (
        <p className="text-sm text-yellow-400" role="status" aria-live="polite">
          Analyzing sketch with Gemini...
        </p>
      )}

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      {status === ANALYSIS_STATUS.SUCCESS && !error && (
        <p className="text-sm text-green-400" role="status">
          Analysis complete. Flashcard rendering will be added in a later phase.
        </p>
      )}

      <button
        type="button"
        className="mt-4"
        onClick={onAnalyze}
        disabled={!canAnalyze || isLoading}
      >
        Analyze Sketch
      </button>
    </section>
  );
}

export default ResultsPlaceholder;
