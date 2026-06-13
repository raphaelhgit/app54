# TP 16 - Quiz interactif

## Objectif

Créer un mini-jeu de quiz où l'utilisateur doit identifier des Pokémon à partir de leur silhouette, de leur cri, ou de leur description. Le jeu doit proposer plusieurs modes, suivre le score, et offrir une expérience ludique et éducative.

## Prérequis

- Application Pokédex fonctionnelle avec accès aux données Pokémon
- Compréhension de la gestion d'état avec React
- Connaissance des animations de base (voir TP 05)
- Si le mode audio est implémenté (TP 10), il peut être réutilisé

## Concepts clés

- Gestion d'état d'un jeu (machine à états)
- Génération aléatoire de questions et de réponses
- Timer et compte à rebours
- Manipulation d'images (silhouettes avec tintColor)
- Score et progression
- Animations de feedback (correct/incorrect)
- Stockage des meilleurs scores

## Étapes de réalisation

### 1. Conception des modes de quiz

Définissez les différents types de questions.

Modes possibles:
- **Silhouette**: afficher la silhouette noire d'un Pokémon, deviner son nom
- **Description**: afficher une description, deviner le Pokémon
- **Type**: afficher un Pokémon, deviner son type
- **Cri**: jouer un cri, deviner le Pokémon (nécessite TP 10)
- **Statistique**: afficher des stats, deviner le Pokémon

Commencez par un mode et ajoutez les autres progressivement.

### 2. Génération des questions

Créez un système de génération de questions aléatoires.

Logique:
- Sélectionner un Pokémon aléatoire (la bonne réponse)
- Générer 3 mauvaises réponses (autres Pokémon aléatoires)
- Mélanger les 4 propositions aléatoirement
- Éviter les doublons dans les propositions

Points techniques:
- Comment sélectionner un Pokémon aléatoirement dans la liste?
- Comment s'assurer que les mauvaises réponses sont plausibles?
- Comment éviter de poser la même question deux fois dans une partie?

Amélioration de la difficulté:
- Niveau facile: mauvaises réponses de types très différents
- Niveau moyen: mauvaises réponses du même type
- Niveau difficile: mauvaises réponses de la même génération et du même type

### 3. Création de l'écran de quiz

Creez l'ecran du quiz. Avec Expo Router, creez le fichier `app/(quiz)/play.tsx` pour definir la route du jeu. La logique d'affichage peut etre extraite dans un composant `src/components/quiz/QuizGame.tsx`.

Éléments de l'écran:
- Zone de question (image/silhouette/texte)
- 4 boutons de réponse
- Indicateur de score (bonnes réponses / total)
- Numéro de la question actuelle
- Timer optionnel (compte à rebours)
- Bouton pour passer la question

### 4. Mode silhouette

Implémentez la version "Qui est ce Pokémon?".

Approche technique:
- Utilisez l'image du Pokémon avec un style qui la rend noire
- La propriété `tintColor` de l'Image React Native permet de colorier toute l'image
- Couleur noire pour la silhouette, couleur originale pour la révélation
- Après la réponse, révélez le Pokémon avec une animation

Étapes visuelles:
1. Afficher la silhouette (image noire)
2. L'utilisateur choisit une réponse
3. Révéler le Pokémon (transition de noir vers les couleurs)
4. Indiquer si la réponse est correcte ou non
5. Passer à la question suivante après un délai

### 5. Gestion du score et de la progression

Suivez les performances du joueur.

Données à suivre:
- Nombre de bonnes réponses
- Nombre total de questions
- Série de bonnes réponses consécutives (streak)
- Temps moyen de réponse
- Score total (avec bonus de temps et de série)

Calcul du score:
- Points de base pour une bonne réponse
- Bonus de vitesse (réponse rapide = plus de points)
- Multiplicateur de série (streak)
- Pas de points négatifs pour les mauvaises réponses

### 6. Animations de feedback

Ajoutez des animations pour indiquer le résultat.

Bonne réponse:
- Le bouton sélectionné passe en vert
- Animation de célébration (confettis, étoiles)
- Son de victoire (optionnel)
- Points qui s'ajoutent avec animation

Mauvaise réponse:
- Le bouton sélectionné passe en rouge
- La bonne réponse est mise en évidence en vert
- Animation de "shake" sur le bouton incorrect
- Vibration légère (optionnel)

### 7. Écran de résultats

À la fin de la partie, affichez un récapitulatif.

Informations:
- Score final
- Nombre de bonnes réponses sur le total
- Pourcentage de réussite
- Meilleure série
- Temps total
- Comparaison avec le meilleur score

Actions possibles:
- Rejouer
- Retour à l'accueil
- Partager le score

### 8. Meilleurs scores

Sauvegardez et affichez les records.

Stockage:
- Utilisez AsyncStorage pour les meilleurs scores
- Sauvegardez le top 10
- Incluez la date et le mode de jeu

Affichage:
- Tableau des meilleurs scores
- Nouveau record mis en évidence
- Historique des parties

### 9. Timer et difficulté

Ajoutez un système de difficulté.

