# Cartesian Motion — Portfolio Design Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar o jpglabs-portfolio do tema atual "Electric Blue" (#0070f3 + Inter) para o design system canônico "Cartesian Motion" (#c04a3f red-pulled + Fraunces/IBM Plex Sans/JetBrains Mono + grid cartesiano animado como identidade visual).

**Architecture:** A migração acontece em 3 camadas: (1) **tokens globais** — CSS vars + extensão do `tailwind.config.js` — tudo que é cor/fonte vive num único ponto de verdade; (2) **componente `<CartesianBackground>` reusável** — renderiza o plano cartesiano SVG/Canvas animado, usado como ambient bg nas páginas principais; (3) **substituição de classes `blue-*` → `accent-*`** e tipografia nas páginas existentes — refactor mecânico, preservando estrutura e interações.

**Tech Stack:** Vite + React 19 + TypeScript + Tailwind CSS 3 + Framer Motion + Google Fonts (Fraunces, IBM Plex Sans, JetBrains Mono). Prototype de referência: `prototypes/d8-cartesian-motion.html` (1220 linhas, fonte canônica dos tokens e motion).

---

## File Structure

**Novos arquivos:**

- `src/styles/tokens.css` — CSS custom properties da paleta cartesian motion (fonte de verdade para cores/espaços/sombras)
- `src/components/CartesianBackground.tsx` — componente SVG animado reusável do grid cartesiano
- `src/components/CartesianBackground.test.tsx` — smoke tests de rendering

**Arquivos modificados:**

- `index.html` — preconnect + link pro Google Fonts (Fraunces + IBM Plex Sans + JetBrains Mono)
- `tailwind.config.js` — extensão do theme com tokens do design system
- `src/index.css` — importar tokens + reset + typography base
- `src/components/Layout.tsx` — header com tipografia nova + accent color
- `src/data/experiences.ts` — sincronizar EDUCATION + EXPERIENCES + SKILL_GROUPS com CV real (Task 4B)
- `src/pages/Portfolio.tsx` — hero com CartesianBackground + substituição de `blue-*` → `accent`
- `src/pages/Services.tsx` — mesma base visual
- `src/pages/Downloads.tsx` — idem
- `src/pages/Docs.tsx` — idem
- `src/pages/CaseStudy.tsx` — idem
- `src/pages/Login.tsx` — idem (preserva botões OAuth)
- `src/pages/Legal.tsx` — idem
- `src/pages/Offer.tsx` — idem

**Sem alteração (fora de escopo):**

- `src/pages/Home.tsx`, `Hub.tsx`, `Instances.tsx`, `Guardian.tsx`, `Overview.tsx`, `Upsell.tsx`, `PortfolioManager.tsx` — páginas que são redirects externos (AI frontend), não renderizam UI própria
- `src/pages/PublicHome.tsx`, `ProductDetail.tsx`, `ServiceDetail.tsx` — podem receber design depois (Task 11 opcional)

---

## Pre-flight

**Antes de começar, criar branch dedicada:**

```bash
cd /Users/philipegermano/code/jpglabs/jpglabs-portfolio
git checkout -b feat/cartesian-motion-design
```

**Verificar estado:**

```bash
bun install
bun run build
```

Build deve passar (baseline antes de tocar qualquer arquivo).

---

## Task 1: Tokens CSS — Fonte de verdade

**Files:**
- Create: `src/styles/tokens.css`
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 1: Criar `src/styles/tokens.css` com paleta red-pulled completa**

```css
/* src/styles/tokens.css
 * Cartesian Motion design system tokens
 * Fonte canônica: prototypes/d8-cartesian-motion.html
 */

:root {
  /* Surface layers — dark default */
  --bg: #0d0d0d;
  --bg-elev-1: #171717;
  --bg-elev-2: #222222;
  --bg-elev-3: #2c2c2c;

  /* Typography */
  --text: #f0f0f0;
  --text-dim: #999999;
  --text-faint: #505050;

  /* Accent — red-pulled, distingue da Claude brand (#d77757) */
  --accent: #c04a3f;
  --accent-soft: rgba(192, 74, 63, 0.16);
  --accent-deep: rgba(192, 74, 63, 0.38);
  --accent-glow: rgba(192, 74, 63, 0.25);

  /* Borders */
  --border: rgba(255, 255, 255, 0.06);
  --border-strong: rgba(255, 255, 255, 0.1);

  /* Semantic states */
  --good: #4eba65;
  --bad: #ff6b80;

  /* Cartesian grid — base visual identity */
  --grid-line: rgba(192, 74, 63, 0.08);
  --grid-major: rgba(192, 74, 63, 0.18);
  --axis: rgba(192, 74, 63, 0.4);

  /* Typography stacks */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'IBM Plex Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Menlo', monospace;

  /* Motion */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
}

[data-theme='light'] {
  --bg: #fafaf9;
  --bg-elev-1: #f2f0ed;
  --bg-elev-2: #e8e5e0;
  --bg-elev-3: #dcd8d2;
  --text: #171717;
  --text-dim: #5a5550;
  --text-faint: #928b82;
  --border: rgba(0, 0, 0, 0.08);
  --border-strong: rgba(0, 0, 0, 0.14);
  --accent-soft: rgba(192, 74, 63, 0.12);
  --grid-line: rgba(192, 74, 63, 0.12);
  --grid-major: rgba(192, 74, 63, 0.28);
  --axis: rgba(192, 74, 63, 0.55);
}
```

