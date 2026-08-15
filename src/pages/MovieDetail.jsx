"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Clock,
  Calendar,
  ArrowLeft,
  Play,
  Clapperboard,
  Heart,
  Bookmark,
} from "lucide-react";
import useFavorites from "../hooks/useFavorites";
import useWatchlist from "../hooks/useWatchlist";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import useHistory from "../hooks/useHistory";
import WatchProviders from "../components/WatchProviders";
import useSearch from "../context/useSearch";
import MovieSection from "../components/MovieSection";
import CastList from "../components/CastList";
import { useAuth } from "../context/AuthContext";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addHistory } = useHistory();
  const { token, openLogin } = useAuth();

  const { addFavorite, removeFavorite, isFavorite, isSaving } = useFavorites();

  const {
    addWatchlist,
    removeWatchlist,
    isInWatchlist,
    isSaving: isSavingWatchlist,
  } = useWatchlist();

  const {
    movieDetail,
    fetchMovieDetail,
    similarMovies,
    fetchSimilarMovies,
    movieTrailer,
    fetchMovieTrailer,
    cast,
    fetchMovieCast,
    watchProviders,
    fetchWatchProviders,
    isLoading,
    error,
  } = useSearch();

  useEffect(() => {
    fetchMovieDetail(id);
    fetchSimilarMovies(id);
    fetchMovieTrailer(id);
    fetchMovieCast(id);
    fetchWatchProviders(id);
  }, [
    id,
    fetchMovieDetail,
    fetchSimilarMovies,
    fetchMovieTrailer,
    fetchMovieCast,
    fetchWatchProviders,
  ]);

  const movie = movieDetail;
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [showWatchModal, setShowWatchModal] = useState(false);

  useEffect(() => {
    setIsPlayingTrailer(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-zinc-700 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-400 text-lg">Memuat...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Navbar />
        <div className="pt-20 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <p className="text-red-500 text-lg font-semibold mb-4">{error}</p>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full transition-all hover:scale-[1.03] active:scale-95"
            >
              <ArrowLeft size={20} />
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Navbar />
      </div>
    );
  }
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const hasTrailer = Boolean(movieTrailer?.key);

  const favorited = movie ? isFavorite(movie.id) : false;

  const watchlisted = movie ? isInWatchlist(movie.id) : false;

  const handleFavoriteClick = () => {
    if (!token) {
      openLogin("Silakan login dulu untuk menambahkan film ke Favorite.");
      return;
    }

    if (favorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite({
        id: movie.id,
        title: movie.title,
        image: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        rating: movie.vote_average
          ? Number(movie.vote_average.toFixed(1))
          : null,
        year: releaseYear,
        genre_ids: movie.genres?.map((genre) => genre.id) ?? [],
      });
    }
  };

  const handleWatchlistClick = () => {
    if (!token) {
      openLogin("Silakan login dulu untuk menambahkan film ke Watchlist.");
      return;
    }

    if (watchlisted) {
      removeWatchlist(movie.id);
    } else {
      addWatchlist({
        id: movie.id,
        title: movie.title,
        image: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        rating: movie.vote_average
          ? Number(movie.vote_average.toFixed(1))
          : null,
        year: releaseYear,
        genre_ids: movie.genres?.map((genre) => genre.id) ?? [],
      });
    }
  };

  const saveToHistory = async () => {
    await addHistory({
      id: movie.id,
      title: movie.title,
      image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      rating: movie.vote_average ? Number(movie.vote_average.toFixed(1)) : null,
      year: releaseYear,
      genreIds: movie.genres?.map((g) => g.id) ?? [],
    });
  };

  const handleWatchMovie = async () => {
    await saveToHistory();
    setShowWatchModal(true);
  };

  const handlePlayTrailer = async () => {
    if (!hasTrailer) return;

    await saveToHistory();
    setIsPlayingTrailer(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <HeroBanner
        movie={movie}
        movieTrailer={movieTrailer}
        variant="detail"
        showProgress={false}
        isPlayingTrailer={isPlayingTrailer}
        setIsPlayingTrailer={setIsPlayingTrailer}
      />

      <div className="relative z-10 -mt-12 sm:-mt-20 lg:-mt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 leading-tight drop-shadow-lg text-balance">
              {movie.title}
            </h1>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2 sm:gap-3">
                <button
                  onClick={handleWatchMovie}
                  className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 sm:px-6 h-11 sm:h-[52px] rounded-full font-semibold text-sm sm:text-base transition-all active:scale-95 lg:hover:scale-[1.03] shadow-lg shadow-red-600/20"
                >
                  <Play size={17} className="fill-white shrink-0" />
                  <span className="truncate">Tonton</span>
                </button>

                <button
                  onClick={handlePlayTrailer}
                  disabled={!hasTrailer}
                  title={
                    hasTrailer ? "Putar trailer" : "Trailer tidak tersedia"
                  }
                  aria-label="Putar trailer"
                  className={`shrink-0 flex items-center justify-center w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-full border transition-all duration-300 active:scale-90 ${
                    hasTrailer
                      ? "bg-white/10 hover:bg-white/20 border-white/15 backdrop-blur-md lg:hover:scale-[1.03]"
                      : "bg-white/5 border-white/10 text-zinc-500 cursor-not-allowed"
                  }`}
                >
                  <Clapperboard size={18} />
                </button>

                <button
                  onClick={handleFavoriteClick}
                  disabled={isSaving}
                  title={
                    favorited ? "Hapus dari favorite" : "Tambah ke favorite"
                  }
                  aria-label={
                    favorited ? "Hapus dari favorite" : "Tambah ke favorite"
                  }
                  className={`group shrink-0 relative flex items-center justify-center w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-full border transition-all duration-300 active:scale-90 overflow-hidden ${
                    isSaving ? "opacity-60 cursor-not-allowed" : ""
                  } ${
                    favorited
                      ? "bg-red-600 border-red-600 shadow-lg shadow-red-600/30"
                      : "bg-white/10 hover:bg-white/20 border-white/15 backdrop-blur-md lg:hover:scale-[1.03]"
                  }`}
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {favorited && (
                        <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20" />
                      )}
                      <Heart
                        size={18}
                        className={`relative transition-transform duration-300 ${
                          favorited ? "fill-white scale-110" : ""
                        }`}
                      />
                    </>
                  )}
                </button>

                <button
                  onClick={handleWatchlistClick}
                  disabled={isSavingWatchlist}
                  title={
                    watchlisted ? "Hapus dari watchlist" : "Tambah ke watchlist"
                  }
                  className={`shrink-0 flex items-center justify-center w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-full border transition-all duration-300 active:scale-90 ${
                    watchlisted
                      ? "bg-red-600 border-red-600 shadow-lg shadow-red-600/30"
                      : "bg-white/10 hover:bg-white/20 border-white/15 text-zinc-300"
                  } ${isSavingWatchlist ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {isSavingWatchlist ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Bookmark
                      size={18}
                      className={watchlisted ? "fill-white" : ""}
                    />
                  )}
                </button>
              </div>

              <div className="hidden lg:flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-red-600/20 px-4 py-2 rounded-full border border-red-600/30">
                  <Star size={18} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-base">{rating}/10</span>
                </div>

                {releaseYear && (
                  <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-700/50">
                    <Calendar size={18} className="text-zinc-400" />
                    <span className="text-base text-zinc-300">
                      {releaseYear}
                    </span>
                  </div>
                )}

                {movie.runtime > 0 && (
                  <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-700/50">
                    <Clock size={18} className="text-zinc-400" />
                    <span className="text-base text-zinc-300">
                      {movie.runtime} min
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              {movie.genres?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                    Genre
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-full text-sm transition-colors"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                  Sinopsis
                </h3>
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed text-balance">
                  {movie.overview}
                </p>
              </div>

              <CastList cast={cast} />

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {movie.budget > 0 && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                      Budget
                    </p>
                    <p className="text-lg sm:text-xl font-semibold">
                      ${(movie.budget / 1_000_000).toFixed(1)}M
                    </p>
                  </div>
                )}

                {movie.revenue > 0 && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                      Revenue
                    </p>
                    <p className="text-lg sm:text-xl font-semibold">
                      ${(movie.revenue / 1_000_000).toFixed(1)}M
                    </p>
                  </div>
                )}

                {movie.production_companies?.length > 0 && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                      Produksi
                    </p>
                    <p className="text-sm sm:text-base font-medium">
                      {movie.production_companies[0].name}
                    </p>
                  </div>
                )}

                {movie.spoken_languages?.length > 0 && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                      Bahasa
                    </p>
                    <p className="text-sm sm:text-base font-medium">
                      {movie.spoken_languages[0].english_name}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              {movie.poster_path && (
                <div className="sticky top-20">
                  <img
                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full rounded-xl shadow-2xl border border-zinc-800"
                  />

                  <button
                    onClick={handleWatchMovie}
                    className="w-full mt-4 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-full transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
                  >
                    <Play size={20} fill="white" />
                    Tonton Sekarang
                  </button>

                  <div className="flex gap-2.5 mt-2.5">
                    <button
                      onClick={handleFavoriteClick}
                      disabled={isSaving}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full font-medium text-sm transition-all duration-300 active:scale-95 border ${
                        favorited
                          ? "bg-red-600/15 border-red-600/40 text-red-400 hover:bg-red-600/25"
                          : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                      }`}
                    >
                      {isSaving ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Heart
                          size={15}
                          className={favorited ? "fill-current" : ""}
                        />
                      )}
                      Favorit
                    </button>

                    <button
                      onClick={handleWatchlistClick}
                      disabled={isSavingWatchlist}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full font-medium text-sm transition-all duration-300 active:scale-95 border ${
                        watchlisted
                          ? "bg-red-600/15 border-red-600/40 text-red-400 hover:bg-red-600/25"
                          : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                      }`}
                    >
                      {isSavingWatchlist ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Bookmark
                          size={15}
                          className={watchlisted ? "fill-current" : ""}
                        />
                      )}

                      {watchlisted ? "Tersimpan" : "Watchlist"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showWatchModal && (
        <WatchProviders
          data={watchProviders}
          movieTitle={movie.title}
          onClose={() => setShowWatchModal(false)}
        />
      )}
      <MovieSection title="Film Serupa" movies={similarMovies} />
    </div>
  );
}