Niveaux:
- **Facile**: pas de timer, 10 questions, Pokémon courants (gen 1)
- **Moyen**: 15 secondes par question, 15 questions, toutes générations
- **Difficile**: 8 secondes par question, 20 questions, mauvaises réponses similaires

Timer:
- Barre de progression qui se vide
- Changement de couleur quand le temps est presque écoulé
- Réponse automatique (mauvaise) si le temps expire

## Points d'attention

### Aléatoire et équité

- Les mauvaises réponses doivent être plausibles
- Évitez de reproposer le même Pokémon dans la même partie
- Le mélange des réponses doit être véritablement aléatoire
- La difficulté doit être progressive

### Performance

- Préchargez les images des prochaines questions
- Le timer ne doit pas être affecté par les animations
- Les transitions entre questions doivent être fluides

### Expérience utilisateur

- Le feedback doit être immédiat
- Le joueur doit comprendre les règles sans tutoriel
- La difficulté ne doit pas être frustrante
- Les animations de célébration renforcent la motivation

### Données

- Gérez le cas où peu de Pokémon sont chargés
- Les images doivent être chargées avant d'afficher la question
- Vérifiez que les données de silhouette fonctionnent (sprites avec fond transparent)

## Critères de validation

Votre implémentation est correcte si:

- [ ] Au moins un mode de quiz fonctionne (silhouette recommandé)
- [ ] 4 propositions de réponse sont affichées
- [ ] Le feedback visuel distingue bonne et mauvaise réponse
- [ ] La bonne réponse est révélée en cas d'erreur
- [ ] Le score est suivi pendant la partie
- [ ] Un écran de résultats s'affiche en fin de partie
- [ ] Les meilleurs scores sont sauvegardés
- [ ] On peut rejouer une partie

## Pour aller plus loin

### Améliorations possibles

- Mode multijoueur local (passer le téléphone)
- Classement en ligne
- Catégories de questions (par génération, par type)
- Mode "survie" (pas de fin, difficulté croissante)
- Récompenses débloquables (avatars, thèmes)
- Questions quotidiennes avec classement

### Défis supplémentaires

- Créer un mode "Qui est ce Pokémon?" avec le cri audio
- Implémenter un mode "contre la montre" (maximum de bonnes réponses en 60 secondes)
- Ajouter un système d'indices (perdre des points pour un indice)
- Créer un quiz basé sur les chaines d'évolution

## Ressources

### Patterns recommandés

- Recherchez "React Native quiz app tutorial"
- "Image tintColor React Native silhouette"
- "Game state machine React"

### Bibliothèques utiles

- react-native-confetti-cannon pour les animations de victoire
- expo-haptics pour le retour haptique
- AsyncStorage pour les scores

## Architecture suggérée

### Structure des fichiers

Avec Expo Router, les ecrans du quiz sont definis dans le dossier `app/`. Vous pouvez grouper les routes du quiz avec un groupe de routes `app/(quiz)/`.

```
app/
  (quiz)/
    _layout.tsx            (layout du groupe quiz, par exemple un Stack)
    index.tsx              (menu du quiz)
    play.tsx               (ecran de jeu)
    results.tsx            (ecran de resultats)
src/
  components/
    quiz/
      QuestionCard.tsx
      AnswerButton.tsx
      ScoreDisplay.tsx
      Timer.tsx
      SilhouetteImage.tsx
  hooks/
    useQuizGame.ts
    useTimer.ts
  utils/
    questionGenerator.ts
    scoreCalculator.ts
  services/
    highScoreService.ts
```

Navigation entre les ecrans du quiz:
- Depuis le menu, utilisez `router.push('/(quiz)/play')` pour demarrer une partie
- A la fin de la partie, utilisez `router.replace('/(quiz)/results')` pour afficher les resultats (sans pouvoir revenir au jeu)
- Depuis les resultats, utilisez `router.replace('/(quiz)')` pour rejouer ou `router.dismissAll()` pour quitter

### Machine à états du quiz

```
menu -> (démarrer) -> playing
playing -> (répondre) -> feedback
feedback -> (délai) -> playing (question suivante)
feedback -> (dernière question) -> results
results -> (rejouer) -> playing
results -> (quitter) -> menu
```

### Interface TypeScript

```typescript
interface Question {
  pokemon: PokemonBasic;
  options: PokemonBasic[];
  correctIndex: number;
  mode: 'silhouette' | 'description' | 'type' | 'cry';
}

interface QuizState {
  questions: Question[];
  currentIndex: number;
  score: number;
  streak: number;
  answers: (number | null)[];
  status: 'menu' | 'playing' | 'feedback' | 'results';
}
```

## Tests à effectuer

- Jouer une partie complète et vérifier le score
- Vérifier que la bonne réponse est toujours parmi les 4 propositions
- Tester le timer et vérifier qu'il expire correctement
- Vérifier la sauvegarde du meilleur score
- Rejouer et vérifier que les questions sont différentes
- Tester avec peu de Pokémon chargés
- Vérifier les animations de feedback
- Tester la silhouette sur fond clair et sombre
