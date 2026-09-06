'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
const ThemeContext = createContext<{ theme: Theme; setTheme: (theme: Theme) => void }>({ theme: 'system', setTheme: () => undefined });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  useEffect(() => { const saved = localStorage.getItem('skillswap-theme') as Theme | null; if (saved) setThemeState(saved); }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('skillswap-theme', theme); }, [theme]);
  return <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>{children}</ThemeContext.Provider>;
}
export function useTheme() { return useContext(ThemeContext); }
