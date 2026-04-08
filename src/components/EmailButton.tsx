import { PixelMailIcon } from './PixelIcons';

type EmailButtonProps = {
  email: string;
  onCopied: () => void;
};

export function EmailButton({ email, onCopied }: EmailButtonProps) {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const fallback = document.createElement('textarea');
      fallback.value = email;
      fallback.style.position = 'fixed';
      fallback.style.opacity = '0';
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand('copy');
      document.body.removeChild(fallback);
    }

    onCopied();
  };

  return (
    <button
      type="button"
      onClick={copyEmail}
      className="surface-shadow flex h-12 items-center gap-3 rounded-full border border-black/5 bg-[var(--btn-bg)] px-5 text-[var(--btn-text)] transition-all duration-300 hover:-translate-y-1.5"
      aria-label="Copy email address"
    >
      <PixelMailIcon className="h-6 w-6" />
      <span className="text-xl font-medium">Email</span>
    </button>
  );
}
