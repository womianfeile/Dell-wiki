import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10 text-[var(--text)]">
      <motion.section
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="pixel-window pixel-hover w-full max-w-2xl p-8 text-center"
      >
        <p className="pixel-title text-xl">{title}</p>
        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[var(--muted)]">{description}</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="pixel-window pixel-hover mt-8 h-12 rounded-full px-6 text-sm text-[var(--text)]"
        >
          Back Home
        </button>
      </motion.section>
    </div>
  );
}
