import { useEffect, useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import type { VideoPanelData } from '../data/homepage';

type VideoPanelProps = {
  panel: VideoPanelData;
  onOpen: () => void;
  className?: string;
};

const desktopDragMediaQuery = '(min-width: 768px)';

function useDesktopDragEnabled() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopDragMediaQuery);
    const updateDragState = () => setIsEnabled(mediaQuery.matches);

    updateDragState();
    mediaQuery.addEventListener('change', updateDragState);

    return () => mediaQuery.removeEventListener('change', updateDragState);
  }, []);

  return isEnabled;
}

export function VideoPanel({ panel, onOpen, className = '' }: VideoPanelProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;
  const dragControls = useDragControls();
  const isDesktopDragEnabled = useDesktopDragEnabled();
  const chromeColor =
    panel.chrome === 'coral'
      ? 'rgba(253,153,120,0.66)'
      : panel.chrome === 'cream'
        ? 'rgba(246,214,143,0.82)'
        : 'rgba(116,149,147,0.66)';

  // 定义提示框的绝对完美路径 (圆角矩形 + 底部居中小三角)
  const tooltipPath = "M 16 0 H 264 A 16 16 0 0 1 280 16 V 52 A 16 16 0 0 1 264 68 H 148 L 140 76 L 132 68 H 16 A 16 16 0 0 1 0 52 V 16 A 16 16 0 0 1 16 0 Z";

  return (
    <motion.section
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
      onFocus={() => setIsTooltipVisible(true)}
      onBlur={() => setIsTooltipVisible(false)}
      drag={isDesktopDragEnabled}
      dragControls={dragControls}
      dragListener={false}
      dragElastic={0}
      dragMomentum={false}
      animate={isDesktopDragEnabled ? undefined : { x: 0, y: 0 }}
      whileDrag={{ zIndex: 40, cursor: 'grabbing' }}
      style={{ touchAction: isDesktopDragEnabled ? 'none' : 'auto' }}
      className={`relative w-full md:w-[400px] ${className}`}
    >
      <motion.div
        whileHover={{ y: -6, zIndex: 30 }}
        className="group relative w-full overflow-visible"
      >
        {/* 提示框容器 */}
        <div className={`absolute bottom-full left-1/2 z-50 mb-4 h-[76px] w-[280px] -translate-x-1/2 pointer-events-none transition-all duration-300 drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)] ${isTooltipVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* 退回稳定可用的原生 SVG 方案，并辅以半透明填充 (fillOpacity="0.7") 和原质感描边来最大限度模拟玻璃状通透性 */}
          <svg className="absolute inset-0 pointer-events-none" width="280" height="76" viewBox="0 0 280 76" fill="none">
            <path d={tooltipPath} fill="var(--panel-strong)" fillOpacity="0.7" stroke="var(--border)" strokeWidth="2" />
          </svg>

          {/* 文本内容层: 高度设为 68px，确保文字在主体矩形中绝对居中，不受底部三角影响 */}
          <div className="relative z-10 flex h-[68px] flex-col items-center justify-center px-4">
            <span className="w-full truncate text-center text-lg font-bold text-[var(--video-tooltip-text)]">作品: {panel.title}</span>
            <span className="w-full truncate text-center text-sm text-[var(--muted)]">{panel.subtitle}</span>
          </div>
        </div>

        <div className="video-panel-shell relative w-full overflow-hidden rounded-[16px] bg-transparent backdrop-blur-[14px] transition-[box-shadow] duration-200">
          <div
            className="flex items-center justify-center rounded-t-[12px] py-2"
            style={{ backgroundColor: chromeColor }}
            title={isDesktopDragEnabled ? 'Drag me!' : undefined}
            onPointerDown={
              isDesktopDragEnabled
                ? (event) => dragControls.start(event.nativeEvent)
                : undefined
            }
          >
            <div
              className={`flex h-[24px] items-center justify-center gap-[6px] ${
                isDesktopDragEnabled
                  ? 'cursor-grab touch-none active:cursor-grabbing'
                  : 'cursor-default touch-auto'
              }`}
            >
              <div className="pixel-dot" />
              <div className="pixel-dot" />
              <div className="pixel-dot" />
            </div>
          </div>

          <div className="px-1 py-3">
            <button
              type="button"
              onClick={onOpen}
              className="group/player block w-full overflow-hidden rounded-[10px] bg-black text-left shadow-inner"
              aria-label={`播放作品 ${panel.title}`}
            >
              <div className="relative aspect-video w-full overflow-hidden">
                {panel.coverImagePath ? (
                  <img
                    src={`${baseUrl}${panel.coverImagePath}`}
                    alt={`${panel.title} cover`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(140deg,#2c3542,#4a5e65)] text-xs text-white/80">
                    请在 homepage.ts 中设置 coverImagePath
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/35 transition-opacity duration-300 group-hover/player:opacity-85" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="relative block h-14 w-14 rounded-full bg-transparent backdrop-blur-[10px] shadow-[0_6px_14px_rgba(0,0,0,0.16)] transition-transform duration-300 group-hover/player:scale-105"
                    aria-hidden="true"
                  >
                    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 56 56" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0ZM22 17L40 28L22 39V17Z"
                        fill="rgba(255,255,255,0.14)"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
