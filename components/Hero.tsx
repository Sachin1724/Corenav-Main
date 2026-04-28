
import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, Play } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const rotateX = useTransform(scrollY, [0, 500], [0, 10]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden perspective-[1500px]">
      {/* Background Video */}
      <motion.div className="absolute inset-0 z-0" style={{ y: y1 }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      <motion.div 
        className="relative z-10 text-left px-10 md:px-20 max-w-7xl mx-auto w-full pt-20"
        style={{ y: y2, rotateX, opacity }}
      >
        <motion.h1 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-7xl md:text-[8rem] xl:text-[10rem] font-bold leading-[0.85] mb-8 tracking-tighter text-white font-sans uppercase"
        >
          Precision<br />
          Engineered<br />
          for Reliability
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white text-base md:text-xl max-w-2xl mb-12 font-black uppercase tracking-widest leading-relaxed italic"
        >
          CoreNav builds intelligent navigation systems for autonomous machines to move, think, and act in the real world. 
          Surgical precision for the robotics age.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-start gap-4"
        >
          <button 
            onClick={onStart}
            className="px-10 py-4 bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] hover:orange-bg hover:text-white transition-all duration-500 rounded-sm"
          >
            Get In Touch
          </button>
          
          <button 
            onClick={onStart}
            className="px-10 py-4 bg-orange-bg text-white font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 rounded-sm shadow-xl shadow-orange-500/20"
          >
            View Products
          </button>
        </motion.div>
      </motion.div>

      {/* Industrial Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none tech-grid opacity-10" />
    </section>
  );
};

export default Hero;
