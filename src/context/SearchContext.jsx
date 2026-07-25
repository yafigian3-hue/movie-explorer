import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import useMovies from "../hooks/useMovies";

export const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [movieTrailer, setMovieTrailer] = useState(null);

  const {
    trendingMovies,
    topRatedMovies,
    actionMovies,
    horrorMovies,
    searchResults,
    searchMovies,
    search,
    setSearch,
    searchQuery,
    searchSuggestions,
    isSuggestionLoading,
    fetchSearchSuggestions,
    setSearchQuery,
    movieDetail,
    fetchMovieDetail,
    similarMovies,
    fetchSimilarMovies,
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
    clearSearch,
    fetchAllMovies,
    isSearching,
    lastSearchedQuery,
  } = useMovies();

  useEffect(() => {
    fetchAllMovies();
  }, [fetchAllMovies]);

  const allMovies = useMemo(
    () =>
      [
        ...trendingMovies,
        ...topRatedMovies,
        ...actionMovies,
        ...horrorMovies,
      ].filter(
        (movie, index, self) =>
          index === self.findIndex((m) => m.id === movie.id),
      ),
    [trendingMovies, topRatedMovies, actionMovies, horrorMovies],
  );

  const fetchMovieTrailer = useCallback(async (id) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        },
      );
      const data = await response.json();
      const trailer = data.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer",
      );
      setMovieTrailer(trailer || null);
    } catch (error) {
      console.error(error);
      setMovieTrailer(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      trendingMovies,
      topRatedMovies,
      actionMovies,
      horrorMovies,
      allMovies,
      searchResults,
      searchMovies,
      search,
      setSearch,
      searchSuggestions,
      isSuggestionLoading,
      fetchSearchSuggestions,
      searchQuery,
      setSearchQuery,
      movieDetail,
      fetchMovieDetail,
      similarMovies,
      fetchSimilarMovies,
      cast,
      fetchMovieCast,
      discoverMovies,
      discoverPage,
      discoverTotalPages,
      discoverTotalResults,
      discoverLoading,
      fetchDiscoverFiltered,
      resetDiscover,
      movieTrailer,
      fetchMovieTrailer,
      isLoading,
      error,
      clearSearch,
      isSearching,
      lastSearchedQuery,
    }),
    [
      trendingMovies,
      topRatedMovies,
      actionMovies,
      horrorMovies,
      allMovies,
      searchResults,
      searchMovies,
      search,
      setSearch,
      searchSuggestions,
      isSuggestionLoading,
      fetchSearchSuggestions,
      searchQuery,
      setSearchQuery,
      movieDetail,
      fetchMovieDetail,
      similarMovies,
      fetchSimilarMovies,
      cast,
      fetchMovieCast,
      discoverMovies,
      discoverPage,
      discoverTotalPages,
      discoverTotalResults,
      discoverLoading,
      fetchDiscoverFiltered,
      resetDiscover,
      movieTrailer,
      fetchMovieTrailer,
      isLoading,
      error,
      clearSearch,
      isSearching,
      lastSearchedQuery,
    ],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
