# TP 17 - Gestion d'equipe

## Objectif

Créer un système de gestion d'équipe permettant à l'utilisateur de constituer une équipe de 6 Pokémon maximum, comme dans les jeux officiels. L'utilisateur doit pouvoir ajouter, retirer et réorganiser les Pokémon de son équipe, visualiser les forces et faiblesses de la composition, et sauvegarder plusieurs équipes.

## Prérequis

- Application Pokédex fonctionnelle avec écran de détail
- Compréhension du Context API ou d'un état global
- Connaissance d'AsyncStorage pour la persistance
- Notions de drag-and-drop (optionnel, pour la réorganisation)

## Concepts clés

- Gestion d'une liste ordonnée avec limite de taille (max 6)
- Persistance de données complexes (équipes multiples)
- Drag-and-drop pour la réorganisation
- Analyse de couverture de types
- Tableaux d'efficacité des types Pokémon
- Bottom sheet ou modale pour la sélection

## Étapes de réalisation

### 1. Conception de la structure de données

Définissez le format pour stocker une équipe.

Éléments d'une équipe:
- Nom personnalisé de l'équipe
- Liste de 1 à 6 Pokémon (ordonnée)
- Date de création/modification
- Identifiant unique

Éléments de chaque membre:
- Référence au Pokémon (ID)
- Position dans l'équipe (1 à 6)
- Surnom optionnel

Questions:
- Comment stocker plusieurs équipes?
- Faut-il stocker les données complètes du Pokémon ou juste l'ID?
- Comment gérer l'équipe "active"?

### 2. Création du Context d'équipe

Créez `src/contexts/TeamContext.tsx`.

Fonctionnalités du contexte:
- Liste des équipes sauvegardées
- Équipe active/courante
- Ajouter un Pokémon à l'équipe
- Retirer un Pokémon de l'équipe
- Réorganiser l'ordre des Pokémon
- Créer une nouvelle équipe
- Supprimer une équipe
- Renommer une équipe

Contraintes:
- Maximum 6 Pokémon par équipe
- Pas de doublon dans la même équipe (optionnel, selon votre choix)
- L'ajout doit être refusé si l'équipe est pleine (avec message)

### 3. Bouton "Ajouter à l'équipe"

Ajoutez un bouton sur l'écran de détail.

Comportement:
- Si l'équipe active a moins de 6 membres, ajouter directement
- Si l'équipe est pleine, proposer de remplacer un membre
- Si le Pokémon est déjà dans l'équipe, indiquer son statut
- Feedback visuel après l'ajout (animation, toast)

Interface:
- Bouton avec icône de "+1" ou d'équipe
- Indication si le Pokémon est déjà dans l'équipe
- Badge sur le bouton avec le nombre actuel de membres

### 4. Écran de gestion de l'équipe

Creez l'ecran de gestion d'equipe. Avec Expo Router, creez le fichier `app/team/[teamId].tsx` pour la route dynamique d'une equipe. La logique d'affichage peut etre dans un composant `src/components/team/TeamView.tsx`.

Sections de l'écran:
- Nom de l'équipe (éditable)
- 6 emplacements (slots) pour les Pokémon
- Emplacements vides cliquables pour ajouter un Pokémon
- Résumé des types de l'équipe
- Analyse des forces et faiblesses

Affichage de chaque slot:
- Image du Pokémon
- Nom (et surnom si défini)
- Types
- Bouton pour retirer de l'équipe
- Indicateur de position (1 à 6)

### 5. Réorganisation par drag-and-drop

Permettez de réordonner les Pokémon de l'équipe par glisser-déposer.

Approches:
- Appui long pour activer le mode réorganisation
- Glisser un Pokémon vers une autre position
- Animation de déplacement fluide
- Feedback visuel pendant le glissement

Alternatives si le drag-and-drop est trop complexe:
- Boutons "monter/descendre"
- Sélectionner deux Pokémon pour les échanger
- Menu contextuel avec options de déplacement

### 6. Analyse de l'équipe

Calculez et affichez les forces et faiblesses de la composition.

Éléments d'analyse:
- Couverture de types (quels types sont représentés dans l'équipe)
- Faiblesses communes (types qui menacent plusieurs membres)
- Types non couverts (aucun Pokémon de ce type ou capable de toucher ce type)
- Score global de diversité

Tableau d'efficacité:
- Utilisez la table des types Pokémon (18x18)
- Calculez les résistances et faiblesses de chaque membre
- Identifiez les synergies et les redondances

Affichage:
- Grille colorée montrant la couverture
- Indicateurs vert/orange/rouge pour chaque type
- Suggestions d'amélioration ("Vous n'avez aucune couverture contre le type Fée")

### 7. Gestion de plusieurs équipes

Permettez de créer et gérer plusieurs équipes.

Fonctionnalités:
- Liste des équipes sauvegardées
- Créer une nouvelle équipe vide
- Dupliquer une équipe existante
- Supprimer une équipe (avec confirmation)
- Définir l'équipe active

Interface:
- Écran de liste des équipes
- Carte pour chaque équipe montrant les 6 Pokémon en miniature
- Bouton "Nouvelle équipe"
- Swipe pour supprimer ou action contextuelle

### 8. Persistance des données

Sauvegardez les équipes dans AsyncStorage.

Points techniques:
- Sérialisez les équipes en JSON
- Sauvegardez à chaque modification
- Chargez au démarrage de l'application
- Gérez la migration si le format change

Structure de stockage:
- Clé unique dans AsyncStorage
- Tableau d'objets équipe
- Référence à l'équipe active

### 9. Sélecteur de Pokémon

Créez un sélecteur pour ajouter des Pokémon depuis l'écran d'équipe.

Options:
- Bottom sheet avec la liste complète des Pokémon
- Barre de recherche intégrée
- Filtres rapides par type
- Indication des Pokémon déjà dans l'équipe

## Points d'attention

### Gestion des limites

- Empêchez strictement l'ajout au-delà de 6 Pokémon
- Gérez le cas d'une équipe vide (affichez un message d'encouragement)
- Validez les données chargées depuis AsyncStorage

