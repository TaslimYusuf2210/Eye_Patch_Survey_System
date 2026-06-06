import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type AccentColor, accentColors } from '../types';

export type Appearance = 'light' | 'dark';
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

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [appearance, setAppearance] = useState<Appearance>(() => {
    // Read initial appearance from localStorage or system preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('survey-theme-appearance');
      if (stored === 'light' || stored === 'dark') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [accent, setAccent] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('survey-theme-accent');
      if (stored === 'default' || stored === 'blue' || stored === 'green' || stored === 'red' || stored === 'purple') {
        return stored as AccentColor;
      }
    }
    return 'default';
  });

  const [picture, setPicture] = useState<ThemePicture>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('survey-theme-picture');
      if (stored === 'city' || stored === 'nature' || stored === 'marble' || stored === 'none') return stored as ThemePicture;
    }
    return 'none';
  });

  // Track active resolved palette
  const colors = accentColors[accent];

  useEffect(() => {
    const root = document.documentElement;
    if (appearance === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('survey-theme-appearance', appearance);
  }, [appearance]);

  useEffect(() => {
    const root = document.documentElement;
    const selectedPalette = accentColors[accent];
    Object.entries(selectedPalette).forEach(([shade, value]) => {
      root.style.setProperty(`--accent-${shade}`, value);
    });
    localStorage.setItem('survey-theme-accent', accent);
  }, [accent]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('survey-theme-picture', picture);
  }, [picture]);

  const hasPicture = picture !== 'none';
  const textTitle = hasPicture ? 'text-white' : 'text-slate-900 dark:text-white';
  const textSubtitle = hasPicture ? 'text-slate-200' : 'text-slate-500 dark:text-slate-400';

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
