# État du projet — reprise

Dernière session : 1er octobre 2026. Ce document permet de reprendre le travail sans relire l'historique.

## 1. Où on en est

| Lot | État |
| --- | --- |
| Design system, layout, 28 pages publiques | Terminé, testé (routes 200, zéro débordement mobile) |
| Formulaire devis (`/api/devis`) | Terminé : zod, honeypot silencieux, rate limit, Resend ou console |
| Admin `/admin` (planning, réalisations, tarifs, avis, coordonnées, upload) | Terminé, flux login → sauvegarde → revalidation testé |
| SEO (metadata, JSON-LD, sitemap, robots, OG) | Terminé |
| Build, lint, TypeScript | Propres (`npm run build` OK, 43 pages) |
| **Performance** | **En cours** — voir §3 |
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

| Page | Mobile avant | Mobile après | Desktop |
| --- | --- | --- | --- |
| Accueil | Perf 74 · LCP 4,8 s · TBT 250 ms | Perf 82–85 · LCP ~3,8 s · TBT 140–210 ms | **Perf 100** · LCP 0,7 s |
| Prestation | — | Perf 79 · LCP 3,8 s | — |
| Zone | — | Perf 69–80 (bruit) · LCP 3,3 s | — |
| Contact | — | Perf 81 · LCP 4,3 s | — |

A11y 96–100, Best Practices 100, SEO 100 partout. CLS = 0.

### Ce qui a été corrigé

1. **LCP non comptabilisé** : le hero était animé en `opacity: 0 → 1` (animation compositée). Chrome n'enregistre jamais de peinture pour un élément peint à opacité 0 ; le LCP tombait sur le bandeau cookies (4,8 s). → `fade-up` n'anime plus que `transform`. Le LCP est maintenant bien le `<h1>`.
2. **Police Fraunces 121 Ko → 18 Ko** : la version variable (axes SOFT/WONK/opsz) est remplacée par l'instance statique Regular 400 (tout le display du site est en 400). Les `fontVariationSettings` SOFT/WONK ont été retirés partout.
3. **`Reveal` n'est plus un composant client** : un seul `RevealObserver` (IntersectionObserver + MutationObserver) dans `(site)/layout.tsx` anime tous les `[data-reveal]`, au lieu d'une frontière client par bloc (≈ 45 instances).
4. **Sans JS / reduced-motion** : `@media (scripting: none), (prefers-reduced-motion: reduce)` rend tout visible immédiatement.
5. **Halos `filter: blur(120px)`** remplacés par des dégradés radiaux (`halo-sage`, `halo-copper`, `halo-copper-soft`, `halo-forest` dans `globals.css`).
6. **Logo** : `priority` uniquement dans l'en-tête ; pied de page et admin en lazy.
7. **Images** : `minimumCacheTTL` 31 jours ; `Cache-Control` immutable sur `/images/`.
8. **`text-wrap: pretty`** retiré (coût de layout, gain nul mesuré) ; `balance` conservé sur `h1, h2` seulement.

### Diagnostic en cours (à reprendre)

Trace Lighthouse (`--save-assets`) sur l'accueil :

- Layout initial : **214 ms** à CPU ×4 pour 1 071 objets, puis 45 ms au swap de police. JS total ≈ 150 ms. Le site est léger côté CPU.
- Pourtant **FCP observé = LCP observé = 2 747 ms** alors que `load` observé = 384 ms et DCL = 69 ms. **Quelque chose retarde la première peinture d'environ 2,3 s après le chargement des ressources**, en headless. C'est la piste n°1.

Hypothèses à tester, dans l'ordre (rebuild ≈ 30 s, Lighthouse ≈ 25 s) :

1. **`.grain`** : fond SVG `data:` avec `feTurbulence` + `mix-blend-mode: multiply` sur tout le hero. La rasterisation du filtre et le groupe de fusion peuvent retarder la première peinture. Test : commenter `.grain` dans `globals.css`, rebuild, Lighthouse.
2. **`backdrop-blur-xl`** sur l'en-tête (quand scrollé), la barre d'appel mobile et les badges Avant/Après : à neutraliser pour tester.
3. **Préchargement des polices** : vérifier dans le HTML généré que les deux `<link rel="preload" as="font">` sont bien présents et que `display: swap` ne bloque pas. Si le `<h1>` reste le facteur limitant, essayer `display: "optional"` sur Fraunces (fallback ajusté via `adjustFontFallback`, police servie dès la 2ᵉ page).
4. Vérifier qu'il n'y a pas de différence entre headless et Chrome normal : lancer Lighthouse sans `--headless=new` (ou via DevTools) pour comparer le FCP observé.

Commande de mesure utilisée :

```powershell
$env:CHROME_PATH = "C:\Program Files\Google\Chrome\Application\chrome.exe"
npx lighthouse@12 http://localhost:3300/ --output=json --output-path=lh.json `
  --chrome-flags="--headless=new --no-sandbox" --quiet --only-categories=performance
# ajouter --save-assets pour la trace, --preset=desktop pour le desktop
```

Objectif réaliste : mobile ≥ 90 sur toutes les pages. Les leviers restants sont uniquement côté rendu initial (peinture), pas côté JS ni réseau.

## 4. Incident à connaître

Des remplacements faits en PowerShell (`Get-Content -Raw | Set-Content -Encoding UTF8`) ont **double-encodé l'UTF-8** de 5 fichiers (accents → `Ã©`). Réparé le 1er octobre. Règle : ne pas utiliser `Set-Content` sur les sources ; passer par l'éditeur ou `[IO.File]::WriteAllText($f, $s, [Text.UTF8Encoding]::new($false))`. Vérification rapide : rechercher `Ã` dans `src/` doit renvoyer zéro résultat.

## 5. Reste à faire (hors perf)

- Placeholders client : téléphone, SIRET, n° SAP, hébergeur, médiateur, URLs fiches Google, dates réelles des tournées, communes réelles des photos, validation des tarifs (liste complète dans `README.md`).
- Tracking conversions (gtag `click_tel`, `submit_devis`), capture UTM/gclid dans le formulaire, `llms.txt`, vérification Search Console : voir `docs/ACQUISITION.md`.
- Hébergement : runtime Node + disque persistant (contenu en JSON + uploads). Pour Vercel, remplacer `src/lib/content.ts` (lecture/écriture) et l'upload par un stockage externe.
- Photos HD à demander au client.
