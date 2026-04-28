import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';

const timelineData = [
  {
    id: 'stage1',
    year: 'PHASE I',
    title: 'Research & Incubation',
    content: 'Incubated at BPUT Rourkela, CoreNav began as a research-driven initiative focused on autonomous navigation systems.'
  },
  {
    id: 'stage2',
    year: 'PHASE II',
    title: 'Company Formation',
    content: 'CoreNav Private Limited was established with support from STPI, building a strong foundation in India’s deep-tech ecosystem.'
  },
  {
    id: 'stage3',
    year: 'PHASE III',
    title: 'Technology Development',
    content: 'Development of AI-driven navigation systems, integrating perception, decision-making, and real-time control.'
  },
  {
    id: 'stage4',
    year: 'PHASE IV',
    title: 'Product Ecosystem',
    content: 'Expanding into drones, robotics, and autonomous mobility platforms powered by a unified intelligence layer.'
  }
];

const HexagonNode = ({ isActive, isHovered }: { isActive: boolean; isHovered: boolean }) => (
  <div className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10">
    <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 z-10 transition-transform duration-300" style={{ transform: isHovered ? 'scale(1.2)' : 'scale(1)' }}>
      <path 
        d="M 50 5 L 89 27.5 L 89 72.5 L 50 95 L 11 72.5 L 11 27.5 Z" 
        fill={isActive ? '#FFC700' : '#050505'} 
        stroke={isActive ? '#FFC700' : '#00D1FF'} 
        strokeWidth="6" 
        strokeLinejoin="round" 
      />
    </svg>
    {isActive && (
      <motion.div 
        layoutId="activeGlow"
        className="absolute inset-0 bg-[#FFC700] rounded-full blur-xl opacity-40 z-0"
      />
    )}
  </div>
);

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div className="w-full py-24 bg-[#020202] text-white relative overflow-hidden" ref={containerRef}>
      
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 209, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Header */}
        <div className="mb-24 text-center md:text-left">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00D1FF] mb-4"
          >
            Built from research. Engineered for reality.
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black font-outfit uppercase tracking-tighter"
          >
            From Research to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00D1FF]">Real Systems</span>
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-20 md:mt-32">
          
          {/* Connecting Line (Base) */}
          <div className="absolute top-[20px] left-0 w-full h-[2px] bg-white/5 md:block hidden" />
          
          {/* Animated Connecting Line (Active) */}
          <motion.div 
            className="absolute top-[20px] left-0 h-[2px] bg-gradient-to-r from-[#FFC700] via-[#00D1FF] to-transparent md:block hidden z-0"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
          />

          {/* Nodes Grid */}
          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-12 md:gap-4">
            {timelineData.map((stage, index) => {
              const isHovered = hoveredNode === index;
              const isDimmed = hoveredNode !== null && hoveredNode !== index;

              return (
                <motion.div 
                  key={stage.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: isDimmed ? 0.3 : 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: isInView ? 0.6 + (index * 0.2) : 0 }}
                  className="flex flex-row md:flex-col items-start md:items-center relative group w-full md:w-1/4 cursor-hover"
                  onMouseEnter={() => setHoveredNode(index)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  
                  {/* Vertical line for mobile */}
                  <div className="absolute left-[15px] top-[40px] bottom-[-48px] w-[2px] bg-white/5 md:hidden" />
                  
                  {/* Node */}
                  <div className="mr-6 md:mr-0 md:mb-8 shrink-0 relative">
                    <HexagonNode isActive={isHovered} isHovered={isHovered} />
                    {/* Connecting line to top */}
                    <div className="absolute top-[-20px] left-1/2 w-[2px] h-[20px] bg-white/20 hidden md:block" />
                  </div>

                  {/* Content */}
                  <div className={`transition-all duration-500 md:text-center flex-1 ${isHovered ? 'translate-x-2 md:translate-x-0 md:-translate-y-2' : ''}`}>
                    <div className="inline-block px-3 py-1 border border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-[#FFC700] mb-3 bg-black/50 backdrop-blur-sm">
                      {stage.year}
                    </div>
                    <h3 className="text-xl md:text-2xl font-black font-outfit uppercase tracking-tight mb-3 text-white">
                      {stage.title}
                    </h3>
                    <p className={`text-sm leading-relaxed font-light font-inter transition-colors duration-300 ${isHovered ? 'text-white/80' : 'text-white/40'}`}>
                      {stage.content}
                    </p>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Timeline;
