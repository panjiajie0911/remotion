const fs = require('node:fs');
const path = require('node:path');
const rough = require('roughjs/bundled/rough.cjs.js');

const generator = rough.generator();
const options = {
  seed: 27,
  roughness: 1.35,
  bowing: 0.8,
  stroke: '#527DCE',
  strokeWidth: 3,
  fill: '#FFFFFF',
  fillStyle: 'solid',
};
const cloud = generator.path(
  'M 126 330 C 64 339 36 289 60 245 C 20 202 56 145 109 148 C 99 94 158 62 205 91 C 235 38 310 42 340 87 C 391 53 459 85 459 136 C 519 121 564 168 542 217 C 587 251 563 314 508 323 C 486 365 428 370 394 343 C 355 382 289 373 268 344 C 216 380 154 368 126 330 Z', options,
);
const shapes = [cloud, generator.ellipse(311, 418, 44, 35, {...options, seed: 28}), generator.ellipse(282, 473, 23, 19, {...options, seed: 29})];
const paths = shapes.flatMap((shape) => generator.toPaths(shape)).map((item) =>
  `<path d="${item.d}" stroke="${item.stroke}" stroke-width="${item.strokeWidth}" fill="${item.fill || 'none'}" stroke-linecap="round" stroke-linejoin="round"/>`
).join('\n');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="530" viewBox="0 0 640 530">\n${paths}\n</svg>`;
fs.writeFileSync(path.join(__dirname, 'rough-thought-cloud.svg'), svg);
