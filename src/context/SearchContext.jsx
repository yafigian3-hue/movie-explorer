import { createContext, useEffect, useState } from "react";
import useMovies from "../hooks/useMovies";
import { useCallback } from "react";

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
    setSearchQuery,

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

        similarMovies,
        fetchSimilarMovies,

        discoverMovies,
        discoverPage,
        discoverTotalPages,
        discoverLoading,
        fetchDiscoverFiltered,
        resetDiscover,
        discoverTotalResults,

        movieTrailer,
        fetchMovieTrailer,

        isLoading,
        error,

        clearSearch,

        cast,
        fetchMovieCast,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
