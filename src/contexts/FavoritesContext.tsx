import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "@pokedex_favorites";

type FavoritesContextType = {
  favorites: number[];
  isLoading: boolean;
  addFavorite: (id: number) => Promise<void>;
  removeFavorite: (id: number) => Promise<void>;
  toggleFavorite: (id: number) => Promise<void>;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

async function loadFavorites(): Promise<number[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is number => typeof id === "number");
  } catch {
    return [];
  }
}

async function saveFavorites(ids: number[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore write errors
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const ids = await loadFavorites();
      setFavorites(ids);
      setIsLoading(false);
    })();
  }, []);

  const addFavorite = useCallback(async (id: number) => {
    setFavorites((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      saveFavorites(next);
      return next;
    });
  }, []);

  const removeFavorite = useCallback(async (id: number) => {
    setFavorites((prev) => {
      const next = prev.filter((f) => f !== id);
      saveFavorites(next);
      return next;
    });
  }, []);

  const toggleFavorite = useCallback(async (id: number) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      saveFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites]
  );

  const value = useMemo(
    () => ({
      favorites,
      isLoading,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
    }),
    [
      favorites,
      isLoading,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
    ]
  );

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
}
