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
  const containerRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const leftWingRef = useRef<HTMLDivElement>(null);
  const rightWingRef = useRef<HTMLDivElement>(null);
  const fireRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !headRef.current ||
      !bodyRef.current ||
      !leftWingRef.current ||
      !rightWingRef.current ||
      !fireRef.current
    ) return;

    // 整體升空位移
    const lift = scrollPercentage > 30 && scrollPercentage <= 70
      ? (scrollPercentage - 30) * 3
      : scrollPercentage > 70 ? 120 : 0;
    containerRef.current.style.transform = `translateY(-${lift}px)`;

    // 抖動
    if (scrollPercentage > 10 && scrollPercentage <= 30) {
      const shake = Math.sin(scrollPercentage * 10) * 3;
      bodyRef.current.style.transform = `translateY(${shake}px) scale(1.05)`;
      fireRef.current.style.opacity = '1';
      fireRef.current.style.height = '20px';
    }

    // 拆解
    if (scrollPercentage > 70) {
      headRef.current.style.transform = `translateY(-50px)`;
      leftWingRef.current.style.transform = `translateX(-40px) rotate(-20deg)`;
      rightWingRef.current.style.transform = `translateX(40px) rotate(20deg)`;
      fireRef.current.style.opacity = '0';
    } else {
      // 重置
      headRef.current.style.transform = '';
      leftWingRef.current.style.transform = '';
      rightWingRef.current.style.transform = '';
    }

    // 火焰拉長
    if (scrollPercentage > 30 && scrollPercentage <= 70) {
      fireRef.current.style.height = `${20 + (scrollPercentage - 30) * 2}px`;
      fireRef.current.style.opacity = '1';
    }

  }, [scrollPercentage]);

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 w-20 h-60 z-30 pointer-events-none flex flex-col items-center">
      <div ref={containerRef} className="relative flex flex-col items-center transition-all duration-300">
        {/* 頭部 */}
        <div
          ref={headRef}
          className="w-8 h-8 bg-white rounded-full z-10 transition-all duration-500"
        ></div>

        {/* 主體 */}
        <div
          ref={bodyRef}
          className="w-8 h-20 bg-gray-200 rounded-md relative z-0 transition-all duration-200"
        >
          {/* 翅膀 */}
          <div
            ref={leftWingRef}
            className="absolute left-[-16px] top-6 w-4 h-6 bg-gray-400 rotate-[-30deg] transition-all duration-500"
          ></div>
          <div
            ref={rightWingRef}
            className="absolute right-[-16px] top-6 w-4 h-6 bg-gray-400 rotate-[30deg] transition-all duration-500"
          ></div>
        </div>

        {/* 火焰 */}
        <div
          ref={fireRef}
          className="w-4 bg-gradient-to-b from-yellow-300 to-red-600 rounded-full transition-all duration-200 mt-1"
          style={{ height: '0px', opacity: 0 }}
        ></div>
      </div>

      {/* 百分比顯示 */}
      <div className="mt-4 text-white font-bold text-sm opacity-70">
        {Math.round(scrollPercentage)}%
      </div>
    </div>
  );
};

export default AnimatedObject;
