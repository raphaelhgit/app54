# TP 03 - Mode sombre

## Objectif

Implémenter un système de thème clair/sombre dans l'application Pokédex. L'utilisateur doit pouvoir basculer entre les deux modes, et son choix doit persister entre les sessions. Tous les écrans doivent s'adapter automatiquement au thème sélectionné.

## Prérequis

- Application Pokédex fonctionnelle avec plusieurs écrans
- Compréhension du Context API de React
- Connaissance de `useState`, `useEffect` et `useContext`
- Notions de base sur AsyncStorage (voir TP 02)

## Concepts clés

- Context API pour propager le thème dans toute l'application
- Création d'un Provider de thème
- Définition de palettes de couleurs (tokens)
- Persistance du choix utilisateur avec AsyncStorage
- Hook personnalisé `useTheme`
- StyleSheet dynamique en fonction du thème

## Étapes de réalisation

### 1. Définition des palettes de couleurs

Créez un fichier `src/constants/themes.ts` contenant les deux palettes.

Éléments à définir pour chaque thème:
- Couleur de fond principale et secondaire
- Couleur du texte principale et secondaire
- Couleur des cartes et des bordures
- Couleur de la barre de navigation
- Couleur des accents (boutons, liens)
- Couleur de la barre de statut

Questions:
- Comment structurer un objet TypeScript pour représenter un thème?
- Quels tokens de couleur sont nécessaires pour couvrir toute l'application?

### 2. Création du Context de thème

Créez un fichier `src/contexts/ThemeContext.tsx`.

Le contexte doit fournir:
- Le thème actuel (objet avec les couleurs)
- Le mode actuel ("light" ou "dark")
- Une fonction pour basculer entre les modes
- Un booléen `isDark` pour simplifier les conditions

Points techniques:
- Définissez une interface TypeScript pour le contexte
- Le Provider doit charger le thème sauvegardé au démarrage
- Chaque changement de thème doit être persisté dans AsyncStorage

### 3. Création du hook personnalisé

Créez un hook `useTheme` qui encapsule `useContext(ThemeContext)`.

Avantages:
- Simplifie l'import dans les composants
- Permet d'ajouter de la logique supplémentaire
- Gère le cas où le contexte n'est pas disponible

### 4. Integration du Provider dans l'application

Enveloppez votre application avec le `ThemeProvider`.

Emplacement:
- Dans le layout racine d'Expo Router (`app/_layout.tsx`)
- Le Provider doit englober le composant `<Slot />` ou `<Stack />` d'Expo Router
- Pensez a l'ordre d'imbrication si vous avez d'autres Providers
- Expo Router gere le conteneur de navigation automatiquement, il n'est donc pas necessaire d'ajouter un `NavigationContainer`

### 5. Adaptation des écrans existants

Modifiez chaque écran pour utiliser les couleurs du thème.

Approche recommandée:
- Remplacez les couleurs codées en dur par les tokens du thème
- Utilisez le hook `useTheme` dans chaque composant
- Créez des fonctions de style qui prennent le thème en paramètre
- Vérifiez le contraste du texte dans les deux modes

Composants à adapter:
- Écran de liste des Pokémon
- Écran de détail
- Cartes Pokémon
- Barre de recherche (si TP 01 réalisé)
- Barre de navigation (headers et tab bar d'Expo Router via les options dans `_layout.tsx`)

### 6. Ajout du bouton de bascule

Créez un composant ou un bouton pour changer de thème.

Options de placement:
- Dans les paramètres de l'application
- Dans le header de navigation
- Avec un Switch ou un bouton icône

Considérations:
- L'icône doit refléter le mode actuel (soleil/lune)
- La transition doit être immédiate et visible

### 7. Gestion de la barre de statut

Adaptez la barre de statut au thème sélectionné.

Points:
- Utilisez le composant `StatusBar` d'Expo
- Le style doit passer de "dark-content" à "light-content"
- Synchronisez la barre de statut avec le thème actif

## Points d'attention

### Cohérence visuelle

- Vérifiez le contraste suffisant dans les deux modes
- Les images et icônes doivent rester visibles dans les deux thèmes
- Les ombres peuvent nécessiter des ajustements en mode sombre
- Les couleurs des types de Pokémon doivent rester reconnaissables

### Performance

- Évitez de recréer les objets StyleSheet à chaque render
- Utilisez `useMemo` pour les styles qui dépendent du thème
- Le changement de thème ne doit pas provoquer de clignotement

### Expérience utilisateur

- Le thème choisi doit être restauré au lancement de l'application
- La transition entre les thèmes doit être fluide
- Respectez les conventions de la plateforme (certains utilisateurs attendent le mode sombre du système)

## Critères de validation

Votre implémentation est correcte si:

- [ ] Le bouton de bascule change le thème immédiatement
- [ ] Tous les écrans s'adaptent au thème sélectionné
- [ ] Le texte reste lisible dans les deux modes
- [ ] Le thème persiste après fermeture et réouverture de l'app
- [ ] La barre de statut s'adapte au thème
- [ ] Aucune couleur codée en dur ne subsiste dans les composants
- [ ] Les cartes Pokémon sont visuellement cohérentes dans les deux modes
- [ ] La navigation (headers et tab bar d'Expo Router) s'adapte au theme

## Pour aller plus loin

### Améliorations possibles

- Détection automatique du thème système (Appearance API)
- Ajout de thèmes supplémentaires (ex: thème par type de Pokémon)
- Animation de transition entre les thèmes
- Mode "auto" qui suit les préférences du système
- Thème personnalisable par l'utilisateur (couleur d'accent)

### Défis supplémentaires

- Créer un sélecteur de thème avec prévisualisation
- Gérer les images différentes selon le thème (logo clair/sombre)
- Implémenter un thème "haute contraste" pour l'accessibilité
- Animer progressivement le changement de couleurs

## Ressources

### Documentation officielle

- Appearance API: https://reactnative.dev/docs/appearance
- useColorScheme: https://reactnative.dev/docs/usecolorscheme
- StatusBar: https://docs.expo.dev/versions/latest/sdk/status-bar/

### Patterns recommandés

- Recherchez "React Native dark mode context"
- "Design tokens for theming"
- "React Native dynamic styles"

### Bibliotheques utiles

- Expo Router supporte les themes via le composant `ThemeProvider` de `@react-navigation/native` (inclus automatiquement avec expo-router)
- expo-status-bar pour gerer la barre de statut
- react-native-appearance pour detecter le theme systeme

## Architecture suggérée

### Structure des fichiers

Avec Expo Router, le ThemeProvider s'integre dans le layout racine `app/_layout.tsx`. Le bouton de bascule peut etre place dans le header via les options de navigation d'Expo Router.

```
app/
  _layout.tsx              (integre le ThemeProvider autour de <Stack /> ou <Slot />)
src/
  constants/
    themes.ts
  contexts/
    ThemeContext.tsx
  hooks/
    useTheme.ts
```

### Interface TypeScript

Définissez vos types clairement:
```typescript
interface Theme {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
  card: string;
  statusBar: 'light-content' | 'dark-content';
}

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}
```

## Tests à effectuer

- Basculer plusieurs fois rapidement entre les thèmes
- Fermer et rouvrir l'application pour vérifier la persistance
- Vérifier chaque écran dans les deux modes
- Tester avec le mode sombre du système activé
- Vérifier la lisibilité de tous les textes et icônes
