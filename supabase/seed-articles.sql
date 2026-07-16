-- Seed des articles existants du site UPR Congo
-- Idempotent : n'insère pas si le slug existe déjà
-- À exécuter dans Supabase → SQL Editor → Run

insert into public.articles (
  title, slug, category, excerpt, content, image_url, image_alt, featured, status, author_email, published_at
)
select
  'Déclaration de l''UPR sur la résurrection du Congo',
  'declaration-projet-societe-upr',
  'Déclaration',
  'Le parti réaffirme les grandes lignes de son projet de société consacré à la renaissance politique, sociale, économique et culturelle du Congo.',
  '## Une vision de reconstruction nationale

L''UPR considère que la résurrection du Congo passe par la restauration de l''État, la responsabilisation des dirigeants et la mobilisation des citoyens.

Le projet défendu par le parti accorde une place centrale à la justice, au travail, à l''éducation, à la santé, à la bonne gouvernance et à la souveraineté nationale.

## Une action politique structurée

L''UPR entend contribuer au débat national par des propositions sérieuses, compréhensibles et orientées vers l''intérêt général.

- Renforcer les institutions.
- Réhabiliter la valeur du travail.
- Assurer une gouvernance transparente.
- Défendre l''unité et la dignité du peuple congolais.',
  '/uploads/actualite-declaration.svg',
  'Déclaration officielle de l''UPR',
  false,
  'published',
  'UPR - Union des Patriotes pour la République',
  '2026-06-14T09:30:00.000Z'
where not exists (
  select 1 from public.articles where slug = 'declaration-projet-societe-upr'
);

insert into public.articles (
  title, slug, category, excerpt, content, image_url, image_alt, featured, status, author_email, published_at
)
select
  'Déclaration politique du Président national',
  'declaration-politique-president',
  'Déclaration',
  'Dans une déclaration politique, le Président national de l''UPR appelle à la vigilance patriotique, à la protection de la souveraineté nationale et à la défense prioritaire des intérêts des Congolais.',
  'Dans une déclaration politique, le Président national de l''UPR, Prof. Rev. Julien C. K. Ciakudia Sr., appelle à une vigilance accrue sur les questions de souveraineté nationale, de sécurité diplomatique et de défense des intérêts fondamentaux du peuple congolais.

Selon le Président national de l''UPR, certaines personnalités influentes autour des institutions congolaises devraient faire l''objet d''une attention particulière lorsque leurs orientations ou leurs relations supposées peuvent avoir un impact sur la souveraineté nationale.

Dans ce cadre, Prof. Rev. Julien C. K. Ciakudia Sr. évoque le cas de l''ambassadeur Jhon Nyakeru Kalunga, dont il conteste la proximité politique et diplomatique supposée avec certains intérêts étrangers. Il appelle les autorités compétentes à clarifier publiquement les responsabilités, les influences et les choix qui auraient accompagné le processus d''intégration de la République Démocratique du Congo à la Communauté d''Afrique de l''Est.

Le Président national de l''UPR affirme également que la vie politique congolaise doit être guidée par la transparence, l''intérêt général et la protection des citoyens. Il invite les responsables publics à placer la souveraineté nationale au-dessus des calculs personnels, familiaux ou partisans.

Dans le même esprit, Prof. Rev. Julien C. K. Ciakudia Sr. adresse un message au Président de la République, l''appelant à accorder une attention prioritaire à la situation des Congolais vivant à l''étranger, notamment ceux établis en Afrique du Sud. Selon lui, la protection de la vie, de la dignité et des droits des Congolais doit toujours passer avant toute distraction médiatique ou sportive.

Pour l''UPR, la patrie se sert avec responsabilité. Le parti rappelle que l''État doit défendre ses citoyens partout où ils vivent, préserver la souveraineté du Congo et renforcer la confiance entre les institutions et le peuple.

L''UPR réaffirme son attachement à la devise Dieu - Patrie - Justice, ainsi qu''à son mot d''ordre : Servir sans se servir.',
  '/images/president/photo-president-declaration.webp',
  'Déclaration politique du Président national de l''UPR',
  false,
  'published',
  'UPR - Union des Patriotes pour la République',
  '2026-06-10T09:00:00.000Z'
where not exists (
  select 1 from public.articles where slug = 'declaration-politique-president'
);

