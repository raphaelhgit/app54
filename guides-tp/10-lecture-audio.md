# TP 10 - Lecture audio

## Objectif

Permettre à l'utilisateur d'écouter le cri de chaque Pokémon directement depuis l'application. Un bouton de lecture audio doit être présent sur l'écran de détail, avec un retour visuel indiquant l'état de la lecture.

## Prérequis

- Application Pokédex fonctionnelle avec écran de détail
- Compréhension du cycle de vie des composants React
- Connaissance de la gestion asynchrone (async/await)
- Notions de gestion de ressources (chargement/libération)

## Concepts clés

- Module expo-av (Audio/Video d'Expo)
- Chargement et lecture de fichiers audio distants
- Gestion des états audio (chargement, lecture, pause, arrêt)
- Nettoyage des ressources au démontage du composant
- Bouton de lecture avec feedback visuel
- URL des cris Pokémon

## Étapes de réalisation

### 1. Installation de la dépendance

Installez le module audio d'Expo.

Commande:
```bash
npx expo install expo-av
```

Vérification:
- Le package est dans `package.json`
- Aucune erreur au lancement de l'application

### 2. Identification des sources audio

Les cris des Pokémon sont disponibles à plusieurs sources.

Sources possibles:
- PokeAPI fournit des URLs dans `pokemon.cries.latest` et `pokemon.cries.legacy`
- Le champ `cries` est disponible directement dans les données du Pokémon
- Les fichiers sont au format OGG

Vérifiez la structure dans l'API:
- Consultez la réponse de `/api/v2/pokemon/{id}` et cherchez le champ `cries`
- Testez l'URL dans un navigateur pour vérifier l'accessibilité

### 3. Création du composant de lecture

Créez `src/components/AudioPlayer.tsx` ou `CryButton.tsx`.

Fonctionnalités:
- Bouton avec icône de haut-parleur
- États visuels: prêt, chargement, en lecture
- Possibilité d'arrêter la lecture en cours
- Animation pendant la lecture (optionnel)

Props du composant:
- URL du fichier audio
- Taille du bouton (optionnel)
- Callback de fin de lecture (optionnel)

### 4. Implémentation de la logique audio

Utilisez le module `Audio` d'expo-av.

Étapes de lecture:
- Créer un objet `Audio.Sound`
- Charger le fichier audio depuis l'URL
- Lancer la lecture
- Écouter l'événement de fin de lecture
- Libérer les ressources

Gestion des états:
- `idle`: prêt à jouer
- `loading`: chargement du fichier en cours
- `playing`: lecture en cours
- `error`: erreur de chargement ou de lecture

Questions:
- Que se passe-t-il si l'utilisateur appuie pendant le chargement?
- Comment gérer un deuxième appui pendant la lecture?
- Faut-il mettre le son en pause ou le redémarrer?

### 5. Configuration audio

Configurez le comportement audio de l'application.

Points à configurer:
- Le son doit-il jouer même en mode silencieux? (iOS)
- Le son doit-il interrompre la musique en cours?
- Volume par défaut

Utilisez `Audio.setAudioModeAsync` pour configurer:
- `playsInSilentModeIOS`: comportement en mode silencieux
- `staysActiveInBackground`: lecture en arrière-plan
- `shouldDuckAndroid`: réduction du volume des autres apps

### 6. Nettoyage des ressources

Libérez les ressources audio quand elles ne sont plus nécessaires.

Points critiques:
- Déchargez le son quand le composant est démonté
- Utilisez le return de `useEffect` pour le nettoyage
- Arrêtez la lecture en cours si l'utilisateur quitte l'écran
- Évitez les fuites de mémoire

### 7. Integration dans l'ecran de detail

Placez le bouton de lecture dans l'ecran de detail. Avec Expo Router, l'ecran de detail correspond au fichier `app/pokemon/[id].tsx`.

Emplacement suggere:
- A cote du nom du Pokemon
- Dans le header de l'ecran (configurable via les options de `<Stack.Screen>` dans le layout)
- Comme un bouton flottant

Considerations:
- Le bouton doit etre facilement trouvable
- Il ne doit pas gener la lecture des autres informations
- L'icone doit etre explicite (haut-parleur, note de musique)

### 8. Feedback visuel et animations

Ajoutez des indications visuelles pendant la lecture.

Options:
- Animation de pulsation du bouton pendant la lecture
- Barre de progression du son
- Changement de couleur/icône selon l'état
- Animation d'ondes sonores autour du bouton

## Points d'attention

### Performance

- Ne préchargez pas tous les sons de la liste
- Chargez le son uniquement quand l'utilisateur le demande
- Libérez les ressources après chaque lecture
- Un seul son doit jouer à la fois dans toute l'application

### Gestion d'erreurs

- Le fichier audio peut ne pas être disponible
- La connexion peut être lente ou interrompue
- Certains Pokémon peuvent ne pas avoir de cri dans l'API
- Gérez le timeout de chargement

### Expérience utilisateur

- Le son ne doit pas surprendre l'utilisateur (volume raisonnable)
- L'état de chargement doit être visible
- Un message d'erreur clair si le son est indisponible
- Le son ne doit pas bloquer d'autres interactions

### Compatibilité

- Testez sur iOS et Android (formats audio supportés différents)
- Le format OGG peut nécessiter une conversion ou un format alternatif
- Vérifiez le comportement avec le mode silencieux activé

## Critères de validation

Votre implémentation est correcte si:

- [ ] Le bouton de lecture est visible sur l'écran de détail
- [ ] Le cri du Pokémon se joue correctement au clic
- [ ] Un indicateur de chargement apparaît pendant le téléchargement
- [ ] L'état de lecture est visible (le bouton change d'apparence)
- [ ] Le son s'arrête quand on quitte l'écran
- [ ] Les ressources sont libérées au démontage
- [ ] Les erreurs sont gérées (son indisponible, réseau)
- [ ] Un seul son joue à la fois

