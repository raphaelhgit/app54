import Constants from "expo-constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { SkeletonCard } from "@/src/components/animations/SkeletonCard";
import { PokemonCard } from "@/src/components/PokemonCard";
import { useTheme } from "@/src/hooks/useTheme";

const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const API = `http://${host}:3000`;

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
  const { theme } = useTheme();
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshError, setRefreshError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const loadPokemons = useCallback(async () => {
    const all: any[] = [];
    let offset = 0;
    while (true) {
      const r = await fetch(`${API}/api/pokemons?limit=100&offset=${offset}`);
      if (!r.ok) throw new Error("Impossible de charger les Pokémon");
      const d = await r.json();
      const page = d.pokemons ?? [];
      all.push(...page);
      if (page.length < 100) break;
      offset += 100;
    }
    setPokemons(all);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await loadPokemons();
      } catch {
        setRefreshError("Erreur de chargement");
      } finally {
        setLoading(false);
      }
    })();
  }, [loadPokemons]);

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
    setRefreshError(null);
    try {
      await loadPokemons();
    } catch {
      setRefreshError("Échec du rafraîchissement");
    } finally {
      setRefreshing(false);
    }
  };

  const showEmpty =
    !loading && debouncedQuery.trim().length > 0 && filteredPokemons.length === 0;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: theme.background },
        searchHeader: {
          backgroundColor: theme.background,
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 8,
        },
        searchBar: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.surface,
          paddingHorizontal: 12,
          borderRadius: 8,
        },
        searchIcon: { marginRight: 8 },
        input: {
          flex: 1,
          color: theme.text,
          fontSize: 16,
          paddingVertical: 12,
        },
        resultCount: {
          color: theme.textSecondary,
          fontSize: 12,
          marginTop: 6,
        },
        errorText: {
          color: "#f34444",
          fontSize: 12,
          marginTop: 6,
        },
        list: { flex: 1 },
        listContent: { paddingHorizontal: 16, paddingBottom: 16 },
        emptyText: {
          color: theme.textSecondary,
          fontSize: 16,
          textAlign: "center",
          marginTop: 32,
        },
        skeletonList: { paddingHorizontal: 16, paddingBottom: 16 },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInDown.duration(300)}
        style={styles.searchHeader}
      >
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color={theme.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Rechercher par nom ou numéro..."
            placeholderTextColor={theme.textMuted}
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
              <Ionicons
                name="close-circle"
                size={20}
                color={theme.textSecondary}
              />
            </Pressable>
          )}
        </View>
        {debouncedQuery.trim().length > 0 && (
          <Text style={styles.resultCount}>
            {filteredPokemons.length} Pokémon trouvé
            {filteredPokemons.length !== 1 ? "s" : ""}
          </Text>
        )}
        {refreshError && (
          <Text style={styles.errorText}>{refreshError}</Text>
        )}
      </Animated.View>

      {loading ? (
        <View style={styles.skeletonList}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} theme={theme} />
          ))}
        </View>
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={theme.accent}
              colors={[theme.accent]}
              title="Actualisation..."
              titleColor={theme.textSecondary}
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
          renderItem={({ item: p, index }) => (
            <PokemonCard
              pokemon={p}
              index={index}
              theme={theme}
              onPress={() => router.push(`/pokemon/${p.id}`)}
            />
          )}
        />
      )}
    </View>
  );
}
