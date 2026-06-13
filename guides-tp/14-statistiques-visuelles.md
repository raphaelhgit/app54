# TP 14 - Statistiques visuelles

## Objectif

Créer des visualisations graphiques des statistiques des Pokémon en utilisant des graphiques interactifs. L'écran de détail doit afficher les stats sous forme de graphique radar, barres ou jauge, et un écran de statistiques globales doit présenter des tendances sur l'ensemble du Pokédex.

## Prérequis

- Application Pokédex fonctionnelle avec données statistiques
- Compréhension des statistiques de base des Pokémon (HP, Attaque, Défense, etc.)
- Connaissance de la mise en page avec Flexbox
- Notions de manipulation de données (calculs, moyennes, regroupements)

## Concepts clés

- react-native-chart-kit pour les graphiques
- Ou react-native-svg-charts / victory-native comme alternatives
- Graphique radar (spider chart) pour les stats de base
- Graphiques en barres pour les comparaisons
- Graphiques circulaires pour les répartitions
- Calculs statistiques (moyenne, médiane, distribution)
- Animations des graphiques

## Étapes de réalisation

### 1. Installation de la bibliothèque de graphiques

Choisissez et installez une bibliothèque de graphiques.

Options principales:
```bash
npm install react-native-chart-kit react-native-svg
```

Ou alternatives:
```bash
npm install victory-native react-native-svg
```

Chaque bibliothèque a ses avantages:
- react-native-chart-kit: simple, bien documentée
- victory-native: plus flexible, plus de types de graphiques
- react-native-svg: bas niveau, contrôle total

### 2. Graphique radar des statistiques de base

Créez un graphique radar pour visualiser les 6 stats de base.

Statistiques à représenter:
- HP (Points de vie)
- Attaque
- Défense
- Attaque Spéciale
- Défense Spéciale
- Vitesse

Implémentation:
- Chaque axe du radar correspond à une statistique
- La valeur maximale théorique est 255
- Le Pokémon actuel forme un polygone coloré
- Optionnellement, superposez un second Pokémon pour comparer

Questions:
- Comment normaliser les valeurs pour le radar (0-255 ou 0-max observé)?
- Quelles couleurs utiliser pour chaque stat?
- Comment rendre le graphique lisible sur petit écran?

### 3. Barres de statistiques animées

Créez des barres horizontales pour chaque stat.

Éléments visuels:
- Barre de fond (grise) représentant le maximum
- Barre colorée représentant la valeur actuelle
- Animation de remplissage de gauche à droite
- Valeur numérique affichée sur ou à côté de la barre
- Couleur qui varie selon la valeur (rouge = faible, vert = élevé)

Seuils de couleur suggérés:
- 0-49: rouge (faible)
- 50-89: orange (moyen)
- 90-119: jaune (bon)
- 120-149: vert clair (très bon)
- 150+: vert foncé (excellent)

### 4. Intégration dans l'écran de détail

Remplacez ou complétez l'affichage actuel des statistiques.

Approche:
- Section dédiée dans l'écran de détail
- Ou onglet "Stats" si vous utilisez des onglets
- Le graphique radar en haut, les barres en dessous
- Indication du BST (Base Stat Total)

### 5. Écran de statistiques globales

Créez un écran qui analyse l'ensemble des Pokémon.

Graphiques possibles:
- Répartition par type (camembert/donut)
- Moyenne des stats par type (barres groupées)
- Distribution des BST (histogramme)
- Top 10 des Pokémon par statistique

Données à calculer:
- Nombre de Pokémon par type
- Moyenne et médiane de chaque stat
- Pokémon avec les stats les plus élevées/basses
- Corrélations entre stats (attaque vs défense)

### 6. Graphique de répartition par type

Créez un graphique circulaire montrant la distribution des types.

Implémentation:
- Chaque segment représente un type
- La taille est proportionnelle au nombre de Pokémon
- La couleur correspond au type
- Légende avec les noms et pourcentages

Points:
- Gérez les Pokémon à double type (comptez-les dans les deux catégories ou choisissez le type principal)
- Triez les segments par taille pour la lisibilité

### 7. Classement par statistique

Créez une vue de classement.

Fonctionnalités:
- Sélecteur de statistique (HP, Attaque, etc.)
- Liste triée des Pokémon par cette stat
- Position/rang affiché
- Barre visuelle proportionnelle

