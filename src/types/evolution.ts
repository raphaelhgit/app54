export type EvolutionCondition = {
  label: string;
};

export type EvolutionStage = {
  id: number | null;
  name: string;
  spriteUrl: string | null;
  conditions: EvolutionCondition[];
};

export type EvolutionLevel = EvolutionStage[];

export type ApiEvolutionNode = {
  species: { name: string; url: string };
  evolution_details?: {
    min_level?: number | null;
    trigger?: { name: string };
    item?: { name: string } | null;
    min_happiness?: number | null;
    time_of_day?: string;
  }[];
  evolves_to?: ApiEvolutionNode[];
};
