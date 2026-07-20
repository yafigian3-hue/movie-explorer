import { Play, Info, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState, useEffect, useRef, useMemo, useLayoutEffect } from "react";

const AUTOPLAY_MS = 6000;

export default function HeroBanner({ movies = [], limit = 5 }) {
  const heroMovies = useMemo(() => movies.slice(0, limit), [movies, limit]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [entered, setEntered] = useState(false);
  const autoPlayRef = useRef(null);
  const rafRef = useRef(null);

  const movie = heroMovies[currentIndex];

 
  useEffect(() => {
    heroMovies.forEach((m) => {
      if (m?.backdrop_path) {
        const img = new Image();
        img.src = `https://image.tmdb.org/t/p/original${m.backdrop_path}`;
      }
    });
  }, [heroMovies]);

  useLayoutEffect(() => {
    setEntered(false);
  }, [currentIndex]);

  useEffect(() => {
    if (entered) return;
    rafRef.current = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(rafRef.current);
  }, [entered]);

  const goTo = (index) => {
    setAutoPlay(false);
    setCurrentIndex(index);
  };

  const nextMovie = () =>
    goTo(currentIndex === heroMovies.length - 1 ? 0 : currentIndex + 1);

  const prevMovie = () =>
    goTo(currentIndex === 0 ? heroMovies.length - 1 : currentIndex - 1);

  useEffect(() => {
    if (!autoPlay || heroMovies.length <= 1) return;
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === heroMovies.length - 1 ? 0 : prev + 1,
      );
    }, AUTOPLAY_MS);
    return () => clearInterval(autoPlayRef.current);
  }, [autoPlay, heroMovies.length]);

  if (!movie) return null;

  return (
    <section
      className="relative h-[65vh] sm:h-[75vh] lg:h-[85vh] w-full overflow-hidden bg-zinc-950 group/hero"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <style>{`
        @keyframes heroKenBurns {
          from { transform: scale(1); }
          to   { transform: scale(1.1); }
        }
        @keyframes heroProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>

      <div
        key={movie.id ?? currentIndex}
        className="absolute inset-0 transition-opacity duration-500 ease-out"
        style={{ opacity: entered ? 1 : 0 }}
      >
        {movie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="h-full w-full object-cover"
            style={{
              animation: `heroKenBurns ${AUTOPLAY_MS * 1.6}ms ease-out forwards`,
            }}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-zinc-800 to-zinc-950" />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/10 to-transparent" />

      {heroMovies.length > 1 && (
        <>
          <button
            onClick={prevMovie}
            aria-label="Film sebelumnya"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 bg-black/30 backdrop-blur-md hover:bg-red-600 text-white p-2.5 sm:p-3 rounded-full opacity-60 sm:opacity-0 sm:group-hover/hero:opacity-100 transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMovie}
            aria-label="Film berikutnya"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 bg-black/30 backdrop-blur-md hover:bg-red-600 text-white p-2.5 sm:p-3 rounded-full opacity-60 sm:opacity-0 sm:group-hover/hero:opacity-100 transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <div className="relative z-10 flex h-full flex-col justify-end px-5 sm:px-10 lg:px-16 pb-16 sm:pb-14">
        <div
          className="max-w-xl lg:max-w-2xl transition-all duration-500 ease-out"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <div className="mb-4 flex flex-wrap items-center gap-2.5">
            {movie.vote_average > 0 && (
              <div className="flex items-center gap-1 bg-red-600 px-2.5 py-1 rounded-full">
                <Star size={12} className="fill-white text-white" />
                <span className="text-white text-xs font-bold">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            )}
            {movie.release_date && (
              <span className="text-zinc-300 text-xs font-medium bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                {new Date(movie.release_date).getFullYear()}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-3 leading-[1.1] tracking-tight drop-shadow-lg">
            {movie.title}
          </h1>

          <p className="hidden sm:line-clamp-2 lg:line-clamp-3 text-zinc-300 text-sm lg:text-base mb-6 max-w-xl sm:block">
            {movie.overview}
          </p>

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-2.5 sm:px-7 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-red-600/20">
              <Play size={17} className="fill-white" /> Tonton
            </button>
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white px-6 py-2.5 sm:px-7 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all hover:scale-[1.03] active:scale-95">
              <Info size={17} /> Info
            </button>
          </div>
        </div>

        {heroMovies.length > 1 && (
          <div className="mt-8 flex gap-2">
            {heroMovies.map((m, index) => (
              <button
                key={m.id ?? index}
                onClick={() => goTo(index)}
                aria-label={`Ke slide ${index + 1}`}
                className="h-1.5 w-8 sm:w-10 rounded-full bg-white/20 overflow-hidden"
              >
                {index === currentIndex && (
                  <div
                    key={`${movie.id}-${autoPlay}`}
                    className="h-full bg-red-600 rounded-full"
                    style={
                      autoPlay
                        ? {
                            animation: `heroProgress ${AUTOPLAY_MS}ms linear forwards`,
                          }
                        : { width: "100%" }
                    }
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
