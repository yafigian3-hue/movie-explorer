import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const token = import.meta.env.VITE_TMDB_TOKEN;

    fetch("https://api.themoviedb.org/3/movie/popular", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const normalizedMovies = (data.results || []).map((movie) => ({
          id: movie.id,
          title: movie.title,
          image: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/300x400",
          rating: movie.vote_average ? movie.vote_average.toFixed(1) : "8.5",
          description: movie.overview || "No description available",
          year: movie.release_date ? movie.release_date.slice(0, 4) : "N/A",
          genre: "Popular Movie",
        }));

        setMovies(normalizedMovies);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        filteredMovies={filteredMovies}
      />

      <div className="min-h-screen bg-zinc-950 p-6 text-white">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="animate-pulse text-zinc-500">
              Memuat film populer...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
