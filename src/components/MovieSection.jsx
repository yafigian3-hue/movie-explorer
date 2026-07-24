import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

export default function MovieSection({ title, movies, viewAllLink }) {
  if (!movies || movies.length === 0) return null;

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white sm:text-xl">{title}</h2>

        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="text-sm text-red-500 hover:text-red-400 transition"
          >
            View all
          </Link>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[140px] sm:min-w-[180px] md:min-w-[220px]"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
