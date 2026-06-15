function DrawingCanvas({
  canvasRef,
  handlers,
  width,
  height,
  className = '',
}) {
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`touch-none select-none ${className}`}
      aria-label="Drawing canvas"
      {...handlers}
    />
  );
}

export default DrawingCanvas;
