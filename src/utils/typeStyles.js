const TYPE_STYLES = {
  normal: { badge: 'bg-stone-500', header: 'bg-stone-600' },
  fire: { badge: 'bg-orange-500', header: 'bg-orange-600' },
  water: { badge: 'bg-blue-500', header: 'bg-blue-600' },
  grass: { badge: 'bg-green-500', header: 'bg-green-600' },
  electric: { badge: 'bg-yellow-400 text-yellow-950', header: 'bg-yellow-500 text-yellow-950' },
  ice: { badge: 'bg-cyan-300 text-cyan-950', header: 'bg-cyan-400 text-cyan-950' },
  fighting: { badge: 'bg-red-700', header: 'bg-red-700' },
  poison: { badge: 'bg-purple-600', header: 'bg-purple-700' },
  ground: { badge: 'bg-amber-700', header: 'bg-amber-700' },
  flying: { badge: 'bg-indigo-400 text-indigo-950', header: 'bg-indigo-500' },
  psychic: { badge: 'bg-pink-500', header: 'bg-pink-600' },
  bug: { badge: 'bg-lime-600', header: 'bg-lime-600' },
  rock: { badge: 'bg-yellow-700', header: 'bg-yellow-700' },
  ghost: { badge: 'bg-violet-700', header: 'bg-violet-700' },
  dragon: { badge: 'bg-indigo-700', header: 'bg-indigo-800' },
  dark: { badge: 'bg-neutral-700', header: 'bg-neutral-800' },
  steel: { badge: 'bg-slate-500', header: 'bg-slate-600' },
  fairy: { badge: 'bg-rose-400 text-rose-950', header: 'bg-rose-500' },
};

const DEFAULT_TYPE_STYLE = {
  badge: 'bg-slate-500',
  header: 'bg-slate-600',
};

export function getTypeStyles(type) {
  const normalizedType = String(type ?? '')
    .trim()
    .toLowerCase();

  return TYPE_STYLES[normalizedType] ?? DEFAULT_TYPE_STYLE;
}
