# TP 02 - Système de favoris

## Objectif

Implémenter un système de favoris permettant aux utilisateurs de sauvegarder leurs Pokémon préférés. Les données doivent persister même après la fermeture de l'application grâce au stockage local.

## Prérequis

- Application Pokédex fonctionnelle
- Compréhension du Context API de React
- Notions de stockage asynchrone
- Connaissance des hooks `useContext`, `useState`, `useEffect`

## Concepts clés

- AsyncStorage pour la persistance des données
- Context API pour partager l'état global
- Gestion asynchrone avec async/await
- Sérialisation/désérialisation JSON
- Boutons interactifs avec état

## Étapes de réalisation

### 1. Installation de la dépendance

Installez le package nécessaire pour le stockage local.

Commande à utiliser:
```bash
npx expo install @react-native-async-storage/async-storage
```

Vérification:
- Le package apparaît dans `package.json`
- Pas d'erreur lors de l'installation

### 2. Création du Context pour les favoris

Créez un fichier `src/contexts/FavoritesContext.tsx`.

Éléments à définir:
- Interface pour le type de contexte
- État pour stocker les IDs des Pokémon favoris
- Fonctions pour ajouter/retirer un favori
- Fonction pour vérifier si un Pokémon est favori
- Provider qui englobe l'application

Questions:
- Quel format de données utiliser pour stocker les favoris?
- Comment initialiser l'état depuis AsyncStorage au démarrage?

### 3. Implémentation du stockage persistant

Créez des fonctions pour interagir avec AsyncStorage.

Opérations nécessaires:
- Sauvegarder la liste des favoris
- Charger la liste des favoris au démarrage
- Gérer les erreurs de lecture/écriture

Points techniques:
- AsyncStorage stocke uniquement des chaînes de caractères
- Utilisez `JSON.stringify()` et `JSON.parse()`
- Définissez une clé unique pour le stockage (ex: `@pokedex_favorites`)

### 4. Création du composant bouton favori

Créez `src/components/FavoriteButton.tsx`.

Fonctionnalités:
- Afficher une icône différente selon l'état (favori ou non)
- Permettre d'ajouter/retirer des favoris
- Animation au clic pour le feedback visuel

Considérations UI:
- Icône étoile pleine vs étoile vide
- Couleur jaune pour les favoris
- Animation de scale ou de rotation au clic

### 5. Integration dans les ecrans

Ajoutez le bouton favori dans:
- L'ecran de detail du Pokemon (`app/pokemon/[id].tsx` avec Expo Router): dans le header ou pres du nom
- `PokemonCard`: icone en coin de carte (optionnel)

Utilisation du Context:
- Importez le hook personnalise `useFavorites`
- Recuperez les fonctions necessaires
- Passez l'ID du Pokemon aux fonctions (recuperez-le avec `useLocalSearchParams()` d'expo-router dans l'ecran de detail)

### 6. Création de l'onglet Favoris

Deux approches possibles:

**Option A: Navigation par onglets avec Expo Router**
- Avec Expo Router, la navigation par onglets se configure via le systeme de fichiers dans le dossier `app/`
- Creez un fichier `app/(tabs)/favorites.tsx` pour ajouter un onglet Favoris
- Le fichier `app/(tabs)/_layout.tsx` definit la configuration des onglets avec le composant `Tabs` d'Expo Router
- La logique d'affichage peut etre dans un composant `src/components/FavoritesList.tsx`
- Listez uniquement les Pokemon favoris

**Option B: Filtre dans la liste principale**
- Ajoutez un bouton toggle pour filtrer
- Reutilisez le composant de liste existant
- Filtrez les Pokemon selon les favoris

### 7. Chargement des détails des favoris

Les favoris stockent uniquement les IDs. Il faut charger les détails.

Stratégies:
- Charger tous les détails au montage du composant
- Utiliser le service API existant
- Gérer l'état de chargement pour chaque Pokémon
- Mettre en cache les données déjà chargées

### 8. Gestion des cas limites

