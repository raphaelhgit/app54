# TP 11 - Réalité augmentée

## Objectif

Intégrer une fonctionnalité de réalité augmentée permettant d'afficher un Pokémon en superposition sur le flux de la caméra. L'utilisateur doit pouvoir "voir" le Pokémon dans son environnement réel via l'écran de son téléphone.

## Prérequis

- Application Pokédex fonctionnelle avec écran de détail
- Appareil physique pour tester (la caméra ne fonctionne pas sur simulateur)
- Compréhension des permissions système
- Notions de positionnement absolu en CSS/StyleSheet

## Concepts clés

- expo-camera pour accéder au flux vidéo
- Gestion des permissions de la caméra
- Superposition d'éléments sur le flux vidéo
- Positionnement absolu et z-index
- Gestes tactiles pour déplacer et redimensionner
- Capture d'écran (screenshot) de la vue AR

## Étapes de réalisation

### 1. Installation des dépendances

Installez les modules nécessaires.

Commandes:
```bash
npx expo install expo-camera
npx expo install expo-media-library
```

Le second package servira à sauvegarder les captures d'écran.

### 2. Gestion des permissions

Demandez l'accès à la caméra avant de l'utiliser.

Points techniques:
- Utilisez `Camera.requestCameraPermissionsAsync()` pour demander la permission
- Gérez les trois états: accordé, refusé, pas encore demandé
- Affichez un message explicatif si la permission est refusée
- Redirigez vers les paramètres si nécessaire

Questions:
- Quand demander la permission? Au lancement? À l'ouverture de la fonctionnalité AR?
- Comment gérer le cas où l'utilisateur refuse puis change d'avis?

### 3. Mise en place du flux caméra

Affichez le flux de la caméra en plein écran.

Création de l'écran:
- Creez le fichier `app/ar.tsx` pour definir la route AR avec Expo Router
- Le composant Camera doit occuper tout l'écran
- Utilisez la caméra arrière par défaut

Configuration:
- Choisissez la caméra arrière (`CameraType.back`)
- Définissez le ratio approprié
- Gérez le cas où la caméra n'est pas disponible

### 4. Superposition du Pokémon

Affichez l'image du Pokémon par-dessus le flux vidéo.

Approche:
- Utilisez un conteneur avec `position: 'absolute'` au-dessus de la Camera
- Placez l'image du Pokémon dans ce conteneur
- L'image doit avoir un fond transparent (les sprites officiels le sont)

Position initiale:
- Centrez le Pokémon au milieu de l'écran
- Définissez une taille initiale appropriée
- L'image doit sembler "posée" dans l'environnement

### 5. Interactions avec le Pokémon

Permettez à l'utilisateur de manipuler le Pokémon à l'écran.

Gestes à implémenter:
- Glisser (pan) pour déplacer le Pokémon
- Pincer (pinch) pour redimensionner
- Double-tap pour recentrer

Approche:
- Utilisez `PanResponder` de React Native
- Ou react-native-gesture-handler pour des gestes plus avancés
- Stockez la position et la taille dans des states ou des shared values

Points:
- Le Pokémon doit suivre le doigt de manière fluide
- Le redimensionnement doit avoir des limites (min/max)
- Le Pokémon ne doit pas sortir de l'écran

### 6. Interface utilisateur de l'écran AR

Ajoutez des contrôles sur l'écran AR.

Éléments d'interface:
- Bouton retour pour quitter le mode AR
- Bouton pour capturer une photo
- Sélecteur pour changer de Pokémon sans quitter l'AR
- Bouton pour basculer entre caméra avant/arrière
- Slider pour ajuster la taille du Pokémon

Placement:
- Les boutons doivent être en surimpression
- Ils ne doivent pas gêner la vue du Pokémon
- Utilisez des icônes translucides

### 7. Capture d'écran

Permettez de sauvegarder une "photo" avec le Pokémon.

Approche:
- Utilisez `captureRef` de react-native-view-shot
- Ou l'API de screenshot d'Expo
- Capturez le conteneur qui englobe la caméra ET le Pokémon
- Sauvegardez dans la galerie avec expo-media-library

Points:
- Demandez la permission d'accès à la galerie
- Affichez une confirmation après la sauvegarde
- Animation de flash lors de la capture

### 8. Acces depuis l'ecran de detail

Ajoutez un bouton "Voir en AR" sur l'ecran de detail.

