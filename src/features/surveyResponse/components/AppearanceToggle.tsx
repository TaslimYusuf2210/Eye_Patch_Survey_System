import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function AppearanceToggle() {
  const { appearance, setAppearance } = useTheme();
  const isDark = appearance === 'dark';

  return (
    <button
      type="button"
      onClick={() => setAppearance(isDark ? 'light' : 'dark')}
      className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-md text-gray-600 dark:text-slate-300 hover:scale-105 hover:shadow-lg transition-all cursor-pointer"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
