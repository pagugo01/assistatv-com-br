// scripts/build_all_favicons.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const sites = [
  { name: 'assistatv.com.br', dir: 'd:/sites-premium/assistatv.com.br' },
  { name: '2telas.com', dir: 'd:/sites-premium/2telas.com' },
  { name: 'superassinatura.com.br', dir: 'd:/sites-premium/superassinatura.com.br' },
  { name: '2telas.shop', dir: 'd:/sites-premium/2telas.shop' }
];

async function createIcoFile(svgBuffer, sizes = [16, 32, 48]) {
  const pngBuffers = await Promise.all(
    sizes.map(s => sharp(svgBuffer).resize(s, s).png().toBuffer())
  );

  const count = sizes.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(count, 4); // number of icons

  let offset = 6 + count * 16;
  const entries = [];

  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const data = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

async function run() {
  for (const site of sites) {
    console.log(`\n========================================`);
    console.log(`🔨 Processando Favicons para: ${site.name}`);
    console.log(`========================================`);

    const publicDir = path.join(site.dir, 'public');
    const distDir = path.join(site.dir, 'dist');
    const svgPath = path.join(publicDir, 'favicon.svg');

    if (!fs.existsSync(svgPath)) {
      console.warn(`⚠️ Arquivo favicon.svg não encontrado em ${svgPath}`);
      continue;
    }

    const svgBuffer = fs.readFileSync(svgPath);

    // 1. Gera favicon.ico multi-resolução (16x16, 32x32, 48x48)
    const icoBuffer = await createIcoFile(svgBuffer, [16, 32, 48]);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(path.join(distDir, 'favicon.ico'), icoBuffer);
    }
    console.log(`✅ favicon.ico gerado (16, 32, 48px) - ${icoBuffer.length} bytes`);

    // 2. Gera PNGs específicos
    const pngSpecs = [
      { name: 'favicon-16x16.png', size: 16 },
      { name: 'favicon-32x32.png', size: 32 },
      { name: 'favicon-48x48.png', size: 48 }, // Padrão Oficial Google Favicon
      { name: 'apple-touch-icon.png', size: 180 }, // iOS Safari & iPad
      { name: 'favicon-192x192.png', size: 192 }, // Android Chrome
      { name: 'favicon-512x512.png', size: 512 }
    ];

    for (const spec of pngSpecs) {
      const buf = await sharp(svgBuffer).resize(spec.size, spec.size).png().toBuffer();
      fs.writeFileSync(path.join(publicDir, spec.name), buf);
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, spec.name), buf);
      }
      console.log(`✅ ${spec.name} (${spec.size}x${spec.size})`);
    }
  }

  console.log('\n🎉 Todos os favicons foram gerados com sucesso!');
}

run().catch(console.error);

