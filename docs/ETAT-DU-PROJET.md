# État du projet — reprise

Dernière session : 1er octobre 2026 (reprise, après-midi). Ce document permet de reprendre le travail sans relire l'historique.

## 1. Où on en est

| Lot | État |
| --- | --- |
| Design system, layout, 28 pages publiques | Terminé, testé (routes 200, zéro débordement mobile) |
| Formulaire devis (`/api/devis`) | Terminé : zod, honeypot silencieux, rate limit, Resend ou console |
| Admin `/admin` (planning, réalisations, tarifs, avis, coordonnées, upload) | Terminé, flux login → sauvegarde → revalidation testé |
| SEO (metadata, JSON-LD, sitemap, robots, OG) | Terminé |
| Build, lint, TypeScript | Propres (`npm run build` OK, 43 pages) |
| **Performance** | **Objectif local atteint** (mobile 93–96 sur 4 pages testées) — voir §3 ; reste à confirmer sur PageSpeed Insights une fois le site hébergé |
| Acquisition (SEO/GEO/Ads/tunnel) | Plan rédigé dans `docs/ACQUISITION.md`, rien d'implémenté côté tracking |

## 2. Lancer le projet

```bash
npm install
# .env.local existe déjà en local (ADMIN_PASSWORD=rnd-demo-2026) — non versionné
npm run dev          # http://localhost:3000
npm run build && npm start
```

Admin : `/admin/login`. Contenu éditable dans `content/*.json`. Détails dans `README.md`.

## 3. Chantier performance — où on en est

### Mesures (Lighthouse 12, build de production, `next start`)

| Page | Mobile, 1ʳᵉ session (CLI headless, biaisé — voir ci-dessous) | Mobile, mesure fiable avant `content-visibility` | Mobile, mesure fiable après | Desktop |
| --- | --- | --- | --- | --- |
| Accueil | Perf 74 → 82–85 | Perf 81–94 (bruit TBT) · LCP 3,0 s · SI 1,8–2,4 s · TBT 130–535 ms | **Perf 93–95** · LCP 2,8–3,2 s · SI 1,1–1,8 s · TBT 54–75 ms | **Perf 100** |
| Prestation | Perf 79 | — | **Perf 85–95** · LCP 2,9–3,6 s · TBT 74–248 ms | — |
| Zone | Perf 69–80 | — | **Perf 95–96** · LCP 2,7–2,8 s · TBT 91–113 ms | — |
| Contact | Perf 81 | — | **Perf 93–96** · LCP 2,6–3,1 s · TBT 109–125 ms | — |

A11y 96–100, Best Practices 100, SEO 100 partout. CLS = 0. Chaque cellule « après » = 2 ou 3 passages, le bruit entre passages reste de ±5 points (surtout le TBT).

### Session du 1er octobre (reprise) : le diagnostic était faux, voici le bon

**L'écart de 2,3 s entre `load` et la première peinture n'existe pas.** C'était un artefact de `lighthouse` CLI lancé via `chrome-launcher` en `--headless=new` sur cette machine : une page HTML triviale ne le montre pas, mais le site oui, et seulement dans cette configuration. Vérifications faites :

- Chrome normal (onglet) : FCP 824 ms à froid, 176 ms à chaud, pour un `load` à 446 / 143 ms.
- Lighthouse CLI **sans** `--headless=new` : FCP observé 1 099 ms pour `load` 780 ms.
- Lighthouse 12 lancé **par l'API Node avec une page puppeteer** (même Chrome, même émulation mobile) : FCP observé 300–800 ms. Le LCP simulé passe de 4,2 s à 3,0 s avec le même build.

Conséquence : le LCP simulé (Lantern) utilise le LCP *observé* comme borne pour décider quelles requêtes « précèdent » le LCP. Un FCP observé artificiellement tardif faisait rentrer tout le JS et les images dans le graphe du LCP, d'où les 4,2 s. Les hypothèses 1 à 3 de la session précédente (`.grain`, `backdrop-blur`, polices) visaient donc un fantôme : testées proprement, elles ne changent rien au layout (différence < 15 ms, dans le bruit).

**Ce qui coûtait vraiment** (trace non throttlée, émulation mobile) : le layout initial de la page d'accueil durait **≈ 210 ms réels** pour 1 071 objets, soit ≈ 850 ms sur un mobile lent (×4), avant la première peinture. Bissection par injection CSS dans la feuille de style (3 passages par variante, médiane) :

| Variante | Layout initial (médiane) |
| --- | --- |
| Contrôle | 210 ms |
| Polices web → Arial | 117 ms (coût DirectWrite/shaping, en partie spécifique à Windows) |
| Hero seul, reste masqué (179 objets) | 93 ms |
| `.grain` masqué · SVG masqués · images masquées · `text-wrap` retiré · `letter-spacing` retiré | 185–211 ms (aucun effet) |

**Correctif appliqué** (`globals.css`, `@layer base`) :

```css
main > :nth-child(n + 2) {
  content-visibility: auto;
  contain-intrinsic-size: auto 640px;
}
```

