import { StyleSheet, Text, View } from "react-native";

export default function Fav() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Liste des favoris</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: { color: "#efeee8", fontSize: 18 },
});
