'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface MobileNavProps {
  links: Array<{
    label: string;
    onClick?: () => void;
  }>;
  logo: React.ReactNode;
  onNavigate?: (label: string) => void;
}

export function MobileNav({ links, logo, onNavigate }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-ink/95 border-b border-white/10 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col divide-y divide-white/10">
              {links.map((link) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    link.onClick?.();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-5 py-4 font-semibold text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
