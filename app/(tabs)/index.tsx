import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { FavoriteButton } from "@/src/components/FavoriteButton";
import { StatBarList } from "@/src/components/StatBar";

const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const API = `http://${host}:3000`;

function parseJson<T>(value: T | string): T {
  return typeof value === "string" ? JSON.parse(value) : value;
}

function filterPokemons(pokemons: any[], query: string) {
  const term = query.trim().toLowerCase();
  if (!term) return pokemons;

  return pokemons.filter((p) => {
    const nameMatch = p.name?.toLowerCase().includes(term);
    const idMatch = String(p.id).includes(term);
    const paddedIdMatch = String(p.id).padStart(3, "0").includes(term);
    return nameMatch || idMatch || paddedIdMatch;
  });
}

export default function Index() {
  const router = useRouter();
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const loadPokemons = async () => {
    const all: any[] = [];
    let offset = 0;
    while (true) {
      const r = await fetch(`${API}/api/pokemons?limit=100&offset=${offset}`);
      const d = await r.json();
      const page = d.pokemons ?? [];
      all.push(...page);
      if (page.length < 100) break;
      offset += 100;
    }
    setPokemons(all);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredPokemons = useMemo(
    () => filterPokemons(pokemons, debouncedQuery),
    [pokemons, debouncedQuery]
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPokemons();
    setRefreshing(false);
  };

  const showEmpty =
    debouncedQuery.trim().length > 0 && filteredPokemons.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color="#cecbc5"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Rechercher par nom ou numéro..."
            placeholderTextColor="#8a8780"
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            accessibilityLabel="Rechercher un Pokémon"
          />
          {query.length > 0 && (
            <Pressable
              onPress={() => setQuery("")}
              hitSlop={8}
              accessibilityLabel="Effacer la recherche"
            >
              <Ionicons name="close-circle" size={20} color="#cecbc5" />
            </Pressable>
          )}
        </View>
        {debouncedQuery.trim().length > 0 && (
          <Text style={styles.resultCount}>
            {filteredPokemons.length} Pokémon trouvé
            {filteredPokemons.length !== 1 ? "s" : ""}
          </Text>
        )}
      </View>

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#ffd33d"
            colors={["#ffd33d"]}
          />
        }
        data={filteredPokemons}
        keyExtractor={(p) => String(p.id)}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          showEmpty ? (
            <Text style={styles.emptyText}>Aucun Pokémon trouvé</Text>
          ) : null
        }
        renderItem={({ item: p }) => {
          const sprites = parseJson(p.sprites);
          const types = parseJson(p.types);
          const abilities = parseJson(p.abilities);
          const stats = parseJson(p.stats);

          return (
            <Pressable
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              onPress={() => router.push(`/pokemon/${p.id}`)}
            >
              {sprites?.front_default && (
                <Image
                  source={{ uri: sprites.front_default }}
                  style={styles.image}
                />
              )}
              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <Text style={styles.name}>
                    #{p.id} {p.name}
                  </Text>
                  <FavoriteButton id={p.id} size={22} />
                </View>
                <Text style={styles.info}>Types : {types?.join(", ")}</Text>
                <Text style={styles.info}>
                  Talents : {abilities?.join(", ")}
                </Text>
                <Text style={styles.info}>
                  Taille : {p.height / 10} m · Poids : {p.weight / 10} kg · XP :{" "}
                  {p.base_experience}
                </Text>
                <StatBarList stats={stats} />
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#25292e" },
  searchHeader: {
    backgroundColor: "#25292e",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4e5156",
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  searchIcon: { marginRight: 8 },
  input: {
    flex: 1,
    color: "#efeee8",
    fontSize: 16,
    paddingVertical: 12,
  },
  resultCount: {
    color: "#cecbc5",
    fontSize: 12,
    marginTop: 6,
  },
  list: { flex: 1 },
  listContent: { paddingHorizontal: 16, paddingBottom: 16 },
  emptyText: {
    color: "#cecbc5",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    backgroundColor: "#4e5156",
    marginBottom: 12,
    borderRadius: 8,
  },
  cardPressed: { opacity: 0.85 },
  cardBody: { flex: 1, marginLeft: 8 },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  image: { width: 64, height: 64 },
  name: { color: "#efeee8", fontSize: 20, flex: 1 },
  info: { color: "#cecbc5", fontSize: 12, marginBottom: 2 },
});
