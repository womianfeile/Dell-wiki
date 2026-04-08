export type ThemeMode = 'light' | 'dark';

export type HomeTab = {
  label: string;
  href: string;
  icon: 'about' | 'portfolio';
};

export type VideoPanelData = {
  id: string;
  title: string;
  subtitle: string;
  coverLabel: string;
  embedUrl: string;
  chrome: 'grey' | 'purple' | 'yellow';
  position: {
    top: string;
    left?: string;
    right?: string;
    width: string;
    rotate: number;
    delay: number;
    zIndex: number;
  };
};

export const emailAddress = '2023141070206@stu.scu.edu.cn';

export const homeTabs: HomeTab[] = [
  {
    label: 'About Me',
    href: '/about',
    icon: 'about',
  },
  {
    label: 'My Portfolio',
    href: '/portfolio',
    icon: 'portfolio',
  },
];

export const videoPanels: VideoPanelData[] = [
  {
    id: 'video-1',
    title: 'Web3 艺术生成管线探索',
    subtitle: 'A short exploration of generative art...',
    coverLabel: '[ Click to Play Video ]',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    chrome: 'purple',
    position: {
      top: '60%',
      left: '8%',
      width: '400px',
      rotate: 0,
      delay: 0.85,
      zIndex: 10,
    },
  },
  {
    id: 'video-2',
    title: '数字媒体艺术期末展',
    subtitle: 'My final project showcase...',
    coverLabel: '[ Click to Play Video ]',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    chrome: 'yellow',
    position: {
      top: '15%',
      right: '10%',
      width: '400px',
      rotate: 0,
      delay: 1.05,
      zIndex: 11,
    },
  },
  {
    id: 'video-3',
    title: '微型创新计划: 音乐厅',
    subtitle: 'A compact study in stage lighting...',
    coverLabel: '[ Click to Play Video ]',
    embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    chrome: 'grey',
    position: {
      top: '55%',
      right: '15%',
      width: '400px',
      rotate: 0,
      delay: 1.2,
      zIndex: 12,
    },
  },
];
