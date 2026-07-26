import { useState, useCallback, useRef } from "react";
import { fetchTMDB, normalizeMovie } from "../services/tmdb";
import { PLACEHOLDER_IMAGE } from "../utils/placeholder";

export default function useMovies() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [lastSearchedQuery, setLastSearchedQuery] = useState("");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [movieDetail, setMovieDetail] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [watchProviders, setWatchProviders] = useState(null);
  const [cast, setCast] = useState([]);

  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [discoverPage, setDiscoverPage] = useState(1);
  const [discoverTotalPages, setDiscoverTotalPages] = useState(1);
  const [discoverTotalResults, setDiscoverTotalResults] = useState(0);
  const [discoverLoading, setDiscoverLoading] = useState(false);

  const searchAbortRef = useRef(null);
  const inFlightQueryRef = useRef(null);
  const searchCacheRef = useRef(new Map());
  const detailCacheRef = useRef(new Map());
  const detailAbortRef = useRef(null);

  const fetchMovies = useCallback(async (endpoint, setState) => {
    try {
      const data = await fetchTMDB(`/movie/${endpoint}`);
      setState(data.results.map(normalizeMovie));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const fetchDiscoverMovies = useCallback(async (genreId, setState) => {
    try {
      const data = await fetchTMDB(
        `/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`,
      );
      setState(data.results.map(normalizeMovie));
    } catch (err) {
      console.error(err);
      throw err;
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

  const searchMovies = useCallback(async (query) => {
    const trimmed = query.trim();

    if (!trimmed) {
      setSearchResults([]);
      setIsSearching(false);
      setLastSearchedQuery("");
      return;
    }

    if (searchCacheRef.current.has(trimmed)) {
      setSearchResults(searchCacheRef.current.get(trimmed));
      setIsSearching(false);
      setLastSearchedQuery(trimmed);
      return;
    }

    if (inFlightQueryRef.current === trimmed) return;
    inFlightQueryRef.current = trimmed;

    searchAbortRef.current?.abort();
    const controller = new AbortController();
    searchAbortRef.current = controller;

    setIsSearching(true);

    try {
      const data = await fetchTMDB(
        `/search/movie?query=${encodeURIComponent(trimmed)}`,
        { signal: controller.signal },
      );

      const normalized = data.results.map(normalizeMovie);
      searchCacheRef.current.set(trimmed, normalized);
      setSearchResults(normalized);
      setLastSearchedQuery(trimmed);
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error(err);
    } finally {
      if (!controller.signal.aborted) setIsSearching(false);
      if (inFlightQueryRef.current === trimmed) {
        inFlightQueryRef.current = null;
      }
    }
  }, []);

  const fetchSearchSuggestions = useCallback(async (query) => {
    const trimmed = query.trim();

    if (!trimmed) {
      setSearchSuggestions([]);
      return;
    }

    setIsSuggestionLoading(true);

    try {
      const data = await fetchTMDB(
        `/search/movie?query=${encodeURIComponent(trimmed)}`,
      );

      setSearchSuggestions(data.results.map(normalizeMovie).slice(0, 5));
    } catch (err) {
      console.error(err);
      setSearchSuggestions([]);
    } finally {
      setIsSuggestionLoading(false);
    }
  }, []);

  const fetchMovieDetail = useCallback(async (id) => {
    if (detailCacheRef.current.has(id)) {
      setMovieDetail(detailCacheRef.current.get(id));
      setError("");
      return;
    }

    detailAbortRef.current?.abort();
    const controller = new AbortController();
    detailAbortRef.current = controller;

    setIsLoading(true);
    setError("");

    try {
      const data = await fetchTMDB(`/movie/${id}`, {
        signal: controller.signal,
      });

      detailCacheRef.current.set(id, data);
      setMovieDetail(data);
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error(err);
      setError("Film tidak ditemukan");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchSimilarMovies = useCallback(async (id) => {
    try {
      const data = await fetchTMDB(`/movie/${id}/similar`);
      setSimilarMovies(data.results.map(normalizeMovie));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchMovieCast = useCallback(async (id) => {
    try {
      const data = await fetchTMDB(`/movie/${id}/credits`);

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

  const fetchWatchProviders = useCallback(async (id) => {
    try {
      const data = await fetchTMDB(`/movie/${id}/watch/providers`);
      const region = data.results?.ID || data.results?.US || null;
      setWatchProviders(region);
    } catch (err) {
      console.error(err);
      setWatchProviders(null);
    }
  }, []);

  const fetchDiscoverFiltered = useCallback(
    async ({ genre, year, sortBy = "popularity.desc", page = 1 } = {}) => {
      setDiscoverLoading(true);

      try {
        const params = new URLSearchParams();
        params.set("sort_by", sortBy);
        params.set("page", page);
        if (genre) params.set("with_genres", genre);
        if (year) params.set("primary_release_year", year);
        if (sortBy === "vote_average.desc") {
          params.set("vote_count.gte", "300");
        }

        const data = await fetchTMDB(`/discover/movie?${params.toString()}`);
        const normalized = data.results.map(normalizeMovie);

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

  const clearSearch = useCallback(() => {
    setSearch("");
    setSearchSuggestions([]);
    setIsSuggestionLoading(false);
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

    searchSuggestions,
    fetchSearchSuggestions,

    isSuggestionLoading,
    clearSearch,

    movieDetail,
    fetchMovieDetail,

    similarMovies,
    fetchSimilarMovies,

    watchProviders,
    fetchWatchProviders,

    cast,
    fetchMovieCast,

    discoverMovies,
    discoverPage,
    discoverTotalPages,
    discoverTotalResults,
    discoverLoading,
    fetchDiscoverFiltered,
    resetDiscover,

    isLoading,
    error,
    fetchAllMovies,
    isSearching,
    lastSearchedQuery,
  };
}
