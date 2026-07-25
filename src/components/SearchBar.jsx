"use client";

import useSearch from "../context/useSearch";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ isMobile = false }) {
  const navigate = useNavigate();

  const { search, setSearch, setSearchQuery, searchMovies, clearSearch } =
    useSearch();

  const submitSearch = () => {
    const trimmed = search.trim();
    if (!trimmed) return;

    setSearchQuery(trimmed);
    searchMovies(trimmed); // mulai fetch SEKARANG, tidak menunggu chunk halaman
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleClear = () => {
    clearSearch();
  };

  return (
    <div className={`relative ${isMobile ? "w-full" : "w-full max-w-xs"}`}>
      <div className="relative flex items-center">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
    </div>
  );
}
