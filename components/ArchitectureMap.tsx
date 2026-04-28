import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Package, Truck, Box, Bot, Car, BrainCircuit } from 'lucide-react';

// ─── Node data ──────────────────────────────────────────────────────────────
interface MapNode {
  id: string;
  label: string;
  category: string;
  x: number; // SVG coordinate
  y: number;
  icon: React.ReactNode;
  tooltip: string;
}

const nodes: MapNode[] = [
  { id: 'core', label: 'CORENAV', category: 'INTELLIGENCE CORE', x: 600, y: 300, icon: <BrainCircuit size={48} color="#FFC700" />, tooltip: 'Central AI Decision Engine' },
  // Left (Aerial)
  { id: 'delivery', label: 'DELIVERY', category: 'AERIAL SYSTEM', x: 350, y: 300, icon: <Package size={28} color="#FFFFFF" />, tooltip: 'Autonomous logistics systems' },
  { id: 'defence', label: 'DEFENCE', category: 'AERIAL SYSTEM', x: 150, y: 300, icon: <Shield size={28} color="#FFFFFF" />, tooltip: 'Tactical ISR and surveillance' },
  // Right (Industrial)
  { id: 'cargo', label: 'CARGO', category: 'INDUSTRIAL', x: 850, y: 300, icon: <Truck size={28} color="#FFFFFF" />, tooltip: 'Heavy payload transport' },
  { id: 'pack', label: 'PACK', category: 'INDUSTRIAL', x: 1050, y: 300, icon: <Box size={28} color="#FFFFFF" />, tooltip: 'End-of-line automation' },
  // Bottom (Mobility)
  { id: 'bots', label: 'BOTS', category: 'MOBILITY', x: 450, y: 530, icon: <Bot size={28} color="#FFFFFF" />, tooltip: 'Smart sidewalk delivery' },
  { id: 'carts', label: 'CARTS', category: 'MOBILITY', x: 750, y: 530, icon: <Car size={28} color="#FFFFFF" />, tooltip: 'Driverless campus transit' },
];

// ─── Connection lines (from → to) ──────────────────────────────────────────
const connections = [
  // Core to first level
  { from: 'core', to: 'delivery' },
  { from: 'core', to: 'cargo' },
  { from: 'core', to: 'bots' },
  { from: 'core', to: 'carts' },
  // First level to second level
  { from: 'delivery', to: 'defence' },
  { from: 'cargo', to: 'pack' },
];

// Hexagon SVG Path generator (pointy top)
const getHexagonPath = (r: number) => {
  const h = r * Math.sqrt(3) / 2;
  return `M 0 ${-r} L ${h} ${-r/2} L ${h} ${r/2} L 0 ${r} L ${-h} ${r/2} L ${-h} ${-r/2} Z`;
};

// ─── Data Pulse (animated dot traveling along a connection) ────────────────
const DataPulse: React.FC<{ x1: number; y1: number; x2: number; y2: number; color: string; delay: number; reverse?: boolean }> = ({ x1, y1, x2, y2, color, delay, reverse }) => {
  const startX = reverse ? x2 : x1;
  const startY = reverse ? y2 : y1;
  const endX = reverse ? x1 : x2;
  const endY = reverse ? y1 : y2;

  return (
    <motion.circle
      r="4"
      fill={color}
      filter="url(#neon-glow)"
      initial={{ cx: startX, cy: startY, opacity: 0 }}
      animate={{
        cx: [startX, endX],
        cy: [startY, endY],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 2.5,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2 + 1,
        ease: 'linear',
      }}
    />
  );
};

