# Guides de Travaux Pratiques - Pokédex React Native

## Organisation des TP

Ces guides sont conçus pour vous permettre d'ajouter progressivement des fonctionnalités à votre application Pokédex. Chaque guide est autonome et peut être réalisé indépendamment, sauf indication contraire dans les prérequis.

## Liste des TP disponibles

### Niveau Débutant

1. **Barre de recherche** - Filtrer les Pokémon par nom ou numéro
2. **Système de favoris** - Sauvegarder localement les Pokémon préférés
3. **Mode sombre** - Implémenter un thème sombre
4. **Pull-to-refresh** - Actualiser la liste en tirant vers le bas
5. **Animations de transition** - Ajouter des animations fluides

### Niveau Intermédiaire

6. **Filtres par type** - Filtrer les Pokémon selon leurs types
7. **Comparateur de Pokémon** - Comparer les statistiques de plusieurs Pokémon
8. **Chaîne d'évolution** - Afficher les évolutions d'un Pokémon
9. **Liste des attaques** - Afficher et filtrer les capacités
10. **Lecture audio** - Jouer les cris des Pokémon

### Niveau Avancé

11. **Réalité augmentée** - Visualiser les Pokémon en AR
12. **Mode hors ligne** - Cache complet avec base de données locale
13. **Système de capture** - Capturer des Pokémon avec l'accéléromètre
14. **Statistiques visuelles** - Graphiques et analytics
15. **Internationalisation** - Support multi-langues

### Fonctionnalités ludiques

16. **Quiz interactif** - Deviner les Pokémon
17. **Gestion d'équipe** - Constituer une équipe de 6 Pokémon
18. **Scanner de cartes** - Reconnaissance d'image avec OCR

## Comment utiliser ces guides

Chaque guide suit la structure suivante:

- **Objectif** : Ce que vous allez réaliser
- **Prérequis** : Connaissances et dépendances nécessaires
- **Concepts clés** : Notions React Native / Expo à maîtriser
- **Étapes de réalisation** : Démarche guidée sans code complet
- **Points d'attention** : Pièges courants à éviter
- **Critères de validation** : Comment vérifier que c'est fonctionnel
- **Pour aller plus loin** : Améliorations possibles
- **Ressources** : Documentation et liens utiles

## Recommandations

- Commencez par les TP de niveau débutant pour vous familiariser avec les patterns
- Lisez entièrement le guide avant de commencer à coder
- Testez régulièrement sur un appareil physique ou simulateur
- Consultez la documentation officielle en cas de blocage
- N'hésitez pas à expérimenter et personnaliser les fonctionnalités

## Architecture recommandee

L'application utilise Expo Router pour la navigation. Expo Router repose sur un routage base sur le systeme de fichiers: chaque fichier dans le dossier `app/` definit automatiquement une route. Cela remplace la configuration manuelle de React Navigation.

```
app/
  _layout.tsx       # Layout racine (Stack, Providers globaux)
  index.tsx         # Page d'accueil (route /)
  (tabs)/
    _layout.tsx     # Configuration des onglets
    index.tsx       # Onglet liste des Pokemon
    favorites.tsx   # Onglet favoris
  pokemon/
    [id].tsx        # Detail d'un Pokemon (route dynamique /pokemon/25)
src/
  components/       # Composants reutilisables
  services/         # Appels API et logique metier
  types/            # Definitions TypeScript
  hooks/            # Hooks personnalises
  contexts/         # Context API
  utils/            # Fonctions utilitaires
  constants/        # Constantes et configurations
```

Points cles d'Expo Router:
- Les ecrans sont definis par des fichiers dans `app/` (pas de `src/screens/` ni de `src/navigation/`)
- Les routes dynamiques utilisent la syntaxe `[param].tsx` (ex: `app/pokemon/[id].tsx`)
- Les layouts (`_layout.tsx`) definissent la structure de navigation (Stack, Tabs)
- Les groupes de routes `(nomDuGroupe)/` permettent d'organiser sans affecter les URLs
- La navigation se fait avec `useRouter()` (hook) ou `<Link>` (composant) d'expo-router
- Les parametres de route se recuperent avec `useLocalSearchParams()` d'expo-router

## Ressources générales

- Documentation Expo SDK 54: https://docs.expo.dev/
- React Native: https://reactnative.dev/
- PokeAPI: https://pokeapi.co/docs/v2
- TypeScript: https://www.typescriptlang.org/docs/
- Expo Router: https://docs.expo.dev/router/introduction/

Bon développement!
