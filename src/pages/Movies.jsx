import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import useSearch from "../context/useSearch";
import { GENRES } from "../utils/genres";

const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Paling Populer" },
  { value: "vote_average.desc", label: "Rating Tertinggi" },
  { value: "release_date.desc", label: "Terbaru" },
  { value: "release_date.asc", label: "Terlama" },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 40 }, (_, i) => CURRENT_YEAR - i);

function FilterSelect({ value, onChange, options, placeholder, active }) {
  return (
    <div className="relative flex-1 min-w-0">
      <select
        value={value}
        onChange={onChange}
        className={`w-full truncate appearance-none text-[11px] sm:text-sm font-medium rounded-full pl-2.5 sm:pl-4 pr-6 sm:pr-9 py-1.5 sm:py-2.5 outline-none transition-all cursor-pointer border ${
          active
            ? "bg-red-600/15 border-red-600/50 text-red-400"
            : "bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/80"
        } focus:ring-2 focus:ring-red-500/30 focus:border-red-500`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options}
      </select>
      <ChevronDown
        size={13}
        className={`pointer-events-none absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 ${
          active ? "text-red-400" : "text-zinc-500"
        }`}
      />
    </div>
  );
}

export default function Movies() {
  const [searchParams] = useSearchParams();

  const {
    discoverMovies,
    discoverPage,
    discoverTotalPages,
    discoverTotalResults,
    discoverLoading,
    fetchDiscoverFiltered,
    resetDiscover,
  } = useSearch();

  const pageTitle = searchParams.get("title") || "Jelajahi Film";

  const [genre, setGenre] = useState(searchParams.get("genre") || "");
  const [year, setYear] = useState(searchParams.get("year") || "");
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort") || "popularity.desc",
  );

  const hasActiveFilter = Boolean(
    genre || year || sortBy !== "popularity.desc",
  );

  const loadMovies = useCallback(
    (page = 1) => {
      fetchDiscoverFiltered({
        genre: genre || undefined,
        year: year || undefined,
        sortBy,
        page,
      });
    },
    [genre, year, sortBy, fetchDiscoverFiltered],
  );

  useEffect(() => {
    resetDiscover();
    loadMovies(1);
    window.scrollTo({ top: 0, behavior: "instant" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre, year, sortBy]);

  const resetFilters = () => {
    setGenre("");
    setYear("");
    setSortBy("popularity.desc");
  };

  const isFirstLoad = discoverLoading && discoverPage === 1;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar forceVisible />

      <style>{`
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div className="relative pt-24 pb-8 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/70 bg-gradient-to-b from-zinc-900/60 to-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          {/* Kiri */}
          <div>
            <div className="flex items-center gap-2 text-red-500 text-xs font-semibold uppercase tracking-wider mb-2">
              <SlidersHorizontal size={14} />
              Discover
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold mb-1">{pageTitle}</h1>

            {discoverTotalResults > 0 && (
              <p className="text-zinc-500 text-sm">
                Menampilkan {discoverMovies.length} dari{" "}
                {discoverTotalResults.toLocaleString("id-ID")} film
              </p>
            )}
          </div>

          {/* Kanan */}
          <div className="flex items-center gap-1.5 sm:gap-2 w-full lg:w-auto">
            <FilterSelect
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Genre"
              active={Boolean(genre)}
              options={Object.entries(GENRES).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            />
            <FilterSelect
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Tahun"
              active={Boolean(year)}
              options={YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            />
            <FilterSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              active={sortBy !== "popularity.desc"}
              options={SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            />
            {hasActiveFilter && (
              <button
                onClick={resetFilters}
                aria-label="Reset filter"
                className="shrink-0 flex items-center justify-center text-zinc-400 hover:text-red-400 p-2 sm:px-4 sm:py-2.5 rounded-full hover:bg-zinc-900 transition-colors"
              >
                <X size={16} />
                <span className="hidden sm:inline sm:ml-1.5 text-sm font-medium">
                  Reset
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {isFirstLoad ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 mt-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3.4] rounded-xl bg-zinc-900 border border-zinc-800 animate-pulse"
              />
            ))}
          </div>
        ) : discoverMovies.length === 0 ? (
          <div className="py-24 flex flex-col items-center text-center">
            <div className="mb-5 p-5 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <SlidersHorizontal size={32} className="text-zinc-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tidak ada film ditemukan</h3>
            <p className="text-zinc-500 max-w-sm">
              Coba ubah kombinasi filter genre, tahun, atau urutan.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 mt-6">
            {discoverMovies.map((movie, i) => (
              <div
                key={movie.id}
                style={{
                  animation: "cardFadeIn 0.4s ease-out both",
                  animationDelay: `${(i % 10) * 40}ms`,
                }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}

        {!isFirstLoad && discoverPage < discoverTotalPages && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => loadMovies(discoverPage + 1)}
              disabled={discoverLoading}
              className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white px-7 py-3 rounded-full font-semibold text-sm transition-all disabled:opacity-50 hover:scale-[1.02] active:scale-95"
            >
              {discoverLoading && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Muat Lebih Banyak
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
