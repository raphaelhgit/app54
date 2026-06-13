import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { useFavorites } from "@/src/contexts/FavoritesContext";
import { useTheme } from "@/src/hooks/useTheme";

type Props = {
  id: number;
  size?: number;
};

export function FavoriteButton({ id, size = 28 }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { theme } = useTheme();
  const favorite = isFavorite(id);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(1.35, { damping: 8 }),
      withSpring(1, { damping: 12 })
    );
    rotation.value = withSequence(
      withTiming(20, { duration: 100 }),
      withTiming(0, { duration: 150 })
    );
    toggleFavorite(id);
  };

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      accessibilityLabel={
        favorite ? "Retirer des favoris" : "Ajouter aux favoris"
      }
    >
      <Animated.View style={animatedStyle}>
        <Ionicons
          name={favorite ? "star" : "star-outline"}
          size={size}
          color={favorite ? theme.accent : theme.textSecondary}
        />
      </Animated.View>
    </Pressable>
  );
}
