import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Check, Zap, Crown, ArrowRight, Bitcoin, Wallet, CreditCard, X, Sparkles } from "lucide-react";
import { Navbar } from "../components/Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};

const PLANS = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    color: "rgba(255,255,255,0.6)",
    icon: Zap,
    tagline: "Get started with the basics",
    features: [
      "3 projects",
      "50+ base components",
      "Telegram preview",
      "HTML/JS export",
      "Community support",
      "1 team member",
    ],
    missing: ["Unlimited projects", "AI designer", "React export", "Version history", "Custom domains", "Priority support"],
    cta: "Get Started Free",
    ctaLink: "/sign-up",
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: null,
    annualPrice: null,
    color: "#0066FF",
    icon: Zap,
    tagline: "For serious builders",
    popular: true,
    features: [
      "Unlimited projects",
      "All components library",
      "AI Designer (100 generations/mo)",
      "HTML/JS + React export",
      "Version history (30 days)",
      "5 team members",
      "Telegram Wallet payments",
      "Priority support",
      "Custom domains",
      "Analytics dashboard",
    ],
    missing: ["AI generations unlimited", "White-label export", "Dedicated support"],
    cta: "Coming Soon",
    ctaLink: "/sign-up",
  },
  {
    id: "premium",
    name: "Premium",
    monthlyPrice: null,
    annualPrice: null,
    color: "#7B2FFF",
    icon: Crown,
    tagline: "For teams and agencies",
    features: [
      "Everything in Pro",
      "Unlimited AI generations",
      "Unlimited team members",
      "White-label export",
      "Dedicated account manager",
      "API access",
      "Custom component builder",
      "SLA guarantee",
      "Early access to new features",
      "Custom integrations",
    ],
    missing: [],
    cta: "Coming Soon",
    ctaLink: "/sign-up",
  },
];

