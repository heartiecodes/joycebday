import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: 6 + Math.random() * 8,
  delay: Math.random() * 5,
  hue: [39, 220, 224, 17][Math.floor(Math.random() * 4)],
  opacity: Math.random() * 0.15 + 0.03,
}));

const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {PARTICLES.map((p) => (
      <motion.div
        key={p.id}
        className="absolute rounded-full"
        style={{
          width: p.size,
          height: p.size,
          left: `${p.x}%`,
          top: `${p.y}%`,
          background: `hsl(${p.hue} 50% 60% / ${p.opacity})`,
        }}
        animate={{ y: [0, -40, 0], opacity: [p.opacity, p.opacity * 2, p.opacity] }}
        transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
      />
    ))}
  </div>
);

export default FloatingParticles;
