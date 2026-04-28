import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Target, Minus, Plus, Compass, Eye, Cpu as EdgeAI, Map } from 'lucide-react';

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
    <div className="bg-white text-black font-sans relative z-20">
      {/* Overview Section */}
      <section className="py-32 px-10 max-w-[1400px] mx-auto">
        <div className="section-label">CoreNav Architecture</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter uppercase">
              Giving machines <br/>
              <span className="text-[#FFC700] italic">a brain</span> to move, <br/>
              think & act.
            </h2>
          </div>
          <div className="pt-2">
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-light mb-12">
              CoreNav is a deep-tech automation parent company building intelligent systems that can <span className="font-bold text-black uppercase tracking-tight">navigate, operate, and make decisions autonomously</span> across drones, ground vehicles, and smart urban autobots.
            </p>
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-black/5">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl md:text-4xl font-black mb-2">{stat.value}</p>
                  <p className="text-[9px] text-[#FFC700] font-black uppercase tracking-widest leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Technologies */}
      <section className="py-32 px-10 max-w-[1400px] mx-auto bg-[#F7F7F7]">
        <div className="section-label">Core Technologies</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mt-16">
          {technologies.map((tech, i) => (
            <div key={i} className="group">
              <div className="w-12 h-12 flex items-center justify-center mb-8 group-hover:bg-[#FFC700] group-hover:text-white transition-all duration-500 bg-white shadow-sm">
                {tech.icon}
              </div>
              <h4 className="text-lg font-bold mb-4 uppercase tracking-widest">{tech.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed font-light">{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industrial Quote Section */}
      <section className="bg-black py-40 px-10">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-white text-4xl md:text-6xl font-bold leading-tight tracking-tighter mb-12">
            “THE <span className="text-[#FFC700] italic">INTELLIGENCE LAYER</span> THAT POWERS <br/>AUTONOMOUS MOVEMENT ACROSS EVERY PLATFORM.”
          </h2>
          <div className="w-20 h-[2px] bg-[#FFC700] mx-auto mb-12" />
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.5em]">CoreNav Vision Statement</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20">
        <div>
          <div className="section-label">Insights</div>
          <h3 className="text-3xl font-bold mt-8">Establishing the <br/> Autonomous Standard</h3>
        </div>
        <div className="lg:col-span-2 space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-black/5">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full flex justify-between items-center py-8 text-left group"
              >
                <span className="font-bold text-lg group-hover:text-[#FFC700] transition-colors">{faq.q}</span>
                {activeFaq === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5 text-gray-300 group-hover:text-black" />}
              </button>
              {activeFaq === i && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pb-8 text-gray-500 font-light leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Features;
