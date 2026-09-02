import { THEME_OPTIONS } from "@/lib/themes";

/** Descripteurs de champs partagés entre les formulaires d'administration. */

export type FieldType =
  | "text"
  | "email"
  | "url"
  | "number"
  | "date"
  | "datetime"
  | "textarea"
  | "markdown"
  | "select"
  | "checkbox";

export interface FieldSpec {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  full?: boolean;
}

export interface FieldGroup {
  title: string;
  description?: string;
  fields: FieldSpec[];
}

const STATUS_OPTIONS = [
  { value: "brouillon", label: "Brouillon — non visible sur le site" },
  { value: "publie", label: "Publié — visible sur le site" },
];

/** Couleur thématique : elle balise la page dans la navigation et les listes. */
const themeField: FieldSpec = {
  name: "theme",
  label: "Couleur thématique",
  type: "select",
  required: true,
  options: THEME_OPTIONS,
  hint: "Détermine la couleur du bandeau, de l'étiquette et des repères de navigation.",
};

const slugField = (hint: string): FieldSpec => ({
  name: "slug",
  label: "Adresse (slug)",
  hint,
  placeholder: "laisser vide pour générer automatiquement",
});

export const NEWS_FIELDS: FieldGroup[] = [
  {
    title: "Identification",
    fields: [
      { name: "title", label: "Titre", required: true, full: true },
      slugField("Partie finale de l'adresse : /actualites/mon-article"),
      { name: "category", label: "Catégorie", required: true, placeholder: "Culture, Travaux…" },
      themeField,
      {
        name: "excerpt",
        label: "Chapô",
        type: "textarea",
        rows: 3,
        hint: "Deux à trois lignes, affichées dans les listes et les partages.",
      },
    ],
  },
  {
    title: "Contenu",
    description: "Mise en forme Markdown : titres, listes, gras, liens, tableaux et citations.",
    fields: [{ name: "content", label: "Corps de l'article", type: "markdown", required: true }],
  },
  {
    title: "Publication",
    fields: [
      { name: "publishedAt", label: "Date de publication", type: "datetime", required: true },
      { name: "author", label: "Signature", required: true, placeholder: "Service communication" },
      {
        name: "tags",
        label: "Mots-clés",
        hint: "Séparés par des virgules.",
        placeholder: "écoles, rentrée",
      },
      { name: "status", label: "Statut", type: "select", options: STATUS_OPTIONS, required: true },
      {
        name: "featured",
        label: "Mettre en avant sur la page d'accueil",
        type: "checkbox",
        full: true,
      },
    ],
  },
];

export const EVENT_FIELDS: FieldGroup[] = [
  {
    title: "Identification",
    fields: [
      { name: "title", label: "Titre", required: true, full: true },
      slugField("Partie finale de l'adresse : /agenda/mon-evenement"),
      { name: "category", label: "Catégorie", required: true, placeholder: "Culture, Sport…" },
      themeField,
      { name: "excerpt", label: "Résumé", type: "textarea", rows: 3 },
    ],
  },
  {
    title: "Contenu",
    fields: [
      { name: "content", label: "Description", type: "markdown", rows: 12, required: true },
      {
        name: "registration",
        label: "Modalités d'inscription",
        type: "textarea",
        rows: 3,
        hint: "Laisser vide si l'accès est libre.",
      },
    ],
  },
  {
    title: "Date et lieu",
    fields: [
      { name: "startsAt", label: "Début", type: "datetime", required: true },
      { name: "endsAt", label: "Fin", type: "datetime", hint: "Facultatif." },
      { name: "location", label: "Lieu", required: true },
      { name: "price", label: "Tarif", required: true, placeholder: "Entrée libre" },
    ],
  },
  {
    title: "Publication",
    fields: [
      { name: "status", label: "Statut", type: "select", options: STATUS_OPTIONS, required: true },
      { name: "featured", label: "Mettre en avant", type: "checkbox" },
    ],
  },
];

