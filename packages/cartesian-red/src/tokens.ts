/**
 * @jpglabs/cartesian-red — canonical design tokens (TypeScript mirror).
 *
 * Same values as `tokens.css` but as a typed object for JS/TS consumers
 * (Framer Motion, GSAP, styled-components, etc). Extracted from
 * d9-cartesian-red-showcase.html. SHOWCASE-ONLY tokens
 * (grid-line/grid-major/axis) are intentionally absent.
 */
export const cartesianRed = {
  accent: {
    base: '#c04a3f',
  },
  fonts: {
    display: "'Fraunces', Georgia, serif",
    body: "'IBM Plex Sans', system-ui, sans-serif",
    mono: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
  },
  easing: {
    outQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
  },
  themes: {
    dark: {
      // Surface
      bg: '#0d0d0d',
      bgElev1: '#171717',
      bgElev2: '#222',
      bgElev3: '#2c2c2c',
      // Text
      text: '#f0f0f0',
      textDim: '#999',
      textFaint: '#505050',
      // Accent halos
      accentSoft: 'rgba(192, 74, 63, 0.16)',
      accentDeep: 'rgba(192, 74, 63, 0.38)',
      accentGlow: 'rgba(192, 74, 63, 0.25)',
      // Border
      border: 'rgba(255, 255, 255, 0.06)',
      borderStrong: 'rgba(255, 255, 255, 0.1)',
      // Glass surfaces + device bezel
      surfaceOverlay: 'rgba(13, 13, 13, 0.72)',
      deviceBezel: '#1a1a1a',
      viewportShadow: 'rgba(0, 0, 0, 0.6)',
    },
    light: {
      // Surface
      bg: '#fafafa',
      bgElev1: '#f1f1f1',
      bgElev2: '#e8e8e8',
      bgElev3: '#dedede',
      // Text
      text: '#0d0d0d',
      textDim: '#555',
      textFaint: '#9a9a9a',
      // Accent halos
      accentSoft: 'rgba(192, 74, 63, 0.1)',
      accentDeep: 'rgba(192, 74, 63, 0.38)',
      accentGlow: 'rgba(192, 74, 63, 0.22)',
      // Border
      border: 'rgba(0, 0, 0, 0.08)',
      borderStrong: 'rgba(0, 0, 0, 0.14)',
      // Glass surfaces + device bezel
      surfaceOverlay: 'rgba(250, 250, 250, 0.78)',
      deviceBezel: '#d8d8d8',
      viewportShadow: 'rgba(0, 0, 0, 0.18)',
    },
  },
} as const;

export type CartesianRedTokens = typeof cartesianRed;
export type CartesianRedTheme = keyof typeof cartesianRed.themes;
