import { useEffect, useRef } from 'react';
import { animate, createScope, createSpring } from 'animejs';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false); // 確保只執行一次動畫

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const scope = createScope({ root: sectionRef.current! }).add(() => {
            animate('#about h1, #about p', {
              opacity: [0, 1],
              translateY: [30, 0],
              delay: (el, i) => i * 200,
              duration: 800,
              ease: createSpring({ stiffness: 200 }),
            });
          });

          // 避免動畫還沒結束就 unmount，要清理
          return () => scope.revert();
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center p-5 md:p-20 text-center"
      style={{ background: 'linear-gradient(135deg, #f6d365, #fda085)' }}
    >
      <h1 className="text-4xl md:text-5xl mb-5 font-bold opacity-0 translate-y-8">
        關於我
      </h1>

      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-0 translate-y-8">
        我擁有多年的網頁開發經驗，熱衷於利用最新技術創造互動性強的網站。我專注於前端開發，尤其喜歡使用 JavaScript 動畫庫來增強用戶體驗。
      </p>

      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-0 translate-y-8">
        在閒暇時間，我喜歡研究新技術，參與開源項目，以及幫助他人解決程式相關問題。
      </p>
    </section>
  );
};

export default About;
