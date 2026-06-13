import Constants from "expo-constants";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { EvolutionChain } from "@/src/components/evolution/EvolutionChain";
import { FavoriteButton } from "@/src/components/FavoriteButton";
import { StatBarList } from "@/src/components/StatBar";
import { useTheme } from "@/src/hooks/useTheme";

const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const API = `http://${host}:3000`;

export default function PokemonDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme } = useTheme();
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pokemonId = Number(id);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: theme.background },
        content: { padding: 16, alignItems: "center" },
        center: {
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: "center",
          alignItems: "center",
        },
        image: { width: 120, height: 120 },
        name: { color: theme.text, fontSize: 24, marginTop: 8 },
        info: {
          color: theme.textSecondary,
          fontSize: 14,
          marginTop: 6,
          textAlign: "center",
        },
        sectionTitle: {
          color: theme.text,
          fontSize: 16,
          fontWeight: "600",
          marginTop: 20,
          marginBottom: 4,
          alignSelf: "flex-start",
          width: "100%",
        },
        error: { color: theme.textSecondary, fontSize: 16 },
      }),
    [theme]
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const r = await fetch(`${API}/api/pokemons/${id}`);
      const d = await r.json();
      setPokemon(d);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={theme.accent} />
      </View>
    );
  }

  if (!pokemon?.id) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Pokémon introuvable</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: `#${pokemon.id} ${pokemon.name}`,
          headerRight: () => (
            <View style={{ marginRight: 12 }}>
              <FavoriteButton id={pokemonId} />
            </View>
          ),
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {pokemon.sprites?.front_default && (
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.image}
          />
        )}
        <Animated.View entering={FadeInDown.duration(350).delay(100)}>
          <Text style={styles.name}>
            #{pokemon.id} {pokemon.name}
          </Text>
          <Text style={styles.info}>Types : {pokemon.types?.join(", ")}</Text>
          <Text style={styles.info}>
            Talents : {pokemon.abilities?.join(", ")}
          </Text>
          <Text style={styles.info}>
            Taille : {pokemon.height / 10} m · Poids : {pokemon.weight / 10} kg
            · XP : {pokemon.base_experience}
          </Text>
          <EvolutionChain
            pokemonId={pokemonId}
            apiBase={API}
            theme={theme}
          />
          <Text style={styles.sectionTitle}>Statistiques</Text>
          <StatBarList stats={pokemon.stats} />
        </Animated.View>
      </ScrollView>
    </>
  );
}
