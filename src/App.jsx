import AnalysisSection from './components/AnalysisSection/AnalysisSection';
import DrawingSection from './components/DrawingSection/DrawingSection';
import { usePokAImonWorkflow } from './hooks/usePokAImonWorkflow';

function App() {
  const { drawing, analysis } = usePokAImonWorkflow();

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.15)_0%,_transparent_50%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-8 text-center sm:mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            AI-powered sketch recognition
          </div>
          <h1 className="mb-3 text-4xl font-black tracking-tight sm:text-6xl">
            <span className="bg-gradient-to-r from-red-400 via-white to-yellow-300 bg-clip-text text-transparent">
              Pok
            </span>
            <span className="text-yellow-400">AI</span>
            <span className="bg-gradient-to-r from-yellow-300 via-white to-indigo-300 bg-clip-text text-transparent">
              mon
            </span>
          </h1>
          <p className="mx-auto max-w-md text-base text-slate-400 sm:text-lg">
            Sketch a creature, export it, and let Gemini reveal your
            Pokemon-style flashcards.
          </p>
        </header>

        <div className="flex flex-col gap-6 sm:gap-8">
          <DrawingSection {...drawing} />
          <AnalysisSection {...analysis} />
        </div>
      </div>
    </main>
  );
}

export default App;
