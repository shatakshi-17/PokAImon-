import PokemonCard from '../PokemonCard/PokemonCard';

function PokemonResultsSection({ candidates = [] }) {
  if (!candidates.length) {
    return (
      <p className="mt-6 text-sm text-slate-400">
        Your Pokemon flashcards will appear here after a successful analysis.
      </p>
    );
  }

  return (
    <section aria-label="Pokemon flashcards" className="mt-6 text-left">
      <h3 className="mb-4 text-lg font-semibold text-white">
        Your Pokemon Candidates
      </h3>
      <ul className="grid list-none gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {candidates.map((candidate, index) => (
          <li key={`${candidate.name}-${index}`} className="h-full">
            <PokemonCard candidate={candidate} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PokemonResultsSection;
