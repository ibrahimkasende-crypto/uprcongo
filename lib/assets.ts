export const ASSETS_VERSION = "20260707f";

const BASE = "/images";

export function getImageUrl(path: string, version = ASSETS_VERSION): string {
  const normalized = path.startsWith("/") ? path : `${BASE}/${path}`;
  const separator = normalized.includes("?") ? "&" : "?";
  return `${normalized}${separator}v=${version}`;
}

export const IMAGES = {
  logo: {
    main: getImageUrl(`${BASE}/logo/logo-upr.png`),
    transparent: getImageUrl(`${BASE}/logo/logo-upr-transparent.png`),
    white: getImageUrl(`${BASE}/logo/logo-upr-white.png`),
    horizontal: getImageUrl(`${BASE}/logo/logo-upr-horizontal.png`),
    favicon: getImageUrl(`${BASE}/logo/favicon.png`),
  },
  president: {
    original: getImageUrl(`${BASE}/president/president-upr-original.jpeg`),
    portrait: getImageUrl(`${BASE}/president/president-upr-portrait.webp`),
    square: getImageUrl(`${BASE}/president/president-upr-square.webp`),
    wide: getImageUrl(`${BASE}/president/president-upr-wide.webp`),
    dark: getImageUrl(`${BASE}/president/president-upr-dark.webp`),
    declaration: getImageUrl(`${BASE}/president/photo-president-declaration.webp`),
  },
  backgrounds: {
    hero: getImageUrl(`${BASE}/backgrounds/upr-kinshasa-limete-hero.webp`),
    heroDark: getImageUrl(`${BASE}/backgrounds/hero-dark.webp`),
    heroLight: getImageUrl(`${BASE}/backgrounds/hero-light.webp`),
    mobile: getImageUrl(`${BASE}/backgrounds/mobile.webp`),
    sectionSoft: getImageUrl(`${BASE}/backgrounds/upr-section-soft-bg.webp`),
  },
  kinshasa: {
    echangeurLimete: getImageUrl(`${BASE}/kinshasa/echangeur-limete.webp`),
    skyline: getImageUrl(`${BASE}/kinshasa/kinshasa-skyline.webp`),
    fleuve: getImageUrl(`${BASE}/kinshasa/fleuve-congo.webp`),
    avenue: getImageUrl(`${BASE}/kinshasa/avenue-kinshasa.webp`),
  },
  rdc: {
    kisangani: getImageUrl(`${BASE}/rdc/kisangani.webp`),
    goma: getImageUrl(`${BASE}/rdc/goma.webp`),
    lubumbashi: getImageUrl(`${BASE}/rdc/lubumbashi.webp`),
  },
  values: {
    dieu: getImageUrl(`${BASE}/values/dieu.webp`),
    patrie: getImageUrl(`${BASE}/values/patrie.webp`),
    justice: getImageUrl(`${BASE}/values/justice.webp`),
  },
  adhesion: {
    engagement: getImageUrl(`${BASE}/adhesion/engagement-citoyen.webp`),
    communaute: getImageUrl(`${BASE}/adhesion/communaute-upr.webp`),
    formulaire: getImageUrl(`${BASE}/adhesion/adhesion-banner.webp`),
    membres: getImageUrl(`${BASE}/adhesion/membres-upr.webp`),
  },
  coordination: {
    coordon: getImageUrl(`${BASE}/coordination/photo-coordon.webp`),
  },
  documents: {
    acteFondateur: getImageUrl(`${BASE}/documents/acte-fondateur.webp`),
    projetSociete: getImageUrl(`${BASE}/documents/projet-societe.webp`),
    protocoleAccord: getImageUrl(`${BASE}/documents/protocole-accord.webp`),
    ficheAdhesion: getImageUrl(`${BASE}/documents/fiche-adhesion.webp`),
    carteMembre: getImageUrl(`${BASE}/documents/carte-membre.webp`),
  },
  leadership: {
    coordinateurNational: getImageUrl(`${BASE}/leadership/coordinateur-national.webp`),
    secretaireGeneral: getImageUrl(`${BASE}/leadership/secretaire-general.webp`),
    responsableProvincial: getImageUrl(`${BASE}/leadership/responsable-provincial.webp`),
  },
  activities: {
    placeholder: getImageUrl(`${BASE}/activities/activite-officielle-placeholder.webp`),
    assemblee: getImageUrl(`${BASE}/activities/assemblee-placeholder.webp`),
    mobilisation: getImageUrl(`${BASE}/activities/mobilisation-placeholder.webp`),
  },
  actualites: {
    communique: getImageUrl(`${BASE}/actualites/communique.webp`),
    activite: getImageUrl(`${BASE}/actualites/activite.webp`),
    mobilisation: getImageUrl(`${BASE}/actualites/mobilisation.webp`),
    declaration: getImageUrl(`${BASE}/actualites/declaration.webp`),
    meeting: getImageUrl(`${BASE}/actualites/meeting.webp`),
    vieParti: getImageUrl(`${BASE}/actualites/vie-parti.webp`),
    mobilisationPatriotique: getImageUrl(`${BASE}/actualites/mobilisation-patriotique.webp`),
    communiqueOfficiel: getImageUrl(`${BASE}/actualites/communique-officiel.webp`),
  },
} as const;

export const NEWS_IMAGE_BY_CATEGORY: Record<string, string> = {
  Mobilisation: IMAGES.actualites.mobilisationPatriotique,
  Déclaration: IMAGES.president.declaration,
  Communiqué: IMAGES.actualites.communiqueOfficiel,
  Activité: IMAGES.actualites.activite,
  Réunion: IMAGES.actualites.meeting,
  "Vie du parti": IMAGES.coordination.coordon,
};
