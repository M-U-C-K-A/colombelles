import type {
  Database,
  DirectoryItem,
  DocumentItem,
  PlaceItem,
  VenueItem,
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
    "Ville de Colombelles, commune de 7 200 habitants du Calvados, membre de la communauté urbaine Caen la mer. Démarches, actualités, agenda et services municipaux.",
  address: "Place François Mitterrand",
  postalCode: "14460",
  city: "Colombelles",
  phone: "02 31 35 25 00",
  email: "accueil@colombelles.fr",
  hours: [
    { day: "Lundi", value: "8h30 – 12h30 · 13h30 – 17h00" },
    { day: "Mardi", value: "8h30 – 12h30 · 13h30 – 17h00" },
    { day: "Mercredi", value: "8h30 – 12h30 · 13h30 – 17h00" },
    { day: "Jeudi", value: "8h30 – 12h30 · 13h30 – 17h00" },
    { day: "Vendredi", value: "8h30 – 12h30 · 13h30 – 17h00" },
    { day: "Samedi", value: "9h00 – 12h00 · 2ᵉ et 4ᵉ samedis, hors vacances scolaires" },
    { day: "Dimanche", value: "Fermé" },
  ],
  social: [
    { label: "Facebook", url: "https://www.facebook.com/VilledeColombelles" },
    {
      label: "YouTube",
      url: "https://www.youtube.com/channel/UC0JcpYH0ml3mE_54cHqrtvw",
    },
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
    theme: "ecole",
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
    theme: "actu",
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
    theme: "patrimoine",
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
    theme: "culture",
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
    theme: "mairie",
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
    theme: "culture",
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
    theme: "nature",
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
    theme: "actu",
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
    theme: "actu",
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
    theme: "solidarite",
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
    theme: "actu",
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
    theme: "culture",
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
    theme: "patrimoine",
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
    theme: "actu",
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
    theme: "culture",
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
    theme: "emploi",
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
    theme: "solidarite",
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
    theme: "nature",
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
    theme: "culture",
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
    theme: "mairie",
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
    theme: "mairie",
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
    block: "caen-la-mer",
    order: 2,
    status: "publie",
    updatedAt: "2026-04-02T10:00:00.000Z",
  },
  {
    id: "p-003",
    theme: "mairie",
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
    theme: "emploi",
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
    theme: "mairie",
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
    theme: "actu",
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
    theme: "mairie",
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
    theme: "contact",
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
    theme: "contact",
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
    theme: "patrimoine",
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
    theme: "nature",
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
    theme: "actu",
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
    theme: "famille",
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
    theme: "culture",
    slug: "location-de-salles",
    title: "Location de salles",
    section: "demarches",
    summary:
      "Deux salles municipales à louer, à tarif préférentiel pour les Colombellois.",
    content: `La Ville met deux salles à la disposition des particuliers et des associations, à un tarif préférentiel pour les habitants de la commune. Survolez une salle ci-dessous pour en voir l'aperçu, l'adresse et les conditions.

## Conditions de location

- Réservation au plus tôt un an et au plus tard un mois avant la date
- Caution et attestation d'assurance responsabilité civile obligatoires
- État des lieux d'entrée et de sortie contradictoire
- Nuisances sonores limitées après 22h

## Prêt de matériel aux associations

Tables, bancs, chaises, barrières, grilles d'exposition et sonorisation légère sont prêtés gratuitement aux associations de la commune. La demande doit être déposée au moins trois semaines à l'avance.

## Contact

**Accueil de la mairie** — 02 31 35 25 00 — accueil@colombelles.fr`,
    block: "salles",
    order: 7,
    status: "publie",
    updatedAt: "2026-08-30T10:00:00.000Z",
  },
  {
    id: "p-108",

    theme: "nature",
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
    id: "p-401",
    theme: "solidarite",
    slug: "centre-communal-d-action-sociale",
    title: "Centre communal d'action sociale",
    section: "vivre-a-colombelles",
    subsection: "Solidarité",
    summary:
      "Aide sociale légale et facultative, accompagnement, domiciliation et registre des personnes vulnérables.",
    content: `Dans le cadre de ses missions de service public, la ville de Colombelles propose différentes aides à la personne.

Le centre communal d’action sociale est un lieu :

d’écoute d’accompagnement dans les démarches administratives liées à des difficultés budgétaires d’accès à vos droits

Missions du centre communal d’action sociale domiciliation aide alimentaire aides financières (difficultés financières passagères)

aides à la recherche de logement accompagnement de la vie quotidienne des séniors

(colis et banquet, résidence autonomie, visiteurs de convivialité…)

## Organisation

Le Centre communal d’action sociale est un service de la ville, présidé par le Maire et composé d’élus municipaux.

Informations pratiques

CCAS

## 7, rue Jules-Guesde

Lundi, mardi, jeudi et vendredi de 8h30 à 12h30 et de 13h30 à 17h et le mercredi de 13h30 à 17h.

02 31 35 57 00 ccas@colombelles.fr`,
    order: 101,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-402",
    theme: "solidarite",
    slug: "solidaribus",
    title: "Le Solidaribus du Secours populaire",
    section: "vivre-a-colombelles",
    subsection: "Solidarité",
    summary:
      "Une épicerie solidaire itinérante, au plus près des habitants.",
    content: `Dans le cadre de sa politique de solidarité et de lutte contre la précarité, la Ville accueillera prochainement le

Solidaribus du 14 , une antenne itinérante mise en place par le

Secours populaire du Calvados

.

## Un dispositif mobile pour aller au plus près des besoins

Face aux situations de pauvreté et de précarité, notamment dans les zones où les associations sont moins présentes, le Secours populaire du Calvados a développé un dispositif innovant : une antenne mobile , surnommée le

Solidaribus du 14

.

## À son bord, des équipes de

2 à 3 bénévoles , formées et polyvalentes, assurent :

l’

,

un accès aux droits un accès à la culture et aux loisirs l’ orientation vers les dispositifs adaptés , et la distribution de denrées alimentaires , lorsque cela est nécessaire.

## Une implantation pertinente à Colombelles

Au regard des besoins identifiés sur le territoire colombellois, la venue du Solidaribus constitue un renfort précieux aux actions existantes

. Ce dispositif s’inscrit en complémentarité avec les services municipaux, le CCAS et le tissu associatif local , afin de proposer une réponse globale et coordonnée aux situations de précarité.

## Informations pratiques

La présence du Solidaribus à Colombelles sera périodique : 1 mardi sur 2 (semaine paire)

## de 10h à 12h

Lieu : parking de la salle Dumas, rue Emile Dumas à Colombelles

Solidaribus Colombelles | affiche solidaribus`,
    order: 102,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-403",
    theme: "solidarite",
    slug: "acces-aux-droits",
    title: "Accès aux droits",
    section: "vivre-a-colombelles",
    subsection: "Solidarité",
    summary:
      "Permanences juridiques, écrivain public et accompagnement dans les démarches.",
    content: `## PERMANENCES D’ACCÈS AUX DROITS

Plusieurs permanences sont à votre disposition au sein de la commune soit au centre communal d’action sociale, soit en mairie.

## > Information sur vos droits

Le conseil départemental de l’accès au droit (CDAD) assure une permanence le 1er mercredi de chaque mois au sein des locaux du centre communal d’action sociale.

Le juriste peut vous conseiller dans les domaines du droit :

de la famille (séparation, garde d’enfants, divorce…)

du travail (lien avec les employeurs…)

de la consommation (litige avec une enseigne, une assurance…)

Plus d’informations

## > Permanence conseil handicap

De 14h à 17h, chaque vendredi des semaines impaires, une permanence conseil handicap est à votre disposition.

Information, conseil, orientation, aide au montage des dossiers MDPH, Cap Emploi, …

N’hésitez pas à prendre rendez-vous.

## > Médiation familiale

Un espace de parole, d’écoute en cas de conflits, un espace de prévention, de communication, d’écoute. N’hésitez pas à les contacter

37 rue des boutiques, Caen, 02 61 45 17 24 – poleparentalité@aajb.asso.fr

Plaquette de présentation

Informations pratiques

## Centre communal d’action sociale

Localisation de la permanence : 7, rue Jules-Guesde

02 31 35 57 00 ccas@colombelles.fr

## > Litiges – informations juridiques

Pour toutes questions juridiques vous pouvez vous renseigner auprès de :

la Maison de la justice et du droit de Mondeville : 15 bis rue Pasteur, 14120 Mondeville, 02 61 10 31 50, mjd-mondeville@justice.fr le Tribunal de Caen : 11 Rue Dumont d’Urville, 02 50 10 13 00

Informations pratiques

## Service Accueil

Localisation de la permanence : Place François-Mitterrand

02 31 35 25 00

> L’Espace Public Numérique (EPN)

En venant dans la salle informatique de la médiathèque vous trouverez des conseils personnalisés, des ateliers mais aussi du temps libre d’accès aux ordinateurs si vous en avez besoin pour vos démarches administratives en ligne. Ce service est gratuit.

Horaires :

En accès libre, au sein de la Médiathèque Le Phénix, 10 rue Elsa Triolet les m ardi, jeudi, vendredi 9h-12h et 16h-18h mercredi 10h-18h samedi 10h-12h et 14h-18h`,
    order: 103,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-404",
    theme: "solidarite",
    slug: "logement",
    title: "Logement",
    section: "vivre-a-colombelles",
    subsection: "Solidarité",
    summary:
      "Demande de logement social, accompagnement et interlocuteurs.",
    content: `Le Centre communal d’action sociale vous accompagne dans votre recherche de logement social sur la commune.

Toute personne souhaitant un logement social doit d’abord faire une demande en ligne sur le site « Demande logement 14 ».

La Maison de l’Habitat peut vous aider à constituer votre dossier de demande de logement, à améliorer votre logement ou à accéder à la propriété.

Bailleurs sociaux

Les Foyers Normands
- 

02 31 72 41 52

Inolya
- 

02 31 30 36 36

CDC Habitat

Caen la mer Habitat

Logéo Seine

La résidence séniors

La

résidence autonomie  « Jean Goueslard »

, située au 5 et 9 rue Lucien Mangematin (à 50 m du centre-ville), est une résidence accueillant des retraités autonomes comprenant 34 logements T1 bis d’une superficie de 33 m².

Informations pratiques

CCAS

7, rue Jules-Guesde

02 31 35 57 00 ccas@colombelles.fr`,
    order: 104,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-405",
    theme: "famille",
    slug: "trouver-un-mode-de-garde",
    title: "Trouver un mode de garde",
    section: "vivre-a-colombelles",
    subsection: "Petite enfance",
    summary:
      "Le relais petite enfance accompagne gratuitement les familles dans leur recherche.",
    content: `Le point info Petite Enfance vous soutient dans vos démarches :

choisir un mode de garde en fonction de vos besoins obtenir une aide pour financer la garde être informé sur le droit du travail et les obligations du parent employeur d’une assistante maternelle ou d’une garde d’enfant à domicile préparer son enfant à la séparation…

Permanence d’accueil le lundi de 14h15 à 18h15 et le mardi de 13h15 à 16h15 ou sur rendez-vous.

Informations pratiques

Point Info – Relais Petite Enfance

## 20 place François Mitterrand

02 31 52 04 48 – 07 57 08 30 73 rpe@colombelles.fr`,
    image: { url: "/media/ville/petite-enfance-trouver-un-mode-de-garde-1.jpg", alt: "Trouver un mode de garde" },
    order: 201,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-406",
    theme: "famille",
    slug: "accueil-collectif",
    title: "Accueil collectif",
    section: "vivre-a-colombelles",
    subsection: "Petite enfance",
    summary:
      "Le multi-accueil et les places disponibles sur la commune.",
    content: `## Point info Petite Enfance

Le point info Petite Enfance vous soutient dans vos démarches :

choisir un mode de garde en fonction de vos besoins obtenir une aide pour financer la garde être informé sur le droit du travail et les obligations du parent employeur d’une assistante maternelle ou d’une garde d’enfant à domicile préparer son enfant à la séparation…

Permanence d’accueil le lundi de 14h15 à 18h15 et le mardi de 13h15 à 16h15 ou sur rendez-vous.

## Multi-accueil Lisa Lind

30 enfants de 10 semaines à 3 ans sont accueillis par une équipe de professionnels qui les accompagnent dans leur développement, en favorisant leur autonomie et le respect de l’autre. Des activités variées et adaptées à chaque âge dans un espace chaleureux permettent l’épanouissement de chacun au sein du groupe des tout-petits ou des plus grands.

30 places

## Enfants âgés de 10 semaines à 3 ans

Fermeture 1 semaine pendant les vacances scolaires du printemps, 3 semaines en août et 1 semaine entre Noël et le jour de l’An

Tarif calculé en fonction des revenus du foyer et du nombre d’enfants à charge, selon le barème de la CAF

Une commission d’attribution des places se réunit (à minima 1 fois par an) afin de sélectionner les dossiers selon des critères définis dans le règlement de fonctionnement de la structure.

PRÉ-INSCR

IPTION :

Bulletin de pré-inscription à télécharger et à retourner par mail à rpe@colombelles.f r qui reprendra contact avec vous.

## Informations pratiques

Point Info – Relais Petite Enfance et Multi-accueil Lisa Lind

## 20 place François Mitterrand

Permanences d’accueil le lundi de 14h15 à 18h15, le mardi de 13h15 à 16h15 et sur rendez-vous.

02 31 52 04 48 – 07 57 08 30 73 rpe@colombelles.fr

## La crèche Les P’tits Pots Rouges

Cette crèche est située à quelques pas du Campus Technologique de Colombelles et à 5 minutes en voiture du périphérique caennais.

La structure accueille les enfants sur une surface de 850 m².

La crèche bénéficie d’un grand espace extérieur. Les enfants peuvent profiter des jeux en plein air.

Capacité d’accueil : 60 enfants

Superficie : 807m²

## 300 m² d‘espace extérieur

Crèche Les petits pots rouges – Chemin de Mondeville à Giberville- ZAC du Libéra- 14460 Colombelles

## Plus d’informations

## Section des grands du multi-accueil Lisa Lind

## Dortoir des grands du multi-accueil Lisa Lind

Dortoir des petits du multi-accueil Lisa Lind`,
    image: { url: "/media/ville/petite-enfance-modes-de-garde-2.jpg", alt: "Accueil collectif" },
    order: 202,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-407",
    theme: "famille",
    slug: "accueil-individuel",
    title: "Accueil individuel",
    section: "vivre-a-colombelles",
    subsection: "Petite enfance",
    summary:
      "Assistantes maternelles agréées et garde à domicile.",
    content: `Relais Petite Enfance
- RPE –

## Colombine

Le Relais Petite Enfance (RPE) soutient les parents dans leurs démarches :

Choisir un mode de garde

Trouver une assistante maternelle

## Obtenir une aide pour financer la garde

Être informé sur le droit du travail et les obligations du parent employeur

## Préparer son enfant à la séparation…

Le Relais Petite Enfance accompagne également les assistantes maternelles et les gardes d’enfants à domicile, et favorise leur professionnalisation.

Il propose des animations pour contribuer à la socialisation des enfants de 0 à 6 ans accompagnés de leur « nounou » ou du parent employeur.

Programme des mois de AOUT-SEPTEMBRE-OCTOBRE 2026_RPE-Colombine

Informations pratiques

Relais Petite Enfance

## 20 place François Mitterrand

Permanences d’accueil le lundi de 14h15 à 18h15, le mardi de 13h15 à 16h15 et sur rendez-vous.

02 31 52 04 48 – 07 57 08 30 73 rpe@colombelles.fr`,
    image: { url: "/media/ville/petite-enfance-accueil-individuel-1.jpg", alt: "Accueil individuel" },
    order: 203,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-408",
    theme: "famille",
    slug: "lieu-d-accueil-enfants-parents",
    title: "Lieu d'accueil enfants-parents",
    section: "vivre-a-colombelles",
    subsection: "Petite enfance",
    summary:
      "Un espace de jeu libre pour les tout-petits accompagnés d'un adulte.",
    content: `Le Lieu d’Accueil Enfants Parents « L’Esperluette » est un service municipal ouvert à tous les futurs parents et aux enfants de moins de 6 ans accompagnés de leur(s) parent(s).

Votre tout-petit profitera d’un espace de jeu adapté pour y rencontrer d’autres enfants. Vous pourrez faire une pause dans votre quotidien et discuter de vos préoccupations avec d’autres parents.

## Gratuit et sans inscription

Ouvert le lundi matin de 9h à 12h, pendant les périodes scolaires

Horaire d’arrivée et de départ libre

## Présence de deux accueillants

Découvrez le film de la CAF consacré aux Lieux d’Accueil Enfants-Parents (LAEP)

La Caisse d’Allocations Familiales (CAF) a réalisé un film destiné à faire connaître les Lieux d’Accueil Enfants-Parents (LAEP) auprès des parents et futurs parents.

Une partie de ce tournage a eu lieu au LAEP de Colombelles.

CONTACT PÔLE PETITE ENFANCE

## 20 place F. Mitterrand

02 31 52 04 48 – 07 57 08 30 73 rpe@colombelles.fr`,
    image: { url: "/media/ville/petite-enfance-lieux-daccueil-1.jpg", alt: "Lieu d'accueil enfants-parents" },
    order: 204,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-409",
    theme: "ecole",
    slug: "ecoles-maternelles-et-elementaires",
    title: "Écoles maternelles et élémentaires",
    section: "vivre-a-colombelles",
    subsection: "Éducation",
    summary:
      "Les groupes scolaires de la commune et les modalités d'inscription.",
    content: `## ÉCOLE MATERNELLE

5 rue Jules Guesde, Colombelles, 02 31 72 40 09 – ce.0140776T@ac.normandie.fr

## La classe des moins de 3 ans sur le site Henri-Sellier

Vous habitez le centre-ville ou le quartier Jean Jaurès, votre enfant va avoir 2 ans avant le 31 décembre, il n’a pas l’occasion de vivre avec des enfants de son âge et reste à la maison avec vous : il peut se familiariser progressivement avec l’école dans la classe des Moins de Trois Ans (MTA).

Votre enfant va avoir 3 ans avant le 31 décembre. Il entrera à l’école maternelle de votre secteur dès septembre, même s’il n’a pas encore fêté son troisième anniversaire.

Priorité aux enfants des quartiers centre-ville et Jean-Jaurès

Réunion d’information en avril-mai

## Inscription à la mairie en mai-juin

Rentrée échelonnée après le 2e anniversaire

Horaires aménagés

## La petite section de maternelle

Votre enfant va avoir 3 ans avant le 31 décembre. Il entrera à l’école maternelle de votre secteur dès septembre, même s’il n’a pas encore fêté son troisième anniversaire.

## Quartiers du centre-ville et Jean-Jaurès >>

École maternelle Henri Sellier – 5, rue Jules Guesde – Colombelles

Inscription :

Mairie de Colombelles – Service Éducation – place F. Mitterrand –

02 31 35 57 07 – veronique.drieu@colombelles.fr

## Quartiers du Plateau et Libéra >>

École maternelle des Tilleuls – Avenue des Écoles – Mondeville

Inscription :

Mairie de Mondeville – Service Scolaire – 5, rue Chapron – Mondeville –

02 31 35 52 00 – direction.education@mondeville.fr

ÉCOLES ÉLEMENTAIRES

## Pour les enfants du centre-ville

CP –  CE1 – site Henri Sellier, 5 rue Jules Guesde, Colombelles, 07 56 38 95 11 – ce.0140774R@ac-normandie.fr

CE2 – CM2 – site Victor Hugo, 24 rue Emile Mougins, Colombelles

Dans le cadre du projet éducatif territorial de la ville, les écoles élémentaires Victor Hugo et Henri Sellier ont été fusionnées d’un point de vue administratif et pédagogique. Ce rapprochement permet notamment aux enseignants et aux enfants de disposer de davantage de moyens.

Un seul directeur dirige les deux sites scolaire à temps plein, il s’agit de Madame Colin, joignable au 07 56 38 95 11

## Pour les enfants du Plateau

Les habitants des quartiers du Plateau et de Libéra dépendent de l’école des Tilleuls. Cette école est gérée par sous la forme d’une convention d’entente entre les communes de Colombelles, Mondeville et Giberville pour les enfants de l’école maternelle et élémentaire.

Écoles de Tilleuls, avenue des écoles, 14120 Mondeville, 07 85 65 57 27`,
    image: { url: "/media/ville/education-ecoles-2.jpg", alt: "Écoles maternelles et élémentaires" },
    order: 301,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-410",
    theme: "ecole",
    slug: "restauration-scolaire",
    title: "Restauration scolaire",
    section: "vivre-a-colombelles",
    subsection: "Éducation",
    summary:
      "Inscription annuelle obligatoire, tarifs, réservation et menus.",
    content: `Inscription au restaurant scolaire et temps méridien à effectuer tous les ans

Pour les enfants qui fréquenteront la restauration scolaire au cours de l’année scolaire 2026-2027, une inscription est

OBLIGATOIRE , même en cas de renouvellement.

## Renouvellement et nouvelle inscription

Formulaire d'inscription Restauration scolaire et temps méridien

## 2026 - 2027

Le dossier d’inscription complet doit être retourné en Mairie avant le 31 mai

.

Pièces à joindre obligatoires :

RIB / attestation de quotient familial (-2 mois)

Pour déposer le dossier ou vous aider à le compléter, l’accueil de la Mairie est ouverte du lundi au vendredi de 8h30 à 12h30 et de 13h30 à 17h. Une permanence sera également assurée le samedi 13 juin de 9h à 12h.

Tarifs du restaurant scolaire applicable au 1er septembre 2025

## Règlement intérieur applicable au 1er septembre 2025

Une notice pas à pas pour vous aider à remplir et à envoyer le dossier en version PDF

## Attention

: les enfants sans dossier d’inscription ne seront pas accueillis à la restauration scolaire à la rentrée 2026.

Menu de la semaine du 1er au 4 septembre le groupe scolaire Henri-Sellier l'école Les Tilleuls de Mondeville

Nous vous rappelons qu' il est obligatoire de réserver ou d'annuler les jours de repas de vos enfants

## 5 jours ouvrés avant la date

. À défaut les repas non pris seront facturés. Nous vous remercions d'y procéder au plus vite, par mail à facturationcantine@colombelles.fr

Menu de la semaine du 7 au 11 septembre le groupe scolaire Henri-Sellier

## La pause méridienne

La  pause méridienne est un moment de détente dans la journée des 400 enfants demi-pensionnaires. L’équipe municipale souhaite offrir des repas de qualité et équilibrés.

## Côté cuisine

Les menus servis dans les restaurants scolaires sont élaborés par un chef cuisinier et son équipe et ce tenant compte de règles transmises par le ministère de la Santé. Des menus équilibrés et variés avec, en majorité, des produits frais issus de circuits courts et de saison sont privilégiés pour la composition des menus. Lors de journées à thèmes, les cuisiniers proposent des menus spécifiques avec de nouvelles saveurs ou recettes pour le plaisir des jeunes gourmands et gourmets en devenir.

Où en sommes-nous dans notre transition alimentaire ?

L'objectif de cet affichage (obligatoire depuis la

Loi EGAlim)

est de rendre plus transparentes l'origine et la qualité des produits composant les menus et de soutenir l'objectif d'une alimentation plus saine et plus durable dans les restaurants.

Données d'approvisionnement de denrées alimentaires 2024 :

consultez lès ici

## Antigaspi

## Depuis 2017, le RÉGAL Normandie organise les

Défi Assiettes Vides pour lutter contre le gaspillage alimentaire. L’équipe du restaurant scolaire avec les écoliers participent et sensibilisent aux bonnes habitudes à table.`,
    image: { url: "/media/ville/education-restauration-scolaire-1.jpg", alt: "Restauration scolaire" },
    order: 302,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-411",
    theme: "ecole",
    slug: "accueil-periscolaire",
    title: "Accueil périscolaire",
    section: "vivre-a-colombelles",
    subsection: "Éducation",
    summary:
      "Avant et après la classe, les temps d'accueil encadrés.",
    content: `Les accueils périscolaires (matin et soir) sont à destination des enfants scolarisés au sein du groupe scolaire Henri-Sellier.

La gestion de cet accueil est déléguée par la Ville aux Francas du Calvados, association depuis le 1er septembre 2021.

Pour les petits Colombellois du Libéra et du Plateau, ils sont rattachés à l’école de Mondeville

.

## Le matin

Les enfants sont accueillis directement dans les écoles dès 7h30 jusqu’au début de l’école  sur les sites Henri-Sellier maternelle, Henri-Sellier élémentaire et Victor-Hugo.

Des activités sont proposées aux enfants pour leur permettre un réveil en douceur afin d’être prêt aux apprentissages de l’école.

## Temps méridien

Des animateurs interviennent sur le temps méridien.

Henri-Sellier Maternelle : Pendant le temps de restauration deux animatrices interviennent (une avec les grandes sections et une avec les moyennes sections). Sur le temps d’activités après le repas les deux animatrices proposent des activités qu’au grandes sections.

Henri-Sellier Élémentaire (CP et CE1) : Deux animatrices interviennent auprès des enfants en leur proposant une activité manuelle, culturelle, sportive ou d’expression avant le repas et les accompagnent durant tout le repas.

Site Victor-Hugo (CE2, CM1 et CM2) :  Six animateurs interviennent (5 animateurs + 1 référent).

## Le soir

Le soir, l’Accueil Cartable se déroule au sein des écoles sur le site Henri-Sellier jusqu’à 18h30. Les enfants du site Victor-Hugo seront récupérés par les animateurs à la sortie des classes et seront accompagnés jusqu’au site Henri-Sellier.

Des activités seront proposées aux enfants.

## Mercredi Loisirs

Des sorties sont prévues et les activités sont proposées aux enfants en fonction de leurs souhaits, envies et besoins. Les enfants sont accueillis au centre de 7h30 à 18h30.

En pratique :

L’inscription est à la journée ou demi-journée, avec ou sans repas.

Les inscriptions ou annulations sont à faire le mercredi précédent avant 18h

Inscription :

https://francascalvados.portail-familles.app

La fiche sanitaire

(1 par enfant)

Bulletin d’adhésion

Adhésion Francas14

## Guide mémo

Plus d’informations sur le site des Francas du Calvados

Dossier d’inscription

Inscription :

https://francascalvados.portail-familles.app

Le dossier d’inscription

(1 par famille par an)

La fiche sanitaire

(1 par enfant)

Bulletin d’adhésion

Adhésion Francas14

## Guide mémo

Inscription possible en scannant le QRCode

CONTACT

Les Francas

## 52 avenue Léon Blum

## Du lundi au vendredi : 10h – 12h / 13h30 – 18h30

02 31 84 93 48 colombelles@francas-calvados.fr

Facebook`,
    order: 303,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-412",
    theme: "ecole",
    slug: "accueil-extrascolaire",
    title: "Accueil extrascolaire",
    section: "vivre-a-colombelles",
    subsection: "Éducation",
    summary:
      "Mercredis et vacances scolaires.",
    content: `L’accueil extrascolaire est géré par délégation de service public à l’association les Francas du Calvados

.

## Pendant les vacances scolaires

Le centre de loisirs est ouvert de 7h30 à 18h30.

Un programme d’animations est prévu et adapté en fonction du souhait, des envies et des besoins des enfants.

En pratique

:

Inscription à la journée ou à la demi-journée, avec ou sans repas.

## Inscription à faire au secrétariat au plus tard 8 jours avant

Les imprimés ci-dessous sont à remplir en plus de ceux liés à l’activité choisie.

Ils sont à compléter sont à déposer directement auprès du Centre de Loisirs Les Francas, 52 avenue Léon Blum, ou à envoyer à : colombelles@francasnormandie.fr

La tarification 2024-2025 figure dans le document

«

CGV Colombelles

», dont la lecture est nécessaire.

Plus d’informations sur le site des Francas du Calvados

Informations pratiques

Les Francas

## 52 avenue Léon Blum

02 31 84 93 48 colombelles@francas-calvados.fr`,
    order: 304,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-413",
    theme: "ecole",
    slug: "colleges-et-lycees",
    title: "Collèges et lycées",
    section: "vivre-a-colombelles",
    subsection: "Éducation",
    summary:
      "Établissements de rattachement et transport scolaire.",
    content: `Collèges Gisèle Guillemot (Mondeville) et Henri Brunet (Caen)

## Les collèges Gisèle Guillemot à Mondeville et

Henri Brunet à Caen sont les établi ssements publics d’enseignement secondaire des Colombellois.

En complément des bourses touchées par les familles de collégiens, la ville abonde d’une aide de

20 €.

Les collèges sont une compétence du

Département du Calvados

.

## Bourse collégiens et lycéens

La Ville soutient la scolarité des collégiens et lycéens. Ce dispositif communal consiste à accorder une bourse complémentaire aux familles déjà bénéficiaires d’une bourse nationale, pour leur enfant scolarisé au collège ou au lycée.

Retrouvez toutes les infos ici

COLLEGE GISELE GUILLEMOT

Collège Gisèle Guillemot

2 rue Gisèle Guillemot, Mondeville

02 50 22 15 86 ce.0141256p@ac-caen.fr

Plus d’informations

COLLEGE HENRI BRUNET

Collège Henri Brunet

## 9 bis avenue du Six Juin, Caen

02 31 85 17 58 ce.0141313b@ac-normandie.fr

## Lignes de bus pour accéder aux collèges

Lignes de bus complémentaires desservant le collège Guillemot

## Ligne 111

: COLOMBELLES Mandela → MONDEVILLE Collège Guillemot

Ligne 121a et 121b

: COLOMBELLES Lazzaro ou Mairie

→

## MONDEVILLE Collège Guillemot

Lignes de bus desservant le collège Henri Brunet :

## https://www.twisto.fr/

Transport scolaire : la Ville reconduit son aide pour les collégiens

Afin de garantir l’égalité d’accès à l’éducation et de soutenir les familles, la Ville de Colombelles renouvelle pour l’année scolaire

2026-2027 la prise en charge de la carte de transport scolaire Twisto pour les élèves domiciliés à Colombelles et scolarisés aux collèges

Gisèle Guillemot ou

Henri Brunet

.

Cette aide permet aux collégiens concernés de bénéficier gratuitement d’un aller-retour quotidien les jours de classe.

Les familles doivent compléter le formulaire d’inscription Twisto et le transmettre directement à Twisto, accompagné des pièces justificatives demandées. La carte nominative sera ensuite envoyée à domicile.

Pour faciliter les démarches, une permanence de l’agence mobile Twisto sera organisée à Colombelles :

Mercredi 17 juin 2026 , de 11h à 17h

Samedi 8 août 2026 , de 11h à 17h

Place François-Mitterrand

## Par ailleurs, une aide complémentaire de

20 € est proposée aux élèves boursiers. Les dossiers de demande seront disponibles en mairie à partir du

2 novembre 2026

.

Pour tout renseignement complémentaire, contactez le Service Jeunesse et Sport de la Ville au

02 31 35 25 03

.

## Lycées

Les lycées sont une compétence de la région Normandie.

Transport scolaire des lycéens : pensez à vous inscrire avant le 16 juillet.

Les inscriptions au transport scolaire

« pass scolaire

NOMAD »

pour l’année scolaire

2026-2027 sont ouvertes du

## 16 juin au 16 juillet 2026

. Elles concernent les lycéens colombellois dont l’établissement scolaire est situé hors de l’agglomération Caen la Mer

.

L’inscription s’effectue directement en ligne sur le portail NOMAD. Plusieurs dispositifs d’aide peuvent être mobilisés par les familles : demi-tarif sous conditions de ressources, paiement en 4 fois sans frais ou encore fonds social régional pour les lycéens.

Les familles sont invitées à effectuer leurs démarches dès à présent afin de garantir la prise en compte du dossier pour la rentrée de septembre.

➡️ Retrouvez toutes les informations et procédez à l’inscription sur le portail NOMAD Normandie.`,
    order: 305,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-414",
    theme: "ecole",
    slug: "accompagner-vos-enfants",
    title: "Accompagner vos enfants",
    section: "vivre-a-colombelles",
    subsection: "Éducation",
    summary:
      "Dispositifs de soutien à la scolarité et à la parentalité.",
    content: `Pour les 0 – 3 ans

## Le

Lieu Accueil Enfants Parents, l’Esperluette offre un espace de rencontres pour les enfants non scolarisés et leurs parents ou pour les futur parents. Un espace de partage autour de la parentalité pour échanger et apprendre les uns des autres.

Pour les 2 – 16 ans

Le Programme de Réussite Éducative (PRE)

Le Programme de Réussite Éducative (PRE) s’adresse aux enfants de 2 à 16 ans qui rencontrent des difficultés ou qui sont fragilisés. Il offre gratuitement un lieu d’accueil et d’écoute, un accompagnement personnalisé, une aide concrète, un soutien dans l’amélioration de la situation.

Le programme de réussite éducative, qu’est-ce que c’est ?

Un lieu d’accueil et d’écoute pour favoriser la réussite éducative des enfants et des adolescents.

Pour qui ?

Les 2 – 16 ans : tous les enfants et adolescents qui ont besoin d’un soutien dans le cadre de leur vie quotidienne (école, collège, famille, santé, …).

Objectif :

Donner toutes les chances aux enfants et adolescents de réussir en unissant les compétences de tous les acteurs.

Comment ?

En mettant en place un parcours personnalisé adapté aux besoins de chaque enfant

## En associant les parents au projet de leur enfant

En travaillant avec une équipe pluridisciplinaire en respectant les règles de confidentialité

Les parents sont au cœur du dispositif. L’accord des parents est indispensable pour que l’enfant bénéficie du PRE.

## Les étapes d’un accompagnement avec le PRE

Un professionnel vous a proposé d’orienter votre enfant vers le PRE

## Un parent vous a parlé de ce dispositif

Vous pouvez aussi contacter directement l’équipe du PRE ou vous adresser à l’enseignant(e) de votre enfant ou au directeur(trice) de l’école.

3 phases :

1/ Une rencontre : La famille rencontre l’équipe du PRE. Avec son accord, la situation de l’enfant est étudiée en équipe pluridisciplinaire.

2/ Le projet : Le PRE travaille en équipe pour proposer un projet personnalisé à l’enfant

3/ Les actions : Avec votre accord, les actions proposées sont mises en place. L’équipe du PRE assure un suivi régulier avec l’enfant. Les actions menées peuvent concerner les domaines suivants : scolarité, santé, ouverture vers l’extérieur, accès au sport, à la culture et aux loisirs

Plaquette d’information contact

Programme de Réussite Éducative

2 rue Victor-Hugo

02 31 52 23 92 pre@colombelles.fr

## Centre de loisirs les Francas

L’association départementale des Francas du Calvados est une association d’Education Populaire organisatrice d’accueils collectifs avec et sans hébergement et une fédération d’organisateurs locaux. Les Francas du Calvados œuvrent à promouvoir les Droits de l’Enfant et à développer la réflexion et l’action autour des loisirs éducatifs pour tous les enfants. L’organisation des Accueils de Loisirs à Colombelles par les Francas du Calvados fait l’objet d’une Délégation de Service Public pour la Ville de Colombelles.

Ils assurent donc la gestion de l’accueil périscolaire et extra-scolaire

.

Plus d’informations

Informations pratiques

## Centre de loisirs les Francas

## 52 avenue Léon Blum de 10h à 12h et de 13h30 à 18h30

02 31 84 93 48 colombelles@francas-calvados.fr

## Facebook

## Centre socio-culturel et sportif Léo Lagrange

Affilié à la fédération Léo Lagrange, association d’éducation populaire reconnue d’utilité publique, le

CSCS Léo Lagrange a pour objectif de développer la vie associative, en prenant en compte les besoins des usagers et des habitants, en favorisant les échanges et les rencontres intergénérationnelles en proposant aux publics de tous âges des activités et des loisirs de qualité dans des domaines différents : activités socio culturelles ou sportives, loisirs pour la jeunesse, projets et ateliers avec le secteur Familles/Habitants, etc…

Le CSCS Léo Lagrange dispose d’un programme trimestriel et des activités sportives et de loisirs.

Plus d’informations

## Informations pratiques

Centre socio-culturel et de loisirs Léo Lagrange

52 avenue Léon Blum, Colombelles

02 31 72 40 86 cscsleolagrange@gmail.com`,
    order: 306,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-415",
    theme: "ecole",
    slug: "local-jeune",
    title: "Local jeune",
    section: "vivre-a-colombelles",
    subsection: "Jeunesse",
    summary:
      "La Ruche, lieu de rencontres et de projets pour les 11-17 ans.",
    content: `La Ruche est le local jeunes des 11 – 17 ans à Colombelles. Un lieu de rencontres, de partage, d’activités et de projets pour les jeunes qui le souhaitent.

Mardi, jeudi et vendredi  : 16h-18h30 et jusqu’à 19h en période estivale

Mercredi et samedi  : 14h-18h30 et jusqu’à 19h en période estivale

Vacances scolaires  : 10h-12h / 14h-18h30 et jusqu’à 19h en période estivale

Des veillées sont proposées régulièrement de 18h30 à 22h : calendrier sur demande

## Pour les conditions d’inscription

Dossier à retirer au local jeunes ou demander à un animateur du local jeunes au secrétariat.

Pour que l’inscription soit définitive, le dossier doit être dûment rempli et une adhésion à l’année de 35€ est obligatoire (15€ d’adhésion à l’association des Francas et 10€ au local).

Programme des activités du mois de juillet 2026

Informations pratiques

## Local jeune de Colombelle – La Ruche

52 avenue Léon Blum localjeune.colombelles@gmail.com local jeune`,
    image: { url: "/media/ville/jeunesse-local-jeunes-3.jpg", alt: "Local jeune" },
    order: 401,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-416",
    theme: "ecole",
    slug: "bourses-collegiens-et-lyceens",
    title: "Bourse collégiens et lycéens",
    section: "vivre-a-colombelles",
    subsection: "Jeunesse",
    summary:
      "Une aide annuelle aux familles colombelloises.",
    content: `La Ville accompagne la scolarité de ses lycéens et collégiens. Ce dispositif communal consiste en l’octroi d’une bourse aux familles déjà bénéficiaires d’une bourse nationale pour leur enfant scolarisé au lycée et au collège.

## DOSSIER DE DEMANDE 2025-2026

Le dossier de demande de bourse est constitué de deux parties obligatoires, à retourner au plus tard le lundi 1er décembre 2025 :

Une seule fiche de renseignements valable pour toute la famille : version en ligne la fiche familiale de renseignements / version imprimable

Une fiche individuelle à remplir pour chaque enfant demandeur d’une bourse :

la fiche individuelle

Les fiches peuvent être :

complétées en ligne et adressées par email à mairie@colombelles.fr déposer à la mairie de Colombelles.

En cas de dossier incomplet, la commission d’attribution ne pourra instruire le dossier de demande de bourse.

## CONTACT

Direction Enfance Éducation Jeunesse Sport

Place F. Mitterrand

02 31 35 57 07 mairie@colombelles.fr`,
    order: 402,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-417",
    theme: "ecole",
    slug: "mediateurs",
    title: "Médiateurs",
    section: "vivre-a-colombelles",
    subsection: "Jeunesse",
    summary:
      "Une présence de proximité sur l'espace public.",
    content: `Deux médiateurs ont été recrutés par la Ville, depuis 2021, pour faciliter le lien avec les habitants. Ils sont sur le terrain pour être à votre écoute. L’objectif est de favoriser le lien social au quotidien sur la commune auprès de toutes les générations et de tous les habitants.

CONTACTS :

Médiateur : 07 57 09 66 30

Médiateur jeunesse : 06 86 49 95 52`,
    order: 403,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-418",
    theme: "sport",
    slug: "les-equipements-sportifs",
    title: "Les équipements sportifs",
    section: "vivre-a-colombelles",
    subsection: "Sport",
    summary:
      "Stades, gymnases, dojo et espaces en accès libre.",
    content: `La Ville de Colombelles dispose de 3 structures sportives :

Le stade Pierre-Rival,

52 avenue Léon Blum, composé de :

un gymnase un dojo une piste d’athlétisme un terrain de football un terrain de basket extérieur un skatepark

Le stade Michel-Hidalgo, rue du stade, quartier le Plateau, composé de :

un gymnase avec 604 places en tribune dont 13 PMR un terrain de football extérieur

## Le Stade Auguste-Michelle, rue Jean-Jaurès

Un stade en entrée de ville accueillant les entrainements de l’école de football

## Les terrains de tennis

Situés sur le complexe Rival, 3 terrains en accès libre  en dehors des créneaux réservés pour le Centre socio-culturel et sportif Léo Lagrange

## La piscine du SIVOM des Trois Vallées

Situé au cœur de Colombelles, notre Établissement public a à la fois une vocation ludique et sportive, puisqu’il accueille chaque jour de nombreux usagers, établissements scolaires, clubs et associations, représentant près de 60 000 visiteurs par an.

Notre structure comprend 2 bassins intérieurs. L’un de 12 m en profondeur croissante est réservé à l’apprentissage et à certaines activités telles que : les leçons particulières, les stages d’apprentissage et de perfectionnement enfant ainsi que l’Aquagym et l’Aquaphobie.

L’autre de 25 m en profondeur constante est plus adapté à la nage libre et sportive.

## Une vidéo inédite à destination du sport à Colombelles

Cette vidéo valorise la diversité des disciplines, les équipements ainsi que l’implication des clubs et la passion des licenciés.

Stade Rival

## Stade Hildalgo

Piscine du SIVOM des 3 Vallées à  Colombelles

Tennis, stade Rival`,
    image: { url: "/media/ville/sport-les-structures-3.jpg", alt: "Les équipements sportifs" },
    order: 501,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-419",
    theme: "sport",
    slug: "les-labellisations",
    title: "Les labellisations",
    section: "vivre-a-colombelles",
    subsection: "Sport",
    summary:
      "Terre de Jeux et Ville active et sportive.",
    content: `## Ville active et sportive

La 9 e cérémonie nationale du label Ville Active et Sportive qui s’est déroulée à Nice le 30 octobre 2025 a réuni plus de 700 élus et directeurs de services des sports pour un record : 480 communes lauréates.

La Ville a reçu, pour la deuxième fois de suite, le label

« Ville Active et Sportive »

pour une durée de trois ans, distinguant ainsi la qualité et la continuité de son action en faveur du sport pour tous.

En lien étroit avec le tissu associatif, la Ville développe et modernise ses équipements, soutient la diversité des pratiques, favorise l’inclusion et encourage les initiatives Sport-Santé.

Cette reconnaissance nationale souligne l’engagement de Colombelles pour proposer une offre accessible, innovante et contribuer au dynamisme et à la qualité de vie de l’ensemble des habitants. Une Ville où le sport rime avec plaisir et bien-être !

Cette année encore, Colombelles est valorisée de 2 lauriers sur les 4 pouvant être obtenus.

Plus d’informations

## #TerredeJeux2024

“Les Jeux seront ceux de la France entière”. Avec le label Terre de Jeux 2024, le comité d’organisation des Jeux Olympiques met en place un dispositif unique pour valoriser les collectivités territoriales qui œuvrent pour une pratique du sport plus développée et inclusive.

Ainsi depuis 2021, la Ville est labellisée Terre de Jeux 2024.

Être labellisé Terre de Jeux 2024 permet d’impulser une dynamique locale en amont de cet événement international.

Ainsi avec les écoles, des rendez-vous ont lieu :

semaine olympique et paralympique avec :

une course symbolique de 230 kilomètres qui séparent Colombelles de Paris, lieu des Jeux Olympiques en 2024, sous forme de relais des challenges interclasses la conception d’une flamme olympique et le transfert de la flamme du site scolaire Henri-Sellier à celui de Victor-Hugo comme un emblème des actions sur le territoire rencontres avec des sportifs de haut niveau

Plus d’information :

https://terredejeux.paris2024.org

## /

https://www.paris2024.org/fr/label-terre-de-jeux-2024/`,
    image: { url: "/media/ville/sport-les-labellisations-2.jpg", alt: "Les labellisations" },
    order: 502,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-420",
    theme: "sport",
    slug: "course-d-orientation-permanente",
    title: "Course d'orientation permanente",
    section: "vivre-a-colombelles",
    subsection: "Sport",
    summary:
      "Un parcours balisé dans le bois de Colombelles.",
    content: `Un circuit de course d’orientation est à votre disposition dans le Bois de Colombelles.

Entre amis ou en famille, tentez l’expérience : plaisir, partage et échange garantis !

Comment ça fonctionne ?

Une carte spéciale d’orientation, une boussole et c’est parti pour une activité sportive de plein air praticable par tous ! La course d’orientation est à la fois une activité physique et de réflexion.

Seul ou en famille, jeunes ou moins jeunes, tout le monde y trouve un intérêt : celui de se promener en pleine nature ou en milieu urbain, découvrir un espace, trouver les balises, ou courir. À Colombelles, le parcours est installé dans le Bois de Colombelles.

Pour tenter l’expérience, veuillez télécharger la carte et le carton de contrôle`,
    order: 503,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-421",
    theme: "solidarite",
    slug: "accompagnement-des-seniors",
    title: "Accompagnement au quotidien",
    section: "vivre-a-colombelles",
    subsection: "Séniors",
    summary:
      "Visites de convivialité, transport solidaire, banquet et colis.",
    content: `## Visites de convivialité

Pour une promenade, aller faire quelques courses, partager des moments de convivialité et de discussions à domicile, vous accompagner à un rendez-vous médical, les services à la personne sont là pour vous simplifier la vie et la rendre plus facile et agréable.

Ces visites de convivialité favorise le bien vivre des personnes âgées, propose des activités au domicile (cuisine (autres que les repas), jeux de stimulation, lecture, jardinage etc…) et aussi des sorties en semaine (sur le territoire de Colombelles uniquement) permettant de rompre avec l’isolement.

CONTACTS : ccas@colombelles.fr / concierjeris@gmail.com : 02 31 35 57 00 / 02 31 83 21 30

## Transport solidaire

Ce service, réservé aux habitants de Colombelles adhérents à Atipic, vous permet d’être accompagné pour faire une course, aller à un rendez-vous médical ou au cinéma. Un conducteur vient vous chercher à votre domicile, vous dépose où vous le souhaitez et vient vous rechercher à l’heure convenue ensemble. Un service est également proposé aux personnes souhaitant se rendre à l’EHPAD de Colombelles pour un accueil de jour. Tarifs : consulter Atipic.

Renseignements et tarifs auprès d’Atipic, 02 31 83 21 30 – concierjeris@gmail.com

## Transports urbain

Twisto dispose d’un tarif solidaire destiné aux personnes fragiles qui offre des réductions plus importantes ou la gratuité des déplacements en bus et en tramway.

## Banquet et colis aux ainés

À l’occasion des vœux du nouvel an, le CCAS de Colombelles offre aux personnes âgées de 68 et plus un repas dansant. Les personnes ne souhaitant y participer reçoivent un colis au domicile remis par l’équipe municipale.

Renseignements auprès du CCAS, 7 rue Jules Guesde – Tél : 02 31 35 57 00

## Loisirs séniors

Pour sortir, échanger, rencontrer du monde, plusieurs associations sont présentes sur le territoire pour des activités :

le Club Le Nagard,  3 rue Jules Guesde > Georgette Delannoy, Présidente – georgetteanne14@gmail.com – 06 12 68 46 06 / 06 85 73 59 78

Loisirs Solidarité Retraités, avenue Léon Blum > Président Saïd Achaboub – 15 avenue Léon-Blum – achaboub.sahid@orange.fr – 06 32 89 58 27 / 06 33 80 11 85

## Sports séniors

Du sport adapté aux seniors est proposé spécifiquement pour les plus de 60 ans

Information : Centre socio-culturel Léo Lagrange : 02 31 72 40 86 – 07 67 49 15 45

## Mutuelle

Le CCAS propose à tous les Colombellois (actifs et non actifs) relevant du régime général de bénéficier d’un accès à une complémentaire santé à moindre coût

Renseignements auprès du CCAS, 7 rue Jules Guesde – Tél : 02 31 35 57 00`,
    image: { url: "/media/ville/seniors-les-aides-3.jpg", alt: "Accompagnement au quotidien" },
    order: 601,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-422",
    theme: "solidarite",
    slug: "residence-jean-goueslard",
    title: "Résidence Jean-Goueslard",
    section: "vivre-a-colombelles",
    subsection: "Séniors",
    summary:
      "La résidence autonomie de la commune.",
    content: `## Le résidence

Jean Goueslard , situé au 5 et 9 rue Lucien Mangematin (à 50 m du centre-ville), est une résidence accueillant des retraités autonomes comprenant 34 logements T1 Bis d’une superficie de 33 m².

## À la résidence

Jean Goueslard , chacun vit à son rythme tout en conservant ses droits et devoirs de locataire et en bénéficiant d’une surveillance.

Des espaces collectifs permettent de se réunir autour de jeux de société, d’activités de loisirs ou de manifestations festives pour ceux qui le souhaitent.

## La résidence

Jean Goueslard est un lieu d’hébergement non-médicalisé pour personnes autonomes.

CONTACT

Résidence Jean Goueslard

## 5 et 9, rue Lucien Mangematin

02 31 35 57 00 residence.goueslard@colombelles.fr

Appartement de la Résidence Goueslard

Appartement de la Résidence Goueslard

Appartement de la Résidence Goueslard

Animation musicale

Sortie

Repas en commun

Salon commun`,
    image: { url: "/media/ville/seniors-foyer-residence-goueslard-6.jpg", alt: "Résidence Jean-Goueslard" },
    order: 602,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-423",
    theme: "solidarite",
    slug: "structures-seniors-du-territoire",
    title: "Autres structures du territoire",
    section: "vivre-a-colombelles",
    subsection: "Séniors",
    summary:
      "EHPAD et services aux personnes âgées à proximité.",
    content: `Établissement d’hébergement pour personnes âgées dépendantes

## Belle Colombe

L’établissement EHPAD Belle Colombe est un EHPAD, maison de retraite médicalisée pour personnes âgées dépendantes. Cet établissement dispose de 82 lits.

Plus d’informations

Contact

Informations pratiques

EHPAD Belle Colombe

1 rue Victor Hugo

02 31 35 87 87

## Associations seniors

Envie de partager des activités, des repas, des sorties, l’association Le Nagard vous offre la possibilité

Informations pratiques

Club le Nagard

## 3 rue Jules Guesde

06 12 68 46 06 / 06 85 73 59 78 georgetteanne14@gmail.com`,
    order: 603,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-424",
    theme: "culture",
    slug: "vie-associative",
    title: "Vie associative",
    section: "vivre-a-colombelles",
    subsection: "Associations",
    summary:
      "Le tissu associatif colombellois et l'accompagnement de la Ville.",
    content: `## DOSSIER DE DEMANDE DE SUBVENTION 2026

Au-delà des aides en nature telles que la mise à disposition de salles ou d’équipements dans l’organisation du fonctionnement ou des manifestations des associations, la Commune de Colombelles, sous certaines conditions, peut aider financièrement votre association.

Pour ce faire, veuillez télécharger ci-dessous le dossier de demande de subvention pour l’année 2026 ou le demander à l’adresse elise.ruaud@colombelles.fr

Le dossier de demande de subvention ainsi que le contrat d’engagement républicain sont à retourner à l’hôtel de ville, place François Mitterrand au plus tard le 3 décembre 2025.

Dossier demande de subvention associations 2026 pour les associations sportives (format PDF)

Dossier demande de subvention associations 2026 pour les autres associations (format PDF)

## Contrat d’engagement républicain à retourner signé

Afin de répondre à vos besoins, nous rappelons que deux types de subventions existent :

La subvention de fonctionnement :

pour l’activité usuelle de l’association (achat de matériel, développer une activité, etc.)

## La subvention de projet

: qui concerne le financement d’une action spécifique qu’une association souhaiterait mettre en place (événement exceptionnel, etc.).

Informations pratiques

Mairie de Colombelles

Place François-Mitterrand

02 56 27 50 82 compta@colombelles.fr

## FORUM DES ASSOCIATIONS

Le forum des associations est organisé le 1er samedi du mois de septembre au stade Pierre Rival, rue Léon Blum.

C’est l’occasion de rencontrer les associations du territoire, de vous renseigner et de vous inscrire pour l’année scolaire pour vous ou vos enfants.

Les actions et l’implication des équipes de bénévoles des associations ont permis d’obtenir le label ville active et sportive

.

## GUIDE DES ASSOCIATIONS

Des dizaines d’activités sportives, culturelles ou de loisirs vous attendent à Colombelles : retrouvez-les dans le guide 2025-2026`,
    image: { url: "/media/ville/associations-2.jpg", alt: "Vie associative" },
    order: 701,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-425",
    theme: "nature",
    slug: "espaces-verts",
    title: "Espaces verts",
    section: "vivre-a-colombelles",
    subsection: "Environnement",
    summary:
      "Vingt-deux hectares entretenus sans produit phytosanitaire.",
    content: `Tous les espaces verts à Colombelles

## Rendez-vous dans la rubrique

Nature pour découvrir le Bois, les parcs, les squares avec des aires de jeux… à Colombelles.

L’entretien des espaces verts est une compétence de la communauté urbaine Caen la mer.

Une équipe est en charge spécifiquement des espaces verts, mais aussi de la voirie. Ils travaillent au sein des locaux de la Ville mais sont employés par Caen la mer. La qualité de vie des habitants est au cœur de leur travail quotidien.

Les espaces verts sont entretenus de façon adaptée selon les caractéristiques des espaces verts, les types de fréquentation et  leurs usages : on parle de gestion différenciée.

Plus d’informations

Plan de la ville`,
    order: 801,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-426",
    theme: "nature",
    slug: "biodiversite",
    title: "Biodiversité",
    section: "vivre-a-colombelles",
    subsection: "Environnement",
    summary:
      "Atlas de la biodiversité, éco-pâturage et gestion différenciée.",
    content: `## Colombelles, territoire engagé pour la nature

Le programme « Territoires engagés pour la nature » vise à faire émerger, reconnaître et valoriser des plans d’actions en faveur de la biodiversité.

Colombelles est un des 200 territoires nationaux et un des 11 territoires normands reconnus engagés pour la nature par l’Office français de la biodiversité.

Colombelles s’engage ainsi dans un plan d’actions sur 3 ans via 4 actions principales :

la mise en place de jardins comestibles en centre-ville avec le concours de l’entreprise Atipic le boisement expérimental à proximité de la Grande Halle et le renforcement de la trame verte et bleue (avec un plan de renaturation des berges de l’Orne)

la déminéralisation du cimetière la création d’un atlas de la biodiversité

L’opération « une naissance – un arbre »

intègre le programme « Territoire engagé pour la nature ». Ce dispositif contribue à la création d’un micro boisement dans la ville. Depuis 2015, 550 arbres ont été plantés sur la commune.

## Piqu’En Ville : un hérisson dans mon jardin

Sur l’exemple de la démarche mise en œuvre en Angleterre, le

## Groupe Mammalogique Normand

(GMN) propose de mettre en place un programme participatif de reconnexion des jardins et autres espaces verts en faveur de la petite faune terrestre.

L’objectif principal de ce programme est simple : recréer, avec l’aide des habitants de la région Normandie, des passages entre les propriétés privées et publiques pour permettre le déplacement de ces espèces, dont le Hérisson d’Europe. Pour cela, le GMN se propose de créer des passages de jardin en jardin et de sensibiliser le publique sur le respect de la faune sauvage

.

Pourquoi le Hérisson d’Europe ? Car ce mammifère a besoin d’un domaine vital de plusieurs hectares par individu, se déplaçant de 1 à 4 km chaque nuit pour trouver de la nourriture (coléoptères, vers de terre, escargots, limaces), des abris et des partenaires… sans se faire écraser !

Colombelles a été une des premières villes à s’inscrire dans le programme

. Elle a commencé en 2024 avec un passage pour la faune qui a été inauguré le 9 avril au niveau du stade Hidalgo à Colombelles. Le même jour, un passage au sein de l’école des Tilleuls a été créé avec une sensibilisation des scolaires par le Groupe Mammalogique Normand

La Ville poursuit en 2025 avec le choix du site du cimetière qui peut accueillir ce projet, dans la mesure ou il est bordé en limites séparatives de dalles de béton.

Au total, 31 passages à hérissons ont vu le jour partagés entre les jardins privés ou espaces communaux.

## Création de 2 mares écologiques dans le Bois de Colombelles

En mars dernier, la Ville a engagé des travaux de création de deux mares écologiques au cœur du Bois de Colombelles. Ce projet s’inscrit dans une démarche globale de préservation et de valorisation des milieux naturels.

Véritables écosystèmes à part entière , ces mares constituent un habitat favorable pour de nombreuses espèces. Elles accueilleront notamment la grenouille rousse , espèce emblématique et essentielle des zones humides, ainsi qu’une grande diversité de plantes et d’animaux aquatiques.

Cette réalisation est le fruit d’un engagement collectif en faveur de l’environnement et s’inscrit pleinement dans le cadre du label

Territoire Engagé pour la Nature , porté par la collectivité.

Pourquoi ces mares sont-elles essentielles ?

Elles recréent des écosystèmes favorables à la faune et à la flore locales

Elles contribuent activement à la préservation de la biodiversité

Elles offrent aux habitants un espace naturel à découvrir, à comprendre et à protéger

À travers ce projet, la commune affirme sa volonté d’agir concrètement pour la protection des milieux naturels et la transmission de ces enjeux aux générations futures.

## Charte et permis de végétaliser

Vous aimeriez végétaliser sur votre trottoir devant chez vous ou vous êtes en appartement et vous manquez d’espace pour un petit jardin…. Vous pouvez faire une demande de permis de végétaliser pour un espace à proximité de votre logement.

Comment faire ?

Prenez d’abord connaissance de la charte de végétalisation qui est à signer et remplissez la demande de permis de végétalisation qui précisera l’emplacement, les plantes et éventuels matériaux souhaités. Une fois validée par le comité de végétalisation, l’espace public sera votre jardin !

Information : S ervice urbanisme : urbanisme@colombelles.fr – 02 31 35 25 00

## Plus d’information dans l e guide  la végétalisation

## Atlas de la biodiversité communale 2021 – 2023

En Normandie, 25% des espèces sauvages évaluées par les scientifiques sont menacées d’extinction !

Mobilisées de longue date sur le sujet, les communes de Colombelles et de Giberville ont lancé la réalisation d’un Atlas de la Biodiversité Communale (ABC) jusqu’en juin 2023 en partenariat avec le CPIE Vallée de l’Orne.

AVEC VOUS, NOUS AVONS RÉALISÉ L’ATLAS DE LA BIODIVERSITÉ COMMUNALE son principe : faire un état des lieux des espèces sauvages du territoire, en impliquant les habitants et autres acteurs, sur la question de la sauvegarde de cette biodiversité.

ses objectifs : protéger ce patrimoine commun, aussi bien dans le cadre des grands projets d’aménagement du territoire comme des petits gestes du quotidien.

Le rapport final sera prochainement publié sur cette page.

CONTACT

## CPIE Vallée de l’Orne

06 49 98 00 84 abc.colombelles.giberville@gmail.com`,
    image: { url: "/media/ville/environnement-biodiversite-10.jpg", alt: "Biodiversité" },
    order: 802,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-427",
    theme: "patrimoine",
    slug: "travaux",
    title: "Travaux",
    section: "vivre-a-colombelles",
    subsection: "Grands projets",
    summary:
      "Les chantiers en cours sur la commune.",
    content: `## Requalification de la Rue Jean Jaurès

La rue Jean Jaurès fait l’objet de travaux importants pour des réfections et mise en séparatif des réseaux eaux usées, pluviales et potables, d’effacement des réseaux et d’aménagements urbains.

Différentes de travaux sont à prévoir :

Septembre 2023 – juillet 204 :

Réfection et mise en séparatif des réseaux eaux usées et des eaux pluviales et potables

## Juillet – décembre 2024

: Effacement des réseaux de distribution d’électricité, d’éclairage et de télécommunication

## 2025

: Aménagement de la nouvelle rue (piste cyclable, carrefour apaisé, paysagement…)

## 2026

: Aménagement du tronçon Pumptrack > Rond-point Lazzaro

## Déminéralisation du cimetière

Cette opération vise à redonner une place plus importante au végétal. Elle comprend l’engazonnement des allées et des espaces inter-tombes , la plantation de bosquets boisés sur les pelouses , ainsi que la mise en place d’arbres isolés au sein des haies horticoles existantes

. Par ailleurs, les carrés en attente feront l’objet d’une gestion en fauche tardive , favorable au développement de la biodiversité.

Cette action rentre dans le cadre du label « territoire engagé pour la nature » .

## Nouveau pont de Colombelles

Construit il y a plusieurs décennies, le pont de Colombelles est un axe stratégique reliant l’Ouest et l’Est de l’agglomération caennaise. Aujourd’hui en fin de vie, il ne répond plus aux besoins actuels de circulation (18 000 véhicules par jour, dont 7 % de poids lourds) et son entretien ne permet plus une exploitation optimale.

Son remplacement prochain offrira des bénéfices durables : une circulation plus fluide et plus sûre, des aménagements conformes aux normes pour tous les usagers, un meilleur partage de l’espace avec une piste cyclable bidirectionnelle et un trottoir PMR, ainsi qu’un cadre de vie amélioré. Le nouvel ouvrage, pensé pour l’avenir, accompagnera l’évolution du trafic, soutiendra l’activité économique et garantira la continuité de la navigation sur le canal.

Le chantier du nouveau pont a débuté en novembre 2025 pour une durée prévisionnelle d’environ 22 mois. Il se déroule en plusieurs phases successives, accompagnées d’une information régulière des riverains et des usagers.

Les principales étapes comprennent : l’adaptation du réseau de chauffage urbain (déjà achevée), les travaux préparatoires et la sécurisation du site à l’automne 2025, les terrassements au printemps 2026, puis la construction du nouveau pont et de ses équipements à l’été 2026. Le raccordement de la voirie et la mise en service interviendront entre l’été 2026 et début 2027, avant la déconstruction de l’ancien pont et les aménagements paysagers au premier semestre 2027.`,
    image: { url: "/media/ville/projets-sur-le-territoire-travaux-2.jpg", alt: "Travaux" },
    order: 901,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-428",
    theme: "patrimoine",
    slug: "operations-d-amenagement",
    title: "Opérations d'aménagement",
    section: "vivre-a-colombelles",
    subsection: "Grands projets",
    summary:
      "Les projets urbains qui dessinent la ville de demain.",
    content: `## NOUVELLES SERRES DE CULTURE

Synthèse de la consultation dans le cadre de la participation par voie électronique du public 2024

Du vendredi 18 juillet au mercredi 20 août 2025 , une nouvelle procédure de participation du public par voie électronique sera ouverte pour recueillir vos avis ou poser vos questions sur la modification de la construction d’une serre de culture et de l’extension de la serre existante par la réalisation d’un local de conditionnement avec toitures dotées de panneaux photovoltaïques et la création d’une réserve d’eau supplémentaire d’un diamètre de 14,58 mètres.

Nouvelle procédure de participation du public :

modification du permis de construire d’une nouvelle serre de culture et l’extension de la serre existante

Du vendredi 18 juillet au mercredi 20 août 2025 , une procédure de participation du public par voie électronique sera ouverte pour recueillir vos avis ou poser vos questions sur sur la modification de la construction d’une serre de culture et de l’extension de la serre existante par la réalisation d’un local de conditionnement avec toitures dotées de panneaux photovoltaïques et la création d’une réserve d’eau supplémentaire d’un diamètre de 14,58 mètres située 5 rue du Four à Chaux à Colombelles.

Vous pourrez faire part de vos observations ou propositions, sous forme électronique, à l’adresse électronique suivante:

urbanisme@colombelles.fr du vendredi 18 juillet 2025 à 12h00 au mercredi 20 août 2025 à 12h00 inclus.

Consultez le dossier complet :

## pièces constitutives de la demande de permis de construire

(en raison d’un poids importants de fichiers, le permis de construire est consultable sur demande à urbanisme@colombelles.fr)

études d’impact > fichier 1
- 

fichier 2 avis de la Missions régionales d’autorité environnementale (MRAe)

A l’issue de la présente procédure de participation du public et du délai d’instruction de la demande de permis de construire, le Maire de Colombelles statuera sur ladite demande.

La synthèse des observations et propositions du public sera consultable sur le site Internet au plus tard à la date de publication de la décision du Maire de Colombelles.

Documents

:

Arrêté municipal portant avis d’ouverture de la procédure de participation du public par voie électronique sur un projet de construction d’une serre de culture et d’extension de la serre existante situé 5 rue du Four à Chaux à Colombelles

Affiche portant avis d’ouverture de la procédure de participation du public par voie électronique sur un projet de construction d’une serre de culture et d’extension de la serre existante situé 5 rue du Four à Chaux à Colombelles

ÉCOQUARTIER

## En lisière du Bois

Depuis la fermeture du collège Henri-Sellier de Colombelles en 2018, votée par le Conseil Départemental du Calvados, l’emprise de l’établissement laisse une friche d’environ 1,8 hectare que la commune de Colombelles souhaite remobiliser.

La réflexion autour du site a permis d’aboutir à un projet de quartier d’habitat, dans l’esprit d’un parc habité, laissant toute sa place à la nature.

Situé dans un lieu stratégique de la ville, entre le bois, le groupe scolaire, la cité suédoise et le centre-ville, ce projet est une opportunité d’offrir aux habitants du futur quartier un cadre de vie de qualité mais aussi de permettre aux Colombellois un accès direct et plus aisé au bois et aux bords de l’Orne.

## La démarche ÉcoQuartier

Portée par le Ministère de la Transition écologique, la démarche ÉcoQuartier favorise de nouvelles façons de concevoir, construire et gérer la ville durablement.

Cette charte repose sur 4 objectifs :

encourager la sobriété dans la consommation des ressources naturelles et de l’énergie ;

penser le bien-être des habitants et la qualité du cadre de vie comme des leviers de la résilience du quartier ;

proposer une offre de logement pour tous, de qualité (énergétique, environnementale et d’usage) adaptée, diversifiée et des espaces publics favorables à la rencontre et aux activités physiques ;

diversifier l’offre de services et d’équipements et intensifier les usages de la ville.

Un projet qui amène la nature en ville :

création d’un corridor écologique renfort de la trame paysagère maintien sur site et valorisation des arbres remarquables création d’une voie douce paysagère desservant le quartier au centre-ville et au bois de Colombelles désenclavement du bois de Colombelles gestion des eaux pluviales par des systèmes alternatifs (noues, bassins paysagers ouverts)

Présentation Réunion Publique décembre 2023 20231214

## Dossier de presse du projet

Réunion publique d’information du 20 décembre 2023 : dossier de présentation

Projection du quartier - droits réservés`,
    image: { url: "/media/ville/projets-sur-le-territoire-operations-damenagement-2.jpg", alt: "Opérations d'aménagement" },
    order: 902,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },

  /* ---------- Sortir et découvrir · activités sportives ---------- */
  {
    id: "p-310",
    theme: "sport",
    slug: "piscine",
    title: "La piscine",
    section: "sortir-et-decouvrir",
    subsection: "Activités sportives",
    summary:
      "Rouverte après près de deux ans de travaux : grand bassin homologué, petit bassin d'apprentissage, isolation renforcée et panneaux solaires.",
    content: `La piscine a rouvert ses portes après **près de deux ans de travaux**. La rénovation a porté aussi bien sur le confort des usagers que sur la performance énergétique du bâtiment. L'équipement accueille environ 60 000 visiteurs par an.

## Ce que les travaux ont changé

- Reprise complète des sols et des revêtements
- Homologation du grand bassin pour la compétition, sur cinq couloirs
- Isolation thermique renforcée
- Installation de panneaux solaires

## Les bassins

- **Grand bassin** — 25 mètres, pour la nage libre et la pratique sportive.
- **Petit bassin** — profondeur progressive jusqu'à 1,20 m, pour l'apprentissage et l'aquagym.

## Horaires d'ouverture au public

| Jour | Horaires |
| --- | --- |
| Mardi à vendredi | 10h30 – 13h30 · 14h00 – 18h00 |
| Samedi | 10h00 – 13h30 · 14h00 – 16h30 |
| Dimanche et lundi | Fermé |

Le bassin est évacué vingt minutes avant la fermeture.

## Règles d'accès

Le **bonnet de bain est obligatoire**. Les shorts et bermudas ne sont pas admis.

## Les activités encadrées

Sport santé, lutte contre l'aquaphobie, perfectionnement adulte, aquagym, aquapalmes et aquabike.

La piscine est gérée par le SIVOM des Trois Vallées, qui publie les tarifs et le calendrier des activités.`,
    order: 1,
    status: "publie",
    updatedAt: "2026-08-30T10:00:00.000Z",
  },
  {
    id: "p-311",
    theme: "sport",
    slug: "skate-park",
    title: "Le skate park",
    section: "sortir-et-decouvrir",
    subsection: "Activités sportives",
    summary:
      "Un espace de glisse en accès libre pour le skate, la trottinette et le roller, au pied du stade Pierre-Rival.",
    content: `Le skate park offre un espace de glisse aux amateurs de **skate, de trottinette et de roller**. L'accès est libre et gratuit, tous les jours.

## Où le trouver

Il jouxte le **stade Pierre-Rival**, 52 avenue Léon-Blum. L'implantation permet d'enchaîner facilement avec les équipements voisins : terrain de basket extérieur, terrain de football, piste d'athlétisme.

## À proximité immédiate

- Terrain de basket en accès libre
- Piste d'athlétisme
- Terrain de football
- Aire de jeux et bac à sable, rue Raymond-Cosson

## Bon à savoir

L'équipement n'est pas surveillé : le port des protections est vivement recommandé, en particulier pour les plus jeunes. Pour signaler une dégradation, utilisez le [formulaire de signalement](/signalement).`,
    order: 2,
    status: "publie",
    updatedAt: "2026-08-30T10:00:00.000Z",
  },
  {
    id: "p-312",
    theme: "sport",
    slug: "pumptrack",
    title: "Le pumptrack",
    section: "sortir-et-decouvrir",
    subsection: "Activités sportives",
    summary:
      "Deux pistes complémentaires, l'une pour débuter et l'autre pour les pratiquants confirmés, espace Auguste-Michelle.",
    content: `Inauguré au début de l'année 2025, le pumptrack propose **deux pistes complémentaires**, faites de bosses et de virages relevés aux dénivelés adaptés : l'une pensée pour les débutants, l'autre pour les pratiquants confirmés.

## Un espace de glisse sécurisé

L'équipement est en accès libre, tous les jours. Il s'adresse aux jeunes et aux amateurs de pratiques freestyle, à vélo comme en trottinette.

## Accès et aménagements

- **Espace Auguste-Michelle**, rue Jean-Jaurès
- Accessible en mobilités douces, notamment par la piste cyclable Jean-Jaurès
- Une vingtaine de places de stationnement à proximité des vestiaires existants
- Des bancs installés autour des pistes pour les accompagnants et les spectateurs

## Financement

Le projet a été financé à hauteur de 80 % par la Région Normandie, le Département du Calvados, l'État, l'Agence nationale du sport et la Fédération française de football. Le chantier a démarré à l'automne 2024.`,
    order: 3,
    status: "publie",
    updatedAt: "2026-08-30T10:00:00.000Z",
  },
  {
    id: "p-313",
    theme: "sport",
    slug: "espaces-sportifs-en-acces-libre",
    title: "Les espaces sportifs en accès libre",
    section: "sortir-et-decouvrir",
    subsection: "Activités sportives",
    summary:
      "Trois stades, deux gymnases, des terrains et une course d'orientation permanente : où pratiquer librement, dans chaque quartier.",
    content: `Colombelles est labellisée **Ville active et sportive** (deux lauriers) et **Terre de Jeux 2024**. La commune compte trois stades et deux gymnases, et met à disposition des espaces libres et gratuits dans plusieurs quartiers, pour pratiquer seul, en club ou entre amis.

## Stade Michel-Hidalgo — rue du Stade

- Terrain de football en accès libre
- Piste d'athlétisme accessible
- Gymnase réservé aux associations et aux écoles

## Stade Auguste-Michelle — rue Jean-Jaurès

- Terrain de football d'entraînement
- Pumptrack attenant

## Stade Pierre-Rival — 52 avenue Léon-Blum

- Piste d'athlétisme
- Terrains de football, de handball, de basket et de foot à 5
- Trois courts de tennis, en dehors des cours réservés
- Gymnase et dojo réservés aux associations et aux écoles
- Skate park attenant

## Plateau sportif Henri-Sellier

Accessible depuis le bois de Colombelles : une piste, un terrain de handball et des panneaux de basket.

## La course d'orientation permanente

Un circuit praticable par tous traverse le **bois de Colombelles**. Les cartes et les fiches de boussole se téléchargent gratuitement. L'activité mêle effort physique et lecture de carte : elle se pratique en famille comme en entraînement.`,
    order: 4,
    status: "publie",
    updatedAt: "2026-08-30T10:00:00.000Z",
  },
  {
    id: "p-314",
    theme: "famille",
    slug: "aires-de-jeux",
    title: "Les aires de jeux",
    section: "sortir-et-decouvrir",
    subsection: "Activités sportives",
    summary:
      "Huit espaces aménagés dans les quartiers, avec des équipements adaptés à chaque tranche d'âge.",
    content: `Des aires de jeux sont aménagées dans chaque quartier, avec des équipements adaptés aux différentes tranches d'âge.

| Quartier | Emplacement | Âges |
| --- | --- | --- |
| Centre-ville | Espace Olympe-de-Gouges, avenue Léon-Blum | 2 – 6 ans et 6 – 12 ans |
| Complexe Pierre-Rival | Rue Raymond-Cosson, près du skate park | Bac à sable et piste de promenade |
| Bois et maisons suédoises | Rue de Suède | À partir de 3 ans |
| Jean-Jaurès | Rue Pierre-Mendès-France | 4 – 10 ans |
| Jean-Jaurès | Rue Fernand-Léger | 5 – 12 ans |
| Le Plateau | Place des Tilleuls / square Mérel | 4 – 14 ans |
| Libéra | Cours de la Rose-Blanche | 1 – 6 ans et 4 – 14 ans |

## Sécurité et entretien

Les aires sont contrôlées régulièrement par les services techniques. Pour signaler un jeu dégradé ou un défaut d'entretien, utilisez le [formulaire de signalement](/signalement) : la demande est transmise directement au service compétent.`,
    order: 5,
    status: "publie",
    updatedAt: "2026-08-30T10:00:00.000Z",
  },
  {
    id: "p-320",
    theme: "famille",
    slug: "centre-leo-lagrange",
    title: "Centre socio-culturel et sportif Léo Lagrange",
    section: "sortir-et-decouvrir",
    subsection: "Lieux de vie",
    summary:
      "Le cœur de la vie associative colombelloise : espace familles, ateliers, sorties, et l'orchestre DÉMOS pour les 7-10 ans.",
    content: `Le centre socio-culturel et sportif Léo Lagrange développe la vie associative de la commune et propose des activités et des loisirs de qualité, dans les domaines socio-culturel, sportif et familial, à tous les âges.

## L'espace familles et habitants

- Des rendez-vous hebdomadaires parents-enfants, pour les 1 – 10 ans
- Des cours de français et des ateliers de couture pour les adultes
- Des sorties culturelles, des ateliers cuisine et des séances de cinéma
- Une thématique différente chaque mois

## Le projet DÉMOS

Une **éducation musicale gratuite sur trois ans** pour les enfants de 7 à 10 ans :

- Apprentissage collectif au sein d'un orchestre à cordes
- Deux séances hebdomadaires d'une heure trente
- Des regroupements mensuels réunissant 105 enfants issus de sept territoires

## Adhésion

**5 € par personne et par an**, de septembre à août. L'inscription à une activité se fait au moins deux jours à l'avance.

## Informations pratiques

52 avenue Léon-Blum, 14460 Colombelles
Téléphone : 02 31 72 40 86
Courriel : cscsleolagrange@gmail.com

| Jour | Horaires |
| --- | --- |
| Du lundi au vendredi | 8h30 – 12h30 · 13h30 – 17h00 |
| Samedi | 9h00 – 12h00, les 2ᵉ et 4ᵉ samedis hors vacances scolaires |`,
    order: 1,
    status: "publie",
    updatedAt: "2026-08-30T10:00:00.000Z",
  },

  /* ---------- Institutionnel ---------- */
  {
    id: "p-901",
    theme: "mairie",
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
    theme: "mairie",
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
| Aide à la saisie d'adresse | Proposer les voies de la commune | Mission d'intérêt public | Aucune conservation |
| Mesure d'audience | Améliorer le service | Intérêt légitime | 13 mois, données anonymisées |

## Aide à la saisie d'adresse

Le formulaire de signalement propose les voies de la commune au fur et à mesure de la frappe. Ces suggestions proviennent de la **Base Adresse Nationale**, service public opéré par l'État : le texte saisi dans ce seul champ est transmis à \`api-adresse.data.gouv.fr\` pour obtenir les propositions. Aucune donnée n'y est conservée et aucun identifiant ne vous est associé. Le champ reste libre : vous pouvez décrire un lieu sans utiliser les suggestions.

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
    theme: "mairie",
    slug: "accessibilite",
    title: "Accessibilité : totalement conforme",
    section: "institutionnel",
    summary:
      "Le site est conforme au RGAA 4.1. Une difficulté, une remarque ? Écrivez-nous, nous vous répondons.",
    content: `La Ville de Colombelles s'engage à rendre son site internet accessible à toutes et à tous, conformément à l'article 47 de la loi n° 2005-102 du 11 février 2005.

Cette déclaration s'applique au site **colombelles.vercel.app**.

## État de conformité

Le site est **totalement conforme** au référentiel général d'amélioration de l'accessibilité (RGAA), version 4.1. **100 % des critères sont respectés.**

## Comment cela a été vérifié

L'évaluation combine deux approches :

- **Tests automatisés** — l'analyse WAVE ne relève aucune erreur et confirme un score AIM de **10/10** sur l'ensemble des gabarits du site.
- **Vérification manuelle** des critères qu'aucun outil ne sait contrôler : ordre de tabulation, pertinence des intitulés, restitution par lecteur d'écran, cohérence des alternatives textuelles. Cette relecture a été conduite selon la **méthodologie Opquast** et validée par un expert certifié.

Les deux approches sont complémentaires : les outils automatiques ne couvrent qu'une part des critères, la relecture humaine fait le reste.

## Ce qui a été mis en place

L'accessibilité a été traitée comme une contrainte de conception, et non comme une correction apportée après coup :

- Navigation entièrement possible au clavier, lien d'évitement vers le contenu principal, ordre de tabulation conforme à l'ordre de lecture
- Structure de titres hiérarchisée sur toutes les pages, sans saut de niveau
- Chaque champ de formulaire porte un intitulé qui lui est lié ; les erreurs sont annoncées aux technologies d'assistance et décrivent la correction attendue
- Les saisies sont conservées après une erreur, listes déroulantes comprises
- Contrastes supérieurs au rapport de 4,5:1, en thème clair comme en thème sombre
- La couleur ne porte jamais seule une information : le code couleur thématique double toujours un intitulé écrit
- Respect de la préférence système de réduction des animations
- Texte alternatif obligatoire pour tout média ajouté depuis l'espace d'administration
- La carte interactive est doublée d'une liste équivalente, exploitable au lecteur d'écran
- Le site reste utilisable jusqu'à un agrandissement de 200 %, sans défilement horizontal

## Technologies et outils

Site réalisé en HTML5, CSS3, JavaScript et SVG. Vérifications menées avec Firefox et NVDA, Safari et VoiceOver, WAVE, l'audit d'accessibilité de Lighthouse et un analyseur de contrastes.

## Pages évaluées

Accueil, page de rubrique, page de contenu, actualité, agenda, formulaire de contact, formulaire de signalement, annuaire, publications, plan de la ville, recherche, page d'erreur 404 et plan du site.

## Une difficulté ? Écrivez-nous

Si un contenu vous résiste, si quelque chose ne fonctionne pas comme il le devrait, ou si vous avez simplement une remarque à nous faire : dites-le-nous. Nous vous répondons sous quinze jours, et nous vous transmettons l'information sous une autre forme si nécessaire — par téléphone, par courrier ou en vous accueillant à la mairie.

- Courriel : accessibilite@colombelles.fr
- Téléphone : 02 31 35 25 00
- Formulaire : [nous écrire](/contact)
- Sur place : hôtel de ville, place François Mitterrand

Vos retours nous servent : ce sont eux qui font progresser le site.

Déclaration mise à jour à chaque évolution significative du site.`,
    order: 3,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
];

const documents: DocumentItem[] = [
  { id: "d-001", title: "Guide des associations 2026-2027", category: "Vie associative", url: "/documents/guide-associations-2026-2027.pdf", fileType: "PDF", size: "1,1 Ko", publishedAt: "2026-08-25T10:00:00.000Z", status: "publie" },
  { id: "d-002", title: "Budget primitif 2026 — note de présentation", category: "Finances", url: "/documents/budget-primitif-2026.pdf", fileType: "PDF", size: "1,1 Ko", publishedAt: "2026-03-26T10:00:00.000Z", status: "publie" },
  { id: "d-003", title: "Procès-verbal du conseil municipal du 24 juin 2026", category: "Conseil municipal", url: "/documents/pv-conseil-2026-06-24.pdf", fileType: "PDF", size: "1,2 Ko", publishedAt: "2026-07-08T10:00:00.000Z", status: "publie" },
  { id: "d-004", title: "Procès-verbal du conseil municipal du 25 mars 2026", category: "Conseil municipal", url: "/documents/pv-conseil-2026-03-25.pdf", fileType: "PDF", size: "1,2 Ko", publishedAt: "2026-04-10T10:00:00.000Z", status: "publie" },
  { id: "d-005", title: "DICRIM — Document d'information communal sur les risques majeurs", category: "Sécurité", url: "/documents/dicrim-colombelles.pdf", fileType: "PDF", size: "1,2 Ko", publishedAt: "2026-04-10T10:00:00.000Z", status: "publie" },
  { id: "d-006", title: "Calendrier de collecte des déchets 2026-2027", category: "Environnement", url: "/documents/calendrier-collecte-2026.pdf", fileType: "PDF", size: "1,1 Ko", publishedAt: "2026-08-18T10:00:00.000Z", status: "publie" },
  { id: "d-007", title: "Colombelles Magazine — n° 78, été 2026", category: "Journal municipal", url: "/documents/magazine-78.pdf", fileType: "PDF", size: "1,1 Ko", publishedAt: "2026-06-30T10:00:00.000Z", status: "publie" },
  { id: "d-008", title: "Colombelles Magazine — n° 77, printemps 2026", category: "Journal municipal", url: "/documents/magazine-77.pdf", fileType: "PDF", size: "1,1 Ko", publishedAt: "2026-03-31T10:00:00.000Z", status: "publie" },
  { id: "d-009", title: "Analyse des besoins sociaux 2025", category: "Solidarité", url: "/documents/abs-2025.pdf", fileType: "PDF", size: "1,1 Ko", publishedAt: "2025-11-20T10:00:00.000Z", status: "publie" },
  { id: "d-010", title: "Atlas de la biodiversité communale", category: "Environnement", url: "/documents/atlas-biodiversite.pdf", fileType: "PDF", size: "1,1 Ko", publishedAt: "2024-10-15T10:00:00.000Z", status: "publie" },
  { id: "d-011", title: "Règlement intérieur des salles municipales", category: "Vie municipale", url: "/documents/reglement-salles.pdf", fileType: "PDF", size: "1,1 Ko", publishedAt: "2026-02-20T10:00:00.000Z", status: "publie" },
  { id: "d-012", title: "Fiches de randonnée — les trois boucles", category: "Tourisme", url: "/documents/fiches-randonnee.pdf", fileType: "PDF", size: "1,1 Ko", publishedAt: "2026-04-28T10:00:00.000Z", status: "publie" },
  { id: "d-014", title: "Plan général de Colombelles", category: "Tourisme", url: "/documents/plan-de-la-ville.pdf", fileType: "PDF", size: "2,4 Mo", publishedAt: "2026-01-15T10:00:00.000Z", status: "publie" },
  { id: "d-013", title: "Rapport annuel sur le prix et la qualité de l'eau 2025", category: "Environnement", url: "/documents/rpqs-eau-2025.pdf", fileType: "PDF", size: "1,2 Ko", publishedAt: "2026-09-01T10:00:00.000Z", status: "brouillon" },
];

/**
 * Conseil municipal — 29 élus : le maire, huit adjoints et vingt conseillers,
 * organisés par pôle de délégation comme sur le site de la Ville.
 */
/**
 * Points de la carte interactive.
 *
 * Les coordonnées proviennent de la Base Adresse Nationale
 * (api-adresse.data.gouv.fr), interrogée sur le code INSEE 14167 : elles sont
 * figées ici, aucun appel réseau n'a lieu à l'affichage. Seuls les lieux dont
 * l'adresse a pu être vérifiée figurent sur la carte ; les autres sont à
 * ajouter depuis l'administration.
 */
const places: PlaceItem[] = [
  { id: "pl-001", name: "Hôtel de ville", category: "Services municipaux", theme: "mairie", address: "Place François Mitterrand", description: "Accueil, état civil, urbanisme, éducation et services administratifs.", phone: "02 31 35 25 00", href: "/contact", lat: 49.20446, lon: -0.29692, status: "publie" },
  { id: "pl-002", name: "Salle Jean-Jaurès", category: "Services municipaux", theme: "mairie", address: "Place Albert-Thomas", description: "Salle municipale de 140 places, louable aux particuliers et aux associations.", href: "/demarches/location-de-salles", lat: 49.20210, lon: -0.30312, status: "publie" },
  { id: "pl-003", name: "Salle Émile-Dumas", category: "Services municipaux", theme: "mairie", address: "Rue Émile-Dumas", description: "Salle municipale de 80 places, louable aux particuliers et aux associations.", href: "/demarches/location-de-salles", lat: 49.20222, lon: -0.30239, status: "publie" },

  { id: "pl-010", name: "Stade Pierre-Rival", category: "Équipements sportifs", theme: "sport", address: "52 avenue Léon-Blum", description: "Piste d'athlétisme, football, handball, basket, foot à 5, trois courts de tennis, gymnase et dojo.", href: "/sortir-et-decouvrir/espaces-sportifs-en-acces-libre", lat: 49.20428, lon: -0.29372, status: "publie" },
  { id: "pl-011", name: "Stade Michel-Hidalgo", category: "Équipements sportifs", theme: "sport", address: "Rue du Stade", description: "Terrain de football et piste d'athlétisme en accès libre, gymnase réservé aux associations.", href: "/sortir-et-decouvrir/espaces-sportifs-en-acces-libre", lat: 49.18348, lon: -0.30489, status: "publie" },
  { id: "pl-012", name: "Stade Auguste-Michelle", category: "Équipements sportifs", theme: "sport", address: "Rue Jean-Jaurès", description: "Terrain de football d'entraînement, attenant au pumptrack.", href: "/sortir-et-decouvrir/espaces-sportifs-en-acces-libre", lat: 49.20137, lon: -0.30149, status: "publie" },
  { id: "pl-013", name: "Skate park", category: "Équipements sportifs", theme: "sport", address: "Près du stade Pierre-Rival, rue Raymond-Cosson", description: "Espace de glisse en accès libre : skate, trottinette et roller.", href: "/sortir-et-decouvrir/skate-park", lat: 49.20335, lon: -0.29455, status: "publie" },
  { id: "pl-014", name: "Pumptrack", category: "Équipements sportifs", theme: "sport", address: "Espace Auguste-Michelle, rue Jean-Jaurès", description: "Deux pistes de bosses et de virages relevés, pour débutants et confirmés.", href: "/sortir-et-decouvrir/pumptrack", lat: 49.20165, lon: -0.30105, status: "publie" },

  { id: "pl-020", name: "Centre Léo Lagrange", category: "Lieux de vie", theme: "famille", address: "52 avenue Léon-Blum", description: "Centre socio-culturel et sportif : espace familles, ateliers, orchestre DÉMOS.", phone: "02 31 72 40 86", email: "cscsleolagrange@gmail.com", href: "/sortir-et-decouvrir/centre-leo-lagrange", lat: 49.20415, lon: -0.29340, status: "publie" },

  { id: "pl-021", name: "Médiathèque Le Phénix", category: "Équipements culturels", theme: "culture", address: "10 rue Elsa-Triolet", description: "45 000 documents, Micro-Folie, Mini-Lab et Espace public numérique.", phone: "02 31 72 27 46", href: "/sortir-et-decouvrir/mediatheque-le-phenix", lat: 49.20543, lon: -0.29773, status: "publie" },

  { id: "pl-040", name: "Groupe scolaire Henri-Sellier", category: "Enseignement", theme: "ecole", address: "5 rue Jules-Guesde", description: "École maternelle et élémentaire (CP-CE1), centre-ville et quartier Jean-Jaurès.", phone: "02 31 72 40 09", href: "/vivre-a-colombelles/ecoles-maternelles-et-elementaires", lat: 49.20441, lon: -0.30149, status: "publie" },
  { id: "pl-041", name: "École élémentaire Victor-Hugo", category: "Enseignement", theme: "ecole", address: "24 rue Émile-Mougins", description: "Site élémentaire du CE2 au CM2.", href: "/vivre-a-colombelles/ecoles-maternelles-et-elementaires", lat: 49.20642, lon: -0.29311, status: "publie" },

  { id: "pl-050", name: "Église de Colombelles", category: "Patrimoine", theme: "patrimoine", address: "Rue de l'Église", description: "Au cœur du centre-bourg historique.", href: "/sortir-et-decouvrir/historique-de-colombelles", lat: 49.20377, lon: -0.30756, status: "publie" },
  { id: "pl-051", name: "Le Plateau — ancien site de la SMN", category: "Patrimoine", theme: "patrimoine", address: "Rue de la Sidérurgie", description: "Les 300 hectares reconvertis de la Société métallurgique de Normandie.", href: "/sortir-et-decouvrir/societe-metallurgique-de-normandie", lat: 49.19230, lon: -0.28996, status: "publie" },

  { id: "pl-060", name: "Halte nautique et berges de l'Orne", category: "Nature et balades", theme: "nature", address: "Chemin de Halage", description: "Voie verte le long de l'Orne, pontons de pêche et aire de pique-nique.", href: "/sortir-et-decouvrir/nature-et-balades", lat: 49.20554, lon: -0.30702, status: "publie" },
  { id: "pl-061", name: "Bois de Colombelles", category: "Nature et balades", theme: "nature", address: "Rue de Suède", description: "Course d'orientation permanente et accès au plateau sportif Henri-Sellier.", href: "/sortir-et-decouvrir/espaces-sportifs-en-acces-libre", lat: 49.20790, lon: -0.29900, status: "publie" },

  { id: "pl-030", name: "Aire de jeux Olympe-de-Gouges", category: "Aires de jeux", theme: "famille", address: "Avenue Léon-Blum", description: "Deux espaces : 2-6 ans et 6-12 ans.", href: "/sortir-et-decouvrir/aires-de-jeux", lat: 49.20419, lon: -0.29665, status: "publie" },
  { id: "pl-031", name: "Aire de jeux du complexe Pierre-Rival", category: "Aires de jeux", theme: "famille", address: "Rue Raymond-Cosson", description: "Bac à sable et piste de promenade, près du skate park.", href: "/sortir-et-decouvrir/aires-de-jeux", lat: 49.20310, lon: -0.29533, status: "publie" },
  { id: "pl-032", name: "Aire de jeux des maisons suédoises", category: "Aires de jeux", theme: "famille", address: "Rue de Suède", description: "À partir de 3 ans, près du bois.", href: "/sortir-et-decouvrir/aires-de-jeux", lat: 49.20753, lon: -0.29958, status: "publie" },
  { id: "pl-033", name: "Aire de jeux Pierre-Mendès-France", category: "Aires de jeux", theme: "famille", address: "Rue Pierre-Mendès-France", description: "Quartier Jean-Jaurès, 4-10 ans.", href: "/sortir-et-decouvrir/aires-de-jeux", lat: 49.20082, lon: -0.30167, status: "publie" },
  { id: "pl-034", name: "Aire de jeux Fernand-Léger", category: "Aires de jeux", theme: "famille", address: "Rue Fernand-Léger", description: "Quartier Jean-Jaurès, 5-12 ans.", href: "/sortir-et-decouvrir/aires-de-jeux", lat: 49.20022, lon: -0.29978, status: "publie" },
  { id: "pl-035", name: "Aire de jeux Libéra", category: "Aires de jeux", theme: "famille", address: "Cours de la Rose-Blanche", description: "Deux espaces : 1-6 ans et 4-14 ans.", href: "/sortir-et-decouvrir/aires-de-jeux", lat: 49.18716, lon: -0.30178, status: "publie" },
];

/** Salles municipales louables — tarifs et capacités relevés sur le site de la Ville. */
const venues: VenueItem[] = [
  {
    id: "v-001",
    slug: "salle-jean-jaures",
    name: "Salle Jean-Jaurès",
    theme: "culture",
    capacity: "140 personnes assises",
    address: "Place Albert-Thomas, 14460 Colombelles",
    description:
      "La plus grande des deux salles municipales. Elle convient aux repas de famille, aux assemblées générales et aux manifestations associatives.",
    equipment: "Cuisine équipée : réfrigérateur, four et lave-vaisselle manuel.",
    rateResident: "332 € les 24 h · 561 € les 48 h",
    rateNonResident: "560 € les 24 h · 817 € les 48 h",
    extra: "Location de la vaisselle : 111 €, non comprise dans le tarif.",
    images: [
      "/media/salles/jean-jaures-1.svg",
      "/media/salles/jean-jaures-2.svg",
      "/media/salles/jean-jaures-3.svg",
    ],
    order: 1,
    status: "publie",
  },
  {
    id: "v-002",
    slug: "salle-emile-dumas",
    name: "Salle Émile-Dumas",
    theme: "ecole",
    capacity: "80 personnes assises",
    address: "Rue Émile-Dumas, 14460 Colombelles",
    description:
      "Une salle de taille intermédiaire, adaptée aux réunions, aux ateliers et aux réceptions familiales.",
    equipment: "Cuisine équipée : réfrigérateur, four et lave-vaisselle manuel.",
    rateResident: "202 € les 24 h · 365 € les 48 h",
    rateNonResident: "306 € les 24 h · 560 € les 48 h",
    extra: "Location de la vaisselle : 78 €, non comprise dans le tarif.",
    images: [
      "/media/salles/dumas-1.svg",
      "/media/salles/dumas-2.svg",
      "/media/salles/dumas-3.svg",
    ],
    order: 2,
    status: "publie",
  },
];

const elus: Elu[] = [
  { id: "el-001", name: "Marc Pottier", role: "Maire", delegation: "Urbanisme, aménagement et développement durable", pole: "Urbanisme, aménagement et développement durable", theme: "nature", order: 1, email: "accueil@colombelles.fr", permanence: "Sur rendez-vous" },

  { id: "el-002", name: "Annie Lemarié", role: "1ʳᵉ adjointe au maire", delegation: "Urbanisme, aménagement et développement durable", pole: "Urbanisme, aménagement et développement durable", theme: "nature", order: 2 },
  { id: "el-003", name: "Virginie Février", role: "Conseillère déléguée", delegation: "Développement économique, relations aux entreprises et aux commerces", pole: "Urbanisme, aménagement et développement durable", theme: "nature", order: 3 },
  { id: "el-004", name: "Anne Gourvil", role: "Conseillère déléguée", delegation: "Développement durable et économie sociale et solidaire", pole: "Urbanisme, aménagement et développement durable", theme: "nature", order: 4 },

  { id: "el-005", name: "Guy Lecoeur", role: "2ᵉ adjoint au maire", delegation: "Personnel et administration générale", pole: "Personnel et administration générale", theme: "contact", order: 5 },
  { id: "el-006", name: "Soulé Moustapha", role: "Conseiller délégué", delegation: "Qualité des services publics et relations aux usagers", pole: "Personnel et administration générale", theme: "contact", order: 6 },

  { id: "el-007", name: "Nadine Lefèvre", role: "3ᵉ adjointe au maire", delegation: "Démocratie participative, santé et prévention des risques", pole: "Démocratie participative, santé et prévention des risques", theme: "actu", order: 7 },
  { id: "el-008", name: "Blandine Demissy", role: "Conseillère déléguée", delegation: "Droit à la santé et ville inclusive", pole: "Démocratie participative, santé et prévention des risques", theme: "actu", order: 8 },
  { id: "el-009", name: "Mathieu Morin", role: "Conseiller municipal", delegation: "Accès aux droits et lutte contre les discriminations", pole: "Démocratie participative, santé et prévention des risques", theme: "actu", order: 9 },
  { id: "el-010", name: "Sylvie Blaizot", role: "Conseillère municipale", delegation: "Instances citoyennes", pole: "Démocratie participative, santé et prévention des risques", theme: "actu", order: 10 },

  { id: "el-011", name: "Vincent Ferchaud", role: "4ᵉ adjoint au maire", delegation: "Sport et animation", pole: "Sport et animation", theme: "sport", order: 11 },
  { id: "el-012", name: "Steve Lechangeur", role: "Conseiller délégué", delegation: "Pratiques sportives", pole: "Sport et animation", theme: "sport", order: 12 },
  { id: "el-013", name: "Dimitry Forget", role: "Conseiller délégué", delegation: "Vie associative", pole: "Sport et animation", theme: "sport", order: 13 },
  { id: "el-014", name: "Denis Marie", role: "Conseiller municipal", delegation: "Événements", pole: "Sport et animation", theme: "sport", order: 14 },
  { id: "el-015", name: "Céline Ragot", role: "Conseillère municipale", delegation: "Inclusion par le sport", pole: "Sport et animation", theme: "sport", order: 15 },

  { id: "el-016", name: "Gabrielle Gilbert", role: "5ᵉ adjointe au maire", delegation: "Solidarité et affaires sociales", pole: "Solidarité et affaires sociales", theme: "solidarite", order: 16 },
  { id: "el-017", name: "Pascale Varignon", role: "Conseillère déléguée", delegation: "Lien avec les seniors", pole: "Solidarité et affaires sociales", theme: "solidarite", order: 17 },
  { id: "el-018", name: "Monique Halun", role: "Conseillère municipale", delegation: "Logement pour tous", pole: "Solidarité et affaires sociales", theme: "solidarite", order: 18 },

  { id: "el-019", name: "Jacky Zanovello", role: "6ᵉ adjoint au maire", delegation: "Cadre de vie, travaux et commissions de sécurité", pole: "Cadre de vie, travaux et sécurité", theme: "patrimoine", order: 19 },
  { id: "el-020", name: "Fabrice Pinthier", role: "Conseiller délégué", delegation: "Mobilités et signalétique urbaine", pole: "Cadre de vie, travaux et sécurité", theme: "patrimoine", order: 20 },

  { id: "el-021", name: "Fanny Marquier", role: "7ᵉ adjointe au maire", delegation: "Culture", pole: "Culture", theme: "culture", order: 21 },
  { id: "el-022", name: "Marc Binet", role: "Conseiller municipal", delegation: "Devoir de mémoire", pole: "Culture", theme: "culture", order: 22 },
  { id: "el-023", name: "François Plet", role: "Conseiller municipal", delegation: "Numérique", pole: "Culture", theme: "culture", order: 23 },
  { id: "el-024", name: "Vincent Marie", role: "Conseiller municipal", delegation: "Animation des quartiers", pole: "Culture", theme: "culture", order: 24 },

  { id: "el-025", name: "Romain Palazzini", role: "8ᵉ adjoint au maire", delegation: "Réussite éducative et jeunesse", pole: "Réussite éducative et jeunesse", theme: "ecole", order: 25 },
  { id: "el-026", name: "Emilie Blondel", role: "Conseillère déléguée", delegation: "Affaires scolaires", pole: "Réussite éducative et jeunesse", theme: "ecole", order: 26 },
  { id: "el-027", name: "Émilie Fouquet", role: "Conseillère déléguée", delegation: "Petite enfance", pole: "Réussite éducative et jeunesse", theme: "ecole", order: 27 },
  { id: "el-028", name: "Florent Lustière", role: "Conseiller municipal", delegation: "Droits de l'enfant et des adolescents", pole: "Réussite éducative et jeunesse", theme: "ecole", order: 28 },

  { id: "el-029", name: "Stéphanie Blanchemain", role: "Conseillère déléguée", delegation: "Finances publiques", pole: "Finances", theme: "mairie", order: 29 },
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
    places,
    venues,
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
      { id: "md-001", name: "Tour de refroidissement de la SMN", url: "/media/tour-smn.svg", alt: "Silhouette de la tour de refroidissement se détachant sur le ciel", credit: "Ville de Colombelles", uploadedAt: "2026-06-15T10:00:00.000Z" },
      { id: "md-002", name: "Hôtel de ville", url: "/media/hotel-de-ville.svg", alt: "Façade de l'hôtel de ville depuis la place François Mitterrand", credit: "Ville de Colombelles", uploadedAt: "2026-02-10T10:00:00.000Z" },
      { id: "md-003", name: "Berges de l'Orne", url: "/media/berges-orne.svg", alt: "Voie verte longeant l'Orne au petit matin", credit: "Ville de Colombelles", uploadedAt: "2026-04-28T10:00:00.000Z" },
      { id: "md-004", name: "Médiathèque Le Phénix", url: "/media/mediatheque.svg", alt: "Salle de lecture de la médiathèque", credit: "Ville de Colombelles", uploadedAt: "2026-08-20T10:00:00.000Z" },
    ],
    users: [
      {
        id: "u-001",
        username: "admin",
        name: "Administrateur du site",
        email: "webmaster@colombelles.fr",
        role: "administrateur" as const,
        passwordHash:
          "b8d506a25bb8f8d1e7b51a5119b22435:68eb8e1391fd298709130326cf3fded2813f52591b865294184042a87496e1defd1e7d990fe3654a845c333e1aca94073e2e9a0ca5e0d2be2e34aa16bb05a5af",
        createdAt: "2026-01-05T09:00:00.000Z",
      },
      {
        id: "u-002",
        username: "redaction",
        name: "Service communication",
        email: "communication@colombelles.fr",
        role: "editeur" as const,
        passwordHash:
          "943c13387e25c78aedcd8b18c3dc6ff4:f040aba83cc4f1861e593b346064dee3391a243e09b73fb1772af507630acb7763abfef63a67d8cbef92bb9884f3f453711e25213f8c320060fa2962e7cf7cd9",
        createdAt: "2026-01-05T09:05:00.000Z",
      },
    ],
    audit: [],
  });
}
