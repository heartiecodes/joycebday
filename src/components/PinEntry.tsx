import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CORRECT_PIN = "031481";

interface PinEntryProps {
  onSuccess: () => void;
}

const PinEntry = ({ onSuccess }: PinEntryProps) => {
  const [pin, setPin] = useState(Array(6).fill(""));
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setError(false);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    const fullPin = newPin.join("");
    if (fullPin.length === 6) {
      if (fullPin === CORRECT_PIN) {
        setSuccess(true);
        setTimeout(onSuccess, 1500);
      } else {
        setError(true);
        setTimeout(() => {
          setPin(Array(6).fill(""));
          inputsRef.current[0]?.focus();
        }, 800);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-royal-gradient overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ambient light orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, hsl(39 62% 65%), transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.02]" style={{ background: "radial-gradient(circle, hsl(220 35% 50%), transparent)" }} />
      </div>

      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `hsl(39 62% 65% / ${Math.random() * 0.15 + 0.03})`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Decorative line */}
        <motion.div className="w-16 h-px mx-auto mb-8 opacity-30" style={{ background: "linear-gradient(90deg, transparent, hsl(39 62% 65%), transparent)" }} initial={{ width: 0 }} animate={{ width: 64 }} transition={{ delay: 0.3, duration: 0.8 }} />

        <motion.p className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4 font-body" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          A Special Surprise Awaits
        </motion.p>

        <motion.h1 className="text-2xl md:text-3xl font-display text-gold-gradient mb-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          Enter the Code
        </motion.h1>

        <motion.p className="text-muted-foreground text-sm mb-10 font-body" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          Type the secret PIN to unlock your surprise
        </motion.p>

        <div className="flex justify-center gap-3 mb-8">
          {pin.map((digit, i) => (
            <motion.input
              key={i}
              ref={(el) => { inputsRef.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.08 }}
              className={`w-12 h-14 md:w-14 md:h-16 text-center text-xl font-display rounded-xl
                glass-card text-foreground outline-none transition-all duration-500
                focus:gold-glow-strong focus:border-primary/50
                ${error ? "border-destructive/60" : ""}
                ${success ? "border-primary/50 gold-glow-strong" : ""}
                ${digit ? "border-primary/30" : ""}`}
              style={{ caretColor: "hsl(39 62% 65%)" }}
            />
          ))}
        </div>

        <AnimatePresence>
          {error && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-destructive text-sm font-body">
              Incorrect code. Try again.
            </motion.p>
          )}
          {success && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary text-sm font-body">
              Unlocking...
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div className="absolute bottom-12 w-24 h-px opacity-20" style={{ background: "linear-gradient(90deg, transparent, hsl(39 62% 65%), transparent)" }} initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ delay: 1.5 }} />
    </motion.div>
  );
};

export default PinEntry;
