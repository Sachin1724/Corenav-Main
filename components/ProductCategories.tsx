import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

const categories = [
  {
    id: "aerial",
    title: "AERIAL SYSTEMS",
    subtitle: "UAV Platforms",
    color: "#FF5C00",
    video: "/assets/products/Drone_Background.mp4",
    description: "From precision agriculture to tactical defense. A complete ecosystem of autonomous flight.",
    series: "UAV SERIES",
    products: [
      { name: "Agriculture Drone", desc: "Precision spraying & crop mapping for large-scale farmland operations.", image: "/assets/products/Cinematic_drone_shot_202604281209.jpeg" },
      { name: "Delivery Drone", desc: "Last-mile payload transport with obstacle avoidance and GPS precision.", image: "/assets/products/Style__ultra-realistic_cinematic_202604281223.jpeg" },
      { name: "Defence Drone", desc: "Tactical ISR and perimeter surveillance with encrypted telemetry.", image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800" },
      { name: "Micro Drone (<250g)", desc: "Ultra-portable BVLOS intelligence platform for confined spaces.", image: "https://images.unsplash.com/photo-1512133595763-5ae5a127db0a?auto=format&fit=crop&q=80&w=800" },
      { name: "Fire Fighting Drone", desc: "High-altitude thermal scanning and retardant deployment.", image: "/assets/products/Style__ultra-realistic_cinematic_202604281214.jpeg" }
    ]
  },
  {
    id: "industrial",
    title: "GROUND ROBOTICS",
    subtitle: "Industrial Automation",
    color: "#00B4D8",
    video: "/assets/products/Industry_bot.mp4",
    description: "Heavy-duty robotics designed for seamless warehouse and factory integration.",
    series: "GR SERIES",
    products: [
      { name: "Cargo Lifting Carts", desc: "Autonomous heavy payload transport with dynamic load balancing.", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" },
      { name: "Packaging Machines", desc: "Intelligent end-of-line automation with vision-guided sorting.", image: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?auto=format&fit=crop&q=80&w=800" }
    ]
  },
  {
    id: "autobots",
    title: "AUTOBOTS",
    subtitle: "Smart Mobility",
    color: "#FF3366",
    video: "/assets/products/Delhivery_bot.mp4",
    description: "Navigating pedestrian environments and urban infrastructure safely.",
    series: "AB SERIES",
    products: [
      { name: "Driverless Carts", desc: "Campus & facility human transit with 360° LiDAR perception.", image: "/assets/products/diverless_car.jpeg" },
      { name: "Smart Delivery Bots", desc: "Urban sidewalk delivery with real-time path re-planning.", image: "/assets/products/remove_the_camera_202604281214.png" }
    ]
  }
];

// ─── 3D Tilt Product Card ────────────────────────────────────────────────────
const ProductCard = ({
  product,
  color,
  series,
  index,
}: {
  product: { name: string; desc: string; image: string };
  color: string;
  series: string;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // Tilt max ±8 degrees
    setTilt({ x: (y - 0.5) * -16, y: (x - 0.5) * 16 });
    setGlowPos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-row cursor-hover relative"
      style={{
        background: 'rgba(10,10,10,0.88)',
        backdropFilter: 'blur(8px)',
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%)',
        perspective: '1000px',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: 'transform 0.2s ease-out, box-shadow 0.3s',
        boxShadow: isHovered
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${color}15`
          : '0 4px 20px rgba(0,0,0,0.3)',
        willChange: 'transform',
      }}
    >
      {/* Light sweep overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${color}10 0%, transparent 50%)`,
            transition: 'background 0.1s',
          }}
        />
      )}

      {/* LEFT: Image */}
      <div className="relative shrink-0 overflow-hidden" style={{ width: '44%' }}>
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] z-10"
          style={{ backgroundColor: color }}
        />
        <div
          className="absolute left-3 bottom-3 w-2.5 h-2.5 z-10"
          style={{ backgroundColor: color }}
        />
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 opacity-75 group-hover:opacity-95 group-hover:scale-105"
          style={{ minHeight: '200px' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* RIGHT: Info */}
      <div className="flex flex-col justify-between px-6 py-5 flex-1 relative z-20">
        <span
          className="inline-block self-start text-[9px] font-extrabold uppercase tracking-[0.25em] px-2.5 py-1 mb-4 font-inter"
          style={{
            border: `1px solid ${color}55`,
            color: color,
          }}
        >
          {series}
        </span>

        <h4
          className="text-lg font-black text-white uppercase tracking-tight font-outfit leading-tight mb-2"
          style={{ letterSpacing: '-0.02em' }}
        >
          {product.name}
        </h4>

        <p className="text-white/40 text-[11px] leading-relaxed font-inter font-light mb-5 flex-1">
          {product.desc}
        </p>

        <a
          href="mailto:info@corenav.com"
          className="cta-button self-start flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 font-inter group/link"
          style={{ color: `${color}cc` }}
          data-cta="true"
          onMouseEnter={e => (e.currentTarget.style.color = color)}
          onMouseLeave={e => (e.currentTarget.style.color = `${color}cc`)}
        >
          <span className="text-base leading-none group-hover/link:translate-x-1 transition-transform">→</span>
          <span>View Product</span>
        </a>
      </div>

      {/* Edge cutout accent triangle */}
      <div
        className="absolute bottom-0 right-0 w-0 h-0 z-20"
        style={{
          borderLeft: `22px solid transparent`,
          borderBottom: `22px solid ${color}20`,
        }}
      />
    </motion.div>
  );
};

// ─── Category Section ───────────────────────────────────────────────────────
const CategorySection = ({ category }: { category: typeof categories[0] }) => (
  <section className="relative min-h-screen flex flex-col justify-center py-48 overflow-hidden border-b border-white/5">
    <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

    <div className="absolute inset-0 z-0">
      <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50">
        <source src={category.video} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    </div>

    <div className="relative z-20 max-w-[1400px] w-full px-10 mx-auto">
      <div className="max-w-4xl mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6 mb-8"
        >
          <div className="w-12 h-[1px]" style={{ backgroundColor: category.color }} />
          <p className="text-sm font-black uppercase tracking-[0.5em] font-inter" style={{ color: category.color }}>
            {category.subtitle}
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-8xl md:text-[10rem] font-black text-white mb-10 leading-[0.8] tracking-tighter font-outfit uppercase"
        >
          {category.title.split(' ').map((word, i) => (
            <motion.span
              key={i}
              className="block"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/40 text-lg md:text-xl font-light leading-relaxed font-inter max-w-2xl border-l-2 pl-8"
          style={{ borderColor: category.color }}
        >
          {category.description}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {category.products.map((product, i) => (
          <ProductCard key={i} product={product} color={category.color} series={category.series} index={i} />
        ))}
      </div>
    </div>
  </section>
);

// ─── Root ───────────────────────────────────────────────────────────────────
const ProductCategories: React.FC = () => (
  <div className="bg-black">
    {categories.map((category) => (
      <CategorySection key={category.id} category={category} />
    ))}
  </div>
);

export default ProductCategories;