Navigation avec Expo Router:
- Creez un fichier `app/ar.tsx` (ou `app/pokemon/[id]/ar.tsx` pour l'imbriquer sous le detail)
- Utilisez `router.push('/ar?pokemonId=25')` depuis le hook `useRouter()` d'expo-router pour naviguer vers l'ecran AR en passant l'ID du Pokemon en parametre d'URL
- Ou utilisez le composant `<Link href="/ar?pokemonId=25">` d'expo-router pour un lien declaratif
- Recuperez les parametres dans l'ecran AR avec `useLocalSearchParams()` d'expo-router
- Le bouton retour est gere automatiquement par le Stack d'Expo Router

## Points d'attention

### Permissions

- La permission caméra est obligatoire sur iOS et Android
- Expliquez clairement pourquoi la caméra est nécessaire
- Gérez le refus de permission avec grâce
- La permission galerie est nécessaire pour les captures

### Performance

- Le flux caméra est gourmand en ressources
- Limitez les renders inutiles pendant l'affichage AR
- Libérez la caméra quand l'écran est démonté
- Testez sur des appareils d'entrée de gamme

### Expérience utilisateur

- L'expérience doit être intuitive et amusante
- Indiquez les gestes possibles (tutoriel au premier lancement)
- Le Pokémon doit être bien visible sur différents fonds
- Ajoutez un contour ou une ombre au Pokémon pour le détacher du fond

### Limitations

- Ce n'est pas de la "vraie" AR (pas de détection de surface)
- Le Pokémon ne suit pas les mouvements de la caméra dans l'espace 3D
- C'est une superposition 2D sur le flux vidéo
- Pour de la vraie AR, il faudrait des bibliothèques comme ViroReact

## Critères de validation

Votre implémentation est correcte si:

- [ ] La permission caméra est demandée correctement
- [ ] Le flux vidéo s'affiche en plein écran
- [ ] Le Pokémon apparaît en superposition sur la caméra
- [ ] On peut déplacer le Pokémon avec le doigt
- [ ] On peut redimensionner le Pokémon (pinch)
- [ ] Un bouton permet de capturer la vue
- [ ] La photo est sauvegardée dans la galerie
- [ ] Un bouton retour permet de revenir au détail

## Pour aller plus loin

### Améliorations possibles

- Ajout de plusieurs Pokémon simultanément sur l'écran
- Filtres visuels (sépia, noir et blanc) sur la caméra
- Animation du sprite Pokémon (si sprite animé disponible)
- Ajout de texte personnalisable sur la photo
- Partage direct de la photo sur les réseaux sociaux
- Rotation du Pokémon avec un geste de rotation

### Défis supplémentaires

- Intégrer un modèle 3D du Pokémon (avec Three.js ou expo-gl)
- Détecter les surfaces planes pour poser le Pokémon (vraie AR)
- Ajouter un effet de particules autour du Pokémon
- Créer un mode "chasse" où le Pokémon apparaît aléatoirement

## Ressources

### Documentation officielle

- expo-camera: https://docs.expo.dev/versions/latest/sdk/camera/
- expo-media-library: https://docs.expo.dev/versions/latest/sdk/media-library/
- Permissions Expo: https://docs.expo.dev/guides/permissions/

### Patterns recommandés

- Recherchez "React Native camera overlay"
- "PanResponder drag and drop React Native"
- "expo-camera screenshot capture"

### Bibliothèques utiles

- react-native-gesture-handler pour les gestes avancés
- react-native-view-shot pour les captures d'écran
- expo-sharing pour le partage

## Architecture suggérée

### Structure des fichiers

Avec Expo Router, l'ecran AR est defini dans le dossier `app/`. Les composants et la logique restent dans `src/`.

```
app/
  ar.tsx                    (ecran AR, route /ar)
src/
  components/
    ar/
      AROverlay.tsx
      ARControls.tsx
      DraggablePokemon.tsx
  hooks/
    useCamera.ts
    useDragGesture.ts
```

### Logique de permission

```typescript
// Pseudo-code pour la gestion des permissions
// 1. Vérifier l'état actuel de la permission
// 2. Si pas encore demandée, afficher un écran explicatif
// 3. Demander la permission
// 4. Si accordée, afficher la caméra
// 5. Si refusée, proposer d'ouvrir les paramètres
```

## Tests à effectuer

- Tester sur un appareil physique (obligatoire)
- Refuser puis accorder la permission
- Déplacer le Pokémon dans toutes les directions
- Redimensionner avec le pinch
- Capturer une photo et vérifier dans la galerie
- Basculer entre caméra avant et arrière
- Quitter et revenir sur l'écran AR
- Tester en mode portrait et paysage
