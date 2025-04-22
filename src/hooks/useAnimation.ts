import { useRef, useEffect } from 'react';
import {
  animate,
  createScope,
  createSpring,
  createTimeline,
  createDraggable,
} from 'animejs';

export const useAnimation = (
  rootRef: React.RefObject<HTMLElement | null>
) => {
  const scopeRef = useRef<any>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    scopeRef.current = createScope({ root: rootRef.current }).add(scope => {
      // Example: 淡入動畫
      scope.add('fadeIn', (selector: string) => {
        animate(selector, {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 800,
          ease: createSpring({ stiffness: 300 }),
        });
      });

      // Example: 可加 spring loop 或 draggable
      scope.add('draggableAvatar', () => {
        createDraggable('#home-avatar', {
          container: [0, 0, 0, 0],
          releaseEase: createSpring({ stiffness: 200 }),
        });
      });
    });

    return () => scopeRef.current?.revert();
  }, [rootRef]);

  return {
    animate: (method: string, ...args: any[]) => {
      scopeRef.current?.methods[method]?.(...args);
    }
  };
};
