import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../config/api";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchFavorites = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/favorites`);
      const data = await response.json();
      setFavorites(data);
    } catch (err) {
      console.error("Gagal mengambil favorite:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = useCallback(async (movie) => {
    setIsSaving(true);
    try {
      const response = await fetch(`${API_URL}/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: movie.id,
          title: movie.title,
          image: movie.image,
          rating: movie.rating,
          year: movie.year,
          genreIds: movie.genre_ids ?? [],
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
      }

      const newFavorite = await response.json();
      setFavorites((prev) => [...prev, newFavorite]);
    } catch (err) {
      console.error("Gagal menambah favorite:", err);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const removeFavorite = useCallback(async (id) => {
    setIsSaving(true);
    try {
      await fetch(`${API_URL}/favorites/${id}`, { method: "DELETE" });
      setFavorites((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error("Gagal menghapus favorite:", err);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.some((f) => f.id === id),
    [favorites],
  );

  return {
    favorites,
    isLoading,
    isSaving,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
