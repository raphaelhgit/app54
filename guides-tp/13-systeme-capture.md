# TP 13 - Systeme de capture

## Objectif

Créer un mini-jeu de capture de Pokémon utilisant l'accéléromètre du téléphone. L'utilisateur doit effectuer un geste de lancer (mouvement brusque du téléphone) pour "lancer une Pokéball" et tenter de capturer un Pokémon, avec un taux de réussite basé sur les statistiques du Pokémon.

## Prérequis

- Application Pokédex fonctionnelle avec écran de détail
- Appareil physique pour tester (l'accéléromètre ne fonctionne pas sur simulateur)
- Compréhension des animations (voir TP 05)
- Notions de physique basique (accélération, seuils de détection)

## Concepts clés

- expo-sensors pour accéder à l'accéléromètre
- Détection de gestes basée sur l'accélération
- Calcul de probabilité de capture
- Animations séquentielles (lancer, rebond, capture/fuite)
- Gestion d'état d'un mini-jeu
- Retour haptique (vibration)

## Étapes de réalisation

### 1. Installation des dépendances

Installez les modules nécessaires.

Commandes:
```bash
npx expo install expo-sensors
npx expo install expo-haptics
```

Le premier pour l'accéléromètre, le second pour le retour haptique.

### 2. Compréhension des données de l'accéléromètre

L'accéléromètre fournit trois axes (x, y, z).

Données:
- `x`: accélération latérale (gauche/droite)
- `y`: accélération verticale (haut/bas)
- `z`: accélération en profondeur (avant/arrière)
- Les valeurs sont normalisées (1.0 = gravité terrestre)

Détection du geste de lancer:
- Un lancer correspond à une accélération brusque sur un ou plusieurs axes
- Calculez la magnitude totale: `sqrt(x*x + y*y + z*z)`
- Définissez un seuil au-delà duquel on considère qu'il y a lancer
- Filtrez les faux positifs (mouvements normaux de l'utilisateur)

Questions:
- Quel seuil de magnitude choisir pour détecter un lancer?
- Comment éviter de détecter plusieurs lancers pour un seul geste?
- Comment gérer la gravité qui ajoute toujours 1.0 sur l'axe y?

### 3. Création de l'écran de capture

Creez l'ecran de capture. Avec Expo Router, creez le fichier `app/capture.tsx` qui definit la route. Vous pouvez extraire la logique du jeu dans un composant `src/components/capture/CaptureGame.tsx`.

Éléments de l'écran:
- Le Pokémon sauvage affiché au centre/haut de l'écran
- Informations du Pokémon (nom, niveau simulé, HP)
- La Pokéball en bas de l'écran
- Indicateur d'état ("Prêt à lancer", "Lancez votre téléphone!")
- Nombre de Pokéballs restantes

États du jeu:
- `ready`: en attente du lancer
- `throwing`: animation du lancer en cours
- `catching`: la Pokéball se ferme et tremble
- `caught`: capture réussie
- `escaped`: le Pokémon s'est échappé

### 4. Détection du geste de lancer

Implémentez la détection du lancer avec l'accéléromètre.

Approche:
- Abonnez-vous aux données de l'accéléromètre
- Calculez la magnitude à chaque mise à jour
- Comparez avec le seuil défini
- Déclenchez la tentative de capture quand le seuil est dépassé
- Ajoutez un cooldown pour éviter les lancers multiples

Configuration:
- Intervalle de mise à jour: 100-200ms est suffisant
- Seuil de détection: expérimentez entre 1.5 et 3.0
- Cooldown entre deux lancers: 2-3 secondes

### 5. Calcul de la probabilité de capture

Basez le taux de réussite sur les données du Pokémon.

Facteurs possibles:
- Taux de capture de base (champ `capture_rate` dans pokemon-species)
- HP restants (simulés)
- Type de Pokéball utilisée
- Force du lancer (magnitude de l'accélération)

Formule simplifiée:
- Plus le `capture_rate` est élevé, plus la capture est facile
- Plus l'accélération du lancer est forte, meilleur est le bonus
- Ajoutez un facteur aléatoire pour le côté ludique

Questions:
- Comment rendre le jeu équilibré et amusant?
- Comment éviter que la capture soit toujours réussie ou toujours ratée?

### 6. Animation de la séquence de capture

Créez les animations pour chaque étape.

Séquence d'animation:
1. La Pokéball s'envole vers le Pokémon (translation + rotation)
2. Le Pokémon "entre" dans la Pokéball (réduction + fondu)
3. La Pokéball tombe au sol (gravité simulée)
4. La Pokéball tremble 1 à 3 fois
5. Résultat: étoiles (capture) ou le Pokémon réapparaît (fuite)

Points:
- Utilisez Reanimated ou l'API Animated de React Native
- Chaînez les animations séquentiellement
- Ajoutez des vibrations aux moments clés (haptics)
- Le nombre de tremblements indique "à quel point c'était proche"

### 7. Retour haptique

Ajoutez des vibrations pour renforcer l'immersion.

Moments de vibration:
- Au moment du lancer détecté
- À chaque tremblement de la Pokéball
- Vibration de succès lors de la capture
- Vibration différente en cas d'échec

Utilisation:
- `Haptics.impactAsync` pour les impacts
- `Haptics.notificationAsync` pour le succès/échec
- Variez l'intensité selon le contexte

### 8. Sauvegarde des captures

Enregistrez les Pokémon capturés.

Options de stockage:
- AsyncStorage pour une liste simple
- SQLite si vous avez le mode hors ligne (TP 12)
- Context pour l'état en mémoire

Données à sauvegarder:
- ID et nom du Pokémon capturé
- Date de capture
- Nombre de tentatives
- "Force" du lancer gagnant

### 9. Integration dans l'application

Ajoutez l'acces a la capture depuis l'ecran de detail.

Navigation avec Expo Router:
- Bouton "Capturer" sur l'ecran de detail
- Utilisez `router.push('/capture?pokemonId=25')` depuis le hook `useRouter()` d'expo-router pour naviguer vers l'ecran de capture en passant l'ID du Pokemon
- Creez le fichier `app/capture.tsx` pour definir la route
- Recuperez les parametres avec `useLocalSearchParams()` d'expo-router dans l'ecran de capture
- Retour a l'ecran de detail apres capture ou abandon avec `router.back()` d'expo-router

## Points d'attention

### Détection du geste

- L'accéléromètre est sensible au bruit
- Filtrez les micro-mouvements
- Calibrez le seuil pour qu'il soit atteignable mais pas trop facile
- Testez dans différentes positions (assis, debout, en marchant)

### Performance

- Désabonnez-vous de l'accéléromètre quand l'écran n'est pas actif
- Les animations ne doivent pas bloquer la détection
- Nettoyez les listeners au démontage du composant

### Sécurité

- Prévenez l'utilisateur de tenir fermement son téléphone
- Le geste ne doit pas nécessiter un mouvement dangereux
- Proposez une alternative (bouton) pour ceux qui ne peuvent pas utiliser l'accéléromètre

### Expérience utilisateur

- Les instructions doivent être claires
- Le feedback doit être immédiat
- L'animation doit être satisfaisante (récompense visuelle)
- Le taux de réussite doit être équilibré (ni trop facile, ni frustrant)

## Critères de validation

Votre implémentation est correcte si:

- [ ] L'accéléromètre détecte le geste de lancer
- [ ] L'animation de lancer de Pokéball se joue
- [ ] La probabilité de capture est calculée logiquement
- [ ] L'animation de capture/fuite est fluide
- [ ] Le retour haptique fonctionne aux moments clés
- [ ] Les Pokémon capturés sont sauvegardés
- [ ] Le cooldown empêche les lancers en rafale
- [ ] Les ressources sont nettoyées au démontage

## Pour aller plus loin

### Améliorations possibles

- Différents types de Pokéballs avec des bonus différents
- Système de "combo" (lancers consécutifs réussis)
- Utilisation de baies pour augmenter les chances
- Statistiques de capture (taux de réussite, Pokémon les plus difficiles)
- Animation de Pokédex qui se remplit après capture
- Son de capture (combiné avec TP 10)

### Défis supplémentaires

- Détecter la direction du lancer (haut, côté)
- Implémenter un système de "courbe" basé sur la rotation du téléphone
- Créer un mode "safari" avec des Pokémon aléatoires
- Ajouter un système de récompenses journalières

## Ressources

### Documentation officielle

- expo-sensors: https://docs.expo.dev/versions/latest/sdk/accelerometer/
- expo-haptics: https://docs.expo.dev/versions/latest/sdk/haptics/
- Animated: https://reactnative.dev/docs/animated

### Documentation API

- Capture rate: champ `capture_rate` dans `https://pokeapi.co/api/v2/pokemon-species/{id}`

### Patterns recommandés

- Recherchez "React Native accelerometer gesture detection"
- "expo-sensors accelerometer example"
- "React Native sequential animations"

### Bibliothèques utiles

- expo-sensors (accéléromètre, gyroscope)
- expo-haptics (retour haptique)
- react-native-reanimated (animations avancées)

## Architecture suggérée

### Structure des fichiers

Avec Expo Router, l'ecran de capture est defini dans le dossier `app/`. Les composants et la logique restent dans `src/`.

```
app/
  capture.tsx               (ecran de capture, route /capture)
src/
  components/
    capture/
      Pokeball.tsx
      WildPokemon.tsx
      CaptureResult.tsx
  hooks/
    useAccelerometer.ts
    useCaptureGame.ts
  utils/
    captureCalculator.ts
  services/
    captureService.ts
```

### Machine à états du jeu

```
ready -> (lancer détecté) -> throwing -> (animation terminée) -> catching
catching -> (succès) -> caught -> (animation terminée) -> ready/retour
catching -> (échec) -> escaped -> (animation terminée) -> ready
```

## Tests à effectuer

- Tester sur un appareil physique (obligatoire)
- Lancer avec différentes intensités
- Vérifier le cooldown entre les lancers
- Capturer un Pokémon avec un taux de capture élevé (devrait être facile)
- Tenter de capturer un Pokémon avec un taux faible (devrait être difficile)
- Vérifier la sauvegarde des captures
- Quitter l'écran pendant une animation
- Tester les vibrations sur différents appareils
