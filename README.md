# UPR Congo - Site officiel

Site officiel de l'UPR Congo — Union des Patriotes pour la République. Plateforme institutionnelle moderne présentant le parti, sa devise Dieu - Patrie - Justice, son projet de société, ses actualités et son formulaire d'adhésion.

- Domaine : https://uprcongo.com
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
3. Choisir le site uprcongo.com.
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
# Configuration de l'espace admin

Le site utilise Decap CMS avec Netlify Identity et Git Gateway.

URL : https://uprcongo.com/admin/

## Etapes a faire dans Netlify

1. Aller dans Netlify.
2. Ouvrir le site UPR Congo.
3. Aller dans Site configuration.
4. Activer Identity.
5. Dans les parametres Identity, mettre Registration sur : Invite only
6. Activer Git Gateway.
7. Inviter les utilisateurs autorises :

President national : ciakudia@gmail.com

Coordinateur national : semenceengita@gmail.com

IT : colettebansompili011@gmail.com

8. Chaque utilisateur recoit un email d'invitation.
9. Chaque utilisateur cree son mot de passe.
10. Ensuite, il peut aller sur : /admin/
11. Il se connecte avec son email et son mot de passe.
12. Il peut ajouter, modifier ou supprimer les contenus.

Important : ne pas creer un mot de passe unique pour tout le monde. Ne pas ecrire les mots de passe dans le code. Chaque utilisateur doit avoir son propre compte.

## Publier un article

1. Aller sur /admin/
2. Se connecter
3. Cliquer sur "Actualites UPR"
4. Cliquer sur "New Actualites UPR"
5. Remplir : titre, date, categorie, image, resume, contenu complet.
6. Cliquer sur Save.
7. Publier.

## Modifier un article

1. Aller sur /admin/
2. Ouvrir "Actualites UPR"
3. Selectionner l'article
4. Modifier le contenu
5. Sauvegarder
6. Publier.

## Supprimer un article

1. Aller sur /admin/
2. Ouvrir l'article
3. Cliquer sur Delete
4. Confirmer
5. Le site se mettra a jour apres rebuild.

## Si l'admin ne fonctionne pas

Verifier : Netlify Identity active, Git Gateway active, Registration en Invite only, les utilisateurs invites, le depot GitHub connecte, le backend git-gateway dans public/admin/config.yml, le domaine du site correctement configure.

## Deploiement Netlify

- Build : npm run build
- Publish : out
- Decap CMS cree/modifie les fichiers dans GitHub et Netlify rebuild automatiquement a chaque commit sur main.
