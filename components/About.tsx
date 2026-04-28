import React from 'react';
import { motion } from 'motion/react';
import Timeline from './Timeline';
import { Cpu, Target, Eye, Navigation, Network, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-[#020202] text-white min-h-screen pt-32 pb-20 overflow-hidden">
      
      {/* ─── HERO SECTION: WHO WE ARE ────────────────────────────── */}
      <section className="relative px-6 md:px-10 max-w-[1400px] mx-auto mb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[2px] bg-[#FFC700]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFC700]">Who We Are</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black font-outfit uppercase tracking-tighter leading-[0.9] mb-8">
            The Intelligence Layer for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC700] to-[#FF5C00]">Autonomous Systems</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 font-light font-inter leading-relaxed max-w-3xl mb-8">
            CoreNav Private Limited is a deep-tech company building the intelligence layer for autonomous systems. We design and develop advanced navigation technologies that enable machines to perceive, decide, and operate independently in real-world environments.
          </p>

          <p className="text-lg text-white/40 font-light font-inter leading-relaxed max-w-2xl border-l-2 border-[#FFC700]/30 pl-6">
            From aerial drones to ground robotics, CoreNav powers systems that move with precision, reliability, and control.
          </p>
        </motion.div>
      </section>

      {/* ─── ESTABLISHMENT ───────────────────────────────────────── */}
      <section className="relative px-6 md:px-10 max-w-[1400px] mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-black font-outfit uppercase tracking-tight mb-8">Establishment</h2>
            <div className="space-y-6 text-white/50 font-light font-inter text-base md:text-lg">
              <p>
                CoreNav Private Limited was founded with a vision to advance autonomous systems through intelligent navigation and control technologies.
              </p>
              <p>
                The company is supported by the <strong className="text-white/80 font-normal">Software Technology Parks of India (STPI)</strong> initiative, strengthening its foundation within India’s innovation ecosystem.
              </p>
              <p>
                Based in Rourkela, CoreNav was incubated at <strong className="text-white/80 font-normal">Biju Patnaik University of Technology (BPUT)</strong>, where it began as a research-driven initiative focused on real-world autonomous systems.
              </p>
              <p>
                The incubation phase enabled access to technical mentorship, infrastructure, and an environment that encouraged experimentation and system-level innovation.
              </p>
              <p className="text-[#00D1FF] font-normal pt-4">
                Today, CoreNav continues to evolve into a product-focused deep-tech company, transforming research into deployable autonomous solutions.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[600px] border border-white/10 bg-black/50 overflow-hidden group"
          >
            {/* Minimalist Tech Graphic placeholder for Establishment */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,209,255,0.15)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-30 mix-blend-luminosity group-hover:opacity-50 transition-opacity duration-700" />
            <div className="absolute bottom-10 left-10">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FFC700] mb-2">Location</div>
              <div className="text-2xl font-bold font-syncopate">ROURKELA, INDIA</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TIMELINE SECTION ────────────────────────────────────── */}
      <Timeline />

      {/* ─── WHAT WE DO & TECHNOLOGY ─────────────────────────────── */}
      <section className="relative px-6 md:px-10 max-w-[1400px] mx-auto py-32 border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black font-outfit uppercase tracking-tighter mb-6">
            What We <span className="text-[#FF5C00]">Do</span>
          </h2>
          <p className="text-xl text-white/60 font-light font-inter max-w-2xl mx-auto">
            We build intelligence systems that allow machines to move, think, and act autonomously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {[
            { title: "AI-Driven Decision", icon: <Cpu className="w-8 h-8" /> },
            { title: "Vision & Sensing", icon: <Eye className="w-8 h-8" /> },
            { title: "Real-Time Navigation", icon: <Navigation className="w-8 h-8" /> },
            { title: "HW + SW Integration", icon: <Network className="w-8 h-8" /> }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white/[0.02] border border-white/5 p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.05] transition-colors"
            >
              <div className="text-[#00D1FF] mb-4">{item.icon}</div>
              <h3 className="font-outfit font-bold uppercase tracking-wide text-sm">{item.title}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black font-outfit uppercase tracking-tighter mb-6">Our Technology</h2>
            <p className="text-white/50 font-light font-inter mb-8 text-lg">
              CoreNav’s unified intelligence layer processes real-time data and converts it into actionable decisions within milliseconds.
            </p>
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="grid grid-cols-2 gap-4"
          >
            {['SLAM', 'LiDAR Sensing', 'Computer Vision', 'Path Planning', 'Edge AI Processing'].map((tech, i) => (
              <div key={i} className="flex items-center gap-3 border border-white/10 px-4 py-3 bg-black/30">
                <Target className="w-4 h-4 text-[#FFC700]" />
                <span className="font-outfit text-sm font-bold tracking-wide uppercase">{tech}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── OUR ECOSYSTEM & VISION ──────────────────────────────── */}
      <section className="relative px-6 md:px-10 max-w-[1400px] mx-auto py-32 bg-gradient-to-b from-transparent to-[#050505]">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          <div className="lg:col-span-1">
             <h2 className="text-3xl font-black font-outfit uppercase tracking-tighter mb-6">Our Ecosystem</h2>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[#00D1FF]/20 p-6 bg-[#00D1FF]/5">
              <h3 className="text-[#00D1FF] font-black uppercase text-sm mb-2">Aerial Systems</h3>
              <p className="text-white/40 text-xs font-light">Drones for delivery, surveillance, and inspection.</p>
            </div>
            <div className="border border-[#FFC700]/20 p-6 bg-[#FFC700]/5">
              <h3 className="text-[#FFC700] font-black uppercase text-sm mb-2">Ground Robotics</h3>
              <p className="text-white/40 text-xs font-light">Industrial automation and heavy logistics.</p>
            </div>
            <div className="border border-[#FF5C00]/20 p-6 bg-[#FF5C00]/5">
              <h3 className="text-[#FF5C00] font-black uppercase text-sm mb-2">Smart Mobility</h3>
              <p className="text-white/40 text-xs font-light">Autonomous delivery bots and pedestrian transit.</p>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center py-20 px-6 border border-white/10 bg-white/[0.01]"
        >
          <div className="w-12 h-12 rounded-full bg-[#FFC700]/10 flex items-center justify-center mx-auto mb-8">
            <Zap className="w-5 h-5 text-[#FFC700]" />
          </div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FFC700] mb-6">Our Vision</h2>
          <p className="text-2xl md:text-4xl font-light italic font-outfit max-w-4xl mx-auto leading-relaxed mb-16">
            "To become the intelligence layer powering autonomous movement across every platform."
          </p>
          
          <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent mx-auto mb-16" />
          
          <div className="font-outfit uppercase tracking-widest text-sm md:text-base">
            <p className="text-white/40 mb-2">CoreNav is not just building machines.</p>
            <p className="text-white font-black">We are building the intelligence that drives them.</p>
          </div>
        </motion.div>

      </section>

    </div>
  );
};

export default About;
