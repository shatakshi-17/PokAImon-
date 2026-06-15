import { ANALYSIS_STATUS } from '../../utils/analysisConstants';
import PokemonResultsSection from '../PokemonResultsSection/PokemonResultsSection';

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
      className="panel-glow rounded-3xl border border-indigo-500/20 bg-slate-900/60 p-5 text-center backdrop-blur-sm sm:p-8"
    >
      <div className="mb-4">
        <span className="mb-2 inline-block rounded-full bg-indigo-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-indigo-300">
          Step 2
        </span>
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Analyze your sketch
        </h2>
      </div>

      {showIdleMessage && (
        <p className="text-sm text-slate-400">
          Export a sketch, then analyze it with Gemini to generate Pokemon
          flashcards.
        </p>
      )}

      {isLoading && (
        <p className="text-sm text-yellow-400" role="status" aria-live="polite">
          <span className="mr-2 inline-block h-2 w-2 animate-bounce rounded-full bg-yellow-400" />
          Analyzing sketch with Gemini...
        </p>
      )}

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      {status === ANALYSIS_STATUS.SUCCESS && !error && hasParsedCandidates && (
        <p className="text-sm text-emerald-400" role="status">
          Found {candidates.length} Pokemon candidate
          {candidates.length === 1 ? '' : 's'} from your sketch!
        </p>
      )}

      <button
        type="button"
        className="mt-5 min-h-11 rounded-xl border border-yellow-400/40 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 px-8 py-2.5 text-sm font-bold text-yellow-200 shadow-lg shadow-yellow-400/10 transition hover:from-yellow-400/30 hover:to-amber-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
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
