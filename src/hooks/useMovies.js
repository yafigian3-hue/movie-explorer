import { useState } from "react";

export default function useMovies(search, searchQuery) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = () => {
    setIsLoading(true);
    setError("");

    const token = import.meta.env.VITE_TMDB_TOKEN;

    fetch("https://api.themoviedb.org/3/movie/popular", {
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
        const normalizedMovies = (data.results || []).map((movie) => ({
          id: movie.id,
          title: movie.title,
          image: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x400",
          rating: movie.vote_average ? movie.vote_average.toFixed(1) : "8.5",
          description: movie.overview || "No description available",
          year: movie.release_date ? movie.release_date.slice(0, 4) : "N/A",
          genre: "Popular Movie",
        }));

        setMovies(normalizedMovies);
      })
      .catch((err) => {
        console.log(err);
        setError("Gagal memuat film. Silakan coba lagi");
      })
      .finally(() => setIsLoading(false));
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const searchSuggestions = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase()),
  );

  return {
    movies,
    setMovies,
    isLoading,
    setIsLoading,
    error,
    setError,
    fetchMovies,
    filteredMovies,
    searchSuggestions,
  };
}
