import { useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import useFavorites from "../hooks/useFavorites";
import useWatchlist from "../hooks/useWatchlist";
import useHistory from "../hooks/useHistory";
import { User, Heart, Clock, Bookmark, Sparkles, Loader2 } from "lucide-react";

const TABS = [
  { key: "favorites", label: "Favorite", icon: Heart },
  { key: "history", label: "Riwayat", icon: Clock },
  { key: "watchlist", label: "Watchlist", icon: Bookmark },
];

function ComingSoon({ label }) {
  return (
    <div className="py-16 sm:py-24 flex flex-col items-center text-center">
      <div className="mb-5 p-5 bg-zinc-900 border border-zinc-800 rounded-2xl">
        <Sparkles size={30} className="text-zinc-600" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
        {label} Segera Hadir
      </h3>
      <p className="text-zinc-500 text-sm max-w-xs">
        Fitur ini sedang dalam pengembangan dan akan tersedia setelah backend
        untuk {label.toLowerCase()} selesai dibuat.
      </p>
    </div>
  );
}

function FavoriteGrid() {
  const { favorites, isLoading, removeFavorite } = useFavorites();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3.4] rounded-xl bg-zinc-900 border border-zinc-800 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="py-16 sm:py-24 flex flex-col items-center text-center">
        <div className="mb-5 p-5 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <Heart size={30} className="text-zinc-600" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
          Belum Ada Favorite
        </h3>
        <p className="text-zinc-500 text-sm max-w-xs">
          Klik ikon hati pada film yang kamu suka untuk menyimpannya di sini.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
      {favorites.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

function WatchlistGrid() {
  const { watchlist, isLoading } = useWatchlist();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3.4] rounded-xl bg-zinc-900 border border-zinc-800 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (watchlist.length === 0) {
    return (
      <div className="py-16 sm:py-24 flex flex-col items-center text-center">
        <div className="mb-5 p-5 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <Bookmark size={30} className="text-zinc-600" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
          Belum Ada Watchlist
        </h3>

        <p className="text-zinc-500 text-sm max-w-xs">
          Tambahkan film ke watchlist agar bisa ditonton nanti.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
      {watchlist.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

function formatViewedAt(date) {
  const viewedDate = new Date(date);
  const now = new Date();

  const diff = now - viewedDate;

  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  if (days < 7) return `${days} hari lalu`;

  return viewedDate.toLocaleDateString("id-ID");
}

function HistoryGrid() {
  const { history, isLoading } = useHistory();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
      {history.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          subtitle={formatViewedAt(movie.viewedAt)}
        />
      ))}
    </div>
  );
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("favorites");
  const { favorites, isLoading } = useFavorites();

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar forceVisible />

      {/* Header profil */}
      <div className="relative pt-24 pb-8 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/70 bg-gradient-to-b from-zinc-900/60 to-zinc-950 overflow-hidden">
        {/* Aksen dekoratif */}
        <div className="pointer-events-none absolute -top-24 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto flex items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shrink-0 ring-4 ring-zinc-900 shadow-lg shadow-red-600/20">
            <User size={30} className="text-white" />
          </div>

          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold truncate">
              Movie Explorer
            </h1>
            <p className="text-zinc-500 text-sm mb-2">
              Belum masuk akun — login segera hadir
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
                {isLoading ? (
                  <Loader2 size={11} className="inline animate-spin" />
                ) : (
                  `${favorites.length} Favorite`
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab navigasi */}
      <div className="sticky top-16 z-30 bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-800/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 sm:flex-none min-w-0 flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeTab === key
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800"
                }`}
              >
                <Icon size={14} className="shrink-0" />
                <span className="truncate">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Konten tab */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "favorites" && <FavoriteGrid />}
        {activeTab === "history" && <HistoryGrid />}{" "}
        {activeTab === "watchlist" && <WatchlistGrid />}
      </main>
    </div>
  );
}
