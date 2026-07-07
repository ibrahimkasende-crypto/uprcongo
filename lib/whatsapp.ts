export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

export interface AdhesionFormData {
  nom: string;
  sexe: string;
  dateNaissance: string;
  province: string;
  ville: string;
  quartier: string;
  telephone: string;
  email: string;
  profession: string;
  niveauEtude: string;
  motivation: string;
}

export function buildAdhesionMessage(data: AdhesionFormData): string {
  return [
    "Bonjour Coordinateur National UPR,",
    "Je souhaite adhérer à l'Union des Patriotes pour la République.",
    "",
    "Informations du demandeur :",
    `Nom complet : ${data.nom}`,
    `Sexe : ${data.sexe}`,
    `Date de naissance : ${data.dateNaissance}`,
    `Province : ${data.province}`,
    `Ville / Commune : ${data.ville}`,
    `Quartier : ${data.quartier}`,
    `Téléphone : ${data.telephone}`,
    `Email : ${data.email}`,
    `Profession : ${data.profession}`,
    `Niveau d'étude : ${data.niveauEtude}`,
    `Motivation : ${data.motivation}`,
    "",
    "Devise : Dieu - Patrie - Justice",
    "Slogan : Servir sans se servir",
    "",
    "Merci de me contacter pour finaliser mon adhésion.",
  ].join("\n");
}
