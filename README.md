# UPR Congo - Site officiel

Site officiel de l UPR - Union des Patriotes pour la Republique.

- Domaine : https://uprcongo.cd
- Devise : Dieu - Patrie - Justice
- Slogan : Servir sans se servir

## Commandes

```bash
npm install
npm run dev
npm run build
npm run images:setup
```

## Depot GitHub

URL : https://github.com/ibrahimkasende-crypto/uprcongo

- **main** : code source Next.js
- **hostinger-deploy** : site statique genere par GitHub Actions

# Deploiement Hostinger avec GitHub

Depot GitHub : https://github.com/ibrahimkasende-crypto/uprcongo

Branche source : main

Branche de deploiement statique : hostinger-deploy

## Connexion a Hostinger

1. Aller dans Hostinger hPanel.
2. Aller dans Websites.
3. Choisir le site uprcongo.cd.
4. Cliquer sur Dashboard.
5. Aller dans Advanced.
6. Ouvrir Git.
7. Cliquer sur Continue with GitHub.
8. Autoriser Hostinger a acceder au compte GitHub.
9. Selectionner le depot : ibrahimkasende-crypto/uprcongo
10. Selectionner la branche : hostinger-deploy
11. Definir le dossier de deploiement : public_html
12. Lancer le deploiement.

Important : le contenu de la branche hostinger-deploy est deja le site statique genere. C est cette branche qu il faut connecter a Hostinger.

# Mettre a jour le site

1. Ouvrir le projet dans Cursor.
2. Modifier les fichiers necessaires.
3. Tester localement : npm run dev
4. Verifier le build : npm run build
5. Envoyer les modifications :

```bash
git add .
git commit --trailer "Co-authored-by: Cursor <cursoragent@cursor.com>" -m "update: amelioration du site UPR Congo"
git push origin main
```

6. GitHub Actions genere out/ et publie dans hostinger-deploy.
7. Hostinger recupere la nouvelle version depuis hostinger-deploy.

## GitHub CLI

```powershell
winget install GitHub.cli
gh auth login
gh repo create ibrahimkasende-crypto/uprcongo --public --source=. --remote=origin --push
```

## Securite

- Ne jamais committer .env avec des secrets
- Ne jamais committer node_modules ni out sur main
- Ne pas modifier manuellement hostinger-deploy
