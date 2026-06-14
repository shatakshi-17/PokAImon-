const TYPE_STYLES = {
  normal: { badge: 'bg-stone-500', header: 'bg-stone-400' },
  fire: { badge: 'bg-orange-500', header: 'bg-orange-400' },
  water: { badge: 'bg-blue-500', header: 'bg-blue-400' },
  grass: { badge: 'bg-green-500', header: 'bg-green-500' },
  electric: { badge: 'bg-yellow-400 text-yellow-950', header: 'bg-yellow-400' },
  ice: { badge: 'bg-cyan-300 text-cyan-950', header: 'bg-cyan-300' },
  fighting: { badge: 'bg-red-700', header: 'bg-red-600' },
  poison: { badge: 'bg-purple-600', header: 'bg-purple-500' },
  ground: { badge: 'bg-amber-700', header: 'bg-amber-600' },
  flying: { badge: 'bg-indigo-400 text-indigo-950', header: 'bg-indigo-400' },
  psychic: { badge: 'bg-pink-500', header: 'bg-pink-400' },
  bug: { badge: 'bg-lime-600', header: 'bg-lime-500' },
  rock: { badge: 'bg-yellow-700', header: 'bg-yellow-600' },
  ghost: { badge: 'bg-violet-700', header: 'bg-violet-600' },
  dragon: { badge: 'bg-indigo-700', header: 'bg-indigo-600' },
  dark: { badge: 'bg-neutral-700', header: 'bg-neutral-600' },
  steel: { badge: 'bg-slate-500', header: 'bg-slate-400' },
  fairy: { badge: 'bg-rose-400 text-rose-950', header: 'bg-rose-400' },
};

const DEFAULT_TYPE_STYLE = {
  badge: 'bg-slate-500',
  header: 'bg-slate-400',
};

export function getTypeStyles(type) {
  const normalizedType = String(type ?? '')
    .trim()
    .toLowerCase();

  return TYPE_STYLES[normalizedType] ?? DEFAULT_TYPE_STYLE;
}
