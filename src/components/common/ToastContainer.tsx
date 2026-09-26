import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-none shadow-xl border border-[#111111]/10 bg-white text-[#111111] transition-all duration-300 transform translate-y-0`}
            style={{ borderLeft: `4px solid ${isSuccess ? '#B08D57' : isError ? '#D32F2F' : '#111111'}` }}
          >
            {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5" />}
            {isError && <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />}
            {!isSuccess && !isError && <Info className="w-5 h-5 text-[#111111] shrink-0 mt-0.5" />}

            <div className="flex-1 text-xs md:text-sm font-medium leading-relaxed">
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#666666] hover:text-[#111111] p-0.5 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
