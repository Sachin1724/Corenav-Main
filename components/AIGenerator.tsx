
import React, { useState } from 'react';
import { generateDroneImage } from '../services/gemini';

const AIGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    const imageUrl = await generateDroneImage(prompt);
    if (imageUrl) {
      setGeneratedImage(imageUrl);
      setHistory(prev => [imageUrl, ...prev].slice(0, 5));
    }
    setIsGenerating(false);
  };

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12">
        <h2 className="text-4xl font-syncopate font-bold mb-2">AI FORGE <span className="gold-text">GEN-II</span></h2>
        <p className="text-gray-500 text-sm uppercase tracking-widest">Neural visualization of custom tactical hardware</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
            </div>
            
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Neural Input Parameters</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. stealth interceptor with solar wings, matte black finish, orange sensor eyes..."
              className="w-full bg-black border border-white/20 p-4 text-sm focus:gold-border focus:outline-none transition-colors min-h-[120px] mb-6"
            />

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className={`w-full py-4 font-bold uppercase tracking-[0.2em] transition-all relative overflow-hidden ${
                isGenerating ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'gold-bg text-black hover:scale-[1.02]'
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                  <span className="ml-2">Synthesizing...</span>
                </div>
              ) : 'Commence Fabrication'}
            </button>
          </div>

          <div className="bg-[#0a0a0a]/50 border border-white/5 p-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-4">Fabrication Archive</h4>
            <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
              {history.map((img, idx) => (
                <div 
                  key={idx} 
                  className="w-24 h-16 flex-shrink-0 border border-white/10 cursor-pointer hover:gold-border transition-all"
                  onClick={() => setGeneratedImage(img)}
                >
                  <img src={img} alt="Past generation" className="w-full h-full object-cover" />
                </div>
              ))}
              {history.length === 0 && <p className="text-[10px] text-gray-700 italic">No previous units found.</p>}
            </div>
          </div>
        </div>

        <div className="relative aspect-video bg-black border border-white/10 overflow-hidden flex items-center justify-center group">
          {generatedImage ? (
            <>
              <img 
                src={generatedImage} 
                alt="AI Generated Drone" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="px-3 py-1 bg-black/80 border border-white/20 text-[10px] uppercase font-bold tracking-widest hover:gold-text transition-all">Export Blueprint</button>
                <button className="px-3 py-1 bg-black/80 border border-white/20 text-[10px] uppercase font-bold tracking-widest hover:gold-text transition-all">Mint Token</button>
              </div>
            </>
          ) : (
            <div className="text-center p-12">
              <div className="mb-4 flex justify-center">
                <div className={`w-12 h-12 border-2 ${isGenerating ? 'gold-border border-t-transparent animate-spin' : 'border-white/10'} rounded-full`} />
              </div>
              <p className="text-gray-600 text-[10px] uppercase tracking-widest">
                {isGenerating ? 'Interpreting neural prompt...' : 'Awaiting input sequence...'}
              </p>
            </div>
          )}

          {/* HUD Elements */}
          <div className="absolute top-4 left-4 pointer-events-none">
            <div className="w-12 h-[1px] bg-white/20 mb-2" />
            <p className="text-[8px] text-white/40 uppercase font-mono tracking-tighter leading-none">Status: Ready</p>
            <p className="text-[8px] text-white/40 uppercase font-mono tracking-tighter leading-none">Source: Gemini-2.5-Forge</p>
          </div>
          <div className="absolute top-4 right-4 pointer-events-none text-right">
            <p className="text-[8px] text-white/40 uppercase font-mono tracking-tighter leading-none">Core Temp: 42°C</p>
            <p className="text-[8px] text-white/40 uppercase font-mono tracking-tighter leading-none">Sync: 98.2%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;
