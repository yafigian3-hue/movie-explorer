import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import MovieSection from "../components/MovieSection";
import useSearch from "../context/useSearch";

export default function Home() {
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
      <HeroBanner movies={trendingMovies} />{" "}
      <div className="bg-zinc-950 pb-10">
        <MovieSection
          title="🔥 Trending"
          movies={trendingMovies}
          viewAllLink="/movies?sort=popularity.desc&title=Trending"
        />
        <MovieSection
          title="⭐ Top Rated"
          movies={topRatedMovies}
          viewAllLink="/movies?sort=vote_average.desc&title=Top+Rated"
        />
        <MovieSection
          title="💥 Action"
          movies={actionMovies}
          viewAllLink="/movies?genre=28&title=Action"
        />
        <MovieSection
          title="👻 Horror"
          movies={horrorMovies}
          viewAllLink="/movies?genre=27&title=Horror"
        />
      </div>
    </>
  );
}
