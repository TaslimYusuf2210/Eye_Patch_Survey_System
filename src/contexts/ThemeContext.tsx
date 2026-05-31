import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type AccentColor, accentColors } from '../types';

export type Appearance = 'light' | 'dark';

interface ThemeContextType {
  appearance: Appearance;
  accent: AccentColor;
  colors: typeof accentColors[AccentColor];
  setAppearance: (mode: Appearance) => void;
  setAccent: (color: AccentColor) => void;
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

  return (
    <ThemeContext.Provider value={{ appearance, accent, colors, setAppearance, setAccent }}>
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
