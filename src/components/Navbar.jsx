"use client";

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Bell, Clapperboard } from "lucide-react";
import SearchBar from "./SearchBar";
import useSearch from "../context/useSearch";

const REVEAL_THRESHOLD = 80;

const navLinkClass = ({ isActive }) =>
  `relative pb-1 text-sm font-medium whitespace-nowrap transition-colors ${
    isActive
      ? "text-white font-semibold after:absolute after:left-0 after:-bottom-[1px] after:h-[2px] after:w-full after:bg-red-600 after:rounded-full"
      : "text-zinc-400 hover:text-white"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? "bg-red-600 text-white"
      : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
  }`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { clearSearch } = useSearch();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > REVEAL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visible = scrolled || isOpen;

  const closeAll = () => {
    clearSearch();
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out ${
        visible
          ? "translate-y-0 opacity-100 bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-800/70"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center h-16 gap-3 sm:gap-4">
          <NavLink
            to="/"
            onClick={clearSearch}
            className="flex items-center gap-2 shrink-0 justify-self-start"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-red-600 rounded-lg flex items-center justify-center transition-transform hover:scale-105">
              <Clapperboard className="text-white" size={18} />
            </div>
            <h1 className="hidden sm:block text-lg sm:text-xl font-bold text-white whitespace-nowrap">
              Movie<span className="text-red-600">Explorer</span>
            </h1>
          </NavLink>

          <div className="hidden lg:flex items-center gap-8 justify-self-center">
            <NavLink to="/" onClick={clearSearch} className={navLinkClass}>
              Home
            </NavLink>
            <NavLink
              to="/movies"
              onClick={clearSearch}
              className={navLinkClass}
            >
              Movies
            </NavLink>
            <NavLink
              to="/profile"
              onClick={clearSearch}
              className={navLinkClass}
            >
              Profile
            </NavLink>
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-3 justify-self-end">
            <div className="w-full min-w-0 max-w-[160px] xs:max-w-[200px] sm:max-w-xs lg:w-56 xl:w-64">
              <SearchBar isMobile={true} />
            </div>

            <button
              type="button"
              aria-label="Notifikasi"
              className="hidden lg:flex p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/70 transition-colors shrink-0"
            >
              <Bell size={18} />
            </button>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isOpen}
              className="lg:hidden p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/70 transition-colors shrink-0"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-300 ease-out"
          style={{ maxHeight: isOpen ? "300px" : "0px" }}
        >
          <div className="space-y-1.5 border-t border-zinc-800/70 mt-1 pt-4 pb-4">
            <NavLink to="/" onClick={closeAll} className={mobileLinkClass}>
              Home
            </NavLink>
            <NavLink
              to="/movies"
              onClick={closeAll}
              className={mobileLinkClass}
            >
              Movies
            </NavLink>
            <NavLink
              to="/profile"
              onClick={closeAll}
              className={mobileLinkClass}
            >
              Profile
            </NavLink>
            <button
              type="button"
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800/60 hover:text-white transition-colors"
            >
              <Bell size={16} />
              Notifikasi
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
