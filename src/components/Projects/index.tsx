import React, { useRef, useState, useEffect } from 'react';
import { HiCubeTransparent } from "react-icons/hi2";
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import GlobalTitle from '../Global.title';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  url: string;
  featured?: boolean;
}

interface ProjectCategory {
  id: string;
  name: string;
  projects: ProjectData[];
}

const projectCategories: ProjectCategory[] = [
  {
    id: 'main',
    name: 'Main Projects',
    projects: [
      {
        id: '1',
        title: 'Lexiread',
        description: 'An interactive language-learning platform that boosts vocabulary through reading, AI-powered word lookup, and quiz-based practice.',
        tags: ['React', 'Next.js', 'Prisma', 'SQLite', 'Tailwind CSS'],
        date: '2025-06',
        url: 'https://github.com/ichexernest/lexiread',
        featured: true
      },
      {
        id: '2',
        title: 'LIFF Event Module',
        description: 'A modular and customizable framework for LINE marketing campaigns, ideal for brand promotions and interactive events.',
        tags: ['React', 'Next.js', 'Prisma', 'SQLite', 'Tailwind CSS'],
        date: '2025-06',
        url: 'https://github.com/ichexernest/line-event-module',
        featured: true
      },
    ]
  },
];

const ProjectCard: React.FC<{ project: ProjectData; index: number }> = ({ project, index }) => {
  return (
    <Tilt
      className="project-card-tilt select-none border-1 border-white/15" 
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      perspective={1000}
      scale={1.02}
      transitionSpeed={1500}
      gyroscope
      glareEnable
      glareMaxOpacity={0.2}
      glareColor="#70c9eb"
      glarePosition="all"
      glareBorderRadius="16px"
    >
      <div
        onClick={() => window.open(project.url, '_blank')}
        className="overflow-hidden cursor-pointer h-96 relative hover:bg-[#000006] hover:rounded-2xl hover:shadow-lg"
        style={{
          animationDelay: `${index * 0.1}s`,
          animation: 'slideInUp 0.6s ease-out forwards',
          opacity: 0,
          transform: 'translateY(30px)',
        }}
      >
        {/* Card 右上角的連結 icon */}
        <div className="absolute top-4 right-4">
          <ExternalLink className="w-6 h-6 text-white/70 transition-transform hover:scale-140" />
        </div>

        {/* 主圖示區塊 */}
        <div className="relative h-48 overflow-hidden">
          <HiCubeTransparent className="w-24 h-24 absolute inset-0 m-auto transition-transform duration-300 hover:scale-105" />
        </div>

        {/* 文字內容 */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white truncate">{project.title}</h3>
          <p className="text-white/70 text-sm mb-4 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center px-2 py-1 text-white/70 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Tilt>
  );
};

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState(projectCategories[0]?.id || '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  
  const activeProjects = projectCategories.find(cat => cat.id === activeCategory)?.projects || [];
  const hasMultipleCategories = projectCategories.length > 1;
  
  // 檢測螢幕寬度
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    
    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  // 根據螢幕寬度計算可見卡片數量
  const getVisibleCards = () => {
    if (screenWidth >= 1200) return 3; // 大螢幕顯示3張
    if (screenWidth >= 768) return 2;  // 中等螢幕顯示2張
    return 1; // 小螢幕顯示1張
  };

  const visibleCards = getVisibleCards();
  const maxIndex = Math.max(0, activeProjects.length - visibleCards);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory || isAnimating) return;
    
    setIsAnimating(true);
    setActiveCategory(categoryId);
    setCurrentIndex(0);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (direction === 'prev') {
      setCurrentIndex(Math.max(0, currentIndex - 1));
    } else {
      setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
    }
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  const canNavigate = (direction: 'prev' | 'next') => {
    return direction === 'prev' ? currentIndex > 0 : currentIndex < maxIndex;
  };

  // 計算每張卡片的寬度 (包含間距)
  const getCardWidth = () => {
    if (screenWidth >= 768) {
      return 320 + 32; // w-80 (320px) + gap-8 (32px)
    } else {
      return 256 + 16; // w-64 (256px) + gap-4 (16px)
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .project-card-tilt {
          height: 24rem;
          border-radius: 1rem;
          transition: box-shadow 0.3s ease-out;
        }
        
        .project-card-tilt:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
      
      <section
        id="projects"
        ref={sectionRef}
        className="min-h-screen flex flex-col justify-center items-center p-5 md:p-20 text-center bg-[#000006] text-white relative overflow-hidden"
      >
        <GlobalTitle title="Projects" />
        <div className="my-10" />

        {hasMultipleCategories && (
          <div className="flex flex-wrap justify-center bg-white/10 rounded-full gap-2 md:gap-4 mb-8 md:mb-12 p-2">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-3 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base ${
                  activeCategory === category.id
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-opacity-20 text-slate-500 hover:bg-opacity-30'
                }`}
                disabled={isAnimating}
              >
                {category.name}
                <span className="ml-1 md:ml-2 text-xs md:text-sm opacity-75">
                  ({category.projects.length})
                </span>
              </button>
            ))}
          </div>
        )}


        <div className="w-full max-w-7xl relative">

          {activeProjects.length > visibleCards && (
            <>
              <button
                onClick={() => handleNavigation('prev')}
                disabled={!canNavigate('prev') || isAnimating}
                className="absolute shadow-xl left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 p-2 md:p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} className="md:w-6 md:h-6" />
              </button>
              
              <button
                onClick={() => handleNavigation('next')}
                disabled={!canNavigate('next') || isAnimating}
                className="absolute shadow-xl right-0 top-1/2 transform -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 p-2 md:p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} className="md:w-6 md:h-6" />
              </button>
            </>
          )}


          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-out gap-4 md:gap-8 p-4 md:p-8"
              style={{
                transform: `translateX(-${currentIndex * getCardWidth()}px)`,
                width: `${activeProjects.length * getCardWidth()}px`
              }}
            >
              {activeProjects.map((project, index) => (
                <div 
                  key={`${activeCategory}-${project.id}`} 
                  className="flex-shrink-0 w-64 md:w-80"
                >
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </div>


          {activeProjects.length > visibleCards && (
            <div className="flex justify-center mt-6 md:mt-8 space-x-2">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

      </section>
    </>
  );
};

export default Projects;