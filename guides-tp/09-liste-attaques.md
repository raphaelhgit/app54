# TP 09 - Liste des attaques

## Objectif

Afficher la liste complète des attaques (moves) qu'un Pokémon peut apprendre, avec leurs détails (puissance, précision, type, catégorie). L'utilisateur doit pouvoir filtrer et trier les attaques, et consulter les détails de chacune.

## Prérequis

- Application Pokédex fonctionnelle avec écran de détail
- Compréhension des appels API et de la gestion de données
- Connaissance de FlatList et SectionList
- Notions de tri et filtrage de tableaux

## Concepts clés

- Endpoint API `pokemon.moves` et détails de chaque move
- Chargement à la demande des détails d'attaques
- SectionList pour grouper les attaques par méthode d'apprentissage
- Tri multi-critères (puissance, nom, type)
- Modale ou écran de détail pour une attaque
- Gestion de grandes quantités de données

## Étapes de réalisation

### 1. Compréhension des données d'attaques

L'API PokeAPI fournit les attaques dans les données du Pokémon.

Structure:
- `pokemon.moves` contient un tableau d'attaques
- Chaque entrée a `move.name`, `move.url`, et `version_group_details`
- Les `version_group_details` indiquent comment le Pokémon apprend l'attaque
- Les détails complets nécessitent un appel à `/api/v2/move/{id}`

Méthodes d'apprentissage:
- `level-up`: apprise en montant de niveau
- `machine`: apprise via CT/CS
- `tutor`: apprise via tuteur
- `egg`: attaque héritée par reproduction

### 2. Récupération et transformation des données

Créez un service pour gérer les attaques.

Points techniques:
- Les données de base (nom, URL) sont déjà dans les données du Pokémon
- Les détails (puissance, précision, type) nécessitent des appels supplémentaires
- Un Pokémon peut avoir 50+ attaques, chargez les détails progressivement

Stratégie de chargement:
- Chargez d'abord la liste des noms
- Chargez les détails à la demande (quand l'utilisateur consulte une attaque)
- Ou chargez les détails par batch (10 à la fois)
- Mettez en cache les détails déjà chargés

### 3. Affichage de la liste des attaques

Créez un composant pour afficher les attaques.

Options d'affichage:
- Section dans l'écran de détail du Pokémon
- Onglet dédié dans l'écran de détail
- Écran séparé accessible depuis le détail

Informations à afficher pour chaque attaque:
- Nom de l'attaque
- Type (avec la couleur correspondante)
- Catégorie (physique, spécial, statut)
- Puissance et précision
- Méthode d'apprentissage et niveau (si par niveau)

### 4. Regroupement par méthode d'apprentissage

Organisez les attaques par sections.

Utilisez SectionList pour créer des groupes:
- "Par montée de niveau" (triées par niveau)
- "Par CT/CS"
- "Par tuteur"
- "Par reproduction"

Points:
- Chaque section a un titre distinct
- Les attaques par niveau sont triées par niveau croissant
- Les autres sections sont triées par nom

### 5. Filtrage des attaques

Ajoutez des options de filtrage.

Critères de filtre:
- Par type d'attaque (Feu, Eau, etc.)
- Par catégorie (Physique, Spécial, Statut)
- Par méthode d'apprentissage
- Par recherche textuelle sur le nom

Interface:
- Barre de filtres au-dessus de la liste
- Sélecteurs ou chips pour les critères
- Compteur de résultats

### 6. Tri des attaques

Permettez de trier les attaques.

Critères de tri:
- Par puissance (décroissante)
- Par précision (décroissante)
- Par nom (alphabétique)
- Par niveau d'apprentissage

Interface:
- Bouton de tri avec menu déroulant
- Indication du tri actif

### 7. Détail d'une attaque

Affichez les informations complètes d'une attaque sélectionnée.

Approche:
- Modale ou bottom sheet au clic sur une attaque (avec un composant `Modal` ou `@gorhom/bottom-sheet`)
- Ou un ecran dedie accessible via `router.push('/pokemon/[id]/move/[moveId]')` avec Expo Router
- Ou expansion en place (accordeon)

Informations détaillées:
- Description textuelle de l'attaque
- PP (Power Points) maximum
- Priorité de l'attaque
- Effets secondaires
- Taux d'effet secondaire

### 8. Gestion du chargement progressif

Optimisez le chargement des nombreuses attaques.

Stratégie:
- Affichez d'abord les noms (données déjà disponibles)
- Chargez les détails quand la section est visible
- Indicateur de chargement pour les détails en cours de récupération
- Cache global des attaques (une attaque peut être commune à plusieurs Pokémon)

## Points d'attention

### Performance

- Un Pokémon peut avoir 50 à 100+ attaques
- Ne chargez pas tous les détails en une fois
- Utilisez la virtualisation de FlatList/SectionList
- Implémentez un cache partagé entre les fiches Pokémon

### Gestion des données

- Filtrez les données par version du jeu (les attaques varient selon les générations)
- Certaines attaques n'ont pas de puissance (attaques de statut)
- Les noms d'attaques de l'API sont en anglais (kebab-case)
- Transformez les noms pour l'affichage (remplacez les tirets par des espaces)

### Expérience utilisateur

- La liste ne doit pas submerger l'utilisateur
- Les filtres doivent être facilement accessibles
- L'information la plus importante doit être visible sans interaction supplémentaire
- Permettez une navigation rapide entre les sections

## Critères de validation

Votre implémentation est correcte si:

- [ ] La liste des attaques s'affiche pour chaque Pokémon
- [ ] Les attaques sont groupées par méthode d'apprentissage
- [ ] Le type de chaque attaque est indiqué avec sa couleur
- [ ] La puissance et la précision sont affichées
- [ ] Un filtre par type ou catégorie fonctionne
- [ ] Le tri des attaques est opérationnel
- [ ] Les détails d'une attaque sont consultables
- [ ] Le chargement est géré sans bloquer l'interface

## Pour aller plus loin

### Améliorations possibles

- Comparaison des attaques entre deux Pokémon
- Recommandation du meilleur moveset
- Indication des attaques exclusives (signature moves)
- Filtrage par génération de jeu
- Traduction des noms d'attaques en français (via l'API)

