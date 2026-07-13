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
  coverImagePath?: string;
  embedUrl: string;
  chrome: 'sage' | 'coral' | 'cream';
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
    title: '《黑暗之后》',
    subtitle: '创作者：wiki  Rollo  胡个.  阿兰塔夫曼',
    coverLabel: '[ Click to Play Video ]',
    coverImagePath: 'image/covers/video-1.jpg',
    embedUrl: 'https://player.bilibili.com/player.html?bvid=BV14TDxB3E5V&page=1&autoplay=0',
    chrome: 'coral',
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
    title: '《它不只是女生的事》',
    subtitle: '创作者：wiki  Rollo  胡个.  阿兰塔夫曼',
    coverLabel: '[ Click to Play Video ]',
    coverImagePath: 'image/covers/video-2.jpg',
    embedUrl: 'https://player.bilibili.com/player.html?bvid=BV1DZDsB7Emp&page=1&autoplay=0',
    chrome: 'cream',
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
    title: 'AIGC 广告《冰雪柔情》',
    subtitle: '创作者：阿兰塔夫曼  今安  wiki  Rollo',
    coverLabel: '[ Click to Play Video ]',
    coverImagePath: 'image/covers/video-3.jpg',
    embedUrl: 'https://open.douyin.com/player/video?vid=7574334759065635173&autoplay=0',
    chrome: 'sage',
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
