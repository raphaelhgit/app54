export type Theme = {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  accent: string;
  card: string;
  statTrack: string;
  statusBar: "light-content" | "dark-content";
};

export type ThemeMode = "light" | "dark";

export const lightTheme: Theme = {
  background: "#f0f0eb",
  surface: "#ffffff",
  text: "#1c1c1e",
  textSecondary: "#4a4a4a",
  textMuted: "#8a8780",
  border: "#d4d4ce",
  accent: "#c9a000",
  card: "#ffffff",
  statTrack: "#d0d0d0",
  statusBar: "dark-content",
};

export const darkTheme: Theme = {
  background: "#25292e",
  surface: "#4e5156",
  text: "#efeee8",
  textSecondary: "#cecbc5",
  textMuted: "#8a8780",
  border: "rgba(0,0,0,0.15)",
  accent: "#ffd33d",
  card: "#4e5156",
  statTrack: "#a3a3a3",
  statusBar: "light-content",
};

export const themes: Record<ThemeMode, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};
