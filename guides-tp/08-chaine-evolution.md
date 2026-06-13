# TP 08 - Chaine d'évolution

## Objectif

Afficher la chaine d'évolution complète d'un Pokémon sur son écran de détail. L'utilisateur doit pouvoir visualiser les différentes formes d'évolution, les conditions d'évolution, et naviguer vers les fiches des autres Pokémon de la chaine.

## Prérequis

- Application Pokédex fonctionnelle avec écran de détail
- Compréhension des appels API imbriqués
- Connaissance de la navigation avec parametres via Expo Router
- Notions de structures de données récursives (arbres)

## Concepts clés

- Appels API chaînés (species -> evolution-chain)
- Structures de données récursives
- Parcours d'arbre pour extraire les évolutions
- Navigation interne entre fiches Pokemon avec Expo Router (`router.push`, `router.replace`)
- Gestion de chargement asynchrone séquentiel
- Composant de visualisation de chaine

## Étapes de réalisation

### 1. Compréhension de la structure API

L'API PokeAPI structure les évolutions de manière hiérarchique.

Chaine d'appels nécessaire:
- `/api/v2/pokemon/{id}` donne `species.url`
- `/api/v2/pokemon-species/{id}` donne `evolution_chain.url`
- `/api/v2/evolution-chain/{id}` donne la chaine complète

Structure de la réponse:
- La chaine est un arbre avec un noeud `chain`
- Chaque noeud contient `species`, `evolution_details` et `evolves_to`
- `evolves_to` est un tableau (certains Pokémon ont des évolutions multiples)
- Les détails d'évolution contiennent les conditions (niveau, objet, échange, etc.)

Prenez le temps d'explorer la réponse de l'API dans votre navigateur avant de coder.

### 2. Création du service d'évolution

Créez des fonctions dans `src/services/` pour récupérer les données.

Fonctions nécessaires:
- Récupérer les données de l'espèce (pokemon-species)
- Récupérer la chaine d'évolution
- Transformer la structure arborescente en format exploitable

Points techniques:
- L'URL de l'espèce est disponible dans les données du Pokémon
- Deux appels API supplémentaires sont nécessaires
- Gérez les erreurs pour chaque étape de la chaine

### 3. Transformation des données

La structure brute de l'API est complexe. Transformez-la en format simple.

Format cible suggéré:
- Un tableau d'étapes d'évolution
- Chaque étape contient: nom, ID, image, conditions d'évolution
- Gérez les évolutions ramifiées (ex: Évoli a 8 évolutions possibles)

Questions:
- Comment parcourir récursivement la structure `evolves_to`?
- Comment extraire l'ID du Pokémon depuis l'URL de l'espèce?
- Comment gérer les Pokémon sans évolution?

### 4. Affichage de la chaine simple

Commencez par afficher les chaines linéaires (A -> B -> C).

Éléments visuels:
- Image de chaque Pokémon de la chaine
- Nom et numéro sous chaque image
- Flèche ou indicateur entre les étapes
- Mise en évidence du Pokémon actuellement consulté

Disposition:
- Horizontale si la chaine est courte (2-3 étapes)
- Ou verticale avec scroll si nécessaire

### 5. Affichage des conditions d'évolution

Ajoutez les conditions entre chaque étape.

Types de conditions dans l'API:
- Niveau minimum (`min_level`)
- Objet nécessaire (`item`)
- Échange (`trigger: "trade"`)
- Bonheur (`min_happiness`)
- Moment de la journée (`time_of_day`)
- Et d'autres conditions spéciales

Affichage:
- Texte descriptif entre les flèches (ex: "Niv. 16", "Pierre Feu")
- Icône représentant la condition si possible
- Gestion du cas "conditions inconnues"

### 6. Gestion des évolutions ramifiées

Certains Pokémon ont plusieurs évolutions possibles.

Exemples:
- Évoli (8 évolutions)
- Debugant (3 évolutions)
- Chenipan (évolution linéaire mais dans un arbre)

Approche visuelle:
- Structure en arbre avec des ramifications
- Ou liste verticale des possibilités à chaque étape
- Clairement indiquer que ce sont des alternatives

### 7. Navigation entre les Pokemon

Rendez chaque Pokemon de la chaine cliquable.

Fonctionnalite:
- Toucher un Pokemon de la chaine navigue vers sa fiche
- L'ecran de detail se recharge avec les nouvelles donnees
- La chaine d'evolution reste visible et se met a jour