## Pour aller plus loin

### Améliorations possibles

- Contrôle du volume dans l'application
- Choix entre cri "latest" et "legacy"
- Lecture automatique au chargement de la fiche (désactivable)
- Playlist des cris favoris
- Vitesse de lecture ajustable

### Défis supplémentaires

- Créer un mini-jeu "Devinez le Pokémon par son cri"
- Implémenter un lecteur avec barre de progression
- Ajouter un visualiseur audio (barres animées)
- Permettre de sauvegarder les cris localement pour le mode hors ligne

## Ressources

### Documentation officielle

- expo-av: https://docs.expo.dev/versions/latest/sdk/audio/
- Audio playback: https://docs.expo.dev/versions/latest/sdk/audio/#playback
- Audio configuration: https://docs.expo.dev/versions/latest/sdk/audio/#audio

### Documentation API

- Pokemon cries: le champ `cries` dans `https://pokeapi.co/api/v2/pokemon/{id}`

### Patterns recommandés

- Recherchez "expo-av audio playback example"
- "React Native audio player component"
- "useEffect cleanup audio React"

### Bibliothèques alternatives

- expo-audio (nouveau module Expo plus récent)
- react-native-track-player (pour des lecteurs plus complexes)

## Architecture suggérée

### Structure des fichiers

```
src/
  components/
    CryButton.tsx
  hooks/
    useAudioPlayer.ts
  services/
    audioService.ts (optionnel)
```

### Interface TypeScript

```typescript
interface AudioPlayerState {
  status: 'idle' | 'loading' | 'playing' | 'error';
  play: (uri: string) => Promise<void>;
  stop: () => Promise<void>;
  error: string | null;
}
```

## Tests à effectuer

- Jouer le cri de plusieurs Pokémon différents
- Appuyer rapidement plusieurs fois sur le bouton
- Quitter l'écran pendant la lecture
- Tester sans connexion internet
- Tester avec le mode silencieux activé (iOS)
- Vérifier qu'un seul son joue à la fois
- Tester avec des Pokémon dont le cri n'existe pas
- Vérifier l'absence de fuite mémoire après navigation répétée
