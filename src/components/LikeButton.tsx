import { useEffect, useState, type CSSProperties, type KeyboardEvent } from 'react';

type LikeButtonProps = {
  count: number;
  onIncrement: () => void;
};

export function LikeButton({ count, onIncrement }: LikeButtonProps) {
  const baseUrl = import.meta.env.BASE_URL;
  const [liked, setLiked] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [burstVisible, setBurstVisible] = useState(false);

  const burstParticles = [
    { id: 'p1', apexX: -18, apexY: -42, x: -36, y: 24, delay: '0ms' },
    { id: 'p2', apexX: -10, apexY: -52, x: -22, y: 38, delay: '18ms' },
    { id: 'p3', apexX: 10, apexY: -54, x: 14, y: 42, delay: '8ms' },
    { id: 'p4', apexX: 20, apexY: -44, x: 30, y: 26, delay: '24ms' },
    { id: 'p5', apexX: 30, apexY: -30, x: 38, y: 12, delay: '36ms' },
    { id: 'p6', apexX: 14, apexY: -46, x: 20, y: 32, delay: '14ms' },
    { id: 'p7', apexX: 0, apexY: -56, x: 0, y: 40, delay: '42ms' },
    { id: 'p8', apexX: -22, apexY: -36, x: -28, y: 30, delay: '24ms' },
    { id: 'p9', apexX: -30, apexY: -28, x: -40, y: 12, delay: '34ms' },
    { id: 'p10', apexX: -8, apexY: -40, x: -12, y: 20, delay: '28ms' },
    { id: 'p11', apexX: 16, apexY: -38, x: 18, y: 18, delay: '12ms' },
    { id: 'p12', apexX: 24, apexY: -34, x: 28, y: 34, delay: '40ms' },
  ];

  useEffect(() => {
    if (!burstVisible) return;

    const timer = window.setTimeout(() => setBurstVisible(false), 650);
    return () => window.clearTimeout(timer);
  }, [burstVisible, burstKey]);

  const triggerLike = () => {
    setLiked(true);
    setBurstVisible(false);
    setBurstKey((current) => current + 1);
    window.requestAnimationFrame(() => setBurstVisible(true));
    onIncrement();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    triggerLike();
  };

  return (
    <button
      type="button"
      onClick={triggerLike}
      onKeyDown={handleKeyDown}
      className="surface-shadow flex h-12 items-center gap-3 rounded-full border border-black/5 bg-[var(--btn-bg)] px-5 text-[var(--btn-text)] transition-all duration-300 hover:-translate-y-1.5"
      aria-label="Like this homepage"
      aria-pressed={liked}
    >
      <span className="like-heart-anchor relative flex h-6 w-6 items-center justify-center overflow-visible">
        <span
          key={burstKey}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-0 ${burstVisible ? '' : 'hidden'}`}
        >
          {burstParticles.map((particle) => (
            <span
              key={particle.id}
              className="pixel-burst-particle absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-[#FF6B8B] [image-rendering:pixelated]"
              style={{
                ['--burst-apex-x']: `${particle.apexX}px`,
                ['--burst-apex-y']: `${particle.apexY}px`,
                ['--burst-x']: `${particle.x}px`,
                ['--burst-y']: `${particle.y}px`,
                animationDelay: particle.delay,
              } as CSSProperties & { '--burst-x': string; '--burst-y': string }}
            />
          ))}
        </span>

        <img
          src={liked ? `${baseUrl}heart-solid-red.svg` : `${baseUrl}heart-outline-red.svg`}
          width={24}
          height={24}
          alt="Heart"
          className="relative z-10 h-6 w-6 [image-rendering:pixelated]"
        />
      </span>
      <span className="text-xl font-bold leading-none">{count}</span>
    </button>
  );
}
