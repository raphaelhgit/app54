/**
 * Point d'entree — Pokedex API
 *
 * Serveur Express sur port 3000.
 * CORS ouvert pour le dev mobile.
 */

import express from 'express';
import cors from 'cors';
import pokemonRoutes from './routes/pokemon.routes.js';
import typesRoutes from './routes/types.routes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/pokemons', pokemonRoutes);
app.use('/api/types', typesRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Route non trouvee' });
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Pokedex API running on http://localhost:${PORT}`);
});

export default app;