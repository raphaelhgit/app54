# TP 07 - Comparateur de Pokémon

## Objectif

Créer un écran de comparaison permettant de mettre côte à côte les statistiques de deux ou plusieurs Pokémon. L'utilisateur doit pouvoir sélectionner des Pokémon depuis la liste et visualiser leurs différences de manière claire et visuelle.

## Prérequis

- Application Pokédex fonctionnelle avec écran de détail
- Données statistiques des Pokémon disponibles (HP, Attaque, Défense, etc.)
- Comprehension de la navigation entre ecrans avec Expo Router
- Connaissance de la mise en page avec Flexbox

## Concepts clés

- Navigation avec passage de parametres via Expo Router (`router.push`, `useLocalSearchParams`)
- Gestion d'un état de sélection multi-éléments
- Mise en page comparative (colonnes parallèles)
- Barres de progression pour visualiser les statistiques
- Calcul de différences et pourcentages
- Composants de visualisation de données

## Étapes de réalisation

### 1. Conception de l'écran de comparaison

Planifiez la mise en page de l'écran comparatif.

Structure recommandée:
- En-tête avec les images des Pokémon sélectionnés
- Tableau comparatif des statistiques
- Barres visuelles côte à côte pour chaque stat
- Section résumé (quel Pokémon est "meilleur" globalement)

Questions de design:
- Comparez-vous 2 Pokémon ou permettez-vous d'en comparer plus?
- Comment disposer les informations de manière lisible?
- Comment indiquer visuellement quel Pokémon a la meilleure statistique?

### 2. Mécanisme de sélection des Pokémon

Implémentez un moyen de sélectionner les Pokémon à comparer.

Approches possibles:
- Bouton "Comparer" sur l'écran de détail qui ajoute le Pokémon à la sélection
- Mode de sélection dans la liste (appui long pour sélectionner)
- Sélecteur déroulant dans l'écran de comparaison

Gestion de l'état:
- Stockez les Pokémon sélectionnés dans un état partagé (Context ou state lifting)
- Limitez le nombre de Pokémon comparables (2 ou 3 maximum)
- Permettez de retirer un Pokémon de la sélection

### 3. Creation de l'ecran de comparaison

Creez l'ecran de comparaison. Avec Expo Router, creez le fichier `app/compare.tsx` (ou `app/(tabs)/compare.tsx` pour un onglet) qui definit la route. La logique de comparaison peut etre extraite dans un composant `src/components/compare/CompareView.tsx`.

Sections de l'écran:
- Zone de sélection (avec les emplacements vides à remplir)
- Informations générales (types, taille, poids)
- Statistiques de base (HP, Attaque, Défense, Att. Spé., Déf. Spé., Vitesse)
- Total des statistiques

### 4. Visualisation des statistiques

Créez des barres comparatives pour chaque statistique.

Implémentation:
- Deux barres côte à côte pour chaque stat
- Largeur proportionnelle à la valeur (max théorique: 255)
- Couleur différente pour chaque Pokémon
- Mise en évidence de la valeur la plus élevée

Considérations:
- Le nom de la statistique au centre ou à gauche
- Les valeurs numériques affichées sur ou à côté des barres
- Un code couleur pour indiquer l'avantage (vert pour le meilleur, rouge pour le moins bon)

### 5. Calcul des avantages

Ajoutez une analyse comparative.

Éléments à calculer:
- Différence pour chaque statistique
- Total des stats (Base Stat Total)
- Pourcentage de supériorité
- Nombre de stats où chaque Pokémon est supérieur

Affichage:
- Résumé textuel ("Pikachu est plus rapide", "Dracaufeu a plus d'attaque")
- Score global de comparaison
- Indication visuelle claire du "vainqueur" pour chaque catégorie

### 6. Navigation vers l'ecran de comparaison

Integrez l'acces a la comparaison dans la navigation.

Avec Expo Router, la navigation se fait par le systeme de fichiers. Creez un fichier `app/compare.tsx` (ou `app/(tabs)/compare.tsx` pour un onglet dedie).

Options:
- Onglet dedie: ajoutez un fichier dans `app/(tabs)/compare.tsx` et configurez-le dans `app/(tabs)/_layout.tsx`
- Bouton flottant (FAB) qui apparait quand des Pokemon sont selectionnes, utilisant `router.push('/compare')` depuis le hook `useRouter()` d'expo-router
- Option dans le menu de navigation

