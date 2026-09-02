import type {
  Database,
  DirectoryItem,
  DocumentItem,
  Elu,
  EventItem,
  JobItem,
  NewsItem,
  PageItem,
  ServiceItem,
  Settings,
} from "@/lib/types";

/* -------------------------------------------------------------------------
   Jeu de données initial. Les informations pratiques (adresse, téléphone,
   horaires, rubriques) reprennent celles du site municipal de Colombelles ;
   les articles, événements et pièces jointes sont des contenus de
   démonstration destinés à être remplacés depuis l'espace d'administration.
   ------------------------------------------------------------------------- */

const settings: Settings = {
  siteName: "Colombelles",
  tagline: "Ville de Colombelles",
  description:
    "Site officiel de la Ville de Colombelles, commune de 7 200 habitants du Calvados, membre de la communauté urbaine Caen la mer.",
  address: "Place François Mitterrand",
  postalCode: "14460",
  city: "Colombelles",
  phone: "02 31 35 25 00",
  email: "accueil@colombelles.fr",
  hours: [
    { day: "Lundi", value: "8h30 – 12h30 · 13h30 – 18h00" },
    { day: "Mardi", value: "8h30 – 12h30 · 13h30 – 17h00" },
    { day: "Mercredi", value: "8h30 – 12h30 · 13h30 – 17h00" },
    { day: "Jeudi", value: "8h30 – 12h30 · 13h30 – 17h00" },
    { day: "Vendredi", value: "8h30 – 12h30 · 13h30 – 17h00" },
    { day: "Samedi", value: "9h00 – 12h00 (permanences état civil)" },
    { day: "Dimanche", value: "Fermé" },
  ],
  social: [
    { label: "Facebook", url: "https://www.facebook.com/villedecolombelles" },
    { label: "Instagram", url: "https://www.instagram.com/villedecolombelles" },
    { label: "YouTube", url: "https://www.youtube.com" },
  ],
  banner: {
    enabled: true,
    level: "info",
    title: "Inscriptions périscolaires",
    text: "Le portail famille est ouvert pour l'année scolaire 2026-2027 jusqu'au 30 septembre.",
    href: "/demarches/portail-famille",
  },
  maintenance: false,
  population: "7 243",
  area: "6,24 km²",
  intercommunalite: "Communauté urbaine Caen la mer",
};

const news: NewsItem[] = [
  {
    id: "n-001",
    slug: "rentree-scolaire-2026-les-nouveautes",
    title: "Rentrée scolaire : ce qui change dans les écoles colombelloises",
    excerpt:
      "Nouvelle cour oasis à Henri-Sellier, tarification solidaire de la restauration, renforcement de l'accueil périscolaire : le point sur la rentrée de septembre.",
    content: `La rentrée s'est déroulée lundi 1er septembre dans les quatre groupes scolaires de la commune. Près de 780 élèves ont repris le chemin de la classe.

## Une cour oasis à Henri-Sellier

Les travaux menés pendant l'été ont permis de désimperméabiliser 640 m² de cour. Le bitume a laissé place à des sols drainants, à trente arbres de haute tige et à des zones d'ombre. L'opération, financée dans le cadre du plan de renaturation, sera étendue à l'école Jacques-Prévert en 2027.

## Restauration scolaire : une tarification à huit tranches

Le conseil municipal a adopté en juin une grille tarifaire élargie, calculée sur le quotient familial. Le repas est facturé de 0,85 € à 4,60 €. Les familles doivent transmettre leur avis d'imposition avant le 30 septembre via le portail famille.

## Accueil périscolaire renforcé

Deux animateurs supplémentaires rejoignent les équipes du matin et du soir. L'accueil ouvre désormais dès 7h15 et jusqu'à 18h45.

Toutes les informations pratiques sont disponibles auprès du service Éducation, au 02 31 35 25 12.`,
    category: "Éducation",
    publishedAt: "2026-09-01T08:00:00.000Z",
    status: "publie",
    featured: true,
    author: "Service communication",
    tags: ["écoles", "rentrée", "périscolaire"],
  },
  {
    id: "n-002",
    slug: "budget-participatif-2026-les-projets-laureats",
    title: "Budget participatif : les six projets retenus par les habitants",
    excerpt:
      "1 412 Colombellois ont voté. Verger partagé, agrès sportifs, boîtes à livres : découvrez les projets qui seront réalisés d'ici l'été prochain.",
    content: `La quatrième édition du budget participatif s'est clôturée le 20 juillet. Sur 34 propositions déposées par les habitants, 18 ont été jugées recevables et soumises au vote.

## Les projets lauréats

- **Un verger partagé au Plateau** — 24 000 € — plantation de 40 arbres fruitiers et création d'un espace de récolte collective.
- **Des agrès sportifs le long de la coulée verte** — 31 000 €.
- **Cinq boîtes à livres** installées dans les quartiers — 6 500 €.
- **Un éclairage doux du chemin des Berges** — 28 000 €.
- **Du mobilier urbain place du Marché** — 19 000 €.
- **Un local de réparation vélo participatif** — 22 000 €.

## Calendrier

Les études techniques démarrent en octobre. Les premières réalisations seront livrées au printemps 2027. Un comité de suivi associant les porteurs de projets se réunira chaque trimestre.

L'enveloppe globale s'élève à 130 000 €, soit 18 € par habitant.`,
    category: "Démocratie locale",
    publishedAt: "2026-07-28T10:00:00.000Z",
    status: "publie",
    featured: true,
    author: "Service communication",
    tags: ["budget participatif", "concertation"],
  },
  {
    id: "n-003",
    slug: "le-plateau-nouvelle-etape-amenagement",
    title: "Le Plateau : une nouvelle étape pour l'ancien site sidérurgique",
    excerpt:
      "Sur les 300 hectares de l'ancienne SMN, le quartier d'affaires poursuit sa mue. Trois nouveaux bâtiments seront livrés à l'automne.",
    content: `Quarante-trois ans après l'arrêt du dernier haut fourneau, l'ancien site de la Société métallurgique de Normandie continue d'écrire une seconde histoire.

## Trois livraisons à l'automne

Le programme comprend un bâtiment tertiaire de 4 200 m², une halle artisanale mutualisée et une extension du pôle de formation aux métiers du numérique. Au total, 180 emplois supplémentaires sont attendus sur le site.

## La mémoire du lieu

La tour de refroidissement et le bâtiment des soufflantes, inscrits au titre du patrimoine industriel, font l'objet d'un chantier de consolidation. Un parcours d'interprétation en douze stations sera inauguré au printemps : plaques de fonte gravées, témoignages sonores d'anciens sidérurgistes, vues comparées de 1913 à aujourd'hui.

> « Nous ne construisons pas sur des ruines, nous construisons avec elles. » — Conseil municipal, séance du 12 mai 2026

## Chiffres

- 300 hectares reconvertis
- 6 000 salariés sur le site au plus fort de l'activité, en 1974
- 2 500 emplois aujourd'hui, tous secteurs confondus`,
    category: "Grands projets",
    publishedAt: "2026-06-15T09:30:00.000Z",
    status: "publie",
    featured: true,
    author: "Direction de l'aménagement",
    tags: ["SMN", "patrimoine", "aménagement", "Plateau"],
  },
  {
    id: "n-004",
    slug: "mediatheque-le-phenix-horaires-elargis",
    title: "La médiathèque Le Phénix ouvre le dimanche matin",
    excerpt:
      "À partir du 4 octobre, l'équipement culturel accueille le public le dimanche de 10h à 13h, en plus des horaires habituels.",
    content: `Le conseil municipal a validé l'élargissement des horaires de la médiathèque Le Phénix.

## Nouveaux horaires

- Mardi : 14h – 18h
- Mercredi : 10h – 18h
- Jeudi : 14h – 18h
- Vendredi : 14h – 19h
- Samedi : 10h – 17h
- **Dimanche : 10h – 13h** (nouveau)

## Un service élargi

L'ouverture dominicale s'accompagne d'une programmation dédiée : lectures pour les tout-petits à 10h30, ateliers d'écriture un dimanche par mois, permanence numérique.

L'inscription reste gratuite pour tous les habitants de Caen la mer.`,
    category: "Culture",
    publishedAt: "2026-08-20T14:00:00.000Z",
    status: "publie",
    featured: false,
    author: "Médiathèque Le Phénix",
    tags: ["médiathèque", "culture", "horaires"],
  },
  {
    id: "n-005",
    slug: "travaux-rue-jean-jaures-septembre",
    title: "Travaux rue Jean-Jaurès : circulation modifiée jusqu'au 31 octobre",
    excerpt:
      "Le renouvellement du réseau d'eau potable entraîne une circulation alternée entre la place du Marché et la rue de l'Église.",
    content: `Caen la mer engage le renouvellement de 480 mètres de canalisation d'eau potable rue Jean-Jaurès.

## Ce qui change

- Circulation alternée par feux tricolores du 8 septembre au 31 octobre.
- Stationnement interdit côté pair sur toute la section concernée.
- L'arrêt de bus « Mairie » est déplacé provisoirement de 60 mètres vers le sud.
- La collecte des déchets est maintenue ; les bacs doivent être sortis en bout de rue.

## Contact

Pour toute question relative au chantier : service technique municipal, 02 31 35 25 30.`,
    category: "Travaux",
    publishedAt: "2026-08-28T07:00:00.000Z",
    status: "publie",
    featured: false,
    author: "Services techniques",
    tags: ["travaux", "circulation", "eau"],
  },
  {
    id: "n-006",
    slug: "forum-des-associations-2026",
    title: "Forum des associations : 68 structures au gymnase Marcel-Cerdan",
    excerpt:
      "Sport, culture, solidarité, loisirs : le rendez-vous de la rentrée associative se tient samedi 6 septembre de 10h à 17h.",
    content: `Le forum des associations réunit cette année 68 structures colombelloises et intercommunales.

## Au programme

- 10h – 17h : stands et inscriptions
- 11h : démonstrations sportives sur le plateau extérieur
- 14h30 : présentation du guide des associations 2026-2027
- 16h : pot de la rentrée offert par la municipalité

## Infos pratiques

Gymnase Marcel-Cerdan, rue des Sports. Entrée libre. Restauration sur place assurée par le comité des fêtes.

Le guide des associations est également téléchargeable dans la rubrique publications.`,
    category: "Vie associative",
    publishedAt: "2026-08-25T09:00:00.000Z",
    status: "publie",
    featured: false,
    author: "Service des sports et de la vie associative",
    tags: ["associations", "forum", "rentrée"],
  },
  {
    id: "n-007",
    slug: "collecte-dechets-nouveau-calendrier",
    title: "Déchets : nouveau calendrier de collecte au 1er octobre",
    excerpt:
      "Les bacs jaunes seront collectés le mardi, les ordures ménagères le vendredi. Le calendrier détaillé est disponible en téléchargement.",
    content: `À compter du 1er octobre 2026, les jours de collecte évoluent sur l'ensemble de la commune.

## Nouveau rythme

- **Bac jaune (emballages et papiers)** : tous les mardis, sortie la veille au soir.
- **Ordures ménagères** : tous les vendredis.
- **Déchets verts** : un mercredi sur deux, de mars à novembre.
- **Encombrants** : sur rendez-vous, au 0 800 000 000 (appel gratuit).

## Rappel du tri

Tous les emballages se trient, sans exception. Le verre est à déposer dans les colonnes d'apport volontaire, dont la carte est consultable sur le plan interactif.

Un calendrier papier sera distribué dans les boîtes aux lettres à partir du 15 septembre.`,
    category: "Environnement",
    publishedAt: "2026-08-18T08:00:00.000Z",
    status: "publie",
    featured: false,
    author: "Service propreté",
    tags: ["déchets", "tri", "collecte"],
  },
  {
    id: "n-008",
    slug: "recensement-population-2027-preparation",
    title: "Recensement 2027 : la commune recrute des agents recenseurs",
    excerpt:
      "Huit postes sont à pourvoir pour la campagne de janvier-février 2027. Candidatures ouvertes jusqu'au 15 novembre.",
    content: `La commune organise le recensement de sa population du 21 janvier au 27 février 2027.

## Profil recherché

- Disponibilité en soirée et le samedi
- Aisance relationnelle et discrétion
- Maîtrise des outils numériques (tablette fournie)
- Permis B apprécié

## Conditions

Contrat de vacation, formation obligatoire de deux demi-journées en janvier. Rémunération au nombre de logements recensés, avec un forfait de déplacement.

Les candidatures (CV et lettre) sont à adresser au service des ressources humaines avant le 15 novembre 2026.`,
    category: "Vie municipale",
    publishedAt: "2026-08-10T10:00:00.000Z",
    status: "publie",
    featured: false,
    author: "Ressources humaines",
    tags: ["recensement", "emploi", "INSEE"],
  },
  {
    id: "n-009",
    slug: "conseil-municipal-seance-septembre",
    title: "Conseil municipal : séance publique le 24 septembre",
    excerpt:
      "Décision modificative budgétaire, convention avec Caen la mer, rapport annuel sur l'eau : l'ordre du jour est en ligne.",
    content: `Le conseil municipal se réunira en séance publique le mercredi 24 septembre 2026 à 18h30, salle du conseil de l'hôtel de ville.

## Principaux points à l'ordre du jour

- Décision modificative n° 2 du budget principal
- Convention de gestion des espaces publics avec Caen la mer
- Rapport annuel sur le prix et la qualité du service public d'eau potable
- Tarifs municipaux 2027
- Subventions exceptionnelles aux associations

Les séances sont ouvertes au public et retransmises en direct. Les procès-verbaux des séances précédentes sont consultables dans la rubrique publications.`,
    category: "Vie municipale",
    publishedAt: "2026-09-01T06:00:00.000Z",
    status: "publie",
    featured: false,
    author: "Secrétariat général",
    tags: ["conseil municipal", "démocratie"],
  },
  {
    id: "n-010",
    slug: "plan-canicule-inscription-registre",
    title: "Registre canicule : pensez à vous inscrire",
    excerpt:
      "Le CCAS tient un registre nominatif des personnes fragiles afin d'organiser un suivi téléphonique en cas d'épisode de forte chaleur.",
    content: `Le registre communal des personnes vulnérables permet aux services d'assurer un contact régulier en période de canicule ou de grand froid.

## Qui peut s'inscrire

- Les personnes âgées de 65 ans et plus
- Les personnes de plus de 60 ans reconnues inaptes au travail
- Les personnes adultes en situation de handicap

L'inscription est volontaire, gratuite et révocable à tout moment. Elle peut être faite par la personne elle-même, un proche ou un professionnel de santé.

## Comment s'inscrire

Auprès du CCAS, place François Mitterrand, ou par téléphone au 02 31 35 25 20.`,
    category: "Solidarité",
    publishedAt: "2026-06-02T09:00:00.000Z",
    status: "publie",
    featured: false,
    author: "Centre communal d'action sociale",
    tags: ["CCAS", "canicule", "seniors"],
  },
  {
    id: "n-011",
    slug: "brouillon-voeux-du-maire",
    title: "Cérémonie des vœux 2027",
    excerpt: "Article en cours de rédaction.",
    content: "Contenu à compléter avant publication.",
    category: "Vie municipale",
    publishedAt: "2026-12-20T18:00:00.000Z",
    status: "brouillon",
    featured: false,
    author: "Service communication",
    tags: ["vœux"],
  },
];