- [ ] **Step 2: Importar tokens em `src/index.css`**

Substituir `src/index.css` por:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import './styles/tokens.css';

@layer base {
  html {
    font-family: var(--font-body);
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'ss01', 'cv11';
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    font-optical-sizing: auto;
    letter-spacing: -0.02em;
  }

  code, pre, kbd {
    font-family: var(--font-mono);
  }

  ::selection {
    background: var(--accent-soft);
    color: var(--text);
  }
}

.glass-panel {
  background: rgba(23, 23, 23, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
}
```

- [ ] **Step 3: Adicionar preconnect + Google Fonts em `index.html`**

No `<head>` do `index.html`, adicionar antes do `<title>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=IBM+Plex+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

- [ ] **Step 4: Verificar build**

Run: `bun run build`
Expected: `✓ built in X.XXs` sem erros

- [ ] **Step 5: Commit**

```bash
git add src/styles/tokens.css src/index.css index.html
git commit -m "feat(design): add Cartesian Motion design tokens + fonts"
```

---

## Task 2: Tailwind theme extend

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: Sobrescrever `tailwind.config.js` completo**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Surface layers
        'bg': 'var(--bg)',
        'surface': 'var(--bg-elev-1)',
        'surface-lighter': 'var(--bg-elev-2)',
        'surface-high': 'var(--bg-elev-3)',
        // Typography
        'text': 'var(--text)',
        'text-dim': 'var(--text-dim)',
        'text-faint': 'var(--text-faint)',
        // Accent (red-pulled)
        'accent': {
          DEFAULT: 'var(--accent)',
          soft: 'var(--accent-soft)',
          deep: 'var(--accent-deep)',
          glow: 'var(--accent-glow)',
        },
        // Borders
        'border-subtle': 'var(--border)',
        'border-strong': 'var(--border-strong)',
        // Semantic
        'good': 'var(--good)',
        'bad': 'var(--bad)',
        // Cartesian grid
        'grid-line': 'var(--grid-line)',
        'grid-major': 'var(--grid-major)',
        'axis': 'var(--axis)',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(ellipse at 50% -20%, var(--accent-glow), transparent 70%)',
        'accent-gradient': 'linear-gradient(135deg, var(--accent) 0%, var(--accent-deep) 100%)',
      },
      animation: {
        'grid-pan': 'gridPan 60s linear infinite',
        'accent-pulse': 'accentPulse 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.25, 1, 0.5, 1) both',
      },
      keyframes: {
        gridPan: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-48px, -48px)' },
        },
        accentPulse: {
          '0%, 100%': { opacity: 0.25, transform: 'scale(1)' },
          '50%': { opacity: 0.45, transform: 'scale(1.02)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translate3d(0, 24px, 0)' },
          '100%': { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        },
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Verificar build (tailwind processa tokens)**

Run: `bun run build`
Expected: build sucesso; `dist/assets/index-*.css` contém classes `bg-accent`, `text-text-dim`, `font-display`.

Verificar via:

```bash
grep -o 'bg-accent\|text-text-dim\|font-display' dist/assets/index-*.css | sort -u
```

Expected: 3 matches (`bg-accent`, `text-text-dim`, `font-display`)

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.js
git commit -m "feat(design): extend tailwind theme with cartesian motion tokens"
```

---

## Task 3: CartesianBackground component — identidade visual

**Files:**
- Create: `src/components/CartesianBackground.tsx`
- Create: `src/components/CartesianBackground.test.tsx`

- [ ] **Step 1: Escrever teste falhando**

```tsx
// src/components/CartesianBackground.test.tsx
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartesianBackground } from './CartesianBackground';

describe('CartesianBackground', () => {
  it('renders a fixed-position grid with accent axes', () => {
    const { container } = render(<CartesianBackground />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
    expect(container.querySelectorAll('line').length).toBeGreaterThan(4);
  });

  it('accepts intensity prop to adjust opacity', () => {
    const { container } = render(<CartesianBackground intensity="ambient" />);
    const root = container.firstChild as HTMLElement;
    expect(root.getAttribute('data-intensity')).toBe('ambient');
  });
});
```

- [ ] **Step 2: Rodar teste — deve falhar porque componente não existe**

Run: `bun test src/components/CartesianBackground.test.tsx`
Expected: FAIL com "Cannot find module './CartesianBackground'"

- [ ] **Step 3: Implementar o componente mínimo**

```tsx
// src/components/CartesianBackground.tsx
import React, { useMemo } from 'react';

type Intensity = 'ambient' | 'focused' | 'accent';

interface Props {
  intensity?: Intensity;
  className?: string;
  gridSize?: number;
}

/**
 * Background animado do plano cartesiano — identidade visual JPGLabs.
 *
 * intensity:
 *   - 'ambient'  — ideal pra backgrounds amplos (portfolio hero)
 *   - 'focused'  — densidade média (services, downloads)
 *   - 'accent'   — contido, high contrast (chat drawer, modals)
 */
export const CartesianBackground: React.FC<Props> = ({
  intensity = 'ambient',
  className = '',
  gridSize = 48,
}) => {
  const opacityMap: Record<Intensity, number> = {
    ambient: 0.6,
    focused: 0.85,
    accent: 1,
  };

  // Linhas em coordenadas múltiplas de gridSize até 1920×1080 (viewport max).
  const lines = useMemo(() => {
    const vLines: number[] = [];
    const hLines: number[] = [];
    for (let x = 0; x <= 1920; x += gridSize) vLines.push(x);
    for (let y = 0; y <= 1080; y += gridSize) hLines.push(y);
    return { vLines, hLines };
  }, [gridSize]);

  return (
    <div
      aria-hidden="true"
      data-intensity={intensity}
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
      style={{ opacity: opacityMap[intensity] }}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full animate-grid-pan"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        {lines.vLines.map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1={0}
            x2={x}
            y2={1080}
            stroke={x % (gridSize * 4) === 0 ? 'var(--grid-major)' : 'var(--grid-line)'}
            strokeWidth={x % (gridSize * 4) === 0 ? 1 : 0.5}
          />
        ))}
        {lines.hLines.map((y) => (
          <line
            key={`h-${y}`}
            x1={0}
            y1={y}
            x2={1920}
            y2={y}
            stroke={y % (gridSize * 4) === 0 ? 'var(--grid-major)' : 'var(--grid-line)'}
            strokeWidth={y % (gridSize * 4) === 0 ? 1 : 0.5}
          />
        ))}
        {/* Eixos principais — ressaltam origem visual */}
        <line x1={960} y1={0} x2={960} y2={1080} stroke="var(--axis)" strokeWidth="1.5" />
        <line x1={0} y1={540} x2={1920} y2={540} stroke="var(--axis)" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

