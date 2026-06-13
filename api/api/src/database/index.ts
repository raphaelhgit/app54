/**
 * Connexion SQLite — Pokedex API
 *
 * Gere la connexion et le schema de la base SQLite.
 * better-sqlite3 est synchrone — ideal pour Express.
 */

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_DIR = path.join(__dirname, '../../data');
const DB_PATH = path.join(DB_DIR, 'pokedex.db');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const db = new Database(DB_PATH);

// Mode WAL pour de meilleures performances
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// =============================================================================
// SCHEMA
// =============================================================================

db.exec(`
  CREATE TABLE IF NOT EXISTS pokemons (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    types TEXT NOT NULL,
    abilities TEXT NOT NULL,
    height INTEGER NOT NULL,
    weight INTEGER NOT NULL,
    base_experience INTEGER,
    stats TEXT NOT NULL,
    sprites TEXT NOT NULL,
    species_url TEXT,
    evolution_chain_url TEXT,
    cached_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS types (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    url TEXT,
    color TEXT,
    cached_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS evolution_chains (
    pokemon_id INTEGER PRIMARY KEY,
    chain TEXT NOT NULL,
    cached_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_pokemons_name ON pokemons(name);
  CREATE INDEX IF NOT EXISTS idx_pokemons_types ON pokemons(types);
`);

export default db;