const events: EventItem[] = [
  {
    id: "e-001",
    slug: "forum-des-associations",
    title: "Forum des associations",
    excerpt: "68 associations vous accueillent pour les inscriptions de la saison.",
    content:
      "Le rendez-vous incontournable de la rentrée. Stands, démonstrations, inscriptions sur place. Restauration assurée par le comité des fêtes.",
    startsAt: "2026-09-06T08:00:00.000Z",
    endsAt: "2026-09-06T15:00:00.000Z",
    location: "Gymnase Marcel-Cerdan",
    category: "Vie associative",
    price: "Entrée libre",
    status: "publie",
    featured: true,
  },
  {
    id: "e-002",
    slug: "journees-du-patrimoine-haut-fourneau",
    title: "Journées du patrimoine — Sur les traces de la SMN",
    excerpt: "Visite guidée du site sidérurgique et de la tour de refroidissement.",
    content:
      "Deux heures de visite commentée par un ancien agent de la Société métallurgique de Normandie. Le parcours traverse le carreau, la halle des soufflantes et le pied de la tour. Chaussures fermées obligatoires. Accessible à partir de 10 ans.",
    startsAt: "2026-09-19T12:30:00.000Z",
    endsAt: "2026-09-19T14:30:00.000Z",
    location: "Le Plateau — entrée par la rue de l'Industrie",
    category: "Patrimoine",
    price: "Gratuit, sur inscription",
    status: "publie",
    featured: true,
    registration: "Réservation obligatoire auprès de la médiathèque, places limitées à 25 par créneau.",
  },
  {
    id: "e-003",
    slug: "conseil-municipal-24-septembre",
    title: "Conseil municipal",
    excerpt: "Séance publique — décision modificative et tarifs 2027.",
    content: "Séance ouverte au public, salle du conseil. Retransmission en direct sur la chaîne de la ville.",
    startsAt: "2026-09-24T16:30:00.000Z",
    endsAt: "2026-09-24T19:00:00.000Z",
    location: "Hôtel de ville — salle du conseil",
    category: "Vie municipale",
    price: "Entrée libre",
    status: "publie",
    featured: false,
  },
  {
    id: "e-004",
    slug: "concert-la-renaissance-quatuor",
    title: "Quatuor Debussy — saison du théâtre La Renaissance",
    excerpt: "Ouverture de la saison musicale avec Ravel, Debussy et Dutilleux.",
    content:
      "Le quatuor à cordes lyonnais ouvre la saison 2026-2027 du théâtre La Renaissance. Au programme : Ravel, Debussy et Dutilleux. Durée 1h20 sans entracte.",
    startsAt: "2026-10-03T18:30:00.000Z",
    endsAt: "2026-10-03T20:00:00.000Z",
    location: "Théâtre La Renaissance",
    category: "Culture",
    price: "12 € / 8 € réduit / 5 € Colombellois",
    status: "publie",
    featured: true,
  },
  {
    id: "e-005",
    slug: "marche-hebdomadaire",
    title: "Marché hebdomadaire",
    excerpt: "Producteurs et commerçants, tous les jeudis matin.",
    content:
      "Une trentaine d'exposants : maraîchers, fromagers, poissonniers, primeurs, textile. Le marché se tient place François Mitterrand.",
    startsAt: "2026-09-03T06:00:00.000Z",
    endsAt: "2026-09-03T11:00:00.000Z",
    location: "Place François Mitterrand",
    category: "Commerce",
    price: "Entrée libre",
    status: "publie",
    featured: false,
  },
  {
    id: "e-006",
    slug: "atelier-numerique-seniors",
    title: "Atelier numérique pour les seniors",
    excerpt: "Prise en main du smartphone et des démarches en ligne.",
    content:
      "Cycle de six séances animées par le conseiller numérique de l'Espace public numérique. Groupe de huit personnes maximum. Matériel prêté sur place.",
    startsAt: "2026-09-15T13:00:00.000Z",
    endsAt: "2026-09-15T15:00:00.000Z",
    location: "Espace public numérique — Mini-Lab",
    category: "Seniors",
    price: "Gratuit, sur inscription",
    status: "publie",
    featured: false,
    registration: "Inscription au 02 31 35 25 40.",
  },
  {
    id: "e-007",
    slug: "nettoyage-berges-de-l-orne",
    title: "Nettoyage participatif des berges de l'Orne",
    excerpt: "Opération citoyenne avec le service environnement.",
    content:
      "Gants, sacs et pinces fournis. Rendez-vous au parking de la halte nautique. Collation offerte à l'issue de la matinée.",
    startsAt: "2026-10-11T07:30:00.000Z",
    endsAt: "2026-10-11T10:30:00.000Z",
    location: "Halte nautique — berges de l'Orne",
    category: "Environnement",
    price: "Gratuit",
    status: "publie",
    featured: false,
  },
  {
    id: "e-008",
    slug: "micro-folie-musee-numerique",
    title: "Micro-Folie — Le musée numérique",
    excerpt: "Découverte des collections de douze musées nationaux.",
    content:
      "Séance de découverte guidée sur écran géant : Louvre, Orsay, Centre Pompidou, Versailles. Tout public à partir de 7 ans.",
    startsAt: "2026-09-26T14:00:00.000Z",
    endsAt: "2026-09-26T16:00:00.000Z",
    location: "Médiathèque Le Phénix — Micro-Folie",
    category: "Culture",
    price: "Gratuit",
    status: "publie",
    featured: false,
  },
];