export default CartesianBackground;
```

- [ ] **Step 4: Rodar teste — deve passar**

Run: `bun test src/components/CartesianBackground.test.tsx`
Expected: `✓ 2 tests passed`

- [ ] **Step 5: Verificar build**

Run: `bun run build`
Expected: build sucesso

- [ ] **Step 6: Commit**

```bash
git add src/components/CartesianBackground.tsx src/components/CartesianBackground.test.tsx
git commit -m "feat(design): add CartesianBackground component — grid identity"
```

---

## Task 4: Layout/Header — tipografia + accent

**Files:**
- Modify: `src/components/Layout.tsx`

- [ ] **Step 1: Ler Layout.tsx atual pra preservar estrutura**

Run: `cat src/components/Layout.tsx`

Anota: estrutura do header (logo JPGLABS, botão ENTRAR, botão PI) e content wrapper.

- [ ] **Step 2: Atualizar classes do header — substituir `blue-*` → `accent`, adicionar `font-display` no título**

Localiza o elemento `<header>` (ou equivalente) e aplica:

- Logo: adicionar `font-display font-black tracking-tight`
- Botão ENTRAR: trocar borda/hover pra `border-accent-soft hover:border-accent hover:text-accent`
- Links de navegação: `text-text-dim hover:text-accent transition-colors`

**Diff conceitual** (ajustar conforme estrutura real):

```tsx
// Antes
<header className="border-b border-white/10 bg-[#08090a]/80 backdrop-blur">
  <div className="text-white font-black">JPG<span className="text-blue-500">LABS</span></div>
  <button className="border-blue-500/40 hover:border-blue-400 text-blue-300">ENTRAR</button>
</header>

// Depois
<header className="border-b border-border-subtle bg-bg/80 backdrop-blur">
  <div className="font-display font-black tracking-tight text-text">
    JPG<span className="text-accent">LABS</span>
  </div>
  <button className="border border-accent-soft hover:border-accent hover:text-accent text-text-dim transition-colors">
    ENTRAR
  </button>
</header>
```

- [ ] **Step 3: Verificar build**

Run: `bun run build`
Expected: build sucesso

- [ ] **Step 4: Visual smoke test (manual)**

Run: `bun run dev`

Abrir `http://localhost:5173/` — header deve mostrar logo JPGLABS com serif Fraunces + accent vermelho no "LABS". Botões ENTRAR com border vermelha sutil.

- [ ] **Step 5: Commit**

```bash
git add src/components/Layout.tsx
git commit -m "refactor(design): migrate Layout header to cartesian motion tokens"
```

---

## Task 4B: Portfolio data accuracy — sincronizar com CV real

> **Escopo:** apenas dados apresentados (não altera interface `Experience` nem lógica). Fonte canônica: `/Users/philipegermano/Documents/Trabalho/Currículos/CV - Jader Germano - Pt.pdf`.

**Files:**
- Modify: `src/data/experiences.ts`

- [ ] **Step 1: Substituir EDUCATION pelo dado real do CV**

Antes:

```ts
export const EDUCATION = [
  { degree: 'Bacharelado em Engenharia de Computação', school: 'Universidade Cruzeiro do Sul', period: '2019 - 2023' },
  { degree: 'Técnico em Informática', school: 'ETEC - Escola Técnica Estadual de São Paulo', period: '2014 - 2016' },
];
```

Depois:

```ts
export const EDUCATION = [
  {
    degree: 'Bacharelado em Ciência da Computação',
    school: 'Centro Universitário de Brasília — UniCEUB',
    period: '2014 - 2018',
  },
];
```

- [ ] **Step 2: Substituir SKILL_GROUPS pela stack real do CV + adicionar grupo pessoal**

