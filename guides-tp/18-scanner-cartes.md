# TP 18 - Scanner de cartes

## Objectif

Créer un scanner de cartes Pokémon permettant de prendre en photo une carte physique et d'identifier le Pokémon représenté dessus. L'application doit utiliser la caméra, un service d'OCR (reconnaissance optique de caractères) ou de reconnaissance d'image, et afficher la fiche du Pokémon identifié.

## Prérequis

- Application Pokédex fonctionnelle avec écran de détail
- Compréhension de l'utilisation de la caméra (voir TP 11)
- Connaissance des appels à des APIs externes
- Notions de traitement de texte et de correspondance floue
- Appareil physique pour tester

## Concepts clés

- expo-camera pour la capture de photo
- expo-image-manipulator pour le traitement d'image
- OCR (Optical Character Recognition) via un service externe
- Correspondance floue (fuzzy matching) pour identifier le Pokémon
- APIs de reconnaissance de texte (Google Cloud Vision, Tesseract)
- Gestion du flux: capture, analyse, identification, affichage

## Étapes de réalisation

### 1. Installation des dépendances

Installez les modules nécessaires.

Commandes:
```bash
npx expo install expo-camera
npx expo install expo-image-manipulator
```

Pour l'OCR, selon l'approche choisie:
```bash
npm install @react-native-ml-kit/text-recognition
```
Ou utilisez une API cloud (Google Cloud Vision, Azure Computer Vision).

### 2. Choix de la stratégie de reconnaissance

Deux approches principales pour identifier une carte Pokémon.

**Approche A - OCR (reconnaissance de texte)**:
- Prendre une photo de la carte
- Extraire le texte de l'image (nom du Pokémon, numéro)
- Chercher le Pokémon correspondant dans la base de données
- Avantage: ne nécessite pas d'entraînement de modèle
- Inconvénient: dépend de la qualité de l'image et de la lisibilité du texte

**Approche B - Reconnaissance d'image (API cloud)**:
- Envoyer l'image à un service de reconnaissance (Google Vision, etc.)
- Utiliser les labels détectés pour identifier le Pokémon
- Avantage: fonctionne même si le texte est illisible
- Inconvénient: nécessite une API externe avec authentification

Recommandation pour commencer: l'approche A (OCR) est plus simple à mettre en place.

### 3. Mise en place de la caméra

Créez l'écran de scan avec le flux de la caméra.

Éléments de l'interface:
- Flux de la caméra en plein écran
- Zone de guidage (cadre indiquant où placer la carte)
- Bouton de capture
- Bouton flash/torche
- Indication textuelle ("Placez la carte dans le cadre")

Zone de guidage:
- Rectangle semi-transparent au centre de l'écran
- Dimensions proportionnelles à une carte Pokémon standard
- Coins marqués pour aider l'alignement
- Le reste de l'écran est légèrement assombri

### 4. Capture et prétraitement de l'image

Prenez la photo et préparez-la pour l'analyse.

Étapes:
- Capturer l'image avec la caméra
- Rogner l'image à la zone de la carte (si possible)
- Redimensionner pour optimiser l'envoi au service OCR
- Convertir en format approprié (JPEG, base64)

Utilisation d'expo-image-manipulator:
- Rognage (crop) selon la zone de guidage
- Redimensionnement à une taille raisonnable
- Compression pour réduire la taille du fichier
- Conversion en base64 si nécessaire pour l'API

### 5. Extraction du texte (OCR)

Envoyez l'image au service OCR et récupérez le texte.

Si vous utilisez un package local (ML Kit):
- Passez l'URI de l'image au module de reconnaissance
- Récupérez les blocs de texte détectés
- Extrayez les mots pertinents

Si vous utilisez une API cloud:
- Encodez l'image en base64
- Envoyez la requête à l'API
- Parsez la réponse pour extraire le texte

Textes à chercher sur une carte Pokémon:
- Nom du Pokémon (en gros caractères)
- Numéro de Pokédex (parfois présent)
- Type du Pokémon
- Points de vie (HP)

