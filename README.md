# UPR Congo - Site officiel

Site officiel de l'UPR Congo — Union des Patriotes pour la République. Plateforme institutionnelle moderne présentant le parti, sa devise Dieu - Patrie - Justice, son projet de société, ses actualités et son formulaire d'adhésion.

- Domaine : https://uprcongo.com
- Devise : Dieu - Patrie - Justice
- Slogan : Servir sans se servir
- Hébergement : **Netlify**

## Commandes

```bash
npm install
npm run dev
npm run build
```

## Depot GitHub

URL : https://github.com/ibrahimkasende-crypto/uprcongo

Branche source : **main**

# Déploiement Netlify

Le site est déployé sur Netlify à partir du dépôt GitHub (`main`).

Build Netlify (déjà dans `netlify.toml`) :
- Commande : `npm run build`
- Dossier publié : `out`
- Node : `22`

## Variables d’environnement Netlify (obligatoires)

Les variables Supabase ne se mettent **pas** dans GitHub Secrets pour Netlify.
Elles se configurent dans le tableau de bord Netlify.

1. Aller sur [https://app.netlify.com](https://app.netlify.com)
2. Ouvrir le site UPR Congo
3. Aller dans **Site configuration** → **Environment variables**
4. Cliquer sur **Add a variable** / **Add environment variables**
5. Créer exactement :

| Clé | Valeur |
|-----|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://qgsslaearcbkmyoqzhmu.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | votre clé anon / publishable Supabase |

6. Scopes : **All scopes** (ou au minimum Builds + Deploy Previews)
7. Sauvegarder
8. Relancer un déploiement : **Deploys** → **Trigger deploy** → **Deploy site**

Sans ces variables, le build Netlify ne pourra pas brancher le site sur Supabase.

## Mettre à jour le site

1. Modifier le code localement
2. Tester : `npm run dev` puis `npm run build`
3. Pousser sur `main` :

```bash
git add .
git commit -m "update: amelioration du site UPR Congo"
git push origin main
```

4. Netlify rebuild automatiquement et publie le site

## Securite

- Ne jamais committer `.env` ni `.env.local`
- Ne jamais committer de mots de passe
- Ne jamais utiliser la clé `service_role` dans le frontend
- Ne jamais committer `node_modules` ni `out` sur main

# Administration UPR Congo avec Supabase

URL admin : `/admin/login/`

## Étape 1 — Variables locales

Créer `.env.local` (ne jamais le pousser sur GitHub) :

```bash
NEXT_PUBLIC_SUPABASE_URL=coller_url_du_projet_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=coller_anon_key_supabase
```

Voir aussi `.env.local.example`.

## Étape 2 — Base de données

Dans Supabase :

1. Ouvrir **SQL Editor**
2. **New Query**
3. Coller tout le contenu de `supabase/schema.sql`
4. **Run**

## Étape 3 — Créer les comptes

Dans Supabase : **Authentication → Users → Add user**

- ciakudia@gmail.com
- semenceengita@gmail.com
- colettebansompili011@gmail.com

Définir manuellement un mot de passe pour chaque utilisateur.
Ne jamais écrire les mots de passe dans le code.

## Étape 4 — Ajouter les profils admin

Après création des utilisateurs, exécuter `supabase/seed-admin-profiles.sql` dans le SQL Editor.

## Étape 5 — Tester l’admin

Aller sur `/admin/login/` et se connecter avec un compte autorisé.

## Étape 6 — Publier un article

Dashboard → Nouvel article → remplir → publier.

- Édition : `/admin/articles/edit/?id=...`
- Détail public : `/actualites/article/?slug=...`
- Les brouillons ne sont jamais visibles sur le site public
