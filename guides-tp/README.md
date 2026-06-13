# Guides de Travaux Pratiques - Pokédex React Native avec Expo SDK 54

Ce dossier contient 18 guides de travaux pratiques pour enrichir progressivement votre application Pokédex React Native. Chaque guide est conçu pour être autonome et fournit une démarche structurée sans donner l'implémentation complète.

## Utilisation des guides

### Pour les étudiants

1. Consultez le sommaire (00-sommaire.md) pour avoir une vue d'ensemble
2. Choisissez un TP selon votre niveau et vos intérêts
3. Lisez entièrement le guide avant de commencer à coder
4. Suivez les étapes proposées en réfléchissant aux questions posées
5. Consultez la documentation officielle en cas de blocage
6. Validez votre implémentation avec les critères fournis

### Pour les enseignants

Ces guides peuvent être utilisés:
- Comme support de TP autonomes
- Pour des projets notés
- Pour des travaux en binôme ou groupe
- Comme base d'évaluation pratique
- Pour différencier selon les niveaux

## Structure des guides

Chaque guide contient:

- **Objectif**: Description claire de la fonctionnalité à réaliser
- **Prérequis**: Connaissances et dépendances nécessaires
- **Concepts clés**: Notions techniques à maîtriser
- **Étapes de réalisation**: Démarche guidée avec questions et indices
- **Points d'attention**: Pièges courants et bonnes pratiques
- **Critères de validation**: Liste de vérification pour s'auto-évaluer
- **Pour aller plus loin**: Améliorations et défis supplémentaires
- **Ressources**: Documentation et liens utiles
- **Architecture suggérée**: Structure de fichiers et interfaces TypeScript

## Liste des TP

### Niveau Débutant

| TP | Titre | Fichier | Description |
|----|-------|---------|-------------|
| 01 | Barre de recherche | 01-barre-recherche.md | Filtrer les Pokémon par nom ou numéro |
| 02 | Système de favoris | 02-systeme-favoris.md | Sauvegarder localement les Pokémon préférés |
| 03 | Mode sombre | 03-mode-sombre.md | Implémenter un thème sombre avec Context |
| 04 | Pull-to-refresh | 04-pull-to-refresh.md | Actualiser la liste en tirant vers le bas |
| 05 | Animations de transition | 05-animations-transition.md | Ajouter des animations fluides |

### Niveau Intermédiaire

| TP | Titre | Fichier | Description |
|----|-------|---------|-------------|
| 06 | Filtres par type | 06-filtres-par-type.md | Filtrer les Pokémon selon leurs types |
| 07 | Comparateur | 07-comparateur-pokemon.md | Comparer les stats de plusieurs Pokémon |
| 08 | Chaîne d'évolution | 08-chaine-evolution.md | Afficher les évolutions d'un Pokémon |
| 09 | Liste des attaques | 09-liste-attaques.md | Afficher et filtrer les capacités |
| 10 | Lecture audio | 10-lecture-audio.md | Jouer les cris des Pokémon |

### Niveau Avancé

| TP | Titre | Fichier | Description |
|----|-------|---------|-------------|
| 11 | Réalité augmentée | 11-realite-augmentee.md | Visualiser les Pokémon en AR |
| 12 | Mode hors ligne | 12-mode-hors-ligne.md | Cache complet avec base de données |
| 13 | Système de capture | 13-systeme-capture.md | Capturer avec l'accéléromètre |
| 14 | Statistiques visuelles | 14-statistiques-visuelles.md | Graphiques et analytics |
| 15 | Internationalisation | 15-internationalisation.md | Support multi-langues |

### Fonctionnalités ludiques

| TP | Titre | Fichier | Description |
|----|-------|---------|-------------|
| 16 | Quiz interactif | 16-quiz-interactif.md | Deviner les Pokémon |
| 17 | Gestion d'équipe | 17-gestion-equipe.md | Constituer une équipe de 6 Pokémon |
| 18 | Scanner de cartes | 18-scanner-cartes.md | Reconnaissance d'image avec OCR |

## Recommandations pédagogiques

### Progression conseillée

1. **Semaine 1-2**: TP 01 et 02 (bases de l'interaction utilisateur)
2. **Semaine 3-4**: TP 03, 04, 05 (amélioration UX)
3. **Semaine 5-6**: TP 06, 07 (manipulation de données)
4. **Semaine 7-8**: TP 08, 09, 10 (API avancée)
5. **Projet final**: Combiner plusieurs TP avancés ou ludiques

### Évaluation

Critères suggérés:
- Fonctionnalité: 40% (ça marche?)
- Qualité du code: 30% (lisible, organisé, TypeScript)
- UX/UI: 20% (intuitive, responsive, accessible)
- Créativité: 10% (personnalisation, fonctionnalités bonus)

### Travail en groupe

Suggestions:
- Binôme: un TP par personne avec code review mutuelle
- Groupe de 3-4: chacun prend un TP, intégration finale commune
- Compétition amicale: qui réalise le mieux un TP donné

## Dépendances communes

Les TP utilisent principalement:

```bash
# Stockage
npx expo install @react-native-async-storage/async-storage

# Navigation (Expo Router - routage base sur les fichiers)
npx expo install expo-router expo-linking expo-constants

# Animations
npx expo install react-native-reanimated

# Audio
npx expo install expo-av

# Caméra et capteurs
npx expo install expo-camera expo-sensors

# Base de données
npx expo install expo-sqlite

# Internationalisation
npx expo install expo-localization

# Graphiques
npm install react-native-chart-kit react-native-svg
```

## Ressources générales

### Documentation officielle

- Expo SDK 54: https://docs.expo.dev/
- React Native: https://reactnative.dev/
- Expo Router: https://docs.expo.dev/router/introduction/
- TypeScript: https://www.typescriptlang.org/

### API Pokémon

- Documentation: https://pokeapi.co/docs/v2
- Endpoints principaux:
  - Liste: https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
  - Détails: https://pokeapi.co/api/v2/pokemon/{id}
  - Types: https://pokeapi.co/api/v2/type
  - Évolutions: https://pokeapi.co/api/v2/evolution-chain/{id}
  - Capacités: https://pokeapi.co/api/v2/move/{id}

### Outils recommandés

- VS Code avec extensions: React Native Tools, ESLint, Prettier
- Expo Go sur smartphone pour tester rapidement
- React Native Debugger pour le débogage avancé
- Postman ou Insomnia pour tester les API

## Support et aide

### En cas de blocage

1. Relisez attentivement le guide et les questions posées
2. Consultez la documentation officielle des packages utilisés
3. Vérifiez les messages d'erreur dans la console
4. Recherchez l'erreur exacte sur Google ou Stack Overflow
5. Testez sur un appareil physique si le simulateur pose problème

### Bonnes pratiques

- Committez régulièrement votre code
- Testez fréquemment sur appareil physique
- Commentez les parties complexes
- Respectez les conventions de nommage TypeScript
- Utilisez ESLint et Prettier pour la qualité du code

## Contribution

Ces guides peuvent être améliorés. Si vous trouvez:
- Des erreurs ou imprécisions
- Des étapes manquantes
- Des ressources obsolètes
- Des suggestions d'amélioration

N'hésitez pas à les signaler ou proposer des modifications.

## Licence

Ces guides sont destinés à un usage pédagogique dans le cadre de la formation BTS SIO.
