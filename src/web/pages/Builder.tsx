import { useState, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Smartphone, Moon, Sun, Download, Play, Undo2, Redo2,
  Layers, Settings, Eye, Code, Zap, Plus, Trash2, Copy, Move,
  Type, Image, Square, List, ToggleLeft, ChevronDown, Sparkles,
  Send, Share2, QrCode, Save, Grid3X3, AlignLeft, AlignCenter
} from "lucide-react";

// Component types available in the panel
const COMPONENT_LIBRARY = [
  {
    category: "Layout",
    items: [
      { id: "header", label: "Header", icon: "▬", preview: <div className="w-full h-8 rounded" style={{ background: "rgba(0,102,255,0.3)", display: "flex", alignItems: "center", paddingLeft: 8 }}><span className="text-xs text-white font-semibold">App Header</span></div> },
      { id: "section", label: "Section", icon: "▭", preview: <div className="w-full h-12 rounded border-2 border-dashed" style={{ borderColor: "rgba(255,255,255,0.2)" }} /> },
      { id: "card", label: "Card", icon: "▢", preview: <div className="w-full h-14 rounded-lg glass p-2"><div className="text-xs text-white font-medium">Card Title</div><div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Subtitle text</div></div> },
      { id: "divider", label: "Divider", icon: "—", preview: <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.2)" }} /> },
    ]
  },
  {
    category: "Content",
    items: [
      { id: "heading", label: "Heading", icon: "T", preview: <div className="text-lg font-bold text-white" style={{ fontFamily: "Clash Display" }}>Heading Text</div> },
      { id: "text", label: "Text Block", icon: "¶", preview: <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Body text goes here and wraps to multiple lines...</div> },
      { id: "image", label: "Image", icon: "🖼", preview: <div className="w-full h-16 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px dashed rgba(255,255,255,0.15)" }}><Image size={16} style={{ color: "rgba(255,255,255,0.3)" }} /></div> },
      { id: "list", label: "List", icon: "☰", preview: <div className="flex flex-col gap-1">{["Item 1","Item 2","Item 3"].map(i => <div key={i} className="flex items-center gap-2 text-xs text-white"><div className="w-1 h-1 rounded-full" style={{ background: "#0066FF" }} />{i}</div>)}</div> },
    ]
  },
  {
    category: "Interactive",
    items: [
      { id: "button", label: "Button", icon: "⬜", preview: <button className="btn-primary px-4 py-2 rounded-xl text-xs w-full">Tap Me</button> },
      { id: "input", label: "Input", icon: "▭", preview: <div className="w-full h-9 rounded-lg px-3 flex items-center text-xs" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)" }}>Type something...</div> },
      { id: "toggle", label: "Toggle", icon: "⊙", preview: <div className="flex items-center gap-2"><div className="w-10 h-5 rounded-full px-0.5 flex items-center" style={{ background: "#0066FF" }}><div className="w-4 h-4 rounded-full bg-white ml-auto" /></div><span className="text-xs text-white">Enabled</span></div> },
      { id: "select", label: "Dropdown", icon: "▾", preview: <div className="w-full h-9 rounded-lg px-3 flex items-center justify-between text-xs" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}><span style={{ color: "rgba(255,255,255,0.5)" }}>Select option</span><ChevronDown size={12} style={{ color: "rgba(255,255,255,0.3)" }} /></div> },
    ]
  },
  {
    category: "Telegram",
    items: [
      { id: "tg-main-btn", label: "Main Button", icon: "✅", preview: <div className="w-full py-3 rounded-xl flex items-center justify-center text-xs font-bold" style={{ background: "#0066FF" }}>CONFIRM</div> },
      { id: "tg-back-btn", label: "Back Button", icon: "←", preview: <div className="flex items-center gap-1 text-xs" style={{ color: "#0066FF" }}><ArrowLeft size={12} />Back</div> },
      { id: "tg-popup", label: "Popup", icon: "⚠", preview: <div className="glass rounded-lg p-3"><div className="text-xs font-semibold text-white mb-1">Alert Title</div><div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>Message text here</div></div> },
      { id: "tg-haptic", label: "Haptic Event", icon: "📳", preview: <div className="flex items-center gap-2 text-xs text-white glass rounded-lg px-3 py-2"><Zap size={12} style={{ color: "#FFB800" }} />Haptic Feedback</div> },
    ]
  },
];

interface CanvasElement {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
  props: Record<string, any>;
}

