import { useState, useCallback } from "react";

export default function useMovies() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const fetchMovies = useCallback((endpoint, setState) => {
    const token = import.meta.env.VITE_TMDB_TOKEN;

    return fetch(`https://api.themoviedb.org/3/movie/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }

        return response.json();
      })
      .then((data) => {
        const normalizedMovies = data.results.map((movie) => ({
          ...movie,

          image: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x400",

          rating: movie.vote_average.toFixed(1),

          year: movie.release_date?.slice(0, 4) || "N/A",

          genre: endpoint
            .replace("_", " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        }));

        setState(normalizedMovies);
      });
  }, []);

  const fetchDiscoverMovies = useCallback((genreId, setState) => {
    const token = import.meta.env.VITE_TMDB_TOKEN;

    return fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }

        return response.json();
      })
      .then((data) => {
        const normalizedMovies = data.results.map((movie) => ({
          ...movie,

          image: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x400",

          rating: movie.vote_average.toFixed(1),

          year: movie.release_date?.slice(0, 4) || "N/A",

          genre: "Discover",
        }));

        setState(normalizedMovies);
      });
  }, []);

  const searchMovies = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const token = import.meta.env.VITE_TMDB_TOKEN;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Gagal mencari film");
      }

      const data = await response.json();

      const normalizedMovies = data.results.map((movie) => ({
        ...movie,

        image: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://via.placeholder.com/300x400",

        rating: movie.vote_average.toFixed(1),

        year: movie.release_date?.slice(0, 4) || "N/A",

        genre: "Search",
      }));

      setSearchResults(normalizedMovies);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchAllMovies = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      await Promise.all([
        fetchMovies("popular", setTrendingMovies),
        fetchMovies("top_rated", setTopRatedMovies),

        fetchDiscoverMovies(28, setActionMovies),

        fetchDiscoverMovies(27, setHorrorMovies),
      ]);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat film.");
    } finally {
      setIsLoading(false);
    }
  }, [fetchMovies, fetchDiscoverMovies]);

  return {
    trendingMovies,
    topRatedMovies,
    actionMovies,
    horrorMovies,

    searchResults,
    searchMovies,

    isLoading,
    error,
    fetchAllMovies,
  };
}
