/**
 * Routes Types — Pokedex API
 */

import { Router, Request, Response } from 'express';
import { getAllTypes } from '../services/pokeapi.js';

const router = Router();

// GET /api/types — liste des types
router.get('/', async (_req: Request, res: Response) => {
  try {
    const types = await getAllTypes();
    res.json({ types });
  } catch (err) {
    console.error('Erreur types:', err);
    res.status(500).json({ error: 'Erreur interne' });
  }
});

export default router;