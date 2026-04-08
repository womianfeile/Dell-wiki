type VideoModalProps = {
  open: boolean;
  title: string;
  embedUrl: string;
  onClose: () => void;
  headerClassName?: string;
};

export function VideoModal({ open, title, embedUrl, onClose, headerClassName = 'bg-macaron-green' }: VideoModalProps) {
  if (!open) return null;

  return (
    <div className="pixel-overlay fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-[16px] border border-black/5 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] bg-transparent flex flex-col">
        <div className={`px-3 py-2 backdrop-blur-[14px] ${headerClassName}`}>
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/40 text-[var(--video-modal-control)] transition-all hover:bg-white/70"
              title="关闭"
            >
              <span className="translate-x-[-1px] font-pixel text-xl">&lt;</span>
            </button>
            <p className="translate-y-[2px] font-pixel text-xl font-bold text-[var(--video-modal-title)]">{title}</p>
            <button
              type="button"
              className="h-8 w-8 opacity-0"
              aria-hidden="true"
              tabIndex={-1}
            >
              &nbsp;
            </button>
          </div>
        </div>
        <div className="border-x border-b border-black/5 bg-[var(--video-shell-bg)] p-4 backdrop-blur-[14px]">
          <div className="aspect-video overflow-hidden bg-black">
            <iframe
              title={title}
              src={embedUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
