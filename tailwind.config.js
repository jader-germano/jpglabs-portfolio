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