const pages: PageItem[] = [
  /* ---------- Votre mairie ---------- */
  {
    id: "p-001",
    slug: "presentation-de-la-ville",
    title: "Présentation de la ville",
    section: "votre-mairie",
    subsection: "Présentation de la ville",
    summary:
      "7 243 habitants, 6,24 km², une histoire industrielle et une reconversion en cours : Colombelles en quelques repères.",
    content: `Colombelles est une commune du Calvados, en Normandie, située sur la rive droite de l'Orne, à cinq kilomètres au nord-est de Caen. Elle compte 7 243 habitants pour une superficie de 6,24 km².

## Une histoire en deux temps

Village rural de moins de deux cents âmes au début du XXᵉ siècle, Colombelles connaît un bouleversement complet en 1909 avec l'implantation de la Société métallurgique de Normandie par l'industriel allemand August Thyssen. En sept ans, la population est multipliée par treize. La commune se dote d'une cité ouvrière, d'écoles, d'un dispensaire, d'équipements sportifs.

Détruite à 80 % pendant la bataille de Caen, la ville reçoit la Croix de guerre en 1948. L'usine redémarre et emploie jusqu'à 6 000 personnes au milieu des années 1970. Sa fermeture, en 1993, ouvre la période de reconversion dans laquelle la commune est toujours engagée.

## Aujourd'hui

Colombelles est membre de la communauté urbaine Caen la mer. Les 300 hectares de l'ancien site sidérurgique accueillent désormais un parc d'activités, un pôle de formation aux métiers du numérique et des quartiers d'habitation.

## Repères

- Population : 7 243 habitants (recensement 2023)
- Superficie : 6,24 km²
- Densité : 1 161 hab./km²
- Altitude : de 2 à 32 mètres
- Gentilé : Colombellois, Colombelloises
- Code postal : 14460 — Code INSEE : 14167`,
    order: 1,
    status: "publie",
    updatedAt: "2026-05-12T10:00:00.000Z",
  },
  {
    id: "p-002",
    slug: "au-sein-de-caen-la-mer",
    title: "Au sein de Caen la mer",
    section: "votre-mairie",
    subsection: "Présentation de la ville",
    summary:
      "Colombelles est l'une des 48 communes de la communauté urbaine Caen la mer, qui exerce une large part des compétences du quotidien.",
    content: `La communauté urbaine Caen la mer regroupe 48 communes et près de 270 000 habitants. Colombelles en est membre depuis sa création.

## Compétences exercées par la communauté urbaine

- Eau potable et assainissement
- Collecte et traitement des déchets
- Voirie et espaces publics
- Transports urbains (réseau Twisto)
- Développement économique
- Habitat et politique de la ville
- Plan local d'urbanisme intercommunal

## Compétences conservées par la commune

- État civil et affaires générales
- Écoles, restauration scolaire, périscolaire
- Action sociale de proximité (CCAS)
- Vie associative, culture, sport
- Police municipale
- Cimetière

Un guichet unique en mairie oriente les habitants vers le bon interlocuteur, quelle que soit la collectivité compétente.`,
    order: 2,
    status: "publie",
    updatedAt: "2026-04-02T10:00:00.000Z",
  },
  {
    id: "p-003",
    slug: "les-quartiers",
    title: "Les quartiers",
    section: "votre-mairie",
    subsection: "Présentation de la ville",
    summary: "Centre-bourg, cité Jean-Jaurès, Libéra, Plateau : cinq entités qui racontent l'histoire urbaine de la commune.",
    content: `## Le centre-bourg

Organisé autour de la place François Mitterrand, il concentre la mairie, l'église, les commerces et le marché hebdomadaire.

## La cité Jean-Jaurès

Ancienne cité ouvrière de la SMN, construite par tranches à partir de 1920. Elle fait l'objet d'un programme de rénovation énergétique engagé en 2006 et poursuivi depuis.

## Le quartier Libéra

Issu de la reconversion des terrains de l'usine, il mêle logements collectifs, maisons de ville et équipements publics. Sa livraison s'échelonne jusqu'en 2029.

## Le Plateau

Quartier d'activités de 300 hectares aménagé sur l'emprise sidérurgique. Il accueille des entreprises, un pôle de formation et le parcours d'interprétation du patrimoine industriel.

## Les Hauts de Colombelles

Secteur pavillonnaire situé à l'est de la commune, développé à partir des années 1980.`,
    order: 3,
    status: "publie",
    updatedAt: "2026-03-18T10:00:00.000Z",
  },
  {
    id: "p-004",
    slug: "marche-hebdomadaire",
    title: "Marché hebdomadaire",
    section: "votre-mairie",
    subsection: "Présentation de la ville",
    summary: "Tous les jeudis matin, place François Mitterrand, de 8h à 13h.",
    content: `Le marché de Colombelles se tient chaque **jeudi matin de 8h à 13h**, place François Mitterrand.

## Une trentaine d'exposants

Maraîchers, fromagers, poissonniers, boucher-charcutier, primeurs, rôtisserie, textile, fleurs. Plusieurs producteurs sont installés dans un rayon de trente kilomètres.

## Devenir exposant

Les demandes de place sont à adresser au service réglementation. Le droit de place est fixé par délibération du conseil municipal ; il s'élève à 0,90 € le mètre linéaire.

Contact : reglementation@colombelles.fr — 02 31 35 25 18`,
    order: 4,
    status: "publie",
    updatedAt: "2026-02-10T10:00:00.000Z",
  },
  {
    id: "p-005",
    slug: "budget",
    title: "Budget de la commune",
    section: "votre-mairie",
    summary: "Le budget primitif 2026 s'établit à 14,8 M€, dont 4,1 M€ d'investissement.",
    content: `Le budget primitif 2026 a été adopté par le conseil municipal lors de sa séance du 25 mars 2026.

## Section de fonctionnement — 10,7 M€

**Recettes**
- Impôts et taxes : 5,9 M€
- Dotations et participations : 2,8 M€
- Produits des services : 1,3 M€
- Autres produits : 0,7 M€

**Dépenses**
- Charges de personnel : 5,4 M€
- Charges à caractère général : 2,9 M€
- Subventions et participations : 1,6 M€
- Charges financières : 0,3 M€
- Autres charges : 0,5 M€

## Section d'investissement — 4,1 M€

- Rénovation énergétique des bâtiments scolaires : 1,25 M€
- Renaturation des cours d'école : 0,48 M€
- Voirie et espaces publics : 0,82 M€
- Équipements sportifs : 0,61 M€
- Budget participatif : 0,13 M€
- Matériel, informatique et divers : 0,81 M€

## Fiscalité

Les taux communaux sont inchangés depuis 2021 :
- Taxe foncière sur les propriétés bâties : 41,72 %
- Taxe foncière sur les propriétés non bâties : 48,15 %

L'encours de dette s'élève à 612 € par habitant, contre 748 € pour la moyenne des communes de même strate.`,
    order: 10,
    status: "publie",
    updatedAt: "2026-03-26T10:00:00.000Z",
  },
  {
    id: "p-006",
    slug: "budget-participatif",
    title: "Budget participatif",
    section: "votre-mairie",
    summary: "130 000 € par an confiés aux habitants pour financer leurs projets d'amélioration du cadre de vie.",
    content: `Depuis 2023, la commune consacre chaque année 130 000 € au financement de projets proposés et choisis par les habitants.

## Qui peut proposer

Toute personne résidant, travaillant ou étudiant à Colombelles, sans condition d'âge ni de nationalité. Les propositions peuvent être individuelles ou collectives.

## Quels projets

Le projet doit :
- relever d'une compétence communale ;
- porter sur un investissement (et non sur du fonctionnement) ;
- se situer sur le domaine public ;
- coûter moins de 40 000 € ;
- être d'intérêt général.

## Le calendrier

1. **Février – avril** : dépôt des propositions
2. **Mai – juin** : analyse technique et financière par les services
3. **Juin – juillet** : vote des habitants
4. **Automne** : études
5. **Année suivante** : réalisation

## Les éditions précédentes

- 2023 : parcours de santé, four à pain, jardins partagés
- 2024 : city-stade, ombrières de cour, signalétique piétonne
- 2025 : réfection du kiosque, bibliothèque de rue, hôtel à insectes
- 2026 : verger partagé, agrès sportifs, boîtes à livres, éclairage des berges, mobilier place du Marché, atelier vélo`,
    order: 11,
    status: "publie",
    updatedAt: "2026-07-29T10:00:00.000Z",
  },
  {
    id: "p-007",
    slug: "elections",
    title: "Élections",
    section: "votre-mairie",
    summary: "Inscription sur les listes électorales, procuration, bureaux de vote et résultats.",
    content: `## S'inscrire sur les listes électorales

L'inscription est possible toute l'année. Pour voter lors d'un scrutin, elle doit intervenir au plus tard le sixième vendredi précédant le premier tour.

**Pièces à fournir** : pièce d'identité en cours de validité, justificatif de domicile de moins de trois mois.

La démarche peut être effectuée en ligne sur service-public.fr, par courrier ou au guichet de la mairie.

## Établir une procuration

La procuration se fait en ligne via le téléservice Maprocuration, puis se valide auprès de la police municipale, d'un commissariat ou d'une gendarmerie. Un mandataire peut détenir une seule procuration établie en France.

## Les bureaux de vote

La commune compte cinq bureaux de vote, ouverts de 8h à 18h :

1. Hôtel de ville — place François Mitterrand
2. École Henri-Sellier — rue des Écoles
3. École Jacques-Prévert — avenue de la Libération
4. Centre Léo Lagrange — rue du Stade
5. Salle des fêtes — rue Jean-Jaurès

Le bureau d'affectation est indiqué sur la carte électorale.

## Prochaines échéances

Élections municipales : mars 2026 (scrutin passé). Prochain scrutin national : élections présidentielles, avril 2027.`,
    order: 12,
    status: "publie",
    updatedAt: "2026-01-15T10:00:00.000Z",
  },

  /* ---------- Démarches pratiques ---------- */
  {
    id: "p-101",
    slug: "etat-civil",
    title: "État civil",
    section: "demarches",
    subsection: "État civil",
    summary: "Naissance, mariage, Pacs, parrainage civil, décès : les actes et démarches gérés par la mairie.",
    content: `## Actes de naissance, mariage et décès

La copie intégrale ou l'extrait d'un acte peut être demandé gratuitement si l'événement a eu lieu à Colombelles. La demande se fait en ligne, par courrier ou au guichet, sur présentation d'une pièce d'identité.

Délai de délivrance : sous 48 heures au guichet, sous une semaine par courrier.

## Reconnaissance et déclaration de naissance

La naissance doit être déclarée dans les cinq jours suivant l'accouchement, à la mairie du lieu de naissance. La reconnaissance anticipée peut être effectuée dans n'importe quelle mairie, avant la naissance.

## Mariage

Le dossier est à retirer au service état civil au moins deux mois avant la date envisagée. Il comprend :
- les pièces d'identité des futurs époux ;
- les actes de naissance de moins de trois mois ;
- les justificatifs de domicile ;
- la liste et les pièces d'identité des témoins (deux à quatre).

La publication des bans est affichée pendant dix jours.

## Pacs

L'enregistrement du pacte civil de solidarité se fait en mairie du domicile commun, sur rendez-vous. Convention et pièces justificatives sont à déposer préalablement.

## Parrainage civil

Aussi appelé baptême républicain, il n'a pas de valeur juridique mais marque symboliquement l'engagement des parrains et marraines. La demande se fait auprès du service état civil.

## Décès et cimetière

La déclaration de décès s'effectue dans les 24 heures. Le cimetière communal propose des concessions de quinze, trente et cinquante ans, ainsi qu'un columbarium et un jardin du souvenir.

**Contact** : etat-civil@colombelles.fr — 02 31 35 25 05`,
    order: 1,
    status: "publie",
    updatedAt: "2026-06-01T10:00:00.000Z",
  },
  {
    id: "p-102",
    slug: "carte-identite-passeport",
    title: "Carte d'identité et passeport",
    section: "demarches",
    subsection: "Formalités administratives",
    summary: "Colombelles est équipée d'un dispositif de recueil. Les demandes se font uniquement sur rendez-vous.",
    content: `La mairie de Colombelles est équipée d'un dispositif de recueil des titres sécurisés. Elle instruit les demandes de carte nationale d'identité et de passeport **pour toute personne**, quelle que soit sa commune de résidence.

## Étape 1 — Pré-demande en ligne

Effectuez votre pré-demande sur le site de l'Agence nationale des titres sécurisés (ANTS). Notez le numéro de pré-demande.

## Étape 2 — Prendre rendez-vous

Le rendez-vous est obligatoire. Il se prend en ligne ou au 02 31 35 25 05. Le délai moyen est de trois semaines ; il s'allonge sensiblement au printemps.

## Étape 3 — Le rendez-vous

Présentez-vous avec :
- le numéro de pré-demande ;
- une photographie d'identité de moins de six mois, aux normes ;
- un justificatif de domicile de moins d'un an ;
- l'ancien titre, le cas échéant ;
- un timbre fiscal pour le passeport (86 € adulte, 42 € de 15 à 17 ans, 17 € pour les moins de 15 ans) ;
- pour un mineur : la pièce d'identité du représentant légal et, en cas de garde alternée, le jugement.

La présence du demandeur est obligatoire, y compris pour les mineurs, pour la prise d'empreintes.

## Étape 4 — Retrait

Le titre est à retirer en personne dans les trois mois. Un SMS vous prévient de sa disponibilité. Délai moyen de fabrication : trois à cinq semaines.

## Validité

- Carte d'identité : 15 ans (adulte), 10 ans (mineur)
- Passeport : 10 ans (adulte), 5 ans (mineur)`,
    order: 2,
    status: "publie",
    updatedAt: "2026-06-01T10:00:00.000Z",
  },
  {
    id: "p-103",
    slug: "urbanisme",
    title: "Urbanisme et autorisations de travaux",
    section: "demarches",
    subsection: "Urbanisme",
    summary: "Déclaration préalable, permis de construire, PLUi, droit de préemption : le guide des démarches.",
    content: `## Quelle autorisation pour quel projet

- **Déclaration préalable** : travaux de moins de 20 m² d'emprise, modification d'aspect extérieur, clôture, piscine de moins de 100 m², abri de jardin.
- **Permis de construire** : construction neuve, extension de plus de 20 m² (40 m² en zone urbaine sous conditions), changement de destination avec modification de façade ou de structure.
- **Permis d'aménager** : lotissement, aménagement de terrain de camping, affouillement important.
- **Permis de démolir** : obligatoire sur l'ensemble du territoire communal.

## Déposer un dossier

Le dépôt s'effectue :
- en ligne via le guichet numérique des autorisations d'urbanisme ;
- ou en quatre exemplaires au service urbanisme.

**Délais d'instruction** : un mois pour une déclaration préalable, deux mois pour une maison individuelle, trois mois pour les autres permis. Ces délais peuvent être majorés en cas de consultation de l'architecte des Bâtiments de France.

## Plan local d'urbanisme intercommunal

Le PLUi de Caen la mer est en vigueur depuis 2020. Il détermine les règles applicables parcelle par parcelle : hauteurs, emprises, implantations, stationnement, aspect extérieur, plantations.

Le règlement et les documents graphiques sont consultables gratuitement au service urbanisme et en ligne sur le géoportail de l'urbanisme.

## Certificat d'urbanisme

- **CU d'information** : indique les règles applicables au terrain. Délai : un mois.
- **CU opérationnel** : indique si le terrain peut accueillir le projet décrit. Délai : deux mois.

## Droit de préemption urbain

La commune dispose d'un droit de préemption sur les zones urbaines et à urbaniser. Toute vente y est précédée d'une déclaration d'intention d'aliéner déposée par le notaire. La collectivité dispose de deux mois pour se prononcer.

**Contact** : urbanisme@colombelles.fr — 02 31 35 25 32. Permanences sans rendez-vous le mardi de 9h à 12h.`,
    order: 3,
    status: "publie",
    updatedAt: "2026-05-20T10:00:00.000Z",
  },
  {
    id: "p-104",
    slug: "dechets-et-proprete",
    title: "Déchets et propreté",
    section: "demarches",
    subsection: "Propreté",
    summary: "Jours de collecte, consignes de tri, déchèteries et encombrants.",
    content: `La collecte et le traitement des déchets relèvent de la communauté urbaine Caen la mer.

## Jours de collecte à compter du 1er octobre 2026

| Flux | Jour | Sortie des bacs |
| --- | --- | --- |
| Emballages et papiers (bac jaune) | Mardi | La veille au soir |
| Ordures ménagères (bac gris) | Vendredi | La veille au soir |
| Déchets verts | Un mercredi sur deux, de mars à novembre | La veille au soir |

## Consignes de tri

Depuis l'extension des consignes, **tous les emballages se trient**, sans exception : pots de yaourt, films plastiques, barquettes, blisters, capsules, briques, boîtes de conserve.

À ne pas mettre dans le bac jaune : le verre (colonnes d'apport volontaire), les textiles (bornes dédiées), les déchets alimentaires, les masques et les mouchoirs.

## Verre et textiles

La commune compte onze colonnes à verre et quatre bornes textiles. Leur emplacement est consultable sur le plan interactif.

## Encombrants

Enlèvement sur rendez-vous, dans la limite de deux m³ et de trois passages par an. Prise de rendez-vous au 0 800 000 000 (appel gratuit).

## Déchèteries

Les déchèteries de Caen la mer sont accessibles gratuitement aux particuliers sur présentation d'un justificatif de domicile. La plus proche est celle de Mondeville, ouverte du lundi au samedi.

## Composteurs

Caen la mer met à disposition des composteurs individuels au tarif de 20 €, et accompagne les projets de compostage collectif en pied d'immeuble.`,
    order: 4,
    status: "publie",
    updatedAt: "2026-08-18T10:00:00.000Z",
  },
  {
    id: "p-105",
    slug: "prevention-securite",
    title: "Prévention et sécurité",
    section: "demarches",
    subsection: "Prévention – sécurité",
    summary: "Police municipale, DICRIM, opération tranquillité vacances, objets trouvés, numéros d'urgence.",
    content: `## Police municipale

Quatre agents assurent la surveillance du territoire, la police de la circulation et du stationnement, la médiation et la prévention.

**Poste de police municipale** — rue de l'Église. Du lundi au vendredi, 8h – 12h et 13h30 – 18h. Tél. 02 31 35 25 25.

## DICRIM

Le document d'information communal sur les risques majeurs recense les risques auxquels la commune est exposée : inondation par débordement de l'Orne, transport de matières dangereuses, risque industriel, mouvement de terrain lié aux anciennes marnières.

Il est consultable en mairie et téléchargeable dans la rubrique publications.

## Opération tranquillité vacances

Signalez votre absence à la police municipale : des patrouilles passeront devant votre domicile. Le formulaire est à déposer au moins 48 heures avant le départ.

## Objets trouvés

Les objets trouvés sur la voie publique sont conservés un an au poste de police municipale. Les papiers d'identité sont restitués à la préfecture.

## Vidéoprotection

Vingt-deux caméras couvrent les espaces publics sensibles. Les images sont conservées quinze jours. Toute personne filmée peut demander à y accéder auprès du responsable du traitement.

## Numéros utiles

| Service | Numéro |
| --- | --- |
| Samu | 15 |
| Police secours | 17 |
| Pompiers | 18 |
| Numéro d'urgence européen | 112 |
| Urgence pour personnes sourdes ou malentendantes | 114 |
| Enfance en danger | 119 |
| Violences femmes info | 3919 |
| Police municipale | 02 31 35 25 25 |`,
    order: 5,
    status: "publie",
    updatedAt: "2026-04-10T10:00:00.000Z",
  },
  {
    id: "p-106",
    slug: "portail-famille",
    title: "Portail famille",
    section: "demarches",
    subsection: "Formalités administratives",
    summary: "Inscriptions scolaires et périscolaires, réservation des repas, paiement en ligne.",
    content: `Le portail famille regroupe l'ensemble des démarches liées à la scolarité et aux temps périscolaires.

## Ce que vous pouvez y faire

- Inscrire votre enfant à l'école, à la restauration et à l'accueil périscolaire
- Réserver ou annuler les repas jusqu'à 48 heures à l'avance
- Consulter les menus de la semaine
- Consulter et régler vos factures
- Mettre à jour votre quotient familial
- Télécharger vos attestations

## Créer un compte

La création du compte se fait au service Éducation, sur présentation d'une pièce d'identité et d'un justificatif de domicile. Les identifiants sont transmis par courriel.

## Tarification solidaire

Le tarif du repas est calculé sur le quotient familial, de 0,85 € à 4,60 €, réparti sur huit tranches. À défaut de transmission de l'avis d'imposition avant le 30 septembre, le tarif maximal est appliqué.

**Contact** : education@colombelles.fr — 02 31 35 25 12`,
    order: 6,
    status: "publie",
    updatedAt: "2026-08-30T10:00:00.000Z",
  },
  {
    id: "p-107",
    slug: "location-de-salles",
    title: "Location de salles et prêt de matériel",
    section: "demarches",
    summary: "Salles municipales, tarifs, conditions de réservation et matériel prêté aux associations.",
    content: `## Les salles disponibles

| Salle | Capacité | Tarif habitants | Tarif extérieurs |
| --- | --- | --- | --- |
| Salle des fêtes | 250 personnes | 380 € | 620 € |
| Salle Léo Lagrange | 90 personnes | 180 € | 300 € |
| Salle du Phénix | 45 personnes | 95 € | 160 € |
| Salle associative Jean-Jaurès | 30 personnes | 60 € | 110 € |

Tarifs pour un week-end. La location est gratuite pour les associations colombelloises, dans la limite de quatre utilisations par an.

## Conditions

- Réservation au plus tôt un an et au plus tard un mois avant la date
- Caution de 800 € et attestation d'assurance responsabilité civile obligatoires
- État des lieux d'entrée et de sortie contradictoire
- Nuisances sonores limitées après 22h ; fin impérative à 2h

## Prêt de matériel

Tables, bancs, chaises, barrières, grilles d'exposition, sonorisation légère et podium modulaire sont prêtés gratuitement aux associations de la commune. La demande doit être déposée au moins trois semaines à l'avance.

**Contact** : reservations@colombelles.fr — 02 31 35 25 18`,
    order: 7,
    status: "publie",
    updatedAt: "2026-02-20T10:00:00.000Z",
  },
  {
    id: "p-108",
    slug: "transports-et-deplacements",
    title: "Transports et déplacements",
    section: "demarches",
    subsection: "Transports et déplacements",
    summary: "Réseau Twisto, transport scolaire, covoiturage et itinéraires cyclables.",
    content: `## Transports en commun

Colombelles est desservie par le réseau Twisto de Caen la mer :
- **Ligne 3** : Colombelles ↔ Caen centre, toutes les 12 minutes en heure de pointe
- **Ligne 21** : desserte des quartiers et du Plateau
- **Tramway T1**, station Cité des Congrès à quinze minutes en bus

Tarifs solidaires selon le quotient familial. Gratuité pour les moins de 26 ans les week-ends.

## Transport scolaire

Les circuits scolaires desservant les collèges et lycées sont organisés par Caen la mer. L'inscription est annuelle et se fait en ligne avant le 15 juillet.

## Vélo

Sept kilomètres de pistes cyclables traversent la commune, dont la voie verte des berges de l'Orne qui relie Caen à Ouistreham. Deux stations de gonflage et de réparation en libre-service sont installées place François Mitterrand et à la halte nautique.

Le service Véol de location longue durée est accessible aux habitants.

## Covoiturage

Deux aires de covoiturage sont aménagées à l'entrée du Plateau et près de l'échangeur. La plateforme régionale met en relation les conducteurs et les passagers réguliers.`,
    order: 8,
    status: "publie",
    updatedAt: "2026-03-05T10:00:00.000Z",
  },

  /* ---------- Vivre à Colombelles ---------- */
  {
    id: "p-201",
    slug: "centre-communal-d-action-sociale",
    title: "Centre communal d'action sociale",
    section: "vivre-a-colombelles",
    subsection: "Solidarité",
    summary: "Aide sociale légale et facultative, accompagnement budgétaire, domiciliation, registre des personnes vulnérables.",
    content: `Le CCAS est un établissement public autonome présidé par la maire. Il met en œuvre l'action sociale de proximité.

## Ses missions

- Instruction des demandes d'aide sociale légale (APA, aide sociale à l'hébergement, RSA)
- Aides facultatives : secours d'urgence, aide alimentaire, aide au transport, aide à l'énergie
- Accompagnement budgétaire et lutte contre le surendettement
- Domiciliation des personnes sans domicile stable
- Tenue du registre des personnes vulnérables (canicule, grand froid)
- Portage de repas à domicile
- Téléassistance

## Prendre rendez-vous

Les travailleurs sociaux reçoivent sur rendez-vous du lundi au vendredi. Une permanence sans rendez-vous se tient le mardi de 9h à 11h30.

**CCAS** — place François Mitterrand — 02 31 35 25 20 — ccas@colombelles.fr

## Analyse des besoins sociaux

Le CCAS conduit tous les mandats une analyse des besoins sociaux du territoire. Le dernier rapport, publié en 2025, est consultable dans la rubrique publications.`,
    order: 1,
    status: "publie",
    updatedAt: "2026-05-30T10:00:00.000Z",
  },
  {
    id: "p-202",
    slug: "ecoles-maternelles-et-elementaires",
    title: "Écoles maternelles et élémentaires",
    section: "vivre-a-colombelles",
    subsection: "Éducation",
    summary: "Quatre groupes scolaires accueillent 780 élèves de la petite section au CM2.",
    content: `## Les groupes scolaires

**Groupe scolaire Henri-Sellier** — rue des Écoles
Maternelle (5 classes) et élémentaire (9 classes). Construit en 1934, réhabilité en 2019. Cour oasis livrée en 2026.

**Groupe scolaire Jacques-Prévert** — avenue de la Libération
Maternelle (4 classes) et élémentaire (7 classes).

**École maternelle Les Peupliers** — rue du Stade
3 classes, dont une classe passerelle.

**École élémentaire Paul-Langevin** — rue Jean-Jaurès
6 classes, dont un dispositif ULIS.

## Inscription

L'inscription se déroule en deux temps :
1. **En mairie**, service Éducation, à partir de mars : le certificat d'inscription est délivré sur présentation du livret de famille, d'un justificatif de domicile et du carnet de vaccination.
2. **À l'école**, auprès de la directrice ou du directeur, pour l'admission définitive.

## Dérogation

Une demande de dérogation à la carte scolaire peut être déposée pour motif de garde, de fratrie ou de parcours particulier. Les décisions sont notifiées en juin.

**Service Éducation** — 02 31 35 25 12 — education@colombelles.fr`,
    order: 2,
    status: "publie",
    updatedAt: "2026-09-01T10:00:00.000Z",
  },
  {
    id: "p-203",
    slug: "petite-enfance",
    title: "Petite enfance",
    section: "vivre-a-colombelles",
    subsection: "Petite enfance",
    summary: "Multi-accueil, relais petite enfance, assistantes maternelles et lieu d'accueil enfants-parents.",
    content: `## Trouver un mode de garde

Le relais petite enfance accompagne gratuitement les familles dans la recherche d'un mode d'accueil et informe les assistantes maternelles sur leur statut.

**Relais petite enfance** — 02 31 35 25 22. Permanences le lundi et le jeudi de 13h30 à 17h.

## Accueil collectif

Le multi-accueil **Les Lucioles** dispose de 36 places pour les enfants de 10 semaines à 4 ans, en accueil régulier ou occasionnel. Ouvert de 7h30 à 18h30 du lundi au vendredi.

Les demandes sont examinées par une commission d'attribution qui se réunit trois fois par an. Le dossier est à déposer dès le sixième mois de grossesse.

## Accueil individuel

Cinquante-deux assistantes maternelles agréées exercent sur la commune. La liste actualisée est disponible auprès du relais petite enfance et sur monenfant.fr.

## Lieu d'accueil enfants-parents

Espace de jeu libre et d'échange, ouvert sans inscription aux enfants de moins de 4 ans accompagnés d'un adulte. Les mardis et vendredis de 9h à 12h, au centre Léo Lagrange. Gratuit et anonyme.`,
    order: 3,
    status: "publie",
    updatedAt: "2026-04-22T10:00:00.000Z",
  },
  {
    id: "p-204",
    slug: "jeunesse",
    title: "Jeunesse",
    section: "vivre-a-colombelles",
    subsection: "Jeunesse",
    summary: "Local jeune, bourse aux collégiens et lycéens, médiateurs de rue, chantiers d'été.",
    content: `## Le Local jeune

Espace d'accueil pour les 11-17 ans : jeux, aide aux devoirs, projets, sorties, séjours. Ouvert les mercredis et samedis de 14h à 18h, tous les jours pendant les vacances.

Adhésion annuelle : 8 €.

## Bourse aux collégiens et lycéens

La commune verse une aide annuelle aux familles colombelloises dont les enfants sont scolarisés au collège ou au lycée :
- Collège : 60 €
- Lycée général et technologique : 90 €
- Lycée professionnel et apprentissage : 110 €

Conditions de ressources. Dossier à déposer au CCAS avant le 31 octobre.

## Chantiers jeunes

Chaque été, la commune propose vingt chantiers d'une semaine aux 16-18 ans : espaces verts, peinture, animation, patrimoine. Rémunération sous forme de bourse projet de 250 €.

## Médiateurs

Deux médiateurs de rue interviennent en soirée sur l'espace public, en lien avec les associations et les bailleurs. Ils assurent une veille, une écoute et une orientation.

**Service Jeunesse** — 02 31 35 25 35 — jeunesse@colombelles.fr`,
    order: 4,
    status: "publie",
    updatedAt: "2026-06-18T10:00:00.000Z",
  },
  {
    id: "p-205",
    slug: "seniors",
    title: "Seniors",
    section: "vivre-a-colombelles",
    subsection: "Séniors",
    summary: "Résidence Jean-Goueslard, portage de repas, animations, téléassistance et registre canicule.",
    content: `## Résidence autonomie Jean-Goueslard

Soixante-douze logements du T1 au T2, destinés aux personnes âgées autonomes. Restaurant, animations quotidiennes, présence d'un agent 24 heures sur 24.

Le dossier d'admission est instruit par le CCAS. Tarif mensuel de 620 € à 890 € selon le logement, aide au logement possible.

## Portage de repas

Repas livrés à domicile du lundi au vendredi, avec possibilité de commander pour le week-end. Menus adaptés aux régimes sans sel, diabétiques et mixés. Tarif : 7,20 € le repas.

## Téléassistance

Dispositif d'alerte 24 heures sur 24, installé au domicile. 18 € par mois, déductibles fiscalement à 50 %.

## Animations

Le club des aînés propose chaque semaine ateliers mémoire, gymnastique douce, jeux de société et sorties. Le repas des aînés réunit chaque janvier plus de trois cents convives.

## Registre des personnes vulnérables

L'inscription, volontaire et gratuite, permet un suivi téléphonique en cas de canicule ou de grand froid.

**CCAS** — 02 31 35 25 20`,
    order: 5,
    status: "publie",
    updatedAt: "2026-06-02T10:00:00.000Z",
  },
  {
    id: "p-206",
    slug: "sport-et-equipements-sportifs",
    title: "Sport et équipements sportifs",
    section: "vivre-a-colombelles",
    subsection: "Sport",
    summary: "Gymnases, stades, piscine, skate park, pumptrack et parcours d'orientation permanent.",
    content: `## Les équipements

- **Gymnase Marcel-Cerdan** — salle omnisports, mur d'escalade, dojo
- **Complexe sportif du Plateau** — deux terrains de football, une piste d'athlétisme
- **Stade Jean-Bouin** — terrain d'honneur en gazon naturel, tribune de 400 places
- **City-stade** — accès libre, rue du Stade
- **Skate park** — 900 m², accès libre
- **Pumptrack** — piste bitumée pour vélos et trottinettes, accès libre
- **Terrain de pétanque** — douze jeux, accès libre
- **Piscine intercommunale** — à Hérouville-Saint-Clair, tarif préférentiel pour les Colombellois

## Labels

La commune est labellisée **Terre de Jeux 2024** et **Ville active et sportive** (deux lauriers).

## Course d'orientation permanente

Trois parcours balisés de 2, 4 et 7 kilomètres traversent la commune et les berges de l'Orne. Les cartes sont disponibles gratuitement à l'accueil de la mairie et de la médiathèque.

## Créneaux associatifs

Les demandes de créneaux sont instruites en juin pour la saison suivante. Elles sont à adresser au service des sports.

**Service des sports** — 02 31 35 25 38 — sports@colombelles.fr`,
    order: 6,
    status: "publie",
    updatedAt: "2026-07-01T10:00:00.000Z",
  },
  {
    id: "p-207",
    slug: "environnement-et-biodiversite",
    title: "Environnement et biodiversité",
    section: "vivre-a-colombelles",
    subsection: "Environnement",
    summary: "Zéro phyto, gestion différenciée, atlas de la biodiversité, plan de renaturation.",
    content: `## Zéro produit phytosanitaire

La commune n'utilise plus aucun produit phytosanitaire depuis 2015 pour l'entretien de ses 22 hectares d'espaces verts. Le désherbage est mécanique, thermique ou manuel.

## Gestion différenciée

Les espaces sont entretenus selon leur usage : tonte régulière des aires de jeux, fauche tardive des prairies, éco-pâturage sur les talus du Plateau avec un troupeau de moutons d'Ouessant.

## Atlas de la biodiversité communale

Réalisé en 2024 avec le conservatoire d'espaces naturels, il recense 412 espèces sur le territoire, dont dix-huit protégées. Le crapaud calamite et l'œdicnème criard ont colonisé les friches de l'ancien site industriel.

## Plan de renaturation

Objectif : désimperméabiliser 1,5 hectare d'ici 2030 et planter mille arbres. Les cours d'école, les abords des équipements publics et les parkings sont concernés en priorité.

## Coulée verte

Trois kilomètres d'espaces continus relient le centre-bourg aux berges de l'Orne. Le corridor écologique est géré en partenariat avec la communauté urbaine.`,
    order: 7,
    status: "publie",
    updatedAt: "2026-05-08T10:00:00.000Z",
  },

  /* ---------- Sortir et découvrir ---------- */
  {
    id: "p-301",
    slug: "societe-metallurgique-de-normandie",
    title: "La Société métallurgique de Normandie",
    section: "sortir-et-decouvrir",
    subsection: "Patrimoine",
    summary:
      "De 1909 à 1993, l'usine a façonné la ville, son paysage et sa population. Récit d'une aventure industrielle et de sa reconversion.",
    content: `En 1909, l'industriel allemand August Thyssen choisit les rives de l'Orne pour implanter une usine sidérurgique intégrée. Le minerai de fer normand est proche, le canal permet d'acheminer le charbon, la mer n'est qu'à quinze kilomètres.

## L'usine qui a fait la ville

La Société métallurgique de Normandie entre en production en 1917. Autour d'elle, Colombelles se transforme : la population passe de 178 habitants en 1914 à 2 301 en 1921. L'entreprise construit une cité ouvrière, des écoles, un dispensaire, une coopérative, un stade. On y parle français, polonais, italien, espagnol, algérien.

## Le paysage sidérurgique

Le site comptait jusqu'à quatre hauts fourneaux, une aciérie Thomas puis à l'oxygène, une cokerie, des laminoirs. La **tour de refroidissement** de 1963, haute de 66 mètres, et le **bâtiment des soufflantes** sont aujourd'hui les vestiges les plus visibles. Ils sont protégés au titre du patrimoine industriel.

## La guerre

En 1944, Colombelles est au cœur de la bataille de Caen. Les hauts fourneaux servent d'observatoire à l'armée allemande et deviennent une cible prioritaire. La commune est détruite à 80 %. Elle reçoit la Croix de guerre en 1948. Il faudra attendre 1952 pour que la production retrouve son niveau d'avant-guerre.

## L'apogée et la fin

Au milieu des années 1970, l'usine emploie près de 6 000 personnes et produit 1,7 million de tonnes d'acier par an. La crise sidérurgique européenne, la concurrence et l'épuisement du minerai normand ont raison de l'établissement : la dernière coulée a lieu le 6 novembre 1993.

## Une seconde vie

Les 300 hectares dépollués accueillent aujourd'hui un parc d'activités, des entreprises du numérique, un pôle de formation et de nouveaux quartiers. Un parcours d'interprétation en douze stations, inauguré au printemps 2027, racontera cette histoire sur les lieux mêmes où elle s'est déroulée.

## Pour aller plus loin

- Fonds d'archives de la SMN, archives départementales du Calvados
- Association Mémoire de la SMN — collecte de témoignages et visites guidées
- Exposition permanente à la médiathèque Le Phénix`,
    order: 1,
    status: "publie",
    updatedAt: "2026-06-16T10:00:00.000Z",
  },
  {
    id: "p-302",
    slug: "historique-de-colombelles",
    title: "Historique de Colombelles",
    section: "sortir-et-decouvrir",
    subsection: "Patrimoine",
    summary: "Du gué médiéval à la ville industrielle : mille ans d'histoire en quelques dates.",
    content: `## Les origines

Le nom de Colombelles apparaît au XIᵉ siècle. Le hameau s'est formé autour d'un gué puis d'un bac sur l'Orne. Au XIVᵉ siècle, il ne compte que « huit feux », soit une cinquantaine d'habitants.

## L'Ancien Régime

Colombelles reste un village agricole de la plaine de Caen, marqué par la culture céréalière et l'élevage. Le château, aujourd'hui occupé par une école, date du XVIIIᵉ siècle.

## Le tournant industriel

- **1909** — August Thyssen acquiert les terrains
- **1917** — Première coulée de la SMN
- **1921** — 2 301 habitants
- **1922** — Inauguration de la mairie et de la maison du peuple
- **1934** — Construction du groupe scolaire Henri-Sellier
- **1936** — Grèves du Front populaire ; l'usine emploie 4 000 personnes

## Guerre et reconstruction

- **1944** — 80 % de la commune détruite pendant la bataille de Caen
- **1948** — Attribution de la Croix de guerre
- **1952** — Retour au niveau de production d'avant-guerre

## L'après-usine

- **1993** — Fermeture de la SMN
- **2006** — Lancement du renouvellement urbain
- **2010** — Premières implantations sur Le Plateau
- **2020** — Livraison des premiers logements du quartier Libéra
- **2026** — Consolidation de la tour de refroidissement et lancement du parcours d'interprétation`,
    order: 2,
    status: "publie",
    updatedAt: "2026-06-16T10:00:00.000Z",
  },
  {
    id: "p-303",
    slug: "mediatheque-le-phenix",
    title: "Médiathèque Le Phénix",
    section: "sortir-et-decouvrir",
    subsection: "Équipements culturels",
    summary: "45 000 documents, une Micro-Folie, un espace public numérique et un mini-lab.",
    content: `Ouverte en 2014, la médiathèque Le Phénix doit son nom à la renaissance de la commune après la fermeture de l'usine.

## Les collections

45 000 documents : livres, bandes dessinées, revues, CD, DVD, jeux vidéo, jeux de société, partitions. Un fonds local consacré à l'histoire industrielle est consultable sur place.

## Horaires

| Jour | Horaires |
| --- | --- |
| Mardi | 14h – 18h |
| Mercredi | 10h – 18h |
| Jeudi | 14h – 18h |
| Vendredi | 14h – 19h |
| Samedi | 10h – 17h |
| Dimanche | 10h – 13h |

## Inscription

Gratuite pour tous les habitants de Caen la mer. Prêt de dix documents pour trois semaines, renouvelable en ligne.

## La Micro-Folie

Musée numérique donnant accès aux collections du Louvre, d'Orsay, du Centre Pompidou, de Versailles et de huit autres institutions. Séances libres et visites commentées.

## Le Mini-Lab

Atelier de fabrication numérique : imprimante 3D, découpeuse vinyle, brodeuse numérique, station de retouche. Accès sur adhésion, après une séance d'initiation.

## Espace public numérique

Huit postes en accès libre, accompagnement aux démarches en ligne, ateliers hebdomadaires. Un conseiller numérique France Services assure des permanences le mardi et le jeudi.

**Médiathèque Le Phénix** — rue de la Culture — 02 31 35 25 40`,
    order: 3,
    status: "publie",
    updatedAt: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "p-304",
    slug: "theatre-la-renaissance",
    title: "Théâtre La Renaissance",
    section: "sortir-et-decouvrir",
    subsection: "Équipements culturels",
    summary: "Salle de 320 places, saison pluridisciplinaire de septembre à juin.",
    content: `Le théâtre La Renaissance propose une saison d'une vingtaine de spectacles : théâtre, musique, danse, cirque, jeune public.

## Tarifs

- Plein tarif : 12 €
- Tarif réduit (étudiants, demandeurs d'emploi, plus de 65 ans) : 8 €
- Tarif Colombellois : 5 €
- Moins de 12 ans : 3 €
- Abonnement quatre spectacles : 32 €

## Réservation

En ligne, par téléphone au 02 31 35 25 45, ou à la billetterie une heure avant chaque représentation.

## Accessibilité

La salle est accessible aux personnes à mobilité réduite. Une boucle magnétique est installée. Trois spectacles par saison sont audio-décrits ou interprétés en langue des signes.

## Accueil des associations

La salle peut être mise à disposition des associations colombelloises pour leurs manifestations, sous réserve de disponibilité et d'un accompagnement technique.`,
    order: 4,
    status: "publie",
    updatedAt: "2026-07-10T10:00:00.000Z",
  },
  {
    id: "p-305",
    slug: "nature-et-balades",
    title: "Nature et balades",
    section: "sortir-et-decouvrir",
    subsection: "Nature",
    summary: "Berges de l'Orne, coulée verte, jardins partagés et trois itinéraires balisés.",
    content: `## Côté bleu — les berges de l'Orne

La voie verte longe le fleuve sur trois kilomètres et rejoint Caen à l'ouest, Ouistreham et la mer au nord. Halte nautique, pontons de pêche, aire de pique-nique.

## Côté vert — la coulée verte

Corridor écologique reliant le centre-bourg aux berges. Prairies fleuries, vergers, mare pédagogique, ruchers communaux.

## Les jardins

- **Jardins familiaux du Plateau** — 48 parcelles de 100 m², attribuées sur liste d'attente
- **Jardin partagé Jean-Jaurès** — animé par un collectif d'habitants
- **Verger conservatoire** — vingt variétés anciennes de pommes normandes

## Trois balades balisées

| Itinéraire | Distance | Durée | Balisage |
| --- | --- | --- | --- |
| Boucle du bourg | 2,4 km | 45 min | Jaune |
| Chemin de l'Orne | 5,1 km | 1h30 | Bleu |
| Sentier de la mémoire industrielle | 7,3 km | 2h15 | Rouge |

Les fiches détaillées sont disponibles à l'accueil de la mairie et en téléchargement.`,
    order: 5,
    status: "publie",
    updatedAt: "2026-04-28T10:00:00.000Z",
  },
  {
    id: "p-306",
    slug: "lieux-de-vie",
    title: "Lieux de vie",
    section: "sortir-et-decouvrir",
    subsection: "Lieux de vie",
    summary: "Centre Léo Lagrange, café participatif, espace jeux vidéo, mini-lab et local jeune.",
    content: `## Centre socio-culturel et sportif Léo Lagrange

Cœur de la vie sociale colombelloise : accueil de loisirs, ateliers, permanences associatives, accompagnement à la scolarité, actions familles. Agréé centre social par la CAF.

Ouvert du lundi au vendredi de 9h à 19h, le samedi de 9h à 17h.

## Le café participatif

Espace de convivialité géré par un collectif d'habitants. Boissons à prix libre, ateliers de réparation, repas partagés, permanences numériques. Ouvert les mercredis et vendredis après-midi.

## Espace jeux vidéo

Consoles et postes de jeu en réseau, tournois mensuels, ateliers de création. Ouvert aux 10-25 ans, encadré par un animateur.

## Le Mini-Lab

Fabrication numérique et bricolage à la médiathèque.

## Le Local jeune

Accueil des 11-17 ans, projets et sorties.

## Lieu d'accueil enfants-parents

Espace de jeu libre pour les moins de 4 ans accompagnés d'un adulte. Gratuit, sans inscription.`,
    order: 6,
    status: "publie",
    updatedAt: "2026-03-30T10:00:00.000Z",
  },

  /* ---------- Institutionnel ---------- */
  {
    id: "p-901",
    slug: "mentions-legales",
    title: "Mentions légales",
    section: "institutionnel",
    summary: "Éditeur, directeur de publication, hébergement et propriété intellectuelle.",
    content: `## Éditeur du site

Ville de Colombelles
Place François Mitterrand — 14460 Colombelles
Téléphone : 02 31 35 25 00
Courriel : accueil@colombelles.fr

## Directrice de la publication

La maire de Colombelles.

## Conception et réalisation

Service communication de la Ville de Colombelles.

## Hébergement

Le site est hébergé sur une infrastructure située dans l'Union européenne. Les coordonnées complètes de l'hébergeur sont communiquées sur demande écrite adressée à la mairie.

## Propriété intellectuelle

L'ensemble des contenus de ce site (textes, images, éléments graphiques, structure) est la propriété de la Ville de Colombelles ou fait l'objet d'une autorisation d'usage, sauf mention contraire.

Toute reproduction, représentation ou diffusion, totale ou partielle, sur quelque support que ce soit, est soumise à autorisation préalable. Les informations publiques brutes sont en revanche librement réutilisables dans les conditions prévues par le code des relations entre le public et l'administration.

## Liens hypertextes

La mise en place de liens vers ce site est libre. La Ville de Colombelles n'exerce aucun contrôle sur les sites tiers vers lesquels elle renvoie et décline toute responsabilité quant à leur contenu.

## Crédits

Police de caractères : Geist, distribuée sous licence SIL Open Font License 1.1.`,
    order: 1,
    status: "publie",
    updatedAt: "2026-01-08T10:00:00.000Z",
  },
  {
    id: "p-902",
    slug: "donnees-personnelles",
    title: "Données personnelles",
    section: "institutionnel",
    summary: "Traitements mis en œuvre, bases légales, durées de conservation et exercice des droits.",
    content: `La Ville de Colombelles traite des données à caractère personnel dans le respect du règlement général sur la protection des données et de la loi Informatique et Libertés.

## Responsable de traitement

Ville de Colombelles, représentée par la maire, place François Mitterrand, 14460 Colombelles.

## Traitements mis en œuvre sur ce site

| Traitement | Finalité | Base légale | Conservation |
| --- | --- | --- | --- |
| Formulaire de contact | Répondre aux demandes | Mission d'intérêt public | 12 mois |
| Signalement d'incident | Traiter les dysfonctionnements de l'espace public | Mission d'intérêt public | 24 mois |
| Mesure d'audience | Améliorer le service | Intérêt légitime | 13 mois, données anonymisées |

## Destinataires

Les données sont exclusivement destinées aux services municipaux compétents. Elles ne font l'objet d'aucune cession ni d'aucun transfert hors de l'Union européenne.

## Cookies

Ce site ne dépose aucun cookie publicitaire ni traceur tiers. Seuls sont utilisés les cookies strictement nécessaires au fonctionnement du site et à la sécurisation de l'espace d'administration.

## Vos droits

Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition. Ces droits s'exercent auprès du délégué à la protection des données :

dpo@colombelles.fr — ou par courrier à l'adresse de la mairie, à l'attention du DPO.

En cas de désaccord, vous pouvez saisir la Commission nationale de l'informatique et des libertés (CNIL), 3 place de Fontenoy, 75007 Paris.`,
    order: 2,
    status: "publie",
    updatedAt: "2026-01-08T10:00:00.000Z",
  },
  {
    id: "p-903",
    slug: "accessibilite",
    title: "Accessibilité : partiellement conforme",
    section: "institutionnel",
    summary: "Déclaration d'accessibilité au titre du RGAA 4.1.",
    content: `La Ville de Colombelles s'engage à rendre son site internet accessible conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.

## État de conformité

Le site est **partiellement conforme** au référentiel général d'amélioration de l'accessibilité (RGAA), version 4.1, en raison des non-conformités listées ci-dessous.

## Résultats des tests

L'audit réalisé en juin 2026 révèle que **87 % des critères RGAA sont respectés**.

## Contenus non accessibles

- Certains documents PDF antérieurs à 2024 ne sont pas structurés pour la lecture par synthèse vocale.
- Le plan interactif fourni par un prestataire tiers n'est pas entièrement navigable au clavier.
- Quelques images d'archives ne disposent pas d'alternative textuelle détaillée.

Ces contenus feront l'objet d'une reprise progressive d'ici décembre 2027.

## Améliorations apportées

- Navigation intégralement possible au clavier
- Contrastes conformes au niveau AA sur l'ensemble des composants
- Structure de titres hiérarchisée sur toutes les pages
- Lien d'évitement vers le contenu principal
- Respect de la préférence système de réduction des animations

## Retour d'information

Si vous ne parvenez pas à accéder à un contenu ou à un service, contactez-nous : accessibilite@colombelles.fr ou 02 31 35 25 00. Nous vous indiquerons une alternative.

## Voie de recours

Si vous constatez un défaut d'accessibilité vous empêchant d'accéder à un contenu et que vous n'obtenez pas de réponse satisfaisante, vous pouvez :
- écrire au Défenseur des droits ;
- contacter le délégué du Défenseur des droits de votre département ;
- envoyer un courrier (gratuit, sans timbre) au Défenseur des droits, libre réponse 71120, 75342 Paris CEDEX 07.

Déclaration établie le 20 juin 2026.`,
    order: 3,
    status: "publie",
    updatedAt: "2026-06-20T10:00:00.000Z",
  },
];

