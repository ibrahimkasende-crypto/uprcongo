/*
  Générateur de données pour le site UPR Congo (Decap CMS).
  Lit content/actualites, content/communiques, content/evenements
  et produit data/*.json consommés par Next.js au build.
*/
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

function resolveRoot(...segments) {
  return path.join(ROOT, ...segments);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function slugFromFile(fileName) {
  const base = path.basename(fileName, path.extname(fileName));
  return base.replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function normalizePublicPath(value, fallback) {
  const raw = String(value || fallback || "").trim();
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("/")) return raw;
  if (raw.startsWith("public/")) return `/${raw.slice("public/".length)}`;
  if (raw.startsWith("assets/uploads/")) return `/${raw.slice("assets/".length)}`;
  return `/${raw.replace(/^\/+/, "")}`;
}

function parseScalar(value) {
  const trimmed = String(value || "").trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontMatter(source) {
  if (!source.startsWith("---")) {
    return { data: {}, body: source };
  }

  const end = source.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, body: source };
  }

  const frontMatter = source.slice(3, end).replace(/^\r?\n/, "");
  const body = source.slice(end + 4).replace(/^\r?\n/, "");
  const data = {};
  const lines = frontMatter.split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;

    const key = match[1];
    const value = match[2];
    if (value.trim() === "|") {
      const block = [];
      i += 1;
      while (i < lines.length && (/^\s+/.test(lines[i]) || lines[i].trim() === "")) {
        block.push(lines[i].replace(/^  /, ""));
        i += 1;
      }
      i -= 1;
      data[key] = block.join("\n").trim();
    } else {
      data[key] = parseScalar(value);
    }
  }

  return { data, body };
}

function readCollection(options) {
  const dir = resolveRoot("content", options.folder);
  ensureDir(dir);
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md"));

  return files
    .map((file) => {
      const source = fs.readFileSync(path.join(dir, file), "utf8");
      const parsed = parseFrontMatter(source);
      const slug = slugFromFile(file);
      const legacyBodyField = options.legacyBodyField;
      const bodyMarkdown =
        parsed.data.body ||
        (legacyBodyField ? parsed.data[legacyBodyField] : "") ||
        parsed.body;

      const item = {
        slug,
        titre: parsed.data.titre || options.defaultTitle,
        date: parsed.data.date || "",
        categorie: parsed.data.categorie || options.defaultCategory,
        featured: parsed.data.featured === true || parsed.data.featured === "true",
        image: normalizePublicPath(parsed.data.image, options.defaultImage),
        image_alt: parsed.data.image_alt || options.defaultAlt,
        description_courte: parsed.data.description_courte || parsed.data.description || "",
        description: parsed.data.description || parsed.data.description_courte || "",
        auteur: parsed.data.auteur || "Secrétariat National de l'Information et Presse / UPR",
        markdown: bodyMarkdown,
      };

      Object.keys(options.extraFields || {}).forEach((field) => {
        item[field] = parsed.data[field] || options.extraFields[field] || "";
      });

      return item;
    })
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
}

function writeJson(name, data) {
  ensureDir(resolveRoot("data"));
  fs.writeFileSync(resolveRoot("data", `${name}.json`), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function main() {
  const actualites = readCollection({
    folder: "actualites",
    legacyBodyField: "corps_article",
    defaultTitle: "Actualité UPR",
    defaultCategory: "Vie du parti",
    defaultImage: "/uploads/actualite-mobilisation.svg",
    defaultAlt: "Actualité officielle de l'UPR",
    extraFields: { image_position: "", image_aspect: "" },
  });

  const communiques = readCollection({
    folder: "communiques",
    legacyBodyField: "corps_communique",
    defaultTitle: "Communiqué UPR",
    defaultCategory: "Communiqué",
    defaultImage: "/uploads/communique-upr.svg",
    defaultAlt: "Communiqué officiel de l'UPR",
    extraFields: { reference: "", fichier_pdf: "" },
  });

  const evenements = readCollection({
    folder: "evenements",
    legacyBodyField: "corps_evenement",
    defaultTitle: "Événement UPR",
    defaultCategory: "Événement",
    defaultImage: "/uploads/evenement-assemblee.svg",
    defaultAlt: "Événement officiel de l'UPR",
    extraFields: { lieu: "", province: "" },
  });

  writeJson("actualites", actualites);
  writeJson("communiques", communiques);
  writeJson("evenements", evenements);

  console.log(
    `UPR: ${actualites.length} actualités, ${communiques.length} communiqués, ${evenements.length} événements générés.`
  );
}

main();