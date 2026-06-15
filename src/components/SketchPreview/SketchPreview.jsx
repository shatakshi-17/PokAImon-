function SketchPreview({ imageData, alt = 'Exported sketch preview' }) {
  if (!imageData) {
    return null;
  }

  return (
    <figure className="mt-4 inline-block">
      <figcaption className="mb-1 text-xs text-slate-500">
        Exported sketch preview
      </figcaption>
      <img
        src={imageData}
        alt={alt}
        className="h-20 w-auto max-w-[120px] rounded border border-slate-700 object-contain"
      />
    </figure>
  );
}

export default SketchPreview;
