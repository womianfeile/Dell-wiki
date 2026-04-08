import { useEffect } from 'react';
import { useLocalStorageState } from './useLocalStorageState';
import type { ThemeMode } from '../data/homepage';

export function applyThemeCursor(theme: ThemeMode) {
  const baseUrl = import.meta.env.BASE_URL;
  const cursorFile = theme === 'dark' ? 'cursor-minimal-dark.svg' : 'cursor-minimal.svg';
  const cursorValue = `url("${baseUrl}${cursorFile}") 0 0, auto`;
  const cursorPointerValue = `url("${baseUrl}${cursorFile}") 0 0, pointer`;

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.setProperty('--cursor-pixel', cursorValue);
  document.documentElement.style.setProperty('--cursor-pointer', cursorPointerValue);
}

export function useTheme() {
  const [theme, setTheme] = useLocalStorageState<ThemeMode>('dell-wiki-theme', 'light');

  useEffect(() => {
    applyThemeCursor(theme);
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
