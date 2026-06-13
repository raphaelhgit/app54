import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import type { Theme } from "@/src/constants/themes";

type Props = {
  theme: Theme;
};

export function SkeletonCard({ theme }: Props) {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 800 }),
      -1,
      true
    );
  }, [opacity]);

  const shimmer = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.card,
        { backgroundColor: theme.card },
        shimmer,
      ]}
    >
      <View style={[styles.image, { backgroundColor: theme.surface }]} />
      <View style={styles.body}>
        <View style={[styles.line, styles.lineTitle, { backgroundColor: theme.surface }]} />
        <View style={[styles.line, { backgroundColor: theme.surface }]} />
        <View style={[styles.line, { backgroundColor: theme.surface }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  image: { width: 64, height: 64, borderRadius: 8 },
  body: { flex: 1, marginLeft: 8, gap: 8 },
  line: { height: 10, borderRadius: 4, width: "80%" },
  lineTitle: { height: 14, width: "55%" },
});