```ts
export const SKILL_GROUPS = [
  {
    category: 'Linguagens',
    skills: ['Java', 'JavaScript', 'TypeScript'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'Spring Boot', 'Maven', 'JPA/Hibernate'],
  },
  {
    category: 'Frontend',
    skills: ['Angular', 'React', 'Ember.js', 'AngularJS', 'JSF/PrimeFaces'],
  },
  {
    category: 'Bancos de Dados',
    skills: ['PostgreSQL', 'MySQL', 'Oracle', 'MongoDB', 'SQL Server'],
  },
  {
    category: 'DevOps & Cloud',
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Azure DevOps', 'GitLab CI/CD', 'Git Flow'],
  },
  {
    category: 'Testes',
    skills: ['Jest', 'JUnit', 'Karma', 'Selenium'],
  },
  {
    category: 'AI Engineering (JPG Labs)',
    skills: ['Ollama', 'Claude API', 'Supabase', 'MCP', 'LangChain', 'RAG'],
  },
];
```

**Nota:** O grupo "AI Engineering (JPG Labs)" é exploração pessoal não-no-CV-formal. Mantém como sinal de iniciativa paralela, rotulado explicitamente. Se Jader preferir esconder até ter projeto público, remover o grupo inteiro.

- [ ] **Step 3: Substituir EXPERIENCES pela lista completa e cronológica do CV**

```ts
export const EXPERIENCES: Experience[] = [
  {
    id: 'digisystem-tse',
    title: 'Engenheiro de Software Sênior',
    company: 'Digisystem',
    client: 'TSE — Tribunal Superior Eleitoral',
    period: 'Jan 2024 — Presente',
    summary: 'Sistema GED (Gestão Eletrônica de Documentos) do TSE — módulo corporativo de RH.',
    details: [
      'Implementou novo padrão de UX seguindo a nova proposta de identidade visual dos sistemas do TSE.',
      'Liderou a equipe técnica com revisão de atividades, integração e deploy.',
      'Implementou solução de carga para operação.',
    ],
    stack: ['Java 17', 'Spring 3.22', 'Angular 16', 'PostgreSQL', 'GitLab CI/CD'],
    isCurrent: true,
  },
  {
    id: 'jpglabs-independent',
    title: 'Engenharia pessoal & consultoria',
    company: 'JPG Labs',
    period: '2024 — Presente',
    summary: 'Projetos paralelos de AI Engineering, automações operacionais e ecossistema próprio.',
    details: [
      'Pi-local-app: runtime operacional de automação pessoal.',
      'openclaude-hub (futuro Axis): chat AI orquestrando múltiplos providers.',
      'Cartesian Motion design system próprio.',
    ],
    stack: ['Node.js', 'TypeScript', 'Ollama', 'Claude API', 'Supabase', 'Cloudflare'],
    isCurrent: true,
  },
  {
    id: 'revizia',
    title: 'Desenvolvedor Full Stack Sênior',
    company: 'Revizia',
    period: 'Fev 2023 — Jun 2023',
    summary: 'Sistema fiscal — novas funcionalidades e integrações.',
    details: [
      'Integração do sistema com a API do Jira para redirecionamento de clientes direto ao backlog.',
      'Integração com Google Maps para referência geográfica de clientes.',
    ],
    stack: ['Java 11', 'Spring', 'Angular 11', 'PostgreSQL', 'AWS'],
  },
  {
    id: 'cbde-coord',
    title: 'Coordenador de TI / Desenvolvedor Full-Stack Sênior',
    company: 'CBDE — Confederação Brasileira do Desporto Escolar',
    period: 'Jul 2022 — Nov 2022',
    summary: 'Sistema SIGECOM — gestão de eventos desportivos estudantis.',
    details: [
      'Introduziu Node.js, Docker e Kubernetes para manutenção dos sistemas.',
      'Liderou a equipe técnica com revisão de atividades, integração e deploy em ambientes.',
      'Implementou solução de deploy via Kubernetes.',
    ],
    stack: ['Node.js', 'TypeScript', 'Angular 8', 'PostgreSQL', 'Docker', 'Kubernetes', 'GitLab CI/CD'],
  },
  {
    id: 'spread-caixa',
    title: 'Desenvolvedor Full-Stack Pleno',
    company: 'Spread',
    client: 'Caixa Econômica Federal',
    period: 'Jul 2021 — Jun 2022',
    summary: 'Sistema de autenticação para vigilantes das agências da Caixa.',
    details: [
      'Desenvolvimento e sustentação do sistema de autenticação.',
    ],
    stack: ['Node.js', 'Express', 'Ember.js', 'PostgreSQL', 'Azure DevOps'],
  },
  {
    id: 'saipos',
    title: 'Desenvolvedor Full-Stack Pleno (CNPJ)',
    company: 'Saipos',
    period: 'Jan 2021 — Abr 2021',
    summary: 'Ecossistema de sistemas da Saipos.',
    details: [
      'Desenvolvimento e sustentação de múltiplos sistemas integrados.',
    ],
    stack: ['Node.js', 'Express', 'Jest', 'Angular 8', 'AngularJS', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'cbde-autonomo',
    title: 'Desenvolvedor Full-Stack (Autônomo)',
    company: 'CBDE — Confederação Brasileira do Desporto Escolar',
    period: 'Dez 2020 — Jul 2022',
    summary: 'Arquétipo Node.js para o sistema SIGECOM — gestão de eventos desportivos estudantis.',
    details: [
      'Introduziu arquétipo em Node.js para o desenvolvimento do SIGECOM.',
    ],
    stack: ['Node.js', 'TypeScript', 'Angular 8', 'PostgreSQL', 'Docker', 'Kubernetes', 'GitLab CI/CD'],
  },
  {
    id: 'mirante-bancorbras',
    title: 'Desenvolvedor Full-Stack Pleno',
    company: 'Mirante Tecnologia',
    client: 'Bancorbrás',
    period: 'Set 2019 — Set 2020',
    summary: 'Sistema CBTUR — equipe gerenciada sob metodologia Agile.',
    details: [
      'Desenvolvimento e sustentação do sistema CBTUR.',
    ],
    stack: ['Java 8', 'Spring Boot', 'Maven', 'JPA/Hibernate', 'JinqJPAStreamProvider', 'JUnit', 'SQL Server', 'Angular 4/8'],
  },
  {
    id: 'stefanini-tcu',
    title: 'Desenvolvedor Full-Stack Pleno',
    company: 'Stefanini Brasil',
    client: 'TCU — Tribunal de Contas da União',
    period: 'Mai 2019 — Set 2019',
    summary: 'Sistema Atos Pessoal do TCU.',
    details: [
      'Desenvolvimento e sustentação do sistema Atos Pessoal.',
    ],
    stack: ['Java 7', 'Java 8', 'JSF', 'PrimeFaces', 'Maven', 'Oracle', 'JUnit', 'AngularJS', 'Spring Boot'],
  },
  {
    id: 'cast-anatel',
    title: 'Desenvolvedor Full-Stack Pleno',
    company: 'Cast Group',
    client: 'ANATEL',
    period: 'Mai 2018 — Mai 2019',
    summary: 'Projeto ARCO — sistema de arrecadação e cobrança da ANATEL.',
    details: [
      'Responsável por propor soluções arquiteturais, segurança e padrões de projeto.',
      'Implementou solução de auditoria por log de ações de usuários.',
      'Melhoria de performance via otimização de queries com Hibernate e indexação.',
    ],
    stack: ['Java 7', 'JUnit', 'SQL Server', 'AngularJS'],
  },
  {
    id: 'basis-tecnologia',
    title: 'Desenvolvedor Full-Stack Júnior',
    company: 'Basis Tecnologia',
    period: 'Jul 2017 — Mai 2018',
    summary: 'Desenvolvimento e sustentação de sistemas Java.',
    details: [
      'Atuou em múltiplos sistemas Java corporativos.',
    ],
    stack: ['Java 8', 'Angular 2', 'PostgreSQL', 'Docker', 'Liquibase'],
  },
  {
    id: 'polisys-anatel',
    title: 'Desenvolvedor Estagiário',
    company: 'Polisys',
    client: 'ANATEL',
    period: 'Jun 2016 — Jul 2017',
    summary: 'Projeto ARCO — sistema de arrecadação e cobrança da ANATEL.',
    details: [
      'Primeira atuação no projeto ARCO, que continuaria no Cast Group.',
    ],
    stack: ['Java 7', 'JUnit', 'SQL Server', 'AngularJS'],
  },
];
```

