# TeleForge Design System

## Brand
TeleForge — The most advanced Telegram Mini App builder. Futuristic, powerful, fancy.

## Color Palette
- Background: `#050508` (deep space black)
- Surface: `#0d0d14` (dark card bg)
- Surface2: `#12121f` (elevated surface)
- Border: `rgba(255,255,255,0.07)`
- Primary: `#0066FF` (electric blue)
- Primary Glow: `rgba(0,102,255,0.3)`
- Accent: `#00E5FF` (neon cyan)
- Accent Glow: `rgba(0,229,255,0.2)`
- Purple: `#7B2FFF`
- Purple Glow: `rgba(123,47,255,0.25)`
- Text: `#FFFFFF`
- Text Muted: `rgba(255,255,255,0.5)`
- Text Dim: `rgba(255,255,255,0.25)`
- Success: `#00FF88`
- Warning: `#FFB800`

## Typography
- Display/Headings: `Clash Display` (Variable) — bold, striking
- Body: `DM Sans` — clean, readable
- Mono: `JetBrains Mono` — code/numbers

## Spacing
- Base unit: 4px
- Section padding: 120px vertical, 80px tablet, 48px mobile
- Card padding: 24px / 32px

## Effects
- Glassmorphism: `backdrop-filter: blur(20px)` with `rgba(255,255,255,0.04)` bg
- Glow borders: `box-shadow: 0 0 0 1px rgba(0,102,255,0.3), 0 0 30px rgba(0,102,255,0.1)`
- Neon glow text: `text-shadow: 0 0 30px rgba(0,229,255,0.5)`
- Cards: subtle gradient border via `border: 1px solid rgba(255,255,255,0.08)`

## Motion (Framer Motion)
- Page enter: fade up, stagger 0.1s
- Cards: hover lift 4px + glow intensify
- Loading: logo morph + particle burst
- 3D canvas: Three.js floating particles and phone mockup
- Scroll: parallax depth layers

## Layout
- Max width: 1280px
- Grid: 12-column
- Breakpoints: sm 640, md 768, lg 1024, xl 1280

## Anti-patterns to avoid
- No purple/white gradients
- No Inter or Roboto
- No flat card grids without depth
- No generic SaaS layouts
