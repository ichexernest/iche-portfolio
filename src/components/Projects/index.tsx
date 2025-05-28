import React, { useRef, useState } from 'react';
import { HiCubeTransparent } from "react-icons/hi2";
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

// 示例數據 - 可以靈活修改
const projectCategories: ProjectCategory[] = [
  {
    id: 'main',
    name: 'Main Projects',
    projects: [
      {
        id: '1',
        title: 'Lexiread',
        description: 'AI-powered English Vocabulary Learning Platform',
        tags: ['React', 'Next.js', 'Prisma', 'SQLite', 'Tailwind CSS'],
        date: '2024-01',
        url: 'https://github.com/ichexernest/lexiread',
        featured: true
      },
            {
        id: '2',
        title: 'LIFF Activity Page',
        description: 'Interactive Event Modules',
        tags: ['React','Canva', 'Tailwind CSS'],
        date: '2024-01',
        url: 'https://github.com/ichexernest/spin-the-wheel',
        featured: true
      },
    ]
  },

];

const ProjectCard: React.FC<{ project: ProjectData; index: number }> = ({ project, index }) => {
  return (
    <Tilt
      className="project-card-tilt"
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      perspective={1000}
      scale={1.02}
      transitionSpeed={1500}
      gyroscope={true}
      glareEnable={true}
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
          transform: 'translateY(30px)'
        }}
      >
        <div className="relative h-48 overflow-hidden">
                    <HiCubeTransparent className="w-24 h-24 absolute left-0 right-0 top-0 bottom-0 m-auto object-cover transition-transform duration-300" />
        </div>
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
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const activeProjects = projectCategories.find(cat => cat.id === activeCategory)?.projects || [];
  const hasMultipleCategories = projectCategories.length > 1;
  
  // RWD: 桌面版顯示3張，手機版顯示1.5張
  const getCardsPerPage = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768 ? 3 : 1.5;
    }
    return 3;
  };
  
  const [cardsPerPage] = useState(getCardsPerPage());
  const totalPages = Math.ceil(activeProjects.length / Math.floor(cardsPerPage));

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory || isAnimating) return;
    
    setIsAnimating(true);
    setActiveCategory(categoryId);
    setCurrentPage(0);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newPage = direction === 'prev' ? Math.max(0, currentPage - 1) : Math.min(totalPages - 1, currentPage + 1);
    setCurrentPage(newPage);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const canNavigate = (direction: 'prev' | 'next') => {
    return direction === 'prev' ? currentPage > 0 : currentPage < totalPages - 1;
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

        {/* 分類選單 - 只有多個分類時才顯示 */}
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

        {/* 專案卡片區域 */}
        <div className="w-full max-w-7xl relative">
          {/* 導航按鈕 */}
          {totalPages > 1 && (
            <>
              <button
                onClick={() => handlePageChange('prev')}
                disabled={!canNavigate('prev') || isAnimating}
                className="absolute shadow-xl left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 p-2 md:p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} className="md:w-6 md:h-6" />
              </button>
              
              <button
                onClick={() => handlePageChange('next')}
                disabled={!canNavigate('next') || isAnimating}
                className="absolute shadow-xl right-0 top-1/2 transform -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 p-2 md:p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} className="md:w-6 md:h-6" />
              </button>
            </>
          )}

          {/* 卡片容器 */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-600 ease-out gap-4 md:gap-8 p-4 md:p-8"
              style={{
                transform: `translateX(-${currentPage * (100 / totalPages)}%)`
              }}
            >
              {activeProjects.map((project, index) => (
                <div key={`${activeCategory}-${project.id}`} className="flex-shrink-0 w-64 md:w-80">
                  <ProjectCard project={project} index={index % Math.floor(cardsPerPage)} />
                </div>
              ))}
            </div>
          </div>

          {/* 頁面指示器 */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 md:mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    i === currentPage ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
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