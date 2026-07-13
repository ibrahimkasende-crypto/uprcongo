import { ASSETS_VERSION, IMAGES, NEWS_IMAGE_BY_CATEGORY } from "@/lib/assets";

export { ASSETS_VERSION, IMAGES, NEWS_IMAGE_BY_CATEGORY };

export const SITE_URL = "https://uprcongo.com";

// Remplacer 243XXXXXXXXX par le vrai numéro WhatsApp du Coordinateur National, sans le signe +.
export const SITE_BACKGROUND = IMAGES.backgrounds.hero;

export const LOGO_VERSION = ASSETS_VERSION;

export const COORDINATEUR_WHATSAPP = "243XXXXXXXXX";

export const PARTY = {
  name: "UPR",
  fullName: "Union des Patriotes pour la République",
  tagline: "Parti politique républicain congolais",
  motto: "Dieu - Patrie - Justice",
  slogan: "Servir sans se servir",
  officialMessage: "Le changement, c'est maintenant avec l'UPR.",
  rallyingCall: "Congolais, prends ton pays en main.",
  description:
    "L'UPR est un parti politique républicain congolais engagé pour la souveraineté nationale, la justice, la démocratie, la bonne gouvernance et le bien-être du peuple congolais.",
  president: {
    name: "Prof. Rev. Julien C. K. Ciakudia Sr.",
    title: "Président national / Autorité morale",
    bio: "Leadership patriotique, vision républicaine et engagement démocratique au service de la résurrection du Congo.",
    extendedBio:
      "Autorité morale et Président national de l'UPR, il porte une vision institutionnelle fondée sur la reconstruction nationale, la responsabilité publique, la justice et la souveraineté du Congo.",
    image: IMAGES.president.portrait,
    imageWide: IMAGES.president.wide,
    imageAlt: "Prof. Rev. Julien C. K. Ciakudia Sr., Président national de l'UPR",
  },
  logo: IMAGES.logo.main,
  logoTransparent: IMAGES.logo.transparent,
  logoWhite: IMAGES.logo.white,
  logoAlt: "Logo officiel de l'UPR - Union des Patriotes pour la République",
  founded: "2014",
  history:
    "L'Union des Patriotes pour la République trouve son ancrage dans l'Assemblée extraordinaire des représentants des Patriotes Républicains Congolais tenue à Kinshasa du 29 au 30 janvier 2014. L'Acte fondateur signé en 2014 consacre l'engagement des membres fondateurs autour d'une vision républicaine pour le Congo.",
};

