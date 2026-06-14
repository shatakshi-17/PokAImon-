function ResultsPlaceholder() {
  return (
    <section
      aria-label="AI results placeholder"
      className="rounded-lg border border-dashed border-slate-700 bg-slate-900 p-6 text-center"
    >
      <h2 className="mb-2 text-lg font-semibold text-white">AI Results</h2>
      <p className="text-sm text-slate-400">
        Your Pokemon-style flashcards will appear here after you submit a
        sketch for analysis.
      </p>
    </section>
  );
}

export default ResultsPlaceholder;
