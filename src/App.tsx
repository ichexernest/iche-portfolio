import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ScrollProgress from './components/Global.scrollProgress';
import Experience from './components/Experience';
// import FlashlightEffect from './components/Global.lightEffect';

const App: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);


  // Refs for each section
  const homeRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Handle scroll events
  useEffect(() => {
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
  }, [lastScrollTop]);

  return (
    <div className="relative overflow-x-hidden bg-[#0D141E] text-white min-h-screen">
      {/* <FlashlightEffect /> */}
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

