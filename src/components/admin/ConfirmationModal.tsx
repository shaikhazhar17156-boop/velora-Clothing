import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = true,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1E1E1E] border border-[#E5E5E5] dark:border-[#333333] shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-[#888888] hover:text-[#111111] dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDestructive ? 'bg-red-50 text-red-600 dark:bg-red-950/40' : 'bg-[#F9F5EE] text-[#B08D57]'}`}>
            <AlertTriangle className="w-5 h-5" />
          </div>

          <div className="space-y-1.5 flex-1">
            <h3 className="text-base font-bold text-[#111111] dark:text-white">
              {title}
            </h3>
            <p className="text-xs text-[#666666] dark:text-[#AAAAAA] leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#E5E5E5] dark:border-[#333333] flex justify-end gap-2.5">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-[#E5E5E5] dark:border-[#444444] text-xs font-semibold uppercase tracking-wider text-[#666666] dark:text-[#CCCCCC] hover:bg-[#F7F7F7] dark:hover:bg-[#2A2A2A] transition-colors"
          >
            {cancelText}
          </button>
          
          <button
            onClick={onConfirm}
            className={`px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors shadow-xs ${
              isDestructive ? 'bg-red-600 hover:bg-red-700' : 'bg-[#111111] dark:bg-[#B08D57] hover:bg-[#B08D57]'
            }`}
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  );
};