// ─── Interactive Node ───────────────────────────────────────────────────────
const MapNodeEl: React.FC<{
  node: MapNode;
  isCore: boolean;
  isHighlighted: boolean;
  isDimmed: boolean;
  onHover: (id: string | null) => void;
}> = ({ node, isCore, isHighlighted, isDimmed, onHover }) => {
  const radius = isCore ? 85 : 55;
  const color = isCore ? '#E5B80B' : '#00D1FF'; // Toned down yellow for core, neon blue for others
  const bgColor = isCore ? 'rgba(229,184,11,0.05)' : 'rgba(0,209,255,0.03)';

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: isCore ? 0 : 0.3 + Math.random() * 0.4 }}
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      animate={{ scale: isHighlighted ? 1.05 : 1 }}
    >
      {/* Outer glow/pulse for Core */}
      {isCore && (
        <motion.path
          d={getHexagonPath(radius * 1.3)}
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity={0.3}
          transform={`translate(${node.x}, ${node.y})`}
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Hexagon Shape */}
      <motion.path
        d={getHexagonPath(radius)}
        transform={`translate(${node.x}, ${node.y})`}
        fill={bgColor}
        stroke={isHighlighted || isCore ? color : 'rgba(255,255,255,0.15)'}
        strokeWidth={isHighlighted || isCore ? 3 : 1.5}
        opacity={isDimmed ? 0.3 : 1}
        filter={isHighlighted || isCore ? "url(#neon-glow)" : ""}
        style={{ transition: 'stroke 0.3s, opacity 0.3s, stroke-width 0.3s' }}
      />

      {/* HTML Content (Icon) inside ForeignObject */}
      <foreignObject
        x={node.x - radius}
        y={node.y - radius}
        width={radius * 2}
        height={radius * 2}
        opacity={isDimmed ? 0.3 : 1}
        style={{ transition: 'opacity 0.3s', pointerEvents: 'none' }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className={`${isCore ? 'text-[#FFC700]' : 'text-white'} drop-shadow-lg`}>
             {node.icon}
          </div>
        </div>
      </foreignObject>

      {/* Labels below node */}
      <text
        x={node.x}
        y={node.y + radius + 35}
        textAnchor="middle"
        fill={isCore ? '#E5B80B' : '#FFFFFF'}
        fontSize={isCore ? "18" : "14"}
        fontWeight="800"
        fontFamily="Inter, sans-serif"
        letterSpacing="0.2em"
        opacity={isDimmed ? 0.3 : 1}
        style={{ transition: 'opacity 0.3s' }}
      >
        {node.label}
      </text>
      <text
        x={node.x}
        y={node.y + radius + 55}
        textAnchor="middle"
        fill={isCore ? '#E5B80B' : '#00D1FF'}
        fontSize={isCore ? "12" : "10"}
        fontWeight="500"
        fontFamily="Inter, sans-serif"
        letterSpacing="0.1em"
        opacity={isDimmed ? 0.2 : 0.7}
        style={{ transition: 'opacity 0.3s', textTransform: 'uppercase' }}
      >
        {node.category}
      </text>
    </motion.g>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────
const ArchitectureMap: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

  // Determine connected nodes for highlighting
  const connectedIds = new Set<string>();
  if (hoveredNode) {
    connectedIds.add(hoveredNode);
    connections.forEach(c => {
      if (c.from === hoveredNode) connectedIds.add(c.to);
      if (c.to === hoveredNode) connectedIds.add(c.from);
    });
  }

  return (
    <section className="relative py-32 bg-[#000000] overflow-hidden">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,209,255,0.04)_0%,rgba(0,0,0,1)_70%)] pointer-events-none" />

      {/* Section header */}
      <div className="max-w-[1400px] mx-auto px-10 mb-16 relative z-10">
        <div className="section-label font-inter mb-6 text-white/50 border-white/20">System Architecture</div>
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter font-outfit leading-[0.85]">
          One Intelligence.<br />
          <span className="text-[#E5B80B] italic">Every Platform.</span>
        </h2>
        <p className="text-white/35 text-base md:text-lg font-light font-inter mt-6 max-w-xl">
          CoreNav's unified AI layer powers autonomous decision-making across all product verticals — from micro-drones to sidewalk delivery bots.
        </p>
      </div>

      {/* SVG Map */}
      <div className="max-w-[1400px] mx-auto px-4 relative z-10">
        <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid meet" className="w-full" style={{ maxHeight: '75vh' }}>
          <defs>
            <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection lines */}
          {connections.map((conn, i) => {
            const fromNode = nodeMap[conn.from];
            const toNode = nodeMap[conn.to];
            if (!fromNode || !toNode) return null;

            const isActive = hoveredNode ? (connectedIds.has(conn.from) && connectedIds.has(conn.to)) : false;
            const strokeColor = isActive ? '#00D1FF' : 'rgba(0,209,255,0.15)';
            const strokeWidth = isActive ? 2 : 1;

            return (
              <g key={i}>
                {/* Base line */}
                <motion.line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                  filter={isActive ? "url(#neon-glow)" : ""}
                  style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                />

                {/* Data pulse flowing outward */}
                <DataPulse
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  color="#00D1FF"
                  delay={i * 0.5}
                />
                
                {/* Data pulse flowing inward (return signal) */}
                <DataPulse
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  color={fromNode.id === 'core' ? '#E5B80B' : '#00D1FF'}
                  delay={i * 0.5 + 1}
                  reverse={true}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map(node => (
            <MapNodeEl
              key={node.id}
              node={node}
              isCore={node.id === 'core'}
              isHighlighted={hoveredNode ? connectedIds.has(node.id) : false}
              isDimmed={hoveredNode ? !connectedIds.has(node.id) : false}
              onHover={setHoveredNode}
            />
          ))}

          {/* Global Tooltip Overlay */}
          <foreignObject x="0" y="0" width="1200" height="700" style={{ pointerEvents: 'none', overflow: 'visible' }}>
            <div className="relative w-full h-full">
              {hoveredNode && nodeMap[hoveredNode] && (
                <motion.div
                  key={hoveredNode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -translate-x-1/2 -translate-y-full whitespace-nowrap bg-[#050505] border border-[#00D1FF]/40 px-5 py-2.5 text-xs text-[#00D1FF] uppercase tracking-widest font-inter shadow-[0_0_20px_rgba(0,209,255,0.15)] rounded-sm"
                  style={{
                    left: `${nodeMap[hoveredNode].x}px`,
                    top: `${nodeMap[hoveredNode].y - (nodeMap[hoveredNode].id === 'core' ? 95 : 65)}px`,
                  }}
                >
                  {nodeMap[hoveredNode].tooltip}
                </motion.div>
              )}
            </div>
          </foreignObject>
        </svg>
      </div>
    </section>
  );
};

export default ArchitectureMap;

