import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { Theme } from "@/src/constants/themes";
import {
  fetchEvolutionChain,
  isSinglePokemonChain,
} from "@/src/services/evolutionService";
import type { EvolutionLevel } from "@/src/types/evolution";

type Props = {
  pokemonId: number;
  apiBase: string;
  theme: Theme;
};

export function EvolutionChain({ pokemonId, apiBase, theme }: Props) {
  const router = useRouter();
  const [levels, setLevels] = useState<EvolutionLevel[] | null>(null);
  const [loading, setLoading] = useState(true);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        section: { width: "100%", marginTop: 20 },
        title: {
          color: theme.text,
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 12,
          alignSelf: "flex-start",
        },
        loading: { paddingVertical: 16, alignItems: "center" },
        empty: { color: theme.textSecondary, fontSize: 14 },
        row: { flexDirection: "row", alignItems: "center" },
        levelGroup: { flexDirection: "row", alignItems: "center", gap: 4 },
        branchGroup: { gap: 8 },
        stage: { alignItems: "center", width: 80 },
        stageCurrent: {
          borderWidth: 2,
          borderColor: theme.accent,
          borderRadius: 8,
          padding: 4,
        },
        sprite: { width: 64, height: 64 },
        name: {
          color: theme.text,
          fontSize: 11,
          textAlign: "center",
          marginTop: 4,
          textTransform: "capitalize",
        },
        id: { color: theme.textSecondary, fontSize: 10 },
        arrow: {
          color: theme.textSecondary,
          fontSize: 18,
          marginHorizontal: 6,
        },
        condition: {
          color: theme.textMuted,
          fontSize: 9,
          textAlign: "center",
          marginTop: 2,
          maxWidth: 76,
        },
      }),
    [theme]
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const chain = await fetchEvolutionChain(apiBase, pokemonId);
      if (!cancelled) {
        setLevels(chain);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiBase, pokemonId]);

  if (loading) {
    return (
      <View style={styles.section}>
        <Text style={styles.title}>Évolutions</Text>
        <View style={styles.loading}>
          <ActivityIndicator color={theme.accent} />
        </View>
      </View>
    );
  }

  if (!levels || isSinglePokemonChain(levels)) {
    return (
      <View style={styles.section}>
        <Text style={styles.title}>Évolutions</Text>
        <Text style={styles.empty}>Ce Pokémon n'évolue pas.</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Évolutions</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.row}>
          {levels.map((level, levelIndex) => (
            <View key={levelIndex} style={styles.row}>
              {levelIndex > 0 && (
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.arrow}>→</Text>
                  {level[0]?.conditions[0] && (
                    <Text style={styles.condition}>
                      {level[0].conditions[0].label}
                    </Text>
                  )}
                </View>
              )}
              <View
                style={
                  level.length > 1 ? styles.branchGroup : styles.levelGroup
                }
              >
                {level.map((stage) => (
                  <Pressable
                    key={stage.name}
                    style={[
                      styles.stage,
                      stage.id === pokemonId && styles.stageCurrent,
                    ]}
                    onPress={() => {
                      if (stage.id && stage.id !== pokemonId) {
                        router.replace(`/pokemon/${stage.id}`);
                      }
                    }}
                    disabled={!stage.id}
                  >
                    {stage.spriteUrl ? (
                      <Image
                        source={{ uri: stage.spriteUrl }}
                        style={styles.sprite}
                      />
                    ) : (
                      <View
                        style={[
                          styles.sprite,
                          { backgroundColor: theme.surface },
                        ]}
                      />
                    )}
                    <Text style={styles.name}>{stage.name}</Text>
                    {stage.id != null && (
                      <Text style={styles.id}>#{stage.id}</Text>
                    )}
                    {levelIndex > 0 &&
                      level.length > 1 &&
                      stage.conditions.map((c, i) => (
                        <Text key={i} style={styles.condition}>
                          {c.label}
                        </Text>
                      ))}
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
