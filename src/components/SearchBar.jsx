"use client";

import useSearch from "../context/useSearch";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { Search, SearchCheck, Star, X } from "lucide-react";

export default function SearchBar({ isMobile = false }) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  const {
    search,
    setSearch,
    setSearchQuery,

    searchMovies,
    searchSuggestions,
    fetchSearchSuggestions,
    isSuggestionLoading,

    clearSearch,
  } = useSearch();

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

  useEffect(() => {
    const trimmed = search.trim();

    if (!trimmed) return;

    const timer = setTimeout(() => {
      fetchSearchSuggestions(trimmed);
    }, 250);

    return () => clearTimeout(timer);
  }, [search, fetchSearchSuggestions]);

  useEffect(() => {
    setIsOpen(search.trim() !== "");
  }, [searchSuggestions, search]);

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

  return (
    <div
      ref={searchRef}
      className={`relative ${isMobile ? "w-full" : "w-full max-w-xs"}`}
    >
      {" "}
      <div className="relative flex items-center">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            const value = e.target.value;

            setSearch(value);

            if (!value.trim()) {
              setIsOpen(false);
            }
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
        <ul className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
          {isSuggestionLoading ? (
            <li className="flex items-center gap-2 px-4 py-3 text-sm text-zinc-400">
              <SearchCheck size={16} className="animate-pulse text-red-500" />
              <span>Mencari film...</span>
            </li>
          ) : searchSuggestions.length > 0 ? (
            searchSuggestions.map((movie) => (
              <li
                key={movie.id}
                onClick={() => {
                  setSearch(movie.title);
                  setSearchQuery(movie.title);
                  setIsOpen(false);
                  navigate(`/movie/${movie.id}`);
                }}
                className="flex items-center justify-between gap-3 cursor-pointer border-b border-zinc-800 px-4 py-3 transition-colors hover:bg-zinc-800 last:border-b-0"
              >
                <div className="flex-1 overflow-hidden">
                  <p className="truncate font-medium text-white">
                    {movie.title}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">{movie.year}</p>
                </div>

                <div className="flex items-center gap-1 rounded-lg bg-red-600 px-2 py-1">
                  <Star size={13} className="fill-white text-white" />
                  <span className="text-xs font-semibold text-white">
                    {movie.rating}
                  </span>
                </div>
              </li>
            ))
          ) : (
            <li className="flex flex-col items-center gap-2 px-4 py-6 text-zinc-500">
              <Search size={20} />
              <span className="text-sm">Film tidak ditemukan</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