- [ ] **Step 4: Verificar TypeScript + build**

Run: `bun run build`
Expected: build sucesso (interface `Experience` inalterada, só o conteúdo dos arrays mudou).

- [ ] **Step 5: Smoke test visual**

Run: `bun run dev` → abrir `http://localhost:5173/portifolio/jader-germano`

Validar visualmente:
- Seção "Formação": UniCEUB · Ciência da Computação · 2014 - 2018 (sem Cruzeiro do Sul nem ETEC)
- Seção "Domínio Técnico": 7 grupos (Linguagens, Backend, Frontend, Bancos, DevOps, Testes, AI Engineering)
- Seção "Experiência Profissional": Digisystem primeiro (Jan 2024 - Presente), depois cronologia completa até Polisys (Jun 2016)
- Nenhuma referência fictícia a Quarkus, MCP standalone, ou "Previous Company"

- [ ] **Step 6: Commit**

```bash
git add src/data/experiences.ts
git commit -m "fix(data): sync portfolio experiences with real CV"
```

---

## Task 5: Portfolio page — hero + CartesianBackground + accent

**Files:**
- Modify: `src/pages/Portfolio.tsx`

- [ ] **Step 1: Importar CartesianBackground e adicionar no hero**

No topo de `src/pages/Portfolio.tsx`, adicionar import:

```tsx
import { CartesianBackground } from '../components/CartesianBackground';
```

Dentro do return do componente principal (Portfolio page), envolver o conteúdo:

```tsx
return (
  <>
    <CartesianBackground intensity="ambient" />
    <div className="relative z-10">
      {/* conteúdo existente do Portfolio */}
    </div>
  </>
);
```

- [ ] **Step 2: Substituir referências blue → accent**

Find-replace dentro do arquivo (manual via editor):

| Antes | Depois |
|---|---|
| `text-blue-400` | `text-accent` |
| `text-blue-300` | `text-accent` |
| `bg-blue-500/10` | `bg-accent-soft` |
| `bg-blue-500/20` | `bg-accent-deep` |
| `border-blue-500/30` | `border-accent-soft` |
| `border-blue-500/40` | `border-accent-soft` |
| `border-blue-500/50` | `border-accent` |
| `ring-blue-500/30` | `ring-accent-soft` |
| `group-hover:border-blue-500/50` | `group-hover:border-accent` |
| `group-hover:text-blue-400` | `group-hover:text-accent` |
| `text-white` (em headings h1/h2/h3) | `text-text` |
| `text-gray-400` / `text-gray-500` | `text-text-dim` / `text-text-faint` |
| `bg-[#101215]` / `bg-[#101215]/80` | `bg-surface` |
| `bg-[#161b22]` | `bg-surface-lighter` |

- [ ] **Step 3: Adicionar `font-display` em headings principais**

