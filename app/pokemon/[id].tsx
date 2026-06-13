import Constants from "expo-constants";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { StatBarList } from "@/src/components/StatBar";

const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const API = `http://${host}:3000`;

export default function PokemonDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
        <ActivityIndicator color="#ffd33d" />
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
      <Stack.Screen options={{ title: `#${pokemon.id} ${pokemon.name}` }} />
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
        <Text style={styles.name}>
          #{pokemon.id} {pokemon.name}
        </Text>
        <Text style={styles.info}>Types : {pokemon.types?.join(", ")}</Text>
        <Text style={styles.info}>
          Talents : {pokemon.abilities?.join(", ")}
        </Text>
        <Text style={styles.info}>
          Taille : {pokemon.height / 10} m · Poids : {pokemon.weight / 10} kg ·
          XP : {pokemon.base_experience}
        </Text>
        <Text style={styles.sectionTitle}>Statistiques</Text>
        <StatBarList stats={pokemon.stats} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#25292e" },
  content: { padding: 16, alignItems: "center" },
  center: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 120, height: 120 },
  name: { color: "#efeee8", fontSize: 24, marginTop: 8 },
  info: { color: "#cecbc5", fontSize: 14, marginTop: 6, textAlign: "center" },
  sectionTitle: {
    color: "#efeee8",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 4,
    alignSelf: "flex-start",
    width: "100%",
  },
  error: { color: "#cecbc5", fontSize: 16 },
});
