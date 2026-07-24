import { useState, useCallback } from "react";
import { PLACEHOLDER_IMAGE } from "../utils/placeholder";

export default function useMovies() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [movieDetail, setMovieDetail] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [discoverPage, setDiscoverPage] = useState(1);
  const [discoverTotalPages, setDiscoverTotalPages] = useState(1);
  const [discoverLoading, setDiscoverLoading] = useState(false);
  const [discoverTotalResults, setDiscoverTotalResults] = useState(0);

  const [cast, setCast] = useState([]);

  

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
            : PLACEHOLDER_IMAGE,

          rating: movie.vote_average.toFixed(1),

          year: movie.release_date?.slice(0, 4) || "N/A",
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
            : PLACEHOLDER_IMAGE,

          rating: movie.vote_average.toFixed(1),

          year: movie.release_date?.slice(0, 4) || "N/A",
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
          : PLACEHOLDER_IMAGE,
        rating: movie.vote_average.toFixed(1),

        year: movie.release_date?.slice(0, 4) || "N/A",
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

  const fetchMovieDetail = useCallback(async (id) => {
    setIsLoading(true);
    setError("");

    const token = import.meta.env.VITE_TMDB_TOKEN;

    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil detail film");
      }

      const data = await response.json();

      setMovieDetail(data);
    } catch (err) {
      console.error(err);
      setError("Film tidak ditemukan");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchSimilarMovies = useCallback(async (id) => {
    const token = import.meta.env.VITE_TMDB_TOKEN;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil similar movies");
      }

      const data = await response.json();

      const normalizedMovies = data.results.map((movie) => ({
        ...movie,

        image: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : PLACEHOLDER_IMAGE,

        rating: movie.vote_average.toFixed(1),

        year: movie.release_date?.slice(0, 4) || "N/A",
      }));

      setSimilarMovies(normalizedMovies);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchDiscoverFiltered = useCallback(
    async ({ genre, year, sortBy = "popularity.desc", page = 1 } = {}) => {
      const token = import.meta.env.VITE_TMDB_TOKEN;
      setDiscoverLoading(true);

      try {
        const params = new URLSearchParams();
        params.set("sort_by", sortBy);
        params.set("page", page);
        if (genre) params.set("with_genres", genre);
        if (year) params.set("primary_release_year", year);
        if (sortBy === "vote_average.desc") params.set("vote_count.gte", "300");

        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?${params.toString()}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (!response.ok) throw new Error("Gagal memuat film");

        const data = await response.json();

        const normalized = data.results.map((movie) => ({
          ...movie,
          image: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : PLACEHOLDER_IMAGE,
          rating: movie.vote_average.toFixed(1),
          year: movie.release_date?.slice(0, 4) || "N/A",
        }));

        setDiscoverMovies((prev) =>
          page === 1 ? normalized : [...prev, ...normalized],
        );
        setDiscoverPage(data.page);
        setDiscoverTotalPages(data.total_pages);
        setDiscoverTotalResults(data.total_results);
      } catch (err) {
        console.error(err);
      } finally {
        setDiscoverLoading(false);
      }
    },
    [],
  );

  const resetDiscover = useCallback(() => {
    setDiscoverMovies([]);
    setDiscoverPage(1);
    setDiscoverTotalPages(1);
  }, []);

  const fetchMovieCast = useCallback(async (id) => {
    const token = import.meta.env.VITE_TMDB_TOKEN;

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data cast");
      }

      const data = await response.json();

      // Ambil 10 pemeran utama saja
      const topCast = data.cast.slice(0, 10).map((person) => ({
        id: person.id,
        name: person.name,
        character: person.character,
        profile: person.profile_path
          ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
          : PLACEHOLDER_IMAGE,
      }));

      setCast(topCast);
    } catch (err) {
      console.error(err);
      setCast([]);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearch("");
    setSearchQuery("");
    setSearchResults([]);
  }, []);

  return {
    search,
    setSearch,

    searchQuery,
    setSearchQuery,

    trendingMovies,
    topRatedMovies,
    actionMovies,
    horrorMovies,

    searchResults,
    searchMovies,
    clearSearch,

    movieDetail,
    fetchMovieDetail,

    similarMovies,
    fetchSimilarMovies,

    discoverMovies,
    discoverPage,
    discoverTotalPages,
    discoverLoading,
    fetchDiscoverFiltered,
    resetDiscover,
    discoverTotalResults,

    isLoading,
    error,
    fetchAllMovies,

    cast,
    fetchMovieCast,
  };
}
