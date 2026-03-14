import { useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import confetti from "canvas-confetti";
import joyceImg from "@/assets/joyce.png";

interface HeroSectionProps {
  showConfetti?: boolean;
}

const HeroSection = ({ showConfetti }: HeroSectionProps) => {
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        const colors = ["#D4A856", "#3C507D", "#F5F0E9", "#1A2D5A", "#C8B89A"];
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.4 }, colors });
        setTimeout(() => confetti({ particleCount: 50, spread: 90, origin: { y: 0.45 }, colors }), 300);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-royal-gradient">
      {/* Ambient light */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, hsl(39 62% 65%), transparent)" }} />
      </div>

      {/* Subtle floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `hsl(39 62% 65% / ${Math.random() * 0.1 + 0.03})`,
          }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      <motion.div className="relative z-10 text-center" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
        {/* Photo */}
        <motion.div className="relative mx-auto mb-10" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
          {/* Outer ring */}
          <div className="w-44 h-44 md:w-56 md:h-56 mx-auto rounded-full p-[2px]" style={{ background: "linear-gradient(135deg, hsl(39 62% 65% / 0.4), hsl(39 62% 65% / 0.1), hsl(39 62% 65% / 0.3))" }}>
            <div className="w-full h-full rounded-full overflow-hidden gold-glow">
              <img src={joyceImg} alt="Joyce — Birthday Celebrant" className="w-full h-full object-cover object-top" />
            </div>
          </div>
        </motion.div>

        {/* Subtitle above name */}
        <motion.p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-3 font-body" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          A Celebration of You
        </motion.p>

        <motion.h1 className="text-3xl md:text-5xl lg:text-6xl font-display text-gold-gradient mb-4 px-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          Happy Birthday, Joyce!
        </motion.h1>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 2 }}>
        <span className="text-muted-foreground text-xs tracking-widest uppercase font-body">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4 text-primary/40" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
