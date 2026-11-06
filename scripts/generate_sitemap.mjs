// scripts/generate_sitemap.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

const BASE_URL = 'https://assistatv.com.br';
const today = new Date().toISOString().split('T')[0];

const canonicalRoutes = [
  { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'daily' },
  { loc: `${BASE_URL}/politica-privacidade/`, priority: '0.5', changefreq: 'monthly' },
  { loc: `${BASE_URL}/termos-uso/`, priority: '0.5', changefreq: 'monthly' },
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${canonicalRoutes.map(r => `  <url>
    <loc>${r.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-0.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'sitemap-0.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndexXml, 'utf-8');

console.log(`✅ Sitemaps generated in ${publicDir} with ${canonicalRoutes.length} canonical URLs.`);
