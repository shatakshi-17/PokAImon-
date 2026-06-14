import { ANALYSIS_STATUS } from '../../utils/analysisConstants';
import AnalysisDebugPanel from '../AnalysisDebugPanel';
import CandidatesDebugPanel from '../CandidatesDebugPanel';

function AnalysisSection({
  onAnalyze,
  canAnalyze = false,
  isLoading = false,
  error = null,
  status = ANALYSIS_STATUS.IDLE,
  rawResponse = null,
  candidates = [],
}) {
  const showIdleMessage = status === ANALYSIS_STATUS.IDLE && !error;
  const hasParsedCandidates = candidates.length > 0;

  return (
    <section
      aria-label="Sketch analysis"
      className="rounded-lg border border-dashed border-slate-700 bg-slate-900 p-6 text-center"
    >
      <h2 className="mb-2 text-lg font-semibold text-white">Sketch Analysis</h2>

      {showIdleMessage && (
        <p className="text-sm text-slate-400">
          Export a sketch, then analyze it with Gemini to generate creature
          ideas.
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
          {hasParsedCandidates
            ? `Parsed ${candidates.length} Pokemon candidate${candidates.length === 1 ? '' : 's'}.`
            : 'Analysis complete.'}
        </p>
      )}

      <button
        type="button"
        className="mt-4"
        onClick={onAnalyze}
        disabled={!canAnalyze || isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Sketch'}
      </button>

      <CandidatesDebugPanel candidates={candidates} />
      <AnalysisDebugPanel rawResponse={rawResponse} />
    </section>
  );
}

export default AnalysisSection;
