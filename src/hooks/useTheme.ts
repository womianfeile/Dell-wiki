import { useEffect } from 'react';
import { useLocalStorageState } from './useLocalStorageState';
import type { ThemeMode } from '../data/homepage';

export function useTheme() {
  const [theme, setTheme] = useLocalStorageState<ThemeMode>('dell-wiki-theme', 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}
