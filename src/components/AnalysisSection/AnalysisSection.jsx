import { ANALYSIS_STATUS } from '../../utils/analysisConstants';
import PokemonResultsSection from '../PokemonResultsSection/PokemonResultsSection';

const analyzeButtonClassName =
  'mt-4 rounded-lg border border-yellow-400/30 bg-yellow-400/10 px-5 py-2.5 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400/20 disabled:cursor-not-allowed disabled:opacity-50';

function AnalysisSection({
  onAnalyze,
  canAnalyze = false,
  isLoading = false,
  error = null,
  status = ANALYSIS_STATUS.IDLE,
  candidates = [],
}) {
  const showIdleMessage = status === ANALYSIS_STATUS.IDLE && !error;
  const hasParsedCandidates = candidates.length > 0;

  return (
    <section
      aria-label="Sketch analysis"
      className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 text-center shadow-lg shadow-black/20"
    >
      <h2 className="mb-2 text-lg font-semibold text-white">Sketch Analysis</h2>

      {showIdleMessage && (
        <p className="text-sm text-slate-400">
          Export a sketch, then analyze it with Gemini to generate Pokemon
          flashcards.
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

      {status === ANALYSIS_STATUS.SUCCESS && !error && hasParsedCandidates && (
        <p className="text-sm text-green-400" role="status">
          Found {candidates.length} Pokemon candidate
          {candidates.length === 1 ? '' : 's'} from your sketch.
        </p>
      )}

      <button
        type="button"
        className={analyzeButtonClassName}
        onClick={onAnalyze}
        disabled={!canAnalyze || isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Sketch'}
      </button>

      <PokemonResultsSection candidates={candidates} />
    </section>
  );
}

export default AnalysisSection;
