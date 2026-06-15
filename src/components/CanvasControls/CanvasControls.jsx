const baseButtonClassName =
  'min-h-11 rounded-xl px-5 py-2.5 text-sm font-semibold transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100';

function CanvasControls({ onClear, onUndo, onExport, canUndo }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        type="button"
        className={`${baseButtonClassName} border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20`}
        onClick={onClear}
      >
        Clear
      </button>
      <button
        type="button"
        className={`${baseButtonClassName} border border-sky-500/30 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20`}
        onClick={onUndo}
        disabled={!canUndo}
      >
        Undo
      </button>
      <button
        type="button"
        className={`${baseButtonClassName} border border-yellow-400/40 bg-yellow-400/15 text-yellow-200 shadow-sm shadow-yellow-400/10 hover:bg-yellow-400/25`}
        onClick={onExport}
      >
        Export Sketch
      </button>
    </div>
  );
}

export default CanvasControls;
