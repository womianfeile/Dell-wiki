import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { PixelMoonIcon, PixelSunIcon } from '../components/PixelIcons';
import { useTheme } from '../hooks/useTheme';

type WindowPanelProps = {
  id: string;
  title: string;
  chromeColor: string;
  children: ReactNode;
  className?: string;
};

type TypewriterTextProps = {
  text: string;
  active: boolean;
  onComplete?: () => void;
  className?: string;
  hideCursorOnComplete?: boolean;
};

type ProfileLine = {
  label: string;
  value: string;
  subValue?: string;
  valueClassName?: string;
  containerClassName?: string;
};

const sections = [
  { label: 'BIO', hoverColor: 'rgba(190,239,230,0.82)' },
  { label: 'STATS', hoverColor: 'rgba(253,153,120,0.66)' },
  { label: 'SKILLS', hoverColor: 'rgba(197,185,251,0.82)' },
  { label: 'ACADEMY', hoverColor: 'rgba(246,214,143,0.82)' },
  { label: 'MISSION', hoverColor: 'rgba(143,182,214,0.66)' },
  { label: 'TROPHY', hoverColor: 'rgba(246,214,143,0.82)' },
];

const profileLines: ProfileLine[] = [
  { label: '[ PLAYER ]', value: 'Dell', valueClassName: 'font-bold' },
  { label: '[ FIELD ]', value: '数字媒体艺术', valueClassName: 'font-bold' },
  { label: '[ LEVEL ]', value: '2027届毕业生 ', subValue: '(GPA 3.6/4.0)', valueClassName: 'font-bold' },
  {
    label: '[ SERVER ]',
    value: '成都 / 上海 ',
    subValue: '(接受分配)',
    valueClassName: 'font-bold leading-tight flex flex-wrap items-center gap-x-1',
    containerClassName: 'items-start',
  },
];

const academySkills = [
  '视听语言',
  '影视文学创作',
  '影视后期制作',
  '电视节目策划/导播',
  'AI影视制作与工业化基础',
  '影视工业化智能体搭建',
  '虚拟角色创作',
];

const missions = [
  {
    company: '成都众读科技有限公司',
    dotColor: '#BEEFE6',
    role: '实习生',
    time: '2024.12 - 2025.02',
    desc: [
      '参与短剧《稻花香里说丰年》(红果平台466万热度) 中期拍摄与灯光',
      '负责后期流：粗剪、特效、配音、成品包装及各部门协调沟通',
      '参与蛇年萌宝系列短剧，担任 DIT',
    ],
  },
  {
    company: '成都市锦江区视水流年工作室',
    dotColor: '#FD9978',
    role: '工作室成员',
    time: '2024.10 - 至今',
    desc: [
      '参与和美社区文化活动中心宣传片分镜设计与现场拍摄',
      '负责晨辉启航人才赋能项目宣传视频业务洽谈、现场拍摄与后期剪辑',
    ],
  },
];

const trophies = [
  {
    medal: '1',
    title: '微电影《黑暗之后》',
    role: '(担任编剧、灯光、演员)',
    award: '全国大学生HPV公益创意大赛金奖',
    color: '#FD9978',
  },
  {
    medal: '2',
    title: '微电影《它不只是女生的事》',
    role: '(担任编剧、灯光、制片)',
    award: '全国大学生HPV公益创意大赛银奖',
    color: '#C5B9FB',
  },
  {
    medal: '3',
    title: 'AIGC可心柔产品广告《冰雪柔情》',
    role: '制作',
    award: '2025秋季中国大学生广告艺术节学院奖铜级',
    color: '#BEEFE6',
  },
  {
    medal: '4',
    title: '避孕药产品广告《重选键》',
    role: '(担任现场执行、演员)',
    award: '大学生广告艺术大赛省级二等奖',
    color: '#8FB6D6',
  },
];

function Cursor() {
  return <span className="ml-[2px] inline-block h-[14px] w-2 align-middle bg-[var(--text)] about-blink" />;
}

function PixelWindowDots({ chromeColor }: { chromeColor: string }) {
  return (
    <div className="flex h-6 cursor-default items-center justify-center gap-[6px]">
      {[0, 1, 2].map((dot) => (
        <div key={dot} className="pixel-dot">
          <div className="pixel-dot-inner" style={{ backgroundColor: chromeColor }} />
        </div>
      ))}
    </div>
  );
}