### 6. Identification du Pokémon

Faites correspondre le texte extrait à un Pokémon de votre base.

Logique de correspondance:
- Nettoyez le texte extrait (supprimez les caractères spéciaux, mettez en minuscules)
- Cherchez une correspondance exacte avec les noms de Pokémon
- Si pas de correspondance exacte, utilisez la correspondance floue
- Tenez compte des erreurs d'OCR courantes

Correspondance floue:
- Calculez la distance de Levenshtein entre le texte et chaque nom de Pokémon
- Ou utilisez une bibliothèque comme Fuse.js pour la recherche floue
- Définissez un seuil de similarité minimum
- Si plusieurs correspondances, proposez les options à l'utilisateur

### 7. Affichage des résultats

Présentez le résultat de l'identification.

Scénarios:
- **Pokémon identifié avec certitude**: afficher directement la fiche
- **Plusieurs correspondances possibles**: proposer une liste de candidats
- **Aucune correspondance**: message d'erreur avec option de réessayer

Interface de résultat:
- Image du Pokémon identifié
- Nom et numéro
- Taux de confiance de la reconnaissance
- Bouton pour voir la fiche complète
- Bouton pour scanner une autre carte

### 8. Gestion de l'historique de scans

Sauvegardez l'historique des cartes scannées.

