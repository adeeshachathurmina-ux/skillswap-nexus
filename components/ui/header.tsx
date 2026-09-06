'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AuthNavigation } from './auth-navigation';
import { ThemeSelector } from '@/components/theme-selector';

interface NavLink {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

interface HeaderProps {
  logoText?: string;
  links: NavLink[];
  ctaLabel?: string;
  onCTA?: () => void;
  dark?: boolean;
}

export function Header({
  logoText = 'SkillSwap',
  links,
  ctaLabel = 'Get started',
  onCTA,
  dark = false,
}: HeaderProps) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b ${
        dark
          ? 'border-white/10 bg-ink/65'
          : 'border-white/10 bg-white/50 dark:bg-ink/65'
      } backdrop-blur-2xl`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`font-display text-xl font-bold ${
            dark ? 'text-white' : 'text-ink dark:text-white'
          }`}
        >
          <span className="mr-3 inline-grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet to-purple-500 shadow-lg shadow-violet/40 text-white font-bold">
            S
          </span>
          {logoText} <span className="text-mint">LK</span>
        </motion.div>

        <nav
          className={`hidden gap-7 text-sm ${
            dark
              ? 'text-white/55'
              : 'text-ink/55 dark:text-white/55'
          } md:flex`}
        >
          {links.map((link) => link.href ? (
            <Link key={link.label} href={link.href} className={`transition-colors ${link.active ? 'text-white' : 'hover:text-white'}`}>
              {link.label}
            </Link>
          ) : (
            <button key={link.label} onClick={link.onClick} className="transition-colors hover:text-white">
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3"><ThemeSelector />{onCTA ? <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCTA}
          className={`rounded-full font-bold px-6 py-2.5 text-sm transition-all ${
            dark
              ? 'bg-white text-ink hover:shadow-lg hover:shadow-white/20'
              : 'bg-violet text-white hover:shadow-lg hover:shadow-violet/30'
          }`}
        >
          {ctaLabel}
        </motion.button> : <AuthNavigation />}</div>
      </div>
    </header>
  );
}
