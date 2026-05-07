import { useState, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Layers, Settings, Bell, Search, Grid, List,
  Smartphone, ShoppingBag, Gamepad2, Wrench, MessageSquare,
  Music, BookOpen, TrendingUp, Star, MoreHorizontal, Zap,
  Clock, Users, ChevronRight, LogOut, CreditCard, HelpCircle,
  Flame, Award, Home, FolderOpen, Cpu, ChevronDown
} from "lucide-react";
import { OnboardingGuide } from "../components/OnboardingGuide";

const APP_TYPES = [
  { id: "all", label: "All Projects", icon: Grid },
  { id: "ecommerce", label: "E-Commerce", icon: ShoppingBag },
  { id: "game", label: "Games", icon: Gamepad2 },
  { id: "tool", label: "Tools", icon: Wrench },
  { id: "social", label: "Social", icon: MessageSquare },
  { id: "media", label: "Media", icon: Music },
  { id: "education", label: "Education", icon: BookOpen },
  { id: "finance", label: "Finance", icon: TrendingUp },
];

const SAMPLE_PROJECTS = [
  { id: "1", name: "Crypto Shop", type: "ecommerce", status: "published", lastEdit: "2h ago", components: 24, color: "#00FF88", thumb: "🛍️" },
  { id: "2", name: "Space Shooter", type: "game", status: "draft", lastEdit: "1d ago", components: 18, color: "#7B2FFF", thumb: "🚀" },
  { id: "3", name: "Daily Planner", type: "tool", status: "published", lastEdit: "3d ago", components: 31, color: "#FFB800", thumb: "📅" },
  { id: "4", name: "Music Bot UI", type: "media", status: "draft", lastEdit: "5d ago", components: 15, color: "#0066FF", thumb: "🎵" },
  { id: "5", name: "Study Tracker", type: "education", status: "published", lastEdit: "1w ago", components: 22, color: "#00E5FF", thumb: "📚" },
  { id: "6", name: "Chat Interface", type: "social", status: "in-review", lastEdit: "2d ago", components: 19, color: "#FF4488", thumb: "💬" },
];

const STATS = [
  { label: "Total Projects", value: "6", sub: "+2 this month", icon: FolderOpen, color: "#0066FF" },
  { label: "Published Apps", value: "3", sub: "Live on Telegram", icon: Zap, color: "#00FF88" },
  { label: "Total Components", value: "129", sub: "Across all projects", icon: Layers, color: "#00E5FF" },
  { label: "Team Members", value: "4", sub: "Active collaborators", icon: Users, color: "#7B2FFF" },
];

