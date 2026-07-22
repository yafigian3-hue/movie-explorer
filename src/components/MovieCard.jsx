"use client";

import { Star, Play } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GENRES } from "../utils/genres";

export default function MovieCard({ movie }) {
  const [isHovered, setIsHovered] = useState(false);

  const imageSrc =
    movie.image || movie.poster_path || "https://via.placeholder.com/300x400";
  const title = movie.title || "Untitled Movie";
  const rating = movie.rating ?? movie.vote_average ?? "8.5";
  const description = movie.description || movie.overview || "";
  const year = movie.year || movie.release_date?.slice(0, 4) || "";
  const genre = movie.genre || "Popular Movie";

  const navigate = useNavigate();

  const genres =
    movie.genre_ids
      ?.slice(0, 2)
      .map((id) => GENRES[id])
      .filter(Boolean)
      .join(", ") || "Unknown";

  return (
    <div
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div
        className="relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-300 hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-600/20 h-full cursor-pointer flex flex-col"
        onClick={() => navigate(`/movie/${movie.id}`)}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-video overflow-hidden bg-zinc-950">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Play Button */}
          {isHovered && (
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors">
                <Play size={24} className="text-white fill-white" />
              </div>
            </button>
          )}

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-red-600 rounded-lg px-2 py-1 flex items-center gap-1">
            <Star size={14} className="text-white fill-white" />
            <span className="text-white text-xs sm:text-sm font-semibold">
              {rating}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
          {/* Title */}
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base line-clamp-2 group-hover:text-red-500 transition-colors">
              {title}
            </h3>

            {/* Genre */}
            {genres && (
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">{genres}</p>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className="text-zinc-500 text-xs sm:text-sm mt-2 line-clamp-2">
              {description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 border-t border-zinc-800">
            {/* Year */}
            {year && (
              <span className="text-zinc-400 text-xs sm:text-sm">{year}</span>
            )}

            {/* Watch Button */}
            <button
              className="text-red-500 hover:text-red-400 text-xs sm:text-sm font-bold transition-all duration-300 hover:gap-2 flex items-center gap-1"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              view
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
