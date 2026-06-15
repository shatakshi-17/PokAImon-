import AnalysisSection from './components/AnalysisSection/AnalysisSection';
import DrawingSection from './components/DrawingSection/DrawingSection';
import { usePokAImonWorkflow } from './hooks/usePokAImonWorkflow';

function App() {
  const { drawing, analysis } = usePokAImonWorkflow();

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-slate-950 to-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
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
          <DrawingSection {...drawing} />
          <AnalysisSection {...analysis} />
        </div>
      </div>
    </main>
  );
}

export default App;
