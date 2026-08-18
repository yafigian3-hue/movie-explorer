"use client";

import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Clapperboard, LogOut } from "lucide-react";
import SearchBar from "./SearchBar";
import useSearch from "../context/useSearch";
import { useAuth } from "../context/AuthContext";

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

function UserAvatar({ name, size = "sm" }) {
  const initial = name?.charAt(0).toUpperCase() || "?";
  const dimension = size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";

  return (
    <div
      className={`${dimension} rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center font-bold text-white shrink-0`}
    >
      {initial}
    </div>
  );
}

export default function Navbar({ forceVisible = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { clearSearch } = useSearch();
  const { user, openLogin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > REVEAL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visible = forceVisible || scrolled || isOpen;

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
            aria-label="Movie Explorer - Beranda"
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

            {user ? (
              <div className="hidden lg:flex items-center gap-1.5">
                <NavLink
                  to="/profile"
                  onClick={clearSearch}
                  aria-label="Movie Explorer - Profile"
                  className="flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <UserAvatar name={user.name} />
                  <span className="text-sm font-medium text-zinc-200 max-w-[100px] truncate">
                    {user.name}
                  </span>
                </NavLink>

                <button
                  type="button"
                  onClick={logout}
                  aria-label="Keluar"
                  title="Keluar"
                  className="w-11 h-11 flex items-center justify-center rounded-full text-zinc-500 hover:text-red-400 hover:bg-zinc-800/70 transition-colors"
                >
                  <LogOut size={17} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openLogin()}
                className="hidden lg:flex px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all active:scale-95 shadow-lg shadow-red-600/20"
              >
                Masuk
              </button>
            )}

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isOpen}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/70 transition-colors shrink-0"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-300 ease-out"
          style={{ maxHeight: isOpen ? "360px" : "0px" }}
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

            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-3 border-t border-zinc-800/70 mt-2 pt-4">
                  <UserAvatar name={user.name} size="lg" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-left text-sm font-medium text-zinc-400 hover:bg-zinc-800/60 hover:text-white transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  openLogin();
                  setIsOpen(false);
                }}
                className="w-full mt-2 px-4 py-2.5 rounded-lg text-center text-sm font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors"
              >
                Masuk
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
