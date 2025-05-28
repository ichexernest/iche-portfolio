import { useEffect, useState } from 'react';

const FlashlightEffect = ()=> {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        background: `radial-gradient(circle 150px at ${position.x}px ${position.y}px, rgba(255,255,255,0.05), transparent 80%)`,
      }}
    />
  );
}


export default FlashlightEffect