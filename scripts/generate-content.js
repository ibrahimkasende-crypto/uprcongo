/*
  Générateur statique du site officiel uprcongo.cd.
  Entrées Decap CMS : content/actualites, content/communiques,
  content/evenements, content/documents.
  Sorties : data/*.json, pages générées et sitemap.xml.
*/
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE_URL = "https://uprcongo.cd";
const STATIC_PAGES = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/parti.html", priority: "0.9", changefreq: "monthly" },
  { loc: "/projet-societe.html", priority: "0.9", changefreq: "monthly" },
  { loc: "/actualites.html", priority: "0.9", changefreq: "weekly" },
  { loc: "/adhesion.html", priority: "0.8", changefreq: "monthly" },
  { loc: "/contact.html", priority: "0.7", changefreq: "monthly" }
];

function resolveRoot(...segments) {
  return path.join(ROOT, ...segments);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function cleanGeneratedDir(dirPath) {
  const resolved = path.resolve(dirPath);
  if (!resolved.startsWith(ROOT) || resolved === ROOT) {
    throw new Error(`Nettoyage refusé hors projet : ${resolved}`);
  }
  fs.rmSync(resolved, { recursive: true, force: true });
  ensureDir(resolved);
}

function slugFromFile(fileName) {
  return path.basename(fileName, path.extname(fileName));
}

function normalizePublicPath(value, fallback) {
  const raw = String(value || fallback || "").trim();
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  return raw.replace(/^\/+/, "");
}

function pagePath(publicPath, depthPrefix = "../..") {
  if (!publicPath) return "";
  if (/^https?:\/\//i.test(publicPath)) return publicPath;
  return `${depthPrefix}/${publicPath.replace(/^\/+/, "")}`;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

function markdownToHtml(markdown) {
  const lines = String(markdown || "").split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let listType = null;

  function flushParagraph() {
    if (paragraph.length) {
      html.push(`<p>${escapeHtml(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  }

  function closeList() {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  }

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      closeList();
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      closeList();
      html.push(`<h3>${escapeHtml(trimmed.slice(4))}</h3>`);
      return;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      closeList();
      html.push(`<h2>${escapeHtml(trimmed.slice(3))}</h2>`);
      return;
    }

    if (trimmed.startsWith("> ")) {
      flushParagraph();
      closeList();
      html.push(`<blockquote>${escapeHtml(trimmed.slice(2))}</blockquote>`);
      return;
    }

    if (/^- /.test(trimmed)) {
      flushParagraph();
      if (listType !== "ul") {
        closeList();
        html.push("<ul>");
        listType = "ul";
      }
      html.push(`<li>${escapeHtml(trimmed.slice(2))}</li>`);
      return;
    }

    paragraph.push(trimmed);
  });

  flushParagraph();
  closeList();
  return html.join("\n");
}

function readCollection(options) {
  const dir = resolveRoot("content", options.folder);
  ensureDir(dir);
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md"));

  return files.map((file) => {
    const source = fs.readFileSync(path.join(dir, file), "utf8");
    const parsed = parseFrontMatter(source);
    const slug = slugFromFile(file);
    const bodyMarkdown = parsed.data[options.bodyField] || parsed.body;
    const image = normalizePublicPath(parsed.data.image, options.defaultImage);
    const item = {
      slug,
      titre: parsed.data.titre || options.defaultTitle,
      date: parsed.data.date || "",
      categorie: parsed.data.categorie || options.defaultCategory,
      featured: parsed.data.featured === true || parsed.data.featured === "true",
      image,
      image_alt: parsed.data.image_alt || options.defaultAlt,
      description_courte: parsed.data.description_courte || parsed.data.description || "",
      auteur: parsed.data.auteur || "UPR - Union des Patriotes pour la République",
      html: markdownToHtml(bodyMarkdown),
      markdown: bodyMarkdown
    };

    Object.keys(options.extraFields || {}).forEach((field) => {
      item[field] = parsed.data[field] || options.extraFields[field] || "";
    });

    item.url = `${options.outputFolder}/${slug}/`;
    return item;
  }).sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
}

function readDocuments() {
  const dir = resolveRoot("content", "documents");
  ensureDir(dir);
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md"));

  return files.map((file) => {
    const source = fs.readFileSync(path.join(dir, file), "utf8");
    const parsed = parseFrontMatter(source);
    return {
      slug: slugFromFile(file),
      titre: parsed.data.titre || "Document UPR",
      type: parsed.data.type || "Document",
      date: parsed.data.date || "",
      fichier: normalizePublicPath(parsed.data.fichier, ""),
      description: parsed.data.description || ""
    };
  }).sort((a, b) => String(a.titre).localeCompare(String(b.titre), "fr"));
}

function writeJson(name, data) {
  ensureDir(resolveRoot("data"));
  fs.writeFileSync(resolveRoot("data", `${name}.json`), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function header(prefix, activePath) {
  const nav = [
    ["index.html", "Accueil"],
    ["parti.html", "Le Parti"],
    ["projet-societe.html", "Projet de société"],
    ["actualites.html", "Actualités"],
    ["adhesion.html", "Adhésion"],
    ["contact.html", "Contact"]
  ];
  const links = nav.map(([href, label]) => {
    const current = href === activePath ? ' aria-current="page"' : "";
    return `<a href="${prefix}/${href}"${current}>${label}</a>`;
  }).join("");

  return `<header class="site-header">
      <nav class="site-nav" aria-label="Navigation principale">
        <a class="site-logo" href="${prefix}/index.html" aria-label="UPR Congo - Accueil">
          <img src="${prefix}/assets/images/logo-upr.png" width="52" height="52" alt="Logo officiel de l’UPR - Union des Patriotes pour la République" />
          <span><strong>UPR</strong><small>Union des Patriotes pour la République</small></span>
        </a>
        <div class="desktop-menu">${links}</div>
        <div class="header-actions">
          <a class="nav-cta" href="${prefix}/adhesion.html">Adhérer</a>
          <button class="icon-button" type="button" data-theme-toggle aria-label="Activer le mode sombre"><span data-theme-icon aria-hidden="true">☾</span></button>
          <button class="icon-button md:hidden" type="button" data-menu-toggle aria-expanded="false" aria-controls="menu-mobile" aria-label="Ouvrir le menu"><span class="hamburger-line"></span><span class="hamburger-line"></span><span class="hamburger-line"></span></button>
        </div>
      </nav>
      <div id="menu-mobile" class="mobile-menu hidden" data-mobile-menu>${links}</div>
    </header>`;
}

function footer(prefix) {
  return `<footer class="site-footer">
      <div class="container footer-grid">
        <div><img src="${prefix}/assets/images/logo-upr.png" width="72" height="72" alt="Logo officiel de l’UPR - Union des Patriotes pour la République" /><h2>UPR</h2><p>Union des Patriotes pour la République</p><p>Dieu - Patrie - Justice</p><p>Servir sans se servir</p></div>
        <nav aria-label="Liens rapides"><h2>Liens rapides</h2><a href="${prefix}/index.html">Accueil</a><a href="${prefix}/parti.html">Le Parti</a><a href="${prefix}/projet-societe.html">Projet de société</a><a href="${prefix}/actualites.html">Actualités</a><a href="${prefix}/adhesion.html">Adhésion</a><a href="${prefix}/contact.html">Contact</a></nav>
        <div><h2>Contacts</h2><a href="mailto:upr.ltcongo@gmail.com">upr.ltcongo@gmail.com</a><a href="mailto:ciakudia@gmail.com">ciakudia@gmail.com</a><p>Kinshasa, RDC</p></div>
        <div><h2>Réseaux</h2><a href="https://www.facebook.com/profile.php?id=61570760132882">Facebook</a><a href="https://whatsapp.com/channel/0029VbCHoWb60eBfGg7jQg29">WhatsApp</a><a href="${prefix}/contact.html">Mentions légales</a></div>
      </div>
      <div class="footer-bottom">© 2026 UPR - Union des Patriotes pour la République. Tous droits réservés.</div>
    </footer>`;
}

function pageHead(item, prefix, type) {
  const title = `${escapeHtml(item.titre)} | UPR Congo`;
  const description = escapeHtml(item.description_courte || "Publication officielle de l’Union des Patriotes pour la République.");
  const url = `${SITE_URL}/${item.url}`;
  const image = item.image ? `${SITE_URL}/${item.image}` : `${SITE_URL}/assets/images/logo-upr.png`;

  return `<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="UPR - Union des Patriotes pour la République" />
    <meta name="theme-color" content="#003B8E" />
    <link rel="canonical" href="${url}" />
    <link rel="icon" href="${prefix}/assets/images/logo-upr.png" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:locale" content="fr_CD" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="UPR Congo" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:alt" content="${escapeHtml(item.image_alt || "Logo officiel de l’UPR - Union des Patriotes pour la République")}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <script>window.tailwind = window.tailwind || {}; window.tailwind.config = { darkMode: "class", theme: { extend: { fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] } } } };</script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="${prefix}/css/style.css" />
  </head>`;
}

function renderPublicationPage(item, outputFolder, options) {
  const prefix = "../..";
  const outputDir = resolveRoot(outputFolder, item.slug);
  ensureDir(outputDir);
  const image = pagePath(item.image || "assets/images/logo-upr.png", prefix);
  const meta = [item.categorie, formatDate(item.date), item.lieu, item.date_evenement ? `Événement : ${formatDate(item.date_evenement)}` : ""].filter(Boolean);

  const html = `<!doctype html>
<html lang="fr" class="scroll-smooth">
  ${pageHead(item, prefix, options.type)}
  <body class="bg-slate-50 text-slate-950 antialiased dark:bg-slate-950 dark:text-white">
    <a class="skip-link" href="#contenu">Aller au contenu principal</a>
    ${header(prefix, options.activePath)}
    <main id="contenu">
      <article>
        <section class="page-hero publication-hero">
          <div class="container narrow">
            <p class="eyebrow">${escapeHtml(options.label)}</p>
            <h1>${escapeHtml(item.titre)}</h1>
            <p>${escapeHtml(item.description_courte || "")}</p>
            <div class="publication-meta">${meta.map((value) => `<span>${escapeHtml(value)}</span>`).join("")}</div>
          </div>
        </section>
        <section class="section section-white">
          <div class="container">
            <img src="${image}" width="960" height="620" alt="${escapeHtml(item.image_alt || "Publication officielle de l’UPR")}" loading="eager" decoding="async" />
            <div class="article-body">
              ${item.html}
              <div class="share-actions" aria-label="Partager cette publication">
                <a href="https://wa.me/?text=${encodeURIComponent(`${item.titre} ${SITE_URL}/${item.url}`)}">WhatsApp</a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${SITE_URL}/${item.url}`)}">Facebook</a>
                <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(`${SITE_URL}/${item.url}`)}&text=${encodeURIComponent(item.titre)}">X / Twitter</a>
                <button type="button" data-copy-link aria-describedby="copy-feedback">Copier le lien</button>
              </div>
              <p class="copy-feedback" id="copy-feedback" data-copy-feedback role="status" aria-live="polite"></p>
            </div>
          </div>
        </section>
      </article>
    </main>
    ${footer(prefix)}
    <script src="${prefix}/js/main.js" defer></script>
  </body>
</html>
`;

  fs.writeFileSync(path.join(outputDir, "index.html"), html, "utf8");
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("fr-CD", { day: "2-digit", month: "long", year: "numeric" }).format(date);
}

function writeSitemap(items) {
  const urls = STATIC_PAGES.map((page) => ({
    loc: `${SITE_URL}${page.loc}`,
    priority: page.priority,
    changefreq: page.changefreq
  })).concat(items.map((item) => ({
    loc: `${SITE_URL}/${item.url}`,
    priority: "0.7",
    changefreq: "monthly"
  })));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
  fs.writeFileSync(resolveRoot("sitemap.xml"), xml, "utf8");
}

function main() {
  const actualites = readCollection({
    folder: "actualites",
    outputFolder: "actualites",
    bodyField: "corps_article",
    defaultTitle: "Actualité UPR",
    defaultCategory: "Vie du parti",
    defaultImage: "assets/uploads/actualite-mobilisation.svg",
    defaultAlt: "Actualité officielle de l’UPR"
  });

  const communiques = readCollection({
    folder: "communiques",
    outputFolder: "communiques",
    bodyField: "corps_communique",
    defaultTitle: "Communiqué UPR",
    defaultCategory: "Communiqué",
    defaultImage: "assets/uploads/communique-upr.svg",
    defaultAlt: "Communiqué officiel de l’UPR"
  });

  const evenements = readCollection({
    folder: "evenements",
    outputFolder: "evenements",
    bodyField: "corps_evenement",
    defaultTitle: "Événement UPR",
    defaultCategory: "Événement",
    defaultImage: "assets/uploads/evenement-assemblee.svg",
    defaultAlt: "Événement officiel de l’UPR",
    extraFields: { date_evenement: "", lieu: "" }
  });

  const documents = readDocuments();

  writeJson("actualites", actualites.map(({ markdown, html, ...item }) => item));
  writeJson("communiques", communiques.map(({ markdown, html, ...item }) => item));
  writeJson("evenements", evenements.map(({ markdown, html, ...item }) => item));
  writeJson("documents", documents);

  cleanGeneratedDir(resolveRoot("actualites"));
  cleanGeneratedDir(resolveRoot("communiques"));
  cleanGeneratedDir(resolveRoot("evenements"));

  actualites.forEach((item) => renderPublicationPage(item, "actualites", { label: "Actualité officielle", activePath: "actualites.html", type: "article" }));
  communiques.forEach((item) => renderPublicationPage(item, "communiques", { label: "Communiqué officiel", activePath: "actualites.html", type: "article" }));
  evenements.forEach((item) => renderPublicationPage(item, "evenements", { label: "Événement officiel", activePath: "actualites.html", type: "article" }));

  writeSitemap([...actualites, ...communiques, ...evenements]);

  console.log(`UPR: ${actualites.length} actualités, ${communiques.length} communiqués, ${evenements.length} événements et ${documents.length} documents générés.`);
}

main();
