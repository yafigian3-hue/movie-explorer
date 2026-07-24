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
} from "lucide-react";
import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import useSearch from "../context/useSearch";
import MovieSection from "../components/MovieSection";
import CastList from "../components/CastList";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    movieDetail,
    fetchMovieDetail,
    similarMovies,
    fetchSimilarMovies,
    movieTrailer,
    fetchMovieTrailer,
    cast,
    fetchMovieCast,
    isLoading,
    error,
  } = useSearch();

  useEffect(() => {
    fetchMovieDetail(id);
    fetchSimilarMovies(id);
    fetchMovieTrailer(id);
    fetchMovieCast(id);
  }, [
    id,
    fetchMovieDetail,
    fetchSimilarMovies,
    fetchMovieTrailer,
    fetchMovieCast,
  ]);

  const movie = movieDetail;
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

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

  if (!movie) return null;

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const hasTrailer = Boolean(movieTrailer?.key);

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
              <div className="flex gap-3">
                <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 sm:px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all active:scale-95 lg:hover:scale-[1.03] shadow-lg shadow-red-600/20">
                  <Play size={18} className="fill-white" />
                  Tonton
                </button>

                <button
                  onClick={() => hasTrailer && setIsPlayingTrailer(true)}
                  disabled={!hasTrailer}
                  title={
                    hasTrailer ? "Putar trailer" : "Trailer tidak tersedia"
                  }
                  className={`flex-1 lg:flex-none flex items-center justify-center gap-2 border text-white px-5 sm:px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all active:scale-95 ${
                    hasTrailer
                      ? "bg-white/10 hover:bg-white/20 border-white/15 backdrop-blur-md lg:hover:scale-[1.03]"
                      : "bg-white/5 border-white/10 text-zinc-500 cursor-not-allowed"
                  }`}
                >
                  <Clapperboard size={18} />
                  Trailer
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
                    className="w-full rounded-xl shadow-2xl border border-zinc-800"
                  />
                  <button className="w-full mt-4 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-full transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-red-600/20">
                    <Play size={20} fill="white" />
                    Tonton Sekarang
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <MovieSection title="Film Serupa" movies={similarMovies} />
    </div>
  );
}
