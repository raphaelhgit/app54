function parseTypes(types: string[] | string): string[] {
  if (Array.isArray(types)) return types;
  if (typeof types === "string") {
    try {
      return JSON.parse(types);
    } catch {
      return [];
    }
  }
  return [];
}

export function filterBySearch(pokemons: any[], query: string) {
  const term = query.trim().toLowerCase();
  if (!term) return pokemons;

  return pokemons.filter((p) => {
    const nameMatch = p.name?.toLowerCase().includes(term);
    const idMatch = String(p.id).includes(term);
    const paddedIdMatch = String(p.id).padStart(3, "0").includes(term);
    return nameMatch || idMatch || paddedIdMatch;
  });
}

export function filterByTypes(pokemons: any[], selectedTypes: string[]) {
  if (selectedTypes.length === 0) return pokemons;

  return pokemons.filter((p) => {
    const types = parseTypes(p.types);
    return selectedTypes.some((t) => types.includes(t));
  });
}

export function filterPokemons(
  pokemons: any[],
  query: string,
  selectedTypes: string[]
) {
  return filterByTypes(filterBySearch(pokemons, query), selectedTypes);
}
