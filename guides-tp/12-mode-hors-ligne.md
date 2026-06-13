# TP 12 - Mode hors ligne

## Objectif

Implémenter un mode hors ligne complet permettant d'utiliser l'application sans connexion internet. Les données des Pokémon doivent être stockées dans une base de données locale SQLite, synchronisées quand le réseau est disponible, et l'utilisateur doit être informé de l'état de connectivité.

## Prérequis

- Application Pokédex fonctionnelle avec appels API
- Compréhension des bases de données relationnelles (SQL basique)
- Connaissance de la gestion asynchrone
- Notions de synchronisation de données

## Concepts clés

- expo-sqlite pour la base de données locale
- Détection de l'état réseau avec @react-native-community/netinfo
- Stratégie de cache "offline first"
- Synchronisation des données locales/distantes
- Migrations de schéma de base de données
- Gestion de la file d'attente des requêtes

## Étapes de réalisation

### 1. Installation des dépendances

Installez les modules nécessaires.

Commandes:
```bash
npx expo install expo-sqlite
npx expo install @react-native-community/netinfo
```

### 2. Conception du schéma de base de données

Définissez les tables nécessaires pour stocker les données des Pokémon.

Tables suggérées:
- `pokemon`: id, name, height, weight, sprites (JSON), types (JSON)
- `pokemon_stats`: pokemon_id, stat_name, base_stat
- `pokemon_moves`: pokemon_id, move_name (optionnel)
- `sync_metadata`: dernière synchronisation, version

Questions de conception:
- Quelles données sont essentielles en mode hors ligne?
- Comment stocker les données complexes (tableaux, objets imbriqués)?
- Faut-il stocker les images localement aussi?

### 3. Création du service de base de données

Créez `src/services/databaseService.ts`.

Fonctions nécessaires:
- Initialiser la base de données et créer les tables
- Insérer des données Pokémon
- Récupérer la liste des Pokémon
- Récupérer le détail d'un Pokémon
- Mettre à jour des données existantes
- Vérifier si des données existent localement

Points techniques:
- Utilisez les transactions pour les insertions multiples
- Préparez les requêtes SQL avec des paramètres (anti-injection)
- Gérez les erreurs de base de données

### 4. Détection de l'état réseau

Surveillez la connectivité pour adapter le comportement.

Implémentation:
- Utilisez NetInfo pour détecter l'état de connexion
- Créez un hook `useNetworkStatus` ou un Context dédié
- Écoutez les changements de connectivité en temps réel

Informations à suivre:
- Connecté ou non
- Type de connexion (WiFi, cellulaire)
- Qualité de la connexion

### 5. Stratégie "offline first"

Implémentez la logique de récupération des données.

Flux de données:
1. Vérifier si les données existent en local (SQLite)
2. Si oui, afficher immédiatement les données locales
3. Si connecté, récupérer les données fraîches de l'API en arrière-plan
4. Mettre à jour la base locale avec les nouvelles données
5. Mettre à jour l'affichage

Questions:
- Comment décider quand synchroniser?
- Que faire si les données locales sont périmées?
- Comment gérer le premier lancement (pas de données locales)?

### 6. Synchronisation initiale

Gérez le premier chargement quand la base locale est vide.

Approche:
- Affichez un écran de chargement initial
- Téléchargez les données essentielles (liste + détails basiques)
- Indiquez la progression du téléchargement
- Gérez l'interruption de la synchronisation

Points:
- Ne téléchargez pas tout d'un coup (par lots de 20-50)
- Permettez d'utiliser l'app dès que les premières données sont disponibles
- Continuez la synchronisation en arrière-plan

### 7. Indicateur de connectivité

Informez l'utilisateur de l'état réseau.

Éléments visuels:
- Bannière ou badge "Hors ligne" quand pas de connexion
- Indication de la dernière synchronisation
- Animation lors de la synchronisation
- Message quand des données ne sont pas disponibles hors ligne

Placement:
- En haut de l'écran (bannière persistante)
- Ou dans la barre de navigation
- Discret mais visible

### 8. Gestion des images hors ligne

Les images des Pokémon nécessitent un traitement spécial.

Options:
- Télécharger et stocker les images dans le système de fichiers local
- Utiliser un système de cache d'images (expo-image gère le cache automatiquement)
- Stocker les URLs et afficher un placeholder si l'image n'est pas en cache

