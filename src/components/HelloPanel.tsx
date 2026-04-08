type HelloPanelProps = {
  onOpenAbout: () => void;
  className?: string;
};

export function HelloPanel({ onOpenAbout, className = '' }: HelloPanelProps) {
  return (
    <section
      className={`surface-shadow relative w-full overflow-hidden rounded-[16px] border border-black/5 bg-transparent p-10 backdrop-blur-[14px] transition-all duration-300 hover:-translate-y-1.5 md:w-[500px] ${className}`}
    >
      <button
        type="button"
        onClick={onOpenAbout}
        className="group flex w-full flex-col items-center justify-center gap-5 text-center outline-none"
      >
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-macaron-yellow shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-transform duration-200 group-hover:scale-[1.04]">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-macaron-yellow text-[11px] font-bold text-black/70">
            Avatar
          </span>
        </span>
        <span className="text-4xl font-bold leading-tight text-[var(--hello-text)]">
          Hello, I&apos;m Dell,
          <br />
          nice to meet you
        </span>
        <span className="absolute -top-11 rounded-[12px] bg-black px-4 py-2 text-lg text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Click to learn more about me
        </span>
      </button>
    </section>
  );
}
