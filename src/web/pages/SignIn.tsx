import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Mail, Phone, Eye, EyeOff, Zap, ArrowLeft, Loader2 } from "lucide-react";
import { authClient } from "../lib/auth";
import { ParticleField } from "../components/ParticleField";

type Method = "email" | "phone" | "telegram";

export function SignIn() {
  const [, navigate] = useLocation();
  const [method, setMethod] = useState<Method>("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (method === "email") {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) throw new Error(res.error.message || "Sign in failed");
      } else {
        await new Promise(r => setTimeout(r, 1200));
      }
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const methods: { id: Method; icon: any; label: string }[] = [
    { id: "email", icon: Mail, label: "Email" },
    { id: "phone", icon: Phone, label: "Phone" },
    { id: "telegram", icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.17l-2.02 9.51c-.15.68-.54.84-1.09.52l-3-2.21-1.45 1.39c-.16.16-.29.29-.6.29l.21-3.01 5.47-4.94c.24-.21-.05-.33-.36-.12L6.3 14.16l-2.93-.92c-.64-.2-.65-.64.13-.95l11.45-4.41c.53-.19 1 .13.99.29z"/>
      </svg>
    ), label: "Telegram" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative px-6 py-16" style={{ background: "#050508" }}>
      <div className="absolute inset-0 grid-bg opacity-30" />
      <ParticleField />
      <div className="orb" style={{ width: 500, height: 500, background: "rgba(0,102,255,0.1)", top: "0", right: "10%", filter: "blur(100px)" }} />
      <div className="orb" style={{ width: 400, height: 400, background: "rgba(123,47,255,0.08)", bottom: "0", left: "10%", filter: "blur(100px)" }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back */}
        <Link href="/">
          <button className="flex items-center gap-2 text-sm mb-8 hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.4)" }}>
            <ArrowLeft size={16} /> Back to home
          </button>
        </Link>

        {/* Card */}
        <div className="glass rounded-3xl p-8" style={{ border: "1px solid rgba(0,102,255,0.15)" }}>
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl glass-blue flex items-center justify-center glow-blue">
              <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
                <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="#00E5FF" strokeWidth="2" fill="rgba(0,102,255,0.3)" />
                <path d="M16 24l5 5 11-10" stroke="#00E5FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-lg font-bold gradient-text-cyan" style={{ fontFamily: "Clash Display, sans-serif" }}>TeleForge</span>
          </div>

          <h1 className="text-3xl font-bold mb-1.5" style={{ fontFamily: "Clash Display, sans-serif" }}>Welcome back</h1>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>Sign in to your account to continue building</p>

          {/* Method selector */}
          <div className="flex rounded-xl p-1 mb-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {methods.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setMethod(id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: method === id ? "rgba(0,102,255,0.25)" : "transparent",
                  color: method === id ? "#fff" : "rgba(255,255,255,0.45)",
                  border: method === id ? "1px solid rgba(0,102,255,0.4)" : "1px solid transparent",
                }}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {method === "email" && (
              <>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }} />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
                      onFocus={e => e.currentTarget.style.borderColor = "rgba(0,102,255,0.5)"}
                      onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>Password</label>
                    <a href="#" className="text-xs hover:text-white transition-colors" style={{ color: "#0066FF" }}>Forgot password?</a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
                      onFocus={e => e.currentTarget.style.borderColor = "rgba(0,102,255,0.5)"}
                      onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {method === "phone" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }} />
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+1 234 567 8900"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff" }}
                  />
                </div>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>We'll send a verification code to this number</p>
              </div>
            )}

            {method === "telegram" && (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,136,204,0.15)", border: "1px solid rgba(0,136,204,0.3)" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="#0088CC">
                    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.17l-2.02 9.51c-.15.68-.54.84-1.09.52l-3-2.21-1.45 1.39c-.16.16-.29.29-.6.29l.21-3.01 5.47-4.94c.24-.21-.05-.33-.36-.12L6.3 14.16l-2.93-.92c-.64-.2-.65-.64.13-.95l11.45-4.41c.53-.19 1 .13.99.29z"/>
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-medium mb-1">Continue with Telegram</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>You'll be redirected to Telegram to authenticate your identity</p>
                </div>
              </div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl text-sm"
                style={{ background: "rgba(255,60,60,0.1)", border: "1px solid rgba(255,60,60,0.2)", color: "#ff6b6b" }}
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 mt-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} />}
              {method === "telegram" ? "Open Telegram" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Don't have an account?{" "}
            <Link href="/sign-up">
              <span className="font-medium hover:text-white transition-colors cursor-pointer" style={{ color: "#00E5FF" }}>
                Create one free
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
