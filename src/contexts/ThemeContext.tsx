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

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [appearance, setAppearance] = useState<Appearance>(() => {
    // Read initial appearance from localStorage or use default theme
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('survey-theme-appearance');
      if (stored === 'default' || stored === 'light' || stored === 'dark') return stored;
    }
    return 'default'; // First-time users get the neutral default theme
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
    // Remove both dark and theme-default classes first
    root.classList.remove('dark', 'theme-default');

    if (appearance === 'dark') {
      root.classList.add('dark');
    } else if (appearance === 'default') {
      root.classList.add('theme-default');
    }
    // 'light' → no extra class, uses :root variables

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
  const textTitle = hasPicture
    ? 'text-white'
    : appearance === 'default'
      ? 'text-gray-900'
      : 'text-slate-900 dark:text-white';
  const textSubtitle = hasPicture
    ? 'text-slate-200'
    : appearance === 'default'
      ? 'text-gray-600'
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
