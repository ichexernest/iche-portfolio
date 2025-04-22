import React, { useEffect, useRef } from 'react';

interface AnimatedObjectProps {
  scrollPercentage: number;
  isScrollingDown: boolean;
  currentSection: string;
}

const AnimatedObject: React.FC<AnimatedObjectProps> = ({ 
  scrollPercentage, 
  isScrollingDown,
  currentSection
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!circleRef.current) return;
    
    // Calculate morphing amount based on scroll percentage
    const morphAmount = scrollPercentage / 100;
    const borderRadius = 50 - morphAmount * 35; // From 50% (circle) to 15% (rounded square)
    const scale = 1 + morphAmount * 0.2; // From 1 to 1.2
    
    // Update the circle styles
    circleRef.current.style.borderRadius = `${borderRadius}%`;
    circleRef.current.style.transform = `scale(${scale})`;
    
    // Update background color based on current section
    let bgColor = 'linear-gradient(135deg, #6e8efb, #a777e3)'; // default (home)
    
    switch (currentSection) {
      case 'home':
        bgColor = 'linear-gradient(135deg, #6e8efb, #a777e3)';
        break;
      case 'about':
        bgColor = 'linear-gradient(135deg, #f6d365, #fda085)';
        break;
      case 'skills':
        bgColor = 'linear-gradient(135deg, #84fab0, #8fd3f4)';
        break;
      case 'projects':
        bgColor = 'linear-gradient(135deg, #a6c0fe, #f68084)';
        break;
      case 'contact':
        bgColor = 'linear-gradient(135deg, #d4fc79, #96e6a1)';
        break;
    }
    
    circleRef.current.style.background = bgColor;
  }, [scrollPercentage, isScrollingDown, currentSection]);

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 w-20 h-20 md:w-20 md:h-20 z-30 pointer-events-none">
      <div 
        ref={circleRef}
        className="w-full h-full rounded-full shadow-lg flex justify-center items-center transition-all duration-300"
      >
        <div className="w-3/5 h-3/5 bg-white rounded-full flex justify-center items-center font-bold text-gray-800">
          {Math.round(scrollPercentage)}%
        </div>
      </div>
    </div>
  );
};

export default AnimatedObject;