const documents: DocumentItem[] = [
  { id: "d-001", title: "Guide des associations 2026-2027", category: "Vie associative", url: "/documents/guide-associations-2026-2027.pdf", fileType: "PDF", size: "4,2 Mo", publishedAt: "2026-08-25T10:00:00.000Z", status: "publie" },
  { id: "d-002", title: "Budget primitif 2026 — note de présentation", category: "Finances", url: "/documents/budget-primitif-2026.pdf", fileType: "PDF", size: "1,8 Mo", publishedAt: "2026-03-26T10:00:00.000Z", status: "publie" },
  { id: "d-003", title: "Procès-verbal du conseil municipal du 24 juin 2026", category: "Conseil municipal", url: "/documents/pv-conseil-2026-06-24.pdf", fileType: "PDF", size: "620 Ko", publishedAt: "2026-07-08T10:00:00.000Z", status: "publie" },
  { id: "d-004", title: "Procès-verbal du conseil municipal du 25 mars 2026", category: "Conseil municipal", url: "/documents/pv-conseil-2026-03-25.pdf", fileType: "PDF", size: "710 Ko", publishedAt: "2026-04-10T10:00:00.000Z", status: "publie" },
  { id: "d-005", title: "DICRIM — Document d'information communal sur les risques majeurs", category: "Sécurité", url: "/documents/dicrim-colombelles.pdf", fileType: "PDF", size: "3,1 Mo", publishedAt: "2026-04-10T10:00:00.000Z", status: "publie" },
  { id: "d-006", title: "Calendrier de collecte des déchets 2026-2027", category: "Environnement", url: "/documents/calendrier-collecte-2026.pdf", fileType: "PDF", size: "890 Ko", publishedAt: "2026-08-18T10:00:00.000Z", status: "publie" },
  { id: "d-007", title: "Colombelles Magazine — n° 78, été 2026", category: "Journal municipal", url: "/documents/magazine-78.pdf", fileType: "PDF", size: "6,4 Mo", publishedAt: "2026-06-30T10:00:00.000Z", status: "publie" },
  { id: "d-008", title: "Colombelles Magazine — n° 77, printemps 2026", category: "Journal municipal", url: "/documents/magazine-77.pdf", fileType: "PDF", size: "6,1 Mo", publishedAt: "2026-03-31T10:00:00.000Z", status: "publie" },
  { id: "d-009", title: "Analyse des besoins sociaux 2025", category: "Solidarité", url: "/documents/abs-2025.pdf", fileType: "PDF", size: "2,7 Mo", publishedAt: "2025-11-20T10:00:00.000Z", status: "publie" },
  { id: "d-010", title: "Atlas de la biodiversité communale", category: "Environnement", url: "/documents/atlas-biodiversite.pdf", fileType: "PDF", size: "12,3 Mo", publishedAt: "2024-10-15T10:00:00.000Z", status: "publie" },
  { id: "d-011", title: "Règlement intérieur des salles municipales", category: "Vie municipale", url: "/documents/reglement-salles.pdf", fileType: "PDF", size: "340 Ko", publishedAt: "2026-02-20T10:00:00.000Z", status: "publie" },
  { id: "d-012", title: "Fiches de randonnée — les trois boucles", category: "Tourisme", url: "/documents/fiches-randonnee.pdf", fileType: "PDF", size: "5,5 Mo", publishedAt: "2026-04-28T10:00:00.000Z", status: "publie" },
  { id: "d-013", title: "Rapport annuel sur le prix et la qualité de l'eau 2025", category: "Environnement", url: "/documents/rpqs-eau-2025.pdf", fileType: "PDF", size: "1,4 Mo", publishedAt: "2026-09-01T10:00:00.000Z", status: "brouillon" },
];