insert into public.articles (
  title, slug, category, excerpt, content, image_url, image_alt, featured, status, author_email, published_at
)
select
  'Communiqué officiel de l''UPR',
  'communique-officiel-upr',
  'Communiqué',
  'L''UPR publie un communiqué officiel rappelant son attachement à la souveraineté nationale, à l''État de droit et à la mobilisation patriotique.',
  'L''Union des Patriotes pour la République réaffirme son attachement à la souveraineté nationale, à l''État de droit, à la justice sociale et à la défense des intérêts fondamentaux du peuple congolais.

À travers ce communiqué, l''UPR rappelle que la construction d''un Congo fort passe par la responsabilité des dirigeants, la participation citoyenne et le respect des institutions républicaines.

Le parti invite les Congolaises et Congolais à demeurer vigilants, mobilisés et engagés pour préserver l''unité nationale, protéger les ressources du pays et promouvoir une gouvernance fondée sur la vérité, la justice et le service.

L''UPR appelle également ses membres, sympathisants et patriotes à poursuivre le travail de sensibilisation dans le calme, la discipline et le respect des lois de la République.

Fidèle à sa devise Dieu - Patrie - Justice, l''UPR demeure engagée à servir le Congo sans se servir.',
  '/images/actualites/communique-officiel.webp',
  'Communiqué officiel de l''UPR sur la souveraineté nationale et l''État de droit',
  false,
  'published',
  'UPR - Union des Patriotes pour la République',
  '2026-06-01T07:00:00.000Z'
where not exists (
  select 1 from public.articles where slug = 'communique-officiel-upr'
);

insert into public.articles (
  title, slug, category, excerpt, content, image_url, image_alt, featured, status, author_email, published_at
)
select
  'Semences Engita',
  'coordination-nationale-upr',
  'Vie du parti',
  'La coordination nationale accompagne l''organisation, la mobilisation et le suivi des activités du parti dans un esprit de discipline, de responsabilité et de service.',
  '## Coordination nationale de l''UPR

Semences Engita assure la fonction de Coordinateur national de l''Union des Patriotes pour la République.

La coordination nationale accompagne l''organisation, la mobilisation et le suivi des activités du parti dans un esprit de discipline, de responsabilité et de service.

Elle veille à la cohérence des actions sur le terrain, au respect des orientations du parti et à la mobilisation des cadres dans l''intérêt du peuple congolais.',
  '/images/coordination/photo-coordon.webp',
  'Semences Engita, Coordinateur national de l''UPR',
  false,
  'published',
  'UPR - Union des Patriotes pour la République',
  '2026-05-15T08:00:00.000Z'
where not exists (
  select 1 from public.articles where slug = 'coordination-nationale-upr'
);

insert into public.articles (
  title, slug, category, excerpt, content, image_url, image_alt, featured, status, author_email, published_at
)
select
  'Mobilisation patriotique autour du mot d''ordre "Servir sans se servir"',
  'mobilisation-patriotique-service-congo',
  'Mobilisation',
  'L''UPR rappelle son appel à l''engagement citoyen et républicain pour remettre le service du Congo au centre de l''action publique.',
  'L''Union des Patriotes pour la République a organisé une rencontre de mobilisation patriotique autour de son mot d''ordre : Servir sans se servir.

Cette activité s''inscrit dans la volonté du parti de sensibiliser les citoyens à l''importance de l''engagement public, de la responsabilité individuelle et du service désintéressé de la nation.

Pour l''UPR, la politique doit redevenir un espace de service, de discipline, de vérité et de responsabilité envers le peuple congolais.

Les participants ont été invités à placer l''intérêt général au-dessus des intérêts personnels, à rejeter les antivaleurs et à participer activement à la reconstruction morale, sociale et politique du Congo.

L''UPR réaffirme que chaque citoyen a un rôle à jouer dans la défense de la patrie, la promotion de la justice et la consolidation d''un État réellement au service du peuple.',
  '/images/actualites/mobilisation-patriotique.webp',
  'Mobilisation patriotique de l''UPR autour du mot d''ordre Servir sans se servir',
  true,
  'published',
  'UPR - Union des Patriotes pour la République',
  '2026-04-18T08:00:00.000Z'
where not exists (
  select 1 from public.articles where slug = 'mobilisation-patriotique-service-congo'
);
