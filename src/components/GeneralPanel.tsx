import { useLocation, useNavigate } from 'react-router-dom';
import { homeTabs } from '../data/homepage';

type GeneralPanelProps = {
  className?: string;
};

const tabColorMap = {
  about: 'hover:bg-[rgba(253,153,120,0.66)] hover:text-white',
  portfolio: 'hover:bg-[rgba(246,214,143,0.82)] hover:text-white',
};

const tabActiveColorMap = {
  about: 'bg-macaron-purple text-white',
  portfolio: 'bg-macaron-yellow text-white',
};

export function GeneralPanel({ className = '' }: GeneralPanelProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <aside
      className={`surface-shadow w-full rounded-[16px] border border-black/5 bg-transparent p-6 backdrop-blur-[14px] transition-all duration-300 hover:-translate-y-1.5 md:w-64 ${className}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] shadow-[0_2px_5px_rgba(0,0,0,0.08)]">
          <span className="text-[10px] font-bold text-black/75">D</span>
        </span>
        <div>
          <p className="text-2xl font-bold text-[var(--text)]">Dell-wiki</p>
        </div>
      </div>

      <div className="-mx-6 mt-4 flex flex-col">
        {homeTabs.map((tab) => {
          const active = location.pathname === tab.href;
          const hoverClass = tabColorMap[tab.icon];
          const activeClass = tabActiveColorMap[tab.icon];

          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => navigate(tab.href)}
              className={`group flex w-full items-center gap-3 px-6 py-3 text-left text-lg transition-colors duration-200 ${
                active
                  ? activeClass
                  : `text-[var(--text)] ${hoverClass}`
              }`}
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-full ${active ? 'bg-[var(--tab-icon-bg-active)]' : 'bg-[var(--tab-icon-bg)] group-hover:bg-[var(--tab-icon-bg-active)]'}`}>
                {tab.icon === 'about' ? (
                  <img src={`${baseUrl}avatar-square.svg`} width={24} height={24} alt="Avatar Square" className="h-5 w-5 [image-rendering:pixelated] [filter:var(--tab-icon-filter)] transition-all duration-200" />
                ) : (
                  <img src={`${baseUrl}briefcase.svg`} width={24} height={24} alt="Briefcase" className="h-5 w-5 [image-rendering:pixelated] [filter:var(--tab-icon-filter)] transition-all duration-200" />
                )}
              </span>
              <span className="font-medium">{tab.label}</span>
              <span className="ml-auto opacity-70 transition-transform duration-200 group-hover:translate-x-0.5">&gt;</span>
            </button>
          );
        })}
      </div>

    </aside>
  );
}
