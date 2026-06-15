import {
  MAX_POKEMON_CANDIDATES,
  POKEMON_CANDIDATE_DEFAULTS,
  REQUIRED_ABILITY_COUNT,
} from './pokemonCandidateDefaults';

function extractJsonString(rawResponse) {
  const trimmed = rawResponse.trim();
  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);

  if (fencedMatch) {
    return fencedMatch[1].trim();
  }

  const startIndex = trimmed.indexOf('{');
  const endIndex = trimmed.lastIndexOf('}');

  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    return trimmed.slice(startIndex, endIndex + 1);
  }

  return trimmed;
}

function normalizeString(value, fallback) {
  const normalized = String(value ?? fallback).trim();
  return normalized || fallback;
}

function normalizeAbilities(value) {
  const fallbackAbilities = [...POKEMON_CANDIDATE_DEFAULTS.abilities];
  const source = Array.isArray(value) ? value : [];

  const normalized = source
    .map((ability) => String(ability ?? '').trim())
    .filter(Boolean);

  while (normalized.length < REQUIRED_ABILITY_COUNT) {
    normalized.push(fallbackAbilities[normalized.length]);
  }

  return normalized.slice(0, REQUIRED_ABILITY_COUNT);
}

export function normalizePokemonCandidate(rawCandidate, index) {
  return {
    name: normalizeString(rawCandidate?.name, `Candidate ${index + 1}`),
    type: normalizeString(rawCandidate?.type, POKEMON_CANDIDATE_DEFAULTS.type),
    species: normalizeString(
      rawCandidate?.species,
      POKEMON_CANDIDATE_DEFAULTS.species,
    ),
    description: normalizeString(
      rawCandidate?.description,
      POKEMON_CANDIDATE_DEFAULTS.description,
    ),
    signatureMove: normalizeString(
      rawCandidate?.signatureMove ?? rawCandidate?.signature_move,
      POKEMON_CANDIDATE_DEFAULTS.signatureMove,
    ),
    abilities: normalizeAbilities(rawCandidate?.abilities),
    habitat: normalizeString(
      rawCandidate?.habitat,
      POKEMON_CANDIDATE_DEFAULTS.habitat,
    ),
  };
}

export function parseGeminiCandidates(rawResponse) {
  if (!rawResponse?.trim()) {
    throw new Error('Empty Gemini response.');
  }

  let parsedPayload;

  try {
    parsedPayload = JSON.parse(extractJsonString(rawResponse));
  } catch {
    throw new Error('Could not parse Gemini response as JSON.');
  }

  const candidatesArray = Array.isArray(parsedPayload?.candidates)
    ? parsedPayload.candidates
    : null;

  if (!candidatesArray?.length) {
    throw new Error('Gemini response did not include any candidates.');
  }

  return candidatesArray
    .slice(0, MAX_POKEMON_CANDIDATES)
    .map((candidate, index) => normalizePokemonCandidate(candidate, index));
}
