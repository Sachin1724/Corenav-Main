
import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { Search } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1400px] mx-auto flex justify-between items-center px-10">
        <div 
          className="flex items-center cursor-pointer group gap-4"
          onClick={() => onNavigate('landing')}
        >
          {/* Logo Mark */}
          <svg width="40" height="40" viewBox="0 0 100 100" className="group-hover:scale-105 transition-transform duration-500">
            <path d="M 25 15 L 95 15 L 75 85 L 5 85 Z" fill="#FFC700" />
            <text x="50" y="68" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontStyle="italic" fontSize="60" fill="#FFFFFF" textAnchor="middle">C</text>
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-syncopate text-2xl font-bold tracking-tighter text-white group-hover:text-[#FFC700] transition-colors duration-500">CORENAV</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-black text-[#FFC700] uppercase tracking-[0.4em] italic">PVT LTD</span>
              <div className="flex gap-[1.5px]">
                <div className="w-[2px] h-[6px] bg-[#FF9933]" />
                <div className="w-[2px] h-[6px] bg-[#FFFFFF]" />
                <div className="w-[2px] h-[6px] bg-[#138808]" />
              </div>
            </div>
          </div>
        </div>



        <div className="hidden md:flex space-x-12 items-center">
          {(['landing', 'solutions', 'about', 'contact'] as ViewState[]).map((view) => (
            <button
              key={view}
              onClick={() => onNavigate(view)}
              className={`uppercase text-[12px] font-black tracking-[0.2em] transition-all duration-500 relative group py-2 ${
                currentView === view ? 'text-[#FFC700]' : 'text-white/80 hover:text-white'
              }`}
            >
              {view === 'landing' ? 'Home' : view}
              <span className={`absolute -bottom-1 left-0 h-[3px] bg-[#FFC700] transition-all duration-300 ease-out ${currentView === view ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          ))}
          <button className="text-white/80 hover:text-[#FFC700] transition-colors p-2">
            <Search className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <a
            href="mailto:info@corenav.com"
            className="cta-button bg-white text-black px-10 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#FFC700] hover:text-black transition-all duration-500 rounded-sm font-grotesk shadow-xl shadow-black/20"
            data-cta="true"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