const DEFAULT_ELEMENTS: CanvasElement[] = [
  { id: "e1", type: "header", label: "Header", x: 0, y: 0, w: 100, h: 48, props: { text: "My Mini App" } },
  { id: "e2", type: "card", label: "Card", x: 8, y: 60, w: 84, h: 80, props: { title: "Welcome Card", subtitle: "Your app description here" } },
  { id: "e3", type: "button", label: "Main Button", x: 8, y: 150, w: 84, h: 44, props: { text: "Get Started", color: "#0066FF" } },
];

function CanvasItem({ el, selected, onClick, onDelete }: { el: CanvasElement; selected: boolean; onClick: () => void; onDelete: () => void }) {
  const renderContent = () => {
    switch (el.type) {
      case "header":
        return <div className="w-full h-full flex items-center px-3 font-semibold text-sm text-white" style={{ background: "rgba(0,102,255,0.4)" }}>{el.props.text || "Header"}</div>;
      case "card":
        return <div className="w-full h-full glass rounded-lg p-3"><div className="font-semibold text-sm text-white">{el.props.title || "Card"}</div><div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{el.props.subtitle || ""}</div></div>;
      case "button":
        return <button className="w-full h-full rounded-xl text-sm font-semibold text-white" style={{ background: el.props.color || "#0066FF" }}>{el.props.text || "Button"}</button>;
      case "text":
        return <div className="w-full h-full p-2 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>{el.props.text || "Text content here"}</div>;
      case "input":
        return <div className="w-full h-full rounded-lg px-3 flex items-center text-xs" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.35)" }}>{el.props.placeholder || "Type here..."}</div>;
      case "tg-main-btn":
        return <div className="w-full h-full flex items-center justify-center text-sm font-bold rounded-xl text-white" style={{ background: "#0066FF" }}>{el.props.text || "CONFIRM"}</div>;
      default:
        return <div className="w-full h-full glass rounded-lg flex items-center justify-center text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{el.label}</div>;
    }
  };

  return (
    <div
      onClick={onClick}
      className="absolute cursor-pointer"
      style={{
        left: `${el.x}%`,
        top: el.y,
        width: `${el.w}%`,
        height: el.h,
        outline: selected ? "2px solid #0066FF" : "none",
        outlineOffset: 2,
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {renderContent()}
      {selected && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center z-10"
          style={{ background: "#ff4444" }}
        >
          <Trash2 size={10} color="white" />
        </button>
      )}
    </div>
  );
}

export function Builder() {
  const [elements, setElements] = useState<CanvasElement[]>(DEFAULT_ELEMENTS);
  const [selected, setSelected] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<"components" | "layers" | "ai">("components");
  const [rightTab, setRightTab] = useState<"properties" | "code">("properties");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [history, setHistory] = useState<CanvasElement[][]>([DEFAULT_ELEMENTS]);
  const [histIdx, setHistIdx] = useState(0);
  const [draggingType, setDraggingType] = useState<string | null>(null);

  const selectedEl = elements.find(e => e.id === selected);

  const pushHistory = (els: CanvasElement[]) => {
    const h = history.slice(0, histIdx + 1);
    h.push(els);
    setHistory(h);
    setHistIdx(h.length - 1);
  };

  const undo = () => {
    if (histIdx > 0) {
      setHistIdx(histIdx - 1);
      setElements(history[histIdx - 1]);
    }
  };
  const redo = () => {
    if (histIdx < history.length - 1) {
      setHistIdx(histIdx + 1);
      setElements(history[histIdx + 1]);
    }
  };

  const addElement = (type: string, label: string) => {
    const newEl: CanvasElement = {
      id: `e${Date.now()}`,
      type,
      label,
      x: 8,
      y: elements.length * 50 + 20,
      w: 84,
      h: type === "button" || type === "tg-main-btn" ? 44 : type === "card" ? 80 : type === "header" ? 48 : 40,
      props: { text: label },
    };
    const next = [...elements, newEl];
    setElements(next);
    pushHistory(next);
    setSelected(newEl.id);
  };

  const deleteSelected = () => {
    if (!selected) return;
    const next = elements.filter(e => e.id !== selected);
    setElements(next);
    pushHistory(next);
    setSelected(null);
  };

  const handleAI = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    // Simulate AI adding components
    const aiElements: CanvasElement[] = [
      { id: `ai1`, type: "header", label: "Header", x: 0, y: 0, w: 100, h: 48, props: { text: aiPrompt.split(" ").slice(0, 3).join(" ") } },
      { id: `ai2`, type: "card", label: "Card", x: 8, y: 60, w: 84, h: 90, props: { title: "Featured Section", subtitle: aiPrompt } },
      { id: `ai3`, type: "button", label: "CTA", x: 8, y: 165, w: 84, h: 44, props: { text: "Learn More", color: "#0066FF" } },
      { id: `ai4`, type: "tg-main-btn", label: "Main Button", x: 8, y: 225, w: 84, h: 44, props: { text: "CONTINUE" } },
    ];
    setElements(aiElements);
    pushHistory(aiElements);
    setAiLoading(false);
    setAiPrompt("");
  };

  const updateProp = (key: string, value: any) => {
    if (!selected) return;
    const next = elements.map(e => e.id === selected ? { ...e, props: { ...e.props, [key]: value } } : e);
    setElements(next);
  };

  const generateCode = () => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://telegram.org/js/telegram-web-app.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, sans-serif; background: var(--tg-theme-bg-color, #fff); color: var(--tg-theme-text-color, #000); }
  </style>
