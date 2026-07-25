import { useContext, useMemo } from "react";
import { SearchContext } from "./SearchContext";

export default function useSearch() {
  const context = useContext(SearchContext);

  const {
    trendingMovies,
    topRatedMovies,
    actionMovies,
    horrorMovies,

    search,
    setSearch,
    searchQuery,
    setSearchQuery,

    searchResults,
    searchMovies,

    clearSearch,

    ...rest
  } = context;

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

  const searchSuggestions = useMemo(
    () =>
      allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [allMovies, search],
  );

  const filteredMovies = useMemo(
    () =>
      allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [allMovies, searchQuery],
  );

  return {
    ...rest,

    trendingMovies,
    topRatedMovies,
    actionMovies,
    horrorMovies,

    allMovies,

    search,
    setSearch,

    searchQuery,
    setSearchQuery,

    searchResults,
    searchMovies,

    searchSuggestions,
    filteredMovies,

    clearSearch,
  };
}
