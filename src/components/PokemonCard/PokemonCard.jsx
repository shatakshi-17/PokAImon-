import { POKEMON_CANDIDATE_DEFAULTS } from '../../utils/pokemonCandidateDefaults';
import { getTypeStyles } from '../../utils/typeStyles';
import TypeBadge from '../TypeBadge/TypeBadge';

function PokemonCard({ candidate = {} }) {
  const name = candidate.name ?? POKEMON_CANDIDATE_DEFAULTS.name;
  const type = candidate.type ?? POKEMON_CANDIDATE_DEFAULTS.type;
  const species = candidate.species ?? POKEMON_CANDIDATE_DEFAULTS.species;
  const description =
    candidate.description ?? POKEMON_CANDIDATE_DEFAULTS.description;
  const signatureMove =
    candidate.signatureMove ?? POKEMON_CANDIDATE_DEFAULTS.signatureMove;
  const abilities = Array.isArray(candidate.abilities)
    ? candidate.abilities
    : POKEMON_CANDIDATE_DEFAULTS.abilities;
  const habitat = candidate.habitat ?? POKEMON_CANDIDATE_DEFAULTS.habitat;
  const { header } = getTypeStyles(type);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 text-left shadow-xl shadow-black/30">
      <div className={`${header} px-5 py-4`}>
        <h3 className="text-2xl font-black uppercase leading-tight tracking-wide text-white drop-shadow-sm">
          {name}
        </h3>
        <div className="mt-2">
          <TypeBadge type={type} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <p className="text-sm italic text-slate-400">{species}</p>

        <div className="max-h-32 overflow-y-auto pr-1">
          <p className="text-sm leading-relaxed text-slate-300">{description}</p>
        </div>

        <div className="space-y-3 border-t border-slate-800 pt-4">
          <div>
            <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-yellow-400">
              Signature Move
            </h4>
            <p className="text-sm font-semibold text-white">{signatureMove}</p>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              Abilities
            </h4>
            <ul className="flex flex-wrap gap-2">
              {abilities.map((ability, index) => (
                <li
                  key={`${ability}-${index}`}
                  className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs font-semibold text-slate-200"
                >
                  {ability}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">
              Habitat
            </h4>
            <p className="text-sm text-slate-300">{habitat}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default PokemonCard;
