import { createContext, useEffect, useState } from "react";
import useMovies from "../hooks/useMovies";

export const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

 const {
   movies,
   setMovies,
   isLoading,
   setIsLoading,
   error,
   setError,
   fetchMovies,
   filteredMovies,
   searchSuggestions,
 } = useMovies(search, searchQuery);

 const clearSearch = () => {
   setSearch("");
   setSearchQuery("");
 };


  return (
    <SearchContext.Provider
      value={{
        movies,
        setMovies,

        search,
        setSearch,

        searchQuery,
        setSearchQuery,

        searchSuggestions,

        isSearching,
        setIsSearching,

        isLoading,
        setIsLoading,

        error,
        setError,

        fetchMovies,

        filteredMovies,

        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
