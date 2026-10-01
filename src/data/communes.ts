import type { ZoneId } from "@/lib/types";

export interface Commune {
  slug: string;
  nom: string;
  codePostal: string;
  departement: string;
  zone: ZoneId;
  /** Commune de base du client : délais les plus courts. */
  base?: boolean;
  accroche: string;
  intro: string;
  contexte: string;
  demandes: { titre: string; texte: string }[];
  quartiers: string[];
  voisines: string[]; // slugs
  lat: number;
  lng: number;
}

export const communes: Commune[] = [
  {
    slug: "taverny",
    nom: "Taverny",
    codePostal: "95150",
    departement: "Val-d'Oise",
    zone: "val-doise",
    base: true,
    accroche: "Notre commune de base : délais courts, devis sur place sous 48 h quand la tournée est dans le Val-d'Oise.",
    intro:
      "RND Élagage est installé à Taverny. C'est ici que nous passons le plus souvent, entre deux chantiers, et c'est ici que les devis sont les plus rapides à organiser.",
    contexte:
      "Le tissu pavillonnaire de Taverny, des Lignières aux Écouardes en passant par le Haut-Tertre, est très majoritairement clos de haies de thuyas et de lauriers plantées il y a trente ou quarante ans. Beaucoup dépassent aujourd'hui les trois mètres et commencent à se dégarnir par le bas. En lisière de la forêt de Montmorency, les parcelles doivent aussi composer avec les ronces et les rejets qui gagnent les fonds de jardin.",
    demandes: [
      { titre: "Réduction de thuyas trop hauts", texte: "Haies mitoyennes à ramener entre deux et trois mètres sans dégarnir le pied, en deux passes si nécessaire." },
      { titre: "Dégagement de clôtures en lisière", texte: "Lierre et ronces sur les murs de fond de parcelle, fréquents dans les quartiers qui bordent la forêt." },
      { titre: "Entretien à l'année", texte: "Deux à trois passages par an, tonte et taille, sur les parcelles de 300 à 800 m² du centre et des coteaux." },
    ],
    quartiers: ["Centre-ville", "Les Lignières", "Les Écouardes", "Vaucelles", "Le Haut-Tertre", "Les Sarments"],
    voisines: ["bessancourt", "saint-leu-la-foret", "pierrelaye", "herblay-sur-seine", "franconville"],
    lat: 49.0254,
    lng: 2.2268,
  },
  {
    slug: "herblay-sur-seine",
    nom: "Herblay-sur-Seine",
    codePostal: "95220",
    departement: "Val-d'Oise",
    zone: "val-doise",
    accroche: "Grandes parcelles des coteaux et pavillons de la Patte-d'Oie : haies longues et talus à entretenir.",
    intro:
      "Herblay est à dix minutes de notre base. Nous y intervenons à chaque tournée dans le Val-d'Oise, pour des tailles de haies, des débroussaillages de talus et des entretiens réguliers.",
    contexte:
      "Entre les coteaux qui descendent vers la Seine et les quartiers pavillonnaires des Bayonnes, des Cailloux Gris et de la Patte-d'Oie, Herblay compte beaucoup de longues haies de cyprès et de lauriers en limite de rue. Les terrains en pente des bords de Seine demandent un débroussaillage régulier des talus, souvent envahis de ronces et de clématites sauvages.",
    demandes: [
      { titre: "Haies de cyprès en bord de rue", texte: "Reprise de la face rue qui déborde sur le trottoir, remise à niveau du dessus, évacuation le jour même." },
      { titre: "Débroussaillage de talus", texte: "Terrains en pente des coteaux, accès parfois difficile : débroussailleuse à lame et ramassage à la main." },
      { titre: "Abattage de conifères vieillissants", texte: "Épicéas et cèdres bleus plantés trop près des maisons, démontés par sections." },
    ],
    quartiers: ["Centre", "Les Bayonnes", "La Patte-d'Oie", "Les Cailloux Gris", "Les Buttes Blanches", "Bords de Seine"],
    voisines: ["pierrelaye", "taverny", "franconville", "bessancourt"],
    lat: 48.9898,
    lng: 2.1663,
  },
  {
    slug: "franconville",
    nom: "Franconville",
    codePostal: "95130",
    departement: "Val-d'Oise",
    zone: "val-doise",
    accroche: "Pavillons des années soixante et petites copropriétés : entretien de haies et de pelouses au plus juste.",
    intro:
      "À Franconville, nous travaillons autant pour des particuliers que pour de petites copropriétés qui cherchent un prestataire réactif pour l'entretien de leurs espaces verts.",
    contexte:
      "Franconville est une commune dense, avec des parcelles plus petites que sur les coteaux. Les haies sont souvent mitoyennes et taillées sur une seule face depuis des années : la remise à l'aplomb et le dialogue avec le voisin font partie du travail. Les quartiers de l'Épine-Guyon et de la Fontaine-Bertin comptent beaucoup de pavillons avec jardin de 200 à 400 m².",
    demandes: [
      { titre: "Haies mitoyennes des deux côtés", texte: "Taille coordonnée avec le voisin quand c'est possible, pour une haie régulière et un seul passage de remorque." },
      { titre: "Entretien pour copropriétés", texte: "Tonte, taille et nettoyage des parties communes, facturation au syndic avec attestation." },
      { titre: "Dégagement de passages", texte: "Haies qui gênent la visibilité en sortie de garage ou le passage sur le trottoir." },
    ],
    quartiers: ["Centre", "L'Épine-Guyon", "La Fontaine-Bertin", "Les Montfrais", "Le Bois des Éboulures"],
    voisines: ["taverny", "herblay-sur-seine", "ermont", "saint-leu-la-foret"],
    lat: 48.9888,
    lng: 2.2301,
  },
  {
    slug: "pierrelaye",
    nom: "Pierrelaye",
    codePostal: "95480",
    departement: "Val-d'Oise",
    zone: "val-doise",
    accroche: "Lotissements récents et terrains à remettre en état : engazonnement, terrassement et haies jeunes.",
    intro:
      "Pierrelaye a beaucoup construit ces dernières années. Nous y intervenons pour finir des jardins de lotissement, poser des bordures et planter ou tailler de jeunes haies.",
    contexte:
      "Entre les quartiers anciens du centre et les lotissements sortis de terre autour de la gare et du Bois de Pierrelaye, la commune présente deux profils : des haies matures à entretenir, et des jardins neufs à créer, souvent laissés en terre nue par les constructeurs. Le terrassement léger et l'engazonnement y sont des demandes fréquentes.",
    demandes: [
      { titre: "Finition de jardins neufs", texte: "Nivellement, apport de terre, semis ou gazon en rouleau, pose de bordures autour des terrasses." },
      { titre: "Formation de jeunes haies", texte: "Taille de formation des haies de charmille ou de photinia plantées il y a deux ou trois ans." },
      { titre: "Entretien de haies matures", texte: "Thuyas et lauriers des quartiers anciens, taille annuelle avec évacuation." },
    ],
    quartiers: ["Centre", "Quartier de la gare", "Les Hauts de Pierrelaye", "Bois de Pierrelaye"],
    voisines: ["herblay-sur-seine", "taverny", "bessancourt"],
    lat: 49.0211,
    lng: 2.1544,
  },
  {
    slug: "saint-leu-la-foret",
    nom: "Saint-Leu-la-Forêt",
    codePostal: "95320",
    departement: "Val-d'Oise",
    zone: "val-doise",
    accroche: "Grandes propriétés arborées en lisière de forêt : haies, arbres et sous-bois à entretenir.",
    intro:
      "Saint-Leu-la-Forêt est une commune de grands jardins, souvent arborés. Nous y intervenons pour des tailles de haies longues, des abattages de sujets dangereux et l'entretien de parcelles boisées.",
    contexte:
      "Adossée à la forêt de Montmorency, Saint-Leu compte de nombreuses propriétés de plus de 1 000 m² avec des arbres de haute tige, des haies de charmille et de laurier et des fonds de parcelle en sous-bois. Les chênes et châtaigniers en limite demandent une surveillance régulière, et les haies anciennes atteignent souvent quatre mètres.",
    demandes: [
      { titre: "Haies hautes de grandes propriétés", texte: "Lauriers et charmilles de 3 à 4 m sur plusieurs dizaines de mètres, taille à la perche et au cordeau." },
      { titre: "Abattage de sujets dangereux", texte: "Arbres dépérissants en limite de voie ou proches des toitures, démontés par sections." },
      { titre: "Nettoyage de sous-bois", texte: "Débroussaillage de fonds de parcelle, évacuation du bois mort, remise en lumière." },
    ],
    quartiers: ["Centre", "Les Diablots", "La Châtaigneraie", "Le Plessis-Bouchard", "Lisière de forêt"],
    voisines: ["taverny", "franconville", "ermont"],
    lat: 49.0167,
    lng: 2.2467,
  },
  {
    slug: "bessancourt",
    nom: "Bessancourt",
    codePostal: "95550",
    departement: "Val-d'Oise",
    zone: "val-doise",
    accroche: "Village et lotissements des années quatre-vingt : cyprès de Leyland à reprendre, pelouses à entretenir.",
    intro:
      "Bessancourt est limitrophe de Taverny : nous y passons presque chaque jour de tournée. Les délais y sont aussi courts que dans notre commune de base.",
    contexte:
      "Autour du vieux village et de la gare, les lotissements de Bessancourt ont été largement plantés de cyprès de Leyland, une essence qui pousse d'un mètre par an et ne repart pas sur le vieux bois. Beaucoup de haies ont été laissées libres pendant quelques années et nécessitent une réduction progressive plutôt qu'une coupe brutale.",
    demandes: [
      { titre: "Réduction progressive de cyprès", texte: "Abaissement en deux ou trois passes sur un an pour éviter les trous définitifs." },
      { titre: "Entretien de pelouses", texte: "Tonte et scarification des pelouses de lotissement, contrat à l'année." },
      { titre: "Remplacement de haies mortes", texte: "Arrachage d'une haie de cyprès dépérissante et plantation d'une haie mixte." },
    ],
    quartiers: ["Village", "Quartier de la gare", "Les Marais", "Les Coteaux"],
    voisines: ["taverny", "pierrelaye", "herblay-sur-seine"],
    lat: 49.0375,
    lng: 2.2097,
  },
  {
    slug: "ermont",
    nom: "Ermont",
    codePostal: "95120",
    departement: "Val-d'Oise",
    zone: "val-doise",
    accroche: "Pavillons et résidences : taille de haies, tonte et entretien pour particuliers et syndics.",
    intro:
      "À Ermont, nous intervenons pour des particuliers dans les quartiers pavillonnaires et pour des syndics qui cherchent un prestataire pour l'entretien courant de petites résidences.",
    contexte:
      "Ermont mêle quartiers pavillonnaires anciens, autour d'Ermont-Eaubonne et des Chênes, et résidences collectives avec espaces verts. Les haies de laurier en pied d'immeuble, les pelouses communes et les massifs demandent un entretien régulier et soigné, avec un ramassage impeccable.",
    demandes: [
      { titre: "Entretien de résidences", texte: "Haies, pelouses et massifs des parties communes, planning de passages fixé avec le syndic." },
      { titre: "Haies de pavillons", texte: "Lauriers, troènes et thuyas des quartiers des Chênes et des Espérances, taille avec évacuation." },
      { titre: "Nettoyage de printemps", texte: "Remise en état après l'hiver : taille, désherbage des massifs, première tonte." },
    ],
    quartiers: ["Centre", "Les Chênes", "Les Espérances", "Ermont-Eaubonne", "Cernay"],
    voisines: ["franconville", "saint-leu-la-foret", "taverny"],
    lat: 48.9897,
    lng: 2.2581,
  },
  {
    slug: "nevers",
    nom: "Nevers",
    codePostal: "58000",
    departement: "Nièvre",
    zone: "nievre",
    accroche: "Notre point d'ancrage dans la Nièvre : une tournée toutes les six semaines environ, à réserver à l'avance.",
    intro:
      "Nevers est le centre de notre seconde zone. Nous y organisons des tournées d'environ six semaines en alternance avec le Val-d'Oise : réservez votre créneau en amont, le devis est préparé avant notre arrivée.",
    contexte:
      "Les quartiers pavillonnaires de Nevers, du Banlay aux Montôts et à la Baratte, offrent des parcelles plus grandes qu'en région parisienne, avec des haies longues de thuyas et de troènes et des jardins potagers à entretenir. Les abords de Loire et les terrains en pente du Bord de Nièvre demandent aussi des débroussaillages réguliers.",
    demandes: [
      { titre: "Haies longues de thuyas et troènes", texte: "Souvent 40 à 80 mètres linéaires par parcelle : taille mécanisée au cordeau, évacuation en remorque." },
      { titre: "Entretien groupé de voisins", texte: "Plusieurs jardins d'une même rue le même jour : moins de déplacement, un tarif plus intéressant pour chacun." },
      { titre: "Débroussaillage de terrains", texte: "Parcelles en friche, vergers abandonnés, abords de Loire." },
    ],
    quartiers: ["Centre", "Le Banlay", "Les Montôts", "La Baratte", "Les Courlis", "Bord de Nièvre"],
    voisines: ["varennes-vauzelles", "fourchambault", "coulanges-les-nevers", "marzy"],
    lat: 46.9896,
    lng: 3.159,
  },
  {
    slug: "varennes-vauzelles",
    nom: "Varennes-Vauzelles",
    codePostal: "58640",
    departement: "Nièvre",
    zone: "nievre",
    accroche: "Cités-jardins et pavillons des années cinquante : haies de troènes et pelouses à entretenir.",
    intro:
      "Varennes-Vauzelles fait partie de chaque tournée dans la Nièvre. Nous y intervenons pour des tailles de haies, des entretiens de pelouse et des remises en état de jardins.",
    contexte:
      "Les cités-jardins de Varennes-Vauzelles, construites pour les cheminots, sont bordées de haies de troènes et de charmilles basses qui demandent deux tailles par an pour rester nettes. Les quartiers plus récents de Vauzelles comptent des pavillons avec de grands jardins et des haies de thuyas.",
    demandes: [
      { titre: "Haies basses de troènes", texte: "Deux tailles par an, au cordeau, pour les haies de clôture des cités-jardins." },
      { titre: "Remise en état de jardins", texte: "Jardins laissés sans entretien après un déménagement ou une succession." },
      { titre: "Entretien à l'année", texte: "Tonte et taille groupées lors de chaque tournée." },
    ],
    quartiers: ["Vauzelles", "Varennes", "La Cité des Cheminots", "Les Révériens"],
    voisines: ["nevers", "fourchambault", "coulanges-les-nevers"],
    lat: 47.0169,
    lng: 3.1442,
  },
  {
    slug: "fourchambault",
    nom: "Fourchambault",
    codePostal: "58600",
    departement: "Nièvre",
    zone: "nievre",
    accroche: "Bords de Loire et jardins ouvriers : débroussaillage, taille et évacuation.",
    intro:
      "À Fourchambault, nous intervenons sur des jardins souvent grands et un peu laissés à eux-mêmes : débroussaillage, taille de haies libres et évacuation de gros volumes de déchets verts.",
    contexte:
      "Ancienne cité industrielle en bord de Loire, Fourchambault compte beaucoup de maisons avec de grands terrains, parfois d'anciens jardins ouvriers ou vergers. La végétation y est généreuse : haies libres de lauriers et de noisetiers, fruitiers à tailler, ronces à contenir le long des clôtures.",
    demandes: [
      { titre: "Débroussaillage de grands terrains", texte: "Remise en état de parcelles de 1 000 m² et plus, broyage sur place pour limiter les transports." },
      { titre: "Haies libres à reprendre", texte: "Lauriers et noisetiers laissés libres, à reformer en haie taillée ou à éclaircir." },
      { titre: "Évacuation de déchets accumulés", texte: "Tas de branches et de tontes stockés depuis des années, chargés en remorque." },
    ],
    quartiers: ["Centre", "Bords de Loire", "Les Grands Jardins", "La Garenne"],
    voisines: ["nevers", "varennes-vauzelles", "marzy"],
    lat: 47.0169,
    lng: 3.0855,
  },
  {
    slug: "coulanges-les-nevers",
    nom: "Coulanges-lès-Nevers",
    codePostal: "58660",
    departement: "Nièvre",
    zone: "nievre",
    accroche: "Lotissements et grandes parcelles : haies longues, pelouses et petits terrassements.",
    intro:
      "Coulanges-lès-Nevers est une commune résidentielle où les jardins sont vastes. Nous y réalisons des tailles de haies longues, des tontes et des travaux de création.",
    contexte:
      "Entre le bourg ancien et les lotissements des Bruyères et de la Grande Pâture, Coulanges aligne des parcelles de 800 à 1 500 m² closes de thuyas et de lauriers. Les haies dépassent fréquemment 50 mètres linéaires, et les propriétaires cherchent un prestataire capable de les traiter en une journée avec l'évacuation.",
    demandes: [
      { titre: "Haies de plus de 50 ml", texte: "Taille mécanisée sur trois faces et évacuation en une journée." },
      { titre: "Création de pelouses", texte: "Engazonnement de grandes surfaces après construction ou après arrachage d'une ancienne haie." },
      { titre: "Bordures et séparations", texte: "Pose de bordures entre pelouse, potager et allées gravillonnées." },
    ],
    quartiers: ["Le Bourg", "Les Bruyères", "La Grande Pâture", "Les Taupières"],
    voisines: ["nevers", "varennes-vauzelles"],
    lat: 47.0056,
    lng: 3.1836,
  },
  {
    slug: "marzy",
    nom: "Marzy",
    codePostal: "58180",
    departement: "Nièvre",
    zone: "nievre",
    accroche: "Village et hameaux à l'ouest de Nevers : haies champêtres, vergers et grands jardins.",
    intro:
      "À Marzy, nous intervenons sur des jardins de village et de hameaux, avec des haies champêtres à reformer, des fruitiers à tailler et des pelouses généreuses à entretenir.",
    contexte:
      "Marzy s'étend entre le bourg, les hameaux et les bords de Loire. Les jardins y sont grands, souvent clos de haies mixtes champêtres (charme, noisetier, prunellier) qui demandent une taille différente des thuyas de lotissement. Les anciens vergers et les topiaires des maisons de maître font aussi partie des demandes.",
    demandes: [
      { titre: "Haies champêtres", texte: "Taille respectueuse des essences mélangées, en fin d'hiver, avec broyage sur place." },
      { titre: "Topiaires et arbustes de forme", texte: "Reprise d'ifs et de buis taillés, nettoyage des massifs." },
      { titre: "Entretien de grands jardins", texte: "Tonte, taille et débroussaillage des abords, lors de chaque tournée." },
    ],
    quartiers: ["Le Bourg", "Les Hameaux", "Bords de Loire", "Le Plateau"],
    voisines: ["nevers", "fourchambault"],
    lat: 46.9833,
    lng: 3.0967,
  },
];

export const communeBySlug = (slug: string) => communes.find((c) => c.slug === slug);
export const communesParZone = (zone: ZoneId) => communes.filter((c) => c.zone === zone);
