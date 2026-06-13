# TP 01 - Barre de recherche

## Objectif

Implémenter une barre de recherche permettant de filtrer les Pokémon par nom ou numéro. La recherche doit être réactive et s'effectuer en temps réel pendant la saisie.

## Prérequis

- Application Pokédex fonctionnelle avec liste de Pokémon
- Compréhension des hooks `useState` et `useEffect`
- Connaissance du composant `TextInput` de React Native

## Concepts clés

- Gestion d'état local avec `useState`
- Filtrage de listes en JavaScript
- Debouncing pour optimiser les performances
- Méthodes de chaînes de caractères (`toLowerCase`, `includes`)
- Gestion de la saisie utilisateur

## Étapes de réalisation

### 1. Ajout du composant de recherche

Créez un nouveau composant `SearchBar.tsx` dans le dossier `src/components/`.

Points à considérer:
- Le composant doit accepter une fonction de callback comme prop
- Utilisez `TextInput` avec un style approprié
- Ajoutez une icône de recherche pour améliorer l'UX
- Pensez à gérer le placeholder et l'accessibilité

### 2. Integration dans l'ecran de liste

Modifiez l'ecran de liste des Pokemon pour integrer la barre de recherche. Avec Expo Router, cet ecran correspond au fichier de route principal, par exemple `app/(tabs)/index.tsx` ou `app/index.tsx`.

Emplacement:
- Placez la barre de recherche au-dessus de la `FlatList`
- Utilisez un conteneur avec `position: 'sticky'` si necessaire

### 3. Gestion de l'état de recherche

Ajoutez un état local pour stocker:
- Le terme de recherche actuel
- La liste filtrée de Pokémon

Questions à se poser:
- Quel hook utiliser pour stocker le terme de recherche?
- Comment maintenir à la fois la liste complète et la liste filtrée?

### 4. Implémentation de la logique de filtrage

Créez une fonction qui filtre les Pokémon selon le terme de recherche.

Critères de filtrage:
- Nom du Pokémon (insensible à la casse)
- Numéro du Pokémon (ex: "001", "25")

Indices:
- Utilisez `.filter()` sur le tableau de Pokémon
- Convertissez tout en minuscules pour la comparaison
- Gérez le cas où le terme est vide (afficher tous les Pokémon)

### 5. Optimisation avec debouncing

Pour éviter de filtrer à chaque frappe, implémentez un délai.

Approches possibles:
- Utiliser `setTimeout` et `clearTimeout`
- Créer un hook personnalisé `useDebounce`
- Utiliser une bibliothèque comme `lodash.debounce`

### 6. Gestion des cas particuliers

Cas à gérer:
- Aucun résultat trouvé: afficher un message approprié
- Recherche en cours de chargement: désactiver la recherche
- Effacement de la recherche: réafficher tous les Pokémon
- Pagination: comment gérer la recherche avec la pagination infinie?

## Points d'attention

### Performance

- Le filtrage à chaque frappe peut ralentir l'application
- Implémentez un debouncing de 300-500ms
- Utilisez `useMemo` pour mémoriser la liste filtrée si nécessaire

### Expérience utilisateur

- Indiquez visuellement qu'une recherche est active
- Permettez de vider la recherche facilement (bouton X)
- Affichez le nombre de résultats trouvés
- Maintenez le focus sur l'input lors de la saisie

### Accessibilité

- Ajoutez des labels appropriés pour les lecteurs d'écran
- Gérez le clavier virtuel (bouton "Rechercher" au lieu de "Entrée")
- Permettez de fermer le clavier après la recherche

## Critères de validation

Votre implémentation est correcte si:

- [ ] La recherche fonctionne avec le nom du Pokémon
- [ ] La recherche fonctionne avec le numéro du Pokémon
- [ ] La recherche est insensible à la casse
- [ ] Il y a un délai avant de filtrer (debouncing)
- [ ] Un message s'affiche quand aucun résultat n'est trouvé
- [ ] On peut effacer la recherche facilement
- [ ] La liste complète réapparaît quand on efface
- [ ] L'interface reste fluide pendant la saisie

## Pour aller plus loin

### Améliorations possibles

- Recherche par type de Pokémon
- Historique des recherches récentes
- Suggestions automatiques pendant la frappe
- Recherche phonétique (tolérance aux fautes de frappe)
- Recherche avancée avec opérateurs (ET, OU)
- Mise en surbrillance des termes trouvés dans les résultats

### Défis supplémentaires

- Intégrer la recherche avec la pagination
- Sauvegarder les recherches favorites
- Permettre la recherche par plage de numéros (ex: "1-50")
- Ajouter des filtres combinables (type + recherche)

## Ressources

### Documentation React Native

- TextInput: https://reactnative.dev/docs/textinput
- FlatList et filtrage: https://reactnative.dev/docs/flatlist

### Articles et tutoriels

- Debouncing en React: recherchez "react debounce hook"
- Optimisation des performances: React.memo et useMemo
- Gestion du clavier: KeyboardAvoidingView

### Bibliothèques utiles

- lodash.debounce pour le debouncing
- react-native-vector-icons pour les icônes
- Fuse.js pour la recherche floue avancée

## Notes de conception

### Structure de données

Réfléchissez à la structure de vos données:
- Conservez-vous la liste complète en mémoire?
- Faites-vous une nouvelle requête API pour chaque recherche?
- Comment gérer le cache des résultats?

### Architecture

Avec Expo Router, la logique de recherche est separee de la couche de navigation. Les ecrans sont definis dans `app/` et la logique dans `src/`.

Considerez la creation de:
- Un hook `src/hooks/useSearch.ts` pour encapsuler la logique
- Un composant `src/components/EmptySearchResults.tsx` pour l'etat vide
- Un fichier `src/utils/searchUtils.ts` pour les fonctions de filtrage
- La barre de recherche s'integre dans l'ecran de liste defini dans `app/(tabs)/index.tsx`

### Tests possibles

- Recherche avec des caractères spéciaux
- Recherche avec des espaces
- Recherche avec des nombres
- Comportement avec une liste vide
- Comportement pendant le chargement initial
