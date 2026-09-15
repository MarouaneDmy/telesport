# Architecture du projet TéléSport

## Contexte

Ce document décrit l'architecture technique de l'application **TéléSport - Historique des Jeux Olympiques**. Il fait suite à un audit initial du code source (documenté dans `notes-architecture.md`) qui a mis en évidence plusieurs anti-patterns : monolithisme, absence de typage, logique métier mélangée à l'UI, duplication de code, et gestion approximative des états asynchrones.

L'architecture présentée ici est le résultat de la refactorisation appliquée pour résoudre ces problèmes. Elle vise à être **maintenable**, **testable**, **typée**, et **prête à accueillir une véritable API** sans modification des composants.

---

## 1. Arborescence des dossiers

```text
src/
├── components/
│   ├── common/
│   │   ├── ErrorMessage.tsx   # Affichage d'erreur avec bouton de retry
│   │   └── Loader.tsx         # Spinner de chargement
│   ├── Header.tsx             # Titre de page réutilisable
│   └── Indicator.tsx          # Affichage des données
│
├── hooks/
│   └── useData.ts             # Source de données brutes
│
├── models/
│   └── olympic.model.ts       # Interfaces TypeScript (Country, Participation)
│
├── pages/
│   ├── Home.tsx               # Dashboard principal (Pie Chart)
│   ├── CountryDetails.tsx     # Fiche pays (Line Chart)
│   └── NotFound.tsx           # Page 404 avec retour à l'accueil
│
├── router/
│   └── AppRouter.tsx          # Configuration centralisée des routes
│
├── store/
│   ├── olympicApi.ts          # Service RTK Query
│   └── store.ts               # Configuration du Redux Store
│
├── utils/
│   └── olympicStats.ts        # Fonctions pures de logique métier
│
├── App.tsx                    # Composant racine + Enregistrement global Chart.js
└── main.tsx                   # Point d'entrée + Providers (Redux)
```

### Rôle de chaque dossier

| Dossier       | Responsabilité                                 |
| ------------- | ---------------------------------------------- |
| `components/` | Composants UI réutilisables                    |
| `hooks/`      | Hooks personnalisés                            |
| `models/`     | Interfaces de type                             |
| `pages/`      | Pages d'accueil et Country                     |
| `store/`      | État global et service de fetching (RTK Query) |
| `utils/`      | Fonctions pures de calcul                      |
| `router/`     | Gestion des routes                             |

---

## 2. Composants et leurs rôles

L'application sépare clairement la logique de l'affichage.

### Composants de logique

Situés dans `src/components/`, ils reçoivent des données via des **props** et se contentent de les afficher. Ils ne contiennent **aucun appel de données**, **aucune logique métier**, et très peu d'état local.

| Composant      | Rôle                           | Props                     |
| -------------- | ------------------------------ | ------------------------- |
| `Indicator`    | Carte statistique réutilisable | `title`, `value`, `color` |
| `Header`       | Titre de page                  | `children` (le titre)     |
| `Loader`       | État de chargement             | `message?`                |
| `ErrorMessage` | État d'erreur avec retry       | `message?`, `onRetry?`    |

### Composants conteneurs

Situés dans `src/pages/`, ils orchestrent l'application : récupération des données, gestion des états (loading/error), calculs, et navigation.

| Composant        | Rôle                                                                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Home`           | Dashboard principal : récupère la liste des pays, affiche les KPI et le Pie Chart, gère la redirection vers `/country/:id` au clic                           |
| `CountryDetails` | Fiche d'un pays : récupère l'ID via `useParams`, localise le pays, affiche ses KPI et l'évolution des médailles (Line Chart), gère le cas "pays introuvable" |

## 3. Usage du service de données

Pour résoudre les problèmes de données brutes et de `useEffect` mal gérés dans le code initial, la gestion des données a été séparée en deux couches distinctes, soutenue par une couche de logique métier.

### Architecture en deux couches

#### Couche 1 : La source de données (`src/hooks/useData.ts`)

Conformément aux contraintes du projet, ce fichier exporte la constante `data`. Il agit comme une base de données statique, strictement typée avec l'interface `Country[]`.

```typescript
export const data: Country[] = [
  {
    id: 1,
    name: "États-Unis",
    participations: [
      /* ... */
    ],
  },
  // ... autres pays
];
```

## 4. Préparation à une future connexion Back-end / API

L'un des objectifs principaux de cette refactorisation était de rendre la transition vers une vraie API **facile**. Grâce au découplage actuel, **aucun composant React** (`Home.tsx` ou `CountryDetails.tsx`) n'aura besoin d'être modifié le jour où le backend sera prêt.

Seul le fichier `src/store/olympicApi.ts` devra être adapté pour remplacer la simulation par un véritable appel HTTP, une fois cette modification effectuée, le fichier `hooks/useData.ts` pourra être supprimé. Les composants continueront d'utiliser `useGetOlympicsQuery()` de manière totalement transparente, avec la même gestion native du cache, du chargement et des erreurs.

---
