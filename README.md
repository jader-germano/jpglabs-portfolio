# jpglabs-portfolio

> **Stack:** React 19 + Vite 7 + Tailwind 4 + React Router 7 · SPA · dev port 5173 · prod serve via nginx :80
> **Role in workspace:** canonical **frontend** repo da JPGLabs. Heroes e páginas públicas + áreas logadas vivem aqui como SPA React + Vite.

## Intenção arquitetural (2026-04-23)

Este é o **único** repo frontend ativo do stack JPGLabs. Padrão escolhido: **React + Vite** — não Next.js. Qualquer página, hero ou componente usado em produção deve viver aqui.

Duplicações atuais em `portfolio-backend/components/` serão migradas pra cá; o `portfolio-backend` fica **só com responsabilidade de backend** (Next.js hoje → NestJS no futuro).

- `jpglabs-dashboard` (Next.js) fica fora da consolidação por enquanto — migração dele (Next → NestJS + React/Angular) é o último passo.

## Stack

- Runtime: Node 20
- Bundler: Vite 7.3.1
- UI: React 19 + React Router 7
- Estilo: Tailwind 4 (`@tailwindcss/vite`)
- Auth/data: Supabase client + Context API (`src/context/AuthContext.tsx`)
- Testes: Vitest + Testing Library
- Design system: workspace package `@jpglabs/cartesian-red` (tokens + motion)

## Páginas (hoje)

`src/pages/`: Home, Services, ServiceDetail, ProductDetail, Hub, Instances, Guardian, Downloads, Docs, Portfolio, PortfolioManager, Login, AuthCallback, Offer, Terms, Privacy. Guardas em `src/components/ProtectedRoute.tsx` + `src/context/AuthContext.tsx`.

## Scripts

```bash
npm run dev        # vite dev server (5173)
npm run build      # tsc -b && vite build → dist/
npm run preview    # vite preview
npm test           # vitest run
```

## AUTH_BYPASS (deploy-time)

`VITE_AUTH_BYPASS=true` no build injeta um `ROOT_ADMIN` sintético em `AuthContext` e desliga a assinatura Supabase — uso restrito a testes de funcionalidade. Default (unset/false) preserva auth real. Ver `src/context/AuthContext.tsx` e MR !2 (branch `feat/shared-auth-realm-s1a`).

## Deploy

- Alvo: VPS (k3s namespace `prod`), imagem provisória `portfolio-v2:latest` (nome será padronizado para `jpglabs-portfolio:*` pós-consolidação)
- Ingress: Traefik → Cloudflare Tunnel → `jpglabs.com.br`

## Consolidação em andamento

Documentos canônicos:
- `docs/presentations/arch-local-vs-vps-2026-04-23.md` (arquitetura local + VPS)
- `FrankMD/notes/history/april-2026/auth-bypass-k3s-cleanup-round.md` (handoff)
- Contexto fino: `docs/projects/jpglabs-portfolio/`
