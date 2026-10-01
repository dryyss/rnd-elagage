# RND Élagage — site vitrine

Site vitrine de **RND Élagage** (Bryan Renard, élagueur-paysagiste à Taverny, 95), réalisé par Magar Développement dans le cadre du devis DEV-2026-003 / contrat CTR-2026-003.

Stack : **Next.js 16** (App Router, Turbopack), React 19, TypeScript, **Tailwind CSS v4**, `sharp`, `zod`, Resend (e-mail).

Documentation de travail :

- `docs/ETAT-DU-PROJET.md` — état d'avancement, chantier performance en cours, points de reprise.
- `docs/ACQUISITION.md` — plan SEO / local / GEO / Google Ads / tunnel de vente.

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis renseigner ADMIN_PASSWORD au minimum
npm run dev                  # http://localhost:3000
```

Production :

```bash
npm run build
npm start
```

## Variables d'environnement

| Variable | Rôle | Obligatoire |
| --- | --- | --- |
| `ADMIN_PASSWORD` | Mot de passe de l'espace `/admin`. Sans lui, l'admin est désactivé. | Oui (pour l'admin) |
| `ADMIN_SECRET` | Secret de signature du cookie de session. Générer une chaîne longue et aléatoire. | Fortement conseillé |
| `RESEND_API_KEY` | Clé [Resend](https://resend.com) pour l'envoi des demandes de devis. Sans clé, les demandes sont écrites dans la console serveur. | Pour la prod |
| `DEVIS_TO_EMAIL` | Destinataire des demandes (défaut : e-mail de `content/site.json`). | Non |
| `DEVIS_FROM_EMAIL` | Expéditeur, sur un domaine vérifié chez Resend. | Pour la prod |
| `NEXT_PUBLIC_GTAG_ID` | ID Google Ads / GA4. Chargé uniquement après consentement cookies. | Non |

## Structure

```
content/            Contenu éditable (JSON) : site, planning, tarifs, realisations, temoignages
public/images/      Photos du client, converties en JPEG optimisé
public/uploads/     Photos envoyées depuis l'admin (non versionnées)
src/app/(site)/     Pages publiques
src/app/(admin)/    Espace d'administration (protégé)
src/app/(admin-login)/  Page de connexion admin
src/app/api/        /api/devis (formulaire), /api/admin/upload (photos)
src/components/     layout/, sections/, ui/, forms/, seo/
src/data/           Prestations (6) et communes (12) : contenu éditorial riche, en TypeScript
src/lib/            Contenu, planning, auth admin, schémas zod, SEO, utilitaires
```

### Pages

- `/` accueil
- `/prestations/[slug]` × 6 : taille-de-haies (principale), entretien-de-jardin-debroussaillage, abattage-dessouchage, engazonnement-creation, terrassement-maconnerie-paysagere, evacuation-dechets-verts
- `/credit-impot`, `/tarifs`, `/realisations` (filtre `?prestation=`), `/a-propos`
- `/zones` + `/zones/[slug]` × 12 pages locales (7 Val-d'Oise, 5 Nièvre)
- `/contact` (préremplissage `?cp=&prestation=`)
- `/mentions-legales`, `/politique-de-confidentialite`
- `/sitemap.xml`, `/robots.txt`, `/opengraph-image`
- `/admin` : tableau de bord, planning, réalisations, tarifs, avis, coordonnées

## Espace d'administration

Accès : `/admin/login` avec `ADMIN_PASSWORD`. Session signée (HMAC) en cookie `httpOnly`, 7 jours.

Chaque écran charge un fichier de `content/`, le modifie côté client, puis l'enregistre via une Server Action qui :

1. valide le JSON avec le schéma zod correspondant (`src/lib/content-schemas.ts`) ;
2. écrit le fichier de façon atomique ;
3. appelle `revalidatePath("/", "layout")` : le site public est à jour immédiatement.

L'upload de photos (`/api/admin/upload`) redimensionne en 1600 px max et convertit en JPEG via `sharp`, dans `public/uploads/`.

### Planning des tournées

`content/planning.json` décrit les deux zones (départements couverts) et la liste des tournées `{ zone, debut, fin }`. Le site en déduit automatiquement la tournée en cours, la prochaine, et oriente les visiteurs selon le code postal saisi (`src/lib/planning.ts`). L'accueil et les pages zones sont revalidés toutes les heures pour que « en cours / prochaine » reste exact sans intervention.

## Hébergement

Deux modes de stockage du contenu modifiable (JSON + photos), choisis automatiquement par `src/lib/content.ts` et `src/app/api/admin/upload/route.ts` :

- **Disque** (`content/*.json`, `public/uploads/`) quand `BLOB_READ_WRITE_TOKEN` est absent : dev local, VPS, Railway, Render, Docker… Il faut un système de fichiers persistant et un runtime Node.
- **Vercel Blob** quand `BLOB_READ_WRITE_TOKEN` est défini : c'est le mode utilisé sur Vercel, où le disque est en lecture seule. Chaque sauvegarde écrit une nouvelle version `content/<clé>/<horodatage>.json` (les 5 dernières sont conservées) ; les photos vont dans `uploads/`. Les JSON du dépôt servent de contenu initial tant qu'une clé n'a jamais été modifiée.

### Déploiement Vercel (démo actuelle)

- Projet : `rnd-elagage` (compte `dryyss`), production sur **https://rnd-elagage.vercel.app**. Store Blob `rnd-elagage-content` (public, région `cdg1`), fonctions en `cdg1` (`vercel.json`).
- Variables : `ADMIN_PASSWORD`, `ADMIN_SECRET` (sensible), `BLOB_READ_WRITE_TOKEN` (injecté par le store). `RESEND_API_KEY` n'est pas défini : les demandes de devis sont seulement journalisées dans les logs Vercel.
- Le projet n'est **pas connecté à GitHub** : un `git push` ne déploie rien. Pour publier : `npx vercel@latest deploy --prod` depuis le dossier (CLI récente ; la 33 installée globalement ne connaît pas `blob`).
- Pour l'admin en local, ne pas laisser `BLOB_READ_WRITE_TOKEN` dans `.env.local` (`vercel link`/`env pull` l'y ajoutent) : sinon l'admin local écrit dans le store de production.

## Avant la mise en ligne — à compléter avec le client

- **Téléphone** réel (actuellement `06 00 00 00 00`) → admin › Coordonnées.
- **SIRET**, date d'immatriculation, numéro de déclaration **services à la personne** (SAP) → admin › Coordonnées + mentions légales.
- **Hébergeur** et **médiateur de la consommation** → `src/app/(site)/mentions-legales/page.tsx`.
- URLs des **fiches Google Business** (Val-d'Oise et Nièvre) → admin › Coordonnées. Tant qu'elles sont vides, la section Avis affiche un état d'attente honnête.
- **Dates réelles des tournées** → admin › Planning. Les dates actuelles sont un exemple.
- **Communes réelles des photos** : les communes attribuées aux 9 réalisations sont illustratives, à corriger dans admin › Réalisations.
- **Tarifs** : la grille actuelle (6/9/14 €/ml, évacuation 2 €/ml, minimum 150 €) est une proposition à valider.
- **Photos HD** : les photos reçues font ~750 × 350 px au mieux. Le design a été pensé pour ne pas dépendre de grandes photos plein écran, mais des photos de 1600 px et plus amélioreraient nettement les cartes et la galerie. Idéalement des avant/après pris du même point de vue.
- Domaine : `content/site.json › urlSite` (utilisé pour le sitemap, les canoniques et les données structurées).

## Scripts

- `npm run dev` / `npm run build` / `npm start`
- `npm run lint`

Pour ajouter des photos en dehors de l'admin : les déposer dans `public/images/` en JPEG (1600 px de large max, qualité ~82), puis les référencer dans `content/realisations.json` ou `src/data/prestations.ts`.
