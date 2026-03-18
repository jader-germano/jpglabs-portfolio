import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const normalizeBasePath = (basePath: string): string => {
  const withLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const basePath = normalizeBasePath(env.VITE_BASE_PATH || '/');

  return {
    base: basePath,
    plugins: [react()],
    server: {
      host: true,
    },
    preview: {
      host: true,
    },
  };
});
