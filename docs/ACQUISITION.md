# Acquisition — SEO, local, GEO, Google Ads, tunnel de vente

Plan d'acquisition pour RND Élagage. Ce qui est déjà couvert par le site est indiqué ; le reste est à faire au lancement ou à implémenter.

## 1. SEO classique

**Déjà en place** : metadata + canoniques par page, JSON-LD (LandscapingBusiness, Service, FAQPage, BreadcrumbList, City), `sitemap.xml`, `robots.txt`, image OpenGraph, 6 pages prestations + 12 pages locales, contenu long et factuel, Core Web Vitals (pages statiques, images optimisées, CLS 0).

**Au lancement**

- [ ] Domaine `rnd-elagage.fr` en HTTPS ; vérifier `content/site.json › urlSite`.
- [ ] Google Search Console : propriété, soumission du sitemap, contrôle de l'indexation des 28 pages.
- [ ] Bing Webmaster Tools (5 min ; c'est l'index utilisé par ChatGPT pour la recherche web).
- [ ] NAP identique partout (nom, adresse, téléphone) : site, fiches Google, Pages Jaunes, annuaires.
- [ ] Backlinks locaux : annuaire des artisans de la mairie de Taverny, CMA, Pages Jaunes, Houzz, Travaux.com, annuaires services à la personne, Nevers Agglomération.

**En continu**

- Une réalisation ajoutée après chaque chantier marquant (admin › Réalisations) : contenu local frais, photo, commune.
- Nouvelle page locale (`src/data/communes.ts`) quand une commune génère des demandes régulières.

## 2. Référencement local (levier n°1 pour ce métier)

- [ ] **Fiche Google Business Profile Taverny** : adresse réelle, zone de desserte Val-d'Oise. Catégorie principale « Paysagiste » (ou « Service d'élagage »), secondaires : entretien de jardin, taille de haies.
- [ ] **Fiche « entreprise de zone » Nevers** : sans adresse affichée, zone de desserte agglomération.
- [ ] Photos avant/après chaque mois ; post Google à chaque début de tournée (« Dans le Val-d'Oise jusqu'au … »).
- [ ] Questions/réponses préremplies : crédit d'impôt, déchets, devis, délais.
- [ ] URLs des fiches dans admin › Coordonnées (le site les affiche et les référence dans le schema).
- [ ] **Avis** : SMS de demande d'avis avec lien direct en fin de chantier (J+2). Recopie dans admin › Avis.

## 3. GEO (ChatGPT, Perplexity, AI Overviews)

Les moteurs génératifs citent les sources claires, factuelles et structurées. Le site l'est déjà : FAQ en question → réponse, chiffres concrets (tarifs, 50 %, plafond 5 000 €), entité cohérente.

- [ ] Ajouter `public/llms.txt` : résumé de l'entreprise, prestations, zones, tarifs indicatifs, contact (≈ 15 lignes).
- [ ] Garder les FAQ avec la réponse courte en première phrase.
- [ ] Présence sur les sources recoupées par les IA : fiches Google, Pages Jaunes, 1–2 articles de presse locale (Taverny / Nevers).

## 4. Google Ads

**Structure** : 2 campagnes Search, une par zone, ciblage géographique strict (95 / agglo de Nevers), activées pendant la tournée correspondante et 2–3 semaines avant pour remplir le planning.

- Groupes d'annonces : taille de haie · élagage/abattage · entretien de jardin · débroussaillage.
- Mots-clés en expression/exact : `taille de haie taverny`, `élagueur val d'oise`, `paysagiste nevers`, `entretien jardin 95`, etc.
- Négatifs : emploi, formation, gratuit, matériel, location, cours, salaire.
- Accroche : **« Crédit d'impôt 50 % · Devis gratuit sur place »** dans le titre.
- Landing pages : pages prestations et pages locales, jamais l'accueil. Le lien `/contact?cp=95150&prestation=taille-de-haies` préremplit le formulaire.
- Extensions : appel (conversion principale), liens annexes (Tarifs, Crédit d'impôt, Réalisations), extraits de site.
- Budget de départ : 10–15 €/jour par zone active ; CPC attendu 1,5–4 €.
- [ ] Vérifier l'éligibilité aux **Annonces Services Locaux** (badge Google Garanti), déployées progressivement en France pour les artisans.

**Suivi des conversions — à implémenter avant de dépenser**

- [ ] Événements gtag (après consentement) : `click_tel`, `submit_devis`, `click_devis_cta`. Points d'accroche : `Hero`, `MobileCallBar`, `CtaBand`, `DevisForm` (succès), liens `tel:` du `Footer`.
- [ ] Capture `utm_source`, `utm_campaign`, `gclid` côté client, envoi dans `/api/devis`, inclusion dans l'e-mail Resend.
- [ ] Déclarer les deux conversions dans Google Ads (appel + formulaire).
- [ ] `NEXT_PUBLIC_GTAG_ID` renseigné en production.

## 5. Tunnel de vente

```
Recherche / Ads / fiche Google
  → page prestation ou page locale (crédit d'impôt + tarifs visibles)
  → widget planning : « on passe chez vous du … au … »
  → appel direct ou formulaire prérempli
  → rappel sous 24 h (SMS de confirmation)
  → visite + devis sur place, reste à charge écrit
  → chantier → nettoyage → facture
  → J+2 : SMS demande d'avis Google
  → janvier : attestation fiscale (rappel du crédit obtenu)
  → proposition de contrat d'entretien annuel → récurrence
```

Le site couvre tout jusqu'au formulaire. Côté Bryan : modèle de SMS de confirmation, modèle de demande d'avis, relance des devis non signés à J+7.

Le levier le plus rentable à terme : le **contrat d'entretien annuel** (1 à 2 tailles/an), qui transforme un chantier en client récurrent et lisse les tournées. À valider avec le client avant de créer la page/section.

## 6. À implémenter dans le code (par ordre de priorité)

1. Événements gtag + conversions (voir §4).
2. Capture UTM / gclid dans `DevisForm` et `/api/devis`.
3. `public/llms.txt`.
4. Balise de vérification Search Console (`verification.google` dans `generateMetadata` de `src/app/layout.tsx`).
5. Lien « Laisser un avis Google » prérempli (footer + fin de parcours) dès que les fiches existent.
6. Section « Contrat d'entretien annuel » si l'offre est validée.
