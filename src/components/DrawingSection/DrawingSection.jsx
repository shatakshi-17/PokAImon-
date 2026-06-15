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
      className="panel-glow overflow-hidden rounded-3xl border border-indigo-500/20 bg-slate-900/60 p-5 backdrop-blur-sm sm:p-8"
    >
      <div className="mb-6 text-center">
        <span className="mb-2 inline-block rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-yellow-300">
          Step 1
        </span>
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Draw your creature
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Use your finger or mouse — sketch anything you imagine!
        </p>
      </div>

      <div className="mx-auto flex max-w-fit justify-center rounded-2xl border-2 border-dashed border-indigo-400/30 bg-slate-950/80 p-3 shadow-inner shadow-indigo-500/10 sm:p-4">
        <DrawingCanvas
          canvasRef={canvasRef}
          handlers={handlers}
          width={width}
          height={height}
          className="mx-auto block max-w-full cursor-crosshair rounded-xl shadow-lg shadow-black/40"
        />
      </div>

      <div className="mt-5 flex justify-center">
        <CanvasControls
          onClear={clearCanvas}
          onUndo={undoLastStroke}
          onExport={exportSketch}
          canUndo={canUndo}
        />
      </div>

      <div className="mt-4 flex justify-center">
        <SketchPreview imageData={exportedSketch} />
      </div>
    </section>
  );
}

export default DrawingSection;
