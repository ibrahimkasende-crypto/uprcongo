#!/usr/bin/env node
/**
 * UPR Congo - Pipeline de génération et optimisation des assets images
 * Usage: node scripts/setup-images.mjs
 */
import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ASSETS = path.join(ROOT, "assets");
const PUBLIC_IMAGES = path.join(ROOT, "public", "images");
const PUBLIC_DOCS = path.join(ROOT, "public", "documents");

const QUALITY = 81;
const COLORS = {
  blue: "#003B8E",
  navy: "#061A40",
  gold: "#D4AF37",
  red: "#D71920",
  white: "#FFFFFF",
};

const FOLDERS = [
  "logo", "president", "backgrounds", "activities", "leadership",
  "documents", "kinshasa", "values", "adhesion", "actualites", "_review", "_backup",
];

const SOURCE = {
  logo: path.join(ASSETS, "logo", "UPR Logo_site.png"),
  president: path.join(ASSETS, "images", "President_UPR.png"),
  background: path.join(ASSETS, "images", "background.png"),
};

const UNSPLASH = [
  { dest: "values/dieu-patrie.webp", url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80", author: "Priscilla Du Preez", title: "Open book", license: "Unsplash License", fallbackTitle: "Dieu", fallbackSubtitle: "Référence morale et dignité" },
  { dest: "values/patrie-congo.webp", url: "https://images.unsplash.com/photo-1516026672322-9691424788f0?auto=format&fit=crop&w=1200&q=80", author: "Luigi Pozzoli", title: "Paysage africain", license: "Unsplash License", fallbackTitle: "Patrie", fallbackSubtitle: "Souveraineté et amour du Congo" },
  { dest: "values/justice-etat-droit.webp", url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80", author: "Clarisse Meyer", title: "Justice scales", license: "Unsplash License", fallbackTitle: "Justice", fallbackSubtitle: "État de droit et équité" },
  { dest: "kinshasa/kinshasa-skyline.webp", url: "https://images.unsplash.com/photo-1444723127927-8a40448a8eb4?auto=format&fit=crop&w=1400&q=80", author: "Denys Nevozhai", title: "City skyline", license: "Unsplash License", fallbackTitle: "Kinshasa", fallbackSubtitle: "Capitale de la RDC" },
  { dest: "kinshasa/fleuve-congo.webp", url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=80", author: "David Marcu", title: "River landscape", license: "Unsplash License", fallbackTitle: "Fleuve Congo", fallbackSubtitle: "Patrimoine national" },
  { dest: "kinshasa/avenue-kinshasa.webp", url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1400&q=80", author: "Benjamin Voros", title: "Urban avenue", license: "Unsplash License", fallbackTitle: "Kinshasa", fallbackSubtitle: "Vie urbaine congolaise" },
  { dest: "adhesion/engagement-citoyen.webp", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80", author: "Slava Bowman", title: "Group of people", license: "Unsplash License", fallbackTitle: "Engagement", fallbackSubtitle: "Citoyenneté active" },
  { dest: "adhesion/communaute-upr.webp", url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1400&q=80", author: "Ben White", title: "Community gathering", license: "Unsplash License", fallbackTitle: "Communauté", fallbackSubtitle: "Militants UPR" },
  { dest: "adhesion/adhesion-banner.webp", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80", author: "Headway", title: "Team collaboration", license: "Unsplash License", fallbackTitle: "Adhésion", fallbackSubtitle: "Rejoindre l'UPR" },
];

function log(msg) { console.log(`[images:setup] ${msg}`); }
function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function exists(p) { return fs.existsSync(p); }

function backupExistingImages() {
  const backupRoot = path.join(PUBLIC_IMAGES, "_backup", new Date().toISOString().slice(0, 10));
  if (!exists(PUBLIC_IMAGES)) return;
  const entries = fs.readdirSync(PUBLIC_IMAGES, { withFileTypes: true });
  const toBackup = entries.filter((e) => e.name !== "_backup" && e.name !== "_review");
  if (toBackup.length === 0) return;
  ensureDir(backupRoot);
  for (const entry of toBackup) {
    const src = path.join(PUBLIC_IMAGES, entry.name);
    const dest = path.join(backupRoot, entry.name);
    fs.cpSync(src, dest, { recursive: true, force: true });
  }
  log(`Sauvegarde effectuée dans ${path.relative(ROOT, backupRoot)}`);
}

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "UPR-Congo-Image-Setup/1.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        download(res.headers.location).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

function svgCover({ title, subtitle, accent = COLORS.gold }) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${COLORS.navy}"/>
      <stop offset="100%" stop-color="${COLORS.blue}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1100" fill="url(#bg)"/>
  <rect x="48" y="48" width="704" height="1004" rx="16" fill="none" stroke="${accent}" stroke-width="3" opacity="0.6"/>
  <rect x="80" y="120" width="120" height="120" rx="60" fill="${accent}" opacity="0.15"/>
  <text x="140" y="200" text-anchor="middle" font-family="Arial,sans-serif" font-size="42" font-weight="700" fill="${accent}">UPR</text>
  <text x="400" y="380" text-anchor="middle" font-family="Arial,sans-serif" font-size="44" font-weight="700" fill="${COLORS.white}">${title}</text>
  <text x="400" y="440" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="${COLORS.white}" opacity="0.85">${subtitle}</text>
  <line x1="200" y1="500" x2="600" y2="500" stroke="${accent}" stroke-width="2" opacity="0.5"/>
  <text x="400" y="980" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="${COLORS.white}" opacity="0.6">Union des Patriotes pour la République</text>
  <text x="400" y="1010" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="${accent}">Dieu - Patrie - Justice</text>
</svg>`);
}

function svgLeadership({ initials, role, name }) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750">
  <defs>
    <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${COLORS.blue}"/>
      <stop offset="100%" stop-color="${COLORS.navy}"/>
    </linearGradient>
  </defs>
  <rect width="600" height="750" fill="url(#lg)"/>
  <ellipse cx="300" cy="260" rx="110" ry="120" fill="${COLORS.white}" opacity="0.12"/>
  <circle cx="300" cy="200" r="72" fill="${COLORS.white}" opacity="0.18"/>
  <path d="M160 520 Q300 420 440 520 L440 750 L160 750 Z" fill="${COLORS.white}" opacity="0.14"/>
  <text x="300" y="215" text-anchor="middle" font-family="Arial,sans-serif" font-size="56" font-weight="700" fill="${COLORS.gold}">${initials}</text>
  <text x="300" y="580" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" font-weight="600" fill="${COLORS.white}">${role}</text>
  <text x="300" y="615" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="${COLORS.white}" opacity="0.75">${name}</text>
  <text x="300" y="700" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" fill="${COLORS.gold}" opacity="0.8">Photo officielle - à fournir</text>
</svg>`);
}

function svgPlaceholder({ title, subtitle, label = "Photo officielle UPR - à fournir" }) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="ph" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${COLORS.navy}"/>
      <stop offset="50%" stop-color="${COLORS.blue}"/>
      <stop offset="100%" stop-color="${COLORS.navy}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#ph)"/>
  <rect x="60" y="60" width="1080" height="555" rx="12" fill="none" stroke="${COLORS.gold}" stroke-width="2" stroke-dasharray="12 8" opacity="0.5"/>
  <circle cx="600" cy="260" r="60" fill="${COLORS.gold}" opacity="0.2"/>
  <text x="600" y="275" text-anchor="middle" font-family="Arial,sans-serif" font-size="48" font-weight="700" fill="${COLORS.gold}">UPR</text>
  <text x="600" y="360" text-anchor="middle" font-family="Arial,sans-serif" font-size="36" font-weight="700" fill="${COLORS.white}">${title}</text>
  <text x="600" y="410" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="${COLORS.white}" opacity="0.85">${subtitle}</text>
  <text x="600" y="520" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="${COLORS.gold}">${label}</text>
</svg>`);
}

function svgActualite({ title, category }) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <rect width="1200" height="675" fill="${COLORS.navy}"/>
  <rect x="0" y="0" width="1200" height="8" fill="${COLORS.gold}"/>
  <rect x="0" y="667" width="1200" height="8" fill="${COLORS.red}"/>
  <polygon points="0,0 320,0 0,200" fill="${COLORS.blue}" opacity="0.5"/>
  <text x="80" y="100" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="${COLORS.gold}">UPR</text>
  <text x="80" y="130" font-family="Arial,sans-serif" font-size="14" fill="${COLORS.white}" opacity="0.7">Actualités officielles</text>
  <text x="600" y="340" text-anchor="middle" font-family="Arial,sans-serif" font-size="42" font-weight="700" fill="${COLORS.white}">${title}</text>
  <rect x="480" y="380" width="240" height="36" rx="18" fill="${COLORS.blue}"/>
  <text x="600" y="405" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" font-weight="600" fill="${COLORS.gold}">${category}</text>
  <text x="600" y="580" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" fill="${COLORS.white}" opacity="0.5">Union des Patriotes pour la République - Kinshasa, RDC</text>
</svg>`);
}

function svgHorizontalLogo(logoBuffer) {
  const logoB64 = logoBuffer.toString("base64");
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="220" viewBox="0 0 900 220">
  <image href="data:image/png;base64,${logoB64}" x="20" y="10" width="200" height="200" preserveAspectRatio="xMidYMid meet"/>
  <text x="250" y="90" font-family="Arial,sans-serif" font-size="52" font-weight="800" fill="${COLORS.blue}">UPR</text>
  <text x="250" y="130" font-family="Arial,sans-serif" font-size="20" font-weight="600" fill="${COLORS.navy}">Union des Patriotes pour la République</text>
  <text x="250" y="165" font-family="Arial,sans-serif" font-size="16" font-weight="600" fill="${COLORS.gold}">Dieu - Patrie - Justice</text>
  <text x="250" y="195" font-family="Arial,sans-serif" font-size="14" fill="${COLORS.navy}" opacity="0.7">Servir sans se servir</text>
</svg>`);
}

async function svgToWebp(svgBuffer, outPath, width, height) {
  await sharp(svgBuffer).resize(width, height, { fit: "cover" }).webp({ quality: QUALITY }).toFile(outPath);
}

async function processLogo() {
  const logoDir = path.join(PUBLIC_IMAGES, "logo");
  if (!exists(SOURCE.logo)) {
    log(`AVERTISSEMENT: logo source introuvable: ${SOURCE.logo}`);
    return;
  }
  const logo = sharp(SOURCE.logo);
  const meta = await logo.metadata();
  log(`Logo source: ${meta.width}x${meta.height}, alpha=${meta.hasAlpha}`);

  await logo.clone().png({ quality: 90 }).toFile(path.join(logoDir, "logo-upr.png"));
  await logo.clone().png().toFile(path.join(logoDir, "logo-upr-transparent.png"));
  await logo.clone().ensureAlpha().tint({ r: 255, g: 255, b: 255 }).png().toFile(path.join(logoDir, "logo-upr-white.png"));
  await logo.clone().resize(64, 64, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(path.join(logoDir, "favicon.png"));

  const logoBuf = await sharp(SOURCE.logo).resize(200, 200, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toBuffer();
  const horizSvg = svgHorizontalLogo(logoBuf);
  await sharp(horizSvg).resize(900, 220, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toFile(path.join(logoDir, "logo-upr-horizontal.png"));
  log("Logo variants générés");
}

async function processPresident() {
  const presDir = path.join(PUBLIC_IMAGES, "president");
  if (!exists(SOURCE.president)) {
    log(`AVERTISSEMENT: photo président introuvable: ${SOURCE.president}`);
    return;
  }
  const pres = sharp(SOURCE.president);
  await pres.clone().jpeg({ quality: 92 }).toFile(path.join(presDir, "president-upr-original.jpeg"));
  await pres.clone().resize(800).webp({ quality: QUALITY }).toFile(path.join(presDir, "president-upr-portrait.webp"));
  await pres.clone().resize(600, 600, { fit: "cover", position: "top" }).webp({ quality: QUALITY }).toFile(path.join(presDir, "president-upr-square.webp"));
  await pres.clone().resize(1200, 675, { fit: "cover", position: "top" }).webp({ quality: QUALITY }).toFile(path.join(presDir, "president-upr-wide.webp"));

  const portraitBuf = await pres.clone().resize(800).toBuffer();
  const portraitMeta = await sharp(portraitBuf).metadata();
  const pw = portraitMeta.width || 800;
  const ph = portraitMeta.height || 1000;
  const darkOverlay = await sharp({
    create: { width: pw, height: ph, channels: 4, background: { r: 6, g: 26, b: 64, alpha: 0.35 } },
  }).png().toBuffer();
  await sharp(portraitBuf).composite([{ input: darkOverlay, blend: "over" }]).webp({ quality: QUALITY }).toFile(path.join(presDir, "president-upr-dark.webp"));
  log("Variants président générés");
}

async function processBackgrounds() {
  const bgDir = path.join(PUBLIC_IMAGES, "backgrounds");
  const kinDir = path.join(PUBLIC_IMAGES, "kinshasa");
  if (!exists(SOURCE.background)) {
    log(`AVERTISSEMENT: background source introuvable: ${SOURCE.background}`);
    return;
  }
  const bg = sharp(SOURCE.background);
  const meta = await bg.metadata();

  await bg.clone().resize(Math.min(meta.width || 1920, 1920)).webp({ quality: QUALITY }).toFile(path.join(bgDir, "upr-kinshasa-limete-hero.webp"));
  await bg.clone().modulate({ brightness: 0.92 }).webp({ quality: QUALITY }).toFile(path.join(bgDir, "hero-dark.webp"));
  await bg.clone().modulate({ brightness: 1.08 }).webp({ quality: QUALITY }).toFile(path.join(bgDir, "hero-light.webp"));
  await bg.clone().resize(800, 1200, { fit: "cover", position: "center" }).webp({ quality: QUALITY }).toFile(path.join(bgDir, "mobile.webp"));
  await bg.clone().resize(1920).blur(8).modulate({ brightness: 0.75 }).webp({ quality: 75 }).toFile(path.join(bgDir, "upr-section-soft-bg.webp"));

  await bg.clone().resize(1400, 600, { fit: "cover", position: "center" }).webp({ quality: QUALITY }).toFile(path.join(kinDir, "echangeur-limete.webp"));
  log("Backgrounds Kinshasa/Limete générés");
}

async function processDocuments() {
  const docDir = path.join(PUBLIC_IMAGES, "documents");
  const covers = [
    { file: "acte-fondateur.webp", title: "Acte fondateur", subtitle: "Document fondateur de l'UPR - 2014" },
    { file: "projet-societe.webp", title: "Projet de société", subtitle: "Vision pour la résurrection du Congo" },
    { file: "protocole-accord.webp", title: "Protocole d'accord", subtitle: "Textes institutionnels UPR" },
    { file: "fiche-adhesion.webp", title: "Fiche d'adhésion", subtitle: "Rejoindre l'Union des Patriotes" },
    { file: "carte-membre.webp", title: "Carte de membre", subtitle: "Identité officielle du militant UPR" },
  ];
  for (const c of covers) {
    await svgToWebp(svgCover({ title: c.title, subtitle: c.subtitle }), path.join(docDir, c.file), 800, 1100);
  }
  log("Couvertures documents générées");
}

async function processLeadership() {
  const leadDir = path.join(PUBLIC_IMAGES, "leadership");
  const roles = [
    { file: "coordinateur-national.webp", initials: "CN", role: "Coordinateur National", name: "À désigner" },
    { file: "secretaire-general.webp", initials: "SG", role: "Secrétaire Général", name: "À désigner" },
    { file: "responsable-provincial.webp", initials: "RP", role: "Responsable Provincial", name: "À désigner" },
  ];
  for (const r of roles) {
    await svgToWebp(svgLeadership(r), path.join(leadDir, r.file), 600, 750);
  }
  log("Placeholders leadership générés (silhouettes, pas de visages IA)");
}

async function processActivities() {
  const actDir = path.join(PUBLIC_IMAGES, "activities");
  const items = [
    { file: "activite-officielle-placeholder.webp", title: "Activité officielle", subtitle: "Événement du parti" },
    { file: "assemblee-placeholder.webp", title: "Assemblée générale", subtitle: "Rencontre institutionnelle" },
    { file: "mobilisation-placeholder.webp", title: "Mobilisation", subtitle: "Action citoyenne UPR" },
  ];
  for (const item of items) {
    await svgToWebp(svgPlaceholder(item), path.join(actDir, item.file), 1200, 675);
  }
  log("Placeholders activités générés");
}

async function processActualites() {
  const actuDir = path.join(PUBLIC_IMAGES, "actualites");
  const items = [
    { file: "communique.webp", title: "Communiqué officiel", category: "Communiqué" },
    { file: "activite.webp", title: "Activité du parti", category: "Activité" },
    { file: "mobilisation.webp", title: "Mobilisation patriotique", category: "Mobilisation" },
    { file: "declaration.webp", title: "Déclaration politique", category: "Déclaration" },
    { file: "meeting.webp", title: "Réunion officielle", category: "Réunion" },
    { file: "vie-parti.webp", title: "Vie du parti", category: "Vie du parti" },
  ];
  for (const item of items) {
    await svgToWebp(svgActualite(item), path.join(actuDir, item.file), 1200, 675);
  }
  log("Images fallback actualités générées");
}

async function downloadUnsplash() {
  const attributions = [];
  for (const item of UNSPLASH) {
    const outPath = path.join(PUBLIC_IMAGES, item.dest);
    try {
      log(`Téléchargement Unsplash: ${item.dest}`);
      const buf = await download(item.url);
      await sharp(buf).resize(1400).webp({ quality: QUALITY }).toFile(outPath);
      attributions.push({ file: item.dest, ...item });
    } catch (err) {
      log(`ERREUR téléchargement ${item.dest}: ${err.message} — fallback SVG institutionnel`);
      const reviewDir = path.join(PUBLIC_IMAGES, "_review");
      fs.writeFileSync(path.join(reviewDir, `${path.basename(item.dest, ".webp")}.note.txt`), `Échec téléchargement: ${item.url}\n${err.message}\nLicence attendue: ${item.license}\nFallback SVG généré.`);
      await svgToWebp(
        svgPlaceholder({ title: item.fallbackTitle || "UPR", subtitle: item.fallbackSubtitle || "Image institutionnelle", label: "Image de remplacement - vérifier licence" }),
        outPath,
        1200,
        675
      );
    }
  }
  return attributions;
}

function copyPdfs() {
  ensureDir(PUBLIC_DOCS);
  const srcDocs = path.join(ASSETS, "documents");
  if (!exists(srcDocs)) return;
  for (const f of fs.readdirSync(srcDocs)) {
    if (f.endsWith(".pdf")) {
      fs.copyFileSync(path.join(srcDocs, f), path.join(PUBLIC_DOCS, f));
      log(`PDF copié: ${f}`);
    }
  }
}

function writeReadme(attributions) {
  const readme = `# Assets images UPR Congo

Pipeline généré par \`npm run images:setup\`.

## Structure

| Dossier | Contenu |
|---------|---------|
| \`logo/\` | Logo officiel et variantes (transparent, blanc, horizontal, favicon) |
| \`president/\` | Photo du Président national (portrait, carré, wide, dark overlay) |
| \`backgrounds/\` | Fonds hero Kinshasa/Limete (client) et variantes |
| \`kinshasa/\` | Images Kinshasa (Limete client + Unsplash) |
| \`values/\` | Images thématiques Dieu, Patrie, Justice |
| \`adhesion/\` | Visuels page adhésion |
| \`documents/\` | Couvertures documents institutionnels |
| \`leadership/\` | Silhouettes placeholder (CN, SG, RP) |
| \`activities/\` | Placeholders activités officielles |
| \`actualites/\` | Images fallback actualités par catégorie |
| \`_backup/\` | Sauvegarde avant régénération |
| \`_review/\` | Images nécessitant vérification licence |

## Sources client

- Logo: \`assets/logo/UPR Logo_site.png\`
- Président: \`assets/images/President_UPR.png\`
- Background hero: \`assets/images/background.png\` (Kinshasa/Limete)

## Régénération

\`\`\`bash
npm run images:setup
\`\`\`

Version cache: voir \`ASSETS_VERSION\` dans \`lib/assets.ts\`.
`;
  fs.writeFileSync(path.join(PUBLIC_IMAGES, "README.md"), readme);

  let attrMd = `# Attributions images

Images téléchargées sous licence Unsplash (https://unsplash.com/license).

| Fichier | Auteur | Titre | Licence |
|---------|--------|-------|---------|
`;
  for (const a of attributions) {
    attrMd += `| \`${a.file}\` | ${a.author} | ${a.title} | ${a.license} |\n`;
  }
  attrMd += `\n## Images client (UPR)\n\n| Fichier | Source |\n|---------|--------|\n`;
  attrMd += `| logo/* | assets/logo/UPR Logo_site.png |\n`;
  attrMd += `| president/* | assets/images/President_UPR.png |\n`;
  attrMd += `| backgrounds/*, kinshasa/echangeur-limete.webp | assets/images/background.png |\n`;
  attrMd += `\n## Générées (SVG institutionnel)\n\nCouvertures documents, placeholders leadership/activités/actualités - © UPR Congo.\n`;
  fs.writeFileSync(path.join(PUBLIC_IMAGES, "ATTRIBUTIONS.md"), attrMd);
}

async function main() {
  log("Démarrage pipeline images UPR Congo");
  ensureDir(PUBLIC_IMAGES);
  backupExistingImages();
  for (const folder of FOLDERS) ensureDir(path.join(PUBLIC_IMAGES, folder));

  await processLogo();
  await processPresident();
  await processBackgrounds();
  await processDocuments();
  await processLeadership();
  await processActivities();
  await processActualites();
  const attributions = await downloadUnsplash();
  copyPdfs();
  writeReadme(attributions);
  log("Pipeline terminé avec succès");
}

main().catch((err) => {
  console.error("[images:setup] ERREUR FATALE:", err);
  process.exit(1);
});




