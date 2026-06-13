import { FavoritesProvider } from "@/src/contexts/FavoritesContext";
import { ThemeProvider, useThemeContext } from "@/src/contexts/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

function RootNavigator() {
  const { theme } = useThemeContext();

  return (
    <>
      <StatusBar style={theme.statusBar === "light-content" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="pokemon/[id]" options={{ title: "" }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <RootNavigator />
      </FavoritesProvider>
    </ThemeProvider>
  );
}
