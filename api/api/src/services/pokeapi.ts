/**
 * Service PokeAPI — proxy avec cache SQLite
 *
 * Fetch depuis pokeapi.co et mise en cache dans SQLite.
 * Le cache expire apres 24 heures.
 */

import db from '../database/index.js';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 heures

interface PokeApiPokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  height: number;
  weight: number;
  base_experience: number | null;
  stats: { stat: { name: string }; base_stat: number }[];
  sprites: { front_default: string; front_shiny: string; animated?: { front_default: string } };
  species: { url: string };
}

interface PokeApiSpecies {
  evolution_chain: { url: string } | null;
}

interface PokeApiEvolutionChain {
  id: number;
  chain: {
    species: { name: string; url: string };
    evolves_to: any[];
  };
}

interface PokeApiTypeList {
  results: { name: string; url: string }[];
}

interface PokeApiType {
  id: number;
  name: string;
  color: { name: string } | null;
}

interface PokemonCache {
  id: number;
  name: string;
  types: string;
  abilities: string;
  height: number;
  weight: number;
  base_experience: number | null;
  stats: string;
  sprites: string;
  species_url: string | null;
  evolution_chain_url: string | null;
  cached_at: string;
}

interface EvolutionChainRow {
  pokemon_id: number;
  chain: string;
  cached_at: string;
}

function isCacheValid(cachedAt: string): boolean {
  return Date.now() - new Date(cachedAt).getTime() < CACHE_TTL_MS;
}

function now(): string {
  return new Date().toISOString();
}

// =============================================================================
// FETCH POKEAPI AVEC CACHE
// =============================================================================

