import type {
  ApiEvolutionNode,
  EvolutionCondition,
  EvolutionLevel,
  EvolutionStage,
} from "@/src/types/evolution";

const ITEM_LABELS: Record<string, string> = {
  "fire-stone": "Pierre Feu",
  "water-stone": "Pierre Eau",
  "thunder-stone": "Pierre Foudre",
  "leaf-stone": "Pierre Plante",
  "moon-stone": "Pierre Lune",
  "sun-stone": "Pierre Soleil",
  "shiny-stone": "Pierre Éclat",
  "dusk-stone": "Pierre Nuit",
  "dawn-stone": "Pierre Aube",
  "ice-stone": "Pierre Glace",
  "oval-stone": "Pierre Ovale",
  "prism-scale": "Bel'Écaille",
  "dragon-scale": "Écaille Draco",
  "kings-rock": "Roche Royale",
  "metal-coat": "Peau Métal",
  "upgrade": "Améliorator",
  "dubious-disc": "CD Douteux",
  "protector": "Protecteur",
  "electirizer": "Électriseur",
  "magmarizer": "Magmariseur",
  "reaper-cloth": "Tissu Fauche",
  "razor-claw": "Griffe Rasoir",
  "razor-fang": "Croc Rasoir",
  "peat-block": "Bloc Tourbe",
  "sweet-apple": "Pomme Sucrée",
  "tart-apple": "Pomme Acidulée",
  "cracked-pot": "Théière Fêlée",
  "chipped-pot": "Théière Ébréchée",
  "galarica-cuff": "Bracelet Galanoa",
  "galarica-wreath": "Couronne Galanoa",
  "auspicious-armor": "Armure Auguriale",
  "malicious-armor": "Armure Malveillante",
};

function formatCondition(
  details: ApiEvolutionNode["evolution_details"]
): EvolutionCondition[] {
  if (!details?.length) return [];

  return details.map((d) => {
    const parts: string[] = [];
    if (d.min_level) parts.push(`Niv. ${d.min_level}`);
    if (d.item?.name) {
      parts.push(ITEM_LABELS[d.item.name] ?? d.item.name.replace(/-/g, " "));
    }
    if (d.trigger?.name === "trade") parts.push("Échange");
    if (d.min_happiness) parts.push("Bonheur élevé");
    if (d.time_of_day) {
      parts.push(d.time_of_day === "day" ? "Jour" : "Nuit");
    }
    if (parts.length === 0) parts.push("Évolution");
    return { label: parts.join(" · ") };
  });
}

function spriteUrl(id: number | null): string | null {
  if (!id) return null;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

async function resolvePokemonId(
  apiBase: string,
  name: string
): Promise<number | null> {
  try {
    const r = await fetch(
      `${apiBase}/api/pokemons?search=${encodeURIComponent(name)}&limit=10`
    );
    if (!r.ok) return null;
    const d = await r.json();
    const exact = d.pokemons?.find((p: { name: string }) => p.name === name);
    return exact?.id ?? d.pokemons?.[0]?.id ?? null;
  } catch {
    return null;
  }
}

function nodeToStage(
  node: ApiEvolutionNode,
  id: number | null
): EvolutionStage {
  return {
    id,
    name: node.species.name,
    spriteUrl: spriteUrl(id),
    conditions: formatCondition(node.evolution_details),
  };
}

export async function fetchEvolutionChain(
  apiBase: string,
  pokemonId: number
): Promise<EvolutionLevel[] | null> {
  const r = await fetch(`${apiBase}/api/pokemons/${pokemonId}/evolution`);
  if (!r.ok) return null;
  const d = await r.json();
  if (!d.chain?.chain) return null;
  return buildEvolutionLevels(apiBase, d.chain.chain);
}

async function buildEvolutionLevels(
  apiBase: string,
  root: ApiEvolutionNode
): Promise<EvolutionLevel[]> {
  const levels: EvolutionLevel[] = [];
  let current: ApiEvolutionNode[] = [root];

  while (current.length > 0) {
    const stagePromises = current.map(async (node) => {
      const id = await resolvePokemonId(apiBase, node.species.name);
      return nodeToStage(node, id);
    });
    levels.push(await Promise.all(stagePromises));
    current = current.flatMap((n) => n.evolves_to ?? []);
  }

  return levels;
}

export function isSinglePokemonChain(levels: EvolutionLevel[]): boolean {
  return levels.length <= 1;
}
