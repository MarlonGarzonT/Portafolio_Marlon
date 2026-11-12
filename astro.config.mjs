// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// `site` se usa para las URL absolutas (canonical, hreflang, Open Graph). Cámbialo por tu dominio.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://marlongarzon.vercel.app',
  trailingSlash: 'always',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
