import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import {
  X,
  Loader2,
  Mail,
  Lock,
  User,
  Clapperboard,
  Eye,
  EyeOff,
} from "lucide-react";

const CLOSE_DURATION = 200;

export default function LoginModal() {
  const {
    isLoginOpen,
    authMode,
    loginMessage,
    closeLogin,
    login,
    register,
    setAuthMode,
  } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [shouldRender, setShouldRender] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isLoginOpen) {
      setShouldRender(true);
      setIsClosing(false);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      setShowPassword(false);
      setShowConfirmPassword(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, CLOSE_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isLoginOpen, shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;

    const handleKey = (e) => {
      if (e.key === "Escape") closeLogin();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [shouldRender, closeLogin]);

  useEffect(() => {
    setError("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, [authMode]);

  const handleClose = useCallback(() => {
    closeLogin();
  }, [closeLogin]);

  if (!shouldRender) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      if (authMode === "login") {
        await login(email, password);
        // Toast + closeLogin() sudah dipanggil dari dalam AuthContext
        return;
      }

      if (password !== confirmPassword) {
        throw new Error("Konfirmasi password tidak cocok.");
      }

      await register(name, email, password);
      // Toast sukses sudah dipanggil dari AuthContext
      setAuthMode("login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm"
      style={{
        animation: isClosing
          ? "fadeOut 0.2s ease-in forwards"
          : "fadeIn 0.2s ease-out",
      }}
      onClick={handleClose}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes sheetUp {
          from { transform: translateY(24px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes sheetDown {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(24px); opacity: 0; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-8px); max-height: 0; }
          to { opacity: 1; transform: translateY(0); max-height: 100px; }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: isClosing
            ? "sheetDown 0.2s ease-in forwards"
            : "sheetUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="relative w-full sm:max-w-md bg-zinc-900 border border-zinc-800 rounded-t-3xl sm:rounded-2xl shadow-2xl shadow-black/50 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-zinc-700" />
        </div>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Tutup"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="px-6 sm:px-8 pt-3 sm:pt-8 pb-6 sm:pb-8">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-red-600/20">
              <Clapperboard className="text-white" size={22} />
            </div>
            <h2
              key={authMode}
              style={{ animation: "fadeSlideIn 0.25s ease-out" }}
              className="text-xl sm:text-2xl font-bold text-white"
            >
              {authMode === "login" ? "Masuk ke akunmu" : "Buat akun baru"}
            </h2>
            <p className="mt-1.5 text-sm text-zinc-500 max-w-xs">
              {authMode === "login"
                ? loginMessage ||
                  "Simpan favorit dan watchlist filmmu di mana saja."
                : "Buat akun untuk menyimpan data filmmu."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === "register" && (
              <div style={{ animation: "fadeSlideIn 0.25s ease-out" }}>
                <label className="block mb-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Nama
                </label>
                <div className="relative">
                  <User
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama kamu"
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block mb-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 pl-10 pr-11 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Lihat password"
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {authMode === "register" && (
              <div style={{ animation: "fadeSlideIn 0.25s ease-out" }}>
                <label className="block mb-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <Lock
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500"
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password"
                    required
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 pl-10 pr-11 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword
                        ? "Sembunyikan password"
                        : "Lihat password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div
                style={{ animation: "popIn 0.2s ease-out" }}
                className="flex items-center gap-2 bg-red-600/10 border border-red-600/30 rounded-xl px-3.5 py-2.5"
              >
                <p className="text-xs sm:text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-red-600 hover:bg-red-500 px-4 py-3 font-semibold text-sm sm:text-base text-white transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-red-600/20"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Memproses...
                </>
              ) : authMode === "login" ? (
                "Masuk"
              ) : (
                "Daftar"
              )}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-zinc-500">
            {authMode === "login" ? (
              <>
                Belum punya akun?{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("register")}
                  className="text-red-500 hover:text-red-400 font-semibold"
                >
                  Daftar
                </button>
              </>
            ) : (
              <>
                Sudah punya akun?{" "}
                <button
                  type="button"
                  onClick={() => setAuthMode("login")}
                  className="text-red-500 hover:text-red-400 font-semibold"
                >
                  Masuk
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