Points:
- Le bouton ne doit apparaitre que quand au moins 2 Pokemon sont selectionnes
- Affichez un badge avec le nombre de Pokemon selectionnes
- Permettez d'acceder a l'ecran de comparaison depuis plusieurs endroits avec `router.push('/compare')`

### 7. Fonctionnalité de remplacement

Permettez de changer un Pokémon dans la comparaison.

Mécanisme:
- Toucher sur l'image d'un Pokémon ouvre la liste de sélection
- Recherche rapide dans le sélecteur
- Remplacement immédiat avec mise à jour de la comparaison

## Points d'attention

### Performance

- Chargez les détails des Pokémon de manière parallèle (Promise.all)
- Mettez en cache les données déjà chargées
- Évitez de recharger les données si le Pokémon est déjà en mémoire

### Expérience utilisateur

- La comparaison doit être lisible et intuitive
- Les couleurs doivent différencier clairement les Pokémon
- Permettez le scroll si les informations dépassent l'écran
- Ajoutez un geste de swipe pour naviguer entre les catégories de stats

### Accessibilité

- Les barres de progression doivent avoir des labels textuels
- Les couleurs seules ne doivent pas être le seul indicateur
- Les valeurs numériques doivent toujours être affichées

## Critères de validation

Votre implémentation est correcte si:

- [ ] L'utilisateur peut sélectionner au moins 2 Pokémon
- [ ] L'écran de comparaison affiche les deux Pokémon
- [ ] Toutes les statistiques de base sont comparées visuellement
- [ ] Les barres de progression sont proportionnelles aux valeurs
- [ ] Le Pokémon avec la meilleure stat est mis en évidence
- [ ] On peut remplacer un Pokémon dans la comparaison
- [ ] Le total des stats est calculé et affiché
- [ ] L'interface est lisible et intuitive

## Pour aller plus loin

### Améliorations possibles

- Comparaison de plus de 2 Pokémon (en tableau)
- Graphique radar (spider chart) pour une vue d'ensemble
- Prise en compte des types pour l'analyse (avantages/faiblesses)
- Historique des comparaisons
- Partage de la comparaison en image
- Suggestion de Pokémon similaires

### Défis supplémentaires

- Implémenter un graphique radar avec react-native-svg
- Calculer l'efficacité des types entre les Pokémon comparés
- Ajouter une simulation de combat simplifiée
- Créer une animation de "versus" lors de l'ouverture de la comparaison

## Ressources

### Documentation API

- Statistiques PokeAPI: https://pokeapi.co/docs/v2#pokemon
- Les stats de base sont dans `pokemon.stats`

### Documentation React Native

- Flexbox: https://reactnative.dev/docs/flexbox
- View: https://reactnative.dev/docs/view
- Dimensions: https://reactnative.dev/docs/dimensions

### Patterns recommandés

- Recherchez "React Native progress bar component"
- "Side by side comparison layout React Native"
- "React Native animated bar chart"

### Bibliothèques utiles

- react-native-svg pour des graphiques personnalisés
- react-native-chart-kit pour des graphiques radar
- victory-native pour des visualisations avancées

## Architecture suggérée

### Structure des fichiers

Avec Expo Router, l'ecran de comparaison est defini dans le dossier `app/`. La logique metier et les composants restent dans `src/`.

```
app/
  (tabs)/
    compare.tsx          (ecran de comparaison - onglet ou page)
src/
  components/
    compare/
      StatBar.tsx
      CompareHeader.tsx
      StatRow.tsx
      PokemonSelector.tsx
  contexts/
    CompareContext.tsx (optionnel)
  hooks/
    useCompare.ts
```

### Interface TypeScript

```typescript
interface CompareState {
  pokemon: (PokemonDetail | null)[];
  addPokemon: (pokemon: PokemonDetail) => void;
  removePokemon: (index: number) => void;
  replacePokemon: (index: number, pokemon: PokemonDetail) => void;
  clearAll: () => void;
}
```

## Tests à effectuer

- Comparer deux Pokémon avec des stats très différentes
- Comparer deux Pokémon identiques
- Remplacer un Pokémon dans la comparaison
- Vérifier les calculs de totaux et pourcentages
- Tester l'affichage sur différentes tailles d'écran
- Naviguer vers la comparaison depuis différents endroits
- Vérifier le comportement avec des données manquantes
