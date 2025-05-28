'use client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import {
  SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss,
  SiNextdotjs, SiElectron, SiFigma, SiFlutter, SiNodedotjs,
  SiPrisma, SiBootstrap, SiVite, SiGit, SiDotnet, SiDart,
  SiPostgresql, SiMongodb, SiRedis, SiDocker, SiPython,
  SiAdobepremierepro, SiBlender, SiSwr, SiWordpress
} from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";
import { DiMsqlServer } from "react-icons/di";
import { FiTool } from 'react-icons/fi';

// Global Title Component
const GlobalTitle = ({ title }: { title: string }) => (
  <h2 className="text-4xl md:text-6xl font-bold text-white text-center">
    {title}
  </h2>
);

// Icon mapping
const iconMap = {
  SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiTailwindcss,
  SiNextdotjs, SiElectron, SiFigma, SiFlutter, SiNodedotjs,
  SiPrisma, SiBootstrap, SiVite, SiGit, SiDotnet, SiDart,
  SiPostgresql, SiMongodb, SiRedis, SiDocker, SiPython,
  SiAdobepremierepro, SiBlender, SiSwr, SiWordpress, TbBrandCSharp, DiMsqlServer
};

// Skill categories data
const skillCategories: Array<{
  title: string;
  skills: Array<{ name: string; iconKey: keyof typeof iconMap }>
}> = [
  {
    title: 'Foundation',
    skills: [
      { name: 'React', iconKey: 'SiReact' },
      { name: 'TypeScript', iconKey: 'SiTypescript' },
      { name: 'JavaScript', iconKey: 'SiJavascript' },
      { name: 'HTML5', iconKey: 'SiHtml5' },
      { name: 'CSS3', iconKey: 'SiCss3' },
      { name: 'Tailwind CSS', iconKey: 'SiTailwindcss' },
      { name: 'Next.js', iconKey: 'SiNextdotjs' },
      { name: 'Electron', iconKey: 'SiElectron' },
      { name: 'Figma', iconKey: 'SiFigma' },
      { name: 'Flutter', iconKey: 'SiFlutter' },
    ]
  },
  {
    title: 'Experienced',
    skills: [
      { name: 'Node.js', iconKey: 'SiNodedotjs' },
      { name: 'SQL Server', iconKey: 'DiMsqlServer' },
      { name: 'Prisma', iconKey: 'SiPrisma' },
      { name: 'Bootstrap', iconKey: 'SiBootstrap' },
      { name: 'Vite', iconKey: 'SiVite' },
      { name: 'Git', iconKey: 'SiGit' },
      { name: 'ASP.NET Core', iconKey: 'SiDotnet' },
      { name: 'Dart', iconKey: 'SiDart' },
      { name: 'C#', iconKey: 'TbBrandCSharp' }
    ]
  },
  {
    title: 'Exploring',
    skills: [
      { name: 'PostgreSQL', iconKey: 'SiPostgresql' },
      { name: 'MongoDB', iconKey: 'SiMongodb' },
      { name: 'Redis', iconKey: 'SiRedis' },
      { name: 'Docker', iconKey: 'SiDocker' },
      { name: 'Python', iconKey: 'SiPython' },
      { name: 'SWR', iconKey: 'SiSwr' }
    ]
  },
  {
    title: 'Crossover',
    skills: [
      { name: 'Adobe Premiere', iconKey: 'SiAdobepremierepro' },
      { name: 'Blender', iconKey: 'SiBlender' },
      { name: 'WordPress', iconKey: 'SiWordpress' }
    ]
  }
];

// Simplified SkillBar component
interface SkillBarProps {
  name: string;
  iconKey: keyof typeof iconMap;
}

const SkillBar = ({ name, iconKey }: SkillBarProps) => {
  const Icon = iconMap[iconKey] || FiTool;

  return (
    <div className="w-full aspect-square flex flex-col items-center justify-center text-white/70 rounded-lg p-4 transition-all duration-200 hover:bg-white/10 hover:text-white cursor-pointer">
      <Icon size={48} className="mb-2" />
      <span className="text-center text-sm">{name}</span>
    </div>
  );
};

// Vanta.js hook
interface VantaEffect {
  destroy: () => void;
}

