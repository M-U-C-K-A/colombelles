# Ville de Colombelles — site municipal

Site institutionnel de la commune de Colombelles (Calvados), avec espace
d'administration complet.

**Pile technique** — Next.js 16 (App Router, React 19), TypeScript, Tailwind CSS 4,
shadcn/ui, Zod, jose.

---

## Démarrage

```bash
npm install
npm run dev
```

Le site est servi sur http://localhost:3000. La base de contenu se crée et
s'alimente toute seule au premier démarrage : aucun service externe n'est requis.

### Espace d'administration

http://localhost:3000/admin

| Compte | Identifiant | Mot de passe | Rôle |
| --- | --- | --- | --- |
| Administrateur | `admin` | `colombelles2026` | Accès complet |
| Rédaction | `redaction` | `redaction2026` | Contenus uniquement |

> Ces identifiants sont des valeurs de démonstration présentes dans le jeu de
> données initial. **Changez-les avant toute mise en ligne**, depuis
> *Administration → Utilisateurs*, et renseignez un `AUTH_SECRET` propre.

### Variables d'environnement

Copiez `.env.example` vers `.env.local` et complétez-le.

`NEXT_PUBLIC_SITE_URL` fixe l'adresse absolue du site. Elle sert de base aux
métadonnées, au sitemap, à robots.txt et surtout aux **images de partage** :
une adresse erronée les fait pointer vers un domaine qui ne les héberge pas.

À défaut, l'adresse est déduite dans cet ordre : le poste local en
développement, le domaine de production de l'hébergeur, puis l'adresse
canonique déclarée dans `src/lib/site-url.ts` — aujourd'hui
**https://colombelles.vercel.app**. Changez cette constante, ou renseignez la
variable, si le site déménage : les pages statiques figent cette valeur au
moment de la compilation.

`AUTH_SECRET` signe les cookies de session de l'administration. **Définissez-la
sur votre hébergement** (`openssl rand -base64 48`). La clé de développement
présente dans le dépôt n'est jamais utilisée en production : à défaut
d'`AUTH_SECRET`, la clé est dérivée de l'identifiant du déploiement — les
sessions restent valides tant que la livraison ne change pas, et un
avertissement s'affiche dans l'administration. Si aucun identifiant stable n'est
disponible, les sessions sont refusées plutôt que devinables.

---

## Parti pris graphique

### Rigueur suisse, couleurs de la ville

La mise en page suit les principes du **style typographique international** :

- **Grille** — 12 colonnes sur grand écran, 8 sur tablette, 4 sur mobile
  (`.swiss-grid`, `.swiss-container`). Compositions asymétriques, contenus alignés
  sur la grille plutôt que centrés.
- **Typographie** — **Geist** (SIL Open Font License 1.1), néo-grotesque proche des
  grotesques suisses, avec chiffres tabulaires pour les tableaux d'horaires. Texte
  toujours fer à gauche, drapeau à droite : jamais de justification.
- **Hiérarchie par l'échelle** — pas d'ornement, aucune ombre portée. Les
  séparations sont des filets (`.rule-top`, `.rule-bottom`, `.rule-strong`).
- **Angles vifs** — `--radius: 0`. Aucun effet de relief ni de matière.

### « Les couleurs de l'horizon »

Le logo municipal enferme un éventail de couleurs dans un C ouvert. Le site en
fait un **code de repérage** : chaque grand domaine porte sa teinte, si bien que
l'on sait d'un coup d'œil où l'on se trouve.

| Couleur | Domaine | Jeton |
| --- | --- | --- |
| Rouge | Actualités, vie municipale | `--t-actu` |
| Bleu nuit | Institution, budget, élections | `--t-mairie` |
| Violet | Démarches, état civil, prise de contact | `--t-contact` |
| Bleu | Écoles, jeunesse | `--t-ecole` |
| Bleu ciel | Famille, petite enfance, menus scolaires | `--t-famille` |
| Framboise | Solidarité, seniors, santé | `--t-solidarite` |
| Vert | Environnement, déchets, nature | `--t-nature` |
| Vert olive | Sport et loisirs | `--t-sport` |
| Orange | Emploi, commerce, économie | `--t-emploi` |
| Magenta | Culture, agenda | `--t-culture` |
| Rouille | Patrimoine, histoire industrielle | `--t-patrimoine` |

La couleur se lit dans le bandeau supérieur de chaque page, l'étiquette de
rubrique, le fil d'Ariane, le soulignement de l'onglet de navigation, les
pastilles du méga-menu, les tuiles d'accès rapide, les étiquettes d'articles et
le quantième des événements.

