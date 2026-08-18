import { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, XCircle, X } from "lucide-react";

const ToastContext = createContext();

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "success", duration = 3000) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type, duration }]);
      setTimeout(() => removeToast(id), duration);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <ToastContainer toasts={toasts} onDismiss={removeToast} />,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast harus dipakai di dalam ToastProvider");
  }
  return context;
}

function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 inset-x-0 sm:inset-x-auto sm:right-5 z-[200] flex flex-col items-center sm:items-end gap-2.5 px-4 sm:px-0 pointer-events-none">
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes toastProgress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{ animation: "toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
          className="pointer-events-auto relative w-full sm:w-auto sm:min-w-[320px] max-w-sm rounded-xl bg-zinc-900/95 backdrop-blur-md border border-zinc-800 shadow-2xl shadow-black/40 overflow-hidden"
        >
          <div className="flex items-center gap-3 px-4 py-3.5">
            {toast.type === "success" ? (
              <CheckCircle2 size={18} className="text-zinc-300 shrink-0" />
            ) : (
              <XCircle size={18} className="text-red-500 shrink-0" />
            )}

            <p className="text-sm font-medium text-zinc-200 flex-1 leading-snug">
              {toast.message}
            </p>

            <button
              onClick={() => onDismiss(toast.id)}
              aria-label="Tutup notifikasi"
              className="text-zinc-600 hover:text-zinc-300 transition-colors shrink-0"
            >
              <X size={15} />
            </button>
          </div>

          <div className="h-0.5 bg-zinc-800/80">
            <div
              className={`h-full ${
                toast.type === "success" ? "bg-zinc-500" : "bg-red-600"
              }`}
              style={{
                animation: `toastProgress ${toast.duration}ms linear forwards`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
