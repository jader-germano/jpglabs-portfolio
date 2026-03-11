/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#08090a',
        'surface': '#111214',
        'surface-lighter': '#1a1b1e',
        'border-subtle': 'rgba(255, 255, 255, 0.08)',
        'border-vibrant': 'rgba(255, 255, 255, 0.15)',
        brand: {
          500: '#0070f3', // Electric Blue
          glow: 'rgba(0, 112, 243, 0.3)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'SF Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse at 50% -20%, rgba(0, 112, 243, 0.15), transparent 70%)',
      },
      animation: {
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.3 },
        }
      }
    },
  },
  plugins: [],
}