### Performance

- Ne rechargez pas les détails des Pokémon à chaque render
- Mettez en cache les données des membres de l'équipe
- Le sélecteur de Pokémon doit être réactif même avec beaucoup de données

### Expérience utilisateur

- L'ajout et le retrait doivent être intuitifs
- La réorganisation doit être visuelle et satisfaisante
- Les messages doivent guider l'utilisateur ("Équipe complète!", "Ajouté avec succès")
- L'analyse doit être compréhensible même pour les débutants

### Cohérence des données

- Si un Pokémon est retiré et rajouté, il doit garder sa position logique
- Les données de l'équipe doivent être cohérentes après un crash
- Gérez le cas où les données API d'un Pokémon ne sont plus disponibles

## Critères de validation

Votre implémentation est correcte si:

- [ ] On peut ajouter un Pokémon à l'équipe depuis l'écran de détail
- [ ] L'équipe est limitée à 6 Pokémon
- [ ] Un écran affiche l'équipe complète avec les images
- [ ] On peut retirer un Pokémon de l'équipe
- [ ] On peut réorganiser l'ordre des Pokémon
- [ ] L'équipe persiste après fermeture de l'application
- [ ] Une analyse de couverture de types est affichée
- [ ] On peut gérer plusieurs équipes

## Pour aller plus loin

### Améliorations possibles

- Import/export d'équipes (format texte partageable)
- Recommandation de Pokémon pour compléter l'équipe
- Simulation de combat entre deux équipes
- Statistiques globales de l'équipe (total de stats, moyennes)
- Templates d'équipes populaires
- Mode "défi" (construire une équipe avec des contraintes)

### Défis supplémentaires

- Implémenter un vrai drag-and-drop avec react-native-draggable-flatlist
- Créer un écran "teambuilder" avec des filtres avancés
- Calculer la couverture offensive (quels types l'équipe peut toucher)
- Ajouter un système de "builds" (attaques, objets, nature) pour chaque Pokémon

## Ressources

### Mécanique Pokémon

- Table des types: recherchez "Pokemon type chart" pour la table d'efficacité complète
- PokeAPI types: https://pokeapi.co/docs/v2#types

### Documentation React Native

- FlatList: https://reactnative.dev/docs/flatlist
- AsyncStorage: https://react-native-async-storage.github.io/async-storage/

### Patterns recommandés

- Recherchez "React Native drag and drop list"
- "React Native reorderable list"
- "Pokemon type coverage calculator"

### Bibliothèques utiles

- react-native-draggable-flatlist pour le drag-and-drop
- @gorhom/bottom-sheet pour le sélecteur de Pokémon
- react-native-swipeable-item pour le swipe-to-delete

## Architecture suggérée

### Structure des fichiers

Avec Expo Router, les ecrans de gestion d'equipe sont definis dans le dossier `app/`. Vous pouvez creer un onglet dedie ou un groupe de routes.

```
app/
  (tabs)/
    team.tsx               (onglet equipe, ou lien vers les equipes)
  team/
    _layout.tsx            (layout Stack pour les ecrans d'equipe)
    index.tsx              (liste des equipes)
    [teamId].tsx           (detail/gestion d'une equipe specifique)
src/
  components/
    team/
      TeamSlot.tsx
      TeamAnalysis.tsx
      TypeCoverage.tsx
      PokemonSelector.tsx
  contexts/
    TeamContext.tsx
  hooks/
    useTeam.ts
    useTypeCoverage.ts
  utils/
    typeEffectiveness.ts
  services/
    teamStorageService.ts
```

Navigation entre les ecrans d'equipe:
- Depuis l'onglet equipe, `router.push('/team')` pour voir toutes les equipes
- Pour acceder a une equipe specifique, `router.push('/team/[teamId]')` en passant l'identifiant
- Recuperez l'identifiant de l'equipe avec `useLocalSearchParams()` dans `app/team/[teamId].tsx`

### Interface TypeScript

```typescript
interface TeamMember {
  pokemonId: number;
  nickname?: string;
  position: number;
}

interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

interface TeamContextType {
  teams: Team[];
  activeTeam: Team | null;
  addToTeam: (pokemonId: number) => boolean;
  removeFromTeam: (position: number) => void;
  reorderTeam: (fromIndex: number, toIndex: number) => void;
  createTeam: (name: string) => Team;
  deleteTeam: (teamId: string) => void;
  setActiveTeam: (teamId: string) => void;
}
```

## Tests à effectuer

- Ajouter 6 Pokémon et vérifier la limite
- Tenter d'ajouter un 7ème Pokémon
- Retirer un Pokémon et en ajouter un nouveau
- Réorganiser l'ordre et vérifier la persistance
- Créer plusieurs équipes et naviguer entre elles
- Supprimer une équipe et vérifier la mise à jour
- Fermer et rouvrir l'application pour vérifier la persistance
- Vérifier l'analyse de couverture de types
- Tester avec une équipe mono-type (toutes les faiblesses identiques)
