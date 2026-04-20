import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const normalizeBasePath = (basePath: string): string => {
  const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const basePath = normalizeBasePath(env.VITE_BASE_PATH || '/');

  return {
    base: basePath,
    plugins: [react(), tailwindcss()],
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      allowedHosts: ['.localhost', 'portifolio.localhost'],
    },
    preview: {
      host: true,
      port: 5173,
      allowedHosts: ['.localhost', 'portifolio.localhost'],
    },
  };
});
