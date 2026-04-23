# @jpglabs/cartesian-red

Design System tokens and motion primitives for the JPGLabs ecosystem.

## Status

`0.1.0` — experimental. Canonical source: [d9-cartesian-red-showcase.html](../../prototypes/d9-cartesian-red-showcase.html)

## Install

```sh
pnpm add @jpglabs/cartesian-red
```

> Not published yet. For now, consume via workspace protocol inside this repo:
> `"@jpglabs/cartesian-red": "workspace:*"`.

## Usage — CSS

Import the canonical CSS custom properties and toggle theme at the document root.

```css
@import '@jpglabs/cartesian-red/tokens.css';
```

```html
<!-- Dark (default) -->
<html data-theme="dark"> ... </html>

<!-- Light -->
<html data-theme="light"> ... </html>
```

All tokens are scoped to `:root` and flip atomically when `data-theme` changes. Accent (`#c04a3f`) is stable across both polarities.

## Usage — TypeScript

```ts
import { cartesianRed, cartesianMotion, computeTilt } from '@jpglabs/cartesian-red';

// Tokens
const panelBg = cartesianRed.themes.dark.bg; // '#0d0d0d'
const accent = cartesianRed.accent.base;     // '#c04a3f'

// Motion primitives
const unit = cartesianMotion.UNIT;           // 12
const tilt = computeTilt(0.1, -0.1);         // DS defaults applied
```

## Consumers (planned)

- `chat.jpglabs.com.br` (Axis, refactor do openclaude-hub)
- `jpglabs.com.br` (brand marketing page, nova)

## Motion handoff — Smart Animate vs código

| # | Motion | Smart Animate? | Target stack | Notes |
|---|---|---|---|---|
| M1 | Cursor Orb (lerp follow) | Não cobre | rAF loop + `pointermove` | Interpolação contínua (`lerp 0.12`) depende de event loop. Figma não tem cursor-follow nativo — documentar só estado inicial/repouso. |
| M2 | Grid Parallax | Não cobre | rAF + CSS `transform` ou GSAP `quickTo` | Deslocamento `−0.03` oposto ao cursor. Em React: `useMotionValue` + `useSpring` (Motion). Em produção, Lenis + GSAP para smooth scroll combinado. |
| M3 | Diagonal Tilt | Não cobre | rAF + CSS `rotate()` | Fórmula `BASE_TILT + px·TILT_X − py·TILT_Y`. DS default (`3° / 1.6 / 1.2`) para produto; showcase usa `5° / 2.7 / 2.0`. Respeitar `prefers-reduced-motion`. |
| M4 | Coord Plot Label | Não cobre | rAF + `Math.round` (UNIT=12px) | Tooltip `(x, y)` recalculado por frame. Fade-in via `opacity` + `var(--ease-out-quart)` 200ms — essa parte cabe em Smart Animate mas o conteúdo do label é dinâmico. |
| M5 | Easter Eggs (pulse + ring) | Cobre (loop) | CSS `@keyframes` infinite | Showcase-only. Não shippar em Axis/jpglabs.com.br. Se reaproveitar o pulse ring em outro contexto, OK — é keyframes simples sem JS. |
| M6 | Origin Pulse Rings | Cobre (loop) | SVG `<animate>` ou CSS `@keyframes` | Dois anéis dessincronizados (2.6s + 3.8s). SVG animate é mais fiel ao protótipo. Em React, `motion.circle` com `animate={...}` + `repeat: Infinity`. |
| M7 | Orbit Ring | Cobre parcial | SVG `animateTransform` ou GSAP timeline | Rotação contínua em torno do origin. Figma anima via After Delay em loop curto, mas dashed stroke + velocidade constante fica mais limpo em SVG ou `gsap.to(..., { rotation: 360, repeat: -1 })`. |
| M8 | Trajectory + Leading Dot | Não cobre | SVG `animateMotion` + `<mpath>` | Dot percorrendo path dashed em 11s com `rotate="auto"`. Em React/GSAP: `gsap.to(dot, { motionPath: { path, autoRotate: true } })` (plugin MotionPath). |
| M9 | Drawer V1 (open/close) | Cobre | Framer Motion `AnimatePresence` | Translate `translateX(100% → 0)` 300ms `var(--ease-out-quart)`. Smart Animate entre 2 frames (drawer fechado/aberto) replica direto. Cuidar de focus trap e aria-modal no código. |
| M10 | Mobile Palette V3 (⌘K) | Cobre | CSS `@keyframes` ou Framer Motion | Overlay fade-in 200ms + palette scale `0.94 → 1` 260ms. Smart Animate entre 2 frames (fechado/aberto). Trigger via FAB (mobile) e `⌘K` (desktop). Primeiro item pré-destacado. |
| M11 | FAB Pulse | Cobre (loop) | CSS `@keyframes` 2.4s | Box-shadow oscilando a cada 2.4s. Suspenso em `prefers-reduced-motion`. Baixo custo — pode ficar puro CSS em produto. |
| — | Theme swap (dark ↔ light) | Cobre | CSS custom props + `data-theme` | Swap instantâneo dos tokens (sem transição). DS contract: polaridade flipa inteira de uma vez, accent (`#c04a3f`) permanece estável. Persistir em `localStorage`; honrar `prefers-color-scheme` no primeiro load. |

## DS vs Showcase-only boundary

Tokens `--grid-line`, `--grid-major` e `--axis` são decorativos do canvas cartesiano do showcase HTML e NÃO fazem parte do package. Eles vivem apenas em `d9-cartesian-red-showcase.html` para renderizar o background grid do motif.

Motion showcase-tuned (`BASE_TILT=5`, `TILT_X_AMP=2.7`, `TILT_Y_AMP=2.0`) existe em `cartesianMotionShowcase` como referência histórica, mas NÃO são DS defaults. Em produto (Axis drawer, jpglabs.com.br hero), use sempre `cartesianMotion` (`BASE_TILT=3`, `TILT_X_AMP=1.6`, `TILT_Y_AMP=1.2`).

## Themes

- **Dark** (default) — superfícies `#0d0d0d → #2c2c2c`, texto `#f0f0f0`, accent halos com alpha baixo (`0.16 / 0.38 / 0.25`).
- **Light** — polaridade inversa, superfícies `#fafafa → #dedede`, texto `#0d0d0d`, accent `#c04a3f` estável em ambas polaridades. Grid alphas são amplificados no showcase-only para manter legibilidade em fundo claro (não afeta o package).

## Roadmap

- [x] 0.1.0 — tokens extraction + motion primitives
- [ ] 0.2.0 — React hooks (`useCartesianCursor`, `useCartesianParallax`)
- [ ] 0.3.0 — Framer Motion + GSAP recipes (drawer, palette, hero reveal)
- [ ] 0.4.0 — tokens packaging decision (monorepo vs npm publish — tech-review-squad call)
