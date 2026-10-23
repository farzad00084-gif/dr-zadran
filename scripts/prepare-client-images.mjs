import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = path.resolve('scripts/assets/client-images');
const outputDir = path.resolve('public/images/doctor');

const images = [
  {
    id: 'hero',
    file: 'hero.jpg',
    aspect: [4, 5],
    widths: [220, 400],
    position: 'top',
  },
  {
    id: 'office',
    file: 'office.jpg',
    aspect: [4, 5],
    widths: [220, 400],
    position: 'top',
  },
  {
    id: 'brain-neurons',
    file: 'neurons.jpg',
    aspect: [4, 3],
    widths: [320, 480],
    position: 'center',
  },
  {
    id: 'brain-network',
    file: 'brain-network.jpg',
    aspect: [4, 3],
    widths: [320, 480],
    position: 'center',
  },
  {
    id: 'spine',
    file: 'spine.jpg',
    aspect: [4, 3],
    widths: [320, 480],
    position: 'attention',
  },
  {
    id: 'imaging',
    file: 'imaging.jpg',
    aspect: [4, 3],
    widths: [320, 480],
    position: 'center',
  },
  {
    id: 'surgery',
    file: 'surgery.jpg',
    aspect: [4, 3],
    widths: [320, 480],
    position: 'center',
  },
];

await fs.mkdir(outputDir, { recursive: true });

for (const image of images) {
  const [ratioW, ratioH] = image.aspect;
  const masterWidth = Math.max(...image.widths);
  const masterHeight = Math.round((masterWidth * ratioH) / ratioW);
  const source = sharp(path.join(sourceDir, image.file))
    .rotate()
    .resize(masterWidth, masterHeight, {
      fit: 'cover',
      position: image.position,
      kernel: 'lanczos3',
    });

  for (const width of image.widths) {
    const height = Math.round((width * ratioH) / ratioW);
    const base = path.join(outputDir, `${image.id}-${width}`);
    await source.clone().resize(width, height, { fit: 'cover', position: image.position }).webp({ quality: 82, effort: 5 }).toFile(`${base}.webp`);
    await source.clone().resize(width, height, { fit: 'cover', position: image.position }).jpeg({ quality: 85, mozjpeg: true, progressive: true }).toFile(`${base}.jpg`);
  }
}

console.log(`Client images ready in ${outputDir}`);
