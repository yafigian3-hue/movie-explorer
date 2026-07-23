import {
  Play,
  Info,
  ChevronLeft,
  ChevronRight,
  Star,
  X,
  Loader2,
} from "lucide-react";
import { useState, useEffect, useRef, useMemo, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const AUTOPLAY_MS = 6000;

export default function HeroBanner({
  movie = null,
  movies = [],
  movieTrailer = null,
  limit = 5,
  showProgress = true,
  variant = "default",
  isPlayingTrailer = false,
  setIsPlayingTrailer,
}) {
  const navigate = useNavigate();

  const heroMovies = useMemo(() => {
    if (movie) return [movie];
    return movies.slice(0, limit);
  }, [movie, movies, limit]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [entered, setEntered] = useState(false);
  const [trailerEntered, setTrailerEntered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const autoPlayRef = useRef(null);
  const rafRef = useRef(null);
  const trailerRafRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(0);
  }, [heroMovies.length]);

  const currentMovie = heroMovies[currentIndex];

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

  useLayoutEffect(() => {
    setTrailerEntered(false);
    if (!isPlayingTrailer) setVideoReady(false);
  }, [isPlayingTrailer]);

  useEffect(() => {
    if (trailerEntered) return;
    trailerRafRef.current = requestAnimationFrame(() =>
      setTrailerEntered(true),
    );
    return () => cancelAnimationFrame(trailerRafRef.current);
  }, [trailerEntered]);

  const goTo = (index) => {
    setAutoPlay(false);
    setCurrentIndex(index);
  };

  const nextMovie = () =>
    goTo(currentIndex === heroMovies.length - 1 ? 0 : currentIndex + 1);

  const prevMovie = () =>
    goTo(currentIndex === 0 ? heroMovies.length - 1 : currentIndex - 1);

  useEffect(() => {
    if (!autoPlay || heroMovies.length <= 1 || isPlayingTrailer) return;
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === heroMovies.length - 1 ? 0 : prev + 1,
      );
    }, AUTOPLAY_MS);
    return () => clearInterval(autoPlayRef.current);
  }, [autoPlay, heroMovies.length, isPlayingTrailer]);

  if (!currentMovie) return null;

  const isCompact = variant === "search";
  const isDetail = variant === "detail";
  const showSlider = !isDetail && heroMovies.length > 1;
  const showingTrailer = isPlayingTrailer && Boolean(movieTrailer);

  const heightClass = isDetail
    ? "h-[42vh] sm:h-[52vh] lg:h-[62vh]"
    : isCompact
      ? "h-[65vh] sm:h-[75vh] lg:h-[85vh]"
      : "h-screen"; 

  return (
    <section
      className={`relative ${heightClass} w-full overflow-hidden bg-zinc-950 group/hero`}
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <style>{`
        @keyframes heroKenBurns { from { transform: scale(1); } to { transform: scale(1.1); } }
        @keyframes heroProgress { from { width: 0%; } to { width: 100%; } }
      `}</style>

      <div
        key={currentMovie.id ?? currentIndex}
        className="absolute inset-0 transition-opacity duration-500 ease-out"
        style={{ opacity: showingTrailer ? 0 : entered ? 1 : 0 }}
      >
        {currentMovie.backdrop_path ? (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
              alt={currentMovie.title}
              className="h-full w-full object-cover"
              style={{
                animation: `heroKenBurns ${AUTOPLAY_MS * 1.6}ms ease-out forwards`,
              }}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent ${
                isDetail ? "via-zinc-950/70" : "via-zinc-950/50"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/10 to-transparent" />
          </>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-zinc-800 to-zinc-950" />
        )}
      </div>

      {showingTrailer && (
        <div
          className="absolute inset-0 bg-black transition-opacity duration-500 ease-out"
          style={{ opacity: trailerEntered ? 1 : 0 }}
        >
          {!videoReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 size={28} className="text-white/70 animate-spin" />
            </div>
          )}

          <iframe
            key={movieTrailer.key}
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${movieTrailer.key}?autoplay=1&controls=1&rel=0`}
            title={movieTrailer.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setVideoReady(true)}
          />

          <button
            onClick={() => setIsPlayingTrailer?.(false)}
            aria-label="Tutup Trailer"
            className="absolute top-5 left-5 sm:top-6 sm:left-6 z-50 bg-black/70 backdrop-blur-md hover:bg-red-600 active:scale-95 transition-all rounded-full p-3"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {showSlider && !isPlayingTrailer && (
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

      {!isDetail && (
        <div
          className={`relative z-10 flex h-full flex-col justify-end px-5 sm:px-10 lg:px-16 ${
            isCompact ? "pb-10 sm:pb-10" : "pb-16 sm:pb-14"
          }`}
        >
          <div
            className="max-w-xl lg:max-w-2xl transition-all duration-500 ease-out"
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div className="mb-3 sm:mb-4 flex flex-wrap items-center gap-2.5">
              {currentMovie.vote_average > 0 && (
                <div className="flex items-center gap-1 bg-red-600 px-2.5 py-1 rounded-full">
                  <Star size={12} className="fill-white text-white" />
                  <span className="text-white text-xs font-bold">
                    {currentMovie.vote_average.toFixed(1)}
                  </span>
                </div>
              )}
              {currentMovie.release_date && (
                <span className="text-zinc-300 text-xs font-medium bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                  {new Date(currentMovie.release_date).getFullYear()}
                </span>
              )}
            </div>

            <h1
              className={`font-bold text-white mb-3 leading-[1.1] tracking-tight drop-shadow-lg ${
                isCompact
                  ? "text-2xl sm:text-3xl lg:text-5xl"
                  : "text-3xl sm:text-4xl lg:text-6xl"
              }`}
            >
              {currentMovie.title}
            </h1>

            {!isCompact && (
              <p className="hidden sm:block line-clamp-2 lg:line-clamp-3 text-zinc-300 text-sm lg:text-base mb-6 max-w-xl">
                {currentMovie.overview}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate(`/movie/${currentMovie.id}`)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-2.5 sm:px-7 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-red-600/20"
              >
                <Play size={17} className="fill-white" /> Tonton
              </button>
              <button
                onClick={() => navigate(`/movie/${currentMovie.id}`)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-white px-6 py-2.5 sm:px-7 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all hover:scale-[1.03] active:scale-95"
              >
                <Info size={17} /> Info
              </button>
            </div>
          </div>

          {showSlider && (
            <div className="mt-6 sm:mt-8 flex gap-2">
              {heroMovies.map((m, index) => (
                <button
                  key={m.id ?? index}
                  onClick={() => goTo(index)}
                  aria-label={`Ke slide ${index + 1}`}
                  className={`h-1.5 rounded-full bg-white/20 overflow-hidden transition-all duration-300 ${
                    index === currentIndex ? "w-8 sm:w-10" : "w-3"
                  }`}
                >
                  {index === currentIndex && showProgress && (
                    <div
                      key={`${currentMovie.id}-${autoPlay}`}
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
                  {index === currentIndex && !showProgress && (
                    <div className="h-full w-full bg-red-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
