import { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import type { VideoPanelData } from '../data/homepage';

type VideoPanelProps = {
  panel: VideoPanelData;
  onOpen: () => void;
  className?: string;
};

export function VideoPanel({ panel, onOpen, className = '' }: VideoPanelProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const dragControls = useDragControls();
  const chromeColor =
    panel.chrome === 'purple'
      ? 'rgba(253,153,120,0.66)'
      : panel.chrome === 'yellow'
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
      drag
      dragControls={dragControls}
      dragListener={false}
      dragElastic={0}
      dragMomentum={false}
      whileDrag={{ zIndex: 40, cursor: 'grabbing' }}
      style={{ touchAction: 'none' }}
      className={`relative w-full md:w-[400px] ${className}`}
    >
      <motion.div
        whileHover={{ y: -6, zIndex: 30 }}
        className="video-panel-shell group relative w-full overflow-visible rounded-[16px] bg-transparent backdrop-blur-[14px] transition-[box-shadow] duration-200"
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
            <span className="text-sm text-[var(--muted)]">创作者: Dell</span>
          </div>
        </div>

        <div
          className="flex items-center justify-center rounded-t-[12px] py-2"
          style={{ backgroundColor: chromeColor }}
          title="Drag me!"
          onPointerDown={(event) => dragControls.start(event.nativeEvent)}
        >
          <div className="flex h-[24px] cursor-grab items-center justify-center gap-[6px] active:cursor-grabbing touch-none">
            <div className="pixel-dot"><div className="pixel-dot-inner" style={{ backgroundColor: chromeColor }} /></div>
            <div className="pixel-dot"><div className="pixel-dot-inner" style={{ backgroundColor: chromeColor }} /></div>
            <div className="pixel-dot"><div className="pixel-dot-inner" style={{ backgroundColor: chromeColor }} /></div>
          </div>
        </div>

        <div className="px-1 py-3">
          <button
            type="button"
            onClick={onOpen}
            className="block w-full overflow-hidden bg-gray-100 text-left shadow-inner transition-colors duration-300 hover:bg-gray-200"
          >
            <div className="flex aspect-video w-full items-center justify-center text-gray-400">
                {panel.coverLabel}
            </div>
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
}