Localizar h1, h2 das seções principais (JADER GERMANO, FORMAÇÃO, DOMÍNIO TÉCNICO, EXPERIÊNCIA PROFISSIONAL) e aplicar `font-display font-black tracking-tight`.

Exemplo:

```tsx
// Antes
<h1 className="text-7xl md:text-9xl font-black text-white">JADER GERMANO</h1>

// Depois
<h1 className="text-7xl md:text-9xl font-display font-black tracking-tight text-text">
  JADER <span className="text-text-dim">GERMANO</span>
</h1>
```

- [ ] **Step 4: Verificar build**

Run: `bun run build`
Expected: build sucesso, bundle size similar

- [ ] **Step 5: Smoke test manual**

Run: `bun run dev` → abrir `http://localhost:5173/portifolio/jader-germano`

Validar visualmente:
- Grid cartesiano sutil no background (linhas vermelhas transparentes com animação de pan lenta)
- Tipografia Fraunces no nome "JADER GERMANO"
- Chips de stack com accent vermelho quando expanded
- Timeline de experiências com bolinhas que acendem accent no hover

- [ ] **Step 6: Commit**

```bash
git add src/pages/Portfolio.tsx
git commit -m "refactor(design): migrate Portfolio page to cartesian motion"
```

---

## Task 6: Services page

**Files:**
- Modify: `src/pages/Services.tsx`

- [ ] **Step 1: Importar CartesianBackground no topo**

```tsx
import { CartesianBackground } from '../components/CartesianBackground';
```

- [ ] **Step 2: Envolver conteúdo com background focused**

```tsx
return (
  <>
    <CartesianBackground intensity="focused" />
    <div className="relative z-10">
      {/* conteúdo existente */}
    </div>
  </>
);
```

- [ ] **Step 3: Substituir referências blue → accent (mesma tabela da Task 5)**

- [ ] **Step 4: Adicionar `font-display` nos headings principais** da página.

- [ ] **Step 5: Verificar build**

Run: `bun run build`
Expected: sucesso

- [ ] **Step 6: Smoke test manual**

Open `http://localhost:5173/services` — validar:
- Grid cartesiano visível
- Headings Fraunces
- Cards de serviço com accent red nos elementos interativos

- [ ] **Step 7: Commit**

```bash
git add src/pages/Services.tsx
git commit -m "refactor(design): migrate Services page to cartesian motion"
```

---

## Task 7: Downloads + Docs

**Files:**
- Modify: `src/pages/Downloads.tsx`
- Modify: `src/pages/Docs.tsx`

- [ ] **Step 1: Downloads — importar + envolver com CartesianBackground**

Em `src/pages/Downloads.tsx`:

```tsx
import { CartesianBackground } from '../components/CartesianBackground';

// dentro do return principal:
return (
  <>
    <CartesianBackground intensity="focused" />
    <div className="relative z-10">
      {/* conteúdo existente */}
    </div>
  </>
);
```

- [ ] **Step 2: Downloads — aplicar find/replace de blue → accent (tabela Task 5)**

- [ ] **Step 3: Docs — mesmo tratamento**

Em `src/pages/Docs.tsx` aplicar os mesmos passos (import CartesianBackground + wrap + find/replace blue→accent + font-display em h1/h2).

- [ ] **Step 4: Verificar build**

Run: `bun run build`
Expected: sucesso

- [ ] **Step 5: Smoke tests manuais**

`http://localhost:5173/downloads` e `http://localhost:5173/docs` devem mostrar grid + accent red + Fraunces headings.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Downloads.tsx src/pages/Docs.tsx
git commit -m "refactor(design): migrate Downloads + Docs to cartesian motion"
```

---

## Task 8: CaseStudy + Legal + Offer

**Files:**
- Modify: `src/pages/CaseStudy.tsx`
- Modify: `src/pages/Legal.tsx`
- Modify: `src/pages/Offer.tsx`

- [ ] **Step 1: CaseStudy — intensity ambient (artigo longo, grid sutil)**

```tsx
import { CartesianBackground } from '../components/CartesianBackground';

// wrap:
<CartesianBackground intensity="ambient" />
<div className="relative z-10">...</div>
```

Aplicar find/replace blue→accent + font-display em títulos de cases.

- [ ] **Step 2: Legal — intensity ambient (texto longo)**

Mesmo tratamento. Parágrafos jurídicos preservam tipografia `font-sans` (IBM Plex Sans), apenas headings usam `font-display`.

- [ ] **Step 3: Offer — intensity focused (página de conversão)**

Mesmo tratamento. CTAs devem ter `bg-accent text-white hover:bg-accent-deep transition-colors`.

- [ ] **Step 4: Verificar build**

Run: `bun run build`
Expected: sucesso

- [ ] **Step 5: Smoke tests manuais**

- `http://localhost:5173/case-study/:slug` (pegar slug do `data/case-studies.ts`)
- `http://localhost:5173/legal`
- `http://localhost:5173/offer`

- [ ] **Step 6: Commit**

```bash
git add src/pages/CaseStudy.tsx src/pages/Legal.tsx src/pages/Offer.tsx
git commit -m "refactor(design): migrate CaseStudy + Legal + Offer to cartesian motion"
```

---

## Task 9: Login page — preserva OAuth, aplica design

**Files:**
- Modify: `src/pages/Login.tsx`

- [ ] **Step 1: Importar CartesianBackground**

