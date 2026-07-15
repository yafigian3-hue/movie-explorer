"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({
  isMobile = false,
  search,
  setSearch,
  filteredMovies,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClear = () => {
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div className={`relative ${isMobile ? "w-full" : "w-full max-w-xs"}`}>
      <div className="relative flex items-center">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-2.5 pl-4 pr-10 text-zinc-100 placeholder-zinc-500 outline-none transition 
          focus:border-red-500 focus:ring-2 focus:ring-red-500/30 focus:bg-zinc-900/50
          [&::-webkit-search-cancel-button]:hidden"
          placeholder={isMobile ? "Search..." : "Search movie..."}
        />

        <div className="absolute right-3 flex items-center">
          {search.length > 0 ? (
            <button
              onClick={handleClear}
              type="button"
              className="text-zinc-500 hover:text-zinc-300 transition p-1"
            >
              <X size={18} />
            </button>
          ) : (
            <Search size={18} className="text-zinc-500" />
          )}
        </div>
      </div>

      {isOpen && search.trim().length > 0 && (
        <ul className="absolute z-50 mt-2 w-full bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-xl">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <li
                key={movie.id}
                className="px-4 py-2 text-zinc-300 hover:bg-zinc-700 cursor-pointer"
                onClick={() => {
                  setSearch(movie.title);
                  setIsOpen(false);
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
