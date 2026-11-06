import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve('public/images');
const PUBLIC_DIR = path.resolve('public');

async function processAssets() {
  console.log('--- Otimizando Ativos Visuais Assista TV ---');

  // Converter hero-devices-v4.png para WebP de alta qualidade
  const heroSrc = path.join(IMAGES_DIR, 'hero-devices-v4.png');
  if (fs.existsSync(heroSrc)) {
    await sharp(heroSrc)
      .webp({ quality: 90 })
      .toFile(path.join(IMAGES_DIR, 'hero-devices.webp'));
    console.log('✓ hero-devices.webp gerado');
  }

  // Converter sports.png para WebP
  const sportsSrc = path.join(IMAGES_DIR, 'sports.png');
  if (fs.existsSync(sportsSrc)) {
    await sharp(sportsSrc)
      .resize(600, 400, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(path.join(IMAGES_DIR, 'sports.webp'));
    console.log('✓ sports.webp gerado');
  }

  // Converter Avatares
  for (const name of ['carlos', 'renata', 'joao']) {
    const avSrc = path.join(IMAGES_DIR, `avatar-${name}.png`);
    if (fs.existsSync(avSrc)) {
      await sharp(avSrc)
        .resize(120, 120)
        .webp({ quality: 90 })
        .toFile(path.join(IMAGES_DIR, `avatar-${name}.webp`));
      console.log(`✓ avatar-${name}.webp gerado`);
    }
  }

  // Gerar Logo Vetorial Tri-Gradiente (Assista TV)
  const logoSvg = `
  <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <defs>
      <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#22d3ee" />
        <stop offset="50%" stop-color="#ec4899" />
        <stop offset="100%" stop-color="#facc15" />
      </linearGradient>
      <filter id="glow">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#ec4899" flood-opacity="0.6"/>
      </filter>
    </defs>
    <rect width="512" height="512" rx="128" fill="#000000" stroke="url(#neon)" stroke-width="16"/>
    <g filter="url(#glow)">
      <!-- Tela de TV estilizada -->
      <rect x="96" y="116" width="320" height="230" rx="36" fill="none" stroke="url(#neon)" stroke-width="24"/>
      <!-- Botão Play -->
      <polygon points="220,185 330,231 220,277" fill="url(#neon)"/>
      <!-- Base da TV -->
      <path d="M200 370L160 410H352L312 370" stroke="url(#neon)" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>`;

  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.svg'), logoSvg);
  await sharp(Buffer.from(logoSvg)).png().toFile(path.join(IMAGES_DIR, 'logo-512.png'));
  console.log('✓ favicon.svg e logo-512.png gerados');

  // Gerar OG Image (1200x630)
  const ogSvg = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#22d3ee" />
        <stop offset="50%" stop-color="#ec4899" />
        <stop offset="100%" stop-color="#facc15" />
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="#050505"/>
    <circle cx="1050" cy="120" r="280" fill="#ec4899" opacity="0.2" filter="blur(60px)"/>
    <circle cx="150" cy="500" r="220" fill="#22d3ee" opacity="0.2" filter="blur(60px)"/>
    <g transform="translate(100, 120)">
      <text x="0" y="50" font-family="Arial, sans-serif" font-weight="900" font-size="46" fill="url(#neon)">ASSISTA TV</text>
      <rect x="0" y="80" width="340" height="38" rx="19" fill="#ec4899" opacity="0.2"/>
      <text x="20" y="105" font-family="Arial, sans-serif" font-weight="900" font-size="14" fill="#f472b6">TRANSMISSÃO 4K EM ATÉ 3 TELAS</text>
      <text x="0" y="210" font-family="Arial, sans-serif" font-weight="900" font-size="68" fill="#ffffff">IPTV Premium 4K</text>
      <text x="0" y="285" font-family="Arial, sans-serif" font-weight="900" font-size="68" fill="url(#neon)">Sem Travamentos</text>
      <text x="0" y="355" font-family="Arial, sans-serif" font-weight="700" font-size="24" fill="#9ca3af">Canais ao vivo, futebol, filmes, séries e suporte 100% humanizado.</text>
      <rect x="0" y="400" width="380" height="64" rx="20" fill="#16a34a"/>
      <text x="35" y="442" font-family="Arial, sans-serif" font-weight="900" font-size="22" fill="#ffffff">TESTE GRÁTIS NO WHATSAPP 🚀</text>
    </g>
  </svg>`;

  await sharp(Buffer.from(ogSvg)).jpeg({ quality: 90 }).toFile(path.join(PUBLIC_DIR, 'og-image.jpg'));
  console.log('✓ og-image.jpg gerado');
}

processAssets().catch(console.error);
