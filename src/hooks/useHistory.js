import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../config/api";

export default function useHistory() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/history`);
      const data = await response.json();

      setHistory(data);
    } catch (error) {
      console.error("Gagal mengambil history:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const addHistory = useCallback(async (movie) => {
    try {
      const response = await fetch(`${API_URL}/history`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      const historyMovie = await response.json();

      setHistory((prev) => {
        const filteredHistory = prev.filter(
          (movie) => movie.id !== historyMovie.id,
        );

        return [historyMovie, ...filteredHistory];
      });
    } catch (error) {
      console.error("Gagal menambah history:", error);
    }
  }, []);

  const deleteAllHistory = useCallback(async () => {
    try {
      await fetch(`${API_URL}/history`, {
        method: "DELETE",
      });

      setHistory([]);
    } catch (error) {
      console.error("Gagal menghapus history:", error);
    }
  }, []);

  return {
    history,
    isLoading,
    addHistory,
    deleteAllHistory,
  };
}
