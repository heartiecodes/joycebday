import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Brain, Shield, Sparkles, HeartHandshake, Laugh } from "lucide-react";

const REASONS = [
  { title: "Your Dedication", text: "You always put your family first, making sure we have everything we need.", icon: HeartHandshake, delay: 0 },
  { title: "Your Wisdom", text: "Your advice guides us through every challenge.", icon: Brain, delay: 0.1 },
  { title: "Your Strength", text: "You carry us through tough times with courage and resilience.", icon: Shield, delay: 0.2 },
  { title: "Your Beauty", text: "Not just your outward beauty, but the kindness and warmth you show every day.", icon: Sparkles, delay: 0.3 },
  { title: "Your Heart", text: "Your love is unconditional and endless.", icon: Heart, delay: 0.4 },
  { title: "Your Laughter", text: "You fill our home with joy and make even ordinary moments special.", icon: Laugh, delay: 0.5 },
];

const ReasonCard = ({ reason, index }: { reason: (typeof REASONS)[0]; index: number }) => {
  const [flipped, setFlipped] = useState(false);
  const Icon = reason.icon;

  return (
    <motion.div
      className="cursor-pointer"
      style={{ perspective: 800 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: reason.delay, duration: 0.6 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div className="relative w-full h-48" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6 }} style={{ transformStyle: "preserve-3d" }}>
        {/* Front */}
        <div className="absolute inset-0 glass-card gold-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 gold-glow" style={{ backfaceVisibility: "hidden" }}>
          <Icon className="w-7 h-7 text-primary/70" />
          <h3 className="font-display text-sm text-foreground/90">{reason.title}</h3>
          <p className="text-muted-foreground text-xs font-body">Tap to reveal</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 glass-card gold-border rounded-2xl p-6 flex items-center justify-center gold-glow-strong" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <p className="font-elegant text-base md:text-lg italic text-foreground/85 text-center leading-relaxed">
            "{reason.text}"
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ReasonsSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-royal-gradient">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(39 62% 65%), transparent)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4 font-body" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          From Our Hearts
        </motion.p>

        <motion.h2 className="text-2xl md:text-3xl font-display text-gold-gradient mb-3" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Reasons Why We Love You
        </motion.h2>

        <motion.p className="text-muted-foreground text-sm mb-12 font-body" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Tap each card to reveal one reason
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {REASONS.map((reason, i) => (
            <ReasonCard key={i} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonsSection;
