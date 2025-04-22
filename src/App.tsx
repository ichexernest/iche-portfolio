import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AnimatedObject from './components/AnimatedObject';
import ScrollProgress from './components/ScrollProgress';

const App: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);
  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(true);
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [currentSection, setCurrentSection] = useState<string>('home');

  // Refs for each section
  const homeRef = useRef<HTMLDivElement>(null);
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
      
      // Determine scroll direction
      setIsScrollingDown(scrollPosition > lastScrollTop);
      setLastScrollTop(scrollPosition);
      
      // Determine current section
      const sections = [
        { id: 'home', ref: homeRef },
        { id: 'about', ref: aboutRef },
        { id: 'skills', ref: skillsRef },
        { id: 'projects', ref: projectsRef },
        { id: 'contact', ref: contactRef },
      ];
      
      for (const section of sections) {
        if (!section.ref.current) continue;
        
        const sectionTop = section.ref.current.offsetTop - 100;
        const sectionBottom = sectionTop + section.ref.current.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setCurrentSection(section.id);
          break;
        }
      }
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
    <div className="relative overflow-x-hidden">
      <Navbar />
      
      <AnimatedObject 
        scrollPercentage={scrollPercentage} 
        isScrollingDown={isScrollingDown}
        currentSection={currentSection}
      />
      
      <ScrollProgress scrollPercentage={scrollPercentage} />
      
      <div ref={homeRef}>
        <Home />
      </div>
      
      <div ref={aboutRef}>
        <About />
      </div>
      
      <div ref={skillsRef}>
        <Skills />
      </div>
      
      <div ref={projectsRef}>
        <Projects />
      </div>
      
      {/* <div ref={contactRef}>
        <Contact />
      </div> */}
    </div>
  );
};

export default App;

