import { PLACEHOLDER_IMAGE } from "../utils/placeholder";

const BASE_URL = "https://api.themoviedb.org/3";

function getToken() {
  return import.meta.env.VITE_TMDB_TOKEN;
}

/**
 * Wrapper fetch ke TMDB.
 * @param {string} endpoint
 * @param {object} options
 */
export async function fetchTMDB(endpoint, options = {}) {
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}

export function normalizeMovie(movie) {
  return {
    ...movie,
    image: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : PLACEHOLDER_IMAGE,
    rating: movie.vote_average?.toFixed(1) ?? "N/A",
    year: movie.release_date?.slice(0, 4) || "N/A",
  };
}
