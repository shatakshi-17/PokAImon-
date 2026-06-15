import CanvasControls from '../CanvasControls/CanvasControls';
import DrawingCanvas from '../DrawingCanvas/DrawingCanvas';
import SketchPreview from '../SketchPreview/SketchPreview';

function DrawingSection({
  canvasRef,
  handlers,
  width,
  height,
  clearCanvas,
  undoLastStroke,
  canUndo,
  exportSketch,
  exportedSketch,
}) {
  return (
    <section
      aria-label="Drawing area"
      className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-black/20"
    >
      <h2 className="mb-4 text-lg font-semibold text-white">Draw your creature</h2>
      <div className="rounded-xl border border-slate-700 bg-slate-950 p-3">
        <DrawingCanvas
          canvasRef={canvasRef}
          handlers={handlers}
          width={width}
          height={height}
          className="max-w-full cursor-crosshair rounded-lg"
        />
      </div>
      <div className="mt-4">
        <CanvasControls
          onClear={clearCanvas}
          onUndo={undoLastStroke}
          onExport={exportSketch}
          canUndo={canUndo}
        />
      </div>
      <SketchPreview imageData={exportedSketch} />
    </section>
  );
}

export default DrawingSection;