export const NAVIGATION = [
  { label: "Accueil", href: "/" },
  { label: "Le Parti", href: "/parti/" },
  { label: "Projet de société", href: "/projet-societe/" },
  { label: "Actualités", href: "/actualites/" },
  { label: "Adhésion", href: "/adhesion/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const VALUES = [
  {
    title: "Dieu",
    description:
      "Une référence morale qui rappelle la dignité humaine, la vérité et la responsabilité devant la nation.",
  },
  {
    title: "Patrie",
    description:
      "L'amour du Congo, la souveraineté nationale et la défense de l'intérêt général au-dessus des intérêts particuliers.",
  },
  {
    title: "Justice",
    description:
      "La primauté du droit, l'égalité des citoyens et la lutte contre les antivaleurs dans la vie publique.",
  },
] as const;

export const VISION_CARDS = [
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
] as const;

export const PARTY_PRINCIPLES = [
  { title: "Patriotisme", description: "Aimer, défendre et servir la République Démocratique du Congo." },
  { title: "Justice", description: "Promouvoir l'équité, la dignité et l'État de droit." },
  { title: "Travail", description: "Valoriser l'effort, la compétence et la production nationale." },
  { title: "Liberté", description: "Respecter les libertés publiques et la responsabilité citoyenne." },
  { title: "Solidarité", description: "Renforcer l'unité nationale et la cohésion sociale." },
  { title: "Responsabilité", description: "Servir sans se servir, dans la discipline et la transparence." },
  { title: "Discipline", description: "Respecter les textes, les institutions du parti et la parole donnée." },
  { title: "Intérêt général", description: "Placer le bien commun au-dessus des intérêts particuliers." },
] as const;

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

export const COORDINATION_NATIONALE = {
  title: "Coordination nationale de l'UPR",
  name: "Semences Engita",
  role: "Coordinateur national",
  category: "Vie du parti" as const,
  excerpt:
    "La coordination nationale accompagne l'organisation, la mobilisation et le suivi des activités du parti dans un esprit de discipline, de responsabilité et de service.",
  image: IMAGES.coordination.coordon,
  imageAlt: "Semences Engita, Coordinateur national de l'UPR",
  imagePosition: "top" as const,
  imageAspect: "portrait" as const,
};

export const ADHESION_BLOCK = {
  title: "Rejoindre l'UPR",
  excerpt:
    "Rejoignez une famille politique engagée pour le Congo, la justice, la souveraineté nationale et le service désintéressé de la nation.",
  image: IMAGES.adhesion.membres,
  imageAlt: "Membres de l'UPR après une rencontre de mobilisation",
};

export const PROJECT_AXES = [
  "Résurrection du Congo",
  "Démocratie et État de droit",
  "Relance du travail",
  "Relance économique",
  "Renaissance sociale",
  "Renaissance culturelle",
  "Renaissance politique",
  "Bonne gouvernance",
  "Souveraineté nationale",
] as const;

export const PROJECT_PRINCIPLES = [
  {
    title: "Relance du travail",
    description: "Faire du travail un pilier de la dignité et du redressement national.",
  },
  {
    title: "Relance économique",
    description: "Valoriser les ressources congolaises au service du peuple.",
  },
  {
    title: "Renaissance sociale",
    description: "Renforcer la santé, l'éducation, la famille et la solidarité.",
  },
  {
    title: "Renaissance culturelle",
    description: "Promouvoir l'identité, la mémoire et la fierté nationale.",
  },
  {
    title: "Renaissance politique",
    description: "Réhabiliter l'État, la responsabilité et la confiance publique.",
  },
] as const;

export const PROJECT_DOMAINS = [
  "État de droit et institutions",
  "Administration territoriale",
  "Économie et commerce",
  "Agriculture",
  "Santé publique",
  "Éducation et jeunesse",
  "Femme et famille",
  "Transport et infrastructures",
  "Information et médias",
  "Relations internationales",
  "Sécurité et souveraineté nationale",
] as const;

export const PROJECT_QUOTES = [
  "Rien ne peut se faire sans la confiance et l'entraide.",
  "Valorisons nos ressources humaines et naturelles.",
  "Le Congo mérite mieux.",
] as const;


export const RDC_CITIES_STRIP = [
  {
    label: "Kinshasa",
    src: IMAGES.kinshasa.echangeurLimete,
    alt: "Échangeur de Limete, Kinshasa - capitale de la RDC",
  },
  {
    label: "Kisangani",
    src: IMAGES.rdc.kisangani,
    alt: "Kisangani, Tshopo - confluence du fleuve Congo",
  },
  {
    label: "Goma",
    src: IMAGES.rdc.goma,
    alt: "Goma, Nord-Kivu - ville du lac Kivu",
  },
  {
    label: "Lubumbashi",
    src: IMAGES.rdc.lubumbashi,
    alt: "Lubumbashi, Haut-Katanga - capitale du cuivre",
  },
] as const;

export const FOUNDING_DOCUMENTS = [
  {
    id: "acte-fondateur",
    title: "Acte fondateur",
    date: "2014-01-30",
    image: IMAGES.documents.acteFondateur,
    imageAlt: "Couverture - Acte fondateur UPR 2014",
    excerpt:
      "Signé à l'issue de l'Assemblée extraordinaire des Patriotes Républicains Congolais, les 29 et 30 janvier 2014 à Kinshasa, l'Acte fondateur consacre la naissance de l'UPR.",
    fullContent: [
      "L'Assemblée extraordinaire des représentants des Patriotes Républicains Congolais, réunie à Kinshasa du 29 au 30 janvier 2014, proclame la création de l'Union des Patriotes pour la République (UPR).",
      "Les membres fondateurs affirment leur attachement à la souveraineté nationale, à l'intégrité territoriale du Congo et à la défense de l'intérêt général du peuple congolais.",
      "L'Acte fondateur consacre une vision républicaine fondée sur la devise Dieu - Patrie - Justice et sur l'engagement de servir le pays sans se servir.",
      "Il fixe les bases morales, politiques et institutionnelles du parti et rappelle la responsabilité de chaque militant envers la nation et les générations futures.",
    ],
  },
  {
    id: "protocole-accord",
    title: "Protocole d'accord",
    date: "2014-01-30",
    image: IMAGES.documents.protocoleAccord,
    imageAlt: "Couverture - Protocole d'accord UPR",
    excerpt:
      "Le Protocole d'accord encadre la vie interne de l'UPR : organisation, discipline, gouvernance et principes de conduite des responsables et des militants.",
    fullContent: [
      "Le Protocole d'accord fixe les règles de fonctionnement interne de l'Union des Patriotes pour la République et traduit l'engagement collectif des fondateurs.",
      "Il définit les principes de discipline, de transparence et de responsabilité qui doivent guider l'action des dirigeants, des cadres et des militants du parti.",
      "Le texte rappelle la primauté de l'intérêt national, le respect des institutions de la République et le rejet des antivaleurs dans la vie publique.",
      "Il consacre également les bases organisationnelles permettant à l'UPR de se déployer sur l'ensemble du territoire national au service du peuple congolais.",
    ],
  },
] as const;

export const DOCUMENTS = [
  {
    slug: "projet-de-societe-upr",
    title: "Projet de société",
    type: "Projet de société",
    date: "2026-06-01",
    file: "/documents/projet-de-societe-upr.pdf",
    description: "Document de référence présentant la vision de l'UPR pour la résurrection du Congo.",
  },
] as const;

export const PROVINCES_RDC = [
  "Bas-Uélé",
  "Équateur",
  "Haut-Katanga",
  "Haut-Lomami",
  "Haut-Uélé",
  "Ituri",
  "Kasaï",
  "Kasaï-Central",
  "Kasaï-Oriental",
  "Kinshasa",
  "Kongo-Central",
  "Kwango",
  "Kwilu",
  "Lomami",
  "Lualaba",
  "Maniema",
  "Mongala",
  "Nord-Kivu",
  "Nord-Ubangi",
  "Sankuru",
  "Sud-Kivu",
  "Sud-Ubangi",
  "Tanganyika",
  "Tshopo",
  "Tshuapa",
  "Mai-Ndombe",
] as const;

export const CONTACT = {
  emails: ["upr.ltcongo@gmail.com", "ciakudia@gmail.com"],
  location: "Kinshasa, RDC",
  facebook: "https://www.facebook.com/profile.php?id=61570760132882",
  whatsappChannel: "https://whatsapp.com/channel/0029VbCHoWb60eBfGg7jQg29",
  whatsappLabel: "Canal WhatsApp officiel",
};

export const ADHESION_ENGAGEMENTS = [
  "Respecter la devise Dieu - Patrie - Justice.",
  "Servir le Congo sans rechercher un avantage personnel indu.",
  "Contribuer à la mobilisation civique et républicaine.",
] as const;

export const ADHESION_REASONS = [
  {
    title: "Patriotisme",
    description: "Défendre l'intérêt supérieur de la République Démocratique du Congo.",
  },
  {
    title: "Discipline",
    description: "Agir dans le respect des textes, des institutions du parti et de la parole donnée.",
  },
  {
    title: "Responsabilité",
    description: "Participer à la vie publique avec sérieux, loyauté, écoute et sens du devoir.",
  },
  {
    title: "Justice",
    description: "Promouvoir l'État de droit, la dignité humaine et la lutte contre les antivaleurs.",
  },
] as const;

export const CONTACT_FIELDS = [
  {
    title: "Actualité politique",
    description: "Suivi de la vie publique, de l'organisation interne du parti et des prises de position officielles.",
  },
  {
    title: "Analyse institutionnelle",
    description: "Lecture républicaine des institutions, de l'État de droit et des mécanismes démocratiques.",
  },
  {
    title: "Gouvernance",
    description: "Promotion de l'éthique, de la redevabilité, de la transparence et de la lutte contre les antivaleurs.",
  },
  {
    title: "Élections",
    description: "Mobilisation citoyenne, participation démocratique et défense de la vérité des urnes.",
  },
  {
    title: "Société et citoyenneté",
    description: "Engagement civique, dignité humaine, responsabilité collective et cohésion nationale.",
  },
  {
    title: "Enjeux nationaux",
    description: "Décryptage des questions de souveraineté, de développement, de sécurité et d'avenir du Congo.",
  },
] as const;

export const CONTACT_VALUES = [
  { title: "Rigueur", description: "Une démarche structurée, respectueuse des textes et orientée vers les résultats." },
  { title: "Indépendance", description: "Une parole politique attachée à la souveraineté nationale et à l'intérêt général." },
  { title: "Clarté", description: "Des positions compréhensibles, assumées et accessible aux citoyens." },
  { title: "Responsabilité", description: "Le service public comme devoir, dans l'humilité et le respect du peuple." },
] as const;



