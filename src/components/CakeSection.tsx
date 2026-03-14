import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const CakeSection = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showWish, setShowWish] = useState(false);

  const handleBlow = () => {
    if (!candlesLit) return;
    setCandlesLit(false);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.55 },
      colors: ["#D4A856", "#3C507D", "#F5F0E9", "#1A2D5A"],
      gravity: 0.8,
    });

    setTimeout(() => setShowWish(true), 1200);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-section-alt">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, hsl(39 62% 65%), transparent)" }} />

      <div className="relative z-10 max-w-lg mx-auto px-6 text-center">
        <motion.p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4 font-body" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Make It Special
        </motion.p>

        <motion.h2 className="text-2xl md:text-3xl font-display text-gold-gradient mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {candlesLit ? "Blow Out the Candles" : showWish ? "Your Wish is Made" : "Making a Wish..."}
        </motion.h2>

        {candlesLit && (
          <motion.p className="text-muted-foreground text-sm mb-10 font-body" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Tap the cake to make your wish
          </motion.p>
        )}

        <motion.div className="relative cursor-pointer mx-auto w-fit" onClick={handleBlow} whileHover={candlesLit ? { scale: 1.03 } : {}} whileTap={candlesLit ? { scale: 0.97 } : {}}>
          {/* Candles */}
          <div className="flex justify-center gap-6 mb-2 relative z-10">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <AnimatePresence>
                  {candlesLit && (
                    <motion.div exit={{ opacity: 0, scale: 0, y: -10 }} transition={{ duration: 0.3 }} className="w-3 h-4 rounded-full mb-1" style={{ background: "radial-gradient(circle, hsl(39 80% 70%), hsl(39 60% 50%))", boxShadow: "0 0 12px hsl(39 80% 60% / 0.6), 0 0 30px hsl(39 80% 60% / 0.3)", animation: "candleFlicker 1.5s ease-in-out infinite", animationDelay: `${i * 0.2}s` }} />
                  )}
                </AnimatePresence>
                <div className="w-1.5 h-10 rounded-full" style={{ background: `linear-gradient(180deg, hsl(${[39, 220, 0, 39, 220][i]} ${[62, 35, 72, 62, 35][i]}% ${[65, 50, 55, 65, 50][i]}%), hsl(${[39, 220, 0, 39, 220][i]} ${[62, 35, 72, 62, 35][i]}% ${[55, 40, 45, 55, 40][i]}%))` }} />
              </div>
            ))}
          </div>

          {/* Cake body */}
          <div className="relative">
            {/* Top layer */}
            <div className="w-48 h-8 mx-auto rounded-t-xl" style={{ background: "linear-gradient(180deg, hsl(39 50% 60%), hsl(39 45% 50%))" }} />

            {/* Middle layer */}
            <div className="w-56 h-10 mx-auto relative" style={{ background: "linear-gradient(180deg, hsl(224 45% 25%), hsl(224 45% 20%))" }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ left: `${15 + i * 18}%`, background: "hsl(39 62% 65% / 0.4)" }} />
              ))}
            </div>

            {/* Bottom layer */}
            <div className="w-64 h-12 mx-auto rounded-b-xl relative" style={{ background: "linear-gradient(180deg, hsl(39 40% 55%), hsl(39 35% 45%))" }}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="absolute bottom-2 w-1.5 h-3 rounded-full" style={{ left: `${10 + i * 13}%`, background: "hsl(224 45% 25% / 0.3)" }} />
              ))}
            </div>

            {/* Plate */}
            <div className="w-72 h-4 mx-auto rounded-b-full" style={{ background: "linear-gradient(180deg, hsl(39 20% 75% / 0.3), transparent)" }} />
          </div>

          {/* Glow */}
          {candlesLit && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(39 80% 60%), transparent)", animation: "gentle-pulse 2s ease-in-out infinite" }} />
          )}
        </motion.div>

        <AnimatePresence>
          {showWish && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 text-center">
              <p className="font-elegant text-xl italic text-foreground/80">May All Your Wishes Come True</p>
              <div className="w-12 h-px mx-auto mt-4 opacity-20" style={{ background: "linear-gradient(90deg, transparent, hsl(39 62% 65%), transparent)" }} />
              <p className="text-muted-foreground text-xs mt-3 font-body">Wishing you the most wonderful year ahead</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CakeSection;