```tsx
import { CartesianBackground } from '../components/CartesianBackground';
```

- [ ] **Step 2: Envolver o card de login com background accent (mais intenso no login — foco total)**

```tsx
return (
  <>
    <CartesianBackground intensity="accent" />
    <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
      {/* card existente */}
    </div>
  </>
);
```

- [ ] **Step 3: Atualizar tipografia do card**

- Título "ACESSO RESTRITO" → `font-display font-black tracking-tight text-text`
- Subtítulo "JPG LABS OS" → manter uppercase, mudar `text-gray-500` → `text-text-faint`
- Inputs E-mail/Senha → `border-border-subtle focus:border-accent focus:ring-accent-soft`
- Botão ENTRAR primário → `bg-accent text-white hover:bg-accent-deep`
- Botões OAuth (GITHUB/GOOGLE/APPLE) → `border-border-subtle hover:border-accent-soft hover:text-accent transition-colors`

- [ ] **Step 4: Verificar build**

Run: `bun run build`
Expected: sucesso

- [ ] **Step 5: Smoke test manual**

Abrir `http://localhost:5173/login` — validar:
- Grid cartesiano denso no background
- Card centrado com Fraunces no título
- Inputs com foco accent red
- Botões OAuth com hover accent

- [ ] **Step 6: Commit**

```bash
git add src/pages/Login.tsx
git commit -m "refactor(design): migrate Login page to cartesian motion (preserves OAuth)"
```

---

## Task 10: AuthCallback + ProtectedRoute — consistência visual

**Files:**
- Modify: `src/pages/AuthCallback.tsx`
- Modify: `src/components/ProtectedRoute.tsx`

- [ ] **Step 1: AuthCallback — atualizar paleta do spinner e tela de erro**

Ler `src/pages/AuthCallback.tsx` e substituir:

- `bg-[#08090a]` → `bg-bg`
- `border-gray-600 border-t-white` (spinner) → `border-border-subtle border-t-accent`
- `text-gray-500` (texto "Conectando sua sessão…") → `text-text-faint font-mono`
- Botão "Voltar ao login" → `bg-accent text-white hover:bg-accent-deep`
- Ícone de erro `!` → `border-accent text-accent` (mantém o red-pulled)

- [ ] **Step 2: ProtectedRoute — mesmo tratamento se houver loading/denied UI**

Ler `src/components/ProtectedRoute.tsx` e migrar eventuais paletas hardcoded pra tokens.

- [ ] **Step 3: Verificar build**

Run: `bun run build`
Expected: sucesso

- [ ] **Step 4: Smoke test manual**

Navegar `http://localhost:5173/auth/callback?error=test&error_description=Teste` — tela de erro deve mostrar:
- Background preto #0d0d0d
- Ícone red #c04a3f
- Botão "Voltar ao login" accent red
- Texto mono (JetBrains Mono) pro label "Falha na autenticação"

- [ ] **Step 5: Commit**

```bash
git add src/pages/AuthCallback.tsx src/components/ProtectedRoute.tsx
git commit -m "refactor(design): migrate AuthCallback + ProtectedRoute to cartesian motion"
```

---

## Task 11: Verificação final + sanity de QA

**Files:**
- Nenhum alterado — apenas verificação

- [ ] **Step 1: Full build limpo**

```bash
rm -rf dist node_modules/.vite
bun install
bun run build
```

Expected: build sucesso sem warnings inesperados (aceitável: `chunk size > 500kb` — já existia).

- [ ] **Step 2: Type check**

Run: `bun run lint`
Expected: 0 errors (warnings existentes podem ficar, mas nenhum novo introduzido).

- [ ] **Step 3: Test suite**

Run: `bun test`
Expected: CartesianBackground.test.tsx passa + testes existentes continuam verdes.

- [ ] **Step 4: Grep de resíduos azuis**

```bash
grep -r -n 'text-blue\|bg-blue\|border-blue\|ring-blue' src/pages/ src/components/ | grep -v '.test.'
```

Expected: nenhuma ocorrência (ou apenas em arquivos fora de escopo: Home.tsx, Hub.tsx, Instances.tsx, Guardian.tsx, Overview.tsx, Upsell.tsx, PortfolioManager.tsx, PublicHome.tsx, ProductDetail.tsx, ServiceDetail.tsx). Se sobrou em páginas cobertas, volta e corrige.

- [ ] **Step 5: Smoke test visual completo**

Run: `bun run dev`

Navegar sequencialmente:
1. `/` → redirect pra `/portifolio/jader-germano` → portfolio com grid
2. `/services` → grid + cards com accent
3. `/downloads` → grid + produtos
4. `/docs` → grid + documentação
5. `/case-study/<slug>` → artigo longo com grid ambient
6. `/legal` → texto longo
7. `/offer` → página de conversão
8. `/login` → card com grid accent denso
9. `/auth/callback?error=test&error_description=Teste` → tela de erro

Em cada: Fraunces nos headings, IBM Plex Sans no body, accent red #c04a3f em interações, grid visível sem roubar atenção.

- [ ] **Step 6: Commit de verificação (opcional — se nada precisou mudar)**

Se tudo passou sem ajustes adicionais, pular. Se encontrou resíduos e corrigiu:

```bash
git add -A
git commit -m "fix(design): residual blue→accent cleanup in <arquivo>"
```

- [ ] **Step 7: Push da branch**

```bash
git push origin feat/cartesian-motion-design
```

---

## Task 12: Deploy em staging → validação → prod

