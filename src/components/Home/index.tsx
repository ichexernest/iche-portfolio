import { useEffect, useRef } from 'react';
import {
  animate,
  createScope,
  createSpring,
  createDraggable
} from 'animejs';

const Home = () => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    // 建立 scope，把動畫作用限定在 rootRef 裡
    const scope = createScope({ root: rootRef.current }).add(scope => {
      // 🎯 淡入動畫
      animate('#home-avatar', {
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 800,
        ease: createSpring({ stiffness: 300 })
      });

      animate(['#home-title', '#home-desc', '#home-btn'], {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: (el, i) => i * 200,
        ease: 'out(2)'
      });

      // ✋ 加上拖曳效果（可選）
      createDraggable('#home-avatar', {
        container: [0, 0, 0, 0],
        releaseEase: createSpring({ stiffness: 200 })
      });
    });

    // ❎ 清理動畫
    return () => scope.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="home"
      className="min-h-screen flex flex-col justify-center items-center p-5 md:p-20 text-center text-white"
      style={{ background: 'linear-gradient(135deg, #6e8efb, #a777e3)' }}
    >
      <div id="home-avatar" className="w-36 h-36 rounded-full bg-white mb-8 overflow-hidden opacity-0">
        <img src="/api/placeholder/150/150" alt="個人頭像" className="w-full h-full object-cover" />
      </div>

      <h1 id="home-title" className="text-4xl md:text-5xl mb-5 font-bold opacity-0 translate-y-8">
        歡迎來到我的個人網站
      </h1>

      <p id="home-desc" className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-0 translate-y-8">
        我是一位網頁開發者，專注於創造令人驚艷的使用者體驗
      </p>

      <button
        id="home-btn"
        className="px-6 py-3 bg-gray-800 text-white rounded opacity-0 translate-y-8"
        onClick={() => document.querySelector('#about')?.scrollIntoView()}
      >
        了解更多
      </button>
    </section>
  );
};

export default Home;