</head>
<body>
${elements.map(el => {
  switch (el.type) {
    case "header": return `  <header style="background:rgba(0,102,255,0.9);padding:16px;font-weight:600;color:white;">${el.props.text || "Header"}</header>`;
    case "card": return `  <div style="margin:16px;padding:16px;border-radius:12px;background:rgba(0,0,0,0.05);">\n    <h3>${el.props.title || ""}</h3>\n    <p>${el.props.subtitle || ""}</p>\n  </div>`;
    case "button": return `  <button onclick="" style="display:block;width:calc(100%-32px);margin:8px 16px;padding:12px;border-radius:12px;background:${el.props.color || "#0066FF"};color:white;border:none;font-weight:600;">${el.props.text || "Button"}</button>`;
    case "tg-main-btn": return `  <script>\n    Telegram.WebApp.MainButton.setText("${el.props.text || "CONFIRM"}");\n    Telegram.WebApp.MainButton.show();\n  </script>`;
    default: return `  <!-- ${el.label} -->`;
  }
}).join("\n")}
</body>
</html>`;
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "#050508" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 h-13 border-b flex-shrink-0"
        style={{ height: 52, borderColor: "rgba(255,255,255,0.06)", background: "rgba(5,5,8,0.95)", backdropFilter: "blur(20px)" }}>
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <button className="p-2 rounded-lg btn-ghost flex items-center gap-1.5 text-sm">
              <ArrowLeft size={16} /> Dashboard
            </button>
          </Link>
          <div className="w-px h-5" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold">My Project</div>
            <div className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(255,184,0,0.15)", color: "#FFB800" }}>Draft</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={undo} disabled={histIdx === 0} className="p-2 rounded-lg btn-ghost disabled:opacity-30"><Undo2 size={16} /></button>
          <button onClick={redo} disabled={histIdx >= history.length - 1} className="p-2 rounded-lg btn-ghost disabled:opacity-30"><Redo2 size={16} /></button>
          <div className="w-px h-5" style={{ background: "rgba(255,255,255,0.08)" }} />
          <button className="p-2 rounded-lg btn-ghost flex items-center gap-1.5 text-xs">
            <Eye size={15} /> Preview
          </button>
          <button
            onClick={() => setShowExport(true)}
            className="btn-primary px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5"
          >
            <Download size={15} /> Export
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL */}
        <div className="w-64 flex-shrink-0 flex flex-col border-r overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(5,5,8,0.8)" }}>
          {/* Tabs */}
          <div className="flex border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {(["components", "layers", "ai"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-3 text-xs font-medium capitalize transition-all"
                style={{
                  color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.4)",
                  borderBottom: activeTab === tab ? "2px solid #0066FF" : "2px solid transparent",
                }}
              >
                {tab === "ai" ? "✨ AI" : tab === "components" ? "⊞ Comp." : "⊟ Layers"}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {activeTab === "components" && (
              <div className="flex flex-col gap-4">
                {COMPONENT_LIBRARY.map(({ category, items }) => (
                  <div key={category}>
                    <p className="text-xs font-semibold mb-2 px-1" style={{ color: "rgba(255,255,255,0.3)" }}>{category.toUpperCase()}</p>
                    <div className="flex flex-col gap-1.5">
                      {items.map(item => (
                        <div
                          key={item.id}
                          draggable
                          onDragStart={() => setDraggingType(item.id)}
                          onDragEnd={() => setDraggingType(null)}
                          onClick={() => addElement(item.id, item.label)}
                          className="glass rounded-xl p-3 cursor-pointer hover:border-primary/30 transition-all group"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-base">{item.icon}</span>
                            <span className="text-xs font-medium">{item.label}</span>
                            <Plus size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#0066FF" }} />
                          </div>
                          <div className="pointer-events-none">{item.preview}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "layers" && (
              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-semibold mb-2 px-1" style={{ color: "rgba(255,255,255,0.3)" }}>CANVAS LAYERS</p>
                {elements.map((el, i) => (
                  <div
                    key={el.id}
                    onClick={() => setSelected(el.id === selected ? null : el.id)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
                    style={{
                      background: selected === el.id ? "rgba(0,102,255,0.15)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${selected === el.id ? "rgba(0,102,255,0.3)" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    <Layers size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                    <span className="text-xs flex-1">{el.label}</span>
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "JetBrains Mono" }}>{i + 1}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "ai" && (
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={15} style={{ color: "#7B2FFF" }} />
                    <span className="text-sm font-semibold">AI Designer</span>
                  </div>
                  <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Describe your Telegram Mini App and AI will generate the layout for you.
                  </p>
                </div>
                <div>
                  <textarea
                    value={aiPrompt}
                    onChange={e => setAiPrompt(e.target.value)}
                    placeholder="e.g. A crypto wallet mini app with balance display, send/receive buttons, and transaction history..."
                    rows={5}
                    className="w-full p-3 rounded-xl text-xs resize-none outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                  />
                  <button
                    onClick={handleAI}
                    disabled={aiLoading || !aiPrompt.trim()}
                    className="btn-primary w-full py-2.5 rounded-xl text-xs font-semibold mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{ boxShadow: "0 0 20px rgba(123,47,255,0.3)" }}
                  >
                    {aiLoading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <><Sparkles size={14} /> Generate Layout</>
                    )}
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Quick prompts:</p>
                  {["E-commerce product page", "User profile screen", "Payment confirmation", "Game score board"].map(p => (
                    <button
                      key={p}
                      onClick={() => setAiPrompt(p)}
                      className="text-left text-xs px-3 py-2 rounded-lg btn-ghost"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CANVAS */}
        <div className="flex-1 flex items-center justify-center overflow-auto p-8 relative grid-bg"
          style={{ background: "rgba(8,8,14,0.8)" }}
          onClick={() => setSelected(null)}
        >
          {/* Toolbar */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 glass rounded-xl px-3 py-2 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); setDarkMode(!darkMode); }}
              className="flex items-center gap-1.5 text-xs btn-ghost px-2.5 py-1.5 rounded-lg"
            >
              {darkMode ? <Sun size={13} /> : <Moon size={13} />}
              {darkMode ? "Light" : "Dark"}
            </button>
            <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.1)" }} />
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>375px × 812px</span>
            <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.1)" }} />
            <Smartphone size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
          </div>

          {/* Phone frame */}
          <div className="relative" style={{ width: 375, flexShrink: 0 }}>
            {/* Phone outer */}
            <div className="absolute -inset-6 rounded-[50px] border-4 pointer-events-none z-10"
              style={{ borderColor: "rgba(255,255,255,0.1)", background: "transparent" }}>
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 rounded-full"
                style={{ background: "rgba(5,5,8,1)" }} />
              {/* Side buttons */}
              <div className="absolute -right-5 top-20 w-1.5 h-12 rounded-r-full" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="absolute -left-5 top-16 w-1.5 h-8 rounded-l-full" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div className="absolute -left-5 top-28 w-1.5 h-8 rounded-l-full" style={{ background: "rgba(255,255,255,0.1)" }} />
              {/* Home bar */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
            </div>

            {/* Canvas area */}
            <div
              className="relative overflow-hidden"
              style={{
                width: 375,
                minHeight: 600,
                borderRadius: 24,
                background: darkMode ? "#1c1c1e" : "#f5f5f5",
                boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
              }}
              onDragOver={e => e.preventDefault()}
              onDrop={e => {
                e.preventDefault();
                if (draggingType) {
                  const lib = COMPONENT_LIBRARY.flatMap(c => c.items).find(i => i.id === draggingType);
                  if (lib) addElement(lib.id, lib.label);
                }
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-5 pt-3 pb-1">
                <span className="text-xs font-semibold" style={{ color: darkMode ? "white" : "#000" }}>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5 items-end">{[3,5,7,9,11].map(h => <div key={h} className="w-1 rounded-sm" style={{ height: h, background: darkMode ? "white" : "#000" }} />)}</div>
                </div>
              </div>

              {/* Elements */}
              <div className="relative px-0 py-0" style={{ minHeight: 500 }}>
                {elements.map(el => (
                  <CanvasItem
                    key={el.id}
                    el={el}
                    selected={selected === el.id}
                    onClick={() => setSelected(el.id === selected ? null : el.id)}
                    onDelete={deleteSelected}
                  />
                ))}

                {elements.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
                    <div className="text-4xl mb-3">✨</div>
                    <p className="text-sm font-medium" style={{ color: darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)" }}>
                      Drag components here or click to add
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-64 flex-shrink-0 flex flex-col border-l overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(5,5,8,0.8)" }}>
          <div className="flex border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {(["properties", "code"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setRightTab(tab)}
                className="flex-1 py-3 text-xs font-medium capitalize transition-all"
                style={{
                  color: rightTab === tab ? "#fff" : "rgba(255,255,255,0.4)",
                  borderBottom: rightTab === tab ? "2px solid #00E5FF" : "2px solid transparent",
                }}
              >
                {tab === "properties" ? "⚙ Props" : "</> Code"}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {rightTab === "properties" && (
              <>
                {selectedEl ? (
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-xs font-semibold mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                        {selectedEl.label.toUpperCase()}
                      </p>
                      {Object.entries(selectedEl.props).map(([key, val]) => (
                        <div key={key} className="mb-3">
                          <label className="text-xs font-medium capitalize mb-1.5 block" style={{ color: "rgba(255,255,255,0.5)" }}>{key}</label>
                          <input
                            value={val as string}
                            onChange={e => updateProp(key, e.target.value)}
                            className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                    <div>
                      <p className="text-xs font-semibold mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>POSITION & SIZE</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[["X", "x"], ["Y", "y"], ["W%", "w"], ["H", "h"]].map(([label, field]) => (
                          <div key={field}>
                            <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</label>
                            <input
                              type="number"
                              value={(selectedEl as any)[field]}
                              onChange={e => {
                                const next = elements.map(el => el.id === selected ? { ...el, [field]: Number(e.target.value) } : el);
                                setElements(next);
                              }}
                              className="w-full px-2 py-1.5 rounded-lg text-xs outline-none"
                              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontFamily: "JetBrains Mono" }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={deleteSelected}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all"
                      style={{ background: "rgba(255,60,60,0.1)", border: "1px solid rgba(255,60,60,0.2)", color: "#ff6b6b" }}
                    >
                      <Trash2 size={13} /> Delete Element
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Settings size={24} style={{ color: "rgba(255,255,255,0.2)" }} className="mb-3" />
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Select an element to edit its properties</p>
                  </div>
                )}
              </>
            )}

            {rightTab === "code" && (
              <div>
                <p className="text-xs font-semibold mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>GENERATED HTML</p>
                <pre className="text-xs p-3 rounded-xl overflow-auto" style={{ background: "rgba(0,0,0,0.3)", color: "#00E5FF", fontFamily: "JetBrains Mono", maxHeight: 500, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                  {generateCode()}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export modal */}
      <AnimatePresence>
        {showExport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: "rgba(5,5,8,0.85)", backdropFilter: "blur(8px)" }}
            onClick={() => setShowExport(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm glass rounded-3xl p-8"
              style={{ border: "1px solid rgba(0,229,255,0.15)" }}
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "Clash Display" }}>Export</h2>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>Choose how to export your mini app</p>
              <div className="flex flex-col gap-3">
                {[
                  { icon: Download, label: "Download HTML/JS", desc: "Single file, ready to deploy", color: "#0066FF" },
                  { icon: Code, label: "React Components", desc: "React + TypeScript code", color: "#00E5FF" },
                  { icon: QrCode, label: "Generate QR Code", desc: "Share preview link", color: "#7B2FFF" },
                  { icon: Send, label: "Deploy to Telegram", desc: "Live in seconds", color: "#00FF88" },
                ].map(({ icon: Icon, label, desc, color }) => (
                  <button key={label} className="glass rounded-xl p-4 flex items-center gap-3 text-left hover:border-primary/30 transition-all">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}18`, border: `1px solid ${color}25` }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{label}</div>
                      <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
