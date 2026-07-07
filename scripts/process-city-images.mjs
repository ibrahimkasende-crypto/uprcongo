import fs from "fs";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "assets", "images");
const OUT = path.join(ROOT, "public", "images", "rdc");

const cities = [
  { src: "Kisangani.jpg", dest: "kisangani.webp" },
  { src: "Goma.jpg", dest: "goma.webp" },
  { src: "Lubumbashi.jpg", dest: "lubumbashi.webp" },
];

fs.mkdirSync(OUT, { recursive: true });

for (const city of cities) {
  const input = path.join(SRC, city.src);
  const output = path.join(OUT, city.dest);
  await sharp(input)
    .resize(1200, 750, { fit: "cover", position: "centre" })
    .webp({ quality: 82 })
    .toFile(output);
  console.log("OK", city.dest, fs.statSync(output).size);
}