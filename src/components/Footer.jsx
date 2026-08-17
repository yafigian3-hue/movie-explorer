import { useState, useEffect } from "react";
import {
  Clapperboard,
  Heart,
  Code2,
  ArrowUpRight,
  ArrowUp,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const TECH_STACK = ["React", "Tailwind", "Express", "Prisma", "PostgreSQL"];

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/movies", label: "Movies" },
  { to: "/profile", label: "Profile" },
];

const PROJECT_LINKS = [
  {
    href: "https://github.com/yafigian3-hue/movie-explorer",
    label: "Frontend",
  },
  {
    href: "https://github.com/yafigian3-hue/movie-explorer-backend",
    label: "Backend",
  },
];

function FilmStrip() {
  return (
    <div className="flex items-center gap-3 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex gap-1.5 shrink-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-[2px] bg-zinc-800" />
        ))}
      </div>
      <div className="flex-1 h-px bg-zinc-800" />
      <div className="flex gap-1.5 shrink-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-[2px] bg-zinc-800" />
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-zinc-950">
      <div className="pt-8 pb-2">
        <FilmStrip />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 sm:py-12 flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">
          {/* Brand — kiri, tidak lagi center-hero */}
          <div className="lg:w-[38%] shrink-0">
            <div className="inline-flex items-center gap-2">
              <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/20">
                <Clapperboard size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Movie<span className="text-red-600">Explorer</span>
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-zinc-500 max-w-xs">
              Aplikasi eksplorasi film — dibangun dari nol sebagai proyek
              belajar full-stack, dari React sampai database.
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {TECH_STACK.map((tech, i) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono text-zinc-500 border-l-2 border-zinc-800 pl-2 pr-2.5 py-0.5"
                  style={{
                    borderLeftColor:
                      i === 0 ? "rgb(220 38 38 / 0.5)" : undefined,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links — kanan, 2 kolom compact */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-6">
            <div>
              <h3 className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-4">
                Navigasi
              </h3>
              <div className="flex flex-col items-start gap-2.5">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-4">
                Source
              </h3>
              <div className="flex flex-col items-start gap-2.5">
                {PROJECT_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    <Code2 size={13} className="shrink-0 text-zinc-600" />
                    {link.label}
                    <ArrowUpRight
                      size={11}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-semibold text-zinc-600 uppercase tracking-widest mb-4">
                Data
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Didukung oleh{" "}
                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-500 hover:text-red-400 font-medium"
                >
                  TMDB API
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-900 py-5 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600 text-center sm:text-left">
            © {new Date().getFullYear()} MovieExplorer · Personal learning
            project
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-zinc-600">
            Made with
            <Heart size={11} className="text-red-600 fill-red-600" />
            while learning full-stack dev
          </p>
        </div>
      </div>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        aria-label="Kembali ke atas"
        className={`fixed bottom-5 right-5 z-40 w-10 h-10 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-800 text-zinc-400 flex items-center justify-center transition-all duration-300 hover:bg-red-600 hover:border-red-600 hover:text-white active:scale-90 ${
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <ArrowUp size={16} />
      </button>
    </footer>
  );
}
