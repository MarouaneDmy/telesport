# Notes d'architecture

Ce document recense les problèmes identifiés du code source (`App.tsx`), accompagnés de mes réflexions personnelles et de la stratégie que je compte adopter pour les résoudre.

---

## 1. Architecture monolithique et fichiers mélangés

**Problème identifié :**
Toute l'application (composants `Home` et `Country`, données brutes, routes) est contenue dans un seul et unique fichier `App.tsx`. De plus, le composant `Country` est défini mais n'a aucune navigation vers celui-ci.

**Commentaire personnel :**
Pour rendre le code lisible et maintenable, je vais créer un dossier `pages/` pour y séparer `Home.tsx` et `CountryDetails.tsx`.

---

## 2. Données brutes et logique de fetching dans le composant

**Problème identifié :**
Le tableau `olympicsData` est déclaré directement dans le composant `Home`. De plus, la simulation de chargement des données est gérée via un `useEffect` contenant un `setTimeout` et des `console.log`, ce qui est une logique lourde dans le composant.

**Commentaire personnel :**
Je vais extraire ces données dans un fichier dédié (`hooks/useData.ts`) pour respecter la contrainte du projet. Pour la gestion du fetching, plutôt que de créer un custom hook complexe avec `useEffect`, je préfère utiliser une solution standard de l'industrie comme **RTK Query**. Cela me permettra de gérer le cache, le chargement et les erreurs de manière native.

---

## 3. Absence de typage strict

**Problème identifié :**
Le code utilise massivement le type `any`. Cela annule tous les bénéfices de TypeScript, rend l'autocomplétion inutilisable et risque de provoquer des erreurs silencieuses à l'exécution.

**Commentaire personnel :**
C'est une dette technique qu'il faut régler en priorité. Je vais créer un dossier `models/` pour y définir les interfaces strictes `Country` et `Participation`. Ensuite, je remplacerai tous les `any` par ces interfaces. J'en profiterai pour utiliser des "Type Guards" (ex: `if (!data) return`) pour éviter les erreurs de type `undefined`.

---

## 4. Duplication de code dans l'interface

**Problème identifié :**
Les titres `<h1>` sont répétés dans `Home` et `Country`. Pire encore, les cartes d'indicateurs (KPI) comme "Pays participants", "Total médailles", etc., sont copiées-collées avec les mêmes classes Tailwind dans les deux pages.

**Commentaire personnel :**

- Je vais créer un composant `<Header />` pour uniformiser les titres.
- Je vais créer un composant réutilisable `<Indicator />` qui acceptera des props (`title`, `value`, `color`).

---

## 5. Navigation absentes

**Problème identifié :**
Il n'y a aucun moyen de naviguer de la page d'accueil vers la page de détail d'un pays. De plus, une fois sur la page de détail, l'utilisateur n'a aucun bouton pour revenir en arrière.

**Commentaire personnel :**
J'ajouterai un événement `onClick` sur le graphique Pie de la page `Home` pour déclencher la navigation. Enfin, j'ajouterai un bouton "Retour" clair et accessible dans le composant `CountryDetails`.

---

## 6. État de chargement mal géré

**Problème identifié :**
L'état de chargement est déduit de la variable `data` via la condition `if (!data)`. Mais si `data` est initialisé avec un tableau vide `[]`, cette condition sera toujours fausse, et l'écran de chargement ne s'affichera jamais. De plus, il n'y a aucune gestion d'erreur.

**Commentaire personnel :**
Il faut des états explicites. En passant par RTK Query, je récupérerai nativement les variables booléennes `isLoading` et `error`. Je les utiliserai en haut du composant pour afficher un `<Loader />` ou un `<ErrorMessage />` avant même d'essayer de rendre l'UI principale.
