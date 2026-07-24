import { useEffect } from "react";
import Navbar from "../components/Navbar";
import MovieSection from "../components/MovieSection";
import useSearch from "../context/useSearch";

export default function Movies() {
  const {
    trendingMovies,
    topRatedMovies,
    actionMovies,
    horrorMovies,
    isLoading,
    error,
  } = useSearch();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Navbar />
        <p className="text-zinc-500 animate-pulse">Memuat film...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Navbar />
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="pt-24 pb-10">
        <MovieSection title="🔥 Trending" movies={trendingMovies} />
        <MovieSection title="⭐ Top Rated" movies={topRatedMovies} />
        <MovieSection title="💥 Action" movies={actionMovies} />
        <MovieSection title="👻 Horror" movies={horrorMovies} />
      </main>
    </div>
  );
}
