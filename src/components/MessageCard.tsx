import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MessageCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-section-alt">
      {/* Ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(39 62% 65%), transparent)" }} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4 font-body" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          From Our Hearts
        </motion.p>

        <motion.h2 className="text-2xl md:text-3xl font-display text-gold-gradient mb-3" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          A Message For You
        </motion.h2>

        <motion.p className="text-muted-foreground text-sm mb-10 font-body" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {!isOpen ? "Tap to read our letter" : ""}
        </motion.p>

        <motion.div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer mx-auto"
        >
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div key="closed" className="glass-card gold-border rounded-2xl p-10 md:p-14 gold-glow shimmer max-w-md mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} whileHover={{ scale: 1.02 }}>
                <p className="text-primary/60 text-sm font-body">Tap to Open</p>
                <div className="w-12 h-px mx-auto mt-4 opacity-20" style={{ background: "linear-gradient(90deg, transparent, hsl(39 62% 65%), transparent)" }} />
              </motion.div>
            ) : (
              <motion.div key="open" className="glass-card gold-border rounded-2xl p-8 md:p-12 gold-glow-strong max-w-lg mx-auto text-left relative" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                {/* Top decorative line */}
                <div className="w-16 h-px mx-auto mb-8 opacity-30" style={{ background: "linear-gradient(90deg, transparent, hsl(39 62% 65%), transparent)" }} />

                {/* Corner accents */}
                <div className="absolute top-4 left-4 text-primary/20 text-xs">✦</div>
                <div className="absolute top-4 right-4 text-primary/20 text-xs">✦</div>
                <div className="absolute bottom-4 left-4 text-primary/20 text-xs">✦</div>
                <div className="absolute bottom-4 right-4 text-primary/20 text-xs">✦</div>

                <p className="font-elegant text-lg md:text-xl leading-relaxed text-foreground/90 italic">
                  "Happy Birthday, our Ligaya! Thank you for your endless love, care, and
                  sacrifices—our family is stronger and happier because of you. We are so
                  grateful to have you in our lives, and we wish you a day filled with love,
                  joy, and the happiness you give to all of us every day."
                </p>

                <div className="w-12 h-px mx-auto mt-8 opacity-20" style={{ background: "linear-gradient(90deg, transparent, hsl(39 62% 65%), transparent)" }} />
                <p className="text-center text-primary/50 text-xs mt-4 font-body tracking-widest uppercase">With all our love</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default MessageCard;