function ProjectCard({ project, view }: { project: typeof SAMPLE_PROJECTS[0]; view: "grid" | "list" }) {
  const statusColor: Record<string, string> = {
    published: "#00FF88", draft: "rgba(255,255,255,0.3)", "in-review": "#FFB800"
  };

  if (view === "list") {
    return (
      <motion.div
        whileHover={{ x: 4 }}
        className="glass rounded-xl px-5 py-4 flex items-center gap-4 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl glass" style={{ minWidth: 40 }}>
          {project.thumb}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm">{project.name}</div>
          <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{project.components} components · {project.lastEdit}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor[project.status] }} />
          <span className="text-xs capitalize" style={{ color: statusColor[project.status] }}>{project.status}</span>
        </div>
        <Link href={`/builder/${project.id}`}>
          <button className="btn-ghost px-3 py-1.5 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition-opacity">
            Open
          </button>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass rounded-2xl overflow-hidden cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="h-36 flex items-center justify-center relative"
        style={{ background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)` }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, ${project.color}20, transparent 70%)` }} />
        <span className="text-5xl">{project.thumb}</span>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: "rgba(5,5,8,0.7)" }}>
          <Link href={`/builder/${project.id}`}>
            <button className="btn-primary px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5">
              Open Builder <ChevronRight size={14} />
            </button>
          </Link>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-sm">{project.name}</h3>
          <button className="p-1 rounded-lg hover:bg-white/5 transition-colors opacity-0 group-hover:opacity-100">
            <MoreHorizontal size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            <Clock size={11} />
            {project.lastEdit}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor[project.status] }} />
            <span className="text-xs capitalize" style={{ color: statusColor[project.status] }}>{project.status}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Sidebar({ activeCategory, setActiveCategory }: { activeCategory: string; setActiveCategory: (v: string) => void }) {
  return (
    <aside className="w-60 flex-shrink-0 flex flex-col gap-2 py-6">
      {/* Nav items */}
      <div className="px-3 mb-2">
        <p className="text-xs font-medium px-3 mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>WORKSPACE</p>
        {[
          { icon: Home, label: "Overview", href: "/dashboard" },
          { icon: FolderOpen, label: "Projects", href: "/dashboard", active: true },
          { icon: Layers, label: "Templates", href: "/templates" },
          { icon: CreditCard, label: "Billing", href: "/pricing" },
          { icon: Settings, label: "Settings", href: "#" },
        ].map(({ icon: Icon, label, href, active }) => (
          <Link key={label} href={href}>
            <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all mb-0.5 ${active ? "glass-blue" : "hover:bg-white/4"}`}
              style={{ color: active ? "#00E5FF" : "rgba(255,255,255,0.5)" }}>
              <Icon size={16} />
              <span className="text-sm font-medium">{label}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="h-px mx-6" style={{ background: "rgba(255,255,255,0.06)" }} />

      <div className="px-3 mt-2">
        <p className="text-xs font-medium px-3 mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>CATEGORIES</p>
        {APP_TYPES.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveCategory(id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all mb-0.5 text-left"
            style={{
              background: activeCategory === id ? "rgba(0,102,255,0.15)" : "transparent",
              color: activeCategory === id ? "#fff" : "rgba(255,255,255,0.45)",
              border: activeCategory === id ? "1px solid rgba(0,102,255,0.25)" : "1px solid transparent",
            }}
          >
            <Icon size={15} />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto px-4">
        <div className="glass rounded-2xl p-4" style={{ border: "1px solid rgba(123,47,255,0.2)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Award size={16} style={{ color: "#7B2FFF" }} />
            <span className="text-xs font-semibold" style={{ color: "#7B2FFF" }}>Free Plan</span>
          </div>
          <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>3/3 projects used. Upgrade for unlimited.</p>
          <Link href="/pricing">
            <button className="btn-primary w-full py-2 rounded-xl text-xs font-semibold">Upgrade to Pro</button>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export function Dashboard() {
  const search = useSearch();
  const showOnboarding = search.includes("onboarding=true");
  const [onboarding, setOnboarding] = useState(showOnboarding);
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQ, setSearchQ] = useState("");
  const [showNewProject, setShowNewProject] = useState(false);

  const filtered = SAMPLE_PROJECTS.filter(p =>
    (activeCategory === "all" || p.type === activeCategory) &&
    p.name.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <div className="min-h-screen flex" style={{ background: "#050508" }}>
      {onboarding && <OnboardingGuide onComplete={() => setOnboarding(false)} />}

      {/* Sidebar */}
      <div className="hidden lg:block border-r" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="sticky top-0 h-screen flex flex-col" style={{ width: 240 }}>
          {/* Logo */}
          <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <Link href="/">
              <div className="flex items-center gap-2.5 cursor-pointer">
                <div className="w-8 h-8 rounded-lg glass-blue flex items-center justify-center glow-blue">
                  <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
                    <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="#00E5FF" strokeWidth="2" fill="rgba(0,102,255,0.3)" />
                    <path d="M16 24l5 5 11-10" stroke="#00E5FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-bold gradient-text-cyan text-base" style={{ fontFamily: "Clash Display, sans-serif" }}>TeleForge</span>
              </div>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 h-16 border-b"
          style={{ background: "rgba(5,5,8,0.9)", backdropFilter: "blur(20px)", borderColor: "rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }} />
              <input
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search projects..."
                className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none w-64"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl btn-ghost">
              <Bell size={16} />
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: "#0066FF" }} />
            </button>
            <div className="w-8 h-8 rounded-full glass-blue flex items-center justify-center text-sm font-bold" style={{ color: "#00E5FF" }}>U</div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {/* Greeting */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "Clash Display, sans-serif" }}>
              Good morning 👋
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)" }}>Here's what's happening with your projects</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map(({ label, value, sub, icon: Icon, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}25` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <TrendingUp size={14} style={{ color: "#00FF88" }} />
                </div>
                <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "Clash Display, sans-serif" }}>{value}</div>
                <div className="text-xs font-medium mb-0.5">{label}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Projects header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold" style={{ fontFamily: "Clash Display, sans-serif" }}>Projects</h2>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{filtered.length} project{filtered.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                {(["grid", "list"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setViewMode(v)}
                    className="p-2 transition-colors"
                    style={{ background: viewMode === v ? "rgba(0,102,255,0.2)" : "transparent", color: viewMode === v ? "#fff" : "rgba(255,255,255,0.4)" }}
                  >
                    {v === "grid" ? <Grid size={16} /> : <List size={16} />}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowNewProject(true)}
                className="btn-primary px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"
              >
                <Plus size={16} />
                New Project
              </button>
            </div>
          </div>

          {/* Projects grid/list */}
          <div className={viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col gap-2"}>
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProjectCard project={p} view={viewMode} />
              </motion.div>
            ))}

            {/* New project card */}
            {viewMode === "grid" && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: filtered.length * 0.05 }}
                onClick={() => setShowNewProject(true)}
                className="glass rounded-2xl h-[180px] flex flex-col items-center justify-center gap-3 hover:border-primary/30 transition-all group"
                style={{ border: "2px dashed rgba(255,255,255,0.08)" }}
                whileHover={{ borderColor: "rgba(0,102,255,0.4)" }}
              >
                <div className="w-12 h-12 rounded-xl glass-blue flex items-center justify-center group-hover:glow-blue transition-all">
                  <Plus size={22} style={{ color: "#0066FF" }} />
                </div>
                <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>New Project</span>
              </motion.button>
            )}
          </div>
        </main>
      </div>

      {/* New Project Modal */}
      <AnimatePresence>
        {showNewProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: "rgba(5,5,8,0.8)", backdropFilter: "blur(8px)" }}
            onClick={() => setShowNewProject(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-lg glass rounded-3xl p-8"
              style={{ border: "1px solid rgba(0,102,255,0.2)" }}
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "Clash Display, sans-serif" }}>New Project</h2>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>Choose a category for your Telegram Mini App</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {APP_TYPES.slice(1).map(({ id, label, icon: Icon }) => (
                  <Link key={id} href={`/builder/new?type=${id}`} onClick={() => setShowNewProject(false)}>
                    <div className="glass rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-primary/30 transition-all group">
                      <Icon size={18} style={{ color: "#0066FF" }} />
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowNewProject(false)} className="btn-ghost flex-1 py-2.5 rounded-xl text-sm">Cancel</button>
                <Link href="/builder/new" className="flex-1" onClick={() => setShowNewProject(false)}>
                  <button className="btn-primary w-full py-2.5 rounded-xl text-sm font-semibold">Start Blank</button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
