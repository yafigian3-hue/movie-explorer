import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";
import { getAuthHeaders } from "../utils/auth";

export default function useHistory() {
  const { token, handleSessionExpired } = useAuth();

  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    if (!token) {
      setHistory([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/history`, {
        headers: getAuthHeaders(token),
      });

      if (response.status === 401) {
        handleSessionExpired();
        setHistory([]);
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengambil history");
      }

      setHistory(data);
    } catch (error) {
      console.error("Gagal mengambil history:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token, handleSessionExpired]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const addHistory = useCallback(
    async (movie) => {
      if (!token) {
        console.error("User belum login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/history`, {
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

        const historyMovie = await response.json();

        if (!response.ok) {
          throw new Error(historyMovie.message || "Gagal menambah history");
        }

        setHistory((prev) => {
          const filteredHistory = prev.filter(
            (item) => item.movieId !== historyMovie.movieId,
          );

          return [historyMovie, ...filteredHistory];
        });

        return historyMovie;
      } catch (error) {
        console.error("Gagal menambah history:", error);
      }
    },
    [token, handleSessionExpired],
  );

  const deleteAllHistory = useCallback(async () => {
    if (!token) {
      console.error("User belum login");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/history`, {
        method: "DELETE",
        headers: getAuthHeaders(token),
      });

      if (response.status === 401) {
        handleSessionExpired();
        return;
      }

      if (!response.ok) {
        let message = "Gagal menghapus history";

        try {
          const data = await response.json();
          message = data.message || message;
        } catch {
          // 204 No Content tidak memiliki body.
        }

        throw new Error(message);
      }

      setHistory([]);
    } catch (error) {
      console.error("Gagal menghapus history:", error);
    }
  }, [token, handleSessionExpired]);

  return {
    history,
    isLoading,
    addHistory,
    deleteAllHistory,
    fetchHistory,
  };
}
