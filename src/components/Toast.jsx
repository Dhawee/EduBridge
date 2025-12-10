// src/components/Toast.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

/**
 * Usage:
 * Wrap your app with <ToastProvider>.
 * In any component: const { toast } = useToast(); toast("Saved", { type: "success" });
 */

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, opts = {}) => {
    const id = Math.random().toString(36).slice(2, 9);
    const t = { id, message, type: opts.type || "info", duration: opts.duration ?? 4000 };
    setToasts((s) => [t, ...s]);
    if (t.duration > 0) {
      setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), t.duration);
    }
    return id;
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((s) => s.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="pointer-events-none fixed top-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto w-80 max-w-xs rounded-lg p-3 shadow-lg transform transition-all duration-300
              ${t.type === "success" ? "bg-green-600 text-black" : t.type === "error" ? "bg-red-600 text-white" : "bg-gray-800 text-white"}
              animate-fadeInDown`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="text-sm leading-tight">{t.message}</div>
              <button onClick={() => dismiss(t.id)} className="ml-2 opacity-80 hover:opacity-100">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Minimal animations for toasts */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeInDown { animation: fadeInDown .18s ease-out; }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
