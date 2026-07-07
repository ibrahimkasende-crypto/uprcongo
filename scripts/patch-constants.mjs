import fs from "fs";
const path = "lib/constants.ts";
let c = fs.readFileSync(path, "utf8");
c = c.replace(/\/\/ Remplacer par le num.*?\n/, "// Remplacer 243XXXXXXXXX par le vrai numéro WhatsApp du Coordinateur National, sans le signe +.\n");
c = c.replace('bio: "Président national de l\'Union des Patriotes pour la République, engagé pour une vision républicaine, patriotique et démocratique du Congo.",', 'bio: "Leadership patriotique, vision républicaine et engagement démocratique au service de la résurrection du Congo.",');
fs.writeFileSync(path, c);
console.log("pass1 ok");