Points techniques:
- Le cache d'images natif (expo-image) peut suffire dans beaucoup de cas
- Pour un mode hors ligne garanti, téléchargez les images explicitement
- Utilisez `expo-file-system` pour gérer les fichiers locaux
- Attention à l'espace disque utilisé

### 9. Migration du schéma

Prévoyez l'évolution de la base de données.

Approche:
- Versionnez votre schéma de base de données
- Créez des scripts de migration pour chaque version
- Vérifiez la version au démarrage et migrez si nécessaire

## Points d'attention

### Performance

- Les requêtes SQLite sont rapides mais doivent être optimisées
- Utilisez des index sur les colonnes fréquemment recherchées
- Les insertions en masse doivent utiliser des transactions
- Ne synchronisez pas toutes les données d'un coup

### Gestion de l'espace

- Évaluez l'espace nécessaire pour stocker les données
- Les images peuvent prendre beaucoup de place
- Proposez une option pour nettoyer le cache
- Informez l'utilisateur de l'espace utilisé

### Cohérence des données

- Gérez les conflits entre données locales et distantes
- La version la plus récente de l'API doit prévaloir
- Les favoris et préférences utilisateur sont prioritaires localement
- Horodatez les données pour savoir lesquelles sont les plus récentes

### Expérience utilisateur

- L'application doit être utilisable immédiatement (données locales)
- La synchronisation doit être transparente
- Le mode hors ligne ne doit pas dégrader l'expérience
- Indiquez clairement les fonctionnalités non disponibles hors ligne

## Critères de validation

Votre implémentation est correcte si:

- [ ] L'application fonctionne sans connexion internet (après un premier chargement)
- [ ] Les données sont stockées dans SQLite
- [ ] L'état réseau est détecté et affiché
- [ ] La synchronisation se fait automatiquement quand le réseau revient
- [ ] Le premier chargement télécharge les données essentielles
- [ ] Les images sont disponibles hors ligne (cache)
- [ ] Un indicateur montre la dernière synchronisation
- [ ] Les performances restent bonnes avec les données locales

## Pour aller plus loin

### Améliorations possibles

- Synchronisation sélective (uniquement les favoris en mode données mobiles)
- Téléchargement de données par génération
- Export/import de la base de données
- Statistiques d'utilisation du cache (taille, âge des données)
- Mode "économie de données" (pas d'images haute résolution)

### Défis supplémentaires

- Implémenter un système de file d'attente pour les actions hors ligne
- Synchronisation bidirectionnelle (si vous avez un backend personnalisé)
- Compression des données locales
- Pré-téléchargement intelligent basé sur les habitudes de l'utilisateur

## Ressources

### Documentation officielle

- expo-sqlite: https://docs.expo.dev/versions/latest/sdk/sqlite/
- NetInfo: https://github.com/react-native-netinfo/react-native-netinfo
- expo-file-system: https://docs.expo.dev/versions/latest/sdk/filesystem/

### Patterns recommandés

- Recherchez "offline first React Native strategy"
- "SQLite React Native tutorial"
- "React Native network detection"

### Bibliothèques utiles

- expo-sqlite pour la base de données
- @react-native-community/netinfo pour le réseau
- expo-file-system pour les fichiers locaux
- expo-image (cache d'images intégré)

## Architecture suggérée

### Structure des fichiers

La logique de mode hors ligne est entierement dans `src/`, independante du systeme de navigation. Avec Expo Router, le Provider de connectivite reseau s'integre dans le layout racine `app/_layout.tsx`.

```
app/
  _layout.tsx              (integre le NetworkProvider qui englobe toute l'application)
src/
  services/
    databaseService.ts
    syncService.ts
    networkService.ts
  hooks/
    useNetworkStatus.ts
    useOfflineData.ts
  contexts/
    NetworkContext.tsx
  database/
    migrations.ts
    schema.ts
```

### Stratégie de cache

```
Requête de données:
  1. Vérifier SQLite local
  2. Si données locales fraîches -> retourner
  3. Si connecté -> appel API
  4. Stocker en SQLite
  5. Retourner les données fraîches
  6. Si pas connecté et pas de données locales -> message d'erreur
```

## Tests à effectuer

- Lancer l'app sans connexion après un premier chargement
- Activer/désactiver le mode avion et observer le comportement
- Naviguer dans l'app en mode hors ligne (toutes les routes Expo Router doivent fonctionner)
- Vérifier la synchronisation au retour du réseau
- Tester le premier lancement sans connexion
- Vérifier l'espace disque utilisé
- Simuler une base de données corrompue
- Tester avec des données partiellement synchronisées
