import Navbar from "../components/Navbar";
import { useSearchParams } from "react-router-dom";
import useSearch from "../context/useSearch";
import { useEffect, useMemo, useState } from "react";
import MovieSection from "../components/MovieSection";
import {
  SearchX,
  Star,
  Flame,
  TrendingUp,
  CalendarDays,
  SearchIcon,
} from "lucide-react";
import HeroBanner from "../components/HeroBanner";
import { Link } from "react-router-dom";

const SORT_OPTIONS = [
  { value: "popular", label: "Populer", icon: Flame },
  { value: "rating", label: "Rating tertinggi", icon: TrendingUp },
  { value: "year", label: "Terbaru", icon: CalendarDays },
];

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { searchMovies, searchResults } = useSearch();
  const [sortBy, setSortBy] = useState("popular");

  const results = searchResults ?? [];

  useEffect(() => {
    if (query) {
      searchMovies(query);
    }
  }, [query, searchMovies]);

  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => {
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "year") return (b.year || 0) - (a.year || 0);
      return 0;
    });
  }, [results, sortBy]);

  const topRating =
    results.length > 0
      ? Math.max(...results.map((m) => Number(m.rating) || 0))
      : 0;

  return (
    <>
      <Navbar />

      {query && results.length > 0 && (
        <HeroBanner
          movies={results}
          limit={5}
          showProgress={true}
          variant="search"
        />
      )}

      <main className="min-h-screen bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex items-start gap-3"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          {!query ? (
            <div className="py-20 sm:py-28 flex flex-col items-center justify-center text-center border border-dashed border-zinc-800 rounded-2xl">
              <div className="mb-6 p-5 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <SearchIcon size={40} className="text-zinc-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Belum ada kata kunci
              </h3>
              <p className="text-zinc-400 max-w-md">
                Gunakan kolom pencarian di navbar untuk mencari judul film
                favoritmu.
              </p>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="mb-8 flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-zinc-400 text-sm font-medium mr-1">
                  Urutkan:
                </span>
                {SORT_OPTIONS.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setSortBy(value)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      sortBy === value
                        ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                        : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800"
                    }`}
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                ))}
              </div>

              <MovieSection
                title={`Menampilkan ${sortedResults.length} hasil`}
                movies={sortedResults}
              />
            </>
          ) : (
            <div className="py-20 sm:py-32 flex flex-col items-center justify-center text-center">
              <div className="mb-6 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <SearchX size={48} className="text-zinc-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Tidak ada hasil untuk "{query}"
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg mb-8 max-w-md">
                Coba kata kunci lain atau jelajahi film populer kami.
              </p>

              <Link
                to="/"
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-full transition-all hover:scale-[1.03] active:scale-95"
              >
                Kembali ke beranda
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
