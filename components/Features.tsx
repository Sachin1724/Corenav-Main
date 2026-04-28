import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Cpu, Zap, Target, Minus, Plus, Compass, Eye, Cpu as EdgeAI, Map } from 'lucide-react';

// ─── Animated Counter ────────────────────────────────────────────────────────
const CountUp: React.FC<{ value: string }> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView) return;
    // Extract numeric part
    const match = value.match(/([\d.]+)/);
    if (!match) { setDisplay(value); return; }
    const target = parseFloat(match[1]);
    const prefix = value.slice(0, value.indexOf(match[1]));
    const suffix = value.slice(value.indexOf(match[1]) + match[1].length);
    const duration = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const formatted = match[1].includes('.') ? current.toFixed(1) : Math.round(current).toString();
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
};

// ─── Main Features ──────────────────────────────────────────────────────────
const Features: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const stats = [
    { label: "PRECISION ACCURACY", value: "±2cm" },
    { label: "EDGE PROCESSING", value: "<20ms" },
    { label: "OPERATIONAL UPTIME", value: "99.9%" },
  ];

  const technologies = [
    { icon: <Compass className="w-5 h-5" />, title: "SLAM", desc: "Simultaneous Localization and Mapping for real-time environment discovery." },
    { icon: <Target className="w-5 h-5" />, title: "LiDAR SENSING", desc: "High-density depth sensing for precise spatial awareness and obstacle detection." },
    { icon: <Eye className="w-5 h-5" />, title: "COMPUTER VISION", desc: "AI-powered object detection, tracking, and classification layers." },
    { icon: <EdgeAI className="w-5 h-5" />, title: "EDGE AI", desc: "On-device processing for zero-latency decision making without internet dependency." },
    { icon: <Map className="w-5 h-5" />, title: "PATH PLANNING", desc: "Advanced A* and RRT algorithms for optimal autonomous trajectory execution." },
    { icon: <Zap className="w-5 h-5" />, title: "MOTION CONTROL", desc: "High-frequency feedback loops for surgical movement precision." },
  ];

  const faqs = [
    { q: "What is CoreNav's core focus?", a: "To build the intelligence layer that powers autonomous movement across a diverse range of machines, from micro-drones to heavy cargo lifters." },
    { q: "How can I integrate CoreNav into our fleet?", a: "Our unified system combines AI decision-making with navigation hardware to enable your machines to perceive, decide, and act autonomously." },
    { q: "Do you offer customized solutions?", a: "Yes, we specialize in high-precision, custom-engineered propulsion and navigation solutions for mission-critical and niche deployments." },
  ];

  return (
    <div className="bg-white text-black font-outfit relative z-20">
      {/* Overview Section */}
      <section className="py-32 px-10 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-label font-inter"
        >
          CoreNav Architecture
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase font-outfit"
            >
              Giving machines <br/>
              <span className="text-[#FFC700] italic">a brain</span> to move, <br/>
              think & act.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pt-2"
          >
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-light mb-12 font-inter">
              CoreNav Private Limited is a deep-tech automation parent company building intelligent systems that can <span className="font-bold text-black uppercase tracking-tight">navigate, operate, and make decisions autonomously</span> across drones, ground vehicles, and smart urban autobots.
            </p>
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-black/5">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                >
                  <p className="text-3xl md:text-5xl font-black mb-2 font-outfit">
                    <CountUp value={stat.value} />
                  </p>
                  <p className="text-[10px] text-[#FFC700] font-black uppercase tracking-widest leading-tight font-inter">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Technologies — staggered cards */}
      <section className="py-32 px-10 max-w-[1400px] mx-auto bg-[#F7F7F7]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-label font-inter"
        >
          Core Technologies
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mt-16">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group"
            >
              <div className="w-14 h-14 flex items-center justify-center mb-8 group-hover:bg-[#FFC700] group-hover:text-white transition-all duration-500 bg-white shadow-sm group-hover:shadow-lg group-hover:shadow-[#FFC700]/20 group-hover:scale-110">
                {tech.icon}
              </div>
              <h4 className="text-xl font-extrabold mb-4 uppercase tracking-tighter font-outfit">{tech.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light font-inter">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Industrial Quote Section — typewriter reveal */}
      <section className="bg-black py-40 px-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-black opacity-5 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-white text-5xl md:text-8xl font-black leading-[0.85] tracking-tighter mb-12 font-outfit"
          >
            {"\"THE ".split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.03, delay: i * 0.04 }}
              >
                {char}
              </motion.span>
            ))}
            <span className="text-[#FFC700] italic">INTELLIGENCE LAYER</span>
            {" THAT POWERS AUTONOMOUS MOVEMENT ACROSS EVERY PLATFORM.\"".split('').map((char, i) => (
              <motion.span
                key={`b-${i}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.03, delay: 0.6 + i * 0.02 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="h-[2px] bg-[#FFC700] mx-auto mb-12"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="text-gray-400 text-xs font-black uppercase tracking-[0.6em] font-inter"
          >
            CoreNav Private Limited Vision Statement
          </motion.p>
        </div>
      </section>

      {/* FAQ Section — Reference-style wide card */}
      <section className="py-20 px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-[1400px] mx-auto overflow-hidden bg-[#EDF2F0] flex flex-col md:flex-row min-h-[320px] relative"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)' }}
        >
          {/* LEFT: Heading panel */}
          <div className="relative flex flex-col justify-start p-12 md:w-[30%] shrink-0">
            <div className="absolute left-0 top-10 bottom-10 w-1 bg-[#FF5C00] rounded-r" />
            <div className="section-label font-inter mb-6">Insights</div>
            <h3
              className="text-3xl md:text-4xl font-black uppercase font-outfit leading-none"
              style={{ letterSpacing: '-0.04em' }}
            >
              ESTABLISHING<br/>THE<br/>AUTONOMOUS<br/>STANDARD
            </h3>
          </div>

          {/* MIDDLE: Gradient + FAQ items */}
          <div
            className="flex flex-col justify-center px-12 py-10 flex-1"
            style={{
              background: 'linear-gradient(135deg, #ffe4c4 0%, #ffb347 40%, #FF5C00 100%)',
            }}
          >
            <div className="space-y-0">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-black/10 last:border-0">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex justify-between items-center py-5 text-left group"
                  >
                    <span className="font-bold text-sm md:text-base group-hover:text-white transition-colors font-outfit uppercase tracking-tight text-black/80">
                      {faq.q}
                    </span>
                    {activeFaq === i
                      ? <Minus className="w-4 h-4 shrink-0" />
                      : <Plus className="w-4 h-4 shrink-0 text-black/40 group-hover:text-black" />}
                  </button>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pb-5 text-black/60 font-light leading-relaxed font-inter text-sm"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <a
              href="mailto:info@corenav.com"
              className="cta-button mt-8 self-start inline-block bg-black text-white text-[11px] font-bold uppercase tracking-widest px-6 py-3 hover:bg-[#FF5C00] transition-colors duration-300 font-inter"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}
              data-cta="true"
            >
              Talk to Our Expert &nbsp;→ info@corenav.com
            </a>
          </div>

          <div className="absolute right-4 top-10 w-2.5 h-2.5 rounded-sm bg-[#FF5C00]" />
        </motion.div>
      </section>

      {/* Chevron Runway — Drone flies across on page scroll */}
      <DroneRunway />
    </div>
  );
};

/** Separate component so it can own its own scroll ref */
const DroneRunway: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['-10vw', '110vw']);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 3]);

  const chevronCount = 60;

  return (
    <div
      ref={containerRef}
      className="relative h-20 bg-white border-b-[16px] border-black overflow-hidden flex items-center"
    >
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none select-none px-2">
        {Array.from({ length: chevronCount }).map((_, i) => (
          <svg
            key={i}
            className="shrink-0 text-[#FFC700]"
            width="28"
            height="16"
            viewBox="0 0 28 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0L14 8L0 16" fill="currentColor" />
            <path d="M14 0L28 8L14 16" fill="currentColor" />
          </svg>
        ))}
      </div>

      <motion.div
        style={{ x, rotate }}
        className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none"
      >
        <img
          src="/assets/products/scroll_drone.png"
          alt="drone"
          className="w-16 h-auto mix-blend-multiply drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
        />
      </motion.div>
    </div>
  );
};

export default Features;
