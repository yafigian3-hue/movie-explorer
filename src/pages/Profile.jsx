import { useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import useFavorites from "../hooks/useFavorites";
import useWatchlist from "../hooks/useWatchlist";
import useHistory from "../hooks/useHistory";
import { useAuth } from "../context/AuthContext";
import {
  Heart,
  Clock,
  Bookmark,
  Sparkles,
  Trash2,
  LogIn,
  Clapperboard,
} from "lucide-react";

const TABS = [
  { key: "favorites", label: "Favorite", icon: Heart },
  { key: "history", label: "Riwayat", icon: Clock },
  { key: "watchlist", label: "Watchlist", icon: Bookmark },
];

function UserAvatar({ name, size = 20 }) {
  const initial = name?.charAt(0).toUpperCase() || "?";

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shrink-0 ring-4 ring-zinc-900 shadow-lg shadow-red-600/20"
    >
      <span className="font-bold text-white" style={{ fontSize: size * 0.4 }}>
        {initial}
      </span>
    </div>
  );
}

function GridSkeleton() {
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

function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="py-16 sm:py-24 flex flex-col items-center text-center">
      <div className="mb-5 p-5 bg-zinc-900 border border-zinc-800 rounded-2xl">
        <Icon size={30} className="text-zinc-600" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-zinc-500 text-sm max-w-xs">{description}</p>
    </div>
  );
}

function ComingSoon({ label }) {
  return (
    <EmptyState
      icon={Sparkles}
      title={`${label} Segera Hadir`}
      description={`Fitur ini sedang dalam pengembangan dan akan tersedia setelah backend untuk ${label.toLowerCase()} selesai dibuat.`}
    />
  );
}

function SectionHeader({ title, count, unit }) {
  return (
    <div className="mb-5 sm:mb-6">
      <h2 className="text-lg sm:text-xl font-bold text-white">{title}</h2>
      <p className="text-sm text-zinc-500 mt-0.5">
        {count} {unit}
      </p>
    </div>
  );
}

function FavoriteGrid() {
  const { favorites, isLoading } = useFavorites();

  if (isLoading) return <GridSkeleton />;

  if (favorites.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Belum Ada Favorite"
        description="Klik ikon hati pada film yang kamu suka untuk menyimpannya di sini."
      />
    );
  }

  return (
    <>
      <SectionHeader
        title="Film Favorit"
        count={favorites.length}
        unit="film"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

function WatchlistGrid() {
  const { watchlist, isLoading } = useWatchlist();

  if (isLoading) return <GridSkeleton />;

  if (watchlist.length === 0) {
    return (
      <EmptyState
        icon={Bookmark}
        title="Belum Ada Watchlist"
        description="Tambahkan film ke watchlist agar bisa ditonton nanti."
      />
    );
  }

  return (
    <>
      <SectionHeader title="Watchlist" count={watchlist.length} unit="film" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {watchlist.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

function HistoryGrid() {
  const { history, isLoading, deleteAllHistory } = useHistory();

  const handleDeleteHistory = () => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus semua riwayat?",
    );
    if (!confirmDelete) return;
    deleteAllHistory();
  };

  if (isLoading) return <GridSkeleton />;

  if (history.length === 0) {
    return (
      <EmptyState
        icon={Clock}
        title="Belum Ada Riwayat"
        description="Riwayat film yang pernah kamu tonton akan muncul di sini."
      />
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Riwayat Tontonan
          </h2>
          <p className="text-sm text-zinc-500 mt-0.5">
            {history.length} film telah ditonton
          </p>
        </div>

        <button
          onClick={handleDeleteHistory}
          className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-900 hover:bg-red-600 border border-zinc-800 hover:border-red-600 text-zinc-300 hover:text-white text-sm font-medium transition-all duration-300 active:scale-95"
        >
          <Trash2 size={14} />
          Hapus Semua
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {history.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}

function LoginGate() {
  const { openLogin, openRegister } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center text-center">
      <div className="mb-6 w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/20">
        <Clapperboard className="text-white" size={30} />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
        Masuk untuk melihat profilmu
      </h2>
      <p className="text-zinc-500 text-sm sm:text-base max-w-sm mb-7">
        Simpan film favorit, atur watchlist, dan lihat riwayat tontonanmu dengan
        membuat akun gratis.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => openLogin()}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-red-600/20"
        >
          <LogIn size={16} />
          Masuk
        </button>
        <button
          onClick={openRegister}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-[1.03] active:scale-95"
        >
          Buat Akun
        </button>
      </div>
    </div>
  );
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState("favorites");
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar forceVisible />
        <LoginGate />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar forceVisible />

      {/* Header profil */}
      <div className="relative pt-24 pb-8 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/70 bg-gradient-to-b from-zinc-900/60 to-zinc-950 overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-0 w-72 h-72 bg-red-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto flex items-center gap-4 sm:gap-6">
          <UserAvatar name={user.name} size={72} />

          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold truncate">
              {user.name}
            </h1>
            <p className="text-zinc-500 text-sm truncate">{user.email}</p>
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
        {activeTab === "history" && <HistoryGrid />}
        {activeTab === "watchlist" && <WatchlistGrid />}
      </main>
    </div>
  );
}
