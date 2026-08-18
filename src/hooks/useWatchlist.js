import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { getAuthHeaders } from "../utils/auth";
import { useToast } from "../context/ToastContext";

export default function useWatchlist() {
  const { token, handleSessionExpired } = useAuth();

  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { showToast } = useToast();

  const fetchWatchlist = useCallback(async () => {
    if (!token) {
      setWatchlist([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/watchlist`, {
        headers: getAuthHeaders(token),
      });

      if (response.status === 401) {
        handleSessionExpired();
        setWatchlist([]);
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengambil watchlist");
      }

      setWatchlist(data);
    } catch (error) {
      console.error("Gagal mengambil watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token, handleSessionExpired]);

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  const addWatchlist = useCallback(
    async (movie) => {
      if (!token) {
        console.error("User belum login");
        return;
      }

      setIsSaving(true);

      try {
        const response = await fetch(`${API_URL}/watchlist`, {
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
            genreIds: movie.genre_ids ?? movie.genreIds ?? [],
          }),
        });

        if (response.status === 401) {
          handleSessionExpired();
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal menambah watchlist");
        }

        setWatchlist((prev) => [...prev, data]);

        showToast("Film ditambahkan ke Watchlist.", "success");
      } catch (error) {
        console.error("Gagal menambah watchlist:", error);
      } finally {
        setIsSaving(false);
      }
    },
    [token, handleSessionExpired, showToast],
  );

  const removeWatchlist = useCallback(
    async (id) => {
      if (!token) {
        console.error("User belum login");
        return;
      }

      setIsSaving(true);

      try {
        const response = await fetch(`${API_URL}/watchlist/${id}`, {
          method: "DELETE",
          headers: getAuthHeaders(token),
        });

        if (response.status === 401) {
          handleSessionExpired();
          return;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Gagal menghapus watchlist");
        }

        setWatchlist((prev) => prev.filter((movie) => movie.movieId !== id));

        showToast("Film dihapus dari Watchlist.", "success");
      } catch (error) {
        console.error("Gagal menghapus watchlist:", error);
      } finally {
        setIsSaving(false);
      }
    },
    [token, handleSessionExpired, showToast],
  );

  const isInWatchlist = useCallback(
    (id) => watchlist.some((movie) => movie.movieId === id),
    [watchlist],
  );

  return {
    watchlist,
    isLoading,
    isSaving,
    addWatchlist,
    removeWatchlist,
    isInWatchlist,
    fetchWatchlist,
  };
}
