function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="mb-4 text-5xl font-black tracking-tight text-white sm:text-6xl">
          Pok<span className="text-yellow-400">AI</span>mon
        </h1>
        <p className="max-w-xl text-lg text-slate-300">
          Draw a creature, submit your sketch, and discover Pokemon-style
          flashcards powered by AI vision.
        </p>
        <p className="mt-8 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-400">
          Phase 1 scaffold — drawing canvas coming next
        </p>
      </div>
    </main>
  );
}

export default Home;
