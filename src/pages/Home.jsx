import DrawingCanvas from '../components/DrawingCanvas';
import ResultsPlaceholder from '../components/ResultsPlaceholder';

function Home() {
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
          <section aria-label="Drawing area">
            <h2 className="mb-3 text-lg font-semibold">Draw your creature</h2>
            <DrawingCanvas className="max-w-full cursor-crosshair rounded-lg border border-slate-700" />
          </section>

          <ResultsPlaceholder />
        </div>
      </div>
    </main>
  );
}

export default Home;
