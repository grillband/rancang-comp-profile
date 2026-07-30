import fs from 'fs';
const svg = fs.readFileSync('public/logo.svg', 'utf8');
const parts = svg.split('M -174.230469 1513.613281');
let newSvg = parts[0] + '" fill-opacity="1" fill-rule="evenodd"/></g></svg>';
newSvg = newSvg.replace('fill="#000000"', 'fill="#FFFFFF"');
newSvg = newSvg.replace('viewBox="0 0 1500 1499.999933"', 'viewBox="200 150 1200 1300"');
fs.writeFileSync('public/logo-mark-white.svg', newSvg);
console.log('Done!');
