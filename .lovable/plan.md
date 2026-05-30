## Objectif
Mini back-office complet + 4 améliorations homepage, sur Lovable Cloud (Supabase managé).

## 1. Backend (Lovable Cloud)
- Activation Cloud (Supabase + Auth).
- Tables : `blog_posts`, `pages`, `services`, `user_roles` (enum `admin`).
- RLS : lecture publique sur `published=true`, écriture réservée aux admins via `has_role()`.
- Storage bucket public `cms-media` pour images (cover blog, hero pages).
- Premier admin promu via SQL (je te demanderai ton email après signup).

## 2. Admin `/admin` (protégé)
- `/admin/login` — email + password.
- Layout admin avec sidebar : Blogs · Pages · Services · Déconnexion.
- **Blogs** : liste, créer, éditer (titre, slug, extrait, contenu markdown, image cover, statut publié), supprimer.
- **Pages** : éditer Home/Company/Career/Contact (blocs textes + images clés) + créer pages custom (slug, titre, contenu, SEO).
- **Services** : CRUD sur les 6 services (migration depuis `site.ts` vers DB).
- Éditeur de contenu : textarea markdown + upload image dans Storage.

## 3. Blog public
- `/blog` — grille des articles publiés (image, titre, date, extrait).
- `/blog/$slug` — article complet, rendu markdown, image cover, SEO meta.
- Lien "Blog" ajouté au menu Header + Footer.

## 4. Homepage — 4 changements
- **3 derniers blogs** : nouvelle section "Latest from the blog" qui pull les 3 derniers `published=true` (auto-update à chaque nouvel article).
- **Before/After** : remplace l'image unique par un carrousel de 4 paires générées (salon, cuisine, salle de bain, bureau) avec boutons précédent/suivant + indicateurs.
- **Trusted by** : section logos clients avec 6 entreprises fictives (TechCorp, Maple Realty, Northwind Clinics, Lakeside Hotels, Cedar Offices, Atlas Logistics) — logos texte stylisés.
- **Reviews Google** : remplace les 5 étoiles par 3 cartes avis Google statiques (avatar, nom, note 5★, texte, date, logo "Google" en coin).

## 5. Pages dynamiques
Company/Career/Contact lisent leur contenu depuis la table `pages` (fallback texte par défaut si vide) → éditables depuis l'admin sans redéploiement.

## Détails techniques
- Server functions TanStack (`createServerFn`) pour toutes lectures/écritures admin avec `requireSupabaseAuth`.
- Lectures publiques (blog list, home) via fonctions admin élevées scopées (`published=true`).
- Upload images : signed upload côté admin, URL publique stockée en DB.
- Markdown rendu via `react-markdown` (à installer).
- ~4 images IA pour before/after (8 visuels = 4 paires). Logos clients = composants SVG/texte (pas d'IA).

## Hors scope V1 (à confirmer si tu veux les ajouter)
- Catégories/tags blog
- Commentaires
- Recherche
- Multi-langue
- Rich text WYSIWYG (on reste sur markdown pour la V1)

Confirme et je lance tout d'un coup.