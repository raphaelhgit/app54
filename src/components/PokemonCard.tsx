import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { FavoriteButton } from "@/src/components/FavoriteButton";
import { StatBarList } from "@/src/components/StatBar";
import type { Theme } from "@/src/constants/themes";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function parseJson<T>(value: T | string): T {
  return typeof value === "string" ? JSON.parse(value) : value;
}

type Props = {
  pokemon: any;
  index: number;
  theme: Theme;
  onPress: () => void;
  compact?: boolean;
};

export function PokemonCard({ pokemon: p, index, theme, onPress, compact }: Props) {
  const scale = useSharedValue(1);

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const sprites = parseJson(p.sprites);
  const types = parseJson(p.types);
  const abilities = parseJson(p.abilities);
  const stats = parseJson(p.stats);

  const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 12,
      backgroundColor: theme.card,
      marginBottom: 12,
      borderRadius: 8,
    },
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
  });

  return (
    <Animated.View
      entering={FadeInDown.delay(Math.min(index, 12) * 40)
        .duration(300)
        .springify()}
    >
      <AnimatedPressable
        style={[styles.card, pressStyle]}
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.97, { damping: 15 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 15 });
        }}
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
          {!compact && (
            <>
              <Text style={styles.info}>
                Talents : {abilities?.join(", ")}
              </Text>
              <Text style={styles.info}>
                Taille : {p.height / 10} m · Poids : {p.weight / 10} kg · XP :{" "}
                {p.base_experience}
              </Text>
            </>
          )}
          {compact && (
            <Text style={styles.info}>Talents : {abilities?.join(", ")}</Text>
          )}
          <StatBarList stats={stats} />
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
}
