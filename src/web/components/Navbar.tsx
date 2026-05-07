import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, Bell, ChevronDown } from "lucide-react";

interface NavbarProps {
  isAuthenticated?: boolean;
  user?: { name?: string; email?: string } | null;
}

export function Navbar({ isAuthenticated, user }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "Templates", href: "/templates" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "#" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,5,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-8 h-8 rounded-lg glass-blue flex items-center justify-center glow-blue">
              <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="#00E5FF" strokeWidth="2" fill="rgba(0,102,255,0.3)" />
                <path d="M16 24l5 5 11-10" stroke="#00E5FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-lg font-bold gradient-text-cyan" style={{ fontFamily: "Clash Display, sans-serif" }}>
              TeleForge
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium transition-all duration-200 hover:text-white"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <button className="text-sm font-medium px-4 py-2 rounded-lg btn-ghost">
                  Dashboard
                </button>
              </Link>
              <div className="w-8 h-8 rounded-full glass-blue flex items-center justify-center text-sm font-bold" style={{ color: "#00E5FF" }}>
                {user?.name?.[0] || user?.email?.[0] || "U"}
              </div>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <button className="text-sm font-medium px-4 py-2 btn-ghost rounded-lg">
                  Sign In
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="btn-primary text-sm px-5 py-2 rounded-lg flex items-center gap-2">
                  <Zap size={14} />
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg btn-ghost"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(5,5,8,0.98)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium py-2"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <Link href="/sign-in">
                  <button className="w-full btn-ghost text-sm py-2.5 rounded-lg">Sign In</button>
                </Link>
                <Link href="/sign-up">
                  <button className="w-full btn-primary text-sm py-2.5 rounded-lg">Get Started Free</button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
