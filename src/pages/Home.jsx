import { useCallback } from 'react';
import DrawingSection from '../components/DrawingSection';
import ResultsPlaceholder from '../components/ResultsPlaceholder';
import { useSketchAnalysis } from '../hooks/useSketchAnalysis';
import { useSketchWorkspace } from '../hooks/useSketchWorkspace';

function Home() {
  const {
    canvasRef,
    handlers,
    width,
    height,
    clearCanvas,
    undoLastStroke,
    canUndo,
    exportSketch,
    exportedSketch,
  } = useSketchWorkspace();
  const {
    analyzeSketch,
    resetAnalysis,
    isLoading,
    error,
    status,
  } = useSketchAnalysis();

  const handleClearCanvas = useCallback(() => {
    clearCanvas();
    resetAnalysis();
  }, [clearCanvas, resetAnalysis]);

  const handleAnalyzeSketch = useCallback(() => {
    analyzeSketch(exportedSketch);
  }, [analyzeSketch, exportedSketch]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <header className="mb-10 text-center">
          <h1 className="mb-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
            Pok<span className="text-yellow-400">AI</span>mon
          </h1>
          <p className="mx-auto max-w-xl text-lg text-slate-300">
            Draw a creature, submit your sketch, and discover Pokemon-style
            flashcards powered by AI vision.
          </p>
        </header>

        <div className="flex flex-col gap-8">
          <DrawingSection
            canvasRef={canvasRef}
            handlers={handlers}
            width={width}
            height={height}
            clearCanvas={handleClearCanvas}
            undoLastStroke={undoLastStroke}
            canUndo={canUndo}
            exportSketch={exportSketch}
            exportedSketch={exportedSketch}
          />
          <ResultsPlaceholder
            onAnalyze={handleAnalyzeSketch}
            canAnalyze={Boolean(exportedSketch)}
            isLoading={isLoading}
            error={error}
            status={status}
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
