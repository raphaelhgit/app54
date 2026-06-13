# TP 05 - Animations de transition

## Objectif

Ajouter des animations fluides et professionnelles à l'application Pokédex en utilisant React Native Reanimated. Les animations concerneront l'apparition des cartes, les transitions entre écrans, et les interactions utilisateur.

## Prérequis

- Application Pokedex fonctionnelle avec navigation entre ecrans (Expo Router)
- Compréhension de base des animations CSS (translate, scale, opacity)
- Connaissance de React Native et de ses composants
- Notions de hooks personnalisés

## Concepts clés

- React Native Reanimated 3 et ses APIs
- Shared Values et worklets
- Animations de layout (entering/exiting)
- Shared Element Transitions
- Gestes animés avec react-native-gesture-handler
- Interpolation de valeurs
- Timing, spring et decay animations

## Étapes de réalisation

### 1. Installation de Reanimated

Installez la bibliothèque React Native Reanimated.

Commande:
```bash
npx expo install react-native-reanimated
```

Configuration:
- Ajoutez le plugin Babel dans `babel.config.js`
- Le plugin doit être le dernier de la liste des plugins
- Redémarrez le serveur Metro après la modification

Vérification:
- Importez `Animated` depuis `react-native-reanimated`
- Assurez-vous qu'aucune erreur ne survient au lancement

### 2. Animation d'apparition des cartes

Animez l'apparition des cartes Pokémon dans la liste.

Effet recherché:
- Les cartes apparaissent progressivement avec un léger fondu
- Chaque carte entre avec un délai croissant (effet cascade)
- L'animation se produit au premier rendu et lors du scroll

Approche:
- Utilisez les animations de layout (`entering`) de Reanimated
- Explorez `FadeInDown`, `FadeInUp`, `SlideInRight`
- Appliquez un délai basé sur l'index de l'élément dans la liste
- Enveloppez votre composant carte avec `Animated.View`

Questions:
- Comment passer l'index de l'élément au composant pour le délai?
- Quelle durée d'animation est agréable sans être trop lente?

### 3. Animation du bouton favori

Si vous avez implémenté les favoris (TP 02), animez le bouton.

Effet recherché:
- Animation de scale (grossissement puis retour) au clic
- Rotation légère de l'icône
- Changement de couleur progressif

Approche:
- Utilisez `useSharedValue` et `useAnimatedStyle`
- Créez une animation `withSpring` ou `withTiming` au clic
- Combinez scale et rotation dans le style animé

### 4. Transition entre la liste et le detail

Animez la navigation vers l'ecran de detail.

Effet recherche:
- L'image du Pokemon semble "voler" de la carte vers l'ecran de detail
- Le fond de l'ecran de detail apparait en fondu
- L'animation inverse se produit au retour

Approche possible:
- Avec Expo Router, vous pouvez personnaliser les animations de transition dans le fichier `_layout.tsx` via les options du `<Stack.Screen>`, par exemple avec `animation: 'fade'` ou `animation: 'slide_from_right'`
- Utilisez les Shared Element Transitions de Reanimated (experimental) en attribuant un `sharedTransitionTag` identique sur les deux ecrans
- Ou creez une animation personnalisee avec Reanimated
- Attribuez un identifiant unique a chaque element partage

Points techniques:
- Le `sharedTransitionTag` doit etre identique sur les deux ecrans (par exemple, dans `app/index.tsx` et `app/pokemon/[id].tsx`)
- L'image doit avoir les memes dimensions de depart et d'arrivee
- Gerez le cas ou l'image n'est pas encore chargee
- Expo Router permet de configurer les animations de transition au niveau du layout avec la prop `screenOptions`

### 5. Animation de la barre de recherche

Si vous avez implémenté la recherche (TP 01), animez son apparition.

Effet recherché:
- La barre s'étend depuis une icône
- Ou la barre glisse depuis le haut de l'écran
- Focus automatique avec animation du curseur

### 6. Animation de chargement

Créez une animation pendant le chargement des données.

Effet recherché:
- Placeholder animé (skeleton loading) à la place des cartes
- Ou animation de Pokéball qui tourne
- Transition fluide vers le contenu réel

