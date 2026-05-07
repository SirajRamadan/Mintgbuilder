import { useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Zap, Layers, Smartphone, Code2, Shield, Globe, Users, Star,
  ChevronRight, Play, Check, ArrowRight, Sparkles, Cpu, Boxes
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { ParticleField } from "../components/ParticleField";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};

function FeatureCard({ icon: Icon, title, desc, color, delay }: any) {
  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="glass rounded-2xl p-6 group cursor-pointer relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at 0% 0%, ${color}15 0%, transparent 60%)` }}
      />
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
        <Icon size={22} style={{ color }} />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-white" style={{ fontFamily: "Clash Display, sans-serif" }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{desc}</p>
    </motion.div>
  );
}

function TestimonialCard({ name, role, text, avatar, delay }: any) {
  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#FFB800" color="#FFB800" />)}
      </div>
      <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.7)" }}>"{text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ background: "rgba(0,102,255,0.2)", color: "#00E5FF" }}>
          {avatar}
        </div>
        <div>
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function Landing() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const features = [
    { icon: Layers, title: "Drag & Drop Builder", desc: "Visually compose Telegram Mini Apps with an intuitive component canvas. No code required.", color: "#0066FF", delay: 0 },
    { icon: Smartphone, title: "Live Telegram Preview", desc: "See exactly how your app looks inside Telegram in real-time as you build.", color: "#00E5FF", delay: 1 },
    { icon: Sparkles, title: "AI-Powered Design", desc: "Describe your mini app in plain language and let AI generate the initial layout.", color: "#7B2FFF", delay: 2 },
    { icon: Code2, title: "One-Click Export", desc: "Export clean HTML/CSS/JS or React components ready to deploy to Telegram.", color: "#00FF88", delay: 3 },
    { icon: Boxes, title: "Template Library", desc: "Start from 50+ professionally designed Telegram Mini App templates.", color: "#FFB800", delay: 4 },
    { icon: Users, title: "Team Collaboration", desc: "Invite teammates, share projects, and co-design in real-time.", color: "#FF4488", delay: 5 },
    { icon: Shield, title: "Version History", desc: "Every change is saved. Roll back to any previous version with one click.", color: "#00E5FF", delay: 6 },
    { icon: Globe, title: "Publish & Share", desc: "Deploy directly and share with a QR code. Go live in seconds.", color: "#0066FF", delay: 7 },
  ];

  const testimonials = [
    { name: "Alexei Volkov", role: "Bot Developer, Moscow", text: "TeleForge cut my mini app development time by 80%. The Telegram preview is pixel-perfect.", avatar: "AV", delay: 0 },
    { name: "Sarah Chen", role: "Product Designer, Singapore", text: "The drag-and-drop builder is incredibly intuitive. I shipped my first mini app in under 2 hours.", avatar: "SC", delay: 1 },
    { name: "Mohammed Al-Rashid", role: "Startup Founder, Dubai", text: "The AI design feature is a game changer. I described my idea and got a working layout instantly.", avatar: "MA", delay: 2 },
    { name: "Elena Sorokina", role: "Freelance Developer", text: "Best tool for Telegram mini apps, period. The template library alone is worth the subscription.", avatar: "ES", delay: 3 },
  ];

  const faqs = [
    { q: "Do I need coding skills to use TeleForge?", a: "No. TeleForge is built for both designers and developers. The visual builder requires zero code. If you want to customize further, you can edit the exported code." },
    { q: "What payment methods are supported?", a: "We accept cryptocurrency payments (BTC, ETH, TON) and Telegram Wallet for seamless in-app purchases." },
    { q: "Can I export my designs?", a: "Yes. Export as clean HTML/CSS/JS (single file), React components, or deploy directly from TeleForge." },
    { q: "Is there a free tier?", a: "Yes. The free plan includes 3 projects and access to basic components. Upgrade to Pro or Premium for unlimited projects and advanced features." },
    { q: "How does the AI design feature work?", a: "Describe your Telegram Mini App in plain text and our AI generates a starter layout with appropriate components, colors, and structure." },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#050508" }}>
      <Navbar />

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0 grid-bg opacity-40" />
        <ParticleField />

        {/* Orbs */}
        <div className="orb" style={{ width: 700, height: 700, background: "rgba(0,102,255,0.08)", top: "-10%", left: "-5%", filter: "blur(100px)" }} />
        <div className="orb" style={{ width: 500, height: 500, background: "rgba(0,229,255,0.06)", bottom: "-5%", right: "-5%", filter: "blur(100px)" }} />
        <div className="orb" style={{ width: 400, height: 400, background: "rgba(123,47,255,0.07)", top: "30%", right: "10%", filter: "blur(100px)" }} />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center max-w-5xl mx-auto px-6"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full glass-blue"
          >
            <Zap size={14} style={{ color: "#00E5FF" }} />
            <span className="text-xs font-medium" style={{ color: "#00E5FF" }}>
              The #1 Telegram Mini App Builder
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="text-6xl md:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "Clash Display, sans-serif" }}
          >
            Build Telegram<br />
            <span className="gradient-text">Mini Apps</span><br />
            Visually
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Drag. Drop. Launch. Design professional Telegram Mini Apps with our
            AI-powered visual builder — no code required.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/sign-up">
              <button className="btn-primary px-8 py-4 rounded-xl text-base font-semibold flex items-center gap-2 glow-blue">
                Start Building Free
                <ArrowRight size={18} />
              </button>
            </Link>
            <button className="btn-ghost px-8 py-4 rounded-xl text-base font-medium flex items-center gap-2">
              <Play size={16} fill="currentColor" />
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="flex items-center justify-center gap-12 mt-16"
          >
            {[
              { val: "50K+", label: "Mini Apps Built" },
              { val: "12K+", label: "Developers" },
              { val: "99.9%", label: "Uptime" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold gradient-text-cyan" style={{ fontFamily: "Clash Display, sans-serif" }}>{val}</div>
                <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Scroll to explore</div>
          <div className="w-px h-8 rounded-full" style={{ background: "linear-gradient(to bottom, rgba(0,229,255,0.5), transparent)" }} />
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-blue mb-6">
              <Cpu size={13} style={{ color: "#00E5FF" }} />
              <span className="text-xs font-medium" style={{ color: "#00E5FF" }}>Everything You Need</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-5" style={{ fontFamily: "Clash Display, sans-serif" }}>
              Built for the future<br />of <span className="gradient-text">Telegram</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              Every tool you need to design, prototype, and ship Telegram Mini Apps at lightning speed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-32 px-6 relative">
        <div className="orb" style={{ width: 600, height: 600, background: "rgba(0,102,255,0.06)", left: "-10%", top: "0", filter: "blur(100px)" }} />
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-5" style={{ fontFamily: "Clash Display, sans-serif" }}>
              From idea to <span className="gradient-text">live app</span><br />in minutes
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-12 bottom-12 w-px hidden md:block"
              style={{ background: "linear-gradient(to bottom, #0066FF, #00E5FF, #7B2FFF)" }} />

            <div className="flex flex-col gap-8">
              {[
                { step: "01", title: "Create a Project", desc: "Name your project, pick a mini app category (e-commerce, game, tool, etc.) and choose a base template or start blank.", color: "#0066FF" },
                { step: "02", title: "Design with Drag & Drop", desc: "Add components from the panel — buttons, cards, lists, inputs, navigation bars — and arrange them on the canvas.", color: "#00E5FF" },
                { step: "03", title: "Preview in Telegram", desc: "See your design rendered live inside a Telegram phone frame. Toggle dark/light mode to check both themes.", color: "#7B2FFF" },
                { step: "04", title: "Export & Publish", desc: "One click to export your code or deploy directly. Share via QR code or Telegram link.", color: "#00FF88" },
              ].map(({ step, title, desc, color }, i) => (
                <motion.div
                  key={step}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex items-start gap-8 md:pl-20 relative"
                >
                  <div className="absolute left-0 w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-lg hidden md:flex glass"
                    style={{ border: `1px solid ${color}30`, color, fontFamily: "JetBrains Mono", minWidth: 64 }}>
                    {step}
                  </div>
                  <div className="glass rounded-2xl p-6 flex-1">
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "Clash Display, sans-serif" }}>{title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.55)" }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4" style={{ fontFamily: "Clash Display, sans-serif" }}>
              Loved by <span className="gradient-text">builders</span> worldwide
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)" }}>Join thousands of developers and designers shipping on Telegram</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map((t) => <TestimonialCard key={t.name} {...t} />)}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <h2 className="text-5xl font-bold mb-5" style={{ fontFamily: "Clash Display, sans-serif" }}>
              Simple, <span className="gradient-text">transparent</span> pricing
            </h2>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Start free. Scale with Pro or Premium. Pay with crypto or Telegram Wallet.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              {["Free plan forever", "Crypto payments", "Telegram Wallet", "Cancel anytime"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  <Check size={14} style={{ color: "#00FF88" }} />
                  {item}
                </div>
              ))}
            </div>
            <Link href="/pricing">
              <button className="btn-primary px-8 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2">
                View Pricing <ArrowRight size={18} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl font-bold" style={{ fontFamily: "Clash Display, sans-serif" }}>
              Frequently asked <span className="gradient-text">questions</span>
            </h2>
          </motion.div>
          <div className="flex flex-col gap-3">
            {faqs.map(({ q, a }, i) => (
              <motion.div
                key={q}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="glass rounded-xl p-6"
              >
                <h4 className="font-semibold mb-2">{q}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-32 px-6">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center glass rounded-3xl p-16 relative overflow-hidden"
          style={{ border: "1px solid rgba(0,102,255,0.2)" }}
        >
          <div className="orb" style={{ width: 400, height: 400, background: "rgba(0,102,255,0.1)", top: "-50%", left: "50%", transform: "translateX(-50%)", filter: "blur(60px)" }} />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold mb-5" style={{ fontFamily: "Clash Display, sans-serif" }}>
              Ready to build your<br /><span className="gradient-text">first mini app?</span>
            </h2>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              Join 12,000+ developers building the future of Telegram.
            </p>
            <Link href="/sign-up">
              <button className="btn-primary px-10 py-4 rounded-xl text-lg font-semibold glow-blue inline-flex items-center gap-2">
                Get Started Free <Zap size={20} />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg glass-blue flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
                    <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="#00E5FF" strokeWidth="2" fill="rgba(0,102,255,0.3)" />
                    <path d="M16 24l5 5 11-10" stroke="#00E5FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-bold gradient-text-cyan" style={{ fontFamily: "Clash Display, sans-serif" }}>TeleForge</span>
              </div>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                The most advanced visual builder for Telegram Mini Apps.
              </p>
            </div>
            {[
              { title: "Product", links: ["Features", "Templates", "Pricing", "Changelog"] },
              { title: "Resources", links: ["Documentation", "API Reference", "Tutorials", "Blog"] },
              { title: "Company", links: ["About", "Contact", "Privacy", "Terms"] },
            ].map(({ title, links }) => (
              <div key={title}>
                <h5 className="font-semibold mb-4 text-sm">{title}</h5>
                <ul className="flex flex-col gap-2">
                  {links.map((l) => (
                    <li key={l}><a href="#" className="text-sm hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-8 border-t text-sm" style={{ borderColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}>
            <span>© 2025 TeleForge. All rights reserved.</span>
            <span>Built for the Telegram ecosystem</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