Situations à gérer:
- Aucun favori: afficher un message d'encouragement
- Erreur de chargement depuis AsyncStorage
- Suppression d'un favori depuis deux endroits différents
- Synchronisation entre les écrans

## Points d'attention

### Performance

- Ne rechargez pas AsyncStorage à chaque render
- Utilisez `useEffect` avec les bonnes dépendances
- Mémorisez les fonctions du Context avec `useCallback`
- Considérez un cache en mémoire pour les détails des Pokémon

### Expérience utilisateur

- Feedback immédiat au clic (animation)
- Indication claire de l'état actuel
- Transition fluide entre favoris et non-favoris
- Message explicite quand il n'y a pas de favoris

### Gestion des données

- Validez les données chargées depuis AsyncStorage
- Gérez le cas où le format de données change
- Évitez les doublons dans la liste des favoris
- Nettoyez les données invalides

## Critères de validation

Votre implémentation est correcte si:

- [ ] Le bouton favori s'affiche correctement
- [ ] L'ajout d'un favori fonctionne immédiatement
- [ ] Le retrait d'un favori fonctionne immédiatement
- [ ] Les favoris persistent après fermeture de l'app
- [ ] L'état des favoris est cohérent dans toute l'app
- [ ] Un écran ou filtre affiche uniquement les favoris
- [ ] Les favoris se chargent au démarrage de l'app
- [ ] Les erreurs de stockage sont gérées gracieusement

## Pour aller plus loin

### Améliorations possibles

- Limite du nombre de favoris (ex: 6 comme une équipe)
- Organisation des favoris par catégories personnalisées
- Ordre personnalisé des favoris (drag & drop)
- Partage des favoris (export/import)
- Statistiques sur les favoris (types les plus choisis)
- Synchronisation cloud avec Firebase

### Défis supplémentaires

- Implémenter l'annulation d'un retrait (undo)
- Ajouter des notes personnelles sur chaque favori
- Créer plusieurs listes de favoris (équipes)
- Migration des données si le format change

## Ressources

### Documentation officielle

- AsyncStorage: https://react-native-async-storage.github.io/async-storage/
- Context API: https://react.dev/reference/react/useContext
- useCallback: https://react.dev/reference/react/useCallback

### Patterns recommandés

- Recherchez "React Native AsyncStorage best practices"
- "React Context for global state management"
- "Custom hooks for AsyncStorage"

### Bibliothèques alternatives

- react-native-mmkv (plus performant qu'AsyncStorage)
- Redux Persist (si vous utilisez Redux)
- Zustand avec persist middleware

## Architecture suggérée

### Structure des fichiers

Avec Expo Router, la navigation est basee sur le systeme de fichiers. Les ecrans sont definis par des fichiers dans le dossier `app/`, tandis que la logique metier reste dans `src/`.

```
app/
  (tabs)/
    _layout.tsx          (configuration des onglets)
    index.tsx            (liste des Pokemon - onglet principal)
    favorites.tsx        (onglet favoris)
src/
  contexts/
    FavoritesContext.tsx
  components/
    FavoriteButton.tsx
  components/
    FavoritesList.tsx (optionnel, logique d'affichage des favoris)
  services/
    storageService.ts (optionnel)
  hooks/
    useFavorites.ts (optionnel)
```

### Format de stockage

Exemple de structure JSON pour AsyncStorage:
```json
{
  "favorites": [1, 25, 150],
  "lastUpdated": "2025-01-20T10:30:00Z"
}
```

### Interface TypeScript

Définissez vos types clairement:
```typescript
interface FavoritesContextType {
  favorites: number[];
  addFavorite: (id: number) => Promise<void>;
  removeFavorite: (id: number) => Promise<void>;
  isFavorite: (id: number) => boolean;
  isLoading: boolean;
}
```

## Tests à effectuer

- Ajouter un favori et fermer/rouvrir l'app
- Ajouter plusieurs favoris rapidement
- Retirer un favori depuis différents écrans
- Vider complètement les favoris
- Tester avec un stockage plein (cas rare)
- Tester la navigation vers l'onglet favoris via les tabs d'Expo Router