Approche:
- Créez un composant `SkeletonCard` avec des blocs gris animés
- Utilisez `withRepeat` et `withTiming` pour le shimmer effect
- Alternez l'opacité pour simuler un clignotement

### 7. Micro-interactions

Ajoutez des animations subtiles aux interactions.

Exemples:
- Pression sur une carte: légère réduction de taille
- Scroll de la liste: effet de parallaxe sur les images
- Apparition d'un toast/notification animé

## Points d'attention

### Performance

- Reanimated exécute les animations sur le thread UI (pas JS)
- Évitez `useAnimatedStyle` avec des dépendances qui changent fréquemment
- Utilisez `cancelAnimation` pour nettoyer les animations en cours
- Testez sur un appareil physique, pas seulement sur le simulateur
- Les animations de layout sur de longues listes peuvent impacter le scroll

### Expérience utilisateur

- Les animations doivent être rapides (200-400ms pour les transitions)
- Les animations spring sont plus naturelles que les animations linéaires
- Trop d'animations simultanées nuisent à la lisibilité
- Respectez le paramètre système "Réduire les animations"

### Compatibilité

- Testez sur iOS et Android (comportement différent)
- Certaines animations avancées nécessitent la dernière version de Reanimated
- Les Shared Element Transitions sont encore expérimentales

## Critères de validation

Votre implémentation est correcte si:

- [ ] Les cartes Pokémon apparaissent avec une animation fluide
- [ ] La transition vers l'écran de détail est animée
- [ ] Au moins une micro-interaction est implémentée
- [ ] Les animations ne causent pas de ralentissement
- [ ] Les animations fonctionnent sur iOS et Android
- [ ] Un indicateur de chargement animé est présent
- [ ] Les animations respectent une durée raisonnable
- [ ] Le retour en arrière est également animé

## Pour aller plus loin

### Améliorations possibles

- Animation de la Pokéball lors de la capture
- Effet de parallaxe sur l'écran de détail au scroll
- Animation des barres de statistiques qui se remplissent
- Transition personnalisee entre les onglets (configurable dans `app/(tabs)/_layout.tsx` d'Expo Router)
- Animation de confettis lors d'un événement spécial

### Défis supplémentaires

- Créer une animation de morphing entre deux Pokémon
- Implémenter un carrousel animé des évolutions
- Ajouter des gestes (swipe pour naviguer entre les Pokémon)
- Créer une animation d'introduction au lancement de l'app

## Ressources

### Documentation officielle

- Reanimated: https://docs.swmansion.com/react-native-reanimated/
- Entering/Exiting animations: https://docs.swmansion.com/react-native-reanimated/docs/layout-animations/entering-exiting-animations/
- Shared Element Transitions (Reanimated): https://docs.swmansion.com/react-native-reanimated/docs/shared-element-transitions/overview/

### Patterns recommandes

- Recherchez "React Native Reanimated 3 tutorial"
- "Expo Router screen transition animation"
- "React Native skeleton loading animation"

### Bibliothèques utiles

- react-native-reanimated (animations performantes)
- react-native-gesture-handler (gestes avancés)
- lottie-react-native (animations Lottie pré-conçues)
- moti (API simplifiée au-dessus de Reanimated)

## Architecture suggérée

### Structure des fichiers

```
src/
  components/
    animations/
      SkeletonCard.tsx
      FadeInView.tsx
    PokemonCard.tsx (modifié)
  hooks/
    useCardAnimation.ts
```

### Bonnes pratiques

- Encapsulez les animations réutilisables dans des composants
- Créez des hooks pour les logiques d'animation complexes
- Séparez la logique d'animation de la logique métier
- Utilisez des constantes pour les durées et les courbes d'animation

## Tests à effectuer

- Vérifier la fluidité à 60 FPS (pas de saccade)
- Tester avec de longues listes (100+ éléments)
- Naviguer rapidement entre les écrans
- Tester les animations pendant le chargement
- Vérifier le comportement lors d'un retour rapide en arrière
- Tester sur un appareil physique d'entrée de gamme
