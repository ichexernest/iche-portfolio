import { useState, useEffect, RefObject } from 'react';

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useInView = (
  ref: RefObject<Element |null> ,
  options: InViewOptions = { threshold: 0.1 }
) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref || !ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);
    
    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return inView;
};