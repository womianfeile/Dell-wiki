type NotificationToastProps = {
  message: string | null;
};

export function NotificationToast({ message }: NotificationToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[90] max-w-[280px] rounded-[16px] border border-black/5 bg-[var(--toast-bg)] px-4 py-3 text-sm text-[var(--text)] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]">
      {message}
    </div>
  );
}
