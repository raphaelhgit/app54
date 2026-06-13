/**
 * Routes Pokemon — Pokedex API
 */

import { Router, Request, Response } from "express";
import db from "../database/index.js";
import {
  getPokemon,
  getPokemonList,
  searchPokemon,
  getEvolutionChain,
} from "../services/pokeapi.js";

const router = Router();

// GET /api/pokemons — liste paginee
router.get("/", async (req: Request, res: Response) => {
  try {
    const limit = Math.min(
      parseInt((req.query.limit as string) ?? "20", 10),
      100,
    );
    const offset = parseInt((req.query.offset as string) ?? "0", 10);
    const search = req.query.search as string | undefined;
    const type = req.query.type as string | undefined;

    let pokemons;

    if (search) {
      pokemons = await searchPokemon(search);
    } else if (type) {
      pokemons = db
        .prepare(
          "SELECT id, name, types, abilities, height, weight, base_experience, stats, sprites, species_url, evolution_chain_url FROM pokemons WHERE types LIKE ? LIMIT ? OFFSET ?",
        )
        .all(`%"${type}"%`, limit, offset) as any[];
    } else {
      pokemons = await getPokemonList(limit, offset);
    }

    res.json({ pokemons, limit, offset });
  } catch (err) {
    console.error("Erreur liste pokemons:", err);
    res.status(500).json({ error: "Erreur interne" });
  }
});

// GET /api/pokemons/:id — detail
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id < 1) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }

    const pokemon = await getPokemon(id);
    if (!pokemon) {
      res.status(404).json({ error: "Pokemon non trouve" });
      return;
    }

    res.json({
      id: pokemon.id,
      name: pokemon.name,
      types: JSON.parse(pokemon.types),
      abilities: JSON.parse(pokemon.abilities),
      height: pokemon.height,
      weight: pokemon.weight,
      base_experience: pokemon.base_experience,
      stats: JSON.parse(pokemon.stats),
      sprites: JSON.parse(pokemon.sprites),
    });
  } catch (err) {
    console.error("Erreur detail pokemon:", err);
    res.status(500).json({ error: "Erreur interne" });
  }
});

// GET /api/pokemons/:id/evolution — chaine d'evolution
router.get("/:id/evolution", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id < 1) {
      res.status(400).json({ error: "ID invalide" });
      return;
    }

    const chain = await getEvolutionChain(id);
    res.json({ chain });
  } catch (err) {
    console.error("Erreur evolution:", err);
    res.status(500).json({ error: "Erreur interne" });
  }
});

export default router;
