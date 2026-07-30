import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../config/api";

export default function useWatchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchWatchlist = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/watchlist`);
      const data = await response.json();
      setWatchlist(data);
    } catch (error) {
      console.error("Gagal mengambil watchlist:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  const addWatchlist = useCallback(async (movie) => {
    setIsSaving(true);

    try {
      const response = await fetch(`${API_URL}/watchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const newMovie = await response.json();

      setWatchlist((prev) => [...prev, newMovie]);
    } catch (error) {
      console.error("Gagal menambah watchlist:", error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const removeWatchlist = useCallback(async (id) => {
    setIsSaving(true);

    try {
      await fetch(`${API_URL}/watchlist/${id}`, {
        method: "DELETE",
      });

      setWatchlist((prev) => prev.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Gagal menghapus watchlist:", error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const isInWatchlist = useCallback(
    (id) => watchlist.some((movie) => movie.id === id),
    [watchlist],
  );

  return {
    watchlist,
    isLoading,
    isSaving,
    addWatchlist,
    removeWatchlist,
    isInWatchlist,
  };
}
