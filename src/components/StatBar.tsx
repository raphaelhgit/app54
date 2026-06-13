import { StyleSheet, Text, View } from "react-native";

const MAX_BAR = 255;

const STAT_LABELS: Record<string, string> = {
  hp: "PV",
  attack: "Attaque",
  defense: "Défense",
  "special-attack": "Atq. Spé.",
  "special-defense": "Déf. Spé.",
  speed: "Vitesse",
};

const STAT_COLORS = {
  1: "#f34444",
  2: "#ff7f0f",
  3: "#ffdd57",
  4: "#a0e515",
  5: "#23cd5e",
  6: "#00c2b8",
} as const;

type Stat = { name: string; value: number };

function getStatRank(value: number): keyof typeof STAT_COLORS {
  if (value >= 150) return 6;
  if (value >= 120) return 5;
  if (value >= 90) return 4;
  if (value >= 60) return 3;
  if (value >= 30) return 2;
  return 1;
}

export function StatBarList({ stats }: { stats: Stat[] }) {
  if (!stats?.length) return null;

  return (
    <View style={styles.list}>
      {stats.map((s) => (
        <StatBar key={s.name} name={s.name} value={s.value} />
      ))}
    </View>
  );
}

function StatBar({ name, value }: { name: string; value: number }) {
  const rank = getStatRank(value);
  const color = STAT_COLORS[rank];
  const pct = Math.min(value / MAX_BAR, 1);

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{STAT_LABELS[name] ?? name}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct * 100}%`, backgroundColor: color }]} />
      </View>
      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 6, width: "100%", marginTop: 8 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  label: { color: "#cecbc5", fontSize: 11, width: 58 },
  track: {
    flex: 1,
    height: 10,
    backgroundColor: "#a3a3a3",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
    overflow: "hidden",
  },
  fill: { height: "100%", borderRadius: 3 },
  value: {
    fontSize: 11,
    width: 28,
    textAlign: "right",
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
  },
});
