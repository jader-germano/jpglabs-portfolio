# openClaude Hub — design prototype

Static HTML prototype for the unified chat UI that will live at `chat.jpglabs.com.br`. Captures the look & feel of Claude.app (warm cream/paper background, clay accent, Anthropic Sans/Serif) rebranded for JPG Labs.

## View it

```bash
open /Users/philipegermano/code/jpglabs/jpglabs-portfolio/prototypes/openclaude-hub/index.html
```

No build step, no server needed. Fonts load via relative `fonts/` paths.

## Files

- `index.html` — markup, inline Lucide-style SVG sprite
- `styles.css` — design tokens + layout (light + `.darkTheme`)
- `script.js` — theme toggle, sidebar collapse, model picker, mode tabs, textarea auto-grow

## Design decisions

- **2-pane layout** (sidebar + main). Right panel reserved for future artifacts/settings.
- **Sample conversation** as the default view (shows user bubble, assistant block, and a terminal output block that hints at Agent mode).
- **Inline SVG sprite** instead of Lucide CDN — works offline when double-clicking the file.
- **Clay accent (`#d97757`)** used only for: logo mark, new-chat CTA, send button, active selection dot, focus ring.
- **Serif** (`AnthropicSerif`) for the `openClaude Hub` wordmark only; body is `AnthropicSans`.
- **Theme preference persists** to `localStorage` and respects `prefers-color-scheme` on first load.

## To iterate on

- Welcome state toggle (big serif "How can I help today?" + suggestion cards) — class hook `.welcome` is already present.
- Right panel for artifacts/inspector when in Agent mode.
- Conversation grouping (Today / Yesterday / Last 7 days).
- Keyboard shortcut hints in the composer.
