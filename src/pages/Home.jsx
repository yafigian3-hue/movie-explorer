import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import MovieSection from "../components/MovieSection";
import useSearch from "../context/useSearch";

export default function Home() {
  const {
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    nowPlayingMovies,
    isLoading,
    error,
  } = useSearch();

  if (isLoading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <p className="text-zinc-500 animate-pulse">Memuat film...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <HeroBanner movies={popularMovies} />

      <div className="bg-zinc-950 pb-10">
        <MovieSection title="🔥 Popular" movies={popularMovies} />

        <MovieSection title="⭐ Top Rated" movies={topRatedMovies} />

        <MovieSection title="🎬 Upcoming" movies={upcomingMovies} />

        <MovieSection title="🍿 Now Playing" movies={nowPlayingMovies} />
      </div>
    </>
  );
}
