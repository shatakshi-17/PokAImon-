import { getTypeStyles } from '../../utils/typeStyles';

function TypeBadge({ type }) {
  const { badge } = getTypeStyles(type);

  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white ${badge}`}
    >
      {type}
    </span>
  );
}

export default TypeBadge;
