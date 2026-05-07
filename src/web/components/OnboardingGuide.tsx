import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Layers, Smartphone, Download, Sparkles, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: Sparkles,
    color: "#7B2FFF",
    title: "Welcome to TeleForge!",
    subtitle: "Let's get you set up in 2 minutes",
    desc: "TeleForge is the most powerful visual builder for Telegram Mini Apps. You'll be able to design, preview, and deploy apps without writing a single line of code.",
    action: "Let's go",
  },
  {
    icon: Layers,
    color: "#0066FF",
    title: "Create your first project",
    subtitle: "Step 1 of 4",
    desc: "Click \"New Project\" on your dashboard. Choose a mini app type — e-commerce, bot UI, game, or tool — then pick a template or start blank.",
    action: "Got it",
  },
  {
    icon: Layers,
    color: "#00E5FF",
    title: "Design with drag & drop",
    subtitle: "Step 2 of 4",
    desc: "Drag components from the left panel onto the canvas. Select any element to edit its properties — colors, text, size, interactions — in the right panel.",
    action: "Got it",
  },
  {
    icon: Smartphone,
    color: "#00FF88",
    title: "Preview in Telegram",
    subtitle: "Step 3 of 4",
    desc: "Hit the preview button to see your design rendered inside a real Telegram phone frame. Toggle between light and dark themes.",
    action: "Got it",
  },
  {
    icon: Download,
    color: "#FFB800",
    title: "Export & publish",
    subtitle: "Step 4 of 4",
    desc: "When you're happy with your design, click Export to download the code or Deploy to publish directly. Share with a QR code in seconds.",
    action: "Start building",
  },
];

interface OnboardingGuideProps {
  onComplete: () => void;
}

export function OnboardingGuide({ onComplete }: OnboardingGuideProps) {
  const [step, setStep] = useState(0);
  const current = steps[step];
  const Icon = current.icon;
  const isLast = step === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center px-6"
      style={{ background: "rgba(5,5,8,0.85)", backdropFilter: "blur(8px)" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md glass rounded-3xl p-8 relative"
          style={{ border: `1px solid ${current.color}25` }}
        >
          {/* Skip */}
          <button
            onClick={onComplete}
            className="absolute top-5 right-5 flex items-center gap-1 text-xs hover:text-white transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Skip tour <X size={14} />
          </button>

          {/* Step dots */}
          <div className="flex gap-1.5 mb-8">
            {steps.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === step ? 24 : 8,
                  background: i <= step ? current.color : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: `${current.color}18`, border: `1px solid ${current.color}30` }}>
            <Icon size={28} style={{ color: current.color }} />
          </div>

          <p className="text-xs font-medium mb-2" style={{ color: current.color }}>
            {current.subtitle}
          </p>
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Clash Display, sans-serif" }}>
            {current.title}
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
            {current.desc}
          </p>

          <div className="flex items-center justify-between">
            {step > 0 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="text-sm hover:text-white transition-colors"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                ← Back
              </button>
            ) : <div />}

            <button
              onClick={isLast ? onComplete : () => setStep(s => s + 1)}
              className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
              style={isLast ? { boxShadow: `0 0 20px ${current.color}50` } : {}}
            >
              {current.action}
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
