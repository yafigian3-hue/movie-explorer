import { useContext } from "react";
import { SearchContext } from "./SearchContext";

export default function useSearch() {
  const context = useContext(SearchContext);

  const {
    allMovies,
    search,
    setSearch,
    searchQuery,
    setSearchQuery,
    clearSearch,
    ...rest
  } = context;

  const searchSuggestions = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return {
    ...rest,

    allMovies,

    search,
    setSearch,

    searchQuery,
    setSearchQuery,

    searchSuggestions,

    filteredMovies,

    clearSearch,
  };
}
