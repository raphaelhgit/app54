# TP 04 - Pull-to-refresh

## Objectif

Implémenter la fonctionnalité pull-to-refresh sur la liste des Pokémon. L'utilisateur doit pouvoir tirer la liste vers le bas pour déclencher un rechargement des données, avec un indicateur visuel de rafraîchissement.

## Prérequis

- Application Pokedex fonctionnelle avec une FlatList (ecran de liste defini dans `app/(tabs)/index.tsx` avec Expo Router)
- Compréhension des props de FlatList
- Connaissance des appels API asynchrones
- Gestion d'état avec `useState`

## Concepts clés

- Propriété `refreshing` de FlatList
- Callback `onRefresh` de FlatList
- RefreshControl et sa personnalisation
- Gestion des états de chargement
- Rechargement des données depuis l'API
- Gestion d'erreur lors du rafraîchissement

## Étapes de réalisation

### 1. Compréhension du mécanisme natif

React Native intègre nativement le pull-to-refresh via FlatList.

Propriétés concernées:
- `refreshing`: booléen indiquant si le rafraîchissement est en cours
- `onRefresh`: fonction appelée quand l'utilisateur tire vers le bas

Prenez le temps de lire la documentation de ces deux props avant de commencer.

### 2. Ajout de l'état de rafraîchissement

Dans votre écran de liste, ajoutez un état pour suivre le rafraîchissement.

Questions:
- Faut-il un état séparé pour le rafraîchissement ou réutiliser l'état de chargement existant?
- Comment différencier le chargement initial du rafraîchissement?

### 3. Implémentation de la fonction de rafraîchissement

Créez une fonction `handleRefresh` qui:
- Passe l'état de rafraîchissement à `true`
- Réinitialise la liste à la première page
- Recharge les données depuis l'API
- Passe l'état de rafraîchissement à `false` une fois terminé

Points techniques:
- La fonction doit être asynchrone
- Gérez le cas où l'API est indisponible
- Réinitialisez la pagination si vous en avez une

### 4. Connexion à la FlatList

Ajoutez les props nécessaires à votre FlatList existante.

Vérifications:
- Le spinner natif apparaît quand on tire vers le bas
- Le spinner disparaît quand les données sont rechargées
- La liste se remet en position normale après le rafraîchissement

### 5. Personnalisation du RefreshControl

Adaptez l'apparence de l'indicateur de rafraîchissement.

Options de personnalisation:
- Couleur de l'indicateur (propriété `colors` sur Android, `tintColor` sur iOS)
- Titre affiché pendant le rafraîchissement (iOS: `title`)
- Couleur de fond du RefreshControl

Considérations:
- Si vous avez implémenté le mode sombre (TP 03), adaptez les couleurs
- Respectez la charte graphique de votre application

### 6. Gestion des erreurs de rafraîchissement

Gérez le cas où le rechargement échoue.

Scénarios:
- Pas de connexion internet
- Erreur serveur de l'API
- Timeout de la requête

Solutions possibles:
- Afficher un message temporaire (toast/snackbar)
- Conserver les données existantes
- Proposer un bouton de réessai

### 7. Réinitialisation de la pagination

Si votre liste utilise la pagination infinie, le rafraîchissement doit:
- Remettre le curseur de pagination au début
- Vider la liste existante avant de recharger
- Recharger la première page uniquement

Questions:
- Comment réinitialiser proprement l'offset ou le curseur?
- Faut-il vider la liste avant ou après avoir reçu les nouvelles données?

## Points d'attention

### Performance

- Le rafraîchissement ne doit pas bloquer l'interface
- Évitez les rafraîchissements en cascade (double pull)
- Annulez la requête précédente si un nouveau rafraîchissement est déclenché

### Expérience utilisateur

- L'indicateur doit être visible et clair
- Le rafraîchissement doit être suffisamment rapide
- Les données doivent effectivement se mettre à jour
- L'utilisateur ne doit pas perdre sa position de scroll après le rafraîchissement

### Cohérence des données

- Après un rafraîchissement, la liste doit refléter l'état actuel de l'API
- Les données en cache doivent être mises à jour
- Si vous avez un système de favoris, il ne doit pas être affecté

## Critères de validation

Votre implémentation est correcte si:

- [ ] Le geste de pull-to-refresh est reconnu
- [ ] Un indicateur visuel apparaît pendant le rafraîchissement
- [ ] Les données sont effectivement rechargées depuis l'API
- [ ] L'indicateur disparaît une fois le chargement terminé
- [ ] La pagination est réinitialisée correctement
- [ ] Les erreurs réseau sont gérées gracieusement
- [ ] Aucun crash en cas de pull rapide et répété
- [ ] Les couleurs de l'indicateur s'adaptent au thème (si TP 03 réalisé)

## Pour aller plus loin

### Améliorations possibles

- Afficher la date du dernier rafraîchissement
- Animation personnalisée pour le pull-to-refresh
- Rafraîchissement automatique après un certain temps d'inactivité
- Indicateur de rafraîchissement avec progression
- Pull-to-refresh sur l'écran de détail pour recharger les informations

### Défis supplémentaires

- Créer un RefreshControl personnalisé avec une animation de Pokéball
- Implémenter un système de cache intelligent qui évite les rechargements inutiles
- Ajouter un son ou une vibration lors du rafraîchissement
- Comparer les données avant/après pour indiquer les changements

## Ressources

### Documentation officielle

- FlatList: https://reactnative.dev/docs/flatlist
- RefreshControl: https://reactnative.dev/docs/refreshcontrol
- ScrollView refreshControl: https://reactnative.dev/docs/scrollview#refreshcontrol

### Patterns recommandés

- Recherchez "React Native pull to refresh custom"
- "FlatList pagination with refresh"
- "React Native RefreshControl styling"

### Bibliothèques utiles

- react-native-gesture-handler pour des gestes personnalisés
- lottie-react-native pour des animations personnalisées de rafraîchissement

## Tests à effectuer

- Tirer vers le bas et vérifier le rechargement
- Tirer rapidement plusieurs fois de suite
- Tirer pendant un chargement en cours
- Tester sans connexion internet
- Vérifier que la pagination fonctionne après un refresh
- Vérifier la cohérence des données après rafraîchissement
