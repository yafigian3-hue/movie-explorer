import { useContext } from "react";
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

  const allMovies = [
    ...trendingMovies,
    ...topRatedMovies,
    ...actionMovies,
    ...horrorMovies,
  ].filter(
    (movie, index, self) => index === self.findIndex((m) => m.id === movie.id),
  );

  const searchSuggestions = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
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
