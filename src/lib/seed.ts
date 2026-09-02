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
    href: "/vivre-a-colombelles/restauration-scolaire",
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
    id: "p-v001",
    theme: "mairie",
    slug: "presentation-de-la-ville",
    title: "Présentation de la ville",
    section: "votre-mairie",
    subsection: "Présentation de la ville",
    summary:
      "Au sein de Caen la mer",
    content: `Au sein de Caen la mer

Les quartiers

Commerces et entreprises

Marché hebdomadaire

Zones d'activités

Jumelage et coopération`,
    order: 101,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-v002",
    theme: "mairie",
    slug: "au-sein-de-caen-la-mer",
    title: "Au sein de Caen la mer",
    section: "votre-mairie",
    subsection: "Présentation de la ville",
    summary:
      "La communauté Urbaine Caen la mer regroupe 276 000 habitants et 48 communes pour gérer des services publics (bus, collecte des déchets, piscines, etc.) mais aussi porter des…",
    content: `La communauté Urbaine Caen la mer regroupe 276 000 habitants et 48 communes pour gérer des services publics (bus, collecte des déchets, piscines, etc.) mais aussi porter des politiques de développement du territoire (zones d’activité, tourisme), de prospective (plan local d’urbanisme, politiques de logement) et de Transition écologique (aide vélo, réseaux de chaleur…).

La communauté urbaine mutualise des services et des équipements pour faciliter le quotidien des habitants : voirie et espaces verts, économie, habitat, tourisme, collecte et traitement des déchets, déchèteries, transports en commun (tram et bus), assainissement, …

Colombelles fait partie des 48 communes membres de Caen la mer.

Les compétences de la communauté urbaine (CU) Caen la mer

L’AMÉNAGEMENT DU TERRITOIRE

Définition du

## Plan local d’urbanisme intercommunal

(PLUI) et du Schéma de cohérence territoriale (SCoT)

## Gestion de la voirie et entretien des espaces verts

Organisation et maîtrise d’ouvrage des opérations d’aménagements

## LE DÉVELOPPEMENT ÉCONOMIQUE

## Création et gestion des zones d’activités

## Mise en œuvre des actions de développement économique

## Soutien à la recherche et à l’enseignement supérieur

## LA PROMOTION ET L’ANIMATION DU TERRITOIRE

Gestion de la promotion touristique et de l’attractivité territoriale

Construction, aménagement, entretien et gestion d’équipements culturels ou sportifs, déclarés d’intérêt communautaire

## LA GESTION DES SERVICES D’INTÉRÊT COLLECTIF

Organisation et gestion de l’eau potable et de l’assainissement

## Collecte et gestion des déchets

## Lutte contre la pollution de l’air et les nuisances sonores

Contribution à la transition énergétique et gestion des réseaux de chaleur et de la concession des réseaux de gaz et d’électricité

## Création ou extension de cimetières et crématoriums

## L’ORGANISATION DES DÉPLACEMENTS ET DE LA MOBILITÉ

## Définition du plan de déplacements urbains

## Gestion des transports en commun et des mobilités douces

## LA DÉFINITION DE LA POLITIQUE DE LA VILLE ET DE L’HABITAT

Définition du Programme local de l’habitat (PLH)

Promotion des dispositifs d’aides et d’amélioration de l’habitat

## Gestion de l’accueil des gens du voyage

## Gestion des dispositifs de développement urbain

Définition du Plan Local d’Urbanisme Intercommunal (PLUI)

Les élus de Colombelles à la CU Caen la mer

Pourquoi est-ce important pour vous ?

L’intercommunalité permet de mutualiser les moyens et de proposer des services plus performants, tout en développant des projets ambitieux à une échelle plus large que celle de la commune. Concrètement, Caen la mer agit directement sur votre quotidien : déplacements, cadre de vie, logement, environnement ou encore développement économique.

Caen Normandie Développement

S’installer en tant qu’entrepreneur

Tourisme à Caen la mer

Informations pratiques

Communauté urbaine Caen la mer

## 16 Rue Rosa Parks – 14000 Caen

Du lundi au jeudi : 8h30-12h30 et 13h30-17h30 et le vendredi : 8h30-12h30 et 13h30-16h30

02 31 39 40 00 https://caenlamer.fr/formulaire/contact

Plus d’information

Facebook`,
    block: "caen-la-mer",
    order: 102,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-v003",
    theme: "mairie",
    slug: "les-quartiers",
    title: "Les quartiers",
    section: "votre-mairie",
    subsection: "Présentation de la ville",
    summary:
      "Colombelles est une ville riche de son histoire qui se reflète dans son organisation géographique.",
    content: `Colombelles est une ville riche de son histoire qui se reflète dans son organisation géographique.

## > Le Bas de Colombelles

Le Bas de Colombelles était le centre historique le long de l’Orne et à proximité du Bois. Maisons de bourg, cours, ruelles sont les témoins de cette époque. À quelques mètres du GR et de la voie verte en direction de Caen ou de la mer, ce quartier est un havre de paix et de calme.

## > Le centre-ville

Le centre-ville de Colombelles est peu dense avec des immeubles de quelques étages seulement, de nombreux pavillons et des commerces de proximité et des infrastructures à disposition (école, centre de loisirs, piscine, médiathèque…). Il va de la route de Cabourg jusqu’au haut du Bois et s’étend jusqu’au rond-point Lazzaro.

## > Jean-Jaurès

La fermeture de la SMN a laissé une friche industrielle étendue disponible pour accueillir de nouveaux habitants aux portes de Caen. Maisons individuelles et collectifs sont en limite de la zone d’activités Normandial, du parc des métallos et de l’allée cavalière offrant une balade avec une vue imprenable sur l’agglomération caennaise.

## > Le Plateau – Le Libéra

Séparé du cœur de ville par la D513 et en proximité immédiate de Giberville et de Mondeville, le Plateau était le lieu de vie des salariés de la SMN. Ainsi l’habitat s’en ressent avec des rangées de maisons ouvrières, mais aussi des maisons plus grandes, celles des contremaîtres et responsables.

Le Libéra quant à lui est une extension moderne de ce site avec des logements individuels et collectifs dans des conceptions éco-responsables et novatrices. Un cadre de vie privilégié en lien avec la nature et doté d’équipements sportifs de qualité et du théâtre de la Renaissance.

## Quartier du Libéra | ©Septième Ciel Images

Le Bas de Colombelles | ©Septième Ciel Images

Le Libéra | ©Septième Ciel Images

Les Suédoises | ©Septième Ciel Images

Centre-ville | ©Septième Ciel Images

ZAC Lazzaro  | ©Septième Ciel Images

Colombelles en chiffres`,
    order: 103,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-v004",
    theme: "emploi",
    slug: "marche-hebdomadaire",
    title: "Marché hebdomadaire",
    section: "votre-mairie",
    subsection: "Présentation de la ville",
    summary:
      "Tous les mercredis matin, une demi-douzaine de commerçants vient s’installer sur la place François-Mitterrand et propose des produits variés et de qualité.",
    content: `Tous les mercredis matin, une demi-douzaine de commerçants vient s’installer sur la place François-Mitterrand et propose des produits variés et de qualité.

Informations pratiques

Place François-Mitterrand

02 31 35 25 00 mairie@colombelles.fr`,
    order: 104,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-v005",
    theme: "emploi",
    slug: "commerces-et-entreprises",
    title: "Commerces et entreprises",
    section: "votre-mairie",
    subsection: "Présentation de la ville",
    summary:
      "Des commerces de proximité",
    content: `## Des commerces de proximité

Tous les quartiers disposent de commerces de proximité. Vous pouvez les retrouver avenue Léon-Blum, route de Cabourg, Grande rue, Zac Lazzaro, sur le Plateau, mais aussi rue Jean-Jaurès ou dans le quartier du même nom.

Les zones d’activités sont aussi des lieux pour trouver des artisans et des commerçants pour faciliter votre quotidien.

Des entreprises à Colombelles

## Avec

6 000 emplois sur son territoire, Colombelles est un des principaux pôles d’emplois de l’agglomération caennaise.

Colombelles se présente comme un territoire dynamique fort de trois pôles d’activités, d’un site industriel et de multiples services de proximité en centre-ville :

Centre ville et long de la RD 513 : services et commerces de proximité

Zone industrielle de la Vallée : activité industrielle de fabrication automobile avec Renault Trucks et ses sous-traitants.

Zones commerciales et artisanales de Lazzaro 1,2 et 3 et Lazzaro sud : artisans, PME et PMI et activités commerciales.

Normandial : entreprises agroalimentaires, PME et PMI.

EffiScience : haute technologie et activités de bureau.

Pour en savoir plus,

Caen Normandie Développement, agence de développement économique Caen la mer`,
    order: 105,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-v006",
    theme: "emploi",
    slug: "zones-d-activites",
    title: "Zones d'activités",
    section: "votre-mairie",
    subsection: "Présentation de la ville",
    summary:
      "Colombelles accueille près de 600 entreprises dans ses zones d’activités spécifiques.",
    content: `Colombelles accueille près de 600 entreprises dans ses zones d’activités spécifiques.

## EffiScience

Le Plateau de Colombelles était occupé jusqu’en 1993 par la Société Métallurgique de Normandie (SMN). La libération du site et la suppression de nombreux emplois ont conduit la Communauté urbaine Caen la mer à engager la première phase de reconquête et de requalification de ce territoire. En 1997, elle créa la ZAC du Plateau et attribua à

Normandie Aménagement la concession d’aménagement.

La ZAC se compose de deux sites :

NORMANDIAL : développement d’un concept de la filière agro-alimentaire «ultra-frais»

## EFFISCIENCE

: développement d’un parc de recherche et développement des nouvelles technologies

## Zones d’activités Lazzaro

Située à l’est de l’agglomération caennaise, la zone d’activité économique communautaire du Lazzaro (ZAC 1,2 et3) couvre à ce jour une superficie de 55 hectares, dédiée aux activités industrielles et artisanales. La totalité des terrains est aujourd’hui occupée. Lazzaro 3 et 4, extension de la zone d’activité économique communautaire sont en cours de commercialisation. La serre de production de légumes de 3,6 hectares est chauffée par l’énergie produite par les déchets brûlés au sein de l’usine d’incinération des déchets.

## Sur ce site est également implanté

NormanTr i, centre de tri des emballages ménagers à vocation interdépartementale.

Ferme solaire et Normandial  | ©Septième Ciel Images

ZAC Lazzaro  | ©Septième Ciel Images

ZAC Lazzaro  | ©Septième Ciel Images

EffiScience | © Septième Ciel Images

ZAC Lazzaro  | ©Septième Ciel Images`,
    order: 106,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-v007",
    theme: "culture",
    slug: "jumelage-et-cooperation",
    title: "Jumelage et coopération",
    section: "votre-mairie",
    subsection: "Présentation de la ville",
    summary:
      "Comité de Jumelage Colombelles-Steinheim",
    content: `## Comité de Jumelage Colombelles-Steinheim

Colombelles est jumelée avec Steinheim depuis le 1er novembre 1986.

Cette ville allemande de près de 9000 habitants est située à l’est du Land de Bade-Wurtemberg dans le Jura souabe. Entourée de forêts et de landes,

Steinheim , ancien village de paysans de l’Albuch, est devenue depuis longtemps une commune résidentielle recherchée pour sa vie locale très active dans un paysage magnifique du Jura souabe, ses vallons, ses forêts et ses landes.

Le territoire de la commune comprend les villages de Söhnstetten et de Sontheim ainsi que les hameaux de Küpfendorf, Gnannenweiler, Irmannsweiler, Neuselhalden, Dudelhof, Ziegelhütten et de Bibersohl et s’étend sur une surface de 8.400 hectares dont plus de la moitié est couverte de forêts. 420 hectares sont protégés et l’on y rencontre souvent des troupeaux de moutons.

La ville de Steinheim se trouve à 7 km de la ville de Heidenheim, au milieu d’un bassin qui rappelle le cratère d’un volcan. Dans les années 1970, il a été établi de façon certaine que ce bassin de 3.5 km de diamètre n’est pas d’origine volcanique, mais qu’il a été creusé par la chute d’une météorite d’un poids de 900.000 tonnes et d’un diamètre de 80 à 100 mètres. Le site est connu parmi les géologues du monde entier puisqu’on trouve, dans les sables du lac qui s’est formé plus tard, quantité de squelettes d’animaux préhistoriques. Aujourd’hui, nous connaissons 54 espèces de mammifères de cette époque-là ; dont 14 en ont été trouvées pour la première fois à Steinheim. C’est au METEORKRATERMUSEUM à Sontheim/Stubental que vous pourrez les découvrir… Reste à ajouter que les astronautes américains d’Apollo 14 sont venus à Steinheim étudier la structure du cratère pour préparer leur alunissage.

Portrait de Marie-Thérèse Legras, Présidente du Comité de jumelage Colombelles Steinheim

ACTUALITÉS

## AVRIL – MAI 2024

Une compétition sportive de Français, de Hongrois et d’Allemands

C’était une première qui ne restera pas un évènement occasionnel. C’était, en tout cas, la conviction du maire de Steinheim, Holger Weise, après que les jeunes footballeurs de Steinheim, de la ville jumelée de Colombelles et de Weindorf en Hongrie avaient terminé ce tournoi de trois nations sur les terrains de foot á Steinheim sans blessures graves.

Ce long weekend de l’Ascension au samedi du marché de mai, 120 jeunes se sont rencontrés dans le gymnase « Albuchhalle », dans lequel on avait installé un centre de lits de camp (grâce à la réserve du Croix rouge pour des catastrophes).

Le comité de jumelage Steinheim – Colombelles avec sa présidente Erika Edler ainsi que la section du foot de l’association sportive de Steinheim avec ses responsables de la jeunesse Peter Adler et Guido Rieberger au soutien de l’administration de la commune avaient préparé cette fête du foot avec une précision toute militaire, y inclus un programme culturel. Cet après-midi de l’Ascension, l’orchestre « Kunterbunt » de l’école de musique de Steinheim sous la direction de Christoph Braun a soutenu la bienvenue des sportifs de la compétition en jouant les hymnes nationaux français, hongrois et allemand d’une façon formidable.

C’étaient les footballeurs des équipes de moins de 13 et moins de 15 ans qui se sont fait face sous l’attention de 300 spectateurs. A la fin, il y avait deux premières places : les jeunes de l’association sportive de Steinheim jouaient 13 : 0 dans le premier groupe, dans le deuxième, le résultat était 9 : 2. A la deuxième place, il y avait Colombelles dans les deux groupes, les résultats étaient de 6 : 1 et de 3 : 2 buts. Les jeunes de Weindorf à la troisième place ne pouvaient pas marquer de but mais en encaissaient dans chaque match huit. Monsieur le maire Weise leur a offert les coupes sous de longs applaudissements.

A côté des matchs de foot, il y avait un autre point culminant : la visite à Stuttgart du musée Mercedes-Benz. Tandis que les Hongrois découvraient la ville dans la foule de la rue piétonne au centre, « Königsstraße », les jeunes Français se trouvaient dans la « Maison de l’Histoire » apprenant par les explications profondes de Manfred Kauth, ancien professeur d’histoire et de français et témoin en tant que jeune au grand discours de Charles de Gaulle à la jeunesse allemande en 1962 à Ludwigsburg, comment le fondement de la réconciliation franco-allemande après la Seconde Guerre mondiale a été créé. Ensemble, tous ont vu aussi beaucoup de choses intéressantes au marché de mai à Steinheim.

A la fin de ses quatre journées, Peter Adler a exprimé ses grands remerciements à sa grande équipe d’assistants et d’assistantes ainsi qu’au comité de jumelage pour cette rencontre si bien réussie. Jérôme Lebon en tant que président du CLC a invité à un revoir sportif en Normandie en 2025.

Du sport mais aussi la transmission du souvenir et du devoir de mémoire

En plus de ce séjour, le samedi 27 avril, les jeunes ont visité, le cimetière américain de Colleville-sur-mer et le cimetière allemand de La Cambe avec Marc Pottier, maire de Colombelles et historien, pour un temps d’échanges sur l’histoire du Débarquement.

## DÉCEMBRE 2023

Le marché de la Saint-Nicolas à Colombelles, ville jumelle de Steinheim, a uni les deux communautés pour une journée de traditions et de convivialité. Organisé par la ville et des associations locales, le marché a accueilli un stand spécial cette année, invitant les visiteurs à pédaler. En effet, on pouvait parcourir la distance de Colombelles à

Steinheim en vélo (grâce au prêt de Decathlon). Plus de 100 kilomètres ont été parcourus sur les 980 km : la suite du parcours l’année prochaine !

La rencontre avec les amis a été chaleureuse et l’occasion a également été de visiter pendant deux jours l’ancienne abbaye bénédictine de Caen.

Le Maire de Colombelles, Marc Pottier, a partagé des moments amicaux avec les résidents de Steinheim sur le stand franco-allemand. Les projets futurs, dont une revanche sportive en 2024, ont été évoqués, renforçant les liens entre les deux villes. Malgré les défaites antérieures, les footballeurs de Colombelles prévoient de prendre leur revanche lors d’une rencontre pendant l’Ascension, marquant une année spéciale alors que le 6 juin.

2024 marquera le 80e anniversaire du débarquement allié en Normandie.

Le marché de la Saint-Nicolas c’est aussi la mobilisation des associations colombelloises qui vous proposent des crêpes, des gaufres, du vin chaud, des jeux, du maquillage, … un temps de convivialité et de partage en centre-ville.

## SEPTEMBRE 2023

Les jeunes footballeurs de Steinheim ont remporté deux matchs amicaux à Colombelles, renforçant les liens entre les deux villes jumelles.

Avec des victoires éclatantes de 10-0 et 4-0 pour les équipes U13 et U15, l’échange a été marqué par un esprit sportif exceptionnel.

Malgré les défaites, le président colombellois, Jérôme Lebon, se montre satisfait et annonce une revanche l’année prochaine à Steinheim. Les responsables des clubs expriment leur désir de renouveler ces échanges culturels et sportifs malgré les défis logistiques.

Au-delà du football, la semaine a été ponctuée par des visites de sites emblématiques normands, renforçant une amitié vieille de 37 ans entre les deux communautés.

CO

## Opération PArtenariat SOLidarité

La coo pération décentralisée est l’établissement de relations de long terme entre collectivités territoriales françaises (régions, départements, communes et leurs groupements) et étrangères, formalisées par des conventions.

## Historique

Eau Vive Normandie est une association de loi 1901 fondée en 2008 par l’ONG Eau Vive et deux associations normandes locales : Ifs Solidarité Sahel (créée en 1986) et Solidarité de Louvigny avec le Sahel (créée en 1989).

Après une phase de lancement de la coopération, trois programmes se sont succédés ces dernières années :

juin 2010 / juin 2013 : programme porté par le Conseil Régional juillet 2013 / juin 2016 : programme porté par la commune d’Ifs juillet 2016 / juin 2019 : programme porté par la commune de Colombelles

Ainsi après trois ans de collaboration avec Eau Vive et son antenne bas-normande pour le financement du programme d’appui au développement local du canton de Kornaka, le Conseil Régional de Basse-Normandie a souhaité l’évolution de ce partenariat dans le contexte de la décentralisation au Niger, en impulsant la mise en place d’une coopération entre les communes bas-normandes et celles du canton de Kornaka.

L’association est donc chargée d’assurer la maîtrise d’œuvre et l’accompagnement des collectivités normandes.

Quatre communes ont choisi de s’engager dans la démarche dès le lancement, en 2008 : Ifs, Colombelles, Mézidon-Canon (devenue Mézidon Vallée d’Auge) et Castillon-en-Auge. Louvigny et Mondeville ont rejoint la coopération en 2016.

Fonctionnement de la coopération

## 6 communes normandes coopèrent avec

5 communes dans le canton de Kornaka , région de Maradi au Niger. L’association Coopasol Normandie et son partenaire, Coopasol Wash Niger, assurent la maîtrise d’œuvre du programme de coopération.

Côté normand, un comité de pilotage réunissant des représentants des collectivités et de Coopasol Normandie, se retrouve toutes les 6 semaines environ, pour suivre la mise en œuvre des activités.

Côté Niger, les communes se retrouvent au sein de l’ACCK, l’Association des Communes du Canton de Kornaka.

Les objectifs :

L’accompagnement des collectivités normandes dans leur démarche de coopération, notamment avec le canton de Kornaka (Niger)

L’évolution des représentations et des projections des normands sur l’Afrique

Le développement de toutes formes d’échanges pour une meilleure connaissance mutuelle avec les pays d’Afrique, principalement de la zone sahélienne

Le changement économique et social en Afrique, en soutenant les initiatives locales, dans une perspective de développement durable et intégré

Actions :

## Appui à la coopération décentralisée des collectivités

## Accompagnement et formation à la coopération décentralisée

## Facilitation des échanges et relations avec le partenaire

## Mise en œuvre déléguée de la coopération décentralisée

## Sensibilisation et éducation au développement

Création, mise à disposition d’outils pédagogiques, réalisation d’animations pour des associations, centres culturels, communes, écoles…

## Animation de rencontres autour de diverses thématiques

Ce programme vise à appuyer le développement local dans le canton de Kornaka, de façon transversale, tout en apportant au territoire normand une ouverture sur le monde et s’articule autour de 4 volets :

## Renforcement des capacités institutionnelles

## Animation du territoire et ouverture sur le monde

## Insertion socio-économique de tous les citoyens

Adaptation au changement climatique dans le canton de Kornaka

Plus d’informations`,
    order: 107,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-v008",
    theme: "mairie",
    slug: "budget",
    title: "Budget de la commune",
    section: "votre-mairie",
    subsection: "Finances et démocratie",
    summary:
      "Chaque année le conseil municipal adopte le budget de la commune : il s’agit du budget primitif.",
    content: `Chaque année le conseil municipal adopte le budget de la commune  : il s’agit du budget primitif.

Des éventuels ajustements peuvent avoir lieu en cours d’année avec le vote de budgets supplémentaires.

Le conseil municipal prévoit et autorise les recettes et les dépenses sur une année.

Le budget se présente en deux parties, une section de fonctionnement et une section d’investissement.`,
    order: 201,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-v009",
    theme: "actu",
    slug: "budget-participatif",
    title: "Budget participatif",
    section: "votre-mairie",
    subsection: "Finances et démocratie",
    summary:
      "Agir ensemble pour améliorer notre cadre de vie.",
    content: `Agir ensemble pour améliorer notre cadre de vie.

Qu’est-ce que le budget participatif ?

Le budget participatif est un outil de démocratie participative qui donne la possibilité aux Colombelloises et Colombellois d’imaginer et de proposer des aménagements pour la ville.

## Une enveloppe de

15 000 € en investissement est dédiée chaque année à la réalisation des projets retenus.

Pour être sélectionnés, les projets doivent :

être réalisables techniquement, juridiquement et financièrement ;

relever des compétences de la Ville ;

répondre à l’intérêt général ;

bénéficier au plus grand nombre.

## Comme le rappelle

Nadine Lefèvre, Maire adjointe aux affaires intercommunales, à la démocratie participative, à la sécurité et à la prévention

:

« L’objectif est de réaliser des idées des habitants : ce sont eux qui vivent la ville au quotidien et qui peuvent identifier les points concrets d’amélioration. »

Qui peut participer ?

Le dispositif est ouvert :

à toutes les Colombelloises et tous les Colombellois ;

à partir de 6 ans à titre individuel ou collectif (habitants, associations, groupes de jeunes,…)

Les grandes étapes

## Dépôt des idées par les habitants

Analyse de recevabilité et de faisabilité par les services municipaux

Présentation des projets retenus

Vote des habitants

Réalisation par la Ville

## Valorisation des projets lauréats

Chaque dossier est étudié selon les mêmes critères, dans un souci de transparence et d’équité.

## Les réalisations déjà concrétisées

Grâce à vos propositions et à vos votes, plusieurs projets ont déjà vu le jour sur le territoire communal depuis 2021 :

installation de bancs supplémentaires dans certaines rues ;

mise en place d’une tyrolienne dans le bois ;

création d’agrès sportifs en accès libre à proximité du quartier Jean Jaurès ;

installation de panneaux ludiques place Albert Thomas ;

Ces réalisations témoignent de l’impact direct de la participation citoyenne sur l’aménagement de la ville.

La campagne en cours : les projets retenus se concrétisent https://www.colombelles.fr/wp-content/uploads/2025/05/Budget-participatif.mp4 l’issue du vote du budget participatif, les Colombelloises et les Colombellois ont désigné trois projets qui contribueront à améliorer leur cadre de vie :

## Bas de Colombelles

: création d’un parcours de street workout dédié aux loisirs et à la pratique sportive.

## Centre-ville

: aménagement d’un îlot de fraîcheur et d’un lieu de vie avec assises, terrain de pétanque, espace pique-nique et végétalisation.

Plateau

: réalisation d’une fresque culturelle

.

La Ville remercie chaleureusement l’ensemble des habitants qui se sont mobilisés, que ce soit en proposant des idées ou en participant au vote. Cette démarche confirme l’envie des Colombellois de prendre part à la construction de leur ville.

## Des projets qui s’inscrivent dans une vision d’ensemble

Si certains aménagements pourront être engagés rapidement, d’autres, comme les îlots de fraîcheur ou certains espaces de jeux, nécessitent davantage de temps.

Ces projets s’intègrent en effet dans des opérations d’aménagement plus globales, qui demandent des études préalables, une coordination avec différents partenaires et une planification à l’échelle de plusieurs secteurs de la commune. Cette approche permet de garantir des réalisations cohérentes, durables et adaptées aux besoins des habitants.

Les attentes exprimées par les habitants, notamment en matière de végétalisation, d’espaces de convivialité, de fraîcheur urbaine et de loisirs, nourriront les futurs aménagements.`,
    order: 202,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-v010",
    theme: "mairie",
    slug: "elections",
    title: "Élections",
    section: "votre-mairie",
    subsection: "Finances et démocratie",
    summary:
      "Inscription sur les listes électorales",
    content: `## Inscription sur les listes électorales

Pour pouvoir voter, il faut être inscrit sur les listes électorales de la commune.

Seuls les jeunes de 18 ans sont inscrits automatiquement si et seulement si ils ont fait leur recensement citoyen obligatoire entre 16 et 18 ans.

Dans tous les autres cas : l’inscription sur les listes doit faire l’objet d’une démarche volontaire (changement de commune, déménagement à l’intérieur de la commune, etc.).

## >>

Vous pouvez vérifier votre situation électorale

Conditions pour être inscrit :

Avoir la nationalité française. Les citoyens de l’Union européenne qui résident en France peuvent également s’inscrire pour les élections municipales et les élections européennes.

Être domicilié dans la commune, y avoir sa résidence depuis 6 mois ou avoir la qualité de contribuable ou de gérant ou associé majoritaire ou unique d’entreprise.

Avoir 18 ans.

Jouir de ses droits civiques et politiques.

Délais :

L’inscription peut être demandée à tout moment de l’année. Toutefois, si un scrutin est prévu, la date limite pour s’inscrire et voter à ce scrutin est fixée au 6e vendredi précédant le 1er tour.

Pièces à fournir :

## Carte Nationale d’Identité ou passeport, en cours de validité

Justificatif d’adresse de moins de 3 mois

Formulaire au choix :

À imprimer et déposer en mairie

En ligne

Devenir assesseur ?

La ville organise les élections sous la responsabilité des services de l’État et vous pouvez y participer en tant qu’assesseur. Vous vivrez de l’intérieur ce moment de démocratie.

Vos missions :

Après vérification de l’identité de l’électeur par le président, l’assesseur doit rechercher le nom de la personne sur les listes d’émargement, la faire émarger et apposer la date du vote sur la carte électorale.

Lors de la fermeture du bureau de vote, l’assesseur assiste le président lors du comptage des émargement s.

Déroulement d’un scrutin :

https://www.service-public.fr/particuliers/vosdroits/F16828

## Vote par procuration

En cas d’absence le jour d’une élection, vous pouvez charger un électeur de voter à votre place, dans votre bureau de vote. Pour ce faire vous devez réaliser une procuration de vote.

Résultats des élections à Colombelles

2nd tour des élections législatives

## 1er tour des élections législatives

Elections européennes, dimanche 9 juin 2024`,
    order: 203,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-v011",
    theme: "culture",
    slug: "journal-municipal",
    title: "Journal municipal",
    section: "votre-mairie",
    subsection: "Finances et démocratie",
    summary:
      "Le journal de la Ville de Colombelles",
    content: `Le journal de la Ville de Colombelles

Journal municipal #52 – Décembre 2025

Journal municipal #51 – Juillet 2025

Journal municipal #50 – novembre 2024

Journal municipal #49 – avril 2024

Journal municipal #48 – novembre 2023

Journal municipal #47 – avril 2023

Journal municipal #46 – novembre 2022

Journal municipal #45 – mai 2022

Journal municipal #44 – janvier 2022

Journal municipal #43 – octobre 2021

Journal municipal #42 – juin 2021

Journal municipal #41 – avril 2021

Journal municipal #40 – septembre 2020

Journal municipal #39 – juillet 2020

Le Colombellois junior

Colombellois Junior #9 – décembre 2025

Colombellois Junior #8 – novembre 2024

Colombellois Junior #7 – avril 2024

Colombellois Junior #6 – novembre 2023

Colombellois Junior #5 – avril 2023

Petit Colombellois #4 – novembre 2022

Petit Colombellois #3 – mai 2022

Petit Colombellois #2 – octobre 2021

Petit Colombellois #1  – juillet 2021`,
    order: 204,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },

  /* ---------- Démarches pratiques ---------- */
  {
    id: "p-d001",
    theme: "contact",
    slug: "naissance",
    title: "Naissance",
    section: "demarches",
    subsection: "État civil",
    summary:
      "Si votre enfant vient de naître, vous devez effectuer une déclaration de naissance afin qu’il obtienne son identification administrative : son état civil.",
    content: `Si votre enfant vient de naître, vous devez effectuer une déclaration de naissance afin qu’il obtienne son identification administrative : son état civil.

Vous trouverez ici toutes les informations utiles pour accomplir cette démarche.

## Déclarer la naissance de votre enfant

La déclaration doit être effectuée à la Mairie dans les 5 jours qui suivent la naissance.

Cette déclaration peut se faire à l’Hôtel de Ville aux heures d’ouverture du service

.

La naissance est déclarée par la mère, par le père, ou à défaut, par le médecin, la sage-femme ou une autre personne qui aura assisté à l’accouchement.

## ATTENTION

: la déclaration de naissance de votre enfant doit impérativement être faite dans ce délai de 5 jours. Si vous dépassez ce délai, un jugement déclaratif au tribunal de grande instance est nécessaire pour inscrire la déclaration sur les registres. Cela peut prendre plusieurs mois au cours desquels l’enfant sera privé d’état civil. Si le troisième jour est un samedi, un dimanche ou un jour férié, l’expiration du délai est reporté au premier jour ouvrable suivant.

Pièces à fournir :

Certificat médical de naissance (fiche de maternité)

Livret de famille

## Pièce d’identité des 2 parents

Le cas échéant, déclaration conjointe de choix de nom

À SAVOIR :

Un livret de famille est délivré aux parents non mariés à l’occasion de la naissance de leur premier enfant commun.

Les parents ont la possibilité de choisir le nom de famille de leur premier enfant commun.

Les parents ont la possibilité, sous certaines conditions, de choisir le nom de famille de leur enfant au moment de la déclaration de sa naissance.

## Le choix de nom

Celui-ci peut être le nom du père, de la mère, ou le double nom dans l’ordre choisi.

Pour les parents non mariés, la filiation doit être établie à l’égard des deux parents au moment de la déclaration de naissance pour permettre ce choix. Le nom choisi est définitif et sera dévolu aux enfants à naître.

Documents à produire :

déclaration conjointe de choix de nom livret de famille (éventuellement)

## pièces d’identité

CAS PARTICULIER en cas de désaccord sur le nom

:

Un des parents peut désormais le signaler à l’officier d’état civil de son choix, au plus tard le jour de la déclaration de naissance ou postérieurement au jour de l’établissement simultané de la filiation, en complétant le formulaire suivant.

## Reconnaissance de paternité

Pour les couples mariés , la question de la reconnaissance anticipée ne se pose pas. La filiation des enfants pour les parents mariés est automatique. Ils n’ont pas besoin de procéder à une reconnaissance. Le nom du père et de la mère sera porté sur l’acte de naissance.

Lorsque les parents ne sont pas mariés ou lorsque les parents sont pacsés , la filiation est établie différemment entre le futur père et la future mère.

La filiation maternelle est établie par la désignation de la mère dans l’acte de naissance de l’enfant, sans qu’il y ait besoin de faire une démarche de reconnaissance.

La filiation paternelle résulte d’une démarche volontaire : il doit reconnaître son enfant avant la naissance, au moment de la déclaration de naissance ou ultérieurement.

Vous pouvez pour cette démarche vous adresser à la Mairie de votre choix.

## Duplicata du livret de famille

Il peut être délivré en cas de perte, de vol, de séparation, de divorce ou de changement d’état civil. Seul(s) le(s) titulaire(s) peut(vent) demander un duplicata.

Adressez vous à la Mairie du lieu de votre domicile qui se chargera de transmettre le livret aux mairies concernées.

Formulaire en ligne

## Acte de naissance

Besoin d’un acte de naissance pour vos démarches administratives ?

Démarche en ligne

## Changement de nom

Depuis le 1er juillet 2022, toute personne majeure peut modifier son nom de naissance pour choisir un nom issu de sa filiation. Cette procédure simplifiée permet de porter le nom du parent qui n’a pas transmis le sien à la naissance, soit en ajoutant le nom de ce parent à votre nom de famille actuel, dans l’ordre que vous souhaitez, soit en remplaçant votre nom de famille actuel par le nom de ce parent.

Attention, cette procédure ne peut être utilisée qu’une seule fois dans votre vie.

La demande doit être déposée auprès de la mairie de naissance ou de domicile avec le formulaire.

Pièces à fournir :

## Le formulaire Cerfa 16229-01

## Une pièce d’identité justifiant de votre nationalité

Une copie intégrale de votre acte de naissance de moins de 3 mois

## Un justificatif de domicile

Copie des pièces d’identité et des actes de naissance des membres de la famille impactés par votre changement de nom (époux/épouse, enfant(s)).

Procédures :

Pour un majeur :

Le dossier une fois déposé et complet est conservé pendant un mois minimum par le service compétent.

À l’issue de ce délai, l’officier d’état civil contacte le demandeur afin qu’il confirme sa volonté de changer de nom.

Puis, le changement de nom est enregistré dans les registres d’état civil et votre acte de naissance est mis à jour.

Pour les mineurs :

Si votre enfant est né après juin 2006, vous pouvez changer son nom de famille si le père l’a reconnu après la déclaration de naissance.

Si votre enfant est né après juin 2006, cette démarche est possible si l’enfant a été reconnu par les deux parents de manière différée ou si un des parents a reconnu l’enfant après la déclaration de naissance.

Dans tous les cas, les deux parents doivent être présents le jour de la demande. De plus, si le mineur a plus de 13 ans, il doit donner son consentement à la démarche.

Plus d’informations

Informations pratiques

## Service État civil

## Hôtel de ville – Place François-Mitterrand

02 31 35 25 00 vanessa.catherine@colombelles.fr`,
    order: 101,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d002",
    theme: "contact",
    slug: "mariage",
    title: "Mariage",
    section: "demarches",
    subsection: "État civil",
    summary:
      "Dossier de préparation au mariage",
    content: `## Dossier de préparation au mariage

Vous trouverez toutes les étapes et les formalités pour mener à bien votre mariage civil dans le dossier de préparation au mariage civil.

## Plus d’information

Obtenir un acte de mariage https://www.service-public.fr/particuliers/vosdroits/F1432

Informations pratiques

## Service État civil

## Hôtel de ville – Place François-Mitterrand

02 31 35 25 00 vanessa.catherine@colombelles.fr`,
    order: 102,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d003",
    theme: "contact",
    slug: "pacs",
    title: "Pacs",
    section: "demarches",
    subsection: "État civil",
    summary:
      "Qu’est-ce qu’un pacte civil de solidarité ?",
    content: `Qu’est-ce qu’un pacte civil de solidarité ?

https://www.formulaires.service-public.fr/gf/getNotice.do?cerfaNotice=52176&cerfaFormulaire=15789

Deux personnes majeures, de sexes différents ou de même sexe peuvent conclure un Pacte Civil de Solidarité (Pacs). Il peut être conclu en mairie dès lors que les futurs pacsés ont leur résidence commune à Colombelles, sont majeurs et ne sont pas déjà mariés ou pacsés.

Une célébration à l’Hôtel de Ville est possible sur demande, en s’adressant à l’État civil de la Mairie.

Les pièces nécessaires :

Cerfa_15725_03 Déclaration conjointe d’un PACS

## Cerfa_15726-02 Convention_type_PACS

Acte de naissance (copie intégrale ou extrait avec filiation) de moins de 3 mois

Pièce d’identité en cours de validité

Informations pratiques

## Service État civil

## Hôtel de ville – Place François-Mitterrand

02 31 35 25 00 vanessa.catherine@colombelles.fr`,
    order: 103,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d004",
    theme: "contact",
    slug: "parrainage-civil",
    title: "Parrainage civil",
    section: "demarches",
    subsection: "État civil",
    summary:
      "Le baptême civil (également appelé parrainage civil ou parrainage républicain) n’est prévu par aucun texte et ne crée aucune obligation. Il s’agit d’un engagement moral…",
    content: `Le baptême civil (également appelé parrainage civil ou parrainage républicain) n’est prévu par aucun texte et ne crée aucune obligation. Il s’agit d’un engagement moral d’ordre purement privé.

Le baptême civil n’est pas inscrit sur les registres de l’état civil et les justificatifs éventuellement délivrés n’ont pas de valeur au regard de la loi.

Le baptême civil se pratique dans certaines mairies, mais elles ne sont pas obligées de le célébrer.

Informations pratiques

## Service État civil

## Hôtel de ville – Place François-Mitterrand

02 31 35 25 00 vanessa.catherine@colombelles.fr`,
    order: 104,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d005",
    theme: "contact",
    slug: "deces-et-cimetiere",
    title: "Décès et cimetière",
    section: "demarches",
    subsection: "État civil",
    summary:
      "Déclaration de décès",
    content: `## Déclaration de décès

La déclaration de décès doit être faite à la Mairie du lieu de décès par un membre de la famille ou un employé de l’entreprise de Pompes Funèbres. Elle doit s’effectuer dans un délai de 24 heures (non compris les dimanches et les jours fériés).

Pièces à fournir :

certificat médical constatant le décès livret de famille ou acte de naissance ou pièce d’identité du défunt

Plus d’informations

Acte de décès

## Survenu en France

Démarche à réaliser auprès du service État civil par courrier ou en ligne

## Survenu à l’étranger

S’adresser au Ministère des Affaires étrangères, Service central d’Etat civil, 11, rue de la Maison Blanche, 44941 NANTES Cedex 09 –

01 41 86 42 47 ou en ligne

## Recherche de personnes inhumées

Désormais, il vous est possible de consulter le plan du cimetière de Colombelles et d’effectuer une recherche de sépulture d’un défunt.

Informations pratiques

## Service État civil

## Hôtel de ville – Place François-Mitterrand

02 31 35 25 00 vanessa.catherine@colombelles.fr`,
    order: 105,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d006",
    theme: "contact",
    slug: "carte-d-identite",
    title: "Carte d'identité",
    section: "demarches",
    subsection: "Formalités administratives",
    summary:
      "Refaire sa carte d’identité",
    content: `Refaire sa carte d’identité

Préalable

:

## Il faut connaître sa date de validité

Vous devez effectivement refaire votre carte d’identité : comment faire ?

## Prenez rendez-vous en mairie ou inscrivez-vous en ligne

Faites une pré-demande en ligne ou venir retirer un formulaire à l’hôtel de ville

Pour toute demande payante (passeport, carte d’identité perdue ou volée) :

## https://timbres.impots.gouv.fr/

Tout savoir sur le renouvellement de la carte d’identité d’un majeur

## Vidéo : Tutoriel

Renouvellement de la carte d’identité d’un majeur :

https://www.service-public.fr/particuliers/vosdroits/F2108

9

## France Identité

France Identité est un nouveau service public permettant de créer son identité numérique régalienne. Cette application pour smartphone a vocation à :

prolonger l’usage de la carte d’identité dans le monde numérique permettre de nouveaux usages (connexion avec FranceConnect+ pour accéder à des services comme MonCompteFormation, MaPrimeRénov’…)

## Faire une procuration de vote 100% dématérialisée

Lutter contre la fraude grâce à une identité sécurisée, issue de la CNIe

A partir de la mi-mars 2025, l’activation de l’identité numérique pourra se faire dès la remise de la carte d’identité en mairie et ainsi éviter à l’usager de devoir se rendre deux fois en mairie : une fois pour retirer sa CNIe et une autre pour certifier son identité numérique.

Le processus est simple et rapide :

Lorsque votre CNIe sera disponible, vous recevrez un SMS vous indiquant que vous pouvez venir la retirer dans le service qui a enregistré votre demande.

Via ce SMS, vous serez invité, si vous le souhaitez uniquement, à pouvoir faire certifier votre identité numérique en même temps que le retrait de votre CNIe.

Vous aurez un lien pour accéder au site de France Identité pour initier la procédure. Il est impératif de le faire avant de venir retirer votre CNIe.

Si vous optez pour faire la certification en même temps que le retrait de votre CNI: via ce lien, il faudra renseigner vos coordonnées ce qui va générer un QR Code sur votre téléphone.

Lorsque vous viendrez retirer votre CNI, il faudra vous munir de votre téléphone avec le QR Code qui sera douché par l’agent et de votre ancien titre. Sans ce QR Code, nous ne serons pas en mesure de certifier votre identité numérique.

24h à 48h après le passage en mairie, vous recevrez un SMS de France Identité vous indiquant si la certification de votre identité numérique est validée ou non.`,
    order: 201,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d007",
    theme: "contact",
    slug: "passeport",
    title: "Passeport",
    section: "demarches",
    subsection: "Formalités administratives",
    summary:
      "Comment faire ?",
    content: `Comment faire ?

La demande doit s’effectuer en Mairie.

Les documents à fournir dépendent de la situation : majeur ou mineur, première demande ou renouvellement.

Étapes :

saisissez votre  pré-demande en ligne :

renouvellement

/

## première demande

## / perte prenez rendez-vous sous 3 mois en ligne

>>> Si vous n’avez pas de rendez-vous dans un délai de 3 mois suite à votre pré-demande, vous devrez renouveler votre pré-demande en ligne.`,
    order: 202,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d008",
    theme: "contact",
    slug: "carte-grise-et-permis",
    title: "Carte grise et permis de conduire",
    section: "demarches",
    subsection: "Formalités administratives",
    summary:
      "La gestion des cartes grises est assurée par la Préfecture : trouvez toutes les démarches à suivre en ligne.",
    content: `La gestion des cartes grises est assurée par la Préfecture : trouvez toutes les démarches à suivre en ligne.

https://permisdeconduire.ants.gouv.fr/

## Permis de conduire – nouveauté 2024

Changements 2024 : l’âge minimum abaissé à 17 ans pour l’obtention du Permis de Conduire

Retrouvez toutes les étapes liées au permis de conduire sur la plateforme https://permisdeconduire.ants.gouv.fr/

. Cette plateforme offre une centralisation efficace des nouveautés et démarches, incluant la déclaration de perte ou de vol du permis de conduire, la consultation de l’avancement du dossier, ainsi que la vérification du solde de points etc.

Dès janvier 2024, l’examen du permis de conduire sera accessible dès l’âge de 17 ans en France. L’objectif de cette mesure est de faciliter la mobilité des jeunes, en particulier ceux résidant en zone rurale, pour améliorer leur accès à l’emploi.

Cette disposition s’appliquera de manière universelle à tous les candidats au permis de conduire, qu’ils soient inscrits dans une auto-école traditionnelle, qu’ils optent pour le passage en candidat libre, ou qu’ils choisissent une auto-école en ligne, comme celle disponible sur ce site. Dans ce dernier cas, l’auto-école en ligne fournira toutes les informations nécessaires, y compris l’inscription à l’examen au code de la route via le numéro NEPH.

Les jeunes participants à l’apprentissage anticipé de la conduite (AAC), également connu sous le nom de conduite accompagnée, peuvent déjà passer l’épreuve pratique du permis de conduire dès l’âge de 17 ans. Toutefois, la conduite individuelle après la réussite de l’examen n’est autorisée qu’à la majorité. À partir de 2024, cette possibilité sera étendue à tous les candidats au permis de conduire, indépendamment de leur choix de suivre le système de conduite accompagnée ou non.`,
    order: 203,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d009",
    theme: "contact",
    slug: "casier-judiciaire",
    title: "Casier judiciaire",
    section: "demarches",
    subsection: "Formalités administratives",
    summary:
      "Si vous souhaitez obtenir un extrait de casier judiciaire, veuillez vous rendre sous le lien suivant :",
    content: `Si vous souhaitez obtenir un extrait de casier judiciaire, veuillez vous rendre sous le lien suivant :

https://www.service-public.fr/particuliers/vosdroits/F1420`,
    order: 204,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d010",
    theme: "contact",
    slug: "recensement",
    title: "Recensement",
    section: "demarches",
    subsection: "Formalités administratives",
    summary:
      "Recensement de la population",
    content: `## Recensement de la population

Le recensement de la population est organisé en partenariat avec l’institut national de la statistique et des études économiques (Insee). L’objectif est de mesurer la population vivant en France, pour mieux s’adapter à ses besoins. À Colombelles, le recensement a eu lieu en 2021. Le prochain recensement aura lieu en 2027 et chaque habitant sera recensé.

Les résultats sont consultables sur le site de l’Insee

.

Plus d’informations :

https://le-recensement-et-moi.fr https://www.insee.fr/fr/accueil

## Recensement citoyen

Tous les jeunes Français, garçons et filles, ont l’obligation de se faire recenser dans les 3 mois qui suivent leur 16ème anniversaire.

Seul le recensement permet la convocation à la JDC (Journées Défense Citoyenneté) environ 1 an après.

Alors dès vos 16 ans rendez-vous auprès de votre mairie muni d’une pièce d’identité, du livret de famille et un justificatif de domicile.

Et pour répondre à toutes vos questions sur la JDC, connectez-vous à majdc.fr

Vous pourrez ainsi :

Découvrir ce qu’est la JDC ;

Télécharger votre convocation ;

Changer la date de votre JDC ;

Etre guidé jusqu’au site de convocation ;

Télécharger votre attestation à l’issue de la JDC en cas de perte du certificat remis.

Vous pourrez créer votre compte environ 2 à 4 mois après votre recensement en mairie

: délai pour que vous soyez connu des services du CSN (Centres du service national).

Mais pour être automatiquement alerté de cette possibilité il vous suffit de laisser une adresse mail lors de votre venue en mairie.

A compter du 1 er septembre 2025, la JDC s’effectuera sur une journée complète.

Pour tout renseignement contactez le Centre du service national et de la jeunesse de Caen :

09 70 84 51 51

Lundi au jeudi : 09h à 11h 45

## Vendredi : 09h à 12h – 13h30 à 15h30

Pas d’accueil public csnj-caen.contact.fct@intradef.gouv.fr https://www.defense.gouv.fr/sga/au-service-nation-du-public/jeunesse

20210928_NP_CSNJ CAEN_com recensement`,
    order: 205,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d011",
    theme: "contact",
    slug: "listes-electorales",
    title: "Inscription sur les listes électorales",
    section: "demarches",
    subsection: "Formalités administratives",
    summary:
      "Inscription sur les listes électorales",
    content: `## Inscription sur les listes électorales

Pour pouvoir voter, il faut être inscrit sur les listes électorales de la commune.

Seuls les jeunes de 18 ans sont inscrits automatiquement si et seulement si ils ont fait leur recensement citoyen obligatoire entre 16 et 18 ans.

Dans tous les autres cas :  l’inscription sur les listes doit faire l’objet d’une démarche volontaire (changement de commune, déménagement à l’intérieur de la commune, etc.).

Suis-je inscrit ?

Je vérifie ma situation électorale

S’inscrire sur la liste électorale

Conditions pour être inscrit

:

avoir la nationalité française. Les citoyens de l’Union européenne qui résident en France peuvent également s’inscrire pour les élections municipales et les élections européennes.

être domicilié dans la commune, y avoir sa résidence depuis 6 mois ou avoir la qualité de contribuable ou de gérant ou associé majoritaire ou unique d’entreprise.

avoir 18 ans.

jouir de ses droits civiques et politiques.

Pour vous inscrire sur la liste électorale de Colombelles, vous pouvez :

effectuer cette démarche en ligne en cliquant sur ce lien.

déposer le formulaire CERFA accompagné des pièces justificatives en mairie.

Pièces justificatives ci-dessous :

## c

arte nationale d’identité ou passeport en cours de validité, ou périmé depuis moins de 5 ans.

## u

## n justificatif de domicile de moins de trois mois

(facture eau, gaz, électricité ou téléphone fixe) – Les factures de téléphone portable ne sont pas recevables.

Un formulaire Cerfa

## Délais

L’inscription peut être demandée à tout moment de l’année. Toutefois, si un scrutin est prévu, la date limite pour s’inscrire et voter à ce scrutin est fixée au 6e vendredi précédant le 1er tour.

Informations :

Pour les électeurs colombellois ayant changé d’adresse à Colombelles, seul le justificatif de domicile est requis.

## Voter par procuration

Les électeurs qui sont absents de Colombelles le jour des élections ou qui sont dans l’impossibilité de se déplacer, peuvent voter par procuration.

Désormais vous pouvez donner procuration à une personne de confiance inscrite dans une autre commune, qui viendra voter pour vous, dans votre bureau de vote.

Pour réaliser cette démarche, vous devez renseigner votre Numéro National d’électeur (NNE) ainsi que celui de la personne à qui vous accordez procuration.

Les numéros NNE sont indiqués sur vos cartes électorales ou disponibles sur le site www.service-public.fr rubrique interroger sa situation.

Modalités :

## Compléter le formulaire

Cerfa avec votre numéro national d’électeur (NNE) et celui de la personne à qui vous accordez la procuration électorale.

Une fois votre mail de confirmation réceptionné, vous devez vous rendre avec votre pièce d’identité soit au Tribunal d’Instance au commissariat de Police à la Gendarmerie

La démarche est simplifiée avec l’ identité numérique certifiée

.

Devenir assesseur ?

La ville organise les élections sous la responsabilité des services de l’État et vous pouvez y participer en tant qu’assesseur. Vous vivrez de l’intérieur ce moment de démocratie.

Vos missions :

après vérification de l’identité de l’électeur par le président, l’assesseur doit rechercher le nom de la personne sur les listes d’émargement, la faire émarger et apposer la date du vote sur la carte électorale.

lors de la fermeture du bureau de vote, l’assesseur assiste le président lors du comptage des émargement s.

Déroulement d’un scrutin :

https://www.service-public.fr/particuliers/vosdroits/F16828`,
    order: 206,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d012",
    theme: "contact",
    slug: "carte-d-electeur",
    title: "Carte d'électeur",
    section: "demarches",
    subsection: "Formalités administratives",
    summary:
      "Pour obtenir une carte d’électeur, il faut être inscrit sur les listes électorales, cela peut se faire :",
    content: `Pour obtenir une carte d’électeur, il faut être inscrit sur les listes électorales, cela peut se faire :

automatiquement, comme par exemple l’inscription d’office d’un jeune atteignant l’âge de 18 ans de façon volontaire à la suite d’un déménagement à la suite de l’obtention de la nationalité française

.

Vous pouvez vérifier votre inscription électorale et connaître votre bureau de vote à l’aide du lien suivant :

https://www.service-public.fr/particuliers/vosdroits/demarches-et-outils/ISE

## En cas de perte

Pour remplacer votre carte, vous pouvez obtenir une attestation d’inscription sur la liste électorale

.

Pour cela, vous pouvez :

en faire la demande à la mairie de la commune où vous êtes inscrit ou la télécharger à l’aide de ce téléservice

.

Au moment du vote, vous pourrez présenter cette attestation à votre bureau de vote.

## Vote par procuration

En cas d’absence le jour d’une élection, vous pouvez charger un électeur de voter à votre place, dans votre bureau de vote. Pour ce faire vous devez réaliser une procuration de vote.

Pré-inscription en ligne :

https://www.maprocuration.gouv.fr/`,
    order: 207,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d013",
    theme: "patrimoine",
    slug: "urbanisme",
    title: "Démarches d'urbanisme",
    section: "demarches",
    subsection: "Urbanisme",
    summary:
      "Fermetures exceptionnelles des permanences d’urbanisme",
    content: `## Fermetures exceptionnelles des permanences d’urbanisme

La permanence du service urbanisme sera fermée du lundi 31 août au 14 septembre inclus.

## Déposez votre demande d’autorisation d’urbanisme en ligne

Vous envisagez des travaux extérieurs sur votre propriété (portail, clôture, toiture…), une extension, un aménagement de combles, ou encore l’installation d’un abri de jardin ?

Avant de commencer vos travaux, il est indispensable de vérifier si votre projet nécessite une autorisation d’urbanisme

.

## Déposez votre demande en ligne

Vous pouvez réaliser toutes vos démarches depuis chez vous grâce au service en ligne (permis de construire, permis d’aménager, déclaration préalable, permis de démolir, certificat d’urbanisme).

Avantages de la dématérialisation :

Simple et sécurisée

## Facilite l’instruction des demandes

Limite les déplacements et réduit les délais de traitement

Pour déposer votre demande en ligne :

Accéder au guichet unique

Créez votre compte

## Remplissez le formulaire en ligne

Joignez les documents numériques du dossier

## Validez le dossier et envoyez le

Le dépôt papier reste possible, mais nous vous encourageons à privilégier la dématérialisation, plus sécurisée et rapide.

## Renseignez-vous avant vos travaux

Avant toute réalisation ou commande auprès d’un professionnel, assurez-vous de connaître l’autorisation nécessaire pour votre projet :

## Informations sur Service-Public.fr

Contactez le service urbanisme de la mairie de Colombelles pour toute question spécifique.

Informations pratiques

Service Urbanisme

## Place François Mitterrand, Colombelles

Lundi : 13h30-17h et mercredi : 8h30-12h30/14h-17h urbanisme@colombelles.fr`,
    order: 301,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d014",
    theme: "patrimoine",
    slug: "plui-habitat-et-mobilite",
    title: "PLU et PLUi",
    section: "demarches",
    subsection: "Urbanisme",
    summary:
      "Le Plan Local d’Urbanisme de Colombelles",
    content: `## Le Plan Local d’Urbanisme de Colombelles

Le Plan Local d’Urbanisme est un document de planification qui détermine les conditions d’aménagement et d’utilisation des sols. Il a pour objectif d’orienter l’aménagement du territoire et de mettre en cohérence ses différents enjeux (habitat, mobilité, activités économiques, environnement…). Il détermine les droits à construire applicables à chaque parcelle et fixe les normes réglementaires de construction suivant la nature de la zone.

Le Plan Local d’Urbanisme de Colombelles a été approuvé lors du conseil municipal du 24 février 2014.

Plusieurs modifications sont intervenues pour tenir compte des évolutions du territoire.

Retrouvez les différents éléments réglementaires et des pièces du PLU de Colombelles est accessible sur en ligne :

https://www.geoportail-urbanisme.gouv.fr

## Modification simplifiée n°2

Une procédure de modification simplifiée soumise à évaluation environnementale n°2 du PLU de Colombelles a été engagée.

Les habitants sont invités à s’informer et à s’exprimer. Une rubrique « modification simplifiée n°2 » est disponible sous le lien suivant :

https://caenlamer.fr/concertations/modification-simplifiee-2-plu-colombelles pour assurer la consultation des pièces du projet de la procédure. Il sera alimenté au fur et à mesure des études.

Des registres d’observations en format papier sont également à disposition dans les lieux suivants :

Mairie de Colombelles (Place François Mitterrand)

Siège de Caen la mer (16 rue Rosa Parks à Caen)

Le

Plan Local d’Urbanisme Intercommunal

## Habitat et Mobilités

Conformément à l’article L.153-8 du code de l’urbanisme, la communauté urbaine Caen la mer souhaite aujourd’hui s’engager, à son initiative et sous sa responsabilité, dans l’élaboration d’un PLU intercommunal en collaboration avec les 48 communes qui la composent. Un registre d’observations du public est disponible en mairie de Colombelles.

Pour plus d’informations

:

## https://www.pluihm-caenlamer.fr/

## Le Projet d’Aménagement et de Développement Durables

Le Projet d’Aménagement et de Développement Durables (PADD) du PLUI-HM de Caen la mer fixe des orientations générales à l’échelle de la communauté urbaine. Il s’agit d’un document stratégique majeur pour l’avenir de notre territoire.

Pour plus d’informations

:

https://www.pluihm-caenlamer.fr/le-padd/`,
    order: 302,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d015",
    theme: "patrimoine",
    slug: "droit-de-preemption-urbain",
    title: "Droit de préemption urbain",
    section: "demarches",
    subsection: "Urbanisme",
    summary:
      "Le droit de préemption urbain (DPU) offre la possibilité à une personne publique, dans un périmètre prédéfini, de se substituer à l’acquéreur éventuel d’un bien mis en vente…",
    content: `Le droit de préemption urbain (DPU) offre la possibilité à une personne publique, dans un périmètre prédéfini, de se substituer à l’acquéreur éventuel d’un bien mis en vente ou faisant l’objet d’une donation (à l’exception de celles réalisées entre personnes d’une même famille) et de l’acquérir en priorité, afin de réaliser une opération d’aménagement ou de constituer des réserves foncières en vue d’une opération d’aménagement.

À Colombelles, le DPU est instauré sur l’ensemble des zones U et AU définies dans le PLU.

Carte du droit de préemption`,
    order: 303,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d016",
    theme: "nature",
    slug: "dechets-et-proprete",
    title: "Calendrier des collectes",
    section: "demarches",
    subsection: "Propreté",
    summary:
      "Consultez les calendriers de collecte du 1er avril 2026 au 31 mars 2027",
    content: `Consultez les calendriers de collecte du 1er avril 2026 au 31 mars 2027

:

Calendrier de collecte de Colombelles centre-ville

Calendrier de collecte du Plateau`,
    order: 401,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d017",
    theme: "nature",
    slug: "modalites-du-tri",
    title: "Modalités du tri",
    section: "demarches",
    subsection: "Propreté",
    summary:
      "Tous les emballages se trient !",
    content: `Tous les emballages se trient !

La collecte des emballages recyclables et des papiers se fait exclusivement au moyen de bacs jaunes. Les emballages et papiers doivent être déposés en vrac directement dans le bac.

Bon à savoir :

un emballage, c’est ce qui protège un aliment ou un objet. Sont donc exclus les objets en plastique tels que les jouets, brosses à dents, stylos etc…

Ainsi, vous pouvez déposer les pots et barquettes en plastique et polystyrène, les sacs et films (café, biscuits apéritifs, fromage râpé…) et les tubes (dentifrices, crème de soin…) sans exception dans la poubelle jaune.

Pour tout connaître des nouvelles consignes de tri, consultez le site www.consignedetri.fr
- 02 31 30 43 04

Plus d’informations :

https://caenlamer.fr/ramassage-des-dechets

## Calendrier de collectes

Pour la collecte des déchets ménagers, la Ville de Colombelles est divisée en deux secteurs avec chacun un calendrier spécifique pour le Centre-ville et le Plateau.

Attention : Les calendriers de collecte sont destinés aux habitants de logements individuels. Si vous habitez en habitat collectif, contactez votre bailleur ou votre syndic de copropriété, qui a reçu par courrier la liste des jours de collecte relative aux logements collectifs.

CALENDRIER AVRIL 2025 / MARS 2026

Colombelles Centre

## Colombelles Plateau

> À partir du 1er avril 2024, sur le Plateau, les ordures ménagères seront collectées l’après-midi, et non plus le matin.

## Déchèteries

7 déchèteries sont à votre disposition sur le territoire de la Communauté urbaine Caen la mer. La déchèterie est un espace gardienné qui permet le réemploi et le dépôt des déchets ne pouvant être collectés en porte à porte en raison de leur nature, poids ou volume. C’est un centre d’apport volontaire ouvert aux particuliers et professionnels (artisans, commerçants, associations, etc.).

## Les conditions d’accès

L’accès est gratuit aux habitants de la communauté urbaine.

C’est une aire aménagée et gardiennée où il est possible de déposer leurs déchets dans des conteneurs ou des bennes spécifiques.

L’accès est limité aux véhicules de tourisme, aux véhicules attelés d’une remorque et aux camionnettes de moins de 3,5 tonnes.

## Le dépôt le samedi est réservé aux particuliers

## La déchèterie est fermée les jours fériés

Caen la mer modernise les accès en déchèteries.

Le nouveau système simplifiera et fluidifiera le passage en déchèterie grâce notamment à la reconnaissance de plaques d’immatriculation. Ce contrôle d’accès combinera deux modes d’accès possibles : la reconnaissance par plaque d’immatriculation et l’accès par QR code. Ce dernier permettra notamment de se rendre en déchèteries avec un autre véhicule, de location par exemple.

La mise en place de ce nouveau système sera progressive, afin de permettre aux usagers d’effectuer les démarches d’inscription nécessaires sur le site internet de Caen la mer. En cas de difficulté, il sera toujours possible de joindre nos services au 02 31 304 304.

BON A SAVOIR !

1er octobre 2025 : possibilité de créer son compte en ligne en saisissant sa plaque d’immatriculation et obtenir son QR code.

## Rendez-vous sur caenlamer.fr

1er décembre 2025 : mise en place du nouveau contrôle d’accès en déchèteries : lecture de plaque et de QR code. Possibilité d’accéder via les modalités actuelles (pièce d’identité et justificatif de domicile).

1er septembre 2026 : accès obligatoire via le nouveau dispositif.

## La

nouvelle déchèterie de Colombelles se situe 1 rue Novaci.

Un équipement  « nouvelle génération » conçue pour simplifier vos dépôts de déchets :

Accès facile : Avec un accès direct au sol, elle facilite vos manœuvres de déchargement.

Adaptabilité : Prête à accueillir tous les nouveaux types de déchets conformément aux réglementations en vigueur.

Solutions environnementales : Elle offre des solutions innovantes pour réduire notre impact environnemental.
- > Réemploi

: Un grand espace dédié permet de donner une seconde vie à vos objets.
- >

## Compactage

: Des équipements de compactage optimisent le stockage et le transport des déchets.

Sensibilisation au tri des déchets : Profitez de votre visite pour en apprendre davantage sur le tri des déchets. Un espace pédagogique, ouvert à tous, vise particulièrement à sensibiliser les plus jeunes à cette pratique essentielle pour préserver notre environnement.

Informations pratiques

## Déchèterie de Colombelles

1 rue de Novaci, 14460 Colombelles https://caenlamer.fr/annuaire-equipement/decheterie-colombelles – 02 31 304 304

## Service de collecte à domicile

Vous pourrez solliciter le service de collecte d’encombrants sur appel, à partir du 1er avril au 02 31 95 69 09 (tarif unique de 10 € par collecte)

dans la limite de 2m3 par collecte.

.

En complément de ce service, une collecte annuelle est maintenue et vous disposez de l’accès gratuit aux 7 déchèteries de Caen la mer toute l’année.

## Le tri des déchets alimentaires

Depuis le 1er janvier 2024, les collectivités territoriales chargées de la gestion des déchets sont dans l’obligation de proposer des solutions de tri des déchets alimentaires à tous les usagers.

Depuis 2005, la Communauté urbaine de Caen la mer a initié une démarche en ce sens, en proposant des composteurs individuels et en accompagnant l’installation de sites de compostage partagé pour habitations collectives. Au total, 23 217 composteurs individuels ont été distribués. Aujourd’hui, 36,60% des foyers concernés en sont équipés. 60 sites de compostage en pied d’immeuble, 11 sites de compostage de quartier et 25 sites en restauration collective ont été installés. L’évolution de la réglementation va donc intensifier la pratique du compostage sur le territoire.

Pour développer et promouvoir le tri des déchets alimentaires des ambassadeurs du tri sillonnent le territoire. Des études d’opportunité de compostage partagé sont réalisées dans tous les immeubles du territoire, permettant de savoir si l’installation d’un site en pied d’immeuble est possible.

À chaque habitat sa solution. Des points d’apport volontaire sont déployés pour proposer aux habitants une collecte des déchets alimentaires. Les points d’apport volontaire se présentent sous forme d’abris bacs avec une trappe d’ouverture sur le dessus pour le dépôt des déchets alimentaires. Une fois collectés, ils seront acheminés vers une plateforme de compostage industrielle. Le compost produit est utilisé en amendement principalement pour l’exploitation agricole.

Concrètement :

Ainsi à Colombelles, 5 points d’apport volontaire pour les déchets alimentaires sont disponibles :

Rue Jules Guesde (parking du cimetière)

Place François Mitterrand

Rue Pierre Mendès France

Rue François Mourier

Rue des Arcades

Plus d’informations :

rubrique compostage  propose différentes solutions pour le tri des déchets alimentaires :

Déchets et propreté urbaine | Caen la mer cartographie des points d’apport volontaire disponible en ligne :

Les points d’apport volontaire de déchets ménagers | Caen la mer

Les services de Caen la mer se tiennent également à votre disposition au 02 31 304 304 et par mail à contact.dm@caenlamer.fr

Recyclage, collecte et tri

## Collecte de tissu

## Caen la mer avec les acteurs solidaires locaux

(la Chiffo, Itinéraires et la participation d’Emmaüs), permet via des points de collectes de tissu permanent de concilier la protection de l’environnement, l’insertion professionnelle et le développement économique.

Textiles autorisés : tous les vêtements, le linge de maison, les chaussures et la maroquinerie peuvent être déposés dans une borne à textiles. Il suffit de les placer propres et secs dans un sac et les chaussures liées par paire.

## Collecte du petits électroménagers

Il est possible de donner une 2e vie à votre petit électroménager (grilles, pains, radio réveil, sèche-cheveux, etc…). 2 points de collectes sont présents à Colombelles :

dans l’entrée du Super U et à la Boîte à idées, place François Mitterrand

L’objectif est à la fois de recycler plutôt que de jeter, voire de réparer, de donner une 2e vie et aussi une activité professionnelle dans le cadre de dispositifs de réinsertion.

## Collecte du verre

Partout dans la ville, des bornes de collecte de verres sont à votre disposition

FAQ biodéchets

FAQ biodéchets

FAQ biodéchets

FAQ biodéchets

FAQ biodéchets`,
    order: 402,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d018",
    theme: "actu",
    slug: "police-municipale",
    title: "Police municipale",
    section: "demarches",
    subsection: "Prévention et sécurité",
    summary:
      "Sous l’autorité du Maire, les policiers municipaux assurent, sur le territoire communal, des missions en matière de prévention et de surveillance du bon ordre, d’assistance,…",
    content: `Sous l’autorité du Maire, les policiers municipaux assurent, sur le territoire communal, des missions en matière de prévention et de surveillance du bon ordre, d’assistance, de la tranquillité, de la sécurité et salubrité publiques.

Informations pratiques

Police municipale

## 5 rue Jules Guesde

Lundi > vendredi : 8h30-12h / 14h-18h Samedi : 9h-16h30 –

## EN CAS D’URGENCE COMPOSEZ LE 17

## 02 31 35 25 04 police.municipale@colombelles.fr

Les policiers municipaux sont notamment chargés d’assurer l’exécution des arrêtés de police du Maire. Ils ont la compétence pour constater par procès-verbaux les contraventions à la plupart des dispositions du Code de la Route.

Bon à savoir :

dans le cadre de stationnements anarchiques de véhicules (trottoirs, gênants, …), vous encourez une amende de 35 à 135 € un stationnement abusif excédant 7 jours sur la voie publique engendre une mise en fourrière

Mises en fourrière

## Véhicules

: Suite à une infraction, votre véhicule a été mis en fourrière par la police municipale. Vous devez vous présenter au service muni des documents (carte grise/certificat de cession, attestation d’assurance en cours de validité, permis de conduire) afin d’obtenir la mainlevée de mise en fourrière. Cette démarche peut aussi être faite à l’hôtel de police de Caen.

Hôtel de police de Caen, 10 rue Thiboult de la Fresnaye, 14000 Caen – 02 31 29 22 00

## Animaux

: Votre animal errant sur la voie publique a été pris en charge par la fourrière animale de Verson. Vous devez vous rendre à la fourrière et vous acquitter des frais.

Fourrière animal de Caen la mer,

Route de Saint-Manvieu-Norrey, 14790 Verson –

## 02 31 80 73 03

## Règlementation concernant les chiens dangereux

Vous devez prendre contact avec la police municipale afin de transmettre votre dossier de demande de délivrance de permis de détention d’un chien dangereux.

Après instruction de votre dossier par Monsieur le Maire, et si la décision est positive, vous pourrez retirer le permis de détention à la police municipale, muni du passeport européen pour animal de compagnie de votre chien.

plus d’infos https://www.service-public.fr/particuliers/vosdroits/F1839 demande de délivrance de permis de détention d’un chien catégorisé

## ACTUALITES

La mise en place d’un Conseil Local de Sécurité et de Prévention de la Délinquance

En janvier 2023, Marc Pottier, Maire de Colombelles, a lancé le Conseil Local de Sécurité et de Prévention de la Délinquance (CLSPD) en présence de Philémon Perrot, directeur de Cabinet du Préfet du Calvados et de Patrice Lemonnier, avocat général, délégué du procureur et des représentants de l’éducation nationale, du Conseil départemental du Calvados, de la Communauté urbaine de Caen la mer, de la police nationale, des bailleurs sociaux, de partenaires issus du secteur de la jeunesse, du social ou encore du monde économique.

Dans les mois à venir, un diagnostic sera effectué. Cette photographie de la situation sur le territoire servira à déterminer les groupes de travail thématiques qui plancheront sur des axes prioritaires et des actions à mettre en œuvre en matière de prévention et de sécurité. Des questions seront posées, comme celles de l’habitat, de la circulation, de la jeunesse, de l’absentéisme, du travail, des différentes incivilités, des violences intrafamiliales ou encore du harcèlement. Il s’agira de pointer les éléments de difficultés pour travailler à trouver ensemble des solutions.

L’objectif de cette instance est de mieux faire connaître le travail de chacun des partenaires et de permettre les synergies afin d’être plus efficaces dans la préservation de la tranquillité publique en matière de prévention, de médiation et d’information de la population.`,
    order: 501,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d019",
    theme: "actu",
    slug: "numeros-d-urgence",
    title: "Numéros d'urgence",
    section: "demarches",
    subsection: "Prévention et sécurité",
    summary:
      "Samu >",
    content: `Samu >

15

Pompiers >

18

Police secours >

17

Numéro d’appel d’urgence européen >

112

Enfance en danger >

119

Violence Femmes Info >

39 19

SOS Médecins >

36 24

Centre anti-poison >

02 41 48 21 21

Mairie >

02 31 35 25 00

Police Municipale >

02 31 35 25 04`,
    order: 502,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d020",
    theme: "actu",
    slug: "dicrim",
    title: "DICRIM — risques majeurs",
    section: "demarches",
    subsection: "Prévention et sécurité",
    summary:
      "Plan communal de sauvegarde",
    content: `## Plan communal de sauvegarde

La sécurité des habitants de Colombelles est l’une des préoccupations du Maire et de son équipe municipale, notamment au niveau des risques météorologiques, inondations, transport de matières dangereuses.

Aussi, c’est dans un souci d’information et de prévention qu’a été élaboré le Dossier d’Information Communales sur les Risques Majeurs (DICRIM). En complément de ce travail d’information, la commune de Colombelles a également élaboré un Plan Communal de Sauvegarde (P.C.S.) qui a pour objectif de mettre en œuvre une organisation en cas de survenance d’évènements graves (inondations, tempête, séisme, risques sanitaires et technologiques …). Le Plan Communal de Sauvegarde permet aussi d’assurer l’alerte, la protection, la prévention, l’information, l’accompagnement et le soutien de la population.

Dossier Départemental des Risques Majeurs (DDRM)

Plan Communal de Sauvegarde Simplifié (PCS)

Dossier d’Information Communales sur les Risques Majeurs (DICRIM)

## Conduite à tenir face aux risques majeurs

Document d’Information Communal sur les RIsques Majeurs – DICRIM

Orages, inondations, vents violents, canicule sont des phénomènes climatiques parfois rapides et intenses qui peuvent se produire. L’idée n’est pas d’être alarmiste, mais réaliste. Plus on est informés et plus ces situations exceptionnelles sont gérées sereinement.

Saviez-vous qu’à Colombelles 6 risques naturels sont potentiellement existants, tout comme 3 risques technologiques et industriels ? On parle en effet de risques majeurs, c’est-à-dire que la fréquence des risques est faible, mais leur gravité est conséquente. Malgré la rareté de ces phénomènes, un document réglementaire communal existe pour recenser les comportements à adopter et sensibiliser les habitants,  il s’agit du Document d’Information Communal sur les RIsques Majeurs : le DICRIM. Vous devez l’avoir reçu dans votre boîte aux lettres. Sinon sachez qu’il est disponible sur le site Internet de la ville et à l’accueil de l’hôtel de ville sur simple demande.

Quelles informations contient le DICRIM de Colombelles ?

Le DICRIM reprend les informations transmises par le préfet dans le cadre du dossier départemental des risques majeurs (DDRM), dont :

## la

liste des risques majeurs auxquels la commune est exposée ;

## la

description de chacun de ces risques et de leurs conséquences prévisibles pour les personnes, les biens et l’environnement ;

les mesures de prévention, de protection et de sauvegarde pour chacun de ces risques ;

les consignes de sécurité individuelles à mettre en œuvre.

A lire et à conserver :

Le DICRIM de Colombelles

Comment se préparer en cas de risques ?

## «

La peur et l’urgence sont mauvaises conseillères. Ainsi, la lecture préventive du DICRIM est indispensable pour se préparer à bien réagir en cas de crise. Il contribue aussi à responsabiliser chaque citoyen pour sa propre mise en sécurité et renforce l’efficacité des mesures mises en œuvre par la collectivité dans le cadre de son plan communal de sauvegarde

», exprime Nadine Lefevre, Adjointe au Maire aux affaires intercommunales, à la démocratie participative, à la sécurité et à la prévention.

VIDEO :

Qu’est-ce qu’un risque majeur ?

## Connaître les 9 risques majeurs et les signaux d’alerte

Une lecture attentive de ce document peut permettre de gagner un temps précieux en cas de situations à risques. Savoir reconnaître le signal d’alerte du Système d’Alerte et d’Information à la Population dont des tests sont réalisés tous les premiers mercredis de chaque mois et se tenir informé en temps réel via les radios locales, le site et les réseaux sociaux de la Préfecture et de la Ville sont primordiaux : mettez ces sites dans vos favoris. Et sont faits pour le signal d’alerte.

VIDEO ; Comment reconnaitre le signal d’alerte

## Avoir de bons réflexes

Une situation de danger ou de risques peut vous inquiéter mais des professionnels expérimentés (force de l’ordre, Préfecture, collectivités) coordonnent et gèrent la situation. Pour les aider, adoptez de bonnes attitudes : limitez l’usage de votre téléphone sauf urgence pour ne pas encombrer le réseau. De même, limitez vos déplacements pour aller chercher vos enfants à l’école. Les structures d’accueil de l’enfance disposent d’un Protocole de Mise en Sureté (PMS) pour les mettre en sécurité. (il s’agit d’un PPMS pour les établissements scolaires : Plan Particulier de Mise en Sécurité)

Votre kit d’urgence est prêt ?

Ce kit est un sac à dos de première nécessité pour être prêt si une situation de crise arrive. Il est recommandé de disposer d’un kit d’urgence déjà prêt dans vos placards pour gérer un départ précipité ou l’attente des secours.

MÉMO DES CONDUITES À TENIR FACE AUX RISQUES MAJEURS connaitre-le-signal-dalerte heula1.

heula2.

heula3.

heula4.

heula5.

heula6.

heula7.`,
    order: 503,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d021",
    theme: "actu",
    slug: "plans-de-prevention",
    title: "Plans de prévention",
    section: "demarches",
    subsection: "Prévention et sécurité",
    summary:
      "Plan de prévention des risques de la Basse Vallée de l’Orne",
    content: `## Plan de prévention des risques de la Basse Vallée de l’Orne

Le Plan de Prévention Multi Risques de la Basse Vallée de l’Orne est approuvé par arrêté préfectoral du 10 août 2021

. Il abroge le PPR inondation de la basse vallée de l’Orne, approuvé le 10 juillet 2008.

Il réglemente l’urbanisme au regard des risques naturels suivants :

inondation par submersion marine (submersion marine, chocs mécaniques) avec prise en compte des conséquences du changement climatique, inondation par débordement de cours d’eau, érosion, migration dunaire.

Il concerne les communes de : Amfreville, Ranville, Bénouville, Blainville-sur-Orne, Colombelles, Hérouville-Saint-Clair, Mondeville, Caen, Fleury-sur-Orne, Louvigny, Bretteville-sur-Odon, Eterville, Verson, Fontaine-Etoupefour, Saint-André-sur-Orne, Feuguerolles-Bully et May-sur-Orne, Lion-sur-mer, Hermanville-sur-mer, Colleville-Montgomery, Ouistreham, Merville-Franceville-plage, Sallenelles.

Le plan de prévention des risques vaut servitude d’utilité publique.

Le plan de prévention multi-risques de la Basse Vallée de l’Orne

## Le dossier départemental des risques majeurs

Le dossier de prévention des risques littoraux du Bessin

## Risques industriels majeurs

Une partie du site de Normandial et du Plateau est à proximité du dépôt pétrolier DPC

(classé Seveso Seuil Haut).

Conformément à la législation française et européenne (en particulier la loi n°2003-699 du 30 juillet 2003 et ses décrets d’application), les pouvoirs publics et les industriels prennent des mesures pour prévenir les accidents et en limiter les effets.

Le risque zéro n’existe pas, mais une information partagée est un moyen de mieux vous protéger en vous faisant connaître les bons réflexes à adopter en cas d’accident.

La Préfecture du Calvados et Dépôts de Pétrole Côtiers ont, en lien avec les mairies de Caen, Mondeville, Colombelles et Hérouville-Saint-Clair, élaboré un document pour vous informer sur les risques existants mais aussi sur les actions de prévention menées. Vous y trouvez également les consignes à appliquer en cas d’alerte. Ceci vous aidera à agir en acteur responsable.

## plaquette de présentation zonage concerné

: un rayon de 1415 m autour des Dépôts Pétroliers Côtiers

## Plan communal de sauvegarde

La sécurité des habitants de Colombelles est l’une des préoccupations du Maire et de son équipe municipale, notamment au niveau des risques météorologiques, inondations, transport de matières dangereuses.

Aussi, c’est dans un souci d’information et de prévention qu’a été élaboré le Dossier d’Information Communales sur les Risques Majeurs (DICRIM). En complément de ce travail d’information, la commune de Colombelles a également élaboré un Plan Communal de Sauvegarde (P.C.S.) qui a pour objectif de mettre en œuvre une organisation en cas de survenance d’évènements graves (inondations, tempête, séisme, risques sanitaires et technologiques …). Le Plan Communal de Sauvegarde permet aussi d’assurer l’alerte, la protection, la prévention, l’information, l’accompagnement et le soutien de la population.

Dossier Départemental des Risques Majeurs (DDRM)

Plan Communal de Sauvegarde Simplifié (PCS)

Dossier d’Information Communales sur les Risques Majeurs (DICRIM)

## Conduite à tenir face au risque majeur

Plan de Prévention du Bruit dans l’Environnement (PPBE)

Caen la mer a établi une cartographie et un projet de plan de prévention du bruit. L’objectif est de protéger les concitoyens, de préserver les zones calmes et de limiter l’apparition de nouvelles zones de bruit.

Plus d’informations :

https://caenlamer.fr/cartographie-bruit`,
    order: 504,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d022",
    theme: "actu",
    slug: "tranquillite-vacances",
    title: "Opération tranquillité vacances",
    section: "demarches",
    subsection: "Prévention et sécurité",
    summary:
      "Pendant toute absence prolongée de votre domicile, vous pouvez vous inscrire à l’opération tranquillité vacances. Les services de police se chargent alors de surveiller…",
    content: `Pendant toute absence prolongée de votre domicile, vous pouvez vous inscrire à l’opération tranquillité vacances. Les services de police se chargent alors de surveiller votre logement. Des patrouilles sont organisées pour passer aux abords de votre domicile.

Inscription en ligne :

formulaire de la police municipale > formulaire à télécharger et à retourner à la police municipale formulaire de la police nationale > formulaire à télécharger.

Nous ne réceptionnons pas les formulaires de la Police Nationale, les formulaires sont transmis via le portail service public vers la Police Nationale`,
    order: 505,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d023",
    theme: "actu",
    slug: "objets-trouves",
    title: "Objets trouvés",
    section: "demarches",
    subsection: "Prévention et sécurité",
    summary:
      "Vous avez perdu un objet ?",
    content: `Vous avez perdu un objet ?

Vous pouvez contacter la police municipale au

02 31 35 25 04.

Afin de récupérer l’objet perdu, il vous sera demandé :

une pièce d’identité ou tout document justifiant q ue vous êtes le propriétaire de l’objet perdu afin de réaliser la restitution.

Informations pratiques

Police municipale

## 5 rue Jules Guesde

02 31 35 25 04 police.municipale@colombelles.fr`,
    order: 506,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d024",
    theme: "actu",
    slug: "video-protection",
    title: "Vidéoprotection",
    section: "demarches",
    subsection: "Prévention et sécurité",
    summary:
      "Depuis 2017, la ville de Colombelles est dotée d’un système de vidéoprotection comportant 48 caméras dans le but de prévenir les atteintes aux personnes et aux biens. En…",
    content: `Depuis 2017, la ville de Colombelles est dotée d’un système de vidéoprotection comportant 48 caméras dans le but de prévenir les atteintes aux personnes et aux biens. En 2022, dans le cadre d’un projet d’extension, 18 caméras seront installées dans d’autres quartiers non pourvus. Enfin, 3ccaméras sont également installées dans le cimetière. La durée de conservation des images, prévue par l’arrêté préfectoral d’autorisation est d’un mois.

Ce système permet de verbaliser certaines infractions aux règles de circulation et de stationnement ainsi que l’abandon d’ordures, de déchets, de matériaux ou d’autres objets.

Pour toute information relative au droit d’accès aux images, merci d’’adresser un courrier à l’attention de Monsieur le Maire, Mairie de Colombelles – Police Municipale en utilisant comme modèle le lien ci-après :

https://www.cnil.fr/fr/modele/courrier/acceder-des-images-video-vous-concernant`,
    order: 507,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d025",
    theme: "famille",
    slug: "transports-en-commun",
    title: "Transports en commun",
    section: "demarches",
    subsection: "Transports et déplacements",
    summary:
      "Caen la mer met en œuvre la politique globale de déplacements en lien avec le Plan de Déplacements Urbains. Le rôle de la Communauté urbaine est de partager l’espace public…",
    content: `Caen la mer met en œuvre la politique globale de déplacements en lien avec le Plan de Déplacements Urbains. Le rôle de la Communauté urbaine est de partager l’espace public en prenant en compte tous les modes de déplacements et en privilégiant la qualité de vie et l’espace urbain de son territoire.

Ainsi la Communauté urbaine Caen la mer est l’autorité organisatrice des transports publics urbains. Elle délègue l’exploitation du réseau Twisto à un prestataire unique privé :

Keolis , opérateur majeur du transport public urbain de voyageurs, dont Keolis Caen Mobilités est une filiale.

Retrouvez les horaires et lignes de bus à Colombelles

Informations pratiques

## Agence Mobilité Twisto

51 rue de l’Oratoire, Caen lundi > vendredi 8h30-18h30 / samedi 10h-17h

02 31 15 55 55 clients@twisto.fr

Plus d’informations`,
    order: 601,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d026",
    theme: "famille",
    slug: "transports-scolaires",
    title: "Transports scolaires",
    section: "demarches",
    subsection: "Transports et déplacements",
    summary:
      "Prise en charge des frais de transport scolaire des collégiens des établissements publics de secteur",
    content: `Prise en charge des frais de transport scolaire des collégiens des établissements publics de secteur

Le coût de la carte du transport scolaire donnant droit à un aller/retour par jour d’école, d’une valeur de 86€, est intégralement pris en charge par la Ville pour les collégiens colombellois fréquentant le collège Gisèle Guillemot et le collège Henri Brunet en 2026/2027.

Cette prise en charge est étendue aux élèves orientés en section d’enseignement général et professionnel adapté (SEGPA), aux élèves en situation de handicap ou avec des problèmes de santé pour lesquels une orientation hors secteur est impérative. Pour tout renseignement, merci de contacter le service Education : 02 31 35 57 07 – veronique.drieu@colombelles.fr

## >

## Formulaire d’abonnement de transport scolaire de Twisto

## Lignes de bus desservant les collèges de secteur

Au total, 5 lignes directes scolaires desservent la commune de Colombelles vers des collèges et lycées de l’agglomération caennaise. L’ensemble de ces lignes sont ouvertes à tous ( aux tarifs habituels

Twisto ).

Colombelles plateau < — > Collège Gisèle Guillemot et Lycée Jules Verne – ligne 111

Colombelles hors plateau < — > Collège Gisèle Guillemot – ligne 121

## Colombelles < — > Lycées Rostand et Fresnel – ligne 110

Colombelles < — > Lycée Allende – ligne 120

## >

Lien vers l’ensemble des lignes complémentaires desservant les établissements scolaires de l’agglomération caennaise`,
    order: 602,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d027",
    theme: "famille",
    slug: "velo",
    title: "Vélo",
    section: "demarches",
    subsection: "Transports et déplacements",
    summary:
      "Saviez-vous qu’à Colombelles, en 2025, il y avait 13,4 km de pistes cyclables ? Et ce n’est pas terminé !",
    content: `Saviez-vous qu’à Colombelles, en 2025, il y avait 13,4 km de pistes cyclables ? Et ce n’est pas terminé !

Votre Commune vous encourage à un usage du vélo au quotidien, que ce soit pour vos déplacements personnels et aussi professionnels. Cette pratique participe directement au bien-être et à la santé des usagers et à l’amélioration de la qualité de l’air pour tous. Elle contribue à la transition écologique du territoire.

## Aide de la ville pour l’achat d’un vélo

Un dispositif d’aide à l’acquisition de vélos à hauteur de 50 € a été voté. Cette aide est destinée à toute personne demeurant à Colombelles.

Vous devrez fournir :

un justificatif de domicile (attention, une seule aide est accordée par foyer) ;

une preuve d’achat.

Cette aide peut être attribuée aussi bien pour l’achat d’un vélo d’occasion chez un professionnel que pour l’achat d’un vélo adulte neuf, de type vélo de ville, VTC et VTT, acheté à une date ultérieure au 15 juin 2021, date d’ouverture du dispositif. >>

Formulaire de demande téléchargeable

Vous achetez un vélo électrique ?

## Un complément forfaitaire de 50 € est proposé par la

Communauté Urbaine Caen la mer pour accompagner et amplifier cette pratique du vélo au quotidien.

>> Détail de l’aide pour l’achat d’un vélo à assistance électrique par Caen la mer

## Votre service de location de vélos

Vous n’utilisez le vélo que de manière ponctuelle ? La location est faite pour vous !

Avec le service Vélolib, vous pourrez prendre un vélo dans une station et le déposer dans une autre, des vélos partagés simples à utiliser et en libre-service, disponibles 24h sur 24 et 7 jours sur 7.

Vélolib, comment ça marche ?

## Consulter le plan des Vélolib

Deux stations sont sur le territoire : en centre-ville, à côté de l’Hôtel de Ville et l’autre sur Effiscience.

Géovélo : roulez sécurisé !

Il existe sur le territoire de Caen la mer de nombreux aménagements cyclables.

Le site Géovélo vous permet de trouver les meilleurs itinéraires à vélo : ils privilégient les pistes cyclables, évitent les zones dangereuses et s’adaptent à votre type de vélo (classique, électrique, cargo, etc.) :

Géovélo

.

Pensez à télécharger l’application !

Un nouveau plan vélo départemental pour 2023-2028

## Doté d’un budget de

38 M€ , dont 10 M€ réservés aux projets des collectivités, l’objectif de ce nouveau plan est d’être au rendez-vous des enjeux sociétaux de demain

: des enjeux environnementaux pour limiter notre empreinte carbone et des enjeux de santé publique pour l’ensemble de la population. Le Département du Calvados s’engage donc sur deux axes de développement :

aménagement, entretien et qualité des infrastructures , d’une part, et encourager à la pratique du vélo au quotidien , d’autre part. Des actions en matière d’aménagements, d’équipements, d’appui aux collectivités, de sensibilisation et d’accompagnement de différents publics seront proposées. Ce nouveau plan départemental de mobilité à vélo s’inscrit dans une volonté publique de redonner du sens à nos déplacements , privés ou professionnels. Lutter contre la pollution, désengorger les villes, limiter les frais de carburant, permettre la pratique d’une activité saine pour notre santé… Autant d’arguments en faveur du vélo sous toutes ses formes.

Pour le découvrir, c’est par ici :

plan vélo départemental 2023 – 2028.`,
    order: 603,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d028",
    theme: "famille",
    slug: "covoiturage",
    title: "Covoiturage",
    section: "demarches",
    subsection: "Transports et déplacements",
    summary:
      "Une aire de covoiturage est présente au niveau du rond-point Lazzaro. Mise en place et gérée par le Conseil départemental du Calvados, elle permet de laisser votre voiture…",
    content: `Une aire de covoiturage est présente au niveau du rond-point Lazzaro. Mise en place et gérée par le Conseil départemental du Calvados, elle permet de laisser votre voiture et de faire du partage de véhicules.

Plus d’informations`,
    order: 604,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d029",
    theme: "emploi",
    slug: "debit-de-boissons",
    title: "Débit de boissons",
    section: "demarches",
    subsection: "Demandes légales",
    summary:
      "Pour les professionnels, les associations ou les particuliers dans le cadre de la vente boissons dans votre établissement, à emporter, temporaire ou occasionnelle, il est…",
    content: `Pour les professionnels, les associations ou les particuliers dans le cadre de la vente boissons dans votre établissement, à emporter, temporaire ou occasionnelle, il est obligatoire de faire une déclaration en amont.

Merci de bien vouloir remplir le CERFA correspondant à votre situation et de le retourner à accueil@colombelles.fr (hôtel de ville, service accueil, place François-Mitterrand, 14460 Colombelles)

CERFA :

pour les manifestations et événements temporaires sur le territoire de Colombelles pour les professionnels`,
    order: 701,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d030",
    theme: "emploi",
    slug: "droit-de-place",
    title: "Droit de place",
    section: "demarches",
    subsection: "Demandes légales",
    summary:
      "Vous souhaitez participer au marché le mercredi matin, place François Mitterrand, vous devrez vous acquitter d’un droit de place.",
    content: `Vous souhaitez participer au marché le mercredi matin, place François Mitterrand, vous devrez vous acquitter d’un droit de place.

Son tarif est fixé par délibération du conseil municipal et est uniforme sur tout le territoire de la commune.

Chaque paiement (à la régie de la mairie ou auprès du placier) fait l’objet d’un reçu de droit de place.

CONTACT

Place François Mitterrand

07 57 49 81 33`,
    order: 702,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d031",
    theme: "emploi",
    slug: "occupation-du-domaine-public",
    title: "Occupation du domaine public",
    section: "demarches",
    subsection: "Demandes légales",
    summary:
      "Occupation du domaine public par un commerce",
    content: `## Occupation du domaine public par un commerce

Vous êtes commerçant et vous souhaitez occuper une partie de l’espace public (trottoir, places)

pour votre activité ?

Il convient de préciser que toute occupation privative du domaine public est soumise à autorisation préalable (nécessairement écrite) délivrée par le Maire ou son représentant. Elle est subordonnée à la présentation d’une demande écrite établie par le demandeur.

Pour l’occupation du domaine public sans emprise au sol (terrasses, vente au déballage, etc.) : 10 € par m²/an.

Pour l’occupation du domaine public avec emprise au sol : 20 € par m²/an.

La demande d’occupation du domaine public avec emprise au sol doit être soumise aux services compétents de la Communauté Urbaine de Caen la mer.

Pour l’installation de chevalets, de porte-menus, d’oriflammes : forfait de 15 €/an par unité installée.

Pour les occupations illégales, c’est-à-dire sans autorisation préalable écrite de l’autorité municipale : 10 € par m² et par jour d’occupation illégale.

Pour les commerçants ambulants : 3 € par m² et par mois d’occupation. La redevance est fixée au prorata du temps d’occupation exprimé par le demandeur en nombre entier de mois, tout mois commencé étant facturé, soit : R (redevance) = 3 € x nombre de m² x nombre de mois d’occupation dans l’année.

## Plus d’informations

> Délibération du conseil municipal relative à la redevance d’occupation du domaine public

> Formulaire de demande pour installation de commerces ambulants – foodtrucks

>

Cerfa à remplir`,
    order: 703,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d032",
    theme: "emploi",
    slug: "vente-au-deballage",
    title: "Vente au déballage",
    section: "demarches",
    subsection: "Demandes légales",
    summary:
      "La vente au déballage consiste à vendre ou racheter des marchandises dans des locaux ou sur des emplacements non destinés à la vente au public , ainsi qu’à partir de…",
    content: `La vente au déballage consiste à vendre ou racheter des marchandises dans des locaux ou sur des emplacements non destinés à la vente au public , ainsi qu’à partir de véhicules spécialement aménagés. La vente au déballage est soumise à une réglementation spécifique

.

La demande d’autorisation doit être effectuée dans un délai de 15 jours.

Plus d’informations :

https://www.demarches.interieur.gouv.fr/professionnels/vente-deballage

Formulaire de demande :

https://entreprendre.service-public.fr/vosdroits/R18906`,
    order: 704,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d033",
    theme: "emploi",
    slug: "enseignes-et-publicites",
    title: "Enseignes et publicités extérieures",
    section: "demarches",
    subsection: "Demandes légales",
    summary:
      "La taxe sur la publicité extérieure (TLPE), qu’est-ce que c’est ?",
    content: `La taxe sur la publicité extérieure (TLPE), qu’est-ce que c’est ?

La taxe sur la publicité extérieure est une taxe créée par la loi du 4 août 2008 pour la modernisation de l’économie. Elle concerne toutes les entreprises qui exploitent des supports publicitaires fixes, visibles et implantés sur une voie ouverte à la circulation. On considère par publicité des supports faisant apparaitre des éléments textuels ou graphiques ayant pour vocation d’informer le public ou d’attirer son attention.

La Taxe Locale sur la Publicité Extérieure est définie par l’article L.2333-7 du Code Général des Collectivités Territoriales « Cette taxe frape les supports publicitaires fixes suivants définis à l’article L.581-3 du code de l’environnement, visibles de toute voie ouverte à la circulation publique, au sens de l’article R.581-1 du même code, à l’exception de ceux situés à l’intérieur d’un local au sens de l’article L.581-2 dudit code :

Les dispositifs publicitaires au sens du 1° de l’article L.581-3 du code de l’environnement,

Les enseignes,

Les pré-enseignes, y compris celles visées par les deuxièmes et troisièmes alinéas de l’article L.581-19 du code de l’environnement ».

Quels sont les supports taxés ?

Il y a trois types de supports taxés :

## Les enseignes

: Constitue une enseigne toute inscription, forme ou image apposée sur un immeuble et relative à une activité qui s’y exerce (Article L.581-3 2° du code de l’environnement).

## Les pré-enseignes

: Constitue une pré-enseigne, toute inscription, forme ou image indiquant la proximité où s’exerce une activité déterminée (Article L.581-3 3° du code de l’environnement).

## Les dispositifs publicitaires

: Constitue une publicité, toute inscription destinée à informer ou attirer le public.

Quelles sont les exonérations ?

Pour plus de renseignement, contactez la Ville de Colombelles au 02 31 35 25 00

Quelle est la procédure TLPE ?

La création ou la suppression d’un support publicitaire fait l’objet d’une déclaration, au moyen d’un formulaire

. Cette déclaration doit être déposée à la Mairie de Colombelles, dans les deux mois suivant la création ou la suppression du support.

Cette déclaration doit mentionner les superficies et dates de création de tous les supports publicitaires exploités, y compris ceux qui bénéficient d’une exonération (partielle ou totale).

## https://entreprendre.service-public.fr/vosdroits/R49305

## Déclaration des supports publicitaires pour la TLPE

La taxe est due sur les supports publicitaires existants au 1er janvier de l’année d’imposition. La taxe doit être réglée par l’exploitant du support ou par le propriétaire ou, à défaut, par celui dans l’intérêt duquel le support a été réalisé.

Lorsque le support est créé après le 1er janvier, la taxe est due à compter du premier jour du mois suivant celui de la création du support. Le calcul de la taxe se fait au protata temporis. Lorsque le support est supprimé en cours d’année, la taxe n’est pas due pour les mois restant à courir à compter de la suppression du support.

Règlement local de publicité (RLP)

Le règlement local de publicité, le cas échéant intercommunal, permet aux collectivités territoriales d’adapter la réglementation nationale en matière de publicité extérieure aux enjeux locaux et à la réalité des territoires. Il s’agit ainsi de trouver un équilibre entre des objectifs de préservation des paysages et du cadre de vie et des objectifs de développement économique des territoires.

Actuellement, l’existence d’un règlement local de publicité sur le territoire communal ou intercommunal détermine l’autorité compétente en matière de police de la publicité :

seuls les préfets de département sont compétents lorsque la commune n’est pas couverte par un RLP (exception pour les autorisations concernant les bâches et dispositifs publicitaires de dimensions exceptionnelles liés à des manifestations temporaires dont la compétence appartient au maire) ;

lorsque la commune est couverte par un RLP, cette compétence est dévolue aux maires au nom de la commune.

A compter du 1 er janvier 2024, les maires seront compétents pour assurer la police de la publicité sur leur territoire que leur commune soit ou non couverte par un RLP.

https://caenlamer.fr/reglement-local-publicite-intercommunal

## La demande d’autorisation

Vous devez demander l’autorisation d’installation d’une publicité, d’une enseigne ou d’une pré enseigne au moins 2 mois avant le début des travaux.

Retrouvez la déclaration des supports publicitaires pour la TLPE

Ce document, ainsi que les pièces constitutives du dossier doivent être déposés en Mairie.

L’éclairage nocturne : quelle réglementation ?

Eclairage nocturne :

https://entreprendre.service-public.fr/vosdroits/F24396`,
    order: 705,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d034",
    theme: "emploi",
    slug: "autorisation-de-travaux-erp",
    title: "Autorisation de travaux (ERP)",
    section: "demarches",
    subsection: "Demandes légales",
    summary:
      "Qu’est-ce qu’un établissement recevant du public (ERP) ?",
    content: `Qu’est-ce qu’un établissement recevant du public (ERP) ?

Les établissements recevant du public (ERP) sont des bâtiments, locaux et enceintes dans lesquels des personnes extérieures sont admises. Par exemple, une école, un commerce, un parc d’attraction sont des ERP.

L’accès est payant ou gratuit, libre, restreint ou sur invitation.

À noter :

une entreprise non ouverte au public, mais seulement au personnel, n’est pas un ERP.

Pour l’application du règlement de sécurité incendie, les ERP sont classés par catégorie et par type.

## Le classement proposé par le maître d’ouvrage

: Personne publique ou privée pour le compte de laquelle des travaux ou un ouvrage immobilier sont réalisés est validé par la commission départementale de sécurité.

## Les ERP sont classés en

## 5 catégories en fonction de leur capacité d’accueil

. Les salariés sont comptés avec le public admis dans l’établissement sauf pour la 5 e catégorie.

Pour plus de renseignements :

Qu’est-ce qu’un établissement recevant du public (ERP) ?

Vos démarches en amont de l’ouverture de votre établissement :

La création, l’aménagement ou la modification d’un établissement recevant du public (ERP) sont soumis à autorisation.

L’exploitant d’un ERP doit demander une autorisation avant l’ouverture de l’établissement

. De même, si l’établissement a été fermé plus de 10 mois , il doit demander une autorisation avant sa réouverture

.

Il en fait la demande plus d’un mois avant la date prévue de l’ouverture au public.

Il effectue cette démarche auprès de la mairie.

L’autorisation de construire, d’aménager ou de modifier un établissement recevant du public (ERP) doit être demandée pour les travau x suivants

:

Modification interne d’une surface ouverte au public.

Changement de commerce (épicerie remplacée par une boucherie, fleuriste par un autre fleuriste…) sans changement de destination

.

Il existe 5 types de destinations : exploitation agricole et forestière, habitation, commerce et activités de service, équipements d’intérêt collectif et services publics, autres activités des secteurs secondaire ou tertiaire. Il y a changement de destination lorsque l’on passe d’une catégorie à une autre, d es locaux et sans modification de l’aspect extérieur, sinon vous devez déposer une demande de permis de construire

.

Soyez donc vigilant à l’activité antérieure à la vôtre si vous reprenez un local !

Rénovation intérieure (déplacement de cloisons internes, création ou remplacement de faux plafonds, changement de revêtement, pose d’une rampe, …).

Travaux sur des installations techniques (électricité, désenfumage, alarme, …).

Travaux d’aménagement interne sans changement de destination des locaux effectués lors de l’implantation de nouvelles boutiques en remplacement de boutiques dans une galerie marchande.

Travaux d’aménagement interne sans changement de destination des locaux effectués lors de l’implantation d’un nouveau commerce dans un bâtiment existant.

## >> Le délai d’instruction de la demande est de

4 mois à compter du dépôt du dossier en mairie ou de la réception des pièces manquantes.

Pour vos démarches :

Demande d’autorisation de construire, d’aménager ou de modifier un établissement recevant du public (ERP) (Formulaire 13824*04)`,
    order: 706,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d035",
    theme: "emploi",
    slug: "cellule-emploi",
    title: "Cellule emploi",
    section: "demarches",
    subsection: "Emploi",
    summary:
      "Une conseillère en insertion professionnelle est à la disposition des Colombellois en recherche d’emploi, d’insertion ou de formation.",
    content: `Une conseillère en insertion professionnelle est à la disposition des Colombellois en recherche d’emploi, d’insertion ou de formation.

## Horaires d’été

La Cellule emploi de Colombelles sera fermée du 13 au 30 juillet inclus

En cas d’urgence, vous pouvez vous présenter au CCAS de Colombelles au 7 Rue Jules Guesde ou les contacter au 02 31 35 57 00

Réception du public du 3 au 20 aout dans LES LOCAUX du CCAS (Horaires et jours d’ouverture identiques)

Réouverture au public le 24 août au Quartier Jean Jaurès

C’est quoi la Cellule Emploi ?

Il s’agit d’un service municipal qui assure les missions suivantes :

Aide à la construction du projet professionnel ou de formation

Relais auprès des partenaires en fonction de la situation de la personne

Aide à la rédaction de CV et de lettres de motivation

## Préparation à l’entretien de recrutement

Mise en place d’ateliers adaptés aux problématiques rencontrées

Proposition d’offres d’emploi (CDD – CDI – Intérim) et mise en relation auprès des employeurs

Mise en œuvre et développement de partenariats avec les entreprises de l’agglomération pour faciliter le recrutement

Intégration sur le dispositif Territoire Zéro Chômeur de Longue durée

N’hésitez pas à la contacter !

Des permanences de structures partenaires sont disponibles sur rendez-vous :

Mission Locale : orientation pour les 16-25 ans la Mission Locale assurera ses permanences pour recevoir les jeunes au CCAS à compter du lundi 30 mars 202

6 sur les créneaux suivants :

le lundi après-midi avec Medhi BECHAOUCH de 13h30 à 17h00 le jeudi matin par Emmanuelle RETOUT de 8h30 à 12h30

Plans locaux pluriannuels pour l’insertion et l’emploi (PLIE) tous les mardis après-midis (sur rendez-vous) de 14h à 17h >> 07 77 90 19 12

Informations pratiques

Cellule Emploi

Place Mendès France (Quartier Jaurès)

## Lundi, mardi et jeudi de 9h à 12h30 et de 14h à 17h

02 31 83 13 59 cellule.emploi@colombelles.fr

CELLULE EMPLOI_Page 1_VF

2026 (2)`,
    order: 801,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d036",
    theme: "emploi",
    slug: "marches-publics",
    title: "Marchés publics",
    section: "demarches",
    subsection: "Emploi",
    summary:
      "Pour effectuer ses achats de fournitures, des services et travaux répondant à ses besoins, la Ville de Colombelles lance des appels d’offres dans un cadre réglementaire…",
    content: `Pour effectuer ses achats de fournitures, des services et travaux répondant à ses besoins, la Ville de Colombelles lance des appels d’offres dans un cadre réglementaire défini par le code des marchés publics.

Retrouvez les marchés publics de la Ville de Colombelles sous le lien suivant :

https://centraledesmarches.com`,
    order: 802,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-d037",
    theme: "culture",
    slug: "pret-de-materiel",
    title: "Demande de prêt de matériel",
    section: "demarches",
    subsection: "Salles et matériel",
    summary:
      "Demande de prêt de matériel",
    content: `Demande de prêt de matériel

Contact administratif

## : Marie LEHOUX  /

Contact logistique (pour retrait du matériel)

: Sybil LEFRERE

## Pour retirer le matériel

: Services techniques, Passage Léon Blum, Colombelles / 02 31 72 46 74 marie.lehoux@colombelles.fr / sybil.lefrere@colombelles.fr

La Ville propose du matériel à disposition des associations.

Toute demande doit être effectuée au moyen du formulaire ci-dessous et doit être adressée au service logistique, sous réserve de la disponibilité du matériel.

La demande doit être adressée au moins 15 jours avant la date de la manifestation.`,
    order: 902,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-107",
    theme: "culture",
    slug: "location-de-salles",
    title: "Location de salles",
    section: "demarches",
    subsection: "Salles et matériel",
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
    order: 901,
    status: "publie",
    updatedAt: "2026-08-30T10:00:00.000Z",
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

  {
    id: "p-v012",
    theme: "ecole",
    slug: "centre-de-loisirs-les-francas",
    title: "Centre de loisirs les Francas du Calvados",
    section: "vivre-a-colombelles",
    subsection: "Éducation",
    summary:
      "L'association délégataire des accueils périscolaires et extrascolaires de la commune.",
    content: `## Accueil périscolaire

Les accueils périscolaires (matin et soir) sont à destination des enfants scolarisés au sein du groupe scolaire Henri-Sellier. La gestion de cet accueil est déléguée par la Ville aux Francas du Calvados, association depuis le 1er septembre 2021. Pour les petits Colombellois du Libéra et du Plateau, ils sont rattachés à l’école de Mondeville

.

## Le matin

Les enfants sont accueillis directement dans les écoles dès 7h30 jusqu’au début de l’école  sur les sites Henri-Sellier maternelle, Henri-Sellier élémentaire et Victor-Hugo. Des activités sont proposées aux enfants pour leur permettre un réveil en douceur afin d’être prêt aux apprentissages de l’école.

## Le temps méridien

Les animateurs interviennent sur le temps méridien des Grandes Sections de la maternelle et des élémentaires (CP-CM2) du groupe scolaire Henri Sellier.

Henri-Sellier Maternelle : Pendant le temps de restauration deux animatrices interviennent (une avec les grandes sections et une avec les moyennes sections). Sur le temps d’activités après le repas les deux animatrices proposent des activités qu’au grandes sections.

Henri-Sellier Élémentaire (CP et CE1) : Deux animatrices interviennent auprès des enfants en leur proposant une activité manuelle, culturelle, sportive ou d’expression avant le repas et les accompagnent durant tout le repas.

Site Victor-Hugo (CE2, CM1 et CM2) : Six animateurs interviennent (5 animateurs + 1 référent).

## Le soir

Le soir, l’Accueil Cartable se déroule au sein des écoles sur le site Henri-Sellier jusqu’à 18h30. Les enfants du site Victor-Hugo seront récupérés par les animateurs à la sortie des classes et seront accompagnés jusqu’au site Henri-Sellier.

Des activités seront proposées aux enfants.

Inscription :

https://francascalvados.portail-familles.app

## Mercredi loisirs

Des sorties sont prévues et les activités sont proposées aux enfants en fonction de leurs souhaits, envies et besoins.

Les enfants sont accueillis au centre de 7h30 à 18h30.

En pratique :

L’inscription est à la journée ou demi-journée, avec ou sans repas.

Les inscriptions ou annulations sont à faire le mercredi précédent avant 18h

Inscription accueil périscolaire

:

https://francascalvados.portail-familles.app

Dossier d’inscription 2024-2025

La fiche sanitaire

(1 par enfant)

## Bulletin d’adhésion

La tarification 2024-2025 , dont la lecture est nécessaire.

Plaquette de présentation

## Accueil extrascolaire

## Pendant les vacances scolaires

Le centre de loisirs est ouvert de 7h30 à 18h30.

Un programme d’animations est prévu et adapté en fonction du souhait, des envies et des besoins des enfants.

Inscription extrascolaire

:

Inscription à la journée ou à la demi-journée, avec ou sans repas.

## Inscription à faire au secrétariat au plus tard 8 jours avant

Les imprimés ci-dessous sont à remplir en plus de ceux liés à l’activité choisie.

Ils sont à compléter sont à déposer directement auprès du Centre de Loisirs Les Francas, 52 avenue Léon Blum, ou à envoyer à : colombelles@francasnormandie.fr

La tarification 2024-2025 , dont la lecture est nécessaire.

Plus d’informations sur le site des Francas du Calvados

## Contact

Les Francas

## 52 avenue Léon Blum

## Du lundi au vendredi : 10h – 12h30 / 14h – 18h30

02 31 84 93 48 colombelles@francasnormandie.fr

Facebook`,
    order: 307,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  /* ---------- Sortir et découvrir ---------- */
  {
    id: "p-s001",
    theme: "patrimoine",
    slug: "historique-de-colombelles",
    title: "Historique de Colombelles",
    section: "sortir-et-decouvrir",
    subsection: "Patrimoine",
    summary:
      "Les origines de Colombelles",
    content: `## Les origines de Colombelles

Suite à des fouilles dans la ZAC Lazzaro, on sait que des hommes habitaient déjà là il y a 5000 ans avant notre ère. Mais le nom de Colombelles n’apparaît véritablement qu’au XIe siècle.

C’est de cette époque que date la construction de l’église Saint Martin, édifice de style roman classé monument historique et qui renferme une remarquable statue de son saint patron.

A l’époque, le village était localisé autour de l’église et du bac permettant de franchir l’Orne. Plus de trois cent cinquante habitants vivaient au XXème siècle à Colombelles, et seulement quatre vingt six en 1911. L’activité économique était essentiellement agricole et maritime grâce à la proximité de la rivière alors navigable.

Mais c’est la construction de l’usine métallurgique en 1913 qui va transformer radicalement le paysage de la commune.`,
    order: 101,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s002",
    theme: "patrimoine",
    slug: "societe-metallurgique-de-normandie",
    title: "La Société métallurgique de Normandie",
    section: "sortir-et-decouvrir",
    subsection: "Patrimoine",
    summary:
      "Suite à des fouilles dans la ZAC Lazzaro, on sait que des hommes habitaient déjà là il y a 5000 ans avant notre ère. Mais le nom de Colombelles n’apparaît véritablement…",
    content: `Suite à des fouilles dans la ZAC Lazzaro, on sait que des hommes habitaient déjà là il y a 5000 ans avant notre ère. Mais le nom de Colombelles n’apparaît véritablement qu’au XIe siècle.

C’est de cette époque que date la construction de l’église Saint Martin, édifice de style roman classé monument historique et qui renferme une remarquable statue de son saint patron.

A l’époque, le village était localisé autour de l’église et du bac permettant de franchir l’Orne. Plus de trois cent cinquante habitants vivaient au XXème siècle à Colombelles, et seulement quatre vingt six en 1911. L’activité économique était essentiellement agricole et maritime grâce à la proximité de la rivière alors navigable.

Mais c’est la construction de l’usine métallurgique en 1913 qui va transformer radicalement le paysage de la commune.

## Colombelles de 1912 à 1949

Alfred Thyssen, un industriel allemand recherche un emplacement pour installer une usine métallurgiste dévouée principalement à l’exportation.

La proximité du port maritime de Caen et celle d’importants gisements de matières premières (mine de fer de Soumont, carrière des Aucrais pour la castine) convainc le baron Thyssen de s’installer.

Mais le déclenchement de la première guerre mondiale n’est pas sans conséquence. L’allemand Thyssen mis à l’écart de l’affaire et l’usine produit du matériel militaire notamment des obus pendant ces années de guerre.

Le premier haut fourneau est allumé en 1917 par le ministre Albert Thomas et l’usine peut enfin produire de l’acier en grande quantité. Le besoin de main d’œuvre tant pour la construction de l’usine que pour son fonctionnement entraîne un afflux massif de population. Russes blancs fuyant la révolution, Polonais et Ukrainiens, Italiens et Espagnols mais aussi travailleurs coloniaux, Chinois, Nord-Africains et prisonniers de guerre Austro-Hongrois s’installent alors. Ce brassage de cultures va donner naissance au Colombelles d’aujourd’hui. La population croît rapidement : multipliée par dix en dix ans, elle atteint plus de 2 000 habitants en 1921 et atteint 3 452 en 1939.

L’habitat suit cette progression, on voit apparaître les cités ouvrières construites par la Société Métallurgique de Normandie (SMN) et notamment celle du Plateau à l’urbanisme si particulier et que se partagent les trois communes de Colombelles, Mondeville et Giberville. La direction de la SMN décide de construire une cité-jardin, selon les principes du paternalisme social. Salle de spectacle, écoles, clubs sportifs, infirmerie… qui permettent de vivre en quasi autarcie. Dans ces cités où les logements ouvriers suivent la hiérarchie occupée à l’usine, tout est contrôlé par le patron : école, coopérative, jardins ouvriers, activités sportives et culturelles, voire religieuses puisque l’usine fournit en 1926 terrains et matériaux à la communauté Russe pour la construction de l’église orthodoxe Saint Serge.

## Seconde guerre Mondiale

L’expansion de la commune considérablement ralentie par le second conflit mondial connaît un coup d’arrêt en juin 1944. Colombelles subit pendant huit jours bombardements aériens et tirs d’artillerie. La ville sera sinistrée à 80 %.

## Après 1945

Après la guerre, le retour de la population pose de sérieux problèmes puisque tout est à refaire. La reconstruction durera douze ans et verra se déplacer le centre-ville à son emplacement actuel. De nouveaux quartiers voient le jour comme la « Cité Suédoise » construite, grâce à un don de la Suède, dans l’ancien parc du château. Le nombre d’habitants, qui n’était plus que de deux mille vingt et un en 1946 retrouve son niveau d’avant guerre en 1957.

L’activité industrielle renaît avec la reconstruction de la SMN, une cimenterie et l’implantation de la SAVIEM (aujourd’hui Renault Trucks) à la place d’un ancien chantier naval. L’apogée de l’usine sidérurgique est atteinte dans les années 60-70.

La SMN de Colombelles draine de la main d’œuvre bien au-delà des limites de l’agglomération caennaise, tient une place essentielle dans l’économie locale et notamment pour le port de Caen car elle exporte 50 % de sa production. Son apogée a lieu au début des années 1970 avec une production de plus d’un million de tonnes d’acier dans l’année avec plus de 6000 employés. Mais la crise de l’acier dans le milieu des années 70 n’épargne pas la Normandie.

Elle s’adapte cependant au nouvel environnement économique mais la production baisse, l’emploi est en chute libre. Des réductions drastiques d’effectifs et d’investissements s’imposent sans amélioration. Unimétal, nouveau propriétaire de l’usine, annonce la fermeture en 1991. Et le 5 novembre 1993, le dernier haut fourneau est arrêté… La SMN s’éteint définitivement.

## Territoire en transition

Donner à voir, à faire, à vivre et à revivre est primordial pour la ville.

Son développement et son rebond s’articulent autour de projets résilients, solidaires, innovants qui, près de 30 ans après, sont toujours le leitmotiv de la dynamique territoriale.

Ces projets collectifs et participatifs font de Colombelles aujourd’hui une ville attractive et novatrice. La démarche entamée depuis plusieurs années marque les fondements d’une action sociale, environnementale et culturelle forte.

Les axes de développement :

Le renouvellement urbain de son centre-ville et la création de 2 quartiers nouveaux d’habitats : Jean-Jaurès, sur l’ancien site de la SMN et Le Libéra. Ils comportent des formes d’habitats souples adaptés aux réalités quotidiennes incluant des qualités environnementales. Le cadre de vie, le respect de la nature et de la biodiversité, la végétalisation, les circuits courts et l’optimisation du recyclage des déchets ont été inclus dans les projets.

Territoire d’expérimentation et d’innovation sociale avec, depuis 2016, l’expérimentation Territoire Zéro Chômeur de longue durée et la municipalisation de la cellule Emploi, service dédié aux Colombellois en recherche d’emploi.

## Territoire culturel et ouvert sur le monde

: la réhabilitation du patrimoine industriel (la Grande Halle et le Réfrigérant) et aussi l’ouverture de la Médiathèque Le Phénix en 2001 et du musée numérique et Mini Lab de la Micro-Folie en 2019.

La Communauté urbaine Caen la mer a également engagé une phase de reconquête et de requalification sur le site de la SMN.

En 1997, la ZAC du Plateau est créée et la concession d’aménagement est attribuée à Normandie Aménagement. Deux pôles d’activité sont alors créés : Normandial et EffiScience. À ces espaces s’ajoutent 3 zones d’activités, deux composées de plus de 450 entreprises et une encore en cours de commercialisation. De par la diversité de ses secteurs d’emplois et de ses niveaux de compétences et de spécialisation, Colombelles est aujourd’hui une ville très active et attractive, tant en termes d’emploi qu’en termes de projets d’implantations d’entreprises

.

## Livret jeu ludique pour découvrir le passé ouvrier de la SMN

Plongez dans l’histoire à l’époque où la Société métallurgique de Normandie (SMN) animait la région. Vous découvrirez comment la SMN a marqué le territoire, laissant encore aujourd’hui des traces de son riche passé. L’Office de tourisme de

Caen la mer a lancé un mini-livret touristique , pédagogique et illustré par Chris Lécuyer, graphiste, illustrateur et bédéiste et grâce à la contribution de l’association

SMN :

Mémoire et Patrimoine SMN

.`,
    order: 102,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s003",
    theme: "patrimoine",
    slug: "la-tour-de-colombelles",
    title: "La Tour de Colombelles",
    section: "sortir-et-decouvrir",
    subsection: "Patrimoine",
    summary:
      "La Tour de Colombelles",
    content: `## La Tour de Colombelles

La Tour de Colombelles constitue un vestige de l’ancien mur d’enceinte du château de Colombelles. Elle porte une inscription en partie effacée : 1665. L’architecture du bâtiment et cette appartenance probable au XVIIe siècle évoquent plus une destination ornementale que défensive.

Fortement remaniée au cours des siècles, on peut supposer qu’elle servait de logement de gardien pour le château, un édifice de style Empire incendié pendant les combats de juillet 1944. Il avait lui-même succédé à un château plus ancien dont il ne reste rien si ce n’est une mention sur le plan Colbert de 1681.

La Tour de Colombelles – Place Aristide Briand – 14460 Colombelles –

Les Amis de la Tour
- 02 31 72 19 03`,
    order: 103,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s004",
    theme: "patrimoine",
    slug: "les-eglises",
    title: "Des églises",
    section: "sortir-et-decouvrir",
    subsection: "Patrimoine",
    summary:
      "L’église Saint-Martin de Colombelles",
    content: `## L’église Saint-Martin de Colombelles

L’existence du village de Colombelles est liée à la présence de l’Orne : un bac situé non loin de l’église permettait de franchir la rivière à cet endroit. Une église a pu exister depuis le haut Moyen- Âge : la dédicace à Saint-Martin est souvent un indice de très grande ancienneté. L’édifice actuel date, pour ses parties les plus anciennes, du XIIe siècle, à la fin de l’époque romane. L’église appartenait alors à l’abbaye du Plessis-Grimoult.

C’est une église simple, mais au décor très soigné. Elle comporte une nef simple à charpente apparente, suivie d’une tour qui abrite une travée sous clocher voûtée, puis un chœur à chevet plat, voûté également. À l’Ouest se trouve la façade principale avec le grand portail ; sur le côté nord, une porte secondaire soigneusement ornée ouvrait autrefois dans la nef. Des églises du même type se rencontrent dans la plaine de Caen, à Notre-Dame des Prés de Mondeville, à Cintheaux…

Église Saint Martin de Colombelles – Rue de l’église – 14460 Colombelles –

Les Amis de la Tour
- 02 31 72 19 03

## L’église orthodoxe Saint-Serge de Colombelles

Au cours des années 1920, une communauté orthodoxe s’est constituée à Colombelles et dans les environs de Caen. La plupart de ces personnes, d’origines diverses, étaient venues dans la région, attirées par les possibilités d’embauche offertes par la Société Métallurgique de Normandie.

Parmi eux, de nombreux Russes fuient la révolution. Très rapidement naquit chez eux l’idée d’ériger un lieu de culte permettant aux fidèles de pratiquer leur religion. La construction commença vers le milieu des années 20 avec l’aide et l’appui de la SMN qui mit à disposition terrain et matériaux, les travaux étant effectués par la communauté, chacun apportant ce qu’il pouvait de son savoir-faire ou de son temps libre.

En novembre 1926, l’église fut consacrée par Monseigneur Euloge Métropolite des Één.

En juin 1944 au cours d’un des bombardements qui anéantirent l’usine toute proche, l’église fut atteinte par une bombe et détruite, faisant disparaître fresques murales, objets liturgiques et précieuses icônes.

La communauté, un moment dispersée par la guerre, se reconstitua progressivement et entreprit de reconstruire son sanctuaire, toujours avec l’appui de la SMN. C’est ainsi que l’église sera de nouveau consacrée le 8 juin 1947 par l’archevêque Vladimir.

Elle a été inscrite à l’inventaire supplémentaire des monuments historiques le 23 juin 1992. Cette mesure a permis à l’association Saint Serge qui gère l’édifice d’obtenir des financements pour une première tranche de travaux ; une seconde est en cours d’étude, elle vise à restaurer le bulbe et à y réinstaller la croix qui s’y trouvait encore il y a quelques années.

Des offices y sont célébrés régulièrement à l’intention de la communauté orthodoxe du grand Ouest et le sanctuaire est généralement ouvert à l’occasion des Journées du Patrimoine chaque troisième week-end de septembre.

Pour tout renseignement, vous pouvez vous adresser à l’association Saint-Serge

Église Saint-Serge – Rue Raspail – 14460 Colombelles –

02 31 78 38 02`,
    order: 104,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s005",
    theme: "patrimoine",
    slug: "l-ecole-ancien-chateau",
    title: "L'école, ancien château",
    section: "sortir-et-decouvrir",
    subsection: "Patrimoine",
    summary:
      "Page à rédiger : le bâtiment scolaire installé dans l'ancien château.",
    content: `Cette page reste à rédiger.

Elle est également vide sur le site municipal : plutôt que de publier une coquille ou d'inventer une histoire, elle est conservée en brouillon jusqu'à ce que le service communication en fournisse le texte.

En attendant, l'histoire du bourg est retracée dans [Historique de Colombelles](/sortir-et-decouvrir/historique-de-colombelles).`,
    order: 105,
    status: "brouillon",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s006",
    theme: "culture",
    slug: "mediatheque-le-phenix",
    title: "Médiathèque Le Phénix",
    section: "sortir-et-decouvrir",
    subsection: "Équipements culturels",
    summary:
      "La Médiathèque",
    content: `## La Médiathèque

Le Phénix est un espace convivial, gratuit et accessible à tous.

Vous y trouverez plus de 33 000 documents (romans, BD, magazines, musique…) en libre accès et empruntables avec votre carte du réseau des bibliothèques de Caen la mer (jusqu’à 30 documents pour une durée de 28 jours).

L’inscription est gratuite sur présentation d’une pièce d’identité.

ACTUALITÉS

L’agenda d’été 2026

## L’équipe

Une équipe de 7 personnes est à votre disposition pour vous accueillir.

Horaires de la Médiathèque (de septembre à juin)

Mardi : 9h-12h et 16h-18h

Mercredi : 10h-18h

Jeudi : 9h-12h

Vendredi : 9h-12h et 16h-18h

Samedi : 10h-12h et 14h-18h

## Dimanche (de novembre à mars) : 14h-18h

Horaires d’été ( du 1er juillet au 31 août)

Mardi 9h-12h / 16h-18h

Mercredi 10h-12h / 14h-18h

Vendredi 9h-12h / 16h-18h

Samedi 10h-12h / 14h-18

## Fermetures exceptionnelles été 2026

Mardi 14 juillet du 28 juillet au 1er août du mercredi 12 aout après-midi au jeudi 13 aout inclus

Samedi 15 août

## Les espaces

Dans la médiathèque, vous trouverez un café presse, un espace d’exposition, des espaces par public (jeunesse, adulte), un espace jeux vidéo, une terrasse et une salle de spectacle pouvant accueillir 50 personnes.

## Le café participatif

Au Phénix, il est possible de boire un café, un thé ou un chocolat chaud en lisant une revue ou en papotant avec un autre lecteur.

L’équipe prépare chaque matin ces boissons.

Pour plus de convivialité, vous pouvez apporter ce que vous aimez à partager (boissons, friandises, gâteaux, etc).

## L’espace jeux vidéo

Notre espace jeux vidéo vous accueille pour des moments entre amis ou en famille.
- Sur présentation de votre carte de bibliothèque.
- Ouvert en accès libre (sauf en cas d’animations).

L’espace

« Lire autrement »

À la médiathèque, nous nous efforçons de proposer des lectures qui conviennent à tous les lecteurs et lectrices.

Notre espace « Lire autrement » propose :

des livres CD, des livres lus, des livres en braille, des romans en gros caractères, des livres adaptés aux troubles dys, des livres en Français Langue Étrangère (FLE), un espace « Facile à lire ».

Vous pouvez aussi utiliser le poste d’écoute mis à votre disposition.

## Bib à Dom

La médiathèque propose un service de portage de livres à domicile

Si vous êtes dans l’impossibilité, même temporaire, de vous déplacer jusqu’à la médiathèque pour emprunter des documents, ce service est pour vous !

Contactez l’équipe de la médiathèque pour faire part de vos envies et nous vous apporterons livres, revues et CD.

## La Boîte Numérique

Grâce à votre inscription à la médiathèque, vous pouvez accéder à d’importantes ressources en ligne pour les enfants (jeux, aide aux devoirs, films et lectures), mais aussi pour vous former, faire du sport en intérieur, lire (livres numériques, livres audio) ou encore regarder des concerts… Vous trouverez également la presse régionale et des magazines nationaux !

Ce service de contenus en ligne est accessible 24h sur 24, sur ordinateurs, tablettes ou smartphones.

Ce service est financé par le Département du Calvados, la communauté urbaine Caen la Mer et les communes et EPCI partenaires de la Bibliothèque du Calvados, dont Colombelles.

Biblio-retours

## Dans le cadre de son projet de

## Lecture publique sur le territoire , la communauté urbaine

Caen la mer lance un service innovant baptisé

Biblio-Retours

.

Ce nouveau dispositif permet désormais aux usagers de rendre leurs documents dans l’une des 34 bibliothèques partenaires du réseau intercommunal, quelle que soit la bibliothèque d’origine du prêt. Les documents sont ensuite triés à la bibliothèque Alexis de Tocqueville , puis réacheminés par navette vers leur établissement d’origine.

Objectif :

simplifier le quotidien des lecteurs en rendant les services de la médiathèque toujours plus accessibles et fluides.

Biblio-Retours vient compléter les services déjà en place, tels que :

## le

## portail commun des bibliothèques, les ressources numériques

(livres, presse, formations, VOD…), ou encore la carte unique , valable sur l’ensemble du territoire.

Avec Biblio-Retours, vos livres voyagent pour vous, et la lecture devient plus libre que jamais !

Informations pratiques

Médiathèque le Phénix

## 10, rue Elsa Triolet, Colombelles

02 31 72 27 46 mediatheque@colombelles.fr

Facebook

Bus 6 ou bus 9 arrêt Colombelles mairie`,
    order: 201,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s007",
    theme: "culture",
    slug: "theatre-la-renaissance",
    title: "Théâtre La Renaissance",
    section: "sortir-et-decouvrir",
    subsection: "Équipements culturels",
    summary:
      "Théâtre, musique, danse, arts du cirque et de la rue… Chaque saison, La Renaissance propose une programmation pluridisciplinaire en direction du tout public, du jeune public…",
    content: `Théâtre, musique, danse, arts du cirque et de la rue… Chaque saison, La Renaissance propose une programmation pluridisciplinaire en direction du tout public, du jeune public et des scolaires.

## Deux temps forts viennent ponctuer la saison : le festival

À partir du réel , qui met à l’honneur les écritures du réel et

Plateaux Éphémères , un weekend dédié aux spectacles de rue proposé gratuitement sur la place des Tilleuls.

En plus de la programmation de spectacles, La Renaissance accueille des résidences d’artistes et propose des actions de sensibilisation et de médiation culturelle.

## Programme 2025-2026

Le fonctionnement de La Renaissance est associatif, avec plus de cent trente adhérent·e·s.

Situé sur le Plateau, un des quartiers de Colombelles à cheval avec Mondeville, vous trouverez forcément votre bonheur !

En pratique :

## Tarifs des spectacles : de 8 à 16 € / Adhésion : 10 €

Responsables : Katell BIDON, directrice / Gérard JARDIN, président

CONTACT

Théâtre La Renaissance

Rue de l’hôtellerie, 14120 Mondeville

02 31 35 65 94

Plus d’informations

Facebook

Plateaux_Éphémères©VirginieMeigné-31

Lac_des_cygnes©albanne photographe

Alexis_Le_Rossignol©Kobayashi

Odeur_de_la_Terre©DR

Selene_Saint_Aimé©Nicolas_Derne

Ca_me_fait_penser©DR

Déformation_professionelle©DR

La_Veillée©Nicolas_Joubard

Sempé©D.Daguier

A_la_ligne©ArnaudBertereau

## Plateaux_Éphémères©VirginieMeigné-118

Action culturelle avec l'IME (1) (Personnalisé)

Action culturelle avec l'IME`,
    order: 202,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s008",
    theme: "culture",
    slug: "conservatoire",
    title: "Conservatoire de musique et de danse",
    section: "sortir-et-decouvrir",
    subsection: "Équipements culturels",
    summary:
      "Le conservatoire de musique et de danse du SIVOM des Trois Vallées (Colombelles, Cuverville, Cormelles Le Royal, Giberville, Mondeville) propose un enseignement artistique…",
    content: `Le conservatoire de musique et de danse du SIVOM des Trois Vallées (Colombelles, Cuverville, Cormelles Le Royal, Giberville, Mondeville) propose un enseignement artistique varié et de qualité.

Danse (classique, contemporaine, jazz) – éveil artistique – cours d’instruments – chant – chant choral – orchestres divers – musique assistée par ordinateur – parcours découverte en musique et en danse.

Près de 30 disciplines sont enseignées par 26 professeurs qualifiés. Le conservatoire accueille des élèves de la petite section de maternelle aux adultes. Chacun peut trouver son parcours.

De nombreuses manifestations sont également organisées.

Retrouvez toutes les informations et actualités sur le site http://www.sivomdes3vallees.fr

Vous pouvez également nous suivre sur la page Facebook http://facebook.com/conservatoire3vallees`,
    order: 203,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s009",
    theme: "culture",
    slug: "micro-folie",
    title: "Micro-Folie et Espace public numérique",
    section: "sortir-et-decouvrir",
    subsection: "Équipements culturels",
    summary:
      "Micro-Folie x EPN à l’Espace Wilkin",
    content: `## Micro-Folie x EPN à l’Espace Wilkin

Un lieu pour découvrir, créer et pratiquer le numérique

## Depuis septembre 2026, la

Micro-Folie de Colombelles et l’Espace Public Numérique (EPN)

sont réunis à l’

Espace Wilkin , au cœur de Colombelles.

Dans des locaux plus spacieux et mieux adaptés, petits et grands peuvent venir découvrir des œuvres, expérimenter de nouveaux outils, créer, apprendre et développer leurs usages du numérique.

La Micro-Folie est un dispositif culturel de proximité porté par le ministère de la Culture et coordonné par La Villette. Elle permet d’accéder de manière ludique et interactive aux œuvres de nombreuses institutions culturelles françaises et internationales. Le réseau compte désormais plus de 650 Micro-Folies ouvertes et la Normandie est la région qui en accueille le plus.

## Le Musée numérique

Voyagez à travers l’art, le patrimoine, la musique, la danse, l’architecture ou encore les sciences grâce au

Musée Numérique

.

Projetées sur grand écran et accompagnées de tablettes interactives, plusieurs milliers d’œuvres issues de musées et d’institutions culturelles peuvent être explorées librement ou à travers des visites thématiques proposées par l’équipe de la Micro-Folie.

Une manière différente et accessible à tous de découvrir l’art et la culture, seul, en famille ou en groupe.

L’Espace Public Numérique (EPN)

Besoin d’un coup de pouce avec le numérique ou envie d’en découvrir davantage ?

L’

Espace Public Numérique (EPN)

est ouvert à tous et permet de découvrir, comprendre et pratiquer le numérique à son rythme.

Accompagné par un animateur, chacun peut développer ses compétences, utiliser les outils informatiques, être aidé dans ses usages numériques ou explorer de nouvelles pratiques : internet, photo, vidéo, tablettes, création numérique, impression 3D…

L’objectif : permettre à chacun de gagner en autonomie et de faire du numérique un outil utile, créatif et accessible.

## Le Fab Lab

Ici, on passe de la découverte à la création !

## Le

Fab-Lab permet de s’initier à différentes techniques de fabrication et de création numérique : impression 3D, gravure et découpe laser, flocage textile, sublimation, création graphique, badgeuse…

Des ateliers sont régulièrement proposés pour découvrir les machines, expérimenter de nouvelles pratiques et donner vie à ses propres projets.

Les rendez-vous réguliers

## Le Labo des Inventeurs

Un rendez-vous dédié aux jeunes pour découvrir le numérique comme un véritable outil de création.

Codage, jeux, objets interactifs ou fabrication numérique : chaque séance permet d’expérimenter, d’imaginer et de réaliser des projets concrets en lien avec le Fab-Lab.

Mercredi de 15h à 18h

## Les ateliers particuliers

Des temps d’accompagnement pour découvrir un outil, développer ses compétences ou avancer sur un projet numérique.

Mardi de 10h à 12h

Vous êtes un groupe ?

Écoles, accueils de loisirs, associations, structures sociales, EHPAD ou autres groupes peuvent bénéficier de visites et ateliers adaptés

.

L’équipe peut construire des séances autour du Musée Numérique et proposer des activités en lien avec le Fab-Lab et les outils numériques.

D’autres créneaux peuvent être proposés selon les projets et disponibilités.

Pour réserver un créneau de groupe c’est ici !

Une équipe de 4 personnes est à votre disposition pour vous accueillir.

INFORMATIONS PRATIQUES

📍

## Espace Wilkin

2 rue des Frères Wilkins, 14460 Colombelles

📞

02 52 56 96 82

✉️ microfolie@colombelles.fr

MICRO-FOLIE

Mercredi & samedi

10h–12h30 • 14h–18h

Jeudi & vendredi

14h–18h

Jeudi & vendredi matin

ESPACE PUBLIC NUMÉRIQUE

Accès libre

Mar. 14h–18h • Jeu. 14h–18h

Ven. 14h–16h • Sam. 10h–12h

Sur rendez-vous

Mer. 10h–12h

Ateliers particuliers

Mar. 10h–12h

Labo des Inventeurs

Mer. 15h–18h

## Jeudi & vendredi matin

Horaires susceptibles d’être adaptés lors d’événements ou d’animations programmés.

🚌 Bus Twisto – lignes 6 ou 9 • Arrêt Colombelles Mairie

Facebook
- Instagram

## Réservation en ligne

Entrée libre et gratuite selon les activités.

Certaines animations et certains ateliers sont proposés sur réservation et dans la limite des places disponibles.

Retrouvez également toute la programmation de la Micro-Folie dans l’agenda culturel de la Ville.

Billetterie Weezevent`,
    order: 204,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s010",
    theme: "nature",
    slug: "cote-vert",
    title: "Côté vert",
    section: "sortir-et-decouvrir",
    subsection: "Nature",
    summary:
      "Colombelles possède de nombreux espaces verts pour se balader, flâner et profiter de la nature et est labellisée",
    content: `Colombelles possède de nombreux espaces verts pour se balader, flâner et profiter de la nature et est labellisée

## Territoire Engagé pour la nature

Ce programme vise à faire émerger, reconnaître et valoriser des plans d’actions en faveur de la biodiversité. Il s’adresse aux communes et intercommunalités quelle que soit leur taille, qu’elles soient débutantes ou initiées en matière de biodiversité.

Quelques chiffres :

8 hectares de bois accessibles et au total 20 hectares de taillis et de boisement

2 espaces verts partagés – 3 vergers

2 jardins familiaux

## Le jardin partagé

Place François-Mitterrand, un jardin avec des bacs cultivables et un bac collectif permet à ceux qui le souhaite de disposer d’un espace pour jardiner, planter, récolter. Tous les mois, des rendez-vous et des animations sont ouvertes à tous et aux jardiniers pour entretenir et avoir des conseils.

## Des vergers et des fruitiers en accès  libre

Des associations et des particuliers ont recensé les arbres fruitiers pour que chacun, à sa guise, mais dans le respect de la nature et des saison, puisse profiter de la production de fruits sur l’espace public : figuier, framboisiers, noisetiers… Retrouvez les arbres fruitiers sur la carte en bas de page.

Des vergers sont accessibles :

à l’entrée du bois, au niveau de la rue de la République : pommiers et poiriers au niveau de l’espace Auguste Michelle, en entrée de ville, avec des pommiers à cidre rue Jules Guesde devant l’école : pommiers

## Le Bois

Réaménagé en 2017, le Bois est un réel lieu de promenade : des cheminements avec des clairières, des aires de pique-nique, un théâtre de verdure, un verger de pommes et poires…

Situé entre l’Orne et le centre-ville, le Bois s’étale sur 8 ha. Il permet ainsi de faire une liaison entre le centre ville et le bas de Colombelles. La gestion du site est effectuée par un garde nature chargé de surveiller et entretenir les lieux.

En accès libre dans le bois :

une tyrolienne, une course d’orientation en accès libre, un verger, un théâtre de verdure, des tables de pique-nique.

## Les rives de l’Orne

En bas du bois, à la lisière des jardins familiaux rue de la République, un accès direct au chemin de randonnées est possible.

## L’allée cavalière

Surplombant l’Orne et le canal, l’allée cavalière donne à voir sur l’agglomération et les communes alentours. Sur un parcours piétons et cyclistes, cet espace naturel permet de relier le quartier Jean-Jaurès au quartier du Plateau en toute sécurité en longeant le parc des Métallos, la ferme solaire avec en ligne d’horizon le Réfrigérant, la Grande Halle et aussi le pont de Calix, les abbayes caennaises…

## Le parc des Métallos

Créé et ouvert en 2022, le parc des Métallos, c’est  :

11 700 m² de nature en ville plus 46 000 m3 de terres extraites lors des travaux de construction du quartier Jean-Jaurès et de la zone de développement économique EffiScience/Normandial,

150 arbres, 3 000 arbustes et 8 000 couvre-sols.

La paysagiste Liliana Motta a créé un belvédère de plus de 7 mètres de haut. Cette organisation avec des points hauts vise à créer plusieurs terrasses permettant de profiter des points de vue surplom bant soit le Plateau de l’ex-SMN, soit l’horizon de l’Orne, avec la ville d’Hérouville Saint-Clair en fond paysager.

Une dizaine de bancs ainsi que 2 tables de pique-nique ont été installés. Un parc à découvrir sur un lieu d’histoire locale comme son nom l’indique, mais surtout un espace à s’approprier pour passer de bons moments en famille et entre amis.

## Un parc sur un ancien site industriel

Les projets Parc des Métallos du quartier Jean-Jaurès et la plateforme de recyclage des terres du Plateau ont été primés en 2022 dans la catégorie « Ville de demain » au congrès des Entreprises publiques locales. Le parc est notamment le démonstrateur d’une réflexion globale de gestion des terres polluées menée à l’échelle de l’ex site de la SMN. Le matériau composant le parc des Métallos est issu des terres des projets du Plateau qui ont été elles-mêmes au préalable triées et identifiées sur la plateforme de tri de Normandie Aménagement.

En effet, le socle de ce parc s’organise en plusieurs couches bien distinctes et identifiées selon la qualité de la terre et sa teneur en pollution éventuelle liée aux activités de l’ex-site industriel :

les terres les plus touchées par la pollution sont localisées au cœur de l’ouvrage. Ces terres sont confinées par un tissu hermétique de manière à assurer une protection environnementale et sanitaire les autres couches couvrent ce noyau jusqu’à arriver en surface la dernière couche de terre végétale finalise la constitution du parc

Cette organisation a été conçue par le bureau d’études BURGEAP, bureau d’expertise en gestion de site et sol pollués. Ce projet a également été financé et suivi par l’ADEME (Agence de la transition écologique).

## Balades piétons et vélo

La voie verte cyclo pédestre de 4,3 km, à l’est de l’agglomération, sur l’emprise de l’ancienne voie de chemin de fer minier, entre Colombelles, Giberville et Mondeville

. Ce cheminement piétons et vélos est aménagé de tables de pique-nique  et de bancs.

Une liaison cyclable longue de 3,3 km, cette voie verte permet de relier le plateau de Colombelles à la presqu’île hérouvillaise. L’aménagement des différentes sections propose un nouveau franchissement cyclable sécurisé de l’Orne. À terme, ces tronçons seront en connexion avec les aménagements cyclables du futur quartier de la presqu’île hérouvillaise et du futur pont qui sera réalisé sur le canal de

Caen à la mer , d’ici 2025. Aussi, il sera possible de relier la vélo Francette et la voie verte du chemin de fer minier à vélo.

Vous pouvez aussi rejoindre Caen en passant par l’allée cavalière, les bords de l’orne ou encore le canal, ou allez jusqu’à la plage en longeant le canal jusqu’à Ouistreham.

Bonne balade, à vous !

Localisation des fruitiers

Plan du Bois de Colombelles`,
    order: 401,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s011",
    theme: "nature",
    slug: "cote-bleu",
    title: "Côté bleu",
    section: "sortir-et-decouvrir",
    subsection: "Nature",
    summary:
      "L’Orne et le canal",
    content: `## L’Orne et le canal

L’Orne longe le bas de Colombelles et rejoint la mer. Quelques mètres plus loin, c’est le canal (entre Caen et Ouistreham) qui s’écoule et permet de rejoindre la plage en vélo en moins d’1h ou le port de Caen en 30 minutes. Cormorans, poules d’eau, canards rythment la balade pour le plaisir des yeux et des sens en longeant l’eau.

Vous pouvez aussi contempler ces espaces naturels depuis la route de l’Orne qui a été fermée à la circulation. Exclusivement réservée aux piétons et cyclistes, elle offre un cadre de balade sécurisée au rythme des marées.

En longeant l’Orne ou le Canal, rejoindre Caen ou la mer en vélo est possible par des voies sécurisées.

Pour une balade avec une vue sur le canal (et sur la mer par temps dégagé), l’allée cavalière est également accessible depuis le quartier du Plateau ou le quartier Jean-Jaurès.

Vue depuis l'Orne | Crédit : François Monier - Septième Ciel Image

Vue depuis l'Orne | Crédit : François Monier - Septième Ciel Image`,
    order: 402,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s012",
    theme: "nature",
    slug: "bois-de-colombelles",
    title: "Le bois de Colombelles",
    section: "sortir-et-decouvrir",
    subsection: "Nature",
    summary:
      "Entrez dans le poumon vert de la ville !",
    content: `Entrez dans le poumon vert de la ville !

À quelques pas des quartiers et des habitations, changez de décor.

Sentiers ombragés, clairières, mares, verger, espaces de détente et biodiversité : le Bois de Colombelles est un véritable poumon vert à explorer au fil des saisons. Réaménagé en 2017, le Bois est un réel lieu de promenade : des cheminements avec des clairières, des aires de pique-nique, un théâtre de verdure, un verger de pommes et poires…

Situé entre l’Orne et le centre-ville, le Bois s’étale sur 8 ha. Il permet ainsi de faire une liaison entre le centre ville et le bas de Colombelles. La gestion du site est effectuée par un garde nature chargé de surveiller et entretenir les lieux.

Promenade en famille, pause au calme, activité sportive ou simple envie d’observer la nature… suivez les chemins et redécouvrez un espace naturel parfois méconnu, à deux pas de chez vous.

## Un bois en ville, une nature à préserver

Le Bois de Colombelles constitue l’un des principaux espaces de nature de la commune. Ici, les espaces boisés côtoient des milieux plus ouverts, des mares, des clairières ou encore deux vergers, offrant des habitats variés à la faune et à la flore.

Au fil des chemins, arbres, arbustes, plantes sauvages, oiseaux, insectes et petite faune composent un paysage qui évolue avec les saisons.

Au printemps, la végétation reprend ses droits. L’été offre l’ombre des arbres et la fraîcheur du sous-bois. À l’automne, feuillages, fruits et baies changent les couleurs du paysage. Même en hiver, le Bois continue de révéler ses particularités à qui prend le temps de l’observer.

Un même lieu, mais jamais tout à fait le même.

Explorez le Bois

Ouvrez l’œil !

Cette carte interactive vous permet de repérer les principaux points d’intérêt et de mieux connaître ce qui vous entoure lors de votre balade.

Bois de Colombelles

A connaître

Plantes et fruits comestibles

Mûres

A observer

Arbres et essences remarquables

Pommiers

A observer

Arbres et essences remarquables

Poiriers

A connaître

Plantes et fruits comestibles

Mirabelles

A observer

## Arbres et essences remarquables

Tilleuls à petites feuilles, tilia cordata

À regarder, pas à goûter !

Plantes toxiques ou impropres à la consommation

## Il

soigne les troubles veineux (surtout utilisé en Allemagne). Très efficace dans les traitements contre les varices et les hémorroïdes. Les extraits de plantes peuvent être ingérés ou appliqués sur les jambes variqueuses.

Non comestible.

Fortement déconseillé en cas de tension artérielle élevée. Il en est de même pour les femmes enceintes.

## à rencontrer

Grenouilles rousses et tritons palmés sont nichés sont dans les mares.

Les amphibiens qui y viennent s’y reproduiront au printemps.

Préserver un environnement sans poissons est essentiel pour le

Lissotriton helveticus

(triton palmé)

à rencontrer

## Libellules et demoiselles

Certaines espèces dépendent de ces zones aquatiques pour une partie de leur cycle de vie.

Au printemps, les libellules (ou demoiselles) s’y retrouvent pour se reproduire, avant de regagner des milieux terrestres (bois, haies, tas de bois ou de pierres) pour passer le reste de l’année.

## à observer

L'érable champêtre, acer campestre à observer

## Le Noisetier

En plus de ses noisettes, le noisetier soigne l'acné, les furoncles et le psoriasis !

## A observer

Le charme commun, carpinus bétulus à connaître

L'Ortie

:

Elle soigne l'eczéma, le psoriasis et l'urticaire. L’asthme et la rhinite. Excellente pour l'allaitement, la lactation et les 3 derniers mois avant l’accouchement. Elle permet aussi aux vitamines de nous rebooster. Contre le manque d’appétit. Les calculs de la vessie. La cellulite. La cystite. Les cheveux (chute et pellicules).

à rencontrer

## Les taupes

⚠️ La carte présente une sélection d’espèces observées dans le Bois et n’est pas exhaustive.

Ne cueillez ni ne consommez jamais une plante sur la seule base de cette carte : en cas de doute, abstenez-vous.

Que faire dans le Bois ?

## Se promener et prendre le temps

Pas besoin d’avoir un objectif ! Les 2,7kms de sentiers du Bois permettent simplement de marcher, prendre l’air, profiter de l’ombre des arbres ou s’accorder une pause dans un environnement naturel.

Regardez au pied des arbres, levez les yeux vers les branches, approchez-vous des mares sans déranger leurs habitants, écoutez les oiseaux…

La biodiversité ne se dévoile pas toujours au premier regard.

Ralentir suffit parfois à découvrir ce que l’on ne voyait plus.

## Tester le parcours d’orientation

Saviez vous que le Bois accueille également un parcours permanent d’orientation ?

Il est en accès libre dans le Bois de Colombelles. Entre amis ou en famille, tentez l’expérience : plaisir, partage et échange garantis !

Comment ça fonctionne ?

Une carte spéciale d’orientation, une boussole et c’est parti pour une activité sportive de plein air praticable par tous ! La course d’orientation est à la fois une activité physique et de réflexion.

Pour tenter l’expérience, veuillez télécharger la carte et le carton de contrôle.

Bouger en pleine nature

## Avec

2,7 km de chemins recensés , auxquels s’ajoutent de nombreux petits sentiers, le Bois offre un terrain de jeu idéal pour les amateurs de trail. Ombragé et naturellement frais en été, il se parcourt toute l’année. Et avec son dénivelé bien marqué , les cuisses sont aussi mises à contribution ! De quoi varier les parcours et les entraînements sans quitter Colombelles.

## Jouer et faire une pause

Le Bois n’est pas uniquement un espace à traverser.

Des espaces de jeux, bancs et mobiliers permettent de s’arrêter, de profiter du lieu et de partager un moment en famille.

REVOIR LE TEXTE

Connaissez-vous le théâtre de verdure ?

Une scène au milieu des arbres !

Niché dans la végétation, le théâtre de verdure est un amphithéâtre extérieur aménagé au cœur du Bois.

Quelques gradins, un espace ouvert et la nature pour décor : ce lieu méconnu offre une halte originale pendant la promenade et permet d’imaginer le Bois autrement.

Un petit coin à redécouvrir lors de votre prochaine balade.

## Des mares pleines de vie

En 2025, deux mares écologiques ont été crée au cœur du Bois de Colombelles. Ce projet s’inscrit dans une démarche globale de préservation et de valorisation des milieux naturels.

Véritables écosystèmes à part entière , ces mares constituent un habitat favorable pour de nombreuses espèces. Elles accueilleront notamment la grenouille rousse , espèce emblématique et essentielle des zones humides, ainsi qu’une grande diversité de plantes et d’animaux aquatiques.

Cette réalisation est le fruit d’un engagement collectif en faveur de l’environnement et s’inscrit pleinement dans le cadre du label

Territoire Engagé pour la Nature , porté par la collectivité.

Pourquoi ces mares sont-elles essentielles ?

Elles recréent des écosystèmes favorables à la faune et à la flore locales

Elles contribuent activement à la préservation de la biodiversité

Elles offrent aux habitants un espace naturel à découvrir, à comprendre et à protéger

À travers ce projet, la commune affirme sa volonté d’agir concrètement pour la protection des milieux naturels et la transmission de ces enjeux aux générations futures.

Observer, oui. Déranger, non !

Pour préserver ces milieux fragiles, restez sur les espaces accessibles et évitez de manipuler les animaux ou la végétation.

Les vergers et leurs arbres fruitiers

TEXTE A FAIRE

Le Bois sous l’œil de Bruno

## Garde nature chez

ATIPIC , Bruno veille plusieurs fois par semaine sur le Bois : il ramasse les déchets rencontrés et signale les équipements ou éléments défectueux afin qu’ils puissent être pris en charge.

Mais Bruno est surtout un passionné de nature. Il connaît les chemins du Bois, observe son évolution et continue, saison après saison, à s’émerveiller de ses changements de couleurs et de ses découvertes.

« Le Bois n’est jamais tout à fait le même. »

Des visites nature sont notamment proposées avec lui à l’occasion de certains événements organisés par la Ville, notamment lors de la Fête de la Nature courant mai.

## Un espace à découvrir… et à respecter

Le Bois appartient au cadre de vie de tous. Pour permettre à chacun d’en profiter et préserver les espèces qui y vivent, quelques gestes simples comptent :

✓

Observer la faune à distance

✓

Respecter la végétation

✓

Remporter ses déchets

## ✓

Respecter la tranquillité des autres promeneurs

## ✓

Utiliser les équipements dans le respect des lieux

✓

## Promenez son chien en laisse

Découvrir le Bois, c’est aussi apprendre à en prendre soin.

📍 Préparez votre balade

Le Bois de Colombelles

📍

Accès :

Rue de la République, rue de Suède, rue Jules Guesde

🚲

Accès vélo :

des arceaux sont installés près des entrées rue de la République mais aussi Jules Guesde, face au cimetière ou encore rue de Suède

🅿️

Stationnement :

Rue de la République, rue de Suède, rue Jules Guesde

🚌

Transports en commun :

Ligne 6a/6b arrêts « Colombelles école » , « kiruna » ou « cité sudédoise »

## Avec l’aide de celles et ceux qui connaissent le Bois

Merci à Anne-Christine d’ACF Nature pour son expertise et sa connaissance du Bois, qui ont permis d’identifier les plantes présentées sur cette carte, notamment les espèces comestibles et toxiques.

Merci également à Bruno d’ATIPIC , garde nature et fin connaisseur du Bois, pour son regard de terrain et sa contribution à la découverte de ses différents milieux.`,
    order: 403,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s013",
    theme: "nature",
    slug: "nature-et-balades",
    title: "Balades",
    section: "sortir-et-decouvrir",
    subsection: "Nature",
    summary:
      "Envie de prendre l’air, de se promener ?",
    content: `Envie de prendre l’air, de se promener ?

Colombelles est riche d’espaces verts, de chemins de randonnée et de chemins. Ci-dessous voici un plan simplifié, réalisé initialement pour les enfants, mais sur lequel vous retrouverez les différents espaces et propositions de balades.`,
    order: 404,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s014",
    theme: "famille",
    slug: "centre-leo-lagrange",
    title: "Centre Léo Lagrange",
    section: "sortir-et-decouvrir",
    subsection: "Lieux de vie",
    summary:
      "Affilié à la fédération Léo Lagrange, association d’éducation populaire reconnue d’utilité publique, le",
    content: `Affilié à la fédération Léo Lagrange, association d’éducation populaire reconnue d’utilité publique, le

CSCS Léo Lagrange a pour objectif de développer la vie associative, en prenant en compte les besoins des usagers et des habitants, en favorisant les échanges et les rencontres intergénérationnelles en proposant aux publics de tous âges des activités et des loisirs de qualité dans des domaines différents : activités socio culturelles ou sportives, loisirs pour la jeunesse, projets et ateliers avec le secteur Familles/Habitants, etc.

L’espace Familles et Habitants du centre social du CSCS Léo Lagrange est un lieu de proximité à vocation familiale et intergénérationnelle. Il s’adresse aux adultes et aux enfants accompagnés de leur parent ou de leur grand-parent.

Ils accueillent toute la population pour répondre au mieux aux envies et besoins de chacun et favorisent le développement des liens familiaux et sociaux.

Ce lieu d’animation propose des activités éducatives, culturelles, sportives et des services aux familles et aux habitants.

Un programme mensuel est proposé selon les propositions et les échanges avec les adhérents.

Programme hebdomadaires (hors vacances scolaires)

Adultes Parents/enfants

MARDI : 10h-11h30

Café parent / enfant
- de 3 ans à partir du 23/10 activités à thème ou en accès libre et sur inscription

MERCREDI : 11h -12h

Sport en famille

De 3 à 6 ans

JEUDI : 11h-12h

Baby-gym

## De 1 à 3 ans

Animations supplémentaires occasionnelles parent/enfant de 3 à 10 ans qui sont proposées dans le programme mensuel  le mercredi matin ou après-midi pendant et hors vacances scolaires

Activités manuelles et créatives : cuisine, couture, dessin, peinture, sortie etc.

PROGRAMME DES ACTIVITES DE SEPT. & OCT. 2026

## Adultes

MARDI  : 14h 16h Cours de Français (apprentissage de la langue française )

## VENDREDI : 9h30-12h Couture

L’instant : Moment de rencontre convivial et de discussion : lundi 14h -16h

Collectif cuisine : Ateliers à thème, actions de bénévolat, atelier de cuisine saine et responsable etc.

Collectif culture : Sortie culturelle, découverte du patrimoine, visite de musée

Cinéma 1 film proposé 1X/ mois à 1.50 € au Café des Images à Hérouville/ St Clair

PROGRAMME DES ACTIVITES DE JUILLET-AÔUT 2026

Comment participer ?

## Il faut adhérer à l’Espace Familles

(adhésion annuelle de 5 € (valable du 1 er septembre au 31 Août) par personne est obligatoire).

L’inscription aux différentes activités se fait auprès d’Anaïs à l’accueil et veuillez réserver 2 jours au plus tard.

Certaines activités demanderont une participation financière.

Retrouvez leurs actualités sur leur page FaceBook

## Projet DÉMOS

Une aventure musicale et humaine pour les 7-10 ans – Envie d’apprendre à jouer d’un instrument ? C’est possible et c’est gratuit

Démos (Dispositif d’Éducation Musicale et Orchestrale à vocation Sociale) est un projet permettant aux enfants de découvrir gratuitement pendant 3 ans la pratique d’un instrument de musique, de manière collective dans un orchestre. Démos est un projet conçu et piloté depuis 2010 par la Cité de la musique – Philharmonie de Paris. À Colombelles, le projet est porté conjointement par le centre social Léo Lagrange et les services de la Mairie.

L’expérience Démos dure 3 ans, les enfants s’engagent donc sur 3 années d’octobre à juin.

7 territoires de Caen la mer sont concernés par ce projet :  Chemin-Vert, Grâce-de-Dieu, Guérinière, Pierre-Heuzé, Hérouville, Ouistreham et Colombelles.

Sont ciblés prioritairement les enfants de 7 à 10 ans (l’idéal est de débuter l’expérience au niveau CE2) ne disposant pas d’un accès facile à la pratique et aux institutions musicales.

Il s’adresse à 15 enfants par territoire.

Ni solfège ni travail individuel, l’apprentissage de la musique se fait collectivement au sein d’un orchestre.

La famille d’instruments proposée sur Colombelles est celle des instruments à cordes (violon, alto et violoncelle).

L’enfant bénéficie gratuitement de 2 cours de musique par semaine d’1H30, hors temps scolaire et hors vacances scolaires : le lundi de 17h00 à 18h30 et le mercredi de 10h30 à 12h.

Les enfants peuvent être pris en charge dès la sortie de l’école par un animateur socio-culturel.

Une fois par mois, un danseur et un chef de chœur interviennent auprès des enfants dans le but de créer des passerelles avec d’autres disciplines artistiques.

Les enfants des 7 groupes de Caen la mer répètent une fois par mois en « tutti », en orchestre de 105 enfants.

Des concerts sont régulièrement organisés dont un grand rassemblement orchestral par an.

Flyer de présentation

Projet Démos – présentation nationale :

Démos – Philharmonie de Paris – Accueil Démos

## Informations pratiques

Centre socio-culturel et de loisirs Léo Lagrange

52 avenue Léon Blum, Colombelles

02 31 72 40 86 cscsleolagrange@gmail.com`,
    order: 501,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s015",
    theme: "famille",
    slug: "cafe-participatif",
    title: "Café participatif",
    section: "sortir-et-decouvrir",
    subsection: "Lieux de vie",
    summary:
      "À la médiathèque Le Phénix, il est possible de boire un café, un thé ou un chocolat chaud en lisant une revue ou en papotant avec un autre lecteur.",
    content: `À la médiathèque  Le Phénix, il est possible de boire un café, un thé ou un chocolat chaud en lisant une revue ou en papotant avec un autre lecteur.

L’équipe prépare chaque matin ces boissons.

Pour plus de convivialité, vous pouvez apporter ce que vous aimez à partager (boissons, friandises, gâteaux, etc).`,
    order: 502,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s016",
    theme: "famille",
    slug: "espace-jeux-video",
    title: "Espace jeux vidéo",
    section: "sortir-et-decouvrir",
    subsection: "Lieux de vie",
    summary:
      "La médiathèque le Phénix dispose d’un espace jeux vidéo pour partager des moments entre amis ou en famille.",
    content: `La médiathèque le Phénix dispose d’un espace jeux vidéo pour partager des moments entre amis ou en famille.

Accès :

sur présentation de votre carte de bibliothèque ouvert en accès libre (sauf en cas d’animations)`,
    order: 503,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s017",
    theme: "famille",
    slug: "mini-lab",
    title: "Mini-Lab",
    section: "sortir-et-decouvrir",
    subsection: "Lieux de vie",
    summary:
      "Le Mini Lab est un espace ludique et créatif qui permet de s’initier à la fabrication et à la création à l’aide d’outils numériques, mécaniques et innovants. Imprimante 3D,…",
    content: `Le Mini Lab est un espace ludique et créatif qui permet de s’initier à la fabrication et à la création à l’aide d’outils numériques, mécaniques et innovants. Imprimante 3D, brodeuse numérique, presse à chaud pour flocage textile, découpe vinyle, badgeuse et tablette graphique grande taille sont à votre disposition. Vous pouvez venir librement découvrir le Mini Lab sur nos horaires d’ouverture. Pour vos projets, n’hésitez pas à nous contacter en amont pour fixer ensemble un rendez-vous.

Informations pratiques

Micro-Folie Colombelles

## Rue des ateliers, la Grande Halle

Mercredi et samedi : 10h – 12h30 / 14h – 18h // Jeudi – vendredi – samedi : 14h – 18h

02 52 56 96 82 – 06 86 49 95 48 microfolie@colombelles.fr`,
    order: 504,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s018",
    theme: "famille",
    slug: "espace-public-numerique",
    title: "Espace public numérique",
    section: "sortir-et-decouvrir",
    subsection: "Lieux de vie",
    summary:
      "La médiathèque de Colombelles, au sein de son Espace Public Numérique, vous propose des ateliers gratuits et une permanence pour répondre à vos interrogations sur le…",
    content: `La médiathèque de Colombelles, au sein de son Espace Public Numérique, vous propose des ateliers gratuits et une permanence pour répondre à vos interrogations sur le numérique.

Les référents numériques proposent des conseils personnalisés, des ateliers d’initiation ou de perfectionnement aux outils numériques.

Ce service est gratuit.

Ateliers sur réservation auprès du référent numérique, epn@colombelles.fr ou au 02 31 72 27 46

Horaires d’été en juillet et août

Mardi : 16h-18h

Mercredi : 10h-12h et 14h-18h

Jeudi : 16h-18h

Vendredi : 16h-18h

Samedi : 10h-12h et 14h-18h

Informations pratiques

Espace Public Numérique

10, rue Elsa Triolet, Colombelles

02 31 72 27 46 epn@colombelles.fr

202406_Affiche Horaires été 2024`,
    order: 505,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s019",
    theme: "famille",
    slug: "lieu-d-accueil-enfants-parents-lv",
    title: "Lieu d'accueil enfants-parents",
    section: "sortir-et-decouvrir",
    subsection: "Lieux de vie",
    summary:
      "Le Lieu d’Accueil Enfants Parents « L’Esperluette » est un service municipal ouvert à tous les futurs parents et aux enfants de moins de 6 ans accompagnés de leur(s)…",
    content: `Le Lieu d’Accueil Enfants Parents « L’Esperluette » est un service municipal ouvert à tous les futurs parents et aux enfants de moins de 6 ans accompagnés de leur(s) parent(s).

Votre tout-petit profitera d’un espace de jeu adapté pour y rencontrer d’autres enfants. Vous pourrez faire une pause dans votre quotidien et discuter de vos préoccupations avec d’autres parents.

## Gratuit et sans inscription

Ouvert le lundi matin de 9h à 12h, pendant les périodes scolaires

Horaire d’arrivée et de départ libre

Présence de deux accueillants

CONTACT PÔLE PETITE ENFANCE

## 20 place F. Mitterrand

02 31 52 04 48 – 07 57 08 30 73 rpe@colombelles.fr`,
    order: 506,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s020",
    theme: "famille",
    slug: "local-jeune-lv",
    title: "Local jeune",
    section: "sortir-et-decouvrir",
    subsection: "Lieux de vie",
    summary:
      "La Ruche est le local jeunes des 11 – 17 ans à Colombelles. Un lieu de rencontres, de partage, d’activités et de projets pour les jeunes qui le souhaitent.",
    content: `La Ruche est le local jeunes des 11 – 17 ans à Colombelles. Un lieu de rencontres, de partage, d’activités et de projets pour les jeunes qui le souhaitent.

Mardi, jeudi et vendredi  : 16h-18h30 et jusqu’à 19h en période estivale

Mercredi et samedi  : 14h-18h30 et jusqu’à 19h en période estivale

Vacances scolaires  : 10h-12h / 14h-18h30 et jusqu’à 19h en période estivale

Des veillées sont proposées régulièrement de 18h30 à 22h : calendrier sur demande

## Pour les conditions d’inscription

Dossier à retirer au local jeunes ou demander à un animateur du local jeunes au secrétariat.

Pour que l’inscription soit définitive, le dossier doit être dûment rempli et une adhésion à l’année de 35€ est obligatoire (15€ d’adhésion à l’association des Francas et 10€ au local).

INFORMATIONS PRATIQUES

## Local jeune de Colombelle – La Ruche

52 avenue Léon Blum localjeune.colombelles@gmail.com`,
    order: 507,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
  {
    id: "p-s021",
    theme: "famille",
    slug: "jardins",
    title: "Jardins",
    section: "sortir-et-decouvrir",
    subsection: "Lieux de vie",
    summary:
      "Potageons partout",
    content: `## Potageons partout

Tous les premiers mercredis de chaque mois, rendez-vous place François-Mitterrand pour un temps de partage et de découverte autour du jardin. Des animations sur le thème de la biodiversité, de la pollinisation, des conseils de jardiniers pour vos semis sont au programme. Envie d’avoir votre propre bac pour planter vos tomates, fraisiers ou herbes aromatiques par exemple ? C’est possible.

## Information et demande : 07 57 09 66 30

Les jardins familiaux : cultiver la terre… et le lien social à Colombelles

Prendre le temps de jardiner, voir pousser ses légumes, partager des conseils entre voisins, profiter d’un moment au calme… Les jardins familiaux sont bien plus que de simples parcelles cultivées : ce sont de véritables lieux de vie, de rencontres et de bien-être.

À Colombelles, l’association des Jardins Familiaux, affiliée à la Fédération nationale des jardins familiaux et collectifs, permet aux habitants de bénéficier d’un espace dédié au jardinage, dans un cadre convivial et accessible à tous.

Situés rue de la République, les jardins familiaux de Colombelles se composent de 18 parcelles de 150 à 200 m². Chacun peut y cultiver fleurs, fruits, légumes ou aromates, à son rythme et selon ses envies.

Les jardins familiaux participent également à la biodiversité locale et à une alimentation plus saine. Cultiver ses propres légumes permet de redécouvrir le goût des produits frais, de saison et de proximité. Ces espaces verts deviennent aussi de petits refuges pour les insectes pollinisateurs et la faune urbaine.

Au-delà de l’aspect environnemental, les jardins sont souvent synonymes de partage : échange de graines, conseils de culture, entraide entre jardiniers… autant de moments simples qui renforcent le vivre-ensemble.

Comment obtenir une parcelle ?

Pour bénéficier d’un jardin, une caution de 100 € est demandée. Celle-ci est récupérable dans le respect du règlement intérieur. La location annuelle est fixée à 67 €, eau comprise.

Les personnes souhaitant s’inscrire sur liste d’attente peuvent contacter :

M. Legras

📞 06 67 54 45 94

📧

ph.legras@laposte.net

[

## Document de demande

## ] > formulaire également disponible à l’accueil de la mairie

Les jardins partagés du Libéra : des jardins où chacun s’investit

## Au cœur du quartier du Libéra, les

Jardins du Libéra sont un espace partagé où les habitants cultivent, entretiennent et font vivre le jardin collectivement. Potager, projets autour de la biodiversité, installation de ruches… le lieu a vocation à grandir avec les idées et l’implication de ses adhérents.

Débutants comme jardiniers confirmés sont les bienvenus !

Une cotisation annuelle et une participation à l’entretien du jardin sont demandées.

Envie de rejoindre les jardiniers du Libéra ?

📞 Contact : Pierre Milcent / 06 78 90 85 29

✉️ pierremilcent67@gmail.com`,
    order: 508,
    status: "publie",
    updatedAt: "2026-09-02T10:00:00.000Z",
  },
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
    order: 301,
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
    order: 302,
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
    order: 303,
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
    order: 304,
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
    order: 305,
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
    subsection: "Informations légales",
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
    subsection: "Informations légales",
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
    subsection: "Informations légales",
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