Données à stocker:
- Pokémon identifié
- Date et heure du scan
- Photo prise (optionnel, attention à l'espace disque)
- Taux de confiance

Affichage:
- Liste des scans précédents
- Accès rapide à la fiche du Pokémon
- Possibilité de supprimer un scan

### 9. Optimisation de la reconnaissance

Améliorez le taux de réussite.

Techniques:
- Guidez l'utilisateur pour bien positionner la carte
- Ajoutez un mode "torche" pour les conditions de faible luminosité
- Permettez de sélectionner manuellement la zone de texte
- Proposez de corriger le nom si la reconnaissance est mauvaise

## Points d'attention

### Qualité de la reconnaissance

- L'OCR est sensible à la qualité de l'image (lumière, angle, netteté)
- Les cartes usées ou brillantes sont plus difficiles à lire
- Les polices stylisées des cartes Pokémon peuvent tromper l'OCR
- Le texte en japonais ou dans d'autres langues nécessite un modèle adapté

### Performance

- Le traitement OCR peut prendre quelques secondes
- Affichez un indicateur de chargement pendant l'analyse
- Redimensionnez l'image avant l'envoi pour accélérer le traitement
- Le prétraitement local est plus rapide qu'un appel API

### Confidentialité et coûts

- Si vous utilisez une API cloud, les images sont envoyées sur un serveur
- Informez l'utilisateur que ses photos sont envoyées (RGPD)
- Les APIs cloud ont souvent des limites gratuites (attention aux coûts)
- Préférez les solutions on-device quand c'est possible

### Permissions

- La caméra nécessite une permission explicite
- Expliquez pourquoi la caméra est nécessaire
- Gérez le refus de permission
- La galerie nécessite une permission si vous sauvegardez les photos

## Critères de validation

Votre implémentation est correcte si:

- [ ] La caméra s'ouvre avec une zone de guidage
- [ ] Une photo peut être prise
- [ ] L'image est traitée et envoyée à un service OCR
- [ ] Le texte extrait est utilisé pour identifier le Pokémon
- [ ] Le Pokémon identifié est affiché avec sa fiche
- [ ] Les cas d'erreur sont gérés (aucun texte, pas de correspondance)
- [ ] L'utilisateur peut réessayer en cas d'échec
- [ ] Le processus entier fonctionne de bout en bout

## Pour aller plus loin

### Améliorations possibles

- Scan en temps réel (sans appuyer sur un bouton)
- Reconnaissance de l'édition de la carte (set, rareté)
- Estimation de la valeur de la carte
- Détection automatique de la carte dans l'image (sans zone de guidage)
- Collection virtuelle des cartes scannées
- Mode "scan rapide" qui enchaîne plusieurs cartes

### Défis supplémentaires

- Entraîner un modèle de classification d'images personnalisé
- Reconnaître le Pokémon directement par son image (pas seulement le texte)
- Implémenter la détection de contours pour extraire la carte automatiquement
- Créer un système de réalité augmentée qui affiche les infos sur la carte en direct

## Ressources

### Documentation officielle

- expo-camera: https://docs.expo.dev/versions/latest/sdk/camera/
- expo-image-manipulator: https://docs.expo.dev/versions/latest/sdk/imagemanipulator/

### Services OCR

- Google Cloud Vision: https://cloud.google.com/vision/docs/ocr
- ML Kit Text Recognition: https://developers.google.com/ml-kit/vision/text-recognition
- Tesseract.js (JavaScript, utilisable avec React Native via un serveur)

### Patterns recommandés

- Recherchez "React Native OCR text recognition"
- "expo-camera capture and process image"
- "Levenshtein distance JavaScript"
- "Fuse.js fuzzy search"

### Bibliothèques utiles

- @react-native-ml-kit/text-recognition pour l'OCR on-device
- fuse.js pour la recherche floue
- expo-image-manipulator pour le traitement d'image
- string-similarity pour la comparaison de chaînes

## Architecture suggérée

### Structure des fichiers

Avec Expo Router, les ecrans du scanner sont definis dans le dossier `app/`. Vous pouvez grouper les routes du scanner ensemble.

```
app/
  scanner/
    _layout.tsx            (layout Stack pour le flux de scan)
    index.tsx              (ecran de capture camera)
    result.tsx             (ecran de resultat du scan)
    history.tsx            (historique des scans)
src/
  components/
    scanner/
      CameraView.tsx
      GuideOverlay.tsx
      ScanResult.tsx
      ScanLoading.tsx
  services/
    ocrService.ts
    pokemonMatcher.ts
  hooks/
    useScanner.ts
    useOCR.ts
  utils/
    imageProcessing.ts
    fuzzyMatch.ts
```

Navigation dans le flux de scan:
- Depuis n'importe quel ecran, `router.push('/scanner')` pour ouvrir le scanner
- Apres la capture et l'analyse, `router.replace('/scanner/result')` pour afficher le resultat
- Depuis le resultat, `router.push('/pokemon/[id]')` pour naviguer vers la fiche du Pokemon identifie
- Depuis le resultat, `router.push('/scanner/history')` pour voir l'historique des scans

### Flux de données

```
1. Caméra active avec guide de positionnement
2. Utilisateur prend la photo
3. Image rognée et redimensionnée
4. Envoi au service OCR
5. Réception du texte extrait
6. Nettoyage et normalisation du texte
7. Recherche dans la base de Pokémon (fuzzy match)
8. Affichage du résultat (ou des candidats)
9. Navigation vers la fiche du Pokemon identifie (avec `router.push('/pokemon/[id]')` d'Expo Router)
```

### Interface TypeScript

```typescript
interface ScanResult {
  id: string;
  pokemonId: number | null;
  pokemonName: string | null;
  confidence: number;
  rawText: string;
  imageUri?: string;
  timestamp: string;
  candidates?: { name: string; id: number; score: number }[];
}

interface OCRResult {
  text: string;
  blocks: { text: string; confidence: number }[];
}
```

## Tests à effectuer

- Scanner une carte Pokémon de la première génération
- Scanner une carte avec du texte en français et en anglais
- Scanner dans différentes conditions de luminosité
- Scanner une carte à l'envers ou inclinée
- Tester avec une image floue
- Vérifier le comportement quand aucun texte n'est détecté
- Tester la correspondance floue avec un nom partiellement lu
- Scanner plusieurs cartes à la suite
- Vérifier l'historique des scans
- Tester sans connexion internet (si API cloud utilisée)
