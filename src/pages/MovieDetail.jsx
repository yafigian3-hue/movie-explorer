"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Clock, Calendar, ArrowLeft, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useSearch from "../context/useSearch";

export default function MovieDetail() {
 
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { clearSearch } = useSearch();

  const fetchMovie = () => {
    setIsLoading(true); 
    setError("");

    const token = import.meta.env.VITE_TMDB_TOKEN;

    fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Gagal mengambil data");
        return response.json();
      })
      .then((data) => {
        setMovie(data);
        console.log(data);
      })
      .catch((err) => {
        setError("Film tidak ditemukan");
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />
        <div className="pt-20 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-zinc-700 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-400 text-lg">Loading...</p>
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
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

  const releaseYear = new Date(movie.release_date).getFullYear();
  const rating = movie.vote_average.toFixed(1);

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      <Navbar />
      <div className="relative h-96 sm:h-[500px] lg:h-screen w-full overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950"></div>

        <button
          onClick={() => {
            clearSearch();
            navigate(-1);
          }}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 p-2 bg-zinc-900/80 hover:bg-zinc-800 rounded-lg transition-colors z-10 backdrop-blur-sm"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
          <button className="p-4 bg-red-600 hover:bg-red-700 rounded-full transition-colors transform scale-75 sm:scale-100">
            <Play size={32} fill="white" className="ml-1" />
          </button>
        </div>
      </div>

      <div className="relative -mt-24 sm:-mt-32 lg:-mt-40 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">

          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              {movie.title}
            </h1>

            <div className="flex flex-wrap gap-3 sm:gap-4 items-center">

              <div className="flex items-center gap-2 bg-red-600/20 px-3 sm:px-4 py-2 rounded-lg border border-red-600/30">
                <Star size={18} className="text-yellow-400 fill-yellow-400" />
                <span className="font-semibold text-sm sm:text-base">
                  {rating}/10
                </span>
              </div>

              <div className="flex items-center gap-2 bg-zinc-800/40 px-3 sm:px-4 py-2 rounded-lg border border-zinc-700/30">
                <Calendar size={18} className="text-zinc-400" />
                <span className="text-sm sm:text-base text-zinc-300">
                  {releaseYear}
                </span>
              </div>

              {movie.runtime && (
                <div className="flex items-center gap-2 bg-zinc-800/40 px-3 sm:px-4 py-2 rounded-lg border border-zinc-700/30">
                  <Clock size={18} className="text-zinc-400" />
                  <span className="text-sm sm:text-base text-zinc-300">
                    {movie.runtime} min
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            <div className="lg:col-span-2">

              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-full text-sm transition-colors"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                  Synopsis
                </h3>
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed text-balance">
                  {movie.overview}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {movie.budget > 0 && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                      Budget
                    </p>
                    <p className="text-lg sm:text-xl font-semibold">
                      ${(movie.budget / 1000000).toFixed(1)}M
                    </p>
                  </div>
                )}

                {movie.revenue > 0 && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                      Revenue
                    </p>
                    <p className="text-lg sm:text-xl font-semibold">
                      ${(movie.revenue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                )}

                {movie.production_companies &&
                  movie.production_companies.length > 0 && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                        Production
                      </p>
                      <p className="text-sm sm:text-base font-medium">
                        {movie.production_companies[0].name}
                      </p>
                    </div>
                  )}

                {movie.spoken_languages &&
                  movie.spoken_languages.length > 0 && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                        Language
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
                  <button className="w-full mt-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Play size={20} fill="white" />
                    Watch Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
