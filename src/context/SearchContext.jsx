import { createContext, useEffect, useState } from "react";
import useMovies from "../hooks/useMovies";

export const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    nowPlayingMovies,
    isLoading,
    error,
    fetchAllMovies,
  } = useMovies();

  useEffect(() => {
    fetchAllMovies();
  }, [fetchAllMovies]);

  const allMovies = [
    ...popularMovies,
    ...topRatedMovies,
    ...upcomingMovies,
    ...nowPlayingMovies,
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
        popularMovies,
        topRatedMovies,
        upcomingMovies,
        nowPlayingMovies,

        allMovies,

        search,
        setSearch,

        searchQuery,
        setSearchQuery,

        isLoading,
        error,

        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
