# TP 06 - Filtres par type

## Objectif

Implémenter un système de filtrage des Pokémon par type (Feu, Eau, Plante, etc.). L'utilisateur doit pouvoir sélectionner un ou plusieurs types pour afficher uniquement les Pokémon correspondants. Les filtres doivent être combinables entre eux et avec la recherche textuelle si elle existe.

## Prérequis

- Application Pokédex fonctionnelle avec liste de Pokémon
- Les données des Pokémon doivent inclure leur(s) type(s)
- Compréhension de `useState` et du filtrage de tableaux
- Notions de composants réutilisables

## Concepts clés

- Filtrage multi-critères sur des tableaux
- Gestion d'un état de sélection multiple
- Composants "chip" ou "badge" pour l'interface de filtre
- Logique combinatoire (ET/OU) entre les filtres
- Endpoint API pour les types: `https://pokeapi.co/api/v2/type/`
- Association entre types et couleurs

## Étapes de réalisation

### 1. Récupération de la liste des types

L'API PokeAPI fournit la liste complète des types.

Approches:
- Appel à l'endpoint `/api/v2/type/` pour obtenir tous les types
- Ou définition d'une liste statique des types principaux

Points à considérer:
- Certains types de l'API ne correspondent pas à des Pokémon jouables
- Filtrez les types pertinents (excluez "unknown" et "shadow")
- Stockez la liste des types dans un fichier de constantes ou via un appel API

### 2. Définition des couleurs par type

Associez une couleur à chaque type de Pokémon.

Créez un fichier `src/constants/typeColors.ts`:
- Feu: teinte rouge/orange
- Eau: teinte bleue
- Plante: teinte verte
- Électrik: teinte jaune
- Et ainsi de suite pour les 18 types

Questions:
- Comment structurer la correspondance type/couleur?
- Faut-il prévoir une couleur par défaut?

### 3. Création du composant filtre

Créez un composant `TypeFilter.tsx` ou `TypeChip.tsx`.

Fonctionnalités:
- Afficher chaque type sous forme de "chip" (pastille cliquable)
- Couleur de fond correspondant au type
- État visuel différent pour sélectionné/non sélectionné
- Possibilité de sélectionner plusieurs types simultanément

Disposition:
- Liste horizontale scrollable (ScrollView horizontal)
- Ou grille de pastilles sur plusieurs lignes
- Positionnement au-dessus de la liste (sous la barre de recherche si elle existe)

### 4. Gestion de l'état des filtres

Ajoutez un état pour suivre les types sélectionnés.

Questions de conception:
- Quel type de données utiliser? Un tableau de strings? Un Set?
- Comment gérer la sélection/désélection (toggle)?
- Faut-il un bouton "Tout effacer" pour réinitialiser les filtres?

### 5. Implémentation de la logique de filtrage

Créez la logique qui filtre les Pokémon selon les types sélectionnés.

Deux approches logiques:
- **Mode OU**: afficher les Pokémon qui ont AU MOINS UN des types sélectionnés
- **Mode ET**: afficher les Pokémon qui ont TOUS les types sélectionnés

Questions:
- Quel mode est le plus intuitif pour l'utilisateur?
- Comment gérer les Pokémon à double type?
- Que se passe-t-il quand aucun filtre n'est sélectionné?

### 6. Combinaison avec la recherche textuelle

Si vous avez implémenté la barre de recherche (TP 01), combinez les deux filtres.

Logique:
- Le Pokémon doit correspondre à la recherche ET aux filtres de type
- Les deux systèmes de filtrage s'appliquent en cascade
- L'effacement d'un filtre met à jour la liste immédiatement

### 7. Affichage du nombre de résultats

Indiquez à l'utilisateur combien de Pokémon correspondent aux filtres actifs.

Éléments:
- Compteur visible (ex: "25 Pokémon trouvés")
- Mise à jour en temps réel lors du changement de filtres
- Message spécifique quand aucun résultat ne correspond

### 8. Gestion des cas limites

Situations à gérer:
- Combinaison de filtres qui ne donne aucun résultat
- Interaction entre filtres et pagination
- Chargement des Pokémon par type depuis l'API
- Retrait du dernier filtre actif

## Points d'attention

### Performance

- Ne rechargez pas toute la liste à chaque changement de filtre
- Filtrez côté client si vous avez déjà les données
- Pour de grandes quantités, envisagez le filtrage côté API
- Utilisez `useMemo` pour éviter les recalculs inutiles

### Expérience utilisateur

- Les chips doivent être assez grands pour être facilement cliquables
- L'état sélectionné doit être visuellement distinct
- Le nombre de filtres actifs doit être visible
- Permettez de réinitialiser tous les filtres d'un coup

### Accessibilité

- Chaque chip doit avoir un label accessible
- Indiquez l'état sélectionné aux lecteurs d'écran
- Le contraste texte/fond doit être suffisant pour chaque couleur de type

## Critères de validation

Votre implémentation est correcte si:

- [ ] Tous les types principaux sont affichés
- [ ] Chaque type a sa couleur distinctive
- [ ] La sélection d'un type filtre correctement la liste
- [ ] La sélection multiple fonctionne
- [ ] La désélection d'un type met à jour la liste
- [ ] Un bouton permet de réinitialiser tous les filtres
- [ ] Le nombre de résultats est affiché
- [ ] La combinaison recherche + filtres fonctionne (si applicable)

## Pour aller plus loin

### Améliorations possibles

- Filtres sauvegardés dans les préférences utilisateur
- Compteur de Pokémon par type sur chaque chip
- Animation lors de l'ajout/retrait d'un filtre
- Filtres supplémentaires (génération, statistiques, poids, taille)
- Bascule entre mode OU et mode ET
- Tri des résultats (par numéro, nom, statistique)

### Défis supplémentaires

- Créer un écran de filtres avancés (bottom sheet ou modale)
- Implémenter des filtres de plage (HP entre 50 et 100)
- Ajouter un filtre par génération de Pokémon
- Sauvegarder des combinaisons de filtres en tant que préréglages

## Ressources

### Documentation API

- Types PokeAPI: https://pokeapi.co/docs/v2#types
- Endpoint: https://pokeapi.co/api/v2/type/

### Documentation React Native

- ScrollView horizontal: https://reactnative.dev/docs/scrollview
- TouchableOpacity: https://reactnative.dev/docs/touchableopacity

### Patterns recommandés

- Recherchez "React Native chip component"
- "Multi-select filter React Native"
- "Pokemon type colors hex codes"

### Bibliothèques utiles

- react-native-element-dropdown pour des filtres avancés
- @react-native-community/checkbox pour des sélections multiples

## Architecture suggérée

### Structure des fichiers

Avec Expo Router, les filtres sont des composants integres dans les ecrans definis dans `app/`. La logique et les composants restent dans `src/`.

```
app/
  (tabs)/
    index.tsx              (ecran de liste qui utilise les composants de filtre)
src/
  components/
    TypeChip.tsx
    TypeFilterBar.tsx
  constants/
    typeColors.ts
    pokemonTypes.ts
  hooks/
    useTypeFilter.ts
  utils/
    filterUtils.ts
```

### Format de données

Exemple de structure pour les types:
```typescript
interface PokemonType {
  name: string;
  color: string;
}

// Dans le hook ou le composant parent
const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
```

## Tests à effectuer

- Sélectionner chaque type individuellement
- Combiner plusieurs types et vérifier les résultats
- Désélectionner tous les filtres
- Combiner filtres de type et recherche textuelle
- Vérifier avec des Pokémon à double type
- Tester le scroll horizontal des chips
- Vérifier les couleurs en mode sombre (si applicable)
