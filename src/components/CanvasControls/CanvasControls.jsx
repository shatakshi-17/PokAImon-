function CanvasControls({ onClear, onUndo, onExport, canUndo }) {
  return (
    <div className="flex flex-wrap gap-3">
      <button type="button" onClick={onClear}>
        Clear Canvas
      </button>
      <button type="button" onClick={onUndo} disabled={!canUndo}>
        Undo Last Stroke
      </button>
      <button type="button" onClick={onExport}>
        Export Sketch
      </button>
    </div>
  );
}

export default CanvasControls;
