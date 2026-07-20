import { useState, useCallback } from "react";

export default function useMovies() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

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

  const fetchAllMovies = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      await Promise.all([
        fetchMovies("popular", setPopularMovies),
        fetchMovies("top_rated", setTopRatedMovies),
        fetchMovies("upcoming", setUpcomingMovies),
        fetchMovies("now_playing", setNowPlayingMovies),
      ]);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat film.");
    } finally {
      setIsLoading(false);
    }
  }, [fetchMovies]);

  return {
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    nowPlayingMovies,
    isLoading,
    error,
    fetchAllMovies,
  };
}
