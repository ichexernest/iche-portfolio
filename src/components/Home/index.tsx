import { useEffect, useRef } from 'react';
import {
  animate,
  createScope,
} from 'animejs';

declare global {
  interface Window {
    THREE: unknown;
    VANTA: {
      NET: (options: {
        el: HTMLElement;
        mouseControls: boolean;
        touchControls: boolean;
        gyroControls: boolean;
        backgroundColor: number;
        minHeight: number;
        minWidth: number;
        color: number;
        scale: number;
        scaleMobile: number;
        points: number;
        maxDistance: number;
        spacing: number;
      }) => { destroy: () => void };
      DOTS: (options: {
        el: HTMLElement;
        mouseControls: boolean;
        touchControls: boolean;
        gyroControls: boolean;
        minHeight: number;
        minWidth: number;
        scale: number;
        scaleMobile: number;
        color: number;
        size: number;
        spacing: number;
        backgroundColor: number;
        showLines: boolean;
      }) => { destroy: () => void };
    };
  }
}

const Home = () => {
  const rootRef = useRef<HTMLElement>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<{ destroy: () => void } | null>(null);

  // 滾動動畫
  useEffect(() => {
    const handleScroll = () => {
      const title = document.getElementById('home-title');
      if (!title) return;

      const scrollY = window.scrollY;
      const scale = Math.max(5 - scrollY * 0.005, 0.5);
      const translateY = -scrollY * 0.01;
      const opacity = Math.max(1 - scrollY * 0.006, 0);

      title.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      title.style.opacity = opacity.toString();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 初始動畫
  useEffect(() => {
    if (!rootRef.current) return;

    const scope = createScope({ root: rootRef.current }).add(() => {
      animate(['#home-title'], {
        opacity: [0, 1],
        scale: [5.5, 5],
        duration: 800,
        ease: 'out(2)',
      });
    });

    return () => scope.revert();
  }, []);

  // 動態載入 Vanta.js
  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    const initVanta = async () => {
      try {
        // 檢查是否已載入
        if (!window.THREE) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js');
        }
        if (!window.VANTA) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.dots.min.js');
        }

        // 初始化 Vanta 效果
        if (window.VANTA && vantaRef.current && !vantaEffect.current) {
          vantaEffect.current = window.VANTA.DOTS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1,
            scaleMobile: 1,
            color: 0x5a9fbb,
            size: 1.6,
            spacing: 46,
            backgroundColor: 0x6,
            showLines: false
          });
        }
      } catch (error) {
        console.error('Failed to load Vanta.js:', error);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 py-8 md:px-20 md:py-20 text-center text-white overflow-hidden"
    >
      {/* Vanta.js 背景 */}
      <div
        ref={vantaRef}
        className="absolute inset-0 z-0"
      />

      {/* 主標題 */}
<img
  id="home-title"
  src="/ECFull.svg"
  alt="Ernest Chen"
  className="w-[72px] md:w-[128px] lg:w-[256px] opacity-0 relative z-10"
  style={{ 
    transform: 'scale(5)', 
    transformOrigin: 'center center',
    imageRendering: 'auto'
  }}
/>
    </section>
  );
};

export default Home;