import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env.VITE_OPENAI_API_KEY': JSON.stringify(process.env.VITE_OPENAI_API_KEY),
  },
});
