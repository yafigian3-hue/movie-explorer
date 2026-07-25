import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import MovieSection from "../components/MovieSection";
import useSearch from "../context/useSearch";

function SectionSkeleton({ title }) {
  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 h-6 w-40 bg-zinc-800 rounded-md animate-pulse" />
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="min-w-[140px] sm:min-w-[180px] md:min-w-[220px] aspect-[2/3.4] rounded-xl bg-zinc-900 border border-zinc-800 animate-pulse shrink-0"
          />
        ))}
      </div>
    </section>
  );
}

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
        <Navbar forceVisible />
        <div className="min-h-screen bg-zinc-950 pt-24">
          <div className="h-[50vh] sm:h-[60vh] bg-zinc-900 animate-pulse" />
          <SectionSkeleton />
          <SectionSkeleton />
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
      <HeroBanner movies={trendingMovies} />
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
