'use client';
import { useTheme } from './theme-provider';
export function ThemeSelector() { const { theme, setTheme } = useTheme(); return <select aria-label="Theme" value={theme} onChange={(event) => setTheme(event.target.value as 'light' | 'dark' | 'system')} className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white"><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select>; }
