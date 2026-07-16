import fs from "fs";

const data = JSON.parse(fs.readFileSync("data/actualites.json", "utf8"));
const esc = (value) => String(value ?? "").replace(/'/g, "''");

const rows = data.map((article) => {
  const title = esc(article.titre);
  const slug = esc(article.slug);
  const category = esc(article.categorie || "Vie du parti");
  const excerpt = esc(article.description_courte || article.description || "");
  const content = esc(article.markdown || "");
  const imageUrl = article.image ? `'${esc(article.image)}'` : "null";
  const imageAlt = esc(article.image_alt || article.titre);
  const featured = article.featured ? "true" : "false";
  const publishedAt = article.date
    ? new Date(article.date).toISOString()
    : new Date().toISOString();
  const author = esc(article.auteur || "UPR Congo");

  return `insert into public.articles (
  title, slug, category, excerpt, content, image_url, image_alt, featured, status, author_email, published_at
)
select
  '${title}',
  '${slug}',
  '${category}',
  '${excerpt}',
  '${content}',
  ${imageUrl},
  '${imageAlt}',
  ${featured},
  'published',
  '${author}',
  '${publishedAt}'
where not exists (
  select 1 from public.articles where slug = '${slug}'
);`;
});

const sql = `-- Seed des articles existants du site UPR Congo
-- Idempotent : n'insère pas si le slug existe déjà
-- À exécuter dans Supabase → SQL Editor → Run

${rows.join("\n\n")}
`;

fs.writeFileSync("supabase/seed-articles.sql", sql);
console.log(`UPR: ${data.length} articles préparés dans supabase/seed-articles.sql`);
