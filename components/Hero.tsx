
import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronRight, Play } from 'lucide-react';
import HeroCanvas from './HeroCanvas';

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
      {/* Layer 0: Background Video */}
      <motion.div className="absolute inset-0 z-0" style={{ y: y1 }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/hero/Hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Layer 1: Interactive Canvas (particles + grid + mouse glow) */}
      <HeroCanvas />

      {/* Layer 2: Content */}
      <motion.div 
        className="relative z-10 text-left px-10 md:px-20 max-w-7xl mx-auto w-full pt-20"
        style={{ y: y2, rotateX, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '80px' }}
          transition={{ duration: 1, delay: 0.1 }}
          className="h-[2px] bg-[#FFC700] mb-8"
        />

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
          className="text-white/70 text-base md:text-xl max-w-2xl mb-12 font-inter font-light leading-relaxed"
        >
          CoreNav Private Limited builds intelligent navigation systems for autonomous machines to move, think, and act in the real world.
          <span className="block mt-2 text-[#FFC700] font-black uppercase text-xs tracking-[0.3em]">
            Surgical precision for the robotics age.
          </span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-start gap-4"
        >
          <a
            href="mailto:info@corenav.com"
            className="cta-button px-10 py-4 bg-white text-black font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-[#FFC700] hover:text-black transition-all duration-500 rounded-sm"
            data-cta="true"
          >
            Get In Touch
          </a>
          
          <button 
            onClick={onStart}
            className="cta-button px-10 py-4 bg-[#FF5C00] text-white font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 rounded-sm shadow-xl shadow-orange-500/20"
            data-cta="true"
          >
            View Products
          </button>
        </motion.div>
      </motion.div>

      {/* Layer 3: Industrial Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none tech-grid opacity-10 z-[6]" />

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 font-inter">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
