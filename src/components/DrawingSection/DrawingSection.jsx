import CanvasControls from '../CanvasControls';
import DrawingCanvas from '../DrawingCanvas';
import SketchPreview from '../SketchPreview';

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
    <section aria-label="Drawing area">
      <h2 className="mb-3 text-lg font-semibold">Draw your creature</h2>
      <DrawingCanvas
        canvasRef={canvasRef}
        handlers={handlers}
        width={width}
        height={height}
        className="max-w-full cursor-crosshair rounded-lg border border-slate-700"
      />
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