**Mise en œuvre.** `src/lib/themes.ts` déclare les thèmes ; `themeStyle(theme)`
pose `--theme` sur un conteneur, et les utilitaires `theme-text`, `theme-bg`,
`theme-rule`, `theme-wash`, `theme-dot` (déclarés en `@utility`, donc compatibles
avec `hover:` et `dark:`) s'en servent. Chaque actualité, événement et page porte
un champ `theme` modifiable depuis l'administration.

**Accessibilité.** Les onze teintes sont calées pour dépasser 4,5:1 **dans les
deux sens** — en texte coloré sur le papier du site, et en blanc sur aplat
coloré. La couleur ne porte jamais seule une information : elle double toujours
un libellé.

---

## Arborescence

```
src/
├── app/
│   ├── (site)/                 pages publiques (en-tête, pied de page communs)
│   │   ├── page.tsx            accueil
│   │   ├── votre-mairie/       + [slug], équipe, conseil, services
│   │   ├── demarches/          + [slug]
│   │   ├── vivre-a-colombelles/+ [slug]
│   │   ├── sortir-et-decouvrir/+ [slug]
│   │   ├── actualites/         + [slug]
│   │   ├── agenda/             + [slug]
│   │   ├── emploi/             + [slug]
│   │   ├── publications/  annuaire/  contact/  signalement/
│   │   ├── recherche/  plan/  plan-du-site/
│   │   ├── mentions-legales/  donnees-personnelles/  accessibilite/
│   │   ├── not-found.tsx       404 de rubrique
│   │   └── loading.tsx         squelette de chargement
│   ├── admin/
│   │   ├── login/              connexion (hors coquille d'administration)
│   │   ├── (dashboard)/        tableau de bord + CRUD complet
│   │   └── actions/            actions serveur (authentification, ressources)
│   ├── actions/public.ts       formulaires publics
│   ├── api/search/             recherche plein texte
│   ├── error.tsx  global-error.tsx  not-found.tsx
│   └── robots.ts  sitemap.ts  manifest.ts  icon.svg
├── components/
│   ├── site/                   en-tête, méga-menu, pied de page, cartes, formulaires
│   ├── admin/                  coquille, formulaires génériques, tableaux
│   └── ui/                     shadcn/ui
├── lib/
│   ├── db.ts                   persistance JSON (écriture atomique, file d'attente)
│   ├── seed.ts                 jeu de données initial
│   ├── types.ts                modèle de contenu
│   ├── queries.ts              lectures publiques + navigation + recherche
│   ├── auth.ts  session.ts     scrypt + JWT (jose)
│   ├── markdown.tsx            rendu Markdown → JSX, sans injection HTML
│   ├── admin-fields.ts         descripteurs de champs des formulaires
│   └── format.ts               dates et téléphones, en français
└── proxy.ts                    protection de /admin
```

---

## Espace d'administration

| Section | Ce qu'elle permet |
| --- | --- |
| Tableau de bord | Indicateurs, demandes en attente, activité récente |
| Actualités | CRUD, publication/dépublication, mise en avant, mots-clés |
| Agenda | CRUD, dates, lieu, tarif, modalités d'inscription |
| Pages | CRUD sur les quatre rubriques + pages institutionnelles, ordre, sous-rubriques |
| Publications | Documents en téléchargement, catégories |
| Médiathèque | Images référencées, avec texte alternatif obligatoire |
| Annuaire | Associations, commerces, équipements |
| Offres d'emploi | Annonces, date limite de candidature |
| Élus | Composition du conseil, pôle de délégation, rang protocolaire |
| Salles à louer | Salles municipales, tarifs, photographies de l'aperçu |
| Lieux de la carte | Points du plan interactif, catégories et coordonnées |
| Services | Coordonnées et horaires des services municipaux |
| Signalements | Suivi des demandes des habitants, notes internes |
| Messages | Boîte de réception du formulaire de contact |
| Paramètres | Identité, coordonnées, horaires, bandeau d'information |
| Utilisateurs | Comptes et rôles (réservé aux administrateurs) |
| Journal | 200 dernières opérations, horodatées et nominatives |

Le menu de navigation du site public est **construit à partir des pages
réellement publiées** : créer une page dans une rubrique la fait apparaître dans
le méga-menu et le plan du site, sans intervention sur le code.

---

## Sécurité

- Mots de passe stockés en **scrypt** salé (`node:crypto`), comparaison à temps
  constant, et vérification à vide lorsque l'identifiant est inconnu pour ne pas
  révéler l'existence d'un compte.
