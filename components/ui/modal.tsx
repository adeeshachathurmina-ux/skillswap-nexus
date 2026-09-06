'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed top-1/2 left-1/2 z-50 w-full ${sizeMap[size]} -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-7 shadow-2xl backdrop-blur-xl`}
          >
            <div className="flex items-start justify-between">
              <div>
                {title && (
                  <h2 className="font-display text-3xl font-bold text-white">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-2 text-white/60">{description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="mt-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
