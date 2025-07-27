import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

const ToastContext = createContext(undefined);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type, duration = 5000) => {
    const id = Date.now().toString();
    const newToast = { id, message, type, duration };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const Toaster = () => {
  const { toasts, removeToast } = useToast();

  const getToastStyles = (type) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50 border-green-200",
          text: "text-green-800",
          icon: CheckCircle,
          iconColor: "text-green-500",
        };
      case "error":
        return {
          bg: "bg-red-50 border-red-200",
          text: "text-red-800",
          icon: AlertCircle,
          iconColor: "text-red-500",
        };
      case "warning":
        return {
          bg: "bg-yellow-50 border-yellow-200",
          text: "text-yellow-800",
          icon: AlertCircle,
          iconColor: "text-yellow-500",
        };
      case "info":
        return {
          bg: "bg-blue-50 border-blue-200",
          text: "text-blue-800",
          icon: Info,
          iconColor: "text-blue-500",
        };
      default:
        return {
          bg: "bg-slate-50 border-slate-200",
          text: "text-slate-800",
          icon: Info,
          iconColor: "text-slate-500",
        };
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => {
        const styles = getToastStyles(toast.type);
        const Icon = styles.icon;

        return (
          <div
            key={toast.id}
            className={`flex items-center p-4 rounded-lg border-2 shadow-lg ${styles.bg} ${styles.text} animate-in slide-in-from-right-2 duration-300`}
          >
            <Icon className={`h-5 w-5 mr-3 ${styles.iconColor}`} />
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

// Global toast function for external usage
let globalAddToast = null;

export const showToast = (message, type, duration) => {
  if (globalAddToast) {
    globalAddToast(message, type, duration);
  }
};

// Hook to register global toast function
export const useGlobalToast = () => {
  const { addToast } = useToast();

  useEffect(() => {
    globalAddToast = addToast;
    return () => {
      globalAddToast = null;
    };
  }, [addToast]);
};
