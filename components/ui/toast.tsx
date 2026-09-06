'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const bgMap = {
  success: 'bg-mint text-ink',
  error: 'bg-coral text-white',
  info: 'bg-violet text-white',
};

export function Toast({ toast, onClose }: ToastProps) {
  const Icon = iconMap[toast.type];

  return (
    <motion.div
      initial={{ y: 70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 70, opacity: 0 }}
      className={`${bgMap[toast.type]} flex items-center gap-3 rounded-full px-5 py-3 font-bold shadow-lg`}
    >
      <Icon size={18} />
      <span>{toast.message}</span>
      <button
        onClick={() => onClose(toast.id)}
        className="ml-2 hover:opacity-70"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <AnimatePresence>
      <div className="fixed bottom-5 right-5 z-[70] flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={onClose} />
        ))}
      </div>
    </AnimatePresence>
  );
}
