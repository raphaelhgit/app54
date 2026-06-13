import Constants from "expo-constants";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { FavoriteButton } from "@/src/components/FavoriteButton";
import { StatBarList } from "@/src/components/StatBar";
import { useFavorites } from "@/src/contexts/FavoritesContext";
import { useTheme } from "@/src/hooks/useTheme";

const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const API = `http://${host}:3000`;

function parseJson<T>(value: T | string): T {
  return typeof value === "string" ? JSON.parse(value) : value;
}

export default function Fav() {
  const router = useRouter();
  const { theme } = useTheme();
  const { favorites, isLoading: favoritesLoading } = useFavorites();
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
        card: {
          flexDirection: "row",
          alignItems: "flex-start",
          padding: 12,
          backgroundColor: theme.card,
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
        name: { color: theme.text, fontSize: 20, flex: 1 },
        info: { color: theme.textSecondary, fontSize: 12, marginBottom: 2 },
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

  if (favoritesLoading || loading) {
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
      renderItem={({ item: p }) => {
        const sprites = parseJson(p.sprites);
        const types = parseJson(p.types);
        const abilities = parseJson(p.abilities);
        const stats = parseJson(p.stats);

        return (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
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
              <StatBarList stats={stats} />
            </View>
          </Pressable>
        );
      }}
    />
  );
}
