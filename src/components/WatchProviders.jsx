import { useEffect } from "react";
import { X, ExternalLink, Tv, ShoppingBag, Wallet, Ban } from "lucide-react";

const CATEGORIES = [
  { key: "flatrate", label: "Streaming", icon: Tv },
  { key: "rent", label: "Sewa", icon: Wallet },
  { key: "buy", label: "Beli", icon: ShoppingBag },
];

function ProviderRow({ label, Icon, providers, link }) {
  if (!providers || providers.length === 0) return null;

  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={14} className="text-red-500" />
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          {label}
        </h4>
        <span className="text-[11px] text-zinc-600">({providers.length})</span>
      </div>

      <div className="flex flex-col gap-2">
        {providers.map((p) => (
          <a
            key={p.provider_id}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-800/50 px-3.5 py-2.5 transition-all hover:bg-zinc-800 hover:border-red-500/50 active:scale-[0.98]"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                alt={p.provider_name}
                loading="lazy"
                className="h-9 w-9 rounded-lg shrink-0 ring-1 ring-white/10"
              />
              <span className="text-sm font-medium text-zinc-200 truncate">
                {p.provider_name}
              </span>
            </div>

            <ExternalLink
              size={15}
              className="text-zinc-600 group-hover:text-red-500 transition-colors shrink-0"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function WatchProviders({ data, movieTitle, onClose }) {
  const hasAny =
    data && (data.flatrate?.length || data.rent?.length || data.buy?.length);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes sheetUp {
          from { transform: translateY(24px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "sheetUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
        className="w-full sm:max-w-md bg-zinc-900 border border-zinc-800 rounded-t-3xl sm:rounded-2xl shadow-2xl shadow-black/50 max-h-[85vh] sm:max-h-[80vh] overflow-y-auto"
      >
        {/* Drag handle - mobile only */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-zinc-700" />
        </div>

        <div className="px-5 sm:px-6 pt-3 sm:pt-6 pb-5 sm:pb-6">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="text-lg font-bold text-white leading-snug">
                Tonton di mana?
              </h3>
              <p className="text-zinc-500 text-xs mt-0.5 truncate max-w-[240px]">
                {movieTitle}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Tutup"
              className="p-2 -mr-2 -mt-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          <div className="h-px bg-zinc-800 my-4" />

          {hasAny ? (
            CATEGORIES.map(({ key, label, icon }) => (
              <ProviderRow
                key={key}
                label={label}
                Icon={icon}
                providers={data[key]}
                link={data.link}
              />
            ))
          ) : (
            <div className="flex flex-col items-center text-center py-10">
              <div className="mb-4 p-4 bg-zinc-800/60 border border-zinc-800 rounded-2xl">
                <Ban size={26} className="text-zinc-600" />
              </div>
              <p className="text-zinc-400 text-sm max-w-[240px]">
                Belum ada info platform legal untuk "{movieTitle}" di wilayahmu.
              </p>
            </div>
          )}

          <p className="text-zinc-600 text-[11px] text-center mt-6">
            Data platform disediakan oleh JustWatch
          </p>
        </div>
      </div>
    </div>
  );
}
