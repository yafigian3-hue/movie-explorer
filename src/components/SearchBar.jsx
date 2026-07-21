"use client";

import useSearch from "../context/useSearch";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ isMobile = false }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const {
    search,
    setSearch,
    setSearchQuery,

    searchResults,
    searchMovies,

    clearSearch,
  } = useSearch();

  const handleClear = () => {
    clearSearch();
    setIsOpen(false);
  };

  return (
    <div className={`relative ${isMobile ? "w-full" : "w-full max-w-xs"}`}>
      <div className="relative flex items-center">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            const value = e.target.value;

            setSearch(value);
            searchMovies(value);

            setIsOpen(value.length > 0);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && search.trim()) {
              setSearchQuery(search);
              setIsOpen(false);

              navigate(`/search?q=${encodeURIComponent(search)}`);
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
            onClick={() => {
              if (!search.trim()) return;

              setSearchQuery(search);
              setIsOpen(false);

              navigate(`/search?q=${encodeURIComponent(search)}`);
            }}
            type="button"
            className="text-zinc-400 hover:text-white transition p-1 bg-zinc-700/50 rounded-md hover:bg-red-600"
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      {isOpen && search.trim().length > 0 && (
        <ul className="absolute z-50 mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-xl">
          {searchResults.length > 0 ? (
            searchResults.map((movie) => (
              <li
                key={movie.id}
                className="px-4 py-2 text-zinc-300 hover:bg-zinc-700 cursor-pointer"
                onClick={() => {
                  setSearch(movie.title);
                  setSearchQuery(movie.title);
                  setIsOpen(false);
                  navigate(`/movie/${movie.id}`);
                }}
              >
                {movie.title}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-zinc-500 italic">
              Film tidak ditemukan...
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
