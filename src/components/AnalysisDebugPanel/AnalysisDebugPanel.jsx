function AnalysisDebugPanel({ rawResponse }) {
  if (!rawResponse) {
    return null;
  }

  return (
    <section
      aria-label="Analysis debug output"
      className="mt-4 rounded border border-slate-700 bg-slate-950 p-4 text-left"
    >
      <h3 className="mb-2 text-sm font-semibold text-slate-300">
        Debug: Raw Gemini Response
      </h3>
      <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words text-xs text-slate-400">
        {rawResponse}
      </pre>
    </section>
  );
}

export default AnalysisDebugPanel;
