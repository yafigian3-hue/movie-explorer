import { useEffect, useState } from "react";
import useSearch from "../context/useSearch";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const { movies, searchQuery, fetchMovies, filteredMovies, isLoading, error } =
    useSearch();

  useEffect(() => {
    if (movies.length > 0) return;

    fetchMovies();
  }, [movies]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-zinc-950 p-6 text-white">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="animate-pulse text-zinc-500">
              Memuat film populer...
            </p>
          </div>
        ) : error !== "" ? (
          <div className="text-center text-red-500 py-10">
            <p>{error}</p>

            <button
              onClick={fetchMovies}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                       {" "}
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
                     {" "}
          </div>
        )}
      </div>
    </>
  );
}
