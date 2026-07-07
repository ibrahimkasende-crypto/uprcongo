# UPR Congo - Site officiel

Site officiel de l UPR - Union des Patriotes pour la Republique.

Domaine: https://uprcongo.cd
Devise: Dieu - Patrie - Justice
Slogan: Servir sans se servir

## Commandes

```bash
npm install
npm run dev
npm run build
npm run images:setup
```

## Depot GitHub

URL: https://github.com/ibrahimkasende-crypto/uprcongo

- **main** : code source Next.js
- **hostinger-deploy** : site statique genere par GitHub Actions

# Connexion GitHub a Hostinger

Depot GitHub: https://github.com/ibrahimkasende-crypto/uprcongo
Branche a connecter sur Hostinger: hostinger-deploy

## Etapes

1. Aller dans Hostinger hPanel.
2. Aller dans Websites.
3. Choisir le site uprcongo.cd.
4. Cliquer sur Dashboard.
5. Aller dans Advanced.
6. Ouvrir Git.
7. Cliquer sur Continue with GitHub.
8. Autoriser Hostinger a acceder au compte GitHub.
9. Selectionner le depot: ibrahimkasende-crypto/uprcongo
10. Selectionner la branche: hostinger-deploy
11. Definir le dossier de deploiement: public_html
12. Lancer le deploiement.

## Mises a jour

```bash
git add .
git commit --trailer "Co-authored-by: Cursor <cursoragent@cursor.com>" -m "update: amelioration du site UPR Congo"
git push origin main
```

GitHub Actions genere le site statique et met a jour hostinger-deploy automatiquement.

## Securite

- Ne jamais committer .env avec des secrets
- Ne jamais committer node_modules ni out
