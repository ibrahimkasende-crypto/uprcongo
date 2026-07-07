import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images", "rdc");

const COLORS = {
  blue: "#003B8E",
  navy: "#061A40",
  gold: "#D4AF37",
  red: "#D71920",
  white: "#FFFFFF",
};

function svgCity({ city, province, detail }) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${COLORS.navy}"/>
      <stop offset="100%" stop-color="${COLORS.blue}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="750" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="6" fill="${COLORS.gold}"/>
  <rect x="0" y="744" width="1200" height="6" fill="${COLORS.red}"/>
  <circle cx="980" cy="160" r="120" fill="${COLORS.white}" opacity="0.08"/>
  <text x="80" y="120" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="${COLORS.gold}">RDC</text>
  <text x="80" y="360" font-family="Arial,sans-serif" font-size="72" font-weight="800" fill="${COLORS.white}">${city}</text>
  <text x="80" y="430" font-family="Arial,sans-serif" font-size="28" font-weight="600" fill="${COLORS.gold}">${province}</text>
  <text x="80" y="480" font-family="Arial,sans-serif" font-size="22" fill="${COLORS.white}" opacity="0.85">${detail}</text>
  <text x="80" y="680" font-family="Arial,sans-serif" font-size="16" fill="${COLORS.white}" opacity="0.55">Union des Patriotes pour la Republique</text>
</svg>`);
}

const cities = [
  { file: "boma.webp", city: "Boma", province: "Kongo-Central", detail: "Port historique sur l Atlantique" },
  { file: "kisangani.webp", city: "Kisangani", province: "Tshopo", detail: "Confluence du fleuve Congo" },
  { file: "kasai.webp", city: "Kasai", province: "Grand Kasai", detail: "Terroir, identite et dynamisme congolais" },
];

fs.mkdirSync(outDir, { recursive: true });

for (const city of cities) {
  const out = path.join(outDir, city.file);
  await sharp(svgCity(city)).resize(1200, 750, { fit: "cover" }).webp({ quality: 82 }).toFile(out);
  console.log("OK", path.relative(process.cwd(), out));
}