const elus: Elu[] = [
  { id: "el-001", name: "Anne Verdier", role: "Maire", delegation: "Sécurité, ressources humaines, communication", group: "Majorité municipale", order: 1, email: "cabinet@colombelles.fr", permanence: "Sur rendez-vous, le samedi matin" },
  { id: "el-002", name: "Karim Bellanger", role: "1ᵉʳ adjoint", delegation: "Finances et commande publique", group: "Majorité municipale", order: 2, email: "adjoints@colombelles.fr" },
  { id: "el-003", name: "Sophie Renouf", role: "2ᵉ adjointe", delegation: "Éducation, enfance et jeunesse", group: "Majorité municipale", order: 3, email: "adjoints@colombelles.fr" },
  { id: "el-004", name: "Marc Delaunay", role: "3ᵉ adjoint", delegation: "Urbanisme, travaux et grands projets", group: "Majorité municipale", order: 4, email: "adjoints@colombelles.fr" },
  { id: "el-005", name: "Fatou Diallo", role: "4ᵉ adjointe", delegation: "Solidarité, santé et logement", group: "Majorité municipale", order: 5, email: "adjoints@colombelles.fr" },
  { id: "el-006", name: "Yannick Leprêtre", role: "5ᵉ adjoint", delegation: "Sports et vie associative", group: "Majorité municipale", order: 6, email: "adjoints@colombelles.fr" },
  { id: "el-007", name: "Claire Hamon", role: "6ᵉ adjointe", delegation: "Culture et patrimoine", group: "Majorité municipale", order: 7, email: "adjoints@colombelles.fr" },
  { id: "el-008", name: "Étienne Faucon", role: "7ᵉ adjoint", delegation: "Transition écologique et mobilités", group: "Majorité municipale", order: 8, email: "adjoints@colombelles.fr" },
  { id: "el-009", name: "Nadia Boucher", role: "Conseillère municipale déléguée", delegation: "Démocratie locale et budget participatif", group: "Majorité municipale", order: 9 },
  { id: "el-010", name: "Pierre Lemarchand", role: "Conseiller municipal délégué", delegation: "Commerce et attractivité", group: "Majorité municipale", order: 10 },
  { id: "el-011", name: "Julie Vasseur", role: "Conseillère municipale déléguée", delegation: "Seniors et intergénérationnel", group: "Majorité municipale", order: 11 },
  { id: "el-012", name: "Thomas Grandin", role: "Conseiller municipal", delegation: "—", group: "Majorité municipale", order: 12 },
  { id: "el-013", name: "Léa Marchand", role: "Conseillère municipale", delegation: "—", group: "Majorité municipale", order: 13 },
  { id: "el-014", name: "Olivier Bassin", role: "Conseiller municipal", delegation: "—", group: "Majorité municipale", order: 14 },
  { id: "el-015", name: "Christelle Aubin", role: "Conseillère municipale", delegation: "—", group: "Majorité municipale", order: 15 },
  { id: "el-016", name: "Samir Toumi", role: "Conseiller municipal", delegation: "—", group: "Majorité municipale", order: 16 },
  { id: "el-017", name: "Hélène Prigent", role: "Conseillère municipale", delegation: "—", group: "Majorité municipale", order: 17 },
  { id: "el-018", name: "Damien Rousseau", role: "Conseiller municipal", delegation: "—", group: "Majorité municipale", order: 18 },
  { id: "el-019", name: "Valérie Chauvin", role: "Conseillère municipale", delegation: "—", group: "Majorité municipale", order: 19 },
  { id: "el-020", name: "Bruno Lecoq", role: "Conseiller municipal", delegation: "—", group: "Majorité municipale", order: 20 },
  { id: "el-021", name: "Amandine Girard", role: "Conseillère municipale", delegation: "—", group: "Majorité municipale", order: 21 },
  { id: "el-022", name: "Gérard Lefèvre", role: "Conseiller municipal", delegation: "—", group: "Colombelles autrement", order: 22 },
  { id: "el-023", name: "Sylvie Morin", role: "Conseillère municipale", delegation: "—", group: "Colombelles autrement", order: 23 },
  { id: "el-024", name: "Antoine Delisle", role: "Conseiller municipal", delegation: "—", group: "Colombelles autrement", order: 24 },
  { id: "el-025", name: "Marion Quesnel", role: "Conseillère municipale", delegation: "—", group: "Vivre Colombelles", order: 25 },
  { id: "el-026", name: "Frédéric Auvray", role: "Conseiller municipal", delegation: "—", group: "Vivre Colombelles", order: 26 },
  { id: "el-027", name: "Inès Ferrand", role: "Conseillère municipale", delegation: "—", group: "Vivre Colombelles", order: 27 },
];

