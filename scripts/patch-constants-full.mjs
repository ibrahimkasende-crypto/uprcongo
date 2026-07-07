import fs from "fs";
const path = "lib/constants.ts";
let c = fs.readFileSync(path, "utf8");

const visionBlock = `export const VISION_CARDS = [
  {
    title: "Souveraineté nationale",
    description: "Défense de l'indépendance, de l'intégrité territoriale et des intérêts stratégiques du Congo.",
  },
  {
    title: "État de droit",
    description: "Respect de la Constitution, primauté du droit et garantie des libertés fondamentales.",
  },
  {
    title: "Bonne gouvernance",
    description: "Transparence, redevabilité et lutte contre la corruption dans la gestion publique.",
  },
  {
    title: "Justice sociale",
    description: "Équité, dignité humaine et accès aux opportunités pour tous les citoyens congolais.",
  },
  {
    title: "Relance économique",
    description: "Valorisation des ressources nationales et création de richesses au service du peuple.",
  },
  {
    title: "Renaissance politique",
    description: "Réhabilitation de l'État, de la responsabilité publique et de la confiance citoyenne.",
  },
] as const;`;
c = c.replace(/export const VISION_CARDS = \[[\s\S]*?\] as const;/, visionBlock);

const principlesBlock = `export const PARTY_PRINCIPLES = [
  { title: "Patriotisme", description: "Aimer, défendre et servir la République Démocratique du Congo." },
  { title: "Justice", description: "Promouvoir l'équité, la dignité et l'État de droit." },
  { title: "Travail", description: "Valoriser l'effort, la compétence et la production nationale." },
  { title: "Liberté", description: "Respecter les libertés publiques et la responsabilité citoyenne." },
  { title: "Solidarité", description: "Renforcer l'unité nationale et la cohésion sociale." },
  { title: "Responsabilité", description: "Servir sans se servir, dans la discipline et la transparence." },
  { title: "Discipline", description: "Respecter les textes, les institutions du parti et la parole donnée." },
  { title: "Intérêt général", description: "Placer le bien commun au-dessus des intérêts particuliers." },
] as const;`;
c = c.replace(/export const PARTY_PRINCIPLES = \[[\s\S]*?\] as const;/, principlesBlock);

if (!c.includes("PROJECT_HOME_AXES")) {
  const block = `

export const PROJECT_HOME_AXES = [
  {
    title: "Relance du travail",
    description: "Faire du travail un pilier de la dignité, de la production et du redressement national.",
  },
  {
    title: "Relance économique",
    description: "Valoriser les ressources congolaises et bâtir une économie au service du peuple.",
  },
  {
    title: "Renaissance sociale",
    description: "Renforcer la santé, l'éducation, la famille et la solidarité nationale.",
  },
  {
    title: "Renaissance culturelle",
    description: "Promouvoir l'identité, la mémoire collective et la fierté congolaise.",
  },
  {
    title: "Renaissance politique",
    description: "Réhabiliter l'État, la responsabilité publique et la confiance des citoyens.",
  },
] as const;

export const PARTY_STATS = [
  { label: "Année de fondation", value: 2014, suffix: "" },
  { label: "Provinces de la RDC", value: 26, suffix: "" },
  { label: "Principes républicains", value: 8, suffix: "" },
  { label: "Axes du projet", value: 9, suffix: "" },
] as const;

export const NEWS_CATEGORIES = ["Tous", "Mobilisation", "Déclaration", "Communiqué"] as const;
`;
  c = c.replace(/\] as const;\r?\n\r?\nexport const PROJECT_AXES/, "] as const;" + block + "\nexport const PROJECT_AXES");
}

if (!c.includes("communique-officiel-upr")) {
  const item = `  {
    slug: "communique-officiel-upr",
    title: "Communiqué officiel de l'UPR",
    date: "2026-06-01",
    category: "Communiqué",
    featured: false,
    image: "/images/logo-upr.png",
    imageAlt: "Communiqué officiel de l'UPR",
    excerpt:
      "L'UPR publie un communiqué officiel rappelant son attachement à la souveraineté nationale, à l'État de droit et à la mobilisation patriotique.",
    author: "UPR - Union des Patriotes pour la République",
  },
`;
  c = c.replace(/(\s+author: "UPR - Union des Patriotes pour la République",\r?\n  \},)(\r?\n\] as const;\r?\n\r?\nexport const DOCUMENTS)/, "$1\n" + item + "] as const;\n\nexport const DOCUMENTS");
}

fs.writeFileSync(path, c);
console.log("constants full patch ok");