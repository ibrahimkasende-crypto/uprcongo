# Assets images UPR Congo

Pipeline généré par `npm run images:setup`.

## Structure

| Dossier | Contenu |
|---------|---------|
| `logo/` | Logo officiel et variantes (transparent, blanc, horizontal, favicon) |
| `president/` | Photo du Président national (portrait, carré, wide, dark overlay) |
| `backgrounds/` | Fonds hero Kinshasa/Limete (client) et variantes |
| `kinshasa/` | Images Kinshasa (Limete client + Unsplash) |
| `values/` | Images thématiques Dieu, Patrie, Justice |
| `adhesion/` | Visuels page adhésion |
| `documents/` | Couvertures documents institutionnels |
| `leadership/` | Silhouettes placeholder (CN, SG, RP) |
| `activities/` | Placeholders activités officielles |
| `actualites/` | Images fallback actualités par catégorie |
| `_backup/` | Sauvegarde avant régénération |
| `_review/` | Images nécessitant vérification licence |

## Sources client

- Logo: `assets/logo/UPR Logo_site.png`
- Président: `assets/images/President_UPR.png`
- Background hero: `assets/images/background.png` (Kinshasa/Limete)

## Régénération

```bash
npm run images:setup
```

Version cache: voir `ASSETS_VERSION` dans `lib/assets.ts`.
