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
      setToasts((prev) => [...prev, { id, message, type }]);
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
      `}</style>

      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{ animation: "toastIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)" }}
          className={`pointer-events-auto flex items-center gap-2.5 w-full sm:w-auto sm:min-w-[300px] max-w-sm rounded-xl border px-4 py-3 shadow-2xl backdrop-blur-md ${
            toast.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30"
              : "bg-red-600/10 border-red-600/30"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          ) : (
            <XCircle size={18} className="text-red-400 shrink-0" />
          )}

          <p
            className={`text-sm font-medium flex-1 ${
              toast.type === "success" ? "text-emerald-300" : "text-red-300"
            }`}
          >
            {toast.message}
          </p>

          <button
            onClick={() => onDismiss(toast.id)}
            aria-label="Tutup notifikasi"
            className="text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