Points techniques avec Expo Router:
- Utilisez `router.push('/pokemon/[id]')` depuis le hook `useRouter()` d'expo-router pour empiler les ecrans (l'utilisateur peut revenir en arriere)
- Ou utilisez `router.replace('/pokemon/[id]')` pour remplacer l'ecran actuel (pas d'empilement dans l'historique)
- Recuperez l'ID du Pokemon dans l'ecran de detail avec `useLocalSearchParams()` d'expo-router
- Avec le routage base sur les fichiers, l'ecran de detail correspond au fichier `app/pokemon/[id].tsx`
- Considerez l'impact sur la pile de navigation: `router.push` empile, `router.replace` remplace

### 8. État de chargement

Gérez l'affichage pendant le chargement de la chaine.

Éléments:
- Placeholder ou skeleton pendant le chargement
- Gestion du cas où l'API ne répond pas
- Cache des chaines déjà chargées pour éviter les appels redondants

## Points d'attention

### Performance

- La chaine d'évolution nécessite 2-3 appels API supplémentaires
- Mettez en cache les résultats pour éviter les rechargements
- Chargez les images des évolutions en parallèle
- Ne bloquez pas l'affichage de la fiche en attendant la chaine

### Gestion des données

- Certains Pokémon n'ont pas d'évolution (affichez un message)
- La structure peut être profonde (3 niveaux: base, stade 1, stade 2)
- Les Pokémon légendaires et mythiques n'évoluent généralement pas
- Les méga-évolutions et formes régionales ne sont pas dans la chaine standard

### Expérience utilisateur

- La chaine doit être immédiatement compréhensible
- Le Pokémon actuel doit être clairement identifié
- Les conditions d'évolution doivent être lisibles
- La navigation entre les Pokémon doit être fluide

## Critères de validation

Votre implémentation est correcte si:

- [ ] La chaine d'évolution s'affiche sur l'écran de détail
- [ ] Les images de chaque Pokémon sont visibles
- [ ] Les conditions d'évolution sont affichées
- [ ] Le Pokémon actuel est mis en évidence
- [ ] Les évolutions ramifiées sont gérées (ex: Évoli)
- [ ] On peut naviguer vers un autre Pokémon de la chaine
- [ ] Un message s'affiche pour les Pokémon sans évolution
- [ ] Le chargement est géré avec un indicateur visuel

## Pour aller plus loin

### Améliorations possibles

- Animation de la chaine (les flèches s'animent)
- Affichage des méga-évolutions si disponibles
- Préchargement des données des Pokémon voisins dans la chaine
- Affichage du sprite shiny en option
- Indication du pourcentage de complétion de la chaine dans le Pokédex

### Défis supplémentaires

- Créer un arbre visuel interactif pour les évolutions complexes
- Afficher les formes régionales (Aloha, Galar, Hisui)
- Implémenter un système de "suivi d'évolution" (quels Pokémon il me manque)
- Animer la transition entre les formes lors du clic

## Ressources

### Documentation API

- Evolution Chain: https://pokeapi.co/docs/v2#evolution-chains
- Pokemon Species: https://pokeapi.co/docs/v2#pokemon-species

### Patterns recommandés

- Recherchez "React recursive component tree"
- "React Native tree view component"
- "Chaining async API calls React"

### Bibliothèques utiles

- react-native-svg pour dessiner des lignes de connexion
- axios pour faciliter les appels API chainés

## Architecture suggérée

### Structure des fichiers

Avec Expo Router, la chaine d'evolution est un composant integre dans l'ecran de detail `app/pokemon/[id].tsx`. La logique et les composants restent dans `src/`.

```
app/
  pokemon/
    [id].tsx               (ecran de detail qui inclut le composant EvolutionChain)
src/
  services/
    evolutionService.ts
  components/
    evolution/
      EvolutionChain.tsx
      EvolutionStage.tsx
      EvolutionArrow.tsx
      EvolutionCondition.tsx
  types/
    evolution.ts
```

### Interface TypeScript

```typescript
interface EvolutionStage {
  id: number;
  name: string;
  imageUrl: string;
  conditions: EvolutionCondition[];
}

interface EvolutionCondition {
  trigger: string;
  minLevel?: number;
  item?: string;
  timeOfDay?: string;
  minHappiness?: number;
}

type EvolutionChain = EvolutionStage[][];
// Tableau de niveaux, chaque niveau contenant les alternatives
```

## Tests à effectuer

- Pokémon avec évolution linéaire simple (Salamèche -> Reptincel -> Dracaufeu)
- Pokémon avec évolutions multiples (Évoli)
- Pokémon sans évolution (Absol, Tauros)
- Pokémon au milieu de la chaine (Reptincel)
- Pokémon bébé avec pré-évolution (Pichu -> Pikachu -> Raichu)
- Navigation entre les Pokémon de la chaine
- Chargement avec une connexion lente