function WindowPanel({ id, title, chromeColor, children, className = '' }: WindowPanelProps) {
  return (
    <section
      id={id}
      className={`video-panel-shell relative flex flex-col overflow-hidden rounded-[16px] bg-transparent backdrop-blur-[14px] transition-transform duration-300 hover:-translate-y-1.5 ${className}`}
    >
      <div
        className="flex h-8 items-center justify-between px-4"
        style={{ backgroundColor: chromeColor }}
      >
        <PixelWindowDots chromeColor={chromeColor} />
        <span className="px-2 text-xs tracking-widest text-black/70">{title}</span>
        <div className="w-[42px]" aria-hidden="true" />
      </div>
      <div className="flex-grow p-5 md:p-7">{children}</div>
    </section>
  );
}

function TypewriterText({
  text,
  active,
  onComplete,
  className = '',
  hideCursorOnComplete = false,
}: TypewriterTextProps) {
  const chars = useMemo(() => Array.from(text), [text]);
  const [charIndex, setCharIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!active) return;

    if (charIndex < chars.length) {
      const timeout = window.setTimeout(() => {
        setCharIndex((current) => current + 1);
      }, 35 + Math.random() * 40);
      return () => window.clearTimeout(timeout);
    }

    if (!isCompleted) {
      setIsCompleted(true);
    }
  }, [active, charIndex, chars.length, isCompleted]);

  useEffect(() => {
    if (!isCompleted) return;

    const timeout = window.setTimeout(() => {
      onCompleteRef.current?.();
    }, 150);
    return () => window.clearTimeout(timeout);
  }, [isCompleted]);

  return (
    <span className={className}>
      {chars.slice(0, charIndex).join('')}
      {active && (!hideCursorOnComplete || !isCompleted) && <Cursor />}
    </span>
  );
}

function ProgressBar({
  label,
  percentage,
  color,
  delay = 0,
}: {
  label: string;
  percentage: number;
  color: string;
  delay?: number;
}) {
  const blocksCount = 20;
  const targetFilledBlocks = Math.round((percentage / 100) * blocksCount);
  const [currentFilledBlocks, setCurrentFilledBlocks] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimer = window.setTimeout(() => setHasStarted(true), delay);
    return () => window.clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted || currentFilledBlocks >= targetFilledBlocks) return;

    const timeout = window.setTimeout(() => {
      setCurrentFilledBlocks((current) => current + 1);
    }, 60);
    return () => window.clearTimeout(timeout);
  }, [hasStarted, currentFilledBlocks, targetFilledBlocks]);

  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <div className="w-28 whitespace-nowrap text-sm font-bold md:text-base">[{label}]</div>
      <div className="surface-shadow flex h-5 flex-grow gap-[2px] rounded-md border border-black/5 bg-[var(--video-shell-bg)] p-1 backdrop-blur-[14px]">
        {Array.from({ length: blocksCount }).map((_, index) => (
          <div
            key={index}
            className="flex-1 transition-colors duration-75"
            style={{ backgroundColor: index < currentFilledBlocks ? color : 'transparent' }}
          />
        ))}
      </div>
      <div className="w-12 text-right text-sm font-bold">{percentage}%</div>
    </div>
  );
}

function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`surface-shadow inline-flex items-center rounded-full border border-black/5 bg-[var(--btn-bg)] px-3 py-1 text-xs text-[var(--btn-text)] backdrop-blur-[14px] transition-all duration-300 hover:-translate-y-0.5 md:text-sm ${className}`}
    >
      {children}
    </span>
  );
}

