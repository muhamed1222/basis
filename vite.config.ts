import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      proxy: {
        '/api': 'http://localhost:3001',
        '/oauth': 'http://localhost:3001',
        '/graphql': 'http://localhost:3001',
        '/docs': 'http://localhost:3001',
      },
    },
    optimizeDeps: {
      include: ['zod'],
    },
  };
});