### Défis supplémentaires

- Implémenter un calculateur de dégâts simplifié
- Créer un "move planner" pour planifier les 4 attaques du Pokémon
- Afficher l'efficacité de chaque attaque contre un type donné
- Animer l'apparition des sections

## Ressources

### Documentation API

- Moves: https://pokeapi.co/docs/v2#moves
- Move details: https://pokeapi.co/api/v2/move/{id}
- Pokemon moves: `pokemon.moves` dans les données du Pokémon

### Documentation React Native

- SectionList: https://reactnative.dev/docs/sectionlist
- Modal: https://reactnative.dev/docs/modal

### Patterns recommandés

- Recherchez "React Native SectionList example"
- "Lazy loading data React Native"
- "React Native accordion component"

### Bibliothèques utiles

- @gorhom/bottom-sheet pour les modales de détail
- react-native-collapsible pour les sections accordéon

## Architecture suggérée

### Structure des fichiers

```
src/
  services/
    moveService.ts
  components/
    moves/
      MoveList.tsx
      MoveCard.tsx
      MoveDetail.tsx
      MoveFilter.tsx
  types/
    move.ts
  hooks/
    useMoves.ts
```

### Interface TypeScript

```typescript
interface Move {
  id: number;
  name: string;
  type: string;
  category: 'physical' | 'special' | 'status';
  power: number | null;
  accuracy: number | null;
  pp: number;
  learnMethod: string;
  levelLearnedAt?: number;
}

interface MoveSection {
  title: string;
  data: Move[];
}
```

## Tests à effectuer

- Pokémon avec beaucoup d'attaques (ex: Mew qui peut tout apprendre)
- Pokémon avec peu d'attaques
- Filtrage par type et vérification des résultats
- Tri par puissance et vérification de l'ordre
- Consultation des détails de plusieurs attaques
- Scroll fluide dans une longue liste
- Retour à l'écran de détail depuis la liste des attaques
