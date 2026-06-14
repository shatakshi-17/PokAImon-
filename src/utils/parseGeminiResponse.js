import {
  MAX_POKEMON_CANDIDATES,
  POKEMON_CANDIDATE_DEFAULTS,
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

function normalizeConfidence(value) {
  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return POKEMON_CANDIDATE_DEFAULTS.confidence;
  }

  return Math.min(1, Math.max(0, numericValue));
}

function normalizeAbilities(value) {
  if (!Array.isArray(value)) {
    return [...POKEMON_CANDIDATE_DEFAULTS.abilities];
  }

  return value
    .map((ability) => String(ability ?? '').trim())
    .filter(Boolean);
}

function normalizeString(value, fallback) {
  const normalized = String(value ?? fallback).trim();
  return normalized || fallback;
}

export function normalizePokemonCandidate(rawCandidate, index) {
  return {
    name: normalizeString(
      rawCandidate?.name,
      `Candidate ${index + 1}`,
    ),
    type: normalizeString(
      rawCandidate?.type,
      POKEMON_CANDIDATE_DEFAULTS.type,
    ),
    description: normalizeString(
      rawCandidate?.description,
      POKEMON_CANDIDATE_DEFAULTS.description,
    ),
    abilities: normalizeAbilities(rawCandidate?.abilities),
    weakness: normalizeString(
      rawCandidate?.weakness,
      POKEMON_CANDIDATE_DEFAULTS.weakness,
    ),
    confidence: normalizeConfidence(rawCandidate?.confidence),
  };
}

function getCandidatesArray(parsedPayload) {
  if (Array.isArray(parsedPayload?.candidates)) {
    return parsedPayload.candidates;
  }

  if (Array.isArray(parsedPayload?.creatures)) {
    return parsedPayload.creatures;
  }

  if (Array.isArray(parsedPayload)) {
    return parsedPayload;
  }

  return null;
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

  const candidatesArray = getCandidatesArray(parsedPayload);

  if (!candidatesArray?.length) {
    throw new Error('Gemini response did not include any candidates.');
  }

  return candidatesArray
    .slice(0, MAX_POKEMON_CANDIDATES)
    .map((candidate, index) => normalizePokemonCandidate(candidate, index));
}
