import { useDrawingCanvas } from '../../hooks/useDrawingCanvas';

function DrawingCanvas({
  width,
  height,
  strokeColor,
  strokeWidth,
  backgroundColor,
  className = '',
}) {
  const { canvasRef, handlers, width: canvasWidth, height: canvasHeight } =
    useDrawingCanvas({
      width,
      height,
      strokeColor,
      strokeWidth,
      backgroundColor,
    });

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className={className}
      aria-label="Drawing canvas"
      {...handlers}
    />
  );
}

export default DrawingCanvas;
