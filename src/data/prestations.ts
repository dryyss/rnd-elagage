export type PrestationIcon = "hedge" | "garden" | "tree" | "lawn" | "earth" | "trailer";

export interface Prestation {
  slug: string;
  numero: string;
  nom: string;
  nomCourt: string;
  accroche: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  icon: PrestationIcon;
  image: string;
  imageAlt: string;
  tarifIndicatif: string;
  creditImpot: boolean;
  principale?: boolean;
  blocs: { titre: string; texte: string }[];
  inclus: string[];
  saison?: string;
  faq: { q: string; r: string }[];
}

export const prestations: Prestation[] = [
  {
    slug: "taille-de-haies",
    numero: "01",
    nom: "Taille de haies",
    nomCourt: "Taille de haies",
    accroche: "Thuyas, lauriers, cyprès, charmilles : entretien régulier ou remise en forme complète, au cordeau.",
    seoTitle: "Taille de haies dans le Val-d'Oise et la Nièvre · Crédit d'impôt 50 %",
    seoDescription:
      "Taille de haies de thuyas, lauriers et cyprès à Taverny, dans le Val-d'Oise et autour de Nevers. Évacuation comprise, devis gratuit, 50 % de crédit d'impôt.",
    h1: "Taille de haies : une ligne nette, une haie qui reste dense",
    intro:
      "Une haie taillée régulièrement reste dense, saine et à la hauteur que vous avez choisie. Laissée trois ans sans intervention, elle se dégarnit par le bas et devient difficile à rattraper. Nous intervenons dans les deux cas, avec le matériel et la méthode adaptés à chaque essence.",
    icon: "hedge",
    image: "/images/haie-thuya-alignement.jpg",
    imageAlt: "Grande haie de thuyas taillée au cordeau, surface dense et régulière",
    tarifIndicatif: "à partir de 6 € / ml",
    creditImpot: true,
    principale: true,
    blocs: [
      {
        titre: "Entretien régulier",
        texte:
          "Une à deux tailles par an selon l'essence, sur les trois faces, avec un cordeau tendu pour garantir la ligne. C'est la formule la moins chère au mètre linéaire, et celle qui garde la haie en meilleure santé.",
      },
      {
        titre: "Remise en forme",
        texte:
          "Reprise d'une haie laissée à l'abandon : réduction de hauteur, dégagement du pied, remise à l'alignement. Le volume de déchets est plus important, nous le chiffrons précisément sur place.",
      },
      {
        titre: "Réduction de hauteur",
        texte:
          "Abaissement d'une haie devenue trop haute, jusqu'à la hauteur souhaitée, en respectant ce que l'essence supporte. Le cyprès de Leyland ne repart pas sur le vieux bois : nous vous le disons avant, pas après.",
      },
      {
        titre: "Dégagement de limite",
        texte:
          "Taille de la face qui déborde chez le voisin ou sur le trottoir, avec nettoyage complet. Souvent demandée après un courrier de la mairie ou du syndic.",
      },
    ],
    inclus: [
      "Mise à niveau au cordeau et au niveau laser sur les grandes longueurs",
      "Bâchage des massifs et des terrasses avant la coupe",
      "Nettoyage complet en fin de chantier, soufflage des allées",
      "Évacuation des déchets verts, ou broyage sur place si vous voulez garder le paillage",
    ],
    saison:
      "De septembre à mars pour les tailles importantes et les remises en forme. De mi-mars à fin juillet, période de nidification, nous limitons les interventions lourdes sur les haies et privilégions les tailles légères.",
    faq: [
      {
        q: "Quelle hauteur maximale pour une haie mitoyenne ?",
        r: "À défaut de règlement local, le Code civil impose 2 m maximum pour une plantation située à moins de 2 m de la limite de propriété. Beaucoup de lotissements ont leur propre règlement : nous vous conseillons de le vérifier avant une réduction.",
      },
      {
        q: "Peut-on tailler une haie en été ?",
        r: "Une taille légère d'entretien reste possible. Les réductions fortes sont déconseillées de mi-mars à fin juillet pour protéger les oiseaux nicheurs, et pour éviter de brûler la haie en période de forte chaleur.",
      },
      {
        q: "Les déchets sont-ils évacués ?",
        r: "Oui, l'évacuation est chiffrée dans chaque devis et réalisée le jour même en remorque. Si vous préférez garder le broyat comme paillage, nous le laissons sur place.",
      },
      {
        q: "La taille de haie donne-t-elle droit au crédit d'impôt ?",
        r: "Oui. La taille de haies entre dans les petits travaux de jardinage des services à la personne : 50 % du montant payé vous est restitué par crédit d'impôt, dans la limite du plafond annuel de 5 000 € de dépenses.",
      },
    ],
  },
  {
    slug: "entretien-de-jardin-debroussaillage",
    numero: "02",
    nom: "Entretien de jardin et débroussaillage",
    nomCourt: "Entretien de jardin",
    accroche: "Tonte, débroussaillage, désherbage manuel, dégagement de murs et de clôtures envahis.",
    seoTitle: "Entretien de jardin et débroussaillage · Val-d'Oise et Nièvre",
    seoDescription:
      "Tonte, débroussaillage de terrains en friche, désherbage, nettoyage de massifs. Intervention ponctuelle ou à l'année, crédit d'impôt 50 %, déchets évacués.",
    h1: "Entretien de jardin et débroussaillage",
    intro:
      "Un terrain qu'on n'a plus le temps d'entretenir se referme vite : ronces, lierre, rejets d'arbres. Nous le remettons au propre en une intervention, puis nous pouvons l'entretenir à l'année pour qu'il ne reparte pas.",
    icon: "garden",
    image: "/images/avant-apres-degagement-mur.jpg",
    imageAlt: "Avant et après le dégagement d'un mur envahi par la végétation",
    tarifIndicatif: "à partir de 0,80 € / m²",
    creditImpot: true,
    blocs: [
      {
        titre: "Débroussaillage",
        texte:
          "Terrains en friche, fonds de parcelle, talus, abords de clôture. Débroussailleuse à lame ou à fil selon la végétation, puis ramassage et évacuation. Nous intervenons aussi pour les obligations légales de débroussaillement.",
      },
      {
        titre: "Tonte et bordures",
        texte:
          "Tonte avec ramassage, finition des bordures au fil, soufflage des allées et terrasses. En formule annuelle, un passage toutes les deux à trois semaines en saison.",
      },
      {
        titre: "Désherbage et massifs",
        texte:
          "Désherbage manuel ou thermique, sans produit chimique. Nettoyage des massifs, taille des arbustes et des rosiers, remise en forme des bordures de buis et des topiaires.",
      },
      {
        titre: "Dégagement de murs et clôtures",
        texte:
          "Lierre, vigne vierge, ronces sur un mur, un grillage ou un portail. Nous dégageons, nous coupons les racines au pied et nous nettoyons les gravats végétaux.",
      },
    ],
    inclus: [
      "Matériel professionnel, carburant et consommables compris",
      "Ramassage et évacuation des déchets verts",
      "Nettoyage des surfaces dures en fin de passage",
      "Contrat annuel possible avec attestation fiscale en janvier",
    ],
    faq: [
      {
        q: "Intervenez-vous pour un entretien régulier ?",
        r: "Oui. Nous proposons des contrats d'entretien à l'année adaptés à nos tournées : un planning de passages est convenu à l'avance pour chaque zone.",
      },
      {
        q: "Utilisez-vous des désherbants ?",
        r: "Non. Les produits phytosanitaires sont interdits pour les particuliers et dans la plupart des usages professionnels en jardin. Nous désherbons manuellement ou thermiquement.",
      },
      {
        q: "Le débroussaillage ouvre-t-il droit au crédit d'impôt ?",
        r: "Oui, comme la tonte et l'entretien courant du jardin, dans le cadre des petits travaux de jardinage des services à la personne.",
      },
    ],
  },
  {
    slug: "abattage-dessouchage",
    numero: "03",
    nom: "Abattage et dessouchage",
    nomCourt: "Abattage",
    accroche: "Arbres accessibles, abattage directionnel, rognage de souche et évacuation du bois.",
    seoTitle: "Abattage d'arbres et dessouchage · Val-d'Oise et Nièvre",
    seoDescription:
      "Abattage d'arbres accessibles, démontage en sécurité, rognage de souche et évacuation du bois à Taverny, dans le Val-d'Oise et autour de Nevers. Devis gratuit.",
    h1: "Abattage d'arbres et dessouchage",
    intro:
      "Arbre mort, trop proche de la maison, qui soulève une allée ou qui prive le jardin de lumière : nous abattons les sujets accessibles en toute sécurité, nous rognons la souche et nous laissons un terrain propre, prêt à être replanté ou engazonné.",
    icon: "tree",
    image: "/images/taille-haie-cypres-rue.jpg",
    imageAlt: "Camion d'intervention devant une haie de cyprès en bord de rue",
    tarifIndicatif: "sur devis",
    creditImpot: false,
    blocs: [
      {
        titre: "Abattage directionnel",
        texte:
          "Pour les arbres dégagés, avec une zone de chute suffisante. Entaille de direction, charnière, coins : l'arbre tombe là où nous l'avons décidé.",
      },
      {
        titre: "Démontage par sections",
        texte:
          "Quand la place manque, l'arbre est démonté tronçon par tronçon, du haut vers le bas, avec rétention des branches à la corde pour protéger les toitures, clôtures et plantations.",
      },
      {
        titre: "Dessouchage et rognage",
        texte:
          "Rognage mécanique de la souche à 20 ou 30 cm sous le niveau du sol, pour pouvoir engazonner ou replanter. Arrachage complet possible pour les petites souches.",
      },
      {
        titre: "Évacuation ou débit en bûches",
        texte:
          "Le bois est évacué, ou débité en bûches de 33 ou 50 cm et laissé sur place si vous vous chauffez au bois. Les branchages sont broyés.",
      },
    ],
    inclus: [
      "Visite préalable pour évaluer l'accès, l'état de l'arbre et les risques",
      "Protection des zones sensibles (toiture, véranda, massifs)",
      "Nettoyage complet, ramassage des copeaux de rognage",
      "Conseil de replantation si vous souhaitez remplacer l'arbre",
    ],
    saison:
      "Toute l'année pour les arbres morts ou dangereux. Pour les autres, nous privilégions la période hors sève, de novembre à mars, et nous évitons la période de nidification.",
    faq: [
      {
        q: "Faut-il une autorisation pour abattre un arbre ?",
        r: "Dans la plupart des cas, non. Mais certaines communes ou certains lotissements protègent les arbres (PLU, espace boisé classé, règlement de copropriété). Nous vous indiquons si une vérification en mairie est nécessaire.",
      },
      {
        q: "L'abattage donne-t-il droit au crédit d'impôt ?",
        r: "Non. L'abattage, le dessouchage et l'élagage de grands arbres ne font pas partie des petits travaux de jardinage éligibles. Seul l'entretien courant du jardin (taille de haies, tonte, débroussaillage) y donne droit.",
      },
      {
        q: "Intervenez-vous en urgence après une tempête ?",
        r: "Oui si nous sommes sur votre secteur de tournée. Appelez-nous directement : un arbre couché sur une clôture ou une voiture passe avant tout le reste.",
      },
    ],
  },
  {
    slug: "engazonnement-creation",
    numero: "04",
    nom: "Engazonnement et création",
    nomCourt: "Engazonnement",
    accroche: "Préparation du sol, semis ou gazon en rouleau, remise en état après travaux.",
    seoTitle: "Engazonnement et création de pelouse · Val-d'Oise et Nièvre",
    seoDescription:
      "Création de pelouse par semis ou gazon en rouleau, préparation du sol, remise en état après travaux. Val-d'Oise et Nièvre, devis gratuit sur place.",
    h1: "Engazonnement et création de pelouse",
    intro:
      "Une pelouse réussie se joue à 80 % dans la préparation du sol. Nous décaissons, nous nivelons, nous amendons et nous semons au bon moment, ou nous posons du gazon en rouleau quand il faut un résultat immédiat.",
    icon: "lawn",
    image: "/images/terrassement-preparation-sol.jpg",
    imageAlt: "Terrain nivelé et préparé avant engazonnement",
    tarifIndicatif: "à partir de 12 € / m²",
    creditImpot: false,
    blocs: [
      {
        titre: "Préparation du sol",
        texte:
          "Suppression de l'ancienne pelouse ou de la friche, décaissement, apport de terre végétale si nécessaire, passage au rotavator, nivellement au râteau et roulage. C'est l'étape qui conditionne tout le reste.",
      },
      {
        titre: "Semis",
        texte:
          "Mélange adapté à l'usage (détente, sport, ombre, sécheresse), semis croisé à la dose, griffage, roulage et premier arrosage. Levée en deux à trois semaines selon la saison.",
      },
      {
        titre: "Gazon en rouleau",
        texte:
          "Pose de plaques de gazon précultivé pour un résultat vert le jour même. Idéal pour une petite surface, une vente immobilière ou un jardin très fréquenté.",
      },
      {
        titre: "Petites créations",
        texte:
          "Massifs, plantation de haies et d'arbustes, paillage minéral ou végétal, bordures. Nous travaillons à partir d'un croquis simple validé ensemble.",
      },
    ],
    inclus: [
      "Analyse rapide du sol et conseil sur le mélange de graines",
      "Fourniture des graines ou du gazon, de la terre et des amendements",
      "Consignes d'arrosage et de première tonte",
      "Passage de contrôle à la levée pour les semis",
    ],
    saison:
      "Semis de mi-mars à mi-mai et de fin août à mi-octobre, quand le sol est chaud et l'humidité suffisante. Gazon en rouleau presque toute l'année, hors gel et canicule.",
    faq: [
      {
        q: "Semis ou rouleau : que choisir ?",
        r: "Le semis coûte deux à trois fois moins cher et s'enracine mieux à long terme, mais demande six à huit semaines avant d'être praticable. Le rouleau est immédiat, plus cher, et doit être arrosé très régulièrement les premières semaines.",
      },
      {
        q: "L'engazonnement est-il éligible au crédit d'impôt ?",
        r: "Non. La création de pelouse et les travaux de création paysagère ne font pas partie des services à la personne. L'entretien de la pelouse ensuite (tonte, scarification) y est en revanche éligible.",
      },
    ],
  },
  {
    slug: "terrassement-maconnerie-paysagere",
    numero: "05",
    nom: "Terrassement et maçonnerie paysagère",
    nomCourt: "Terrassement",
    accroche: "Décaissement, nivellement, pose de bordures, petits murets et préparation avant clôture ou terrasse.",
    seoTitle: "Terrassement léger et maçonnerie paysagère · Val-d'Oise et Nièvre",
    seoDescription:
      "Terrassement léger, nivellement, pose de bordures béton, petits murets de soutènement et préparation de terrain avant clôture ou terrasse. Devis gratuit.",
    h1: "Terrassement léger et maçonnerie paysagère",
    intro:
      "Avant une clôture, une terrasse, une allée ou une pelouse, le terrain doit être préparé. Nous réalisons les terrassements légers et la petite maçonnerie qui structurent un jardin : bordures, murets, marches, séparations.",
    icon: "earth",
    image: "/images/terrassement-preparation-sol.jpg",
    imageAlt: "Jardin de lotissement décaissé et nivelé entre deux clôtures",
    tarifIndicatif: "sur devis",
    creditImpot: false,
    blocs: [
      {
        titre: "Décaissement et nivellement",
        texte:
          "Mise à niveau d'un terrain en pente douce, décaissement avant terrasse ou allée, évacuation des terres ou réemploi sur place pour un talus.",
      },
      {
        titre: "Bordures et séparations",
        texte:
          "Pose de bordures béton, acier ou pierre pour séparer pelouse, massifs et gravier. Fondation au béton maigre, alignement au cordeau.",
      },
      {
        titre: "Petits murets",
        texte:
          "Murets de soutènement jusqu'à 80 cm en parpaings enduits, pierres ou blocs à emboîter, avec drainage à l'arrière. Marches de jardin et emmarchements.",
      },
      {
        titre: "Préparation avant clôture",
        texte:
          "Dégagement de la limite, arrachage de l'ancienne haie ou grillage, nivellement de la ligne de pose. Nous pouvons aussi poser le grillage rigide ou les panneaux bois.",
      },
    ],
    inclus: [
      "Visite préalable et chiffrage précis des volumes de terre",
      "Repérage des réseaux visibles avant tout terrassement",
      "Évacuation des gravats et des terres excédentaires",
      "Remise en état des abords",
    ],
    faq: [
      {
        q: "Jusqu'à quelle ampleur intervenez-vous ?",
        r: "Nous réalisons les terrassements légers de jardin, à la mini-pelle ou à la main : décaissements de quelques dizaines de centimètres, murets bas, bordures. Pour une piscine ou un mur de soutènement important, nous vous orientons vers une entreprise de gros œuvre.",
      },
      {
        q: "Ces travaux sont-ils éligibles au crédit d'impôt ?",
        r: "Non. Le terrassement et la maçonnerie relèvent des travaux et non des services à la personne.",
      },
    ],
  },
  {
    slug: "evacuation-dechets-verts",
    numero: "06",
    nom: "Évacuation des déchets verts",
    nomCourt: "Évacuation",
    accroche: "Branchages, tailles, tontes, souches : chargement, transport en déchetterie professionnelle ou broyage sur place.",
    seoTitle: "Évacuation de déchets verts et broyage · Val-d'Oise et Nièvre",
    seoDescription:
      "Évacuation de déchets verts après taille ou abattage, enlèvement de tas de branches, broyage sur place. Val-d'Oise et Nièvre, intervention rapide.",
    h1: "Évacuation des déchets verts",
    intro:
      "Un tas de branches au fond du jardin, les résidus d'une taille que vous avez faite vous-même, une haie arrachée : nous chargeons, nous transportons et nous déposons en filière agréée. Ou nous broyons sur place pour vous laisser un paillage utile.",
    icon: "trailer",
    image: "/images/avant-apres-haie-laurier-route.jpg",
    imageAlt: "Remorque chargée de déchets verts après la taille d'une haie de lauriers",
    tarifIndicatif: "à partir de 2 € / ml de haie",
    creditImpot: true,
    blocs: [
      {
        titre: "Évacuation après nos chantiers",
        texte:
          "Comprise dans tous nos devis de taille et d'abattage. Les déchets partent le jour même en remorque, rien ne reste sur votre terrain.",
      },
      {
        titre: "Enlèvement de déchets existants",
        texte:
          "Vous avez taillé vous-même et le tas vous encombre ? Nous passons le charger lors de notre tournée dans votre secteur. Tarif au volume, indiqué avant intervention.",
      },
      {
        titre: "Broyage sur place",
        texte:
          "Les branchages sont réduits en copeaux que nous étalons sur vos massifs ou laissons en tas. Moins de transport, un paillage gratuit qui limite l'arrosage et le désherbage.",
      },
    ],
    inclus: [
      "Chargement, transport et frais de dépôt en déchetterie professionnelle",
      "Nettoyage de la zone de stockage",
      "Broyeur sur place à la demande",
    ],
    faq: [
      {
        q: "Pouvez-vous brûler les déchets verts ?",
        r: "Non. Le brûlage des déchets verts à l'air libre est interdit en France. Nous évacuons ou nous broyons.",
      },
      {
        q: "L'évacuation est-elle éligible au crédit d'impôt ?",
        r: "Oui lorsqu'elle accompagne une prestation d'entretien éligible (taille de haies, débroussaillage, tonte) : elle fait partie de la même facture de services à la personne.",
      },
    ],
  },
];

export const prestationBySlug = (slug: string) => prestations.find((p) => p.slug === slug);
export const prestationPrincipale = prestations.find((p) => p.principale)!;
