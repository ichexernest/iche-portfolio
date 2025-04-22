import { useEffect, useRef } from 'react';
import { animate, createScope, createSpring } from 'animejs';

interface SkillBarProps {
  skill: string;
  percentage: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, percentage }) => {
  return (
    <div className="w-4/5 md:w-3/5 max-w-2xl h-8 bg-white bg-opacity-30 rounded-full my-4 overflow-hidden opacity-0 skill-bar">
      <div
        className="h-full bg-white bg-opacity-80 rounded-full flex items-center pl-5 text-gray-800 font-bold"
        style={{ width: '0%' }}
        data-width={percentage}
      >
        {skill}: {percentage}%
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          if (!sectionRef.current) return;
          const scope = createScope({ root: sectionRef.current }).add(() => {
            // Step 1: 動畫淡入 + slide-up 標題與條形
            animate('#skills h1, #skills .skill-bar', {
              opacity: [0, 1],
              translateY: [30, 0],
              delay: (el, i) => i * 150,
              duration: 800,
              ease: createSpring({ stiffness: 250 }),
            });

            // Step 2: 拉伸 width 為進度條效果
            setTimeout(() => {
              const skillBars = document.querySelectorAll('#skills .skill-bar > div');
              skillBars.forEach(el => {
                const width = el.getAttribute('data-width') ?? '0';
                animate(el, {
                  width: [`0%`, `${width}%`],
                  duration: 1000,
                  ease: 'out(3)',
                });
              });
            }, 800 + 150 * 4); // 等待前面動畫跑完再執行
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
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center p-5 md:p-20 text-center"
      style={{ background: 'linear-gradient(135deg, #84fab0, #8fd3f4)' }}
    >
      <h1 className="text-4xl md:text-5xl mb-8 font-bold opacity-0 translate-y-8">
        我的技能
      </h1>

      <div className="w-full flex flex-col items-center">
        <SkillBar skill="HTML/CSS" percentage={90} />
        <SkillBar skill="JavaScript" percentage={85} />
        <SkillBar skill="React" percentage={80} />
        <SkillBar skill="Node.js" percentage={75} />
      </div>
    </section>
  );
};

export default Skills;
