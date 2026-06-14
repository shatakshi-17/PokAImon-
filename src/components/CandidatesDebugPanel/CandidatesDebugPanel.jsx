function CandidatesDebugPanel({ candidates }) {
  if (!candidates?.length) {
    return null;
  }

  return (
    <section
      aria-label="Parsed Pokemon candidates"
      className="mt-4 rounded border border-slate-700 bg-slate-950 p-4 text-left"
    >
      <h3 className="mb-3 text-sm font-semibold text-slate-300">
        Debug: Parsed Pokemon Candidates
      </h3>
      <div className="space-y-4">
        {candidates.map((candidate, index) => (
          <article
            key={`${candidate.name}-${index}`}
            className="border-t border-slate-800 pt-3 first:border-t-0 first:pt-0"
          >
            <p className="text-sm text-white">
              <span className="font-semibold">Name:</span> {candidate.name}
            </p>
            <p className="text-sm text-slate-300">
              <span className="font-semibold">Type:</span> {candidate.type}
            </p>
            <p className="text-sm text-slate-300">
              <span className="font-semibold">Description:</span>{' '}
              {candidate.description}
            </p>
            <p className="text-sm text-slate-300">
              <span className="font-semibold">Abilities:</span>{' '}
              {candidate.abilities.length > 0
                ? candidate.abilities.join(', ')
                : 'None listed'}
            </p>
            <p className="text-sm text-slate-300">
              <span className="font-semibold">Weakness:</span>{' '}
              {candidate.weakness}
            </p>
            <p className="text-sm text-slate-300">
              <span className="font-semibold">Confidence:</span>{' '}
              {candidate.confidence.toFixed(2)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CandidatesDebugPanel;
