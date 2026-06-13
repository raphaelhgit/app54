import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { POKEMON_TYPES, TYPE_LABELS } from "@/src/constants/pokemonTypes";
import { getTypeColor } from "@/src/constants/typeColors";

type Props = {
  selectedTypes: string[];
  onToggleType: (type: string) => void;
  onClearAll: () => void;
};

export function TypeFilterBar({ selectedTypes, onToggleType, onClearAll }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {selectedTypes.length > 0 && (
          <Pressable style={styles.clearChip} onPress={onClearAll}>
            <Text style={styles.clearText}>Tout effacer</Text>
          </Pressable>
        )}
        {POKEMON_TYPES.map((type) => {
          const selected = selectedTypes.includes(type);
          return (
            <Pressable
              key={type}
              style={[
                styles.chip,
                { backgroundColor: getTypeColor(type) },
                selected && styles.chipSelected,
                !selected && styles.chipUnselected,
              ]}
              onPress={() => onToggleType(type)}
            >
              <Text style={styles.chipText}>{TYPE_LABELS[type]}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 8 },
  scrollContent: { gap: 8, paddingRight: 4 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  chipSelected: { borderColor: "#ffd33d" },
  chipUnselected: { opacity: 0.55 },
  chipText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  clearChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#4e5156",
    borderWidth: 1,
    borderColor: "#cecbc5",
    justifyContent: "center",
  },
  clearText: { color: "#cecbc5", fontSize: 12, fontWeight: "600" },
});