const services: ServiceItem[] = [
  { id: "s-001", name: "Accueil — état civil", description: "Actes d'état civil, cartes d'identité et passeports, recensement citoyen, attestations, inscriptions sur les listes électorales.", phone: "02 31 35 25 05", email: "etat-civil@colombelles.fr", hours: "Lun. 8h30-12h30 / 13h30-18h · Mar. à ven. 8h30-12h30 / 13h30-17h · Sam. 9h-12h", address: "Hôtel de ville — rez-de-chaussée", order: 1 },
  { id: "s-002", name: "Service Éducation", description: "Inscriptions scolaires, restauration, accueil périscolaire et extrascolaire, portail famille.", phone: "02 31 35 25 12", email: "education@colombelles.fr", hours: "Du lundi au vendredi, 8h30-12h30 / 13h30-17h", address: "Hôtel de ville — 1ᵉʳ étage", order: 2 },
  { id: "s-003", name: "Centre communal d'action sociale", description: "Aides sociales, accompagnement budgétaire, domiciliation, portage de repas, téléassistance, registre des personnes vulnérables.", phone: "02 31 35 25 20", email: "ccas@colombelles.fr", hours: "Sur rendez-vous · permanence libre le mardi 9h-11h30", address: "Place François Mitterrand", order: 3 },
  { id: "s-004", name: "Service Urbanisme", description: "Autorisations d'urbanisme, PLUi, certificats, droit de préemption, adressage.", phone: "02 31 35 25 32", email: "urbanisme@colombelles.fr", hours: "Permanence sans rendez-vous le mardi 9h-12h · sinon sur rendez-vous", address: "Hôtel de ville — 1ᵉʳ étage", order: 4 },
  { id: "s-005", name: "Services techniques", description: "Voirie, bâtiments, espaces verts, propreté, interventions sur le domaine public.", phone: "02 31 35 25 30", email: "technique@colombelles.fr", hours: "Du lundi au vendredi, 8h-12h / 13h30-17h", address: "Centre technique municipal, rue de l'Industrie", order: 5 },
  { id: "s-006", name: "Police municipale", description: "Tranquillité publique, circulation et stationnement, objets trouvés, opération tranquillité vacances, procurations.", phone: "02 31 35 25 25", email: "police@colombelles.fr", hours: "Du lundi au vendredi, 8h-12h / 13h30-18h", address: "Rue de l'Église", order: 6 },
  { id: "s-007", name: "Service des sports et de la vie associative", description: "Créneaux des équipements, subventions, forum des associations, prêt de matériel.", phone: "02 31 35 25 38", email: "sports@colombelles.fr", hours: "Du lundi au vendredi, 9h-12h / 14h-17h", address: "Gymnase Marcel-Cerdan", order: 7 },
  { id: "s-008", name: "Service Culture", description: "Programmation du théâtre, médiathèque, conservatoire, patrimoine, Micro-Folie.", phone: "02 31 35 25 45", email: "culture@colombelles.fr", hours: "Du mardi au samedi", address: "Médiathèque Le Phénix", order: 8 },
  { id: "s-009", name: "Service Jeunesse", description: "Local jeune, chantiers d'été, bourses, médiation, projets des 11-25 ans.", phone: "02 31 35 25 35", email: "jeunesse@colombelles.fr", hours: "Mercredi et samedi 14h-18h · tous les jours pendant les vacances", address: "Centre Léo Lagrange", order: 9 },
  { id: "s-010", name: "Réglementation et réservations", description: "Location de salles, droits de place, débits de boissons, occupation du domaine public, marché.", phone: "02 31 35 25 18", email: "reglementation@colombelles.fr", hours: "Du lundi au vendredi, 9h-12h", address: "Hôtel de ville — rez-de-chaussée", order: 10 },
];

