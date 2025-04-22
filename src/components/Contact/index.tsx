import React, { useEffect, useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { useAnimation } from '../../hooks/useAnimation';

interface SocialIconProps {
  name: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ name }) => {
  return (
    <div className="w-12 h-12 bg-white rounded-full flex justify-center items-center m-2 text-xl font-bold opacity-0 transform translate-y-5">
      {name}
    </div>
  );
};

const Contact: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { threshold: 0.2 });
  const { animateIn } = useAnimation();

  useEffect(() => {
    if (inView) {
      animateIn('#contact h1, #contact p', { 
        opacity: [0, 1], 
        translateY: [30, 0],
        delay: (el, i) => i * 200
      });
      
      animateIn('#contact .social-icon', { 
        opacity: [0, 1],
        translateY: [20, 0],
        delay: (el, i) => i * 100
      });
    }
  }, [inView, animateIn]);

  return (
    <section 
      id="contact" 
      ref={ref}
      className="min-h-screen flex flex-col justify-center items-center p-5 md:p-20 text-center"
      style={{ background: 'linear-gradient(135deg, #d4fc79, #96e6a1)' }}
    >
      <h1 className="text-4xl md:text-5xl mb-5 font-bold opacity-0 transform translate-y-8">
        聯絡我
      </h1>
      
      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-0 transform translate-y-8">
        如果您對我的作品感興趣，或者想探討合作機會，請隨時與我聯絡！
      </p>
      
      <div className="flex justify-center flex-wrap mt-8">
        <div className="social-icon">
          <SocialIcon name="FB" />
        </div>
        <div className="social-icon">
          <SocialIcon name="IG" />
        </div>
        <div className="social-icon">
          <SocialIcon name="LI" />
        </div>
        <div className="social-icon">
          <SocialIcon name="GH" />
        </div>
      </div>
    </section>
  );
};

export default Contact;