function SketchPreview({ imageData, alt = 'Exported sketch preview' }) {
  if (!imageData) {
    return null;
  }

  return (
    <figure className="mt-4">
      <figcaption className="mb-2 text-sm text-slate-400">
        Exported sketch preview
      </figcaption>
      <img
        src={imageData}
        alt={alt}
        className="max-w-xs rounded border border-slate-700"
      />
    </figure>
  );
}

export default SketchPreview;