export const PAGE_FIELDS: FieldGroup[] = [
  {
    title: "Identification",
    fields: [
      { name: "title", label: "Titre", required: true, full: true },
      slugField("Partie finale de l'adresse dans la rubrique."),
      {
        name: "section",
        label: "Rubrique",
        type: "select",
        required: true,
        options: [
          { value: "votre-mairie", label: "Votre mairie" },
          { value: "demarches", label: "Démarches pratiques" },
          { value: "vivre-a-colombelles", label: "Vivre à Colombelles" },
          { value: "sortir-et-decouvrir", label: "Sortir et découvrir" },
          { value: "institutionnel", label: "Institutionnel (mentions, RGPD…)" },
        ],
      },
      {
        name: "subsection",
        label: "Sous-rubrique",
        hint: "Regroupe les pages dans le menu et le sommaire. Facultatif.",
        placeholder: "État civil, Patrimoine…",
      },
      {
        name: "order",
        label: "Ordre d'affichage",
        type: "number",
        required: true,
        hint: "Les valeurs les plus basses apparaissent en premier.",
      },
      themeField,
      { name: "summary", label: "Résumé", type: "textarea", rows: 3, full: true },
      {
        name: "block",
        label: "Bloc interactif",
        type: "select",
        options: [
          { value: "", label: "Aucun" },
          { value: "salles", label: "Salles à louer (aperçu au survol)" },
          { value: "caen-la-mer", label: "Communauté urbaine Caen la mer" },
        ],
        hint: "Ajouté sous le texte de la page.",
      },
    ],
  },
  {
    title: "Contenu",
    description: "Mise en forme Markdown : titres, listes, gras, liens, tableaux et citations.",
    fields: [{ name: "content", label: "Corps de la page", type: "markdown", required: true }],
  },
  {
    title: "Publication",
    fields: [
      { name: "status", label: "Statut", type: "select", options: STATUS_OPTIONS, required: true },
    ],
  },
];

export const VENUE_FIELDS: FieldGroup[] = [
  {
    title: "Salle",
    fields: [
      { name: "name", label: "Nom de la salle", required: true, full: true },
      slugField("Identifiant interne, généré automatiquement si vide."),
      themeField,
      { name: "capacity", label: "Capacité", required: true, placeholder: "140 personnes assises" },
      { name: "order", label: "Ordre d'affichage", type: "number", required: true },
      { name: "address", label: "Adresse", required: true, full: true },
      { name: "description", label: "Description", type: "textarea", rows: 3, required: true, full: true },
      { name: "equipment", label: "Équipement", type: "textarea", rows: 2, required: true, full: true },
    ],
  },
  {
    title: "Tarifs",
    fields: [
      { name: "rateResident", label: "Tarif Colombellois", required: true, placeholder: "332 € les 24 h · 561 € les 48 h" },
      { name: "rateNonResident", label: "Tarif extérieurs", required: true },
      { name: "extra", label: "Supplément", full: true, placeholder: "Location de la vaisselle : 111 €" },
    ],
  },
  {
    title: "Photographies",
    description: "Elles défilent dans l'aperçu qui s'ouvre au survol de la salle.",
    fields: [
      {
        name: "images",
        label: "Adresses des images",
        type: "textarea",
        rows: 4,
        full: true,
        hint: "Une adresse par ligne, par exemple /media/salles/jean-jaures-1.jpg. La première sert de vue principale.",
      },
      { name: "status", label: "Statut", type: "select", options: STATUS_OPTIONS, required: true },
    ],
  },
];

export const DOCUMENT_FIELDS: FieldGroup[] = [
  {
    title: "Document",
    fields: [
      { name: "title", label: "Intitulé", required: true, full: true },
      { name: "category", label: "Catégorie", required: true, placeholder: "Conseil municipal" },
      {
        name: "url",
        label: "Adresse du fichier",
        required: true,
        placeholder: "/documents/mon-fichier.pdf",
        hint: "Chemin du fichier déposé dans public/documents, ou adresse externe.",
      },
      { name: "fileType", label: "Format", required: true, placeholder: "PDF" },
      { name: "size", label: "Poids", required: true, placeholder: "1,2 Mo" },
      { name: "publishedAt", label: "Date de publication", type: "datetime", required: true },
      { name: "status", label: "Statut", type: "select", options: STATUS_OPTIONS, required: true },
    ],
  },
];

