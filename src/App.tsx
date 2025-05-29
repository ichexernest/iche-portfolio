import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ScrollProgress from './components/Global.scrollProgress';
import Experience from './components/Experience';
import SvgLogo from './components/SVGLogo';
// import FlashlightEffect from './components/Global.lightEffect';

//mobile: Project card

const LoadingScreen: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  return (
    <div 
      className={`fixed inset-0 bg-[#0D141E] flex items-center justify-center z-50 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
        <SvgLogo />
    </div>
  );
};


const App: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);


  // Refs for each section
  const homeRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
    // 立即設置頁面到頂部並禁用滾動
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Loading 完成後恢復滾動並確保在頂部
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      window.scrollTo(0, 0);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Handle scroll events
  useEffect(() => {
    // 如果還在 loading，不處理滾動事件
    if (isLoading) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const calculatedScrollPercentage = Math.min((scrollPosition / pageHeight) * 100, 100);

      setScrollPercentage(calculatedScrollPercentage);
      setLastScrollTop(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // Initial call to set initial values
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [lastScrollTop, isLoading]);

  return (
    <div className="relative overflow-x-hidden bg-[#0D141E] text-white min-h-screen">
      {/* <FlashlightEffect /> */}
      <LoadingScreen isVisible={isLoading} />
      <Navbar />

      <ScrollProgress scrollPercentage={scrollPercentage} />

      <div ref={homeRef}>
        <Home />
      </div>

      <div ref={aboutRef}>
        <About />
      </div>

      <div ref={experienceRef}>
        <Experience />
      </div>

      <div ref={skillsRef}>
        <Skills />
      </div>

      <div ref={projectsRef}>
        <Projects />
      </div>

      <div ref={contactRef}>
        <Contact />
      </div>

      <div className="mt-6 flex justify-center space-x-6 pb-4 text-sm">
        <p>{new Date().getFullYear()} © Ernest Chen. CC BY-NC-SA 4.0. </p>
      </div>
    </div>
  );
};

export default App;

