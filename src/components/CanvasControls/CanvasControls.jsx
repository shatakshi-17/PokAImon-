const buttonClassName =
  'rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-yellow-400/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50';

function CanvasControls({ onClear, onUndo, onExport, canUndo }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button type="button" className={buttonClassName} onClick={onClear}>
        Clear Canvas
      </button>
      <button
        type="button"
        className={buttonClassName}
        onClick={onUndo}
        disabled={!canUndo}
      >
        Undo Last Stroke
      </button>
      <button type="button" className={buttonClassName} onClick={onExport}>
        Export Sketch
      </button>
    </div>
  );
}

export default CanvasControls;
