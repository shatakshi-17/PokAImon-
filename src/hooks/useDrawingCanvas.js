import { useCallback, useEffect, useRef, useState } from 'react';
import { CANVAS_DEFAULTS } from '../utils/canvasConstants';

function applyDrawingStyles(ctx, { strokeColor, strokeWidth }) {
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
}

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
  const didStrokeRef = useRef(false);
  const historyRef = useRef([]);
  const historyIndexRef = useRef(-1);
  const [canUndo, setCanUndo] = useState(false);

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

    const touch =
      event.touches?.[0] ?? event.changedTouches?.[0] ?? null;
    const clientX = touch ? touch.clientX : event.clientX;
    const clientY = touch ? touch.clientY : event.clientY;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }, []);

  const updateUndoState = useCallback(() => {
    setCanUndo(historyIndexRef.current > 0);
  }, []);

  const captureSnapshot = useCallback(() => {
    const ctx = getContext();
    if (!ctx) {
      return null;
    }

    return ctx.getImageData(0, 0, width, height);
  }, [getContext, width, height]);

  const pushSnapshot = useCallback(
    (snapshot) => {
      if (!snapshot) {
        return;
      }

      historyRef.current = historyRef.current.slice(
        0,
        historyIndexRef.current + 1,
      );
      historyRef.current.push(snapshot);
      historyIndexRef.current = historyRef.current.length - 1;
      updateUndoState();
    },
    [updateUndoState],
  );

  const restoreSnapshot = useCallback(
    (snapshot) => {
      const ctx = getContext();
      if (!ctx || !snapshot) {
        return;
      }

      ctx.putImageData(snapshot, 0, 0);
      applyDrawingStyles(ctx, { strokeColor, strokeWidth });
    },
    [getContext, strokeColor, strokeWidth],
  );

  const fillBackground = useCallback(() => {
    const ctx = getContext();
    if (!ctx) {
      return;
    }

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    applyDrawingStyles(ctx, { strokeColor, strokeWidth });
  }, [getContext, width, height, backgroundColor, strokeColor, strokeWidth]);

  const resetHistory = useCallback(() => {
    fillBackground();
    const snapshot = captureSnapshot();
    historyRef.current = snapshot ? [snapshot] : [];
    historyIndexRef.current = historyRef.current.length - 1;
    updateUndoState();
  }, [captureSnapshot, fillBackground, updateUndoState]);

  useEffect(() => {
    resetHistory();
  }, [resetHistory]);

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
      didStrokeRef.current = false;
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
      didStrokeRef.current = true;
    },
    [getContext, getPoint],
  );

  const stopDrawing = useCallback(() => {
    if (isDrawingRef.current && didStrokeRef.current) {
      pushSnapshot(captureSnapshot());
    }

    isDrawingRef.current = false;
    didStrokeRef.current = false;
  }, [captureSnapshot, pushSnapshot]);

  const handleTouchStart = useCallback(
    (event) => {
      if (event.touches.length !== 1) {
        return;
      }

      event.preventDefault();
      startDrawing(event);
    },
    [startDrawing],
  );

  const handleTouchMove = useCallback(
    (event) => {
      if (!isDrawingRef.current || event.touches.length !== 1) {
        return;
      }

      event.preventDefault();
      draw(event);
    },
    [draw],
  );

  const handleTouchEnd = useCallback(
    (event) => {
      event.preventDefault();
      stopDrawing();
    },
    [stopDrawing],
  );

  const clearCanvas = useCallback(() => {
    resetHistory();
  }, [resetHistory]);

  const undoLastStroke = useCallback(() => {
    if (historyIndexRef.current <= 0) {
      return;
    }

    historyIndexRef.current -= 1;
    restoreSnapshot(historyRef.current[historyIndexRef.current]);
    updateUndoState();
  }, [restoreSnapshot, updateUndoState]);

  return {
    canvasRef,
    handlers: {
      onMouseDown: startDrawing,
      onMouseMove: draw,
      onMouseUp: stopDrawing,
      onMouseLeave: stopDrawing,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchEnd,
    },
    width,
    height,
    clearCanvas,
    undoLastStroke,
    canUndo,
  };
}
