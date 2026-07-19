import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
      })
      .catch((err) => {
        setError("Film tidak di temukan");
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (isLoading)
    return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!movie) return null;

  return (
    <div className="min-h-screen bg-zinc-950 p-6 text-white">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-auto rounded-xl my-4"
      />
      <p className="text-zinc-300">{movie.overview}</p>
      <div className="mt-4">
        <p>Durasi: {movie.runtime} menit</p>
        <p>Rating: {movie.vote_average}</p>
      </div>
    </div>
  );
}
