import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef } from "react";
import { Animated, Pressable } from "react-native";

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
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
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
      <Animated.View style={{ transform: [{ scale }] }}>
        <Ionicons
          name={favorite ? "star" : "star-outline"}
          size={size}
          color={favorite ? theme.accent : theme.textSecondary}
        />
      </Animated.View>
    </Pressable>
  );
}
