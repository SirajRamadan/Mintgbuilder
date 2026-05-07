import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    const intervals = [
      setTimeout(() => setProgress(20), 300),
      setTimeout(() => setProgress(45), 700),
      setTimeout(() => setProgress(72), 1200),
      setTimeout(() => setProgress(90), 1700),
      setTimeout(() => setProgress(100), 2100),
      setTimeout(() => setPhase("done"), 2300),
      setTimeout(() => onComplete(), 2900),
    ];
    return () => intervals.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#050508" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Background orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="orb"
              style={{ width: 600, height: 600, background: "rgba(0,102,255,0.12)", top: "10%", left: "20%" }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="orb"
              style={{ width: 400, height: 400, background: "rgba(0,229,255,0.1)", bottom: "20%", right: "20%" }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
              className="orb"
              style={{ width: 300, height: 300, background: "rgba(123,47,255,0.12)", top: "60%", left: "60%" }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </div>

          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Logo */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <motion.div
              className="relative"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            >
              <div className="w-24 h-24 rounded-2xl glass-blue flex items-center justify-center glow-blue relative overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(0,102,255,0.3), rgba(0,229,255,0.1))" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="relative z-10">
                  <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="#00E5FF" strokeWidth="1.5" fill="none" />
                  <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" fill="rgba(0,102,255,0.2)" />
                  <path d="M16 24l5 5 11-10" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="24" cy="24" r="3" fill="#0066FF" />
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <motion.circle
                      key={i}
                      cx={24 + 14 * Math.cos((deg * Math.PI) / 180)}
                      cy={24 + 14 * Math.sin((deg * Math.PI) / 180)}
                      r="1.5"
                      fill="#00E5FF"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                </svg>
              </div>
              {/* Ring */}
              <motion.div
                className="absolute -inset-3 rounded-3xl border border-primary/30"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Brand name */}
            <div className="text-center">
              <motion.h1
                className="text-5xl font-bold tracking-tight gradient-text"
                style={{ fontFamily: "Clash Display, sans-serif" }}
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "-0.01em" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                TeleForge
              </motion.h1>
              <motion.p
                className="text-sm mt-2"
                style={{ color: "rgba(255,255,255,0.4)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Initializing your workspace...
              </motion.p>
            </div>

            {/* Progress bar */}
            <div className="w-64">
              <div className="h-px w-full rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                <motion.div
                  className="h-px rounded-full"
                  style={{ background: "linear-gradient(90deg, #0066FF, #00E5FF)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "JetBrains Mono" }}>
                  {progress < 30 ? "Loading assets..." : progress < 60 ? "Preparing canvas..." : progress < 90 ? "Connecting services..." : "Ready!"}
                </span>
                <span className="text-xs" style={{ color: "rgba(0,229,255,0.7)", fontFamily: "JetBrains Mono" }}>
                  {progress}%
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