const directory: DirectoryItem[] = [
  { id: "a-001", name: "Union sportive de Colombelles — Football", type: "association", category: "Sport", description: "Football de l'école de foot aux seniors, plus de 300 licenciés.", address: "Stade Jean-Bouin, rue du Stade", phone: "02 31 72 14 05", email: "contact@usc-football.fr", status: "publie" },
  { id: "a-002", name: "Colombelles Basket Club", type: "association", category: "Sport", description: "Basket-ball loisir et compétition, catégories U9 à seniors.", address: "Gymnase Marcel-Cerdan", email: "cbc14@sport.fr", status: "publie" },
  { id: "a-003", name: "Mémoire de la SMN", type: "association", category: "Patrimoine", description: "Collecte de témoignages, archives et visites guidées de l'ancien site sidérurgique.", address: "Médiathèque Le Phénix", email: "memoire.smn@assoc.fr", status: "publie" },
  { id: "a-004", name: "Les Jardins de l'Orne", type: "association", category: "Environnement", description: "Jardins partagés, ateliers de permaculture, grainothèque.", address: "Coulée verte, chemin des Berges", status: "publie" },
  { id: "a-005", name: "Secours populaire — antenne de Colombelles", type: "association", category: "Solidarité", description: "Aide alimentaire, vestiaire, accès aux droits et Solidaribus.", address: "Rue Jean-Jaurès", phone: "02 31 82 00 00", status: "publie" },
  { id: "a-006", name: "Compagnie du Phénix", type: "association", category: "Culture", description: "Théâtre amateur, ateliers enfants et adultes, création annuelle.", address: "Théâtre La Renaissance", status: "publie" },
  { id: "a-007", name: "Amicale des anciens de Colombelles", type: "association", category: "Seniors", description: "Sorties, ateliers, repas et voyages pour les plus de 60 ans.", address: "Centre Léo Lagrange", status: "publie" },
  { id: "a-008", name: "Colombelles Judo", type: "association", category: "Sport", description: "Judo, jujitsu et taïso, à partir de 4 ans.", address: "Dojo du gymnase Marcel-Cerdan", status: "publie" },
  { id: "a-009", name: "Vélo Club des Rives de l'Orne", type: "association", category: "Sport", description: "Sorties route et VTT, école de vélo, atelier de réparation participatif.", address: "Halte nautique", status: "publie" },
  { id: "a-010", name: "Boulangerie du Bourg", type: "commerce", category: "Alimentation", description: "Pains au levain, viennoiseries, pâtisserie. Fermé le lundi.", address: "12 place François Mitterrand", phone: "02 31 72 30 11", status: "publie" },
  { id: "a-011", name: "Pharmacie de Colombelles", type: "commerce", category: "Santé", description: "Officine, orthopédie, matériel médical. Garde selon planning départemental.", address: "4 rue de l'Église", phone: "02 31 72 08 44", status: "publie" },
  { id: "a-012", name: "Le Comptoir normand", type: "commerce", category: "Restauration", description: "Restaurant traditionnel, formule du midi en semaine.", address: "8 rue Jean-Jaurès", phone: "02 31 72 55 90", status: "publie" },
  { id: "a-013", name: "Supérette Coopérative", type: "commerce", category: "Alimentation", description: "Épicerie de proximité, produits locaux, dépôt de pain le lundi.", address: "22 avenue de la Libération", status: "publie" },
  { id: "a-014", name: "Garage de l'Orne", type: "commerce", category: "Automobile", description: "Mécanique toutes marques, contrôle technique partenaire.", address: "Zone d'activités du Plateau", phone: "02 31 72 41 77", status: "publie" },
  { id: "a-015", name: "Maison de santé pluriprofessionnelle", type: "equipement", category: "Santé", description: "Médecins généralistes, infirmiers, kinésithérapeutes, sage-femme, podologue.", address: "3 rue du Docteur-Roux", phone: "02 31 72 90 00", status: "publie" },
  { id: "a-016", name: "Bureau de poste", type: "equipement", category: "Service public", description: "Courrier, colis, services bancaires. Du lundi au vendredi 9h-12h / 14h-17h, samedi 9h-12h.", address: "Place François Mitterrand", status: "publie" },
  { id: "a-017", name: "Conservatoire de musique et de danse", type: "equipement", category: "Culture", description: "Enseignement artistique, une quinzaine de disciplines, orchestre junior.", address: "Rue de la Culture", phone: "02 31 35 25 48", status: "publie" },
  { id: "a-018", name: "France Services — Espace public numérique", type: "equipement", category: "Service public", description: "Accompagnement aux démarches administratives en ligne, permanences avec conseiller numérique.", address: "Médiathèque Le Phénix", phone: "02 31 35 25 40", status: "publie" },
];

