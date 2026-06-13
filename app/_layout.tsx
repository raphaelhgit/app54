import { FavoritesProvider } from "@/src/contexts/FavoritesContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="pokemon/[id]"
          options={{
            headerStyle: { backgroundColor: "#25292e" },
            headerTintColor: "#fff",
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </FavoritesProvider>
  );
}
