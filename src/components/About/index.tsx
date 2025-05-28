import { useEffect, useRef } from 'react';
import { animate, createScope, createSpring } from 'animejs';
import GlobalTitle from '../Global.title';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

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
              delay: (_el, i) => i * 200,
              duration: 800,
              ease: createSpring({ stiffness: 200 }),
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
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-center text-center text-white bg-[#0D141E]"
    >
      {/* 上方漸層 */}
      <div className="absolute top-0 left-0 right-0 h-20 sm:h-24 md:h-32 z-20 bg-gradient-to-b from-[#000006] to-transparent" />

      {/* 下方漸層 */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 md:h-32 z-20 bg-gradient-to-t from-[#000006] to-transparent" />

      {/* 內容區域 */}
      <div className="w-full flex flex-col items-center justify-center py-24 sm:py-28 md:py-32 lg:py-40 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        <GlobalTitle title="About Me" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-4 sm:space-y-5 md:space-y-6">
          <p className="text-base sm:text-lg md:text-xl leading-relaxed opacity-0 translate-y-8 font-medium">
            Hi, I'm Ernest Chen — a developer driven by curiosity and creativity.
          </p>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed opacity-0 translate-y-8">
            Based in Taipei, I have 5 years of experience in software development. My core skill set includes React, Next.js, Electron, and Flutter, and I specialize in building intuitive and fluid user experiences rooted in product positioning and user needs. Whether it's developing an app from scratch or migrating to a cross-platform architecture, I'm comfortable handling projects end-to-end.
          </p>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed opacity-0 translate-y-8">
            Beyond my role as a developer, I also run a side brand where I'm hands-on with everything from brand strategy and design planning to marketing campaign ideation. This experience has shaped me into someone who not only writes code, but also understands how to connect products with markets — balancing technical depth with business perspective.
          </p>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed opacity-0 translate-y-8">
            I love breaking down complex problems and exploring simple, engaging solutions. I'm also passionate about design and psychology, constantly observing user behavior to better understand the human logic behind interaction.
          </p>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed opacity-0 translate-y-8">
            Outside of work, I'm currently diving into jazz drumming, character design, and 3D modeling — enjoying the freedom of switching between code and creativity, stacking skills along the way.
          </p>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed opacity-0 translate-y-8">
            Right now, I'm continuing to explore the intersection of technology × design × expression, hoping to find a sweet spot where I can channel my experience and passion into meaningful, impactful work.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;