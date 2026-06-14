import { POKEMON_CANDIDATE_DEFAULTS } from '../../utils/pokemonCandidateDefaults';
import { getTypeStyles } from '../../utils/typeStyles';
import TypeBadge from '../TypeBadge';

function PokemonCard({ candidate = {} }) {
  const name = candidate.name ?? POKEMON_CANDIDATE_DEFAULTS.name;
  const type = candidate.type ?? POKEMON_CANDIDATE_DEFAULTS.type;
  const description =
    candidate.description ?? POKEMON_CANDIDATE_DEFAULTS.description;
  const abilities = Array.isArray(candidate.abilities)
    ? candidate.abilities
    : POKEMON_CANDIDATE_DEFAULTS.abilities;
  const weakness = candidate.weakness ?? POKEMON_CANDIDATE_DEFAULTS.weakness;
  const confidence = Number.isFinite(candidate.confidence)
    ? candidate.confidence
    : POKEMON_CANDIDATE_DEFAULTS.confidence;
  const { header } = getTypeStyles(type);
  const confidencePercent = Math.round(confidence * 100);

  return (
    <article className="overflow-hidden rounded-2xl border-2 border-slate-800 bg-white text-left text-slate-900 shadow-lg">
      <div className={`${header} px-4 py-4`}>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-black uppercase leading-tight tracking-wide text-white drop-shadow-sm">
            {name}
          </h3>
          <TypeBadge type={type} />
        </div>
      </div>

      <div className="space-y-4 p-4">
        <p className="text-sm leading-relaxed text-slate-700">{description}</p>

        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            Abilities
          </h4>
          {abilities.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {abilities.map((ability, index) => (
                <li
                  key={`${ability}-${index}`}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  {ability}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">None listed</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-3">
          <div>
            <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">
              Weakness
            </h4>
            <p className="text-sm font-semibold text-slate-800">{weakness}</p>
          </div>
          <div>
            <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">
              Confidence
            </h4>
            <p className="text-sm font-semibold text-slate-800">
              {confidencePercent}%
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PokemonCard;
