import { PixelMoonIcon, PixelSunIcon } from './PixelIcons';
import type { ThemeMode } from '../data/homepage';

type ThemeToggleProps = {
  theme: ThemeMode;
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="surface-shadow absolute top-8 right-8 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-black/5 bg-[var(--btn-bg)] text-[var(--btn-text)] transition-all duration-300 hover:-translate-y-1.5"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <PixelMoonIcon className="h-5 w-5" /> : <PixelSunIcon className="h-5 w-5" />}
    </button>
  );
}
