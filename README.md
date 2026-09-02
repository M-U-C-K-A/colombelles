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
| Administrateur | `admin` | `colombelle2026` | Accès complet |
| Rédaction | `redaction` | `redaction2026` | Contenus uniquement |

> Ces identifiants sont des valeurs de démonstration présentes dans le jeu de
> données initial. **Changez-les avant toute mise en ligne**, depuis
> *Administration → Utilisateurs*, et renseignez un `AUTH_SECRET` propre.

### Variables d'environnement

Copiez `.env.example` vers `.env.local` et complétez-le. En développement, une clé
de repli est utilisée si `AUTH_SECRET` est absent ; en production, définissez-la.

---

## Parti pris graphique

Le site suit les principes du **style typographique international** (école suisse) :

- **Grille** — 12 colonnes sur grand écran, 8 sur tablette, 4 sur mobile
  (`.swiss-grid`, `.swiss-container`). Les compositions sont asymétriques et les
  contenus alignés sur la grille plutôt que centrés.
- **Typographie** — **Geist** (SIL Open Font License 1.1), néo-grotesque proche des
  grotesques suisses, avec chiffres tabulaires pour les tableaux d'horaires. Texte
  toujours fer à gauche, drapeau à droite : jamais de justification.
- **Hiérarchie par l'échelle** — pas d'ornement, pas d'ombre portée dans l'interface
  courante. Les séparations sont des filets capillaires (`.rule-top`,
  `.rule-bottom`, `.rule-strong`).
- **Angles vifs** — `--radius: 0`.
- **Une seule couleur d'accent** — un rouge signalétique (`--rouge`), complété d'une
  rouille (`--fonte`, mémoire sidérurgique), d'un acier et d'un bleu d'eau réservés
  aux usages fonctionnels.

### Le claymorphisme, et où il s'arrête

Le claymorphisme est cantonné aux **blocs consacrés à la mémoire industrielle** :
la composition du haut fourneau en page d'accueil, le portrait de la maire, les
pastilles de date de l'agenda. Volumes modelés, arrondis généreux, doubles ombres
interne et externe (`.clay`, `.clay-deep`, `.clay-inset`). Ailleurs, la rigueur
suisse reste intacte — le contraste entre les deux registres est délibéré.

Le thème sombre est pris en charge sur l'ensemble du site.

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
| Élus | Composition du conseil, délégations, rang protocolaire |
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
  production, d'une durée de huit heures.
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

Ce choix convient à un hébergement Node classique (`next build && next start`) sur
un disque inscriptible. Pour un déploiement sur système de fichiers en lecture
seule, remplacer l'implémentation de `src/lib/db.ts` par un véritable SGBD :
c'est le seul module à réécrire, `queries.ts` et les actions serveur restant
inchangés.

## Contenus

Les informations pratiques — adresse, téléphone, horaires, arborescence des
rubriques, patrimoine industriel — reprennent celles du site municipal de
Colombelles. **Les articles, événements, documents, noms d'élus et fiches
d'annuaire sont des contenus de démonstration**, destinés à être remplacés depuis
l'espace d'administration. Les noms de personnes sont fictifs.

## Commandes

```bash
npm run dev     # développement
npm run build   # build de production
npm start       # serveur de production
npm run lint    # ESLint
```