const jobs: JobItem[] = [
  { id: "j-001", slug: "agent-technique-espaces-verts", title: "Agent technique — espaces verts", department: "Services techniques", contract: "Titulaire ou contractuel · catégorie C", timeframe: "Temps complet, 35h", deadline: "2026-09-30", description: `## Missions

- Entretien des espaces verts communaux : tonte, taille, plantation, arrosage
- Participation au fleurissement et aux plantations d'automne
- Entretien courant du matériel
- Renfort ponctuel sur la viabilité hivernale et les manifestations

## Profil

- CAPA travaux paysagers ou expérience équivalente
- Permis B exigé, permis remorque apprécié
- Connaissance des techniques de gestion différenciée
- Sens du service public, travail en équipe

## Conditions

Poste à pourvoir au 1ᵉʳ novembre 2026. Rémunération statutaire, régime indemnitaire, participation à la protection sociale complémentaire, forfait mobilités durables.

Candidature (CV et lettre) à adresser à Madame la Maire — recrutement@colombelles.fr`, status: "publie", publishedAt: "2026-08-20T10:00:00.000Z" },
  { id: "j-002", slug: "animateur-trice-periscolaire", title: "Animateur ou animatrice périscolaire", department: "Service Éducation", contract: "Contractuel · catégorie C", timeframe: "Temps non complet, 24h hebdomadaires annualisées", deadline: "2026-09-20", description: `## Missions

- Encadrement des enfants sur les temps du matin, du midi et du soir
- Conception et animation d'activités adaptées aux différents âges
- Accompagnement sur le temps de restauration
- Relation avec les familles et l'équipe enseignante

## Profil

- BAFA ou CAP AEPE exigé
- Expérience auprès d'enfants de 3 à 11 ans appréciée
- Capacité d'adaptation, patience, esprit d'initiative

## Conditions

Poste à pourvoir immédiatement. Possibilité de compléter le temps de travail par des vacations pendant les vacances scolaires.`, status: "publie", publishedAt: "2026-08-12T10:00:00.000Z" },
  { id: "j-003", slug: "agent-recenseur", title: "Agents recenseurs (8 postes)", department: "Secrétariat général", contract: "Vacation", timeframe: "Janvier – février 2027", deadline: "2026-11-15", description: `## Missions

- Repérage des adresses à recenser
- Dépôt et récupération des questionnaires auprès des habitants
- Accompagnement des personnes en difficulté avec le formulaire en ligne
- Suivi de l'avancement auprès du coordonnateur communal

## Profil

- Disponibilité en soirée et le samedi
- Aisance relationnelle, discrétion, rigueur
- Maîtrise des outils numériques — tablette fournie
- Permis B apprécié

## Conditions

Formation obligatoire de deux demi-journées début janvier. Rémunération au nombre de logements recensés, complétée d'un forfait de déplacement.`, status: "publie", publishedAt: "2026-08-10T10:00:00.000Z" },
  { id: "j-004", slug: "responsable-communication", title: "Responsable de la communication", department: "Cabinet", contract: "Titulaire ou contractuel · catégorie A", timeframe: "Temps complet", deadline: "2026-10-15", description: `## Missions

- Élaboration et mise en œuvre de la stratégie de communication municipale
- Direction de la rédaction du magazine et des supports numériques
- Animation des réseaux sociaux et du site internet
- Relations presse
- Encadrement d'une équipe de deux personnes

## Profil

- Formation supérieure en communication
- Expérience confirmée en collectivité territoriale
- Maîtrise de la chaîne graphique et des outils de publication web
- Qualités rédactionnelles avérées

## Conditions

Poste à pourvoir au 1ᵉʳ janvier 2027. Rémunération selon expérience.`, status: "publie", publishedAt: "2026-07-30T10:00:00.000Z" },
  { id: "j-005", slug: "agent-etat-civil", title: "Agent d'accueil et d'état civil", department: "Accueil — état civil", contract: "Titulaire · catégorie C", timeframe: "Temps complet", deadline: "2026-09-05", description: "Poste pourvu — annonce archivée.", status: "brouillon", publishedAt: "2026-06-15T10:00:00.000Z" },
];

/** Base initiale, régénérée à chaque appel pour éviter tout partage de référence. */
export function seedDatabase(): Database {
  return structuredClone({
    settings,
    news,
    events,
    pages,
    documents,
    elus,
    services,
    directory,
    jobs,
    reports: [
      {
        id: "r-001",
        reference: "SIG-2026-0148",
        category: "Éclairage public",
        description: "Deux lampadaires éteints devant le 14 rue Jean-Jaurès depuis une semaine.",
        location: "Rue Jean-Jaurès, devant le n° 14",
        name: "Habitant du quartier",
        email: "signalement-demo@example.org",
        status: "en_cours" as const,
        note: "Transmis au service technique le 27 août. Intervention programmée semaine 37.",
        createdAt: "2026-08-26T17:42:00.000Z",
      },
      {
        id: "r-002",
        reference: "SIG-2026-0149",
        category: "Propreté",
        description: "Dépôt sauvage d'encombrants au pied des colonnes à verre.",
        location: "Parking du gymnase Marcel-Cerdan",
        name: "Riverain",
        email: "signalement-demo2@example.org",
        status: "nouveau" as const,
        createdAt: "2026-08-30T09:15:00.000Z",
      },
      {
        id: "r-003",
        reference: "SIG-2026-0147",
        category: "Voirie",
        description: "Nid-de-poule à l'angle de l'avenue de la Libération.",
        location: "Avenue de la Libération",
        name: "Usager",
        email: "signalement-demo3@example.org",
        status: "traite" as const,
        note: "Comblement réalisé le 22 août.",
        createdAt: "2026-08-14T11:03:00.000Z",
      },
    ],
    messages: [
      {
        id: "m-001",
        name: "Demande de démonstration",
        email: "contact-demo@example.org",
        subject: "Réservation de la salle des fêtes",
        service: "Réglementation et réservations",
        message:
          "Bonjour, je souhaiterais connaître les disponibilités de la salle des fêtes pour le mois de décembre. Merci d'avance.",
        read: false,
        createdAt: "2026-08-31T14:22:00.000Z",
      },
      {
        id: "m-002",
        name: "Demande de démonstration",
        email: "contact-demo2@example.org",
        subject: "Inscription à l'école Henri-Sellier",
        service: "Service Éducation",
        message:
          "Nous emménageons à Colombelles en octobre. Quelles sont les démarches pour inscrire notre fille en CE2 ?",
        read: true,
        createdAt: "2026-08-27T08:40:00.000Z",
      },
    ],
    media: [
      { id: "md-001", name: "Tour de refroidissement de la SMN", url: "/media/tour-smn.jpg", alt: "Silhouette de la tour de refroidissement se détachant sur le ciel", credit: "Ville de Colombelles", uploadedAt: "2026-06-15T10:00:00.000Z" },
      { id: "md-002", name: "Hôtel de ville", url: "/media/hotel-de-ville.jpg", alt: "Façade de l'hôtel de ville depuis la place François Mitterrand", credit: "Ville de Colombelles", uploadedAt: "2026-02-10T10:00:00.000Z" },
      { id: "md-003", name: "Berges de l'Orne", url: "/media/berges-orne.jpg", alt: "Voie verte longeant l'Orne au petit matin", credit: "Ville de Colombelles", uploadedAt: "2026-04-28T10:00:00.000Z" },
      { id: "md-004", name: "Médiathèque Le Phénix", url: "/media/mediatheque.jpg", alt: "Salle de lecture de la médiathèque", credit: "Ville de Colombelles", uploadedAt: "2026-08-20T10:00:00.000Z" },
    ],
    users: [
      {
        id: "u-001",
        username: "admin",
        name: "Administrateur du site",
        email: "webmaster@colombelles.fr",
        role: "administrateur" as const,
        passwordHash:
          "3e6856725a81457f5b6d424590b74b0f:ec6c4ac97657fa8054709f4eebe5b19a344082fe5d1d41738446e4a797bbf8e361f736bdf2c8d43ae75a7aca322ac5955594ac5a8cb56acfcf2f8372b5473687",
        createdAt: "2026-01-05T09:00:00.000Z",
      },
      {
        id: "u-002",
        username: "redaction",
        name: "Service communication",
        email: "communication@colombelles.fr",
        role: "editeur" as const,
        passwordHash:
          "aefbf99efec46132428d7ec010d22c38:c3185054ceea0891a760558fed677c6723b18da1687a7b7d026a14199ef5be797a033e676db08b7f413202b5294509e8e06a54d170a8b9638a1e8e37aae5384d",
        createdAt: "2026-01-05T09:05:00.000Z",
      },
    ],
    audit: [],
  });
}