function useOnceVisible<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.1 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function ProfileTerminal() {
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentLine >= profileLines.length) return;

    const line = profileLines[currentLine];
    const fullLength = line.label.length + line.value.length + (line.subValue?.length ?? 0);

    if (charIndex < fullLength) {
      const timeout = window.setTimeout(() => {
        setCharIndex((current) => current + 1);
      }, 35 + Math.random() * 40);
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setCurrentLine((current) => current + 1);
      setCharIndex(0);
    }, 350);
    return () => window.clearTimeout(timeout);
  }, [currentLine, charIndex]);

  return (
    <div className="grid min-h-[120px] grid-cols-1 gap-3 text-sm">
      {profileLines.map((line, index) => {
        const isPast = index < currentLine;
        const isCurrent = index === currentLine;
        const isFuture = index > currentLine;
        const fullLength = line.label.length + line.value.length + (line.subValue?.length ?? 0);
        const charsToShow = isPast ? fullLength : isCurrent ? charIndex : 0;
        const labelChars = Math.min(charsToShow, line.label.length);
        const valueChars = Math.min(Math.max(0, charsToShow - line.label.length), line.value.length);
        const subValueChars = Math.min(
          Math.max(0, charsToShow - line.label.length - line.value.length),
          line.subValue?.length ?? 0,
        );
        const showCursorInLabel = isCurrent && labelChars < line.label.length;
        const showCursorInValue = isCurrent && labelChars === line.label.length && valueChars < line.value.length;
        const showCursorInSub =
          isCurrent && valueChars === line.value.length && subValueChars < (line.subValue?.length ?? 0);
        const showCursorAtEnd = isCurrent && charsToShow === fullLength;

        if (isFuture) {
          return <div key={line.label} className={`flex min-h-5 gap-2 ${line.containerClassName ?? ''}`} />;
        }

        return (
          <div key={line.label} className={`flex min-h-5 gap-2 ${line.containerClassName ?? ''}`}>
            <span className="w-24 shrink-0 whitespace-pre-wrap tracking-wider text-[var(--muted)]">
              {line.label.slice(0, labelChars)}
              {showCursorInLabel && <Cursor />}
            </span>
            {charsToShow >= line.label.length && (
              <span className={line.valueClassName}>
                {line.value.slice(0, valueChars)}
                {showCursorInValue && <Cursor />}
                {line.subValue && charsToShow >= line.label.length + line.value.length && (
                  <span className="text-xs font-normal opacity-70">
                    {line.subValue.slice(0, subValueChars)}
                    {showCursorInSub && <Cursor />}
                  </span>
                )}
                {showCursorAtEnd && <Cursor />}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SkillCards() {
  const { ref, isVisible } = useOnceVisible<HTMLDivElement>();
  const cards = [
    {
      title: '[[ AIGC ]]',
      color: '#C5B9FB',
      items: ['Prompt设计', 'Web UI 超分/转绘', 'ControlNet'],
    },
    {
      title: '[[ 现场执行 ]]',
      color: '#FD9978',
      items: ['摄影/灯光实操', '录音器材使用', 'DIT / 场记'],
    },
    {
      title: '[[ 影视后期 ]]',
      color: '#BEEFE6',
      items: ['PR / Davinci', '剪映', 'AU 音频处理'],
    },
  ];

  return (
    <div ref={ref} className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className={isVisible ? 'about-pop-in' : 'opacity-0'}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="surface-shadow h-full rounded-xl border border-black/5 bg-[var(--video-shell-bg)] p-5 backdrop-blur-[14px] transition-transform duration-300 hover:-translate-y-1">
            <h3 className="mb-4 flex items-center gap-2 border-b border-black/5 pb-2 text-lg font-bold">
              <span className="h-4 w-4 [image-rendering:pixelated]" style={{ backgroundColor: card.color }} />
              {card.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {card.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[var(--muted)]">&gt;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function AcademyTerminal() {
  const { ref, isVisible } = useOnceVisible<HTMLDivElement>();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (isVisible) setPhase(1);
  }, [isVisible]);

  useEffect(() => {
    if (phase !== 4) return;

    const timer = window.setTimeout(() => {
      setPhase(5);
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <div ref={ref} className="space-y-6">
      <div className="flex min-h-[52px] flex-col gap-1">
        <div className="text-sm font-bold tracking-wider text-[var(--muted)]">* [基地] Base</div>
        <div className="flex min-h-7 flex-wrap items-center gap-2 text-lg font-bold">
          <TypewriterText text="四川大学 " active={phase >= 1} onComplete={() => setPhase(2)} hideCursorOnComplete={phase >= 2} />
          {phase >= 2 && (
            <span className="flex min-h-6 items-center rounded-md border border-black/10 px-2 text-sm font-normal opacity-70">
              <TypewriterText
                text="2023.09 - 2027.06"
                active={phase >= 2}
                onComplete={() => setPhase(3)}
                hideCursorOnComplete={phase >= 3}
              />
            </span>
          )}
        </div>
      </div>

      <div className="flex min-h-[70px] flex-col gap-2">
        <div className="text-sm font-bold tracking-wider text-[var(--muted)]">* [进阶] Advanced</div>
        <div className="flex min-h-[46px] items-start">
          {phase >= 3 && (
            <div className="inline-block w-fit rounded-lg border border-black/5 bg-[var(--video-shell-bg)] p-3 text-base font-bold leading-snug">
              <TypewriterText
                text="辅修四川大学艺术学院人工智能与影视工业化微专业"
                active={phase >= 3}
                onComplete={() => setPhase(4)}
                hideCursorOnComplete={phase >= 4}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex min-h-[90px] flex-col gap-3">
        <div className="text-sm font-bold tracking-wider text-[var(--muted)]">* [技能树解锁] Skill Tree</div>
        <div className="flex flex-wrap gap-2">
          {phase >= 4 &&
            academySkills.map((skill, index) => (
              <div key={skill} className="about-pop-in" style={{ animationDelay: `${index * 100}ms` }}>
                <Chip>{skill}</Chip>
              </div>
            ))}
        </div>
      </div>

      <div className="flex min-h-[50px] flex-col gap-3">
        <div className="text-sm font-bold tracking-wider text-[var(--muted)]">* [获得加成] Buffs</div>
        <div className="flex flex-wrap gap-3">
          <span className="flex min-h-6 items-center gap-1.5 font-bold">
            <TypewriterText text="[CET-6] 英语六级" active={phase >= 5} onComplete={() => setPhase(6)} hideCursorOnComplete={phase >= 6} />
          </span>
          <span className="flex min-h-6 items-center gap-1.5 font-bold">
            <TypewriterText text="[PSC] 普通话二级甲等" active={phase >= 6} onComplete={() => setPhase(7)} hideCursorOnComplete={phase >= 7} />
          </span>
          <span className="flex min-h-6 items-center gap-1.5 font-bold">
            <TypewriterText text="[PIANO] 钢琴十级" active={phase >= 7} hideCursorOnComplete />
          </span>
        </div>
      </div>
    </div>
  );
}

function MissionTerminal() {
  const { ref, isVisible } = useOnceVisible<HTMLDivElement>();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (isVisible) setPhase(1);
  }, [isVisible]);

  return (
    <div ref={ref} className="relative ml-3 space-y-8 pb-4 md:ml-4">
      {missions.map((mission, missionIndex) => {
        const basePhase = missionIndex * 4 + 1;
        const companyPhase = basePhase;
        const rolePhase = basePhase + 1;
        const timePhase = basePhase + 2;
        const descPhase = basePhase + 3;
        const nextMissionPhase = basePhase + 4;
        const maxDescLen = Math.max(...mission.desc.map((description) => description.length));
        const longestDescIndex = mission.desc.findIndex((description) => description.length === maxDescLen);

        return (
          <div key={mission.company} className="relative pl-6 md:pl-8">
            {phase >= companyPhase && (
              <div
                className="about-pop-in absolute -left-[7px] top-1 h-4 w-4 rounded-full shadow-sm"
                style={{ backgroundColor: mission.dotColor }}
              />
            )}

            <h4 className="flex min-h-7 items-center text-lg font-bold">
              <TypewriterText
                text={mission.company}
                active={phase >= companyPhase}
                onComplete={() => setPhase(rolePhase)}
                hideCursorOnComplete={phase >= rolePhase}
              />
            </h4>

            <div className="mt-1 mb-2 flex min-h-6 flex-wrap items-center gap-1 text-sm font-bold text-[var(--muted)]">
              <TypewriterText
                text={`${mission.role} ·`}
                active={phase >= rolePhase}
                onComplete={() => setPhase(timePhase)}
                hideCursorOnComplete={phase >= timePhase}
              />
              {phase >= timePhase && (
                <span className="ml-1 flex items-center rounded bg-[var(--video-shell-bg)] px-2 py-0.5 text-xs">
                  <TypewriterText
                    text={mission.time}
                    active={phase >= timePhase}
                    onComplete={() => setPhase(descPhase)}
                    hideCursorOnComplete={phase >= descPhase}
                  />
                </span>
              )}
            </div>

            <ul className="mt-3 space-y-1.5 text-sm">
              {mission.desc.map((line, descIndex) => (
                <li key={line} className="flex min-h-5 gap-2">
                  {phase >= descPhase && <span className="shrink-0 text-[var(--muted)]">-</span>}
                  <span className="flex-1 leading-relaxed">
                    <TypewriterText
                      text={line}
                      active={phase >= descPhase}
                      onComplete={descIndex === longestDescIndex ? () => setPhase(nextMissionPhase) : undefined}
                      hideCursorOnComplete={phase >= nextMissionPhase}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function TrophyCards() {
  const { ref, isVisible } = useOnceVisible<HTMLDivElement>();

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {trophies.map((trophy, index) => (
        <div
          key={trophy.title}
          className={isVisible ? 'about-pop-in' : 'opacity-0'}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="surface-shadow flex items-start gap-3 rounded-xl border border-black/5 bg-[var(--video-shell-bg)] p-3 backdrop-blur-[14px] transition-transform duration-300 hover:-translate-y-0.5">
            <div
              className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg font-bold text-black"
              style={{ backgroundColor: trophy.color }}
            >
              {trophy.medal}
            </div>
            <div>
              <h4 className="text-sm font-bold md:text-base">{trophy.title}</h4>
              <p className="mb-1 text-xs text-[var(--muted)]">{trophy.role}</p>
              <p className="text-sm font-bold" style={{ color: trophy.color }}>
                {trophy.award}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AboutPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="relative min-h-screen pb-10 text-[var(--text)]">
      <nav className="fixed top-0 z-50 w-full p-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="surface-shadow flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/5 bg-[var(--btn-bg)] text-[var(--btn-text)] transition-all duration-300 hover:-translate-y-1.5"
            aria-label="Back to homepage"
          >
            <span className="translate-x-[-1px] text-xl font-bold leading-none">&lt;</span>
          </button>

          <div className="surface-shadow hidden max-w-full overflow-hidden rounded-full border border-black/5 bg-transparent backdrop-blur-[14px] md:flex">
            {sections.map((section) => (
              <a
                key={section.label}
                href={`#${section.label.toLowerCase()}`}
                className="px-5 py-2 text-sm font-bold transition-colors duration-200 hover:bg-[var(--about-tab-hover)] hover:text-white"
                style={{ '--about-tab-hover': section.hoverColor } as CSSProperties}
              >
                [{section.label}]
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="surface-shadow flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black/5 bg-[var(--btn-bg)] text-[var(--btn-text)] transition-all duration-300 hover:-translate-y-1.5"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <PixelMoonIcon className="h-5 w-5" /> : <PixelSunIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pt-28 md:gap-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <WindowPanel id="bio" title="玩家档案 / PROFILE" chromeColor="rgba(190,239,230,0.82)" className="lg:col-span-2">
            <div className="flex flex-col items-center gap-6 sm:flex-row lg:flex-col lg:items-start">
              <div className="relative shrink-0">
                <div className="surface-shadow flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-black/5 bg-[var(--panel-strong)]">
                  <img
                    src={`${baseUrl}image/avatar/dinosaur.png`}
                    alt="Dell avatar"
                    className="h-full w-full scale-[1.12] object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -right-2 -bottom-2 flex items-center gap-1 rounded-lg border border-black/10 bg-[var(--panel-strong)] px-2 py-1 text-xs font-bold shadow-md">
                  <span className="h-2 w-2 rounded-full bg-[#4ade80] about-pulse" />
                  Lv.99
                </div>
              </div>

              <div className="flex w-full flex-col justify-center pt-2">
                <ProfileTerminal />
              </div>
            </div>
          </WindowPanel>

          <WindowPanel id="stats" title="属性数值 / STATS" chromeColor="rgba(253,153,120,0.66)" className="lg:col-span-3">
            <div className="flex h-full flex-col justify-center gap-2">
              <ProgressBar label="AIGC能力" percentage={80} color="#8FB6D6" />
              <ProgressBar label="影视工程" percentage={85} color="#F6D68F" delay={1200} />
              <ProgressBar label="艺术积累" percentage={70} color="#C5B9FB" delay={2200} />
            </div>
          </WindowPanel>
        </div>

        <WindowPanel id="skills" title="技能面板 / SKILLS" chromeColor="rgba(197,185,251,0.82)">
          <SkillCards />
        </WindowPanel>

        <WindowPanel id="academy" title="学院系统 / ACADEMY" chromeColor="rgba(246,214,143,0.82)">
          <AcademyTerminal />
        </WindowPanel>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <WindowPanel id="mission" title="职场副本 / MISSION" chromeColor="rgba(143,182,214,0.66)">
            <MissionTerminal />
          </WindowPanel>

          <WindowPanel id="trophy" title="游戏成就 / TROPHY" chromeColor="rgba(246,214,143,0.82)">
            <TrophyCards />
          </WindowPanel>
        </div>
      </main>
    </div>
  );
}
