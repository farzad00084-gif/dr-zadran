import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

/**
 * Rebuilds the locally hosted editorial-photo derivatives.
 *
 * Run manually with `npm run images:prepare`. This is intentionally not part
 * of the production build because it requires network access. Every source is
 * free to use; attribution and licence details live in IMAGE_CREDITS.md and in
 * the captions rendered beside each photo.
 */
const outputDir = path.resolve('public/images/editorial');

const images = [
  {
    id: 'instrument-study',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Horsley-type_skull_saw%2C_London%2C_England%2C_1900-1926_Wellcome_L0057852.jpg',
    aspect: [4, 5],
    widths: [480, 800, 1200],
    quality: 84,
  },
  {
    id: 'neuroimaging',
    url: 'https://images.unsplash.com/photo-1631563019676-dade0dbdb8fc?w=2400&q=90&fm=jpg',
    aspect: [3, 2],
    widths: [600, 1200, 1800],
    quality: 84,
  },
  {
    id: 'microscope',
    url: 'https://images.unsplash.com/photo-1572884267893-e8bee7e510b0?w=2000&q=88&fm=jpg',
    aspect: [4, 5],
    widths: [480, 800, 1200],
    quality: 84,
  },
  {
    id: 'hospital-interior',
    url: 'https://images.unsplash.com/photo-1777269749032-d8d458ae594d?w=2200&q=88&fm=jpg',
    aspect: [4, 3],
    widths: [600, 900, 1400],
    quality: 84,
  },
];

await fs.mkdir(outputDir, { recursive: true });

for (const image of images) {
  process.stdout.write(`Preparing ${image.id}... `);
  const response = await fetch(image.url, {
    headers: { 'User-Agent': 'ZadranPortfolio/1.0 (editorial image preparation)' },
  });
  if (!response.ok) {
    throw new Error(`${image.id}: source returned ${response.status}`);
  }
  const source = Buffer.from(await response.arrayBuffer());
  const [ratioW, ratioH] = image.aspect;
  const masterWidth = Math.max(...image.widths);
  const masterHeight = Math.round((masterWidth * ratioH) / ratioW);
  const master = sharp(source)
    .rotate()
    .resize(masterWidth, masterHeight, { fit: 'cover', position: 'centre' });

  for (const width of image.widths) {
    const height = Math.round((width * ratioH) / ratioW);
    const base = path.join(outputDir, `${image.id}-${width}`);
    await master
      .clone()
      .resize(width, height, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: image.quality, mozjpeg: true, progressive: true })
      .toFile(`${base}.jpg`);
    await master
      .clone()
      .resize(width, height, { fit: 'cover', position: 'centre' })
      .webp({ quality: image.quality - 2, effort: 5 })
      .toFile(`${base}.webp`);
  }
  process.stdout.write(`${image.widths.join(', ')}px\n`);
}

console.log(`Editorial images written to ${outputDir}`);
