import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search, Filter, Star, ArrowRight, Eye, Copy, Zap } from "lucide-react";
import { Navbar } from "../components/Navbar";

const CATEGORIES = ["All", "E-Commerce", "Games", "Tools", "Social", "Finance", "Education", "Media", "Bots"];

const TEMPLATES = [
  { id: "1", name: "Crypto Wallet", category: "Finance", thumb: "💰", color: "#00FF88", rating: 4.9, uses: "2.3k", tags: ["payments", "TON", "portfolio"], status: "free" },
  { id: "2", name: "NFT Marketplace", category: "E-Commerce", thumb: "🎨", color: "#7B2FFF", rating: 4.8, uses: "1.8k", tags: ["NFT", "gallery", "minting"], status: "pro" },
  { id: "3", name: "Pixel Runner", category: "Games", thumb: "🎮", color: "#FFB800", rating: 4.7, uses: "3.1k", tags: ["game", "leaderboard", "retro"], status: "free" },
  { id: "4", name: "Task Manager", category: "Tools", thumb: "✅", color: "#0066FF", rating: 4.9, uses: "5.2k", tags: ["productivity", "tasks", "kanban"], status: "free" },
  { id: "5", name: "Music Player", category: "Media", thumb: "🎵", color: "#FF4488", rating: 4.6, uses: "1.2k", tags: ["audio", "playlist", "streaming"], status: "pro" },
  { id: "6", name: "Study Quiz", category: "Education", thumb: "📚", color: "#00E5FF", rating: 4.8, uses: "2.7k", tags: ["quiz", "flashcards", "learning"], status: "free" },
  { id: "7", name: "Food Delivery", category: "E-Commerce", thumb: "🍔", color: "#FF6B35", rating: 4.7, uses: "1.9k", tags: ["delivery", "menu", "orders"], status: "pro" },
  { id: "8", name: "Chat Bot UI", category: "Bots", thumb: "🤖", color: "#00E5FF", rating: 4.9, uses: "4.1k", tags: ["bot", "AI", "chat"], status: "free" },
  { id: "9", name: "Voting Poll", category: "Social", thumb: "🗳️", color: "#7B2FFF", rating: 4.5, uses: "890", tags: ["poll", "voting", "community"], status: "free" },
  { id: "10", name: "Expense Tracker", category: "Finance", thumb: "📊", color: "#00FF88", rating: 4.8, uses: "3.4k", tags: ["budget", "expenses", "charts"], status: "pro" },
  { id: "11", name: "Event Tickets", category: "Tools", thumb: "🎫", color: "#FFB800", rating: 4.6, uses: "1.5k", tags: ["events", "tickets", "booking"], status: "free" },
  { id: "12", name: "Fitness Tracker", category: "Tools", thumb: "💪", color: "#FF4488", rating: 4.7, uses: "2.0k", tags: ["fitness", "workout", "health"], status: "pro" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] } }),
};

function TemplateCard({ t, i }: { t: typeof TEMPLATES[0]; i: number }) {
  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass rounded-2xl overflow-hidden group cursor-pointer"
    >
      {/* Thumb */}
      <div className="h-40 flex items-center justify-center relative"
        style={{ background: `linear-gradient(135deg, ${t.color}15, transparent)` }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 80%, ${t.color}25, transparent 60%)` }} />
        <span className="text-6xl">{t.thumb}</span>
        <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold ${t.status === "pro" ? "text-yellow-400" : "text-green-400"}`}
          style={{ background: t.status === "pro" ? "rgba(255,184,0,0.15)" : "rgba(0,255,136,0.15)", border: `1px solid ${t.status === "pro" ? "rgba(255,184,0,0.3)" : "rgba(0,255,136,0.3)"}` }}>
          {t.status === "pro" ? "⚡ Pro" : "Free"}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: "rgba(5,5,8,0.75)" }}>
          <Link href={`/builder/new?template=${t.id}`}>
            <button className="btn-primary px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5">
              <Zap size={12} /> Use Template
            </button>
          </Link>
          <button className="btn-ghost px-3 py-2 rounded-xl text-xs flex items-center gap-1.5">
            <Eye size={12} /> Preview
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-sm">{t.name}</h3>
          <div className="flex items-center gap-1">
            <Star size={11} fill="#FFB800" color="#FFB800" />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{t.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{t.uses} uses</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${t.color}15`, color: t.color }}>{t.category}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {t.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)" }}>#{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Templates() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQ, setSearchQ] = useState("");

  const filtered = TEMPLATES.filter(t =>
    (activeCategory === "All" || t.category === activeCategory) &&
    t.name.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <div style={{ background: "#050508" }}>
      <Navbar />
      <div className="pt-28 pb-32 px-6">
        <div className="orb" style={{ width: 500, height: 500, background: "rgba(0,102,255,0.07)", top: "5%", right: "-5%", filter: "blur(100px)", position: "fixed", pointerEvents: "none" }} />

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-5" style={{ fontFamily: "Clash Display, sans-serif" }}>
              Template <span className="gradient-text">Library</span>
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
              Start from a professionally designed Telegram Mini App template. Customize everything.
            </p>
          </motion.div>

          {/* Search & filter */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }} />
              <input
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search templates..."
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: activeCategory === cat ? "rgba(0,102,255,0.2)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${activeCategory === cat ? "rgba(0,102,255,0.4)" : "rgba(255,255,255,0.08)"}`,
                  color: activeCategory === cat ? "#fff" : "rgba(255,255,255,0.5)",
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((t, i) => <TemplateCard key={t.id} t={t} i={i} />)}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p style={{ color: "rgba(255,255,255,0.3)" }}>No templates found. Try a different search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
