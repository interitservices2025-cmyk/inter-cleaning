
# Refonte Inter-Cleaning Services — site premium GTA

Objectif: cloner la structure du site actuel (https://inter-cleaningservices.com) mais le repositionner en site **premium, vibrant et moderne** qui matche la nouvelle identité de marque (magenta/orange/yellow + logo dynamique) — très loin du template WordPress actuel.

Langue du site: **anglais** (marché GTA, comme l'original et le brand book).

## Charte appliquée (verrouillée)

- Couleurs: Magenta `#DC0D73`, Orange `#FDAE00`, Yellow `#FEB400`, fonds blanc cassé + charcoal `#1A1A1A`
- Typo: **Montserrat** (titres, geometric sans), **Open Sans** (corps)
- Logo: `logo_dynamic_original_colors.png` (header, footer, hero, favicon)
- Ton: "Excellence in Every Sweep" — fiabilité, efficacité, excellence

## Architecture des routes

Site multi-pages (pas de scroll unique), chaque page avec son propre SEO:

- `/` — Home (hero, services preview, why us, process, testimonials, CTA quote)
- `/services` — index des 6 services avec cards
- `/services/residential` — détail Residential Cleaning
- `/services/office` — Office & Small Business
- `/services/deep-cleaning` — Deep Cleaning
- `/services/move-in-out` — Move-In / Move-Out
- `/services/carpet-upholstery` — Carpet & Upholstery
- `/services/window-glass` — Window & Glass (Interior)
- `/about` — histoire, valeurs (Reliability / Efficiency / Excellence), équipe
- `/contact` — formulaire + infos (Brampton, +1 416-871-9045, socials)
- `/quote` — formulaire devis multi-étapes

Nav header sticky avec logo + menu + bouton "Get a Free Quote" en gradient magenta→orange.

## Contenu clé

**Services affichés** (exactement ceux du .docx, les "ne pas afficher" sont exclus):
1. Residential Cleaning
2. Office & Small Business Cleaning
3. Deep Cleaning
4. Move-In / Move-Out Cleaning
5. Carpet & Upholstery Cleaning
6. Window & Glass Cleaning (Interior)

**Infos société** reprises du site actuel: tél +1 (416) 871-9045, Brampton ON L6W 3L3, Facebook / Instagram / LinkedIn.

## Design — direction "wahou"

Avant d'implémenter, je génère **3 directions visuelles rendues** (HTML+Tailwind) verrouillées sur palette magenta/orange/yellow + Montserrat/Open Sans, qui varient sur composition, densité et énergie:
- une **éditoriale magazine** (grand hero typographique, grille asymétrique, beaucoup de blanc)
- une **bold/sportive** (gradient plein écran, formes diagonales, gros chiffres, énergie maximale)
- une **premium minimaliste** (sobre, photos pleine largeur, accents couleur ponctuels, feel haut de gamme résidentiel)

Tu choisis → je build la direction retenue exactement (composition, tokens, typo).

## Détails techniques

- TanStack Start (déjà en place), routes file-based dans `src/routes/`
- Tokens CSS dans `src/styles.css` (oklch) — magenta/orange/yellow + gradients + shadows premium
- Montserrat + Open Sans via Google Fonts dans `__root.tsx`
- Logo copié dans `src/assets/logo.png` + favicon
- Images services: générées via imagegen (photos cleaning premium, scènes GTA), stockées dans `src/assets/`
- Animations: Motion for React (fade/slide subtils au scroll, hover sur cards)
- Formulaire devis: state local pour l'instant (pas de backend) — affiche un toast de confirmation. On branchera Lovable Cloud + email plus tard si tu veux recevoir les leads réellement.
- SEO: `head()` par route avec title/description/og uniques, JSON-LD `LocalBusiness` sur `/`
- Responsive mobile-first, accessibilité AA

## Hors scope (à demander explicitement si besoin)

- Backend devis (envoi email / stockage) → nécessite Lovable Cloud
- Multilingue FR/EN
- Blog / système de réservation en ligne avec créneaux
- Paiement en ligne

Une fois le plan approuvé, je commence par générer les 3 directions design pour que tu choisisses avant le build complet.
