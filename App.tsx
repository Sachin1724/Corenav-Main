
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductCategories from './components/ProductCategories';
import ArchitectureMap from './components/ArchitectureMap';
import CustomCursor from './components/CustomCursor';
import About from './components/About';
import { ViewState } from './types';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center">
        <div className="w-64 h-[2px] bg-white/5 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-[#FFC700] animate-[loading_2s_ease-in-out_infinite]" style={{ width: '40%' }} />
        </div>
        <div className="text-center">
          <p className="font-syncopate text-5xl font-bold tracking-[-0.05em] mb-4 text-white">CORENAV</p>
          <p className="text-[10px] uppercase tracking-[1.2em] text-[#FFC700] font-black italic">PRIVATE LIMITED</p>
        </div>

        <style>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(250%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:gold-bg selection:text-black overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Background depth layers */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Layer 0: Slow-scrolling grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,199,0,0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        {/* Layer 1: Floating micro-particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-[#FFC700]/10 rounded-full"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0.05, 0.2, 0.05],
              y: [0, -30, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(226,176,78,0.03)_0%,transparent_70%)]" />
      </div>

      <Navbar currentView={view} onNavigate={setView} />
      
      {/* Main content — no fish-eye transform, per-section animations instead */}
      <main className="relative z-10">
        {view === 'landing' && (
          <>
            <Hero onStart={() => setView('solutions')} />
            <Features />
            <ArchitectureMap />
            <ProductCategories />
          </>
        )}
        {view === 'solutions' && (
          <>
            <Features />
            <ArchitectureMap />
            <ProductCategories />
          </>
        )}

        {view === 'technology' && (
          <section className="py-24 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
            <h2 className="font-syncopate text-3xl font-bold mb-8">NUCLEO TECHNOLOGY</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {['SLAM', 'Computer Vision', 'Path Planning', 'Edge AI', 'LiDAR Sensor Fusion'].map((tech) => (
                <div key={tech} className="border border-white/5 bg-white/[0.02] p-8 hover:border-gold-bg/30 transition-all duration-500">
                  <p className="font-syncopate text-lg mb-2">{tech}</p>
                  <p className="text-gray-500 text-xs uppercase tracking-widest leading-loose">Precision engineered for real-world autonomous navigation and decision making.</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {view === 'about' && (
          <About />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-32 px-10 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
            <div className="lg:col-span-1">
              <div className="flex items-center mb-8 gap-4">
                <span className="font-syncopate text-2xl font-bold tracking-tighter text-white">CORENAV</span>
              </div>

              <p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.2em] leading-relaxed max-w-xs mb-10 italic">
                CoreNav Private Limited builds intelligent navigation systems for autonomous machines. 
                Surgical precision for the robotics age.
              </p>

              <div className="flex space-x-6 text-gray-400">
                <a href="mailto:info@corenav.com" className="hover:text-[#FFC700] cursor-pointer transition-colors"><Mail className="w-5 h-5" /></a>
                <span className="hover:text-[#FFC700] cursor-pointer transition-colors"><Phone className="w-5 h-5" /></span>
                <span className="hover:text-[#FFC700] cursor-pointer transition-colors"><MapPin className="w-5 h-5" /></span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:col-span-3">
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-gray-400">Our Systems</h5>
                <ul className="text-gray-500 space-y-4 text-[9px] uppercase tracking-[0.3em]">
                  <li className="hover:text-white cursor-pointer transition-colors duration-500">Autonomous Drones</li>
                  <li className="hover:text-white cursor-pointer transition-colors duration-500">Ground Robotics</li>
                  <li className="hover:text-white cursor-pointer transition-colors duration-500">Urban Autobots</li>
                  <li className="hover:text-white cursor-pointer transition-colors duration-500">Navigation AI</li>
                  <li className="hover:text-white cursor-pointer transition-colors duration-500">Propulsion Systems</li>
                </ul>
              </div>

              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-gray-400">Company</h5>
                <ul className="text-gray-500 space-y-4 text-[9px] uppercase tracking-[0.3em]">
                  <li className="hover:text-white cursor-pointer transition-colors duration-500">About Us</li>
                  <li className="hover:text-white cursor-pointer transition-colors duration-500">Contact Us</li>
                  <li className="hover:text-white cursor-pointer transition-colors duration-500">Newsroom</li>
                  <li className="hover:text-white cursor-pointer transition-colors duration-500">Careers</li>
                </ul>
              </div>
              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-gray-400">Resources</h5>
                <ul className="text-gray-500 space-y-4 text-[9px] uppercase tracking-[0.3em]">
                  <li className="hover:text-white cursor-pointer transition-colors duration-500">Compare</li>
                  <li className="hover:text-white cursor-pointer transition-colors duration-500">YouTube</li>
                  <li className="hover:text-white cursor-pointer transition-colors duration-500">Tech Papers</li>
                  <li className="hover:text-white cursor-pointer transition-colors duration-500">Terms & Conditions</li>
                  <li className="hover:text-white cursor-pointer transition-colors duration-500">Privacy Policy</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <h3 className="text-3xl font-bold flex items-center gap-4">
              Enabling Motion with <span className="orange-text">Possibility.</span>
            </h3>
            <a
              href="mailto:info@corenav.com"
              className="cta-button bg-white text-black px-10 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#FFC700] hover:text-black transition-all duration-500 rounded-sm"
              data-cta="true"
            >
              Reach Out To Us
            </a>
          </div>
        </div>
      </footer>

      {/* Persistent Scanline Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

export default App;