Toutes les pages ont la même structure plate `main > hero + sections` ; le premier bloc (hero) reste rendu immédiatement, les suivants ne sont mis en page qu'à l'approche du viewport. Effet mesuré : layout initial 210 → ≈ 90 ms, TBT divisé par 3 à 8, Speed Index divisé par ~2, FCP observé plus tôt. Vérifié : pas de rognage visible (le confinement de peinture clippe les débordements, les sections ont assez de padding), les 33 `.reveal` de l'accueil s'animent bien au défilement, aucun `position: fixed/sticky` à l'intérieur des sections (le confinement en ferait le bloc conteneur — à garder en tête si on en ajoute un).

**Ce qui reste et pourquoi on s'arrête là :** le LCP simulé plafonne à 2,7–3,2 s. Test par blocage de ressources : sans aucun JS, LCP 2,26 s (perf 98) ; sans images ou sans polices, aucun changement. C'est donc le poids du JS dans le modèle réseau slow-4G de Lighthouse : socle React + routeur Next ≈ 103 Ko gz (incompressible côté app), JS propre aux pages ≈ 15 Ko (Header, cookies, planning, calculateur, `next/image`). Il n'y a plus de levier significatif sans changer de framework. À confirmer sur PageSpeed Insights quand le site sera hébergé (HTTP/2 + TLS + vrai TTFB changent la simulation).

### Comment mesurer sans se faire piéger

Ne pas utiliser `npx lighthouse --chrome-flags="--headless=new"` sur cette machine (biais de ~2 s sur la première peinture). Deux options :

1. CLI avec fenêtre visible : `npx lighthouse@12 http://localhost:3300/ --output=json --output-path=lh.json --chrome-flags="--no-sandbox" --quiet --only-categories=performance` (`$env:CHROME_PATH` pointant sur Chrome). TBT bruité par la fenêtre.
2. API Node avec puppeteer (méthode utilisée pour les chiffres ci-dessus) : `lighthouse(url, { onlyCategories: ['performance'] }, undefined, page)` avec une page issue de `puppeteer.launch({ headless: true, executablePath })`. Les modules sont dans le cache npx (`%LOCALAPPDATA%\npm-cache\_npx\<hash>\node_modules\{lighthouse,puppeteer-core}`). Faire 2–3 passages, le TBT varie de ±200 ms d'un passage à l'autre.

Dans les deux cas : `npm run build`, puis **tuer tout `next start` existant avant d'en relancer un** (`Get-NetTCPConnection -LocalPort 3300` → `Stop-Process`). Un ancien serveur qui survit au rebuild sert un HTML pointant vers des chunks disparus (CSS en 500) et fausse tout en silence — c'est arrivé pendant cette session.

### Ce qui a été corrigé

1. **LCP non comptabilisé** : le hero était animé en `opacity: 0 → 1` (animation compositée). Chrome n'enregistre jamais de peinture pour un élément peint à opacité 0 ; le LCP tombait sur le bandeau cookies (4,8 s). → `fade-up` n'anime plus que `transform`. Le LCP est maintenant bien le `<h1>`.
2. **Police Fraunces 121 Ko → 18 Ko** : la version variable (axes SOFT/WONK/opsz) est remplacée par l'instance statique Regular 400 (tout le display du site est en 400). Les `fontVariationSettings` SOFT/WONK ont été retirés partout.
3. **`Reveal` n'est plus un composant client** : un seul `RevealObserver` (IntersectionObserver + MutationObserver) dans `(site)/layout.tsx` anime tous les `[data-reveal]`, au lieu d'une frontière client par bloc (≈ 45 instances).
4. **Sans JS / reduced-motion** : `@media (scripting: none), (prefers-reduced-motion: reduce)` rend tout visible immédiatement.
5. **Halos `filter: blur(120px)`** remplacés par des dégradés radiaux (`halo-sage`, `halo-copper`, `halo-copper-soft`, `halo-forest` dans `globals.css`).
6. **Logo** : `priority` uniquement dans l'en-tête ; pied de page et admin en lazy.
7. **Images** : `minimumCacheTTL` 31 jours ; `Cache-Control` immutable sur `/images/`.
8. **`text-wrap: pretty`** retiré (coût de layout, gain nul mesuré) ; `balance` conservé sur `h1, h2` seulement.

## 4. Incident à connaître

Des remplacements faits en PowerShell (`Get-Content -Raw | Set-Content -Encoding UTF8`) ont **double-encodé l'UTF-8** de 5 fichiers (accents → `Ã©`). Réparé le 1er octobre. Règle : ne pas utiliser `Set-Content` sur les sources ; passer par l'éditeur ou `[IO.File]::WriteAllText($f, $s, [Text.UTF8Encoding]::new($false))`. Vérification rapide : rechercher `Ã` dans `src/` doit renvoyer zéro résultat.

## 5. Reste à faire (hors perf)

- Placeholders client : téléphone, SIRET, n° SAP, hébergeur, médiateur, URLs fiches Google, dates réelles des tournées, communes réelles des photos, validation des tarifs (liste complète dans `README.md`).
- Tracking conversions (gtag `click_tel`, `submit_devis`), capture UTM/gclid dans le formulaire, `llms.txt`, vérification Search Console : voir `docs/ACQUISITION.md`.
- Hébergement : runtime Node + disque persistant (contenu en JSON + uploads). Pour Vercel, remplacer `src/lib/content.ts` (lecture/écriture) et l'upload par un stockage externe.
- Photos HD à demander au client.
