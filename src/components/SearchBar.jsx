"use client";

import useSearch from "../context/useSearch";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { Search, X, Star, Loader2 } from "lucide-react";

export default function SearchBar({ isMobile = false }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  const {
    search,
    setSearch,
    setSearchQuery,
    searchMovies,
    clearSearch,
    searchSuggestions,
    fetchSearchSuggestions,
    isSuggestionLoading,
  } = useSearch();

 useEffect(() => {
   const trimmed = search.trim();

   if (trimmed.length < 2) {
     return;
   }

   const timer = setTimeout(() => {
     fetchSearchSuggestions(trimmed);
   }, 250);

   return () => clearTimeout(timer);
 }, [search, fetchSearchSuggestions]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const submitSearch = () => {
    const trimmed = search.trim();
    if (!trimmed) return;

    setSearchQuery(trimmed);
    searchMovies(trimmed);
    setIsOpen(false);
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleClear = () => {
    clearSearch();
    setIsOpen(false);
  };

  const goToMovie = (movie) => {
    setSearch(movie.title);
    setIsOpen(false);
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      ref={searchRef}
      className={`relative ${isMobile ? "w-full" : "w-full max-w-xs"}`}
    >
      <div className="relative flex items-center">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(e.target.value.trim().length > 0);
          }}
          onFocus={() => {
            if (search.trim()) setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitSearch();
            }
          }}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-2.5 pl-4 pr-20 text-zinc-100 placeholder-zinc-500 outline-none transition 
          focus:border-red-500 focus:ring-2 focus:ring-red-500/30 focus:bg-zinc-900/50
          [&::-webkit-search-cancel-button]:hidden"
          placeholder={isMobile ? "Search..." : "Search movie..."}
        />

        <div className="absolute right-3 flex items-center gap-2">
          {search.length > 0 && (
            <button
              onClick={handleClear}
              type="button"
              className="text-zinc-500 hover:text-red-500 transition p-1"
            >
              <X size={18} />
            </button>
          )}

          <button
            onClick={submitSearch}
            type="button"
            className="text-zinc-400 hover:text-white transition p-1 bg-zinc-700/50 rounded-md hover:bg-red-600"
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      {isOpen && search.trim().length > 0 && (
        <ul className="absolute z-50 mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-xl">
          {isSuggestionLoading ? (
            <li className="px-4 py-3 flex items-center gap-2 text-zinc-400 text-sm">
              <Loader2 size={14} className="animate-spin" />
              Mencari film...
            </li>
          ) : searchSuggestions.length > 0 ? (
            searchSuggestions.map((movie) => (
              <li
                key={movie.id}
                onClick={() => goToMovie(movie)}
                className="px-4 py-2.5 flex items-center justify-between gap-3 text-zinc-300 hover:bg-zinc-700 cursor-pointer transition-colors"
              >
                <span className="truncate">{movie.title}</span>
                <span className="flex items-center gap-2 shrink-0 text-xs text-zinc-500">
                  <span>{movie.year}</span>
                  <span className="flex items-center gap-0.5 text-red-500">
                    <Star size={11} className="fill-red-500" />
                    {movie.rating}
                  </span>
                </span>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-zinc-500 italic text-sm">
              Film tidak ditemukan...
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
