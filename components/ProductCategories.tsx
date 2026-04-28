import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const categories = [
  {
    id: "aerial",
    title: "AERIAL SYSTEMS",
    subtitle: "UAV Platforms",
    color: "#FFC700", // Yellow
    bgImage: "https://images.unsplash.com/photo-1579820010410-c10411aaaa88?auto=format&fit=crop&q=80&w=2000",
    description: "From precision agriculture to tactical defense. A complete ecosystem of autonomous flight.",
    products: [
      { name: "Agriculture Drone", desc: "Precision spraying & crop mapping" },
      { name: "Delivery Drone", desc: "Last-mile payload transport" },
      { name: "Defence Drone", desc: "Tactical surveillance & recon" },
      { name: "Micro Drone (<250g)", desc: "Ultra-portable intelligence" },
      { name: "Fire Fighting Drone", desc: "High-altitude hazard mitigation" }
    ]
  },
  {
    id: "industrial",
    title: "GROUND ROBOTICS",
    subtitle: "Industrial Automation",
    color: "#00E5FF", // Cyan
    bgImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000",
    description: "Heavy-duty robotics designed for seamless warehouse and factory integration.",
    products: [
      { name: "Cargo Lifting Carts", desc: "Autonomous heavy payload transport" },
      { name: "Packaging Machines", desc: "Intelligent end-of-line automation" }
    ]
  },
  {
    id: "autobots",
    title: "AUTOBOTS",
    subtitle: "Smart Mobility",
    color: "#FF3366", // Pink/Red
    bgImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2000",
    description: "Navigating pedestrian environments and urban infrastructure safely.",
    products: [
      { name: "Driverless Carts", desc: "Campus & facility human transit" },
      { name: "Smart Delivery Bots", desc: "Urban sidewalk delivery systems" }
    ]
  }
];

const CategorySection = ({ category, index }: { category: typeof categories[0], index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-black sticky top-0">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div className="absolute inset-0 bg-black/70 z-10" />
        <img src={category.bgImage} alt={category.title} className="w-full h-full object-cover opacity-60" />
      </motion.div>

      <div className="relative z-10 max-w-[1400px] w-full px-10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div style={{ opacity }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-1 bg-white" style={{ backgroundColor: category.color }} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: category.color }}>{category.subtitle}</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-syncopate font-bold text-white mb-8 tracking-tighter uppercase leading-[0.9]">
            {category.title}
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-12">
            {category.description}
          </p>
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {category.products.map((product, i) => (
            <div 
              key={i} 
              className="bg-white/5 backdrop-blur-md border border-white/10 p-6 hover:bg-white/10 transition-colors duration-500 group"
              style={{ borderLeftColor: category.color, borderLeftWidth: '2px' }}
            >
              <h4 className="text-white font-bold mb-2 uppercase tracking-wide text-sm">{product.name}</h4>
              <p className="text-gray-400 text-[11px] uppercase tracking-wider">{product.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Accent Gradient Overlay */}
      <div 
        className="absolute bottom-0 left-0 w-full h-32 opacity-20 z-0 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${category.color}, transparent)` }}
      />
    </section>
  );
};

const ProductCategories: React.FC = () => {
  return (
    <div className="relative bg-black">
      {categories.map((category, index) => (
        <CategorySection key={category.id} category={category} index={index} />
      ))}
    </div>
  );
};

export default ProductCategories;
