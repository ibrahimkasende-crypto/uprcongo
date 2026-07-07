import fs from "fs";

const constantsPath = "lib/constants.ts";
let c = fs.readFileSync(constantsPath, "utf8");

if (!c.includes("COORDINATION_NATIONALE")) {
  c = c.replace(
    'export const NEWS_CATEGORIES = ["Tous", "Mobilisation", "Déclaration", "Communiqué"] as const;',
    `export const NEWS_CATEGORIES = ["Tous", "Mobilisation", "Déclaration", "Communiqué", "Vie du parti"] as const;

export const COORDINATION_NATIONALE = {
  title: "Coordination nationale de l'UPR",
  category: "Vie du parti" as const,
  excerpt:
    "La coordination nationale accompagne l'organisation, la mobilisation et le suivi des activités du parti dans un esprit de discipline, de responsabilité et de service.",
  image: IMAGES.coordination.coordon,
  imageAlt: "Coordination nationale de l'UPR",
};

export const ADHESION_BLOCK = {
  title: "Rejoindre l'UPR",
  excerpt:
    "Rejoignez une famille politique engagée pour le Congo, la justice, la souveraineté nationale et le service désintéressé de la nation.",
  image: IMAGES.adhesion.membres,
  imageAlt: "Membres de l'UPR après une rencontre de mobilisation",
};`
  );
}

const newsBlock = String.raw`export const NEWS = [
  {
    slug: "mobilisation-patriotique-service-congo",
    title: 'Mobilisation patriotique autour du mot d\'ordre "Servir sans se servir"',
    date: "2026-04-18",
    category: "Mobilisation",
    featured: true,
    image: IMAGES.actualites.mobilisationPatriotique,
    imageAlt: "Mobilisation patriotique de l'UPR autour du mot d'ordre Servir sans se servir",
    excerpt:
      "L'UPR rappelle son appel à l'engagement citoyen et républicain pour remettre le service du Congo au centre de l'action publique.",
    author: "UPR - Union des Patriotes pour la République",
  },
  {
    slug: "communique-officiel-upr",
    title: "Communiqué officiel de l'UPR",
    date: "2026-06-01",
    category: "Communiqué",
    featured: false,
    image: IMAGES.actualites.communiqueOfficiel,
    imageAlt: "Communiqué officiel de l'UPR sur la souveraineté nationale et l'État de droit",
    excerpt:
      "L'UPR publie un communiqué officiel rappelant son attachement à la souveraineté nationale, à l'État de droit et à la mobilisation patriotique.",
    author: "UPR - Union des Patriotes pour la République",
  },
  {
    slug: "declaration-politique-president",
    title: "Déclaration politique du Président national",
    date: "2026-06-10",
    category: "Déclaration",
    featured: false,
    image: IMAGES.president.declaration,
    imageAlt: "Déclaration politique du Président national de l'UPR",
    excerpt:
      "Dans une déclaration politique, le Président national de l'UPR appelle à la vigilance patriotique, à la protection de la souveraineté nationale et à la défense prioritaire des intérêts des Congolais.",
    author: "UPR - Union des Patriotes pour la République",
    fullContent: {
      chapo:
        "Dans une déclaration politique, le Président national de l'UPR, Prof. Rev. Julien C. K. Ciakudia Sr., appelle à une vigilance accrue sur les questions de souveraineté nationale, de sécurité diplomatique et de défense des intérêts fondamentaux du peuple congolais.",
      paragraphs: [
        "Selon le Président national de l'UPR, certaines personnalités influentes autour des institutions congolaises devraient faire l'objet d'une attention particulière lorsque leurs orientations ou leurs relations supposées peuvent avoir un impact sur la souveraineté nationale.",
        "Dans ce cadre, Prof. Rev. Julien C. K. Ciakudia Sr. évoque le cas de l'ambassadeur Jhon Nyakeru Kalunga, dont il conteste la proximité politique et diplomatique supposée avec certains intérêts étrangers. Il appelle les autorités compétentes à clarifier publiquement les responsabilités, les influences et les choix qui auraient accompagné le processus d'intégration de la République Démocratique du Congo à la Communauté d'Afrique de l'Est.",
        "Le Président national de l'UPR affirme également que la vie politique congolaise doit être guidée par la transparence, l'intérêt général et la protection des citoyens. Il invite les responsables publics à placer la souveraineté nationale au-dessus des calculs personnels, familiaux ou partisans.",
        "Dans le même esprit, Prof. Rev. Julien C. K. Ciakudia Sr. adresse un message au Président de la République, l'appelant à accorder une attention prioritaire à la situation des Congolais vivant à l'étranger, notamment ceux établis en Afrique du Sud. Selon lui, la protection de la vie, de la dignité et des droits des Congolais doit toujours passer avant toute distraction médiatique ou sportive.",
        "Pour l'UPR, la patrie se sert avec responsabilité. Le parti rappelle que l'État doit défendre ses citoyens partout où ils vivent, préserver la souveraineté du Congo et renforcer la confiance entre les institutions et le peuple.",
      ],
      conclusion:
        "L'UPR réaffirme son attachement à la devise Dieu - Patrie - Justice, ainsi qu'à son mot d'ordre : Servir sans se servir.",
      editorialNote:
        "Cette déclaration reprend la position politique exprimée par le Président national de l'UPR. Elle doit être publiée dans le respect du droit, de la responsabilité éditoriale et de la vérification des informations sensibles.",
    },
  },
  {
    slug: "coordination-nationale-upr",
    title: COORDINATION_NATIONALE.title,
    date: "2026-05-15",
    category: COORDINATION_NATIONALE.category,
    featured: false,
    image: COORDINATION_NATIONALE.image,
    imageAlt: COORDINATION_NATIONALE.imageAlt,
    excerpt: COORDINATION_NATIONALE.excerpt,
    author: "UPR - Union des Patriotes pour la République",
  },
] as const;`;

c = c.replace(/export const NEWS = \[[\s\S]*?\] as const;/, newsBlock);
fs.writeFileSync(constantsPath, c);
console.log("constants ok");
