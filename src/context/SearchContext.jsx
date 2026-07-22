import { createContext, useEffect, useState } from "react";
import useMovies from "../hooks/useMovies";

export const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    trendingMovies,
    topRatedMovies,
    actionMovies,
    horrorMovies,

    searchResults,
    searchMovies,

    movieDetail,
    fetchMovieDetail,

    isLoading,
    error,
    fetchAllMovies,
  } = useMovies();

  useEffect(() => {
    fetchAllMovies();
  }, [fetchAllMovies]);

  const allMovies = [
    ...trendingMovies,
    ...topRatedMovies,
    ...actionMovies,
    ...horrorMovies,
  ].filter(
    (movie, index, self) => index === self.findIndex((m) => m.id === movie.id),
  );

  const clearSearch = () => {
    setSearch("");
    setSearchQuery("");
  };

  return (
    <SearchContext.Provider
      value={{
        trendingMovies,
        topRatedMovies,
        actionMovies,
        horrorMovies,

        allMovies,

        searchResults,
        searchMovies,

        search,
        setSearch,

        searchQuery,
        setSearchQuery,

        movieDetail,
        fetchMovieDetail,

        isLoading,
        error,

        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