Interface:
- Dropdown ou tabs pour choisir la stat
- Liste scrollable des résultats
- Mise en évidence des extrêmes (top 3, bottom 3)

### 8. Interactivité des graphiques

Rendez les graphiques interactifs.

Fonctionnalités:
- Toucher un segment du camembert affiche les détails
- Toucher une barre met en évidence la valeur
- Tooltip au survol/toucher
- Animation de transition entre les vues

## Points d'attention

### Performance

- Les graphiques SVG peuvent être coûteux avec beaucoup de données
- Calculez les statistiques globales une seule fois et mettez-les en cache
- Limitez le nombre de points de données dans les graphiques complexes
- Utilisez `useMemo` pour les calculs statistiques

### Lisibilité

- Les graphiques doivent être lisibles sur petit écran
- Les labels ne doivent pas se chevaucher
- Les couleurs doivent être distinguables
- Fournissez toujours les valeurs numériques en plus du visuel

### Accessibilité

- Les graphiques basés uniquement sur la couleur ne sont pas accessibles
- Ajoutez des labels textuels pour chaque donnée
- Fournissez une vue alternative en tableau
- Les contrastes doivent être suffisants

### Adaptation au thème

- Si vous avez le mode sombre (TP 03), adaptez les couleurs des graphiques
- Les axes et labels doivent être visibles dans les deux thèmes
- Le fond du graphique doit s'adapter

## Critères de validation

Votre implémentation est correcte si:

- [ ] Un graphique radar affiche les 6 stats de base
- [ ] Des barres animées montrent chaque statistique
- [ ] Les barres changent de couleur selon la valeur
- [ ] Le BST (total) est calculé et affiché
- [ ] Un écran de statistiques globales est disponible
- [ ] Au moins un graphique de répartition (type/stats) est implémenté
- [ ] Les graphiques sont lisibles et les valeurs numériques visibles
- [ ] Les animations des graphiques sont fluides

## Pour aller plus loin

### Améliorations possibles

- Comparaison de stats entre deux Pokémon sur le même radar
- Graphique de progression dans la chaine d'évolution
- Heatmap des efficacités de type
- Export des graphiques en image
- Statistiques personnalisées basées sur les Pokémon favoris

### Défis supplémentaires

- Créer un graphique radar entièrement avec react-native-svg (sans bibliothèque)
- Implémenter une animation de "reveal" des stats au scroll
- Créer un mode "analyse d'équipe" qui combine les stats de 6 Pokémon
- Ajouter des courbes de tendance sur les distributions

## Ressources

### Documentation des bibliothèques

- react-native-chart-kit: https://github.com/indiespirit/react-native-chart-kit
- victory-native: https://commerce.nearform.com/open-source/victory-native/
- react-native-svg: https://github.com/software-mansion/react-native-svg

### Patterns recommandés

- Recherchez "React Native radar chart"
- "react-native-chart-kit bar chart example"
- "React Native SVG custom chart"

### Ressources de design

- Palettes de couleurs pour graphiques: recherchez "data visualization color palette"
- Bonnes pratiques de dataviz: recherchez "chart design best practices"

## Architecture suggérée

### Structure des fichiers

Avec Expo Router, l'ecran de statistiques globales est defini dans le dossier `app/`. Les composants graphiques et la logique restent dans `src/`.

```
app/
  (tabs)/
    stats.tsx              (onglet statistiques globales, ou)
  stats.tsx                (page de statistiques accessible via router.push('/stats'))
src/
  components/
    charts/
      RadarChart.tsx
      StatBar.tsx
      StatBarList.tsx
      TypeDistributionChart.tsx
      StatRanking.tsx
  hooks/
    useGlobalStats.ts
  utils/
    statsCalculator.ts
```

### Interface TypeScript

```typescript
interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
}

interface GlobalStats {
  typeDistribution: { type: string; count: number }[];
  averageByType: { type: string; stats: PokemonStats }[];
  topBystat: { stat: string; pokemon: { name: string; value: number }[] }[];
}
```

## Tests à effectuer

- Vérifier les graphiques avec des Pokémon aux stats extrêmes
- Tester le graphique radar avec des stats très déséquilibrées
- Vérifier l'animation des barres au chargement
- Tester la répartition par type avec les données réelles
- Vérifier les calculs de moyenne et de total
- Tester la lisibilité en mode sombre
- Vérifier le comportement sur différentes tailles d'écran
- Interagir avec les graphiques (toucher, scroll)
