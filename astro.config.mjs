import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://assistatv.com.br',
  output: 'static',
  integrations: [tailwind()],
  build: {
    format: 'directory'
  },
  compressHTML: true
});
