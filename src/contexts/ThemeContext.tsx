import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type AccentColor, accentColors } from '../types';

export type Appearance = 'default' | 'light' | 'dark';
export type ThemePicture = 'city' | 'nature' | 'marble' | 'none';

interface ThemeContextType {
  appearance: Appearance;
  accent: AccentColor;
  colors: typeof accentColors[AccentColor];
  picture: ThemePicture;
  textTitle: string;
  textSubtitle: string;
  setAppearance: (mode: Appearance) => void;
  setAccent: (color: AccentColor) => void;
  setPicture: (p: ThemePicture) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  /** When provided, theme prefs are scoped per account so they don't leak across accounts on the same browser. */
  userId?: string;
}

export const ThemeProvider = ({ children, userId }: ThemeProviderProps) => {
  // Theme preference is stored per user account. Browser-wide keys caused one
  // account's saved theme (e.g. dark mode) to leak into another account's login.
  // Without a userId (e.g. the public survey response page) we fall back to the
  // shared browser-level keys.
  const storageKey = (name: string) =>
    userId ? `survey-theme-${userId}-${name}` : `survey-theme-${name}`;

  const readStored = (name: string, isValid: (v: string) => boolean): string | null => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(storageKey(name));
    return stored !== null && isValid(stored) ? stored : null;
  };

  const [appearance, setAppearance] = useState<Appearance>(() => {
    // Read initial appearance from per-account storage or use the default theme
    const stored = readStored('appearance', (v) => v === 'default' || v === 'light' || v === 'dark');
    return (stored as Appearance) ?? 'default'; // First-time users get the neutral default theme
  });

  const [accent, setAccent] = useState<AccentColor>(() => {
    const stored = readStored('accent', (v) => v === 'default' || v === 'blue' || v === 'green' || v === 'red' || v === 'purple');
    return (stored as AccentColor) ?? 'default';
  });

  const [picture, setPicture] = useState<ThemePicture>(() => {
    const stored = readStored('picture', (v) => v === 'city' || v === 'nature' || v === 'marble' || v === 'none');
    return (stored as ThemePicture) ?? 'none';
  });

  // Track active resolved palette
  const colors = accentColors[accent];

  useEffect(() => {
    const root = document.documentElement;
    // Remove both dark and theme-default classes first
    root.classList.remove('dark', 'theme-default');

    if (appearance === 'dark') {
      root.classList.add('dark');
    } else if (appearance === 'default') {
      root.classList.add('theme-default');
    }
    // 'light' → no extra class, uses :root variables

    localStorage.setItem(storageKey('appearance'), appearance);
  }, [appearance, userId]);

  useEffect(() => {
    const root = document.documentElement;

    // When in default appearance, use a custom accent palette that
    // works with the mid-tone gray background instead of the user's accent picker
    if (appearance === 'default') {
      const defaultPalette = {
        50: '#f8f9fa',
        100: '#e2e6e8',
        200: '#adb5bd',
        300: '#6c757d',
        400: '#495057',
        500: '#343a40',
        600: '#212529',
        700: '#000000',
        800: '#000000',
        900: '#000000',
      };
      Object.entries(defaultPalette).forEach(([shade, value]) => {
        root.style.setProperty(`--accent-${shade}`, value);
      });
    } else {
      const selectedPalette = accentColors[accent];
      Object.entries(selectedPalette).forEach(([shade, value]) => {
        root.style.setProperty(`--accent-${shade}`, value);
      });
    }

    localStorage.setItem(storageKey('accent'), accent);
  }, [accent, appearance, userId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(storageKey('picture'), picture);
  }, [picture, userId]);

  // Re-sync theme from storage on mount / account switch and when theme-synced event fires
  useEffect(() => {
    const syncFromStorage = () => {
      const storedAppearance = readStored('appearance', (v) => v === 'default' || v === 'light' || v === 'dark');
      if (storedAppearance) setAppearance(storedAppearance as Appearance);
      const storedAccent = readStored('accent', (v) => v === 'default' || v === 'blue' || v === 'green' || v === 'red' || v === 'purple');
      if (storedAccent) setAccent(storedAccent as AccentColor);
      const storedPicture = readStored('picture', (v) => v === 'city' || v === 'nature' || v === 'marble' || v === 'none');
      if (storedPicture) setPicture(storedPicture as ThemePicture);
    };

    // Re-sync on mount (catches values already in storage / account switch)
    syncFromStorage();

    // Re-sync whenever mutation hooks save new theme settings
    window.addEventListener('theme-synced', syncFromStorage);
    return () => window.removeEventListener('theme-synced', syncFromStorage);
  }, [userId]);

  const hasPicture = picture !== 'none';
  const textTitle = hasPicture
    ? 'text-white'
    : appearance === 'default'
      ? ''
      : 'text-slate-900 dark:text-white';
  const textSubtitle = hasPicture
    ? 'text-slate-200'
    : appearance === 'default'
      ? 'text-slate-400'
      : 'text-slate-500 dark:text-slate-400';

  return (
    <ThemeContext.Provider value={{ appearance, accent, colors, picture, textTitle, textSubtitle, setAppearance, setAccent, setPicture }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