export async function fetchPokemonFromApi(id: number): Promise<PokemonCache> {
  const [pokemonRes, speciesRes] = await Promise.all([
    fetch(`${POKEAPI_BASE}/pokemon/${id}`),
    fetch(`${POKEAPI_BASE}/pokemon-species/${id}`),
  ]);

  if (!pokemonRes.ok) throw new Error(`Pokemon ${id} non trouve`);
  const pokemon: PokeApiPokemon = await pokemonRes.json() as PokeApiPokemon;

  let evolutionChainUrl: string | null = null;
  if (speciesRes.ok) {
    const species: PokeApiSpecies = await speciesRes.json() as PokeApiSpecies;
    evolutionChainUrl = species.evolution_chain?.url ?? null;
  }

  const cache: PokemonCache = {
    id: pokemon.id,
    name: pokemon.name,
    types: JSON.stringify(pokemon.types.map(t => t.type.name)),
    abilities: JSON.stringify(pokemon.abilities.map(a => a.ability.name)),
    height: pokemon.height,
    weight: pokemon.weight,
    base_experience: pokemon.base_experience,
    stats: JSON.stringify(pokemon.stats.map(s => ({ name: s.stat.name, value: s.base_stat }))),
    sprites: JSON.stringify(pokemon.sprites),
    species_url: pokemon.species.url,
    evolution_chain_url: evolutionChainUrl,
    cached_at: now(),
  };

  const stmt = db.prepare(`
    INSERT OR REPLACE INTO pokemons
    (id, name, types, abilities, height, weight, base_experience, stats, sprites, species_url, evolution_chain_url, cached_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    cache.id, cache.name, cache.types, cache.abilities, cache.height, cache.weight,
    cache.base_experience, cache.stats, cache.sprites, cache.species_url,
    cache.evolution_chain_url, cache.cached_at
  );

  return cache;
}

export async function getPokemon(id: number): Promise<PokemonCache | null> {
  const row = db.prepare('SELECT * FROM pokemons WHERE id = ?').get(id) as PokemonCache | undefined;
  if (row && isCacheValid(row.cached_at)) return row;
  return fetchPokemonFromApi(id);
}

export async function getPokemonList(limit: number, offset: number): Promise<{ id: number; name: string; types: string }[]> {
  const rows = db.prepare('SELECT id, name, types, abilities, height, weight, base_experience, stats, sprites, species_url, evolution_chain_url FROM pokemons ORDER BY id LIMIT ? OFFSET ?').all(limit, offset) as { id: number; name: string; types: string }[];

  if (rows.length > 0) return rows;

  if (rows.length < limit) {
    const res = await fetch(`${POKEAPI_BASE}/pokemon?limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new Error('Erreur fetch PokeAPI');
    const data: { results: { name: string; url: string }[] } = await res.json() as { results: { name: string; url: string }[] };

    for (const p of data.results) {
      const match = p.url.match(/\/pokemon\/(\d+)\//);
      if (match) {
        const pid = parseInt(match[1], 10);
        const cached = db.prepare('SELECT id FROM pokemons WHERE id = ?').get(pid);
        if (!cached) {
          try { await fetchPokemonFromApi(pid); } catch { /* ignore */ }
        }
      }
    }

    return data.results.map(p => {
      const match = p.url.match(/\/pokemon\/(\d+)\//);
      return { id: parseInt(match![1], 10), name: p.name, types: '[]' };
    });
  }

  return rows;
}

export async function searchPokemon(name: string): Promise<{ id: number; name: string; types: string }[]> {
  const rows = db.prepare('SELECT id, name, types FROM pokemons WHERE LOWER(name) LIKE LOWER(?) LIMIT 20').all(`%${name}%`) as { id: number; name: string; types: string }[];
  if (rows.length > 0) return rows;

  const res = await fetch(`${POKEAPI_BASE}/pokemon/${name.toLowerCase()}`);
  if (!res.ok) return [];
  const pokemon: PokeApiPokemon = await res.json() as PokeApiPokemon;
  await fetchPokemonFromApi(pokemon.id);
  return [{ id: pokemon.id, name: pokemon.name, types: JSON.stringify(pokemon.types.map(t => t.type.name)) }];
}

export async function getEvolutionChain(pokemonId: number): Promise<PokeApiEvolutionChain | null> {
  const row = db.prepare('SELECT * FROM evolution_chains WHERE pokemon_id = ?').get(pokemonId) as EvolutionChainRow | undefined;

  if (row && isCacheValid(row.cached_at)) {
    return JSON.parse(row.chain);
  }

  const pokemon = await getPokemon(pokemonId);
  if (!pokemon || !pokemon.evolution_chain_url) return null;

  const res = await fetch(pokemon.evolution_chain_url);
  if (!res.ok) return null;

  const chain: PokeApiEvolutionChain = await res.json() as PokeApiEvolutionChain;

  db.prepare('INSERT OR REPLACE INTO evolution_chains (pokemon_id, chain, cached_at) VALUES (?, ?, ?)').run(
    pokemonId, JSON.stringify(chain), now()
  );

  return chain;
}

export async function getAllTypes(): Promise<{ id: number; name: string; url: string; color: string }[]> {
  const rows = db.prepare('SELECT * FROM types ORDER BY name').all() as any[];

  if (rows.length > 0 && rows.every(r => isCacheValid(r.cached_at))) {
    return rows;
  }

  const res = await fetch(`${POKEAPI_BASE}/type`);
  if (!res.ok) return rows as { id: number; name: string; url: string; color: string }[];
  const data: PokeApiTypeList = await res.json() as PokeApiTypeList;

  const typeStmt = db.prepare('INSERT OR REPLACE INTO types (id, name, url, color, cached_at) VALUES (?, ?, ?, ?, ?)');
  for (const t of data.results) {
    const match = t.url.match(/\/type\/(\d+)\//);
    if (match) {
      const typeId = parseInt(match[1], 10);
      const typeRes = await fetch(t.url);
      if (typeRes.ok) {
        const typeData: PokeApiType = await typeRes.json() as PokeApiType;
        typeStmt.run(typeId, t.name, t.url, typeData.color?.name ?? '#888888', now());
      }
    }
  }

  return db.prepare('SELECT * FROM types ORDER BY name').all() as { id: number; name: string; url: string; color: string }[];
}