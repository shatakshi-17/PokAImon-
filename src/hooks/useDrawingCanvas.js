import { useCallback, useEffect, useRef } from 'react';
import { CANVAS_DEFAULTS } from '../utils/canvasConstants';

export function useDrawingCanvas(options = {}) {
  const {
    width = CANVAS_DEFAULTS.width,
    height = CANVAS_DEFAULTS.height,
    strokeColor = CANVAS_DEFAULTS.strokeColor,
    strokeWidth = CANVAS_DEFAULTS.strokeWidth,
    backgroundColor = CANVAS_DEFAULTS.backgroundColor,
  } = options;

  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  const getContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }

    return canvas.getContext('2d');
  }, []);

  const getPoint = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return { x: 0, y: 0 };
    }

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [width, height, strokeColor, strokeWidth, backgroundColor]);

  const startDrawing = useCallback(
    (event) => {
      const ctx = getContext();
      if (!ctx) {
        return;
      }

      const { x, y } = getPoint(event);
      ctx.beginPath();
      ctx.moveTo(x, y);
      isDrawingRef.current = true;
    },
    [getContext, getPoint],
  );

  const draw = useCallback(
    (event) => {
      if (!isDrawingRef.current) {
        return;
      }

      const ctx = getContext();
      if (!ctx) {
        return;
      }

      const { x, y } = getPoint(event);
      ctx.lineTo(x, y);
      ctx.stroke();
    },
    [getContext, getPoint],
  );

  const stopDrawing = useCallback(() => {
    isDrawingRef.current = false;
  }, []);

  return {
    canvasRef,
    handlers: {
      onMouseDown: startDrawing,
      onMouseMove: draw,
      onMouseUp: stopDrawing,
      onMouseLeave: stopDrawing,
    },
    width,
    height,
  };
}
