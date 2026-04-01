import sharp from 'sharp';
import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';

const imagesDir = join(process.cwd(), 'public', 'images');
const ogFiles = readdirSync(imagesDir).filter(f => f.startsWith('og-') && f.endsWith('.svg'));

for (const file of ogFiles) {
  const svgPath = join(imagesDir, file);
  const pngName = file.replace('.svg', '.png');
  const pngPath = join(imagesDir, pngName);

  const svgBuffer = readFileSync(svgPath);

  await sharp(svgBuffer, { density: 150 })
    .resize(1200, 630)
    .png({ quality: 90 })
    .toFile(pngPath);

  console.log(`Converted ${file} → ${pngName}`);
}
