import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emailAddress, videoPanels } from '../data/homepage';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { useTheme } from '../hooks/useTheme';
import { HelloPanel } from '../components/HelloPanel';
import { GeneralPanel } from '../components/GeneralPanel';
import { ThemeToggle } from '../components/ThemeToggle';
import { LikeButton } from '../components/LikeButton';
import { EmailButton } from '../components/EmailButton';
import { VideoPanel } from '../components/VideoPanel';
import { VideoModal } from '../components/VideoModal';
import { NotificationToast } from '../components/NotificationToast';

export function HomePage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const tetrisCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [likes, setLikes] = useLocalStorageState('dell-wiki-like-count', 4504);
  const [toast, setToast] = useState<string | null>(null);
  const [openedVideoId, setOpenedVideoId] = useState<string | null>(null);
  const openedVideo = videoPanels.find((panel) => panel.id === openedVideoId) ?? null;

  const showToast = (message: string) => {
    setToast(message);
  };

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const canvas = tetrisCanvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const pixelRatio = window.devicePixelRatio || 1;
    const colors = ['#C5B9FB', '#F6D68F', '#BEEFE6', '#F0F0F2'];
    const shapes = [
      [[1, 1, 1, 1]],
      [
        [1, 1],
        [1, 1],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
      ],
      [
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
      ],
      [
        [0, 0, 1],
        [1, 1, 1],
      ],
    ];

    type FallingPiece = {
      x: number;
      y: number;
      speed: number;
      size: number;
      color: string;
      shape: number[][];
    };

    let animationFrame = 0;
    let lastTimestamp = 0;
    let width = 0;
    let height = 0;
    let pieces: FallingPiece[] = [];

    const resizeCanvas = () => {
      const { width: nextWidth, height: nextHeight } = canvas.getBoundingClientRect();
      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.max(1, Math.floor(nextWidth * pixelRatio));
      canvas.height = Math.max(1, Math.floor(nextHeight * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const buildPieces = () => {
      const count = 15;
      pieces = Array.from({ length: count }, (_, index) => {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        return {
          x: Math.floor(Math.random() * Math.max(1, width / 40)) * 40,
          y: Math.random() * height,
          speed: 38 + Math.random() * 22,
          size: 40,
          color: colors[index % colors.length],
          shape,
        };
      });
    };

    const resetPiece = (piece: FallingPiece) => {
      const nextShape = shapes[Math.floor(Math.random() * shapes.length)];
      piece.shape = nextShape;
      piece.color = colors[Math.floor(Math.random() * colors.length)];
      piece.x = Math.floor(Math.random() * Math.max(1, width / piece.size)) * piece.size;
      piece.y = -nextShape.length * piece.size - Math.random() * 500;
      piece.speed = 38 + Math.random() * 22;
    };

    const drawBackground = () => {
      context.clearRect(0, 0, width, height);

      for (const piece of pieces) {
        context.fillStyle = piece.color;
        context.strokeStyle = '#000';
        context.lineWidth = 2;

        piece.shape.forEach((row, rowIndex) => {
          row.forEach((cell, columnIndex) => {
            if (!cell) return;

            const cellX = piece.x + columnIndex * piece.size;
            const cellY = piece.y + rowIndex * piece.size;
            context.fillRect(cellX, cellY, piece.size, piece.size);
            context.strokeRect(cellX, cellY, piece.size, piece.size);
            context.fillStyle = 'rgba(255, 255, 255, 0.28)';
            context.fillRect(cellX + 2, cellY + 2, 4, 4);
            context.fillStyle = piece.color;
          });
        });
      }
    };

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaSeconds = Math.min(0.032, (timestamp - lastTimestamp) / 1000);
      lastTimestamp = timestamp;

      for (const piece of pieces) {
        piece.y += piece.speed * deltaSeconds;
      }

      // Demo-style AABB collision response: upper piece is supported and speed-syncs with lower piece.
      for (let i = 0; i < pieces.length; i += 1) {
        const current = pieces[i];
        const currentW = current.shape[0].length * current.size;
        const currentH = current.shape.length * current.size;

        for (let j = 0; j < pieces.length; j += 1) {
          if (i === j) continue;
          const other = pieces[j];

          const otherW = other.shape[0].length * other.size;
          const otherH = other.shape.length * other.size;

          const overlaps =
            current.x < other.x + otherW &&
            current.x + currentW > other.x &&
            current.y < other.y + otherH &&
            current.y + currentH > other.y;

          if (!overlaps) continue;

          if (current.y < other.y) {
            current.y = other.y - currentH;
            current.speed = other.speed;
          } else {
            other.y = current.y - otherH;
            other.speed = current.speed;
          }
        }
      }

      for (const piece of pieces) {
        if (piece.y > height) {
          resetPiece(piece);
        }
      }

      drawBackground();
      animationFrame = window.requestAnimationFrame(animate);
    };

    resizeCanvas();
    buildPieces();
    drawBackground();
    animationFrame = window.requestAnimationFrame(animate);

    const handleResize = () => {
      resizeCanvas();
      buildPieces();
      drawBackground();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen md:h-screen md:overflow-hidden">
      <canvas ref={tetrisCanvasRef} id="tetris-bg" className="fixed top-0 left-0 h-full w-full z-0 pointer-events-none" />

      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <main className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 pb-8 pt-24 text-[var(--text)] md:min-h-screen md:px-0 md:pb-0 md:pt-0">
        <GeneralPanel className="z-20 md:absolute md:top-[22%] md:left-8" />

        <section className="z-10 w-full md:absolute md:top-1/2 md:left-1/2 md:w-[500px] md:-translate-x-1/2 md:-translate-y-1/2">
          <HelloPanel onOpenAbout={() => navigate('/about')} />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <LikeButton count={likes} onIncrement={() => setLikes((current) => current + 1)} />
            <EmailButton email={emailAddress} onCopied={() => showToast('已复制邮件地址到剪切板')} />
          </div>
        </section>

        <VideoPanel
          panel={videoPanels[0]}
          onOpen={() => setOpenedVideoId(videoPanels[0].id)}
          className="z-0 md:absolute md:top-[60%] md:left-[8%]"
        />

        <VideoPanel
          panel={videoPanels[1]}
          onOpen={() => setOpenedVideoId(videoPanels[1].id)}
          className="z-0 md:absolute md:top-[15%] md:right-[10%]"
        />

        <VideoPanel
          panel={videoPanels[2]}
          onOpen={() => setOpenedVideoId(videoPanels[2].id)}
          className="z-0 md:absolute md:top-[55%] md:right-[15%]"
        />
      </main>

      <VideoModal
        open={openedVideo !== null}
        title={openedVideo?.title ?? ''}
        embedUrl={openedVideo?.embedUrl ?? ''}
        headerClassName={
          openedVideo?.chrome === 'purple'
            ? 'bg-[rgba(253,153,120,0.66)]'
            : openedVideo?.chrome === 'yellow'
              ? 'bg-[rgba(246,214,143,0.82)]'
              : 'bg-[rgba(116,149,147,0.66)]'
        }
        onClose={() => setOpenedVideoId(null)}
      />
      <NotificationToast message={toast} />
    </div>
  );
}
