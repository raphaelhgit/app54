import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { PokemonCard } from "@/src/components/PokemonCard";
import { useFavorites } from "@/src/contexts/FavoritesContext";
import { useTheme } from "@/src/hooks/useTheme";

const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const API = `http://${host}:3000`;

export default function Fav() {
  const router = useRouter();
  const { theme } = useTheme();
  const { favorites, isLoading: favoritesLoading } = useFavorites();
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: theme.background },
        list: { padding: 16 },
        center: {
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        },
        emptyTitle: {
          color: theme.text,
          fontSize: 20,
          fontWeight: "600",
          marginBottom: 8,
        },
        emptyText: {
          color: theme.textSecondary,
          fontSize: 14,
          textAlign: "center",
        },
      }),
    [theme]
  );

  const loadFavorites = useCallback(async () => {
    if (favorites.length === 0) {
      setPokemons([]);
      return;
    }
    setLoading(true);
    try {
      const results = await Promise.all(
        favorites.map(async (id) => {
          const r = await fetch(`${API}/api/pokemons/${id}`);
          if (!r.ok) return null;
          return r.json();
        })
      );
      setPokemons(results.filter(Boolean));
    } catch {
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  }, [favorites]);

  useEffect(() => {
    if (!favoritesLoading) {
      loadFavorites();
    }
  }, [favoritesLoading, loadFavorites]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  };

  if (favoritesLoading || (loading && !refreshing)) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={theme.accent} />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>Aucun favori</Text>
        <Text style={styles.emptyText}>
          Appuie sur l'étoile d'un Pokémon pour l'ajouter ici.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.list}
      data={pokemons}
      keyExtractor={(p) => String(p.id)}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={theme.accent}
          colors={[theme.accent]}
        />
      }
      renderItem={({ item: p, index }) => (
        <PokemonCard
          pokemon={p}
          index={index}
          theme={theme}
          compact
          onPress={() => router.push(`/pokemon/${p.id}`)}
        />
      )}
    />
  );
}