const CRYPTO_METHODS = [
  { icon: "₿", label: "Bitcoin", symbol: "BTC", color: "#F7931A" },
  { icon: "Ξ", label: "Ethereum", symbol: "ETH", color: "#627EEA" },
  { icon: "💎", label: "TON", symbol: "TON", color: "#0088CC" },
  { icon: "₮", label: "USDT", symbol: "USDT", color: "#26A17B" },
  { icon: "🔵", label: "USD Coin", symbol: "USDC", color: "#2775CA" },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <div style={{ background: "#050508" }}>
      <Navbar />
      <div className="pt-28 pb-32 px-6">
        {/* Orbs */}
        <div className="fixed orb" style={{ width: 600, height: 600, background: "rgba(0,102,255,0.07)", top: 0, right: "5%", filter: "blur(120px)", pointerEvents: "none" }} />
        <div className="fixed orb" style={{ width: 400, height: 400, background: "rgba(123,47,255,0.07)", bottom: "10%", left: "5%", filter: "blur(100px)", pointerEvents: "none" }} />

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-blue mb-6">
              <Sparkles size={14} style={{ color: "#00E5FF" }} />
              <span className="text-xs font-medium" style={{ color: "#00E5FF" }}>Simple Pricing</span>
            </div>
            <h1 className="text-6xl font-bold mb-5" style={{ fontFamily: "Clash Display, sans-serif" }}>
              Choose your <span className="gradient-text">plan</span>
            </h1>
            <p className="text-lg max-w-xl mx-auto mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Start free. Upgrade when you need more power. Prices will be announced soon.
            </p>
          </motion.div>

          {/* Billing toggle */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="flex items-center justify-center gap-4 mb-12">
            <span className="text-sm" style={{ color: annual ? "rgba(255,255,255,0.4)" : "white" }}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-14 h-7 rounded-full transition-all duration-300"
              style={{ background: annual ? "#0066FF" : "rgba(255,255,255,0.1)" }}
            >
              <div className="absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300"
                style={{ left: annual ? "calc(100% - 24px)" : 4 }} />
            </button>
            <span className="text-sm flex items-center gap-2" style={{ color: annual ? "white" : "rgba(255,255,255,0.4)" }}>
              Annual
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "rgba(0,255,136,0.15)", color: "#00FF88" }}>Save 20%</span>
            </span>
          </motion.div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {PLANS.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="relative glass rounded-3xl p-8 flex flex-col"
                  style={{
                    border: plan.popular ? `1px solid rgba(0,102,255,0.4)` : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: plan.popular ? "0 0 40px rgba(0,102,255,0.15)" : "none",
                  }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="px-4 py-1 rounded-full text-xs font-semibold" style={{ background: "#0066FF", boxShadow: "0 0 20px rgba(0,102,255,0.5)" }}>
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Icon & name */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}30` }}>
                      <Icon size={20} style={{ color: plan.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ fontFamily: "Clash Display, sans-serif" }}>{plan.name}</h3>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{plan.tagline}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {plan.monthlyPrice === 0 ? (
                      <div className="text-5xl font-bold" style={{ fontFamily: "Clash Display, sans-serif" }}>Free</div>
                    ) : (
                      <div className="flex items-end gap-2">
                        <div className="text-5xl font-bold" style={{ fontFamily: "Clash Display, sans-serif", color: plan.color }}>
                          TBA
                        </div>
                      </div>
                    )}
                    {plan.monthlyPrice !== 0 && (
                      <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Prices coming soon • Pay with crypto
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <Link href={plan.ctaLink}>
                    <button
                      className="w-full py-3.5 rounded-xl font-semibold text-sm mb-6 transition-all"
                      style={
                        plan.popular
                          ? { background: "#0066FF", color: "white", boxShadow: "0 0 20px rgba(0,102,255,0.4)" }
                          : plan.id === "premium"
                          ? { background: "rgba(123,47,255,0.2)", color: "#7B2FFF", border: "1px solid rgba(123,47,255,0.3)" }
                          : { background: "rgba(255,255,255,0.06)", color: "white", border: "1px solid rgba(255,255,255,0.1)" }
                      }
                    >
                      {plan.cta}
                    </button>
                  </Link>

                  {/* Features */}
                  <div className="flex flex-col gap-2.5 flex-1">
                    {plan.features.map(f => (
                      <div key={f} className="flex items-start gap-2.5 text-sm">
                        <Check size={15} style={{ color: "#00FF88", marginTop: 1, flexShrink: 0 }} />
                        <span style={{ color: "rgba(255,255,255,0.75)" }}>{f}</span>
                      </div>
                    ))}
                    {plan.missing.map(f => (
                      <div key={f} className="flex items-start gap-2.5 text-sm">
                        <X size={15} style={{ color: "rgba(255,255,255,0.2)", marginTop: 1, flexShrink: 0 }} />
                        <span style={{ color: "rgba(255,255,255,0.25)" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Payment methods */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "Clash Display, sans-serif" }}>
              Pay your way
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              We support crypto payments and Telegram Wallet for frictionless transactions
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {CRYPTO_METHODS.map(({ icon, label, symbol, color }) => (
                <div key={symbol} className="glass rounded-2xl px-5 py-4 flex items-center gap-3 hover:border-primary/30 transition-all">
                  <span className="text-2xl">{icon}</span>
                  <div className="text-left">
                    <div className="text-sm font-semibold">{label}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{symbol}</div>
                  </div>
                </div>
              ))}
              <div className="glass rounded-2xl px-5 py-4 flex items-center gap-3 hover:border-primary/30 transition-all">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,136,204,0.2)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#0088CC">
                    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.17l-2.02 9.51c-.15.68-.54.84-1.09.52l-3-2.21-1.45 1.39c-.16.16-.29.29-.6.29l.21-3.01 5.47-4.94c.24-.21-.05-.33-.36-.12L6.3 14.16l-2.93-.92c-.64-.2-.65-.64.13-.95l11.45-4.41c.53-.19 1 .13.99.29z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold">Telegram Wallet</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Native Telegram payment</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-center mb-8" style={{ fontFamily: "Clash Display, sans-serif" }}>
              Billing FAQ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                { q: "When will Pro & Premium be available?", a: "We're finalizing pricing. Join the waitlist and you'll be notified when we launch, with an exclusive early-bird discount." },
                { q: "Can I pay with crypto?", a: "Yes. We support BTC, ETH, TON, USDT, USDC, and Telegram Wallet. No credit card required." },
                { q: "Is there a money-back guarantee?", a: "Yes. If you're not happy within the first 7 days, we'll refund you, no questions asked." },
                { q: "What happens to my projects if I downgrade?", a: "Your projects are always safe. You can still view and export them, but editing will be read-only on the free tier." },
              ].map(({ q, a }) => (
                <div key={q} className="glass rounded-xl p-5">
                  <h4 className="font-semibold mb-2 text-sm">{q}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
