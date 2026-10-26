import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// CONFIRMAR: domínio definitivo (kandogarage.com.br / kandogarage.com)
const site = process.env.SITE_URL ?? 'https://kandogarage.com.br';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  vite: {
    plugins: [tailwindcss()],
    // scripts sempre em arquivo externo: a CSP não permite script inline
    build: { assetsInlineLimit: 0 },
  },
});
