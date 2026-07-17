"use client";

import { useState } from "react";
import { Menu, X, Bell, User, Clapperboard } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Navigation({
  search,
  setSearch,
  setSearchQuery,
  searchSuggestions,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800 backdrop-blur-sm">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Clapperboard className="text-white" size={18} />
            </div>

            <h1 className="hidden sm:block text-lg sm:text-xl font-bold text-white whitespace-nowrap">
              Movie<span className="text-red-600">Explorer</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 ml-8">
            <a
              href="#"
              className="text-white hover:text-red-500 transition-colors text-sm"
            >
              Home
            </a>
            <a
              href="#"
              className="text-zinc-400 hover:text-red-500 transition-colors text-sm"
            >
              Movies
            </a>
            <a
              href="#"
              className="text-zinc-400 hover:text-red-500 transition-colors text-sm"
            >
              Categories
            </a>
          </div>

          {/* Search Bar - Responsive */}
          <div className="flex-1 max-w-xs mx-2 sm:mx-4">
            <SearchBar
              isMobile={true}
              search={search}
              setSearch={setSearch}
              setSearchQuery={setSearchQuery}
              searchSuggestions={searchSuggestions}
            />
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors hidden sm:block">
              <Bell size={18} className="text-white" />
            </button>
            <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors hidden sm:block">
              <User size={18} className="text-white" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-zinc-800 rounded-lg transition-colors flex-shrink-0"
            >
              {isOpen ? (
                <X size={20} className="text-white" />
              ) : (
                <Menu size={20} className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2 border-t border-zinc-800 mt-2 pt-4">
            <div className="px-2 pb-3">
              <SearchBar isMobile={true} />
            </div>
            <a
              href="#"
              className="block px-4 py-2 text-white hover:bg-red-600/10 hover:text-red-500 rounded-lg transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-zinc-400 hover:bg-red-600/10 hover:text-red-500 rounded-lg transition-colors"
            >
              Movies
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-zinc-400 hover:bg-red-600/10 hover:text-red-500 rounded-lg transition-colors"
            >
              Categories
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