const useVantaEffect = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [vantaEffect, setVantaEffect] = useState<VantaEffect | null>(null);

  useEffect(() => {
    if (vantaEffect || !ref.current) return;


        const loadScript = (src: string) => {
      return new Promise<void>((resolve) => {
        if (src.includes('three.min.js') && window.THREE) {
          resolve(void 0);
          return;
        }
        if (src.includes('vanta.net.min.js') && window.VANTA) {
          resolve(void 0);
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };


    const initVanta = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js');

        if (window.VANTA && ref.current) {
          const effect = window.VANTA.NET({
            el: ref.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            backgroundColor: 0x6,
            minHeight: 200,
            minWidth: 200,
            color: 0x5a9fbb,
            scale: 1,
            scaleMobile: 1,
            points: 11,
            maxDistance: 15,
            spacing: 19
          }) as VantaEffect;
          setVantaEffect(effect);
        }
      } catch (error) {
        console.error('Failed to load Vanta.js:', error);
      }
    };

    initVanta();
  }, [ref, vantaEffect]);

  return vantaEffect;
};

// Scroll control hook
const useScrollControl = (
  sectionRef: React.RefObject<HTMLElement>,
  stickyRef: React.RefObject<HTMLElement>,
  activeCategory: number,
  setActiveCategory: React.Dispatch<React.SetStateAction<number>>,
  setIsSticky: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const lastScrollTime = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isTransitioning = useRef(false);

  useEffect(() => {
    const SCROLL_DELAY = 800;
    const SNAP_THRESHOLD = 150;
    const maxIdx = skillCategories.length - 1;

    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current || !stickyRef.current || isTransitioning.current) return;

      const secRect = sectionRef.current.getBoundingClientRect();
      const stickRect = stickyRef.current.getBoundingClientRect();
      const dir = e.deltaY > 0 ? 1 : -1;
      const now = Date.now();

      // Snap to section
      if (secRect.top > -SNAP_THRESHOLD && secRect.top < SNAP_THRESHOLD && Math.abs(stickRect.top) > 5) {
        e.preventDefault();
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsSticky(true);
        return;
      }

      const isCurrentlySticky = Math.abs(stickRect.top) <= 1;
      setIsSticky(isCurrentlySticky);

      if (!isCurrentlySticky) return;

      // Throttle scrolling
      if (now - lastScrollTime.current < SCROLL_DELAY) {
        e.preventDefault();
        return;
      }

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      if (dir > 0) {
        if (activeCategory < maxIdx) {
          e.preventDefault();
          lastScrollTime.current = now;
          isTransitioning.current = true;
          
          // 立即設置過渡狀態，避免 hover 卡頓
          setTimeout(() => {
            setActiveCategory((prev: number) => prev + 1);
            // 給予足夠時間讓過渡完成
            setTimeout(() => {
              isTransitioning.current = false;
            }, 300);
          }, 50);
        } else {
          const nextElement = sectionRef.current?.nextElementSibling;
          if (nextElement) {
            setIsSticky(false);
            nextElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      } else {
        if (activeCategory > 0) {
          e.preventDefault();
          lastScrollTime.current = now;
          isTransitioning.current = true;
          
          // 立即設置過渡狀態，避免 hover 卡頓
          setTimeout(() => {
            setActiveCategory((prev: number) => prev - 1);
            // 給予足夠時間讓過渡完成
            setTimeout(() => {
              isTransitioning.current = false;
            }, 300);
          }, 50);
        } else {
          const prevElement = sectionRef.current?.previousElementSibling;
          if (prevElement) {
            setIsSticky(false);
            prevElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [activeCategory, sectionRef, stickyRef, setActiveCategory, setIsSticky]);
};

const SkillsPage = () => {
  const sectionRef = useRef<HTMLElement>(null!);
  const stickyRef = useRef<HTMLDivElement>(null!);
  const vantaRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [mobileSkillIndex, setMobileSkillIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Custom hooks
  useVantaEffect(vantaRef);
  useScrollControl(sectionRef, stickyRef, activeCategory, setActiveCategory, setIsSticky);

  // 監聽類別變化，設置過渡狀態
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [activeCategory]);

  // Mobile navigation functions
  const currentSkills = skillCategories[activeCategory].skills;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(currentSkills.length / itemsPerPage);
  const currentPage = Math.floor(mobileSkillIndex / itemsPerPage);
  const canScrollUp = currentPage > 0;
  const canScrollDown = currentPage < totalPages - 1;

  const handleMobileScrollUp = () => {
    if (canScrollUp) {
      setMobileSkillIndex(prev => Math.max(0, prev - itemsPerPage));
    }
  };

  const handleMobileScrollDown = () => {
    if (canScrollDown) {
      setMobileSkillIndex(prev => prev + itemsPerPage);
    }
  };

  // Get current page skills
  const getCurrentPageSkills = () => {
    const startIndex = mobileSkillIndex;
    const endIndex = Math.min(startIndex + itemsPerPage, currentSkills.length);
    return currentSkills.slice(startIndex, endIndex);
  };

  // Reset mobile index when category changes
  React.useEffect(() => {
    setMobileSkillIndex(0);
  }, [activeCategory]);

  const handleCategoryClick = (idx: number) => {
    if (idx !== activeCategory) {
      setIsTransitioning(true);
      setActiveCategory(idx);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200);
    }
  };

  return (
    <section ref={sectionRef} id="skills" className="relative min-h-screen">
      <div ref={vantaRef} className="absolute inset-0 z-0" />
      <div className="sticky top-0 h-screen overflow-hidden" ref={stickyRef}>
        <div className="h-full flex">
          {/* Left - Skills Grid */}
          <div className="w-1/2 flex items-center justify-center p-6 md:p-24">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl w-full h-full p-4 md:p-10 flex flex-col relative">
              {/* Desktop Grid - Horizontal Layout */}
              <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-6 w-full h-auto">
                {skillCategories[activeCategory].skills.map(({ name, iconKey }) => (
                  <SkillBar key={name} name={name} iconKey={iconKey} />
                ))}
              </div>

              {/* Mobile Vertical List (4 items per page) */}
              <div className="md:hidden flex flex-col h-full relative">
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-full max-w-xs space-y-4">
                    {getCurrentPageSkills().map(({ name, iconKey }) => (
                      <SkillBar key={name} name={name} iconKey={iconKey} />
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows - Fixed at bottom */}
                {currentSkills.length > itemsPerPage && (
                  <div className="flex justify-between w-full max-w-xs mx-auto pb-4">
                    <button
                      onClick={handleMobileScrollUp}
                      className={`p-3 rounded-full transition-all duration-200 ${canScrollUp
                          ? 'bg-white/20 text-white hover:bg-white/30'
                          : 'bg-white/5 text-white/30 cursor-not-allowed'
                        }`}
                      disabled={!canScrollUp}
                    >
                      <ChevronUp className="w-3 h-3" />
                    </button>

                    <span className="text-white/60 self-center text-sm">
                      {currentPage + 1}
                    </span>

                    <button
                      onClick={handleMobileScrollDown}
                      className={`p-3 rounded-full transition-all duration-200 ${canScrollDown
                          ? 'bg-white/20 text-white hover:bg-white/30'
                          : 'bg-white/5 text-white/30 cursor-not-allowed'
                        }`}
                      disabled={!canScrollDown}
                    >
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right - Categories */}
          <div className="w-1/2 h-full flex flex-col justify-center items-center p-4 md:p-10">
            <GlobalTitle title="Skills" />

            <div className="space-y-4 md:space-y-6 w-full max-w-sm mt-10">
              {skillCategories.map((cat, idx) => (
                <div
                  key={cat.title}
                  className={`flex items-center p-4 md:p-6 space-x-4 rounded-2xl cursor-pointer transition-all duration-300 ease-out ${
                    activeCategory === idx
                      ? 'bg-gradient-to-r from-transparent via-[#0D141E] to-transparent bg-opacity-20 scale-105 shadow-lg '
                      : 'bg-transparent bg-opacity-10 hover:bg-opacity-20 hover:scale-102'
                  } ${isTransitioning ? 'pointer-events-none' : ''}`}
                  onClick={() => handleCategoryClick(idx)}
                >
                  <h4 className={`font-semibold transition-all duration-300 ${
                    activeCategory === idx
                      ? 'pl-2 md:pl-6 text-white text-xl md:text-3xl'
                      : 'text-slate-500 text-lg md:text-xl'
                  }`}>
                    {cat.title}
                  </h4>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-12 text-white opacity-60 flex flex-col items-center">
              <div className={`w-1 h-12 md:h-16 bg-gradient-to-b from-transparent via-white to-transparent mb-2 transition-opacity duration-300 ${isSticky ? 'opacity-60' : 'opacity-30'
                }`} />
              <p className="text-xs md:text-sm">scroll</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsPage;