import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Gift, Heart, Sparkles, Star, PartyPopper, Music, Check } from "lucide-react";

interface GiftBox {
  id: number;
  label: string;
  subtitle: string;
  youtubeUrl: string;
  accent: string;
  icon: React.ElementType;
}

const GIFT_BOXES: GiftBox[] = [
  { id: 1, label: "Gift One", subtitle: "from Colleagues", youtubeUrl: "https://youtu.be/eZCzI7zRaK4", accent: "39 62% 65%", icon: Gift },
  { id: 2, label: "Gift Two", subtitle: "from Girlfriends", youtubeUrl: "https://youtu.be/F6GSM2FZ8l0", accent: "220 40% 55%", icon: Heart },
  { id: 3, label: "Gift Three", subtitle: "from Friends", youtubeUrl: "https://youtu.be/JgSDyQKdXnA", accent: "224 55% 35%", icon: Sparkles },
  { id: 4, label: "Gift Four", subtitle: "from Family", youtubeUrl: "https://youtu.be/kBgY4Mask2Q", accent: "17 30% 70%", icon: Star },
];

const GiftBoxes = () => {
  const [openedBoxes, setOpenedBoxes] = useState<Set<number>>(new Set());
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (openedBoxes.size === GIFT_BOXES.length && !showFinal) {
      setTimeout(() => {
        setShowFinal(true);
        const duration = 4000;
        const end = Date.now() + duration;
        const colors = ["#D4A856", "#3C507D", "#F5F0E9", "#1A2D5A", "#C8B89A"];
        (function frame() {
          confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
          confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
          if (Date.now() < end) requestAnimationFrame(frame);
        })();
      }, 1000);
    }
  }, [openedBoxes, showFinal]);

  const handleOpenGift = (box: GiftBox) => {
    if (box.youtubeUrl) {
      setActiveVideo(box.youtubeUrl);
    }
    setOpenedBoxes((prev) => new Set([...prev, box.id]));
  };

  const getEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-royal-gradient">
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(39 62% 65%), transparent)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4 font-body" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Unwrap Each One
        </motion.p>

        <motion.h2 className="text-2xl md:text-3xl font-display text-gold-gradient mb-3" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Video Greetings
        </motion.h2>

        <motion.p className="text-muted-foreground text-sm mb-12 font-body" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Tap each gift to reveal a video message
        </motion.p>

        <AnimatePresence mode="wait">
          {!showFinal ? (
            <div className="grid grid-cols-2 gap-5 md:gap-8 max-w-2xl mx-auto">
              {GIFT_BOXES.map((box, i) => {
                const isOpened = openedBoxes.has(box.id);
                return (
                  <motion.div key={box.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} onClick={() => handleOpenGift(box)} className="cursor-pointer">
                    <motion.div className={`glass-card gold-border rounded-2xl p-6 md:p-8 relative overflow-hidden ${isOpened ? "opacity-60" : ""}`} whileHover={!isOpened ? { scale: 1.03, y: -4 } : {}} whileTap={!isOpened ? { scale: 0.97 } : {}}>
                      {/* Shimmer overlay */}
                      {!isOpened && (
                        <div className="absolute inset-0 shimmer rounded-2xl" />
                      )}

                      {/* Icon */}
                      <div className="mb-4">
                        {isOpened ? (
                          <Check className="w-8 h-8 mx-auto text-primary/50" />
                        ) : (
                          <box.icon className="w-8 h-8 mx-auto" style={{ color: `hsl(${box.accent})` }} />
                        )}
                      </div>

                      {/* Label */}
                      <div>
                        <p className="font-display text-sm text-foreground/80">{box.label}</p>
                        <p className="text-muted-foreground text-xs font-body mt-1">
                          {isOpened ? "Watched" : box.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12">
              <h3 className="text-2xl md:text-3xl font-display text-gold-gradient mb-4">Happy Birthday, Our Ligaya!</h3>
              <p className="text-muted-foreground font-body">From Anglo and Del Mundo Family</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4" onClick={() => setActiveVideo(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl rounded-2xl overflow-hidden gold-border gold-glow-strong" style={{ background: "hsl(224 45% 14%)" }}>
              <div className="aspect-video">
                <iframe src={getEmbedUrl(activeVideo)} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen title="Video greeting" />
              </div>
              <div className="p-4 text-center">
                <button onClick={() => setActiveVideo(null)} className="text-muted-foreground text-sm font-body hover:text-foreground transition-colors">
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GiftBoxes;
