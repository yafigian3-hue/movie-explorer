"use client";

import { Star, Play } from "lucide-react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { GENRES } from "../utils/genres";
import { PLACEHOLDER_IMAGE } from "../utils/placeholder";

function MovieCard({ movie, subtitle = null }) {
  const movieId = movie.movieId ?? movie.id;

  const imageSrc = movie.image || movie.poster_path || PLACEHOLDER_IMAGE;
  const title = movie.title || "Untitled Movie";
  const rating = movie.rating ?? movie.vote_average ?? "N/A";
  const description = movie.description || movie.overview || "";
  const year = movie.year || movie.release_date?.slice(0, 4) || "";

  const navigate = useNavigate();

  const genres =
    (movie.genre_ids || movie.genreIds)
      ?.slice(0, 2)
      .map((id) => GENRES[id])
      .filter(Boolean)
      .join(", ") || "Unknown";

  return (
    <div className="group relative h-full">
      <div
        className="relative rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700 transition-all duration-300 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/20 h-full cursor-pointer flex flex-col"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/movie/${movieId}`);
        }}
      >
        <div className="relative w-full aspect-video overflow-hidden bg-zinc-950">
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
              <Play size={24} className="text-white fill-white" />
            </div>
          </div>

          <div className="absolute top-3 right-3 bg-red-600 rounded-lg px-2 py-1 flex items-center gap-1">
            <Star size={14} className="text-white fill-white" />
            <span className="text-white text-xs sm:text-sm font-semibold">
              {rating}
            </span>
          </div>
        </div>

        <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base line-clamp-2 group-hover:text-red-500 transition-colors">
              {title}
            </h3>
            {genres && (
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">{genres}</p>
            )}
          </div>

          {description && (
            <p className="text-zinc-400 text-xs sm:text-sm mt-2 line-clamp-2">
              {description}
            </p>
          )}

          <div className="flex items-center justify-between gap-2 mt-3 sm:mt-4 pt-3 border-t border-zinc-800">
            <span className="text-zinc-400 text-xs sm:text-sm truncate flex-1">
              {subtitle || year}
            </span>

            <button
              className="shrink-0 text-red-500 hover:text-red-400 text-xs sm:text-sm font-bold transition-all duration-300 hover:gap-2 flex items-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/movie/${movieId}`);  
              }}
            >
              Detail
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(MovieCard);
