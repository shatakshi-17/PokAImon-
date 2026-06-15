function SketchPreview({ imageData, alt = 'Exported sketch preview' }) {
  if (!imageData) {
    return null;
  }

  return (
    <figure className="text-center">
      <figcaption className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
        Exported preview
      </figcaption>
      <img
        src={imageData}
        alt={alt}
        className="mx-auto h-24 w-auto max-w-[140px] rounded-lg border-2 border-indigo-400/30 object-contain shadow-md shadow-black/30"
      />
    </figure>
  );
}

export default SketchPreview;
