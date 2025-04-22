import { useEffect, useRef } from 'react';
import { animate, createScope, createSpring } from 'animejs';

interface ProjectCardProps {
  title: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description }) => {
  return (
    <div className="bg-white bg-opacity-20 p-5 rounded-lg m-2 w-full sm:w-64 md:w-80 opacity-0 scale-90 project-card">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const scope = createScope({ root: sectionRef.current! }).add(() => {
            // Step 1: Title 淡入 + slide-up
            animate('#projects h1', {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              ease: createSpring({ stiffness: 250 }),
            });

            // Step 2: Project Cards 縮放進場
            animate('#projects .project-card', {
              opacity: [0, 1],
              scale: [0.8, 1],
              delay: (el, i) => i * 200,
              duration: 800,
              easing: 'easeOutExpo',
            });
          });

          return () => scope.revert();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center p-5 md:p-20 text-center"
      style={{ background: 'linear-gradient(135deg, #a6c0fe, #f68084)' }}
    >
      <h1 className="text-4xl md:text-5xl mb-10 font-bold opacity-0 translate-y-8">
        我的作品
      </h1>

      <div className="flex flex-wrap justify-center max-w-4xl w-full">
        <ProjectCard
          title="電商網站"
          description="使用 React 與 Node.js 打造的全功能電子商務平台"
        />
        <ProjectCard
          title="社群應用"
          description="整合實時聊天功能的社群媒體網站"
        />
        <ProjectCard
          title="數據視覺化工具"
          description="使用 D3.js 開發的互動式數據視覺化工具"
        />
      </div>
    </section>
  );
};

export default Projects;
