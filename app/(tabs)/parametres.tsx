import Ionicons from "@expo/vector-icons/Ionicons";
import { useMemo } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

import { useTheme } from "@/src/hooks/useTheme";

export default function Parametres() {
  const { theme, isDark, toggleTheme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.background,
          padding: 16,
        },
        section: {
          backgroundColor: theme.card,
          borderRadius: 8,
          padding: 16,
        },
        row: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        labelRow: {
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        },
        title: {
          color: theme.text,
          fontSize: 16,
          fontWeight: "600",
        },
        subtitle: {
          color: theme.textSecondary,
          fontSize: 12,
          marginTop: 4,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.labelRow}>
            <Ionicons
              name={isDark ? "moon" : "sunny"}
              size={22}
              color={theme.accent}
            />
            <View>
              <Text style={styles.title}>Mode sombre</Text>
              <Text style={styles.subtitle}>
                {isDark ? "Activé" : "Désactivé"}
              </Text>
            </View>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.statTrack, true: theme.accent }}
            thumbColor={theme.surface}
            accessibilityLabel="Basculer le mode sombre"
          />
        </View>
      </View>
    </View>
  );
}