export const MEDIA_FIELDS: FieldGroup[] = [
  {
    title: "Média",
    description:
      "Déposez le fichier dans le dossier public/media du projet, puis référencez-le ici.",
    fields: [
      { name: "name", label: "Nom", required: true, full: true },
      { name: "url", label: "Adresse", required: true, placeholder: "/media/photo.jpg" },
      { name: "credit", label: "Crédit", placeholder: "Ville de Colombelles" },
      {
        name: "alt",
        label: "Texte alternatif",
        type: "textarea",
        rows: 3,
        required: true,
        full: true,
        hint: "Décrit l'image pour les personnes utilisant un lecteur d'écran. Obligatoire.",
      },
    ],
  },
];

export const DIRECTORY_FIELDS: FieldGroup[] = [
  {
    title: "Structure",
    fields: [
      { name: "name", label: "Nom", required: true, full: true },
      {
        name: "type",
        label: "Type",
        type: "select",
        required: true,
        options: [
          { value: "association", label: "Association" },
          { value: "commerce", label: "Commerce" },
          { value: "equipement", label: "Équipement ou service" },
        ],
      },
      { name: "category", label: "Catégorie", required: true, placeholder: "Sport, Santé…" },
      { name: "description", label: "Description", type: "textarea", rows: 4, required: true, full: true },
    ],
  },
  {
    title: "Coordonnées",
    fields: [
      { name: "address", label: "Adresse", required: true, full: true },
      { name: "phone", label: "Téléphone" },
      { name: "email", label: "Courriel", type: "email" },
      { name: "website", label: "Site internet", type: "url", placeholder: "https://" },
      { name: "status", label: "Statut", type: "select", options: STATUS_OPTIONS, required: true },
    ],
  },
];

export const JOB_FIELDS: FieldGroup[] = [
  {
    title: "Poste",
    fields: [
      { name: "title", label: "Intitulé du poste", required: true, full: true },
      slugField("Partie finale de l'adresse : /emploi/mon-offre"),
      { name: "department", label: "Service", required: true },
      { name: "contract", label: "Statut et catégorie", required: true, placeholder: "Titulaire · catégorie C" },
      { name: "timeframe", label: "Temps de travail", required: true, placeholder: "Temps complet, 35h" },
    ],
  },
  {
    title: "Contenu de l'annonce",
    fields: [
      { name: "description", label: "Missions, profil et conditions", type: "markdown", required: true },
    ],
  },
  {
    title: "Publication",
    fields: [
      { name: "publishedAt", label: "Date de publication", type: "datetime", required: true },
      { name: "deadline", label: "Date limite de candidature", type: "date", required: true },
      { name: "status", label: "Statut", type: "select", options: STATUS_OPTIONS, required: true },
    ],
  },
];

export const ELU_FIELDS: FieldGroup[] = [
  {
    title: "Élu",
    fields: [
      { name: "name", label: "Nom et prénom", required: true },
      { name: "role", label: "Fonction", required: true, placeholder: "3ᵉ adjoint au maire" },
      {
        name: "pole",
        label: "Pôle de délégation",
        required: true,
        placeholder: "Sport et animation",
        hint: "Regroupe les élus sur la page Équipe municipale.",
      },
      themeField,
      {
        name: "order",
        label: "Rang protocolaire",
        type: "number",
        required: true,
        hint: "1 pour la maire, puis les adjoints dans l'ordre.",
      },
      {
        name: "delegation",
        label: "Délégations",
        type: "textarea",
        rows: 3,
        required: true,
        full: true,
        hint: "Saisir « — » en l'absence de délégation.",
      },
      { name: "email", label: "Courriel", type: "email" },
      { name: "permanence", label: "Permanence" },
    ],
  },
];

export const SERVICE_FIELDS: FieldGroup[] = [
  {
    title: "Service municipal",
    fields: [
      { name: "name", label: "Nom du service", required: true, full: true },
      { name: "description", label: "Missions", type: "textarea", rows: 4, required: true, full: true },
      { name: "address", label: "Localisation", required: true },
      { name: "hours", label: "Horaires", required: true },
      { name: "phone", label: "Téléphone", required: true },
      { name: "email", label: "Courriel", type: "email", required: true },
      { name: "order", label: "Ordre d'affichage", type: "number", required: true },
    ],
  },
];