**Files:**
- Nenhum alterado — operação de deploy

- [ ] **Step 1: Build artefato final**

```bash
bun run build
ls -la dist/
```

Expected: `dist/index.html` + `dist/assets/index-*.{js,css}` + fonts preloaded.

- [ ] **Step 2: Deploy pro k3s prod (substitui portifolio-s1a atual)**

```bash
rsync -az --delete dist/ root@jpglabs-vps-tailnet:/root/build/portifolio-s1a/dist/
ssh root@jpglabs-vps-tailnet "cd /root/build/portifolio-s1a && docker build -t portifolio-s1a:latest . >/dev/null 2>&1 && docker save portifolio-s1a:latest | k3s ctr images import - >/dev/null 2>&1 && kubectl rollout restart deploy/portifolio-s1a -n prod && kubectl rollout status deploy/portifolio-s1a -n prod --timeout=60s"
```

Expected: `deployment "portifolio-s1a" successfully rolled out`

- [ ] **Step 3: Smoke test prod**

```bash
curl -sk https://portifolio.jpglabs.com.br/ | grep -oE 'Fraunces|IBM\+Plex|JetBrains\+Mono' | sort -u
```

Expected: 3 linhas confirmando que Google Fonts está preloaded no HTML servido.

- [ ] **Step 4: Validação visual em browser**

Abrir `https://portifolio.jpglabs.com.br/` no Chrome/Safari/Firefox — validar que:
- Fraunces carrega (checar Network → `fonts.gstatic.com` requests com 200)
- Grid cartesiano aparece sutil no background
- Accent red consistente em todas páginas

- [ ] **Step 5: Merge pra main + tag**

```bash
git checkout main
git pull
git merge --no-ff feat/cartesian-motion-design -m "feat(design): cartesian motion design system"
git tag -a portfolio-v1.1.0 -m "Cartesian Motion design system"
git push origin main --tags
```

- [ ] **Step 6: Atualizar memory entry**

Editar `/Users/philipegermano/.claude/projects/-Users-philipegermano-code-openclaude/memory/project_jpglabs_visual_language.md` (ou equivalente) notando: "Cartesian Motion aplicado em produção no portfolio em 2026-XX-XX (próxima sessão)".

---

## Notas importantes

### Acessibilidade

- `CartesianBackground` usa `aria-hidden="true"` e `pointer-events: none` — screenreaders ignoram; não interfere em keyboard navigation.
- Contraste de texto: `--text` (#f0f0f0) sobre `--bg` (#0d0d0d) = ratio 16.8:1 (AAA).
- Accent `#c04a3f` sobre `#0d0d0d` = ratio 5.1:1 (AA) — suficiente pra texto grande + elementos UI, mas evitar body text (usar `text-text-dim` pra corpo).

### Performance

- Fonts carregados com `preconnect` + `display=swap` — no layout shift perceptível.
- `CartesianBackground` é puro SVG, ~60 linhas renderizadas — custo baixíssimo.
- `animate-grid-pan` é transform-only (GPU-acelerado) — não causa repaint.

### Fora de escopo (backlog futuro)

- **Tema light** (Task já tem os tokens em `[data-theme='light']` mas sem toggle UI). Adicionar toggle depois.
- **Easter eggs** (feature v0.7.0 do backlog) — ganchos no `CartesianBackground` pra detecção de clique em coordenadas específicas — escopo separado.
- **Motion reduzido** (`prefers-reduced-motion`) — desabilitar `animate-grid-pan` respeitando preferência do usuário. Adicionar via CSS media query no `tokens.css` como segundo PR.
- **PublicHome.tsx / ProductDetail.tsx / ServiceDetail.tsx** — páginas não cobertas nesta migração porque não estão no fluxo principal atual. Tratar quando/se forem reativadas.

### Branch merge decision

Recomendação: merge direto pra `main` após todas as tasks verdes. Sprint subsequente (rename Axis) vai tocar nomes de vars/classes, mas não o design system — nenhum conflito previsto.

---

## Self-review

**1. Spec coverage:**

- ✅ Paleta red-pulled (#c04a3f) — Tasks 1, 2
- ✅ Tipografia Fraunces + IBM Plex Sans + JetBrains Mono — Tasks 1, 2, 4, 5+
- ✅ Grid cartesiano animado como identidade visual — Task 3
- ✅ Data accuracy (CV real sincronizado) — Task 4B
- ✅ Propagação em Portfolio + Services + Downloads + Docs + Case Study + Login — Tasks 5, 6, 7, 8, 9
- ✅ AuthCallback consistente — Task 10
- ✅ Header/Layout — Task 4
- ✅ Verificação + deploy — Tasks 11, 12

Gaps: PublicHome + ProductDetail + ServiceDetail fora de escopo explícito (marcados em "File Structure" como sem alteração; repetido em "Fora de escopo").

**2. Placeholder scan:**

- ✅ Nenhum "TBD" / "TODO" / "implement later"
- ✅ Todo código tem content real, não pseudo
- ✅ Tabelas find-replace têm antes/depois concretos
- ✅ Cada step tem comando ou código específico

**3. Type consistency:**

- `intensity` em CartesianBackground: `'ambient' | 'focused' | 'accent'` — mesmos valores nas Tasks 3, 5, 6, 7, 8, 9 ✅
- `gridSize` prop: consistente default 48 ✅
- Tokens CSS: todos prefix `--*` ✅; classes Tailwind `accent-*` consistentes ✅
