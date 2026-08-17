import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { getAuthHeaders } from "../utils/auth";

export default function useFavorites() {
  const { token, handleSessionExpired } = useAuth();

  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (!token) {
      setFavorites([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/favorites`, {
        headers: getAuthHeaders(token),
      });

      if (response.status === 401) {
        handleSessionExpired();
        setFavorites([]);
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengambil favorite");
      }

      setFavorites(data);
    } catch (error) {
      console.error("Gagal mengambil favorite:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token, handleSessionExpired]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = useCallback(
    async (movie) => {
      if (!token) {
        console.error("User belum login");
        return;
      }

      setIsSaving(true);

      try {
        const response = await fetch(`${API_URL}/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(token),
          },
          body: JSON.stringify({
            id: movie.id,
            title: movie.title,
            image: movie.image,
            rating: movie.rating,
            year: movie.year,
            genreIds: movie.genre_ids ?? [],
          }),
        });

        if (response.status === 401) {
          handleSessionExpired();
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal menambah favorite");
        }

        setFavorites((prev) => [...prev, data]);
      } catch (err) {
        console.error("Gagal menambah favorite:", err);
      } finally {
        setIsSaving(false);
      }
    },
    [token, handleSessionExpired],
  );

  const removeFavorite = useCallback(
    async (id) => {
      if (!token) {
        console.error("User belum login");
        return;
      }

      setIsSaving(true);

      try {
        const response = await fetch(`${API_URL}/favorites/${id}`, {
          method: "DELETE",
          headers: getAuthHeaders(token),
        });

        if (response.status === 401) {
          handleSessionExpired();
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal menghapus favorite");
        }

        setFavorites((prev) =>
          prev.filter((favorite) => favorite.movieId !== id),
        );
      } catch (err) {
        console.error("Gagal menghapus favorite:", err);
      } finally {
        setIsSaving(false);
      }
    },
    [token, handleSessionExpired],
  );

  const isFavorite = useCallback(
    (id) => favorites.some((favorite) => favorite.movieId === id),
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
