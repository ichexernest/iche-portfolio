import React from 'react';

interface ScrollProgressProps {
  scrollPercentage: number;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ scrollPercentage }) => {
  return (
    <div 
      className="fixed left-0 bottom-0 h-1 z-40"
      style={{ 
        width: `${scrollPercentage}%`,
        background: 'linear-gradient(90deg, #ffffff, #70c9eb)'
      }}
    ></div>
  );
};

export default ScrollProgress;