- Sessions **JWT HS256** (jose) en cookie `HttpOnly`, `SameSite=Lax`, `Secure` en
  production, d'une durée de huit heures. La clé de signature ne retombe jamais
  sur la valeur inscrite dans le dépôt en production (voir *Variables
  d'environnement*).
- `src/proxy.ts` ferme toute l'arborescence `/admin` et mémorise la page demandée
  pour y revenir après connexion.
- Toutes les entrées, publiques comme administratives, sont validées par **Zod**.
- Le contenu Markdown est rendu **en JSX**, sans `dangerouslySetInnerHTML`.
- `/admin` et `/api` sont exclus de `robots.txt` et marqués `noindex`.
- Connexions et modifications sont consignées dans le journal d'activité.

## Accessibilité

Lien d'évitement, navigation intégralement au clavier, fil d'Ariane sur chaque
page, libellés liés aux champs, erreurs annoncées (`role="alert"`,
`aria-describedby`, `aria-invalid`), contrastes conformes AA, respect de
`prefers-reduced-motion`, texte alternatif obligatoire sur les médias. La page
[/accessibilite](/accessibilite) porte la déclaration RGAA.

---

## Données

Le contenu est persisté dans `data/colombelles.json` (créé au premier démarrage à
partir de `src/lib/seed.ts`). Les écritures sont sérialisées et atomiques
(fichier temporaire puis `rename`). Le dossier `data/` est ignoré par Git :
supprimer le fichier régénère le jeu de données initial.

Ce choix convient à un hébergement Node classique (`next build && next start`)
sur un disque inscriptible.

### Hébergement sans disque permanent (Vercel et plateformes sans état)

La couche de persistance se dégrade au lieu d'échouer. Elle essaie, dans
l'ordre : `DATA_DIR`, puis `data/` à la racine du projet, puis le dossier
temporaire du système ; à défaut de tout, elle reste en mémoire. Le site est
donc consultable et l'administration utilisable partout — mais lorsque
l'écriture n'est pas durable, un bandeau **« Mode démonstration »** le signale à
l'agent connecté, plutôt que de lui laisser croire que son travail est
enregistré.

Pour une vraie mise en production, deux voies :

1. **Un volume inscriptible** — renseignez `DATA_DIR` (VPS, Scalingo, Railway,
   Fly.io, conteneur avec volume…). Rien d'autre à changer.
2. **Une base de données** — réécrivez `src/lib/db.ts`. C'est le seul module à
   toucher : il n'expose que `getDb`, `read` et `mutate`, sur lesquels
   s'appuient `queries.ts` et les actions serveur, qui restent inchangés.

## Contenus

Les informations reprises du site municipal sont réelles : adresse, téléphone,
horaires, arborescence des rubriques, **composition du conseil municipal**,
équipements sportifs (piscine rénovée, skate park, pumptrack, stades,
aires de jeux), centre Léo Lagrange, **salles à louer et leurs tarifs**,
patrimoine industriel et rattachement à la communauté urbaine Caen la mer, **logo officiel compris** (`public/logo-colombelles.png`, repris du
site municipal ; le favicon en est le pictogramme recadré à la volée par
`src/app/icon.tsx`). Ce logo reste la propriété de la Ville : son usage ici
relève de la démonstration. En revanche, **les articles, les événements, les documents et les fiches
d'annuaire restent des contenus de démonstration**, à remplacer depuis l'espace
d'administration. Les photographies sont des aplats de substitution.

La page [Accessibilité](/accessibilite) est un **modèle** : une déclaration
RGAA ne peut annoncer un niveau de conformité qu'après un audit réellement
conduit. Tant qu'il n'a pas eu lieu, l'état déclaré est « non conforme », qui
est la mention prévue par le référentiel — et non un constat sur la qualité du
site.

## Commandes

```bash
npm run dev     # développement
npm run build   # build de production
npm start       # serveur de production
npm run lint    # ESLint
```

### Services externes

Deux appels sortants, tous deux vers des services publics, sans clé ni compte :

- **Base Adresse Nationale** (`api-adresse.data.gouv.fr`) — l'aide à la saisie du
  formulaire de signalement propose les voies de la commune, restreinte au code
  INSEE 14167. Le champ reste libre et le formulaire fonctionne si le service
  est indisponible.
- **OpenStreetMap** — fond cartographique du plan interactif, sous licence ODbL.

Les coordonnées des lieux ont été relevées une fois via la Base Adresse
Nationale et sont **figées dans le jeu de données** : aucun géocodage n'a lieu
au moment du rendu.

### Fichiers de démonstration

Les publications et les visuels de la médiathèque pointent vers des fichiers
réellement présents dans `public/`, afin qu'aucun lien ne casse. Ce sont des
substituts : PDF d'une page portant l'intitulé de la publication, et aplats
colorés pour les images. Ils se régénèrent avec :

```bash
node scripts/generate-placeholder-documents.mjs
```

Remplacez-les par les vrais documents en déposant les fichiers dans
`public/documents` et `public/media`, puis en mettant à jour les fiches depuis
*Administration → Publications* et *Médiathèque*.
