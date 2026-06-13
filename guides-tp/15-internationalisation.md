# TP 15 - Internationalisation

## Objectif

Implémenter le support multi-langues dans l'application Pokédex. L'utilisateur doit pouvoir basculer entre plusieurs langues (français, anglais, au minimum), et l'application doit détecter automatiquement la langue du système. Les textes de l'interface ainsi que les noms et descriptions des Pokémon doivent s'adapter.

## Prérequis

- Application Pokédex fonctionnelle
- Compréhension du Context API de React
- Connaissance d'AsyncStorage pour la persistance
- Notions de gestion de fichiers JSON

## Concepts clés

- expo-localization pour détecter la langue du système
- Bibliothèque i18n (i18next ou i18n-js) pour la gestion des traductions
- Fichiers de traduction par langue
- Interpolation de variables dans les traductions
- Pluralisation et formatage selon la locale
- Traductions dynamiques depuis l'API (noms des Pokémon)

## Étapes de réalisation

### 1. Installation des dépendances

Installez les modules nécessaires.

Commandes:
```bash
npx expo install expo-localization
npm install i18next react-i18next
```

Ou alternative avec i18n-js:
```bash
npx expo install expo-localization
npm install i18n-js
```

### 2. Détection de la langue du système

Utilisez expo-localization pour identifier la langue de l'appareil.

Informations disponibles:
- `getLocales()` retourne les langues préférées de l'utilisateur
- Le code de langue (fr, en, es, de, ja, etc.)
- La région (FR, US, GB, etc.)
- La direction du texte (LTR, RTL)

Utilisation:
- Récupérez la première langue préférée
- Utilisez-la comme langue par défaut
- Prévoyez un fallback si la langue n'est pas supportée (anglais par défaut)

### 3. Création des fichiers de traduction

Organisez les traductions dans des fichiers JSON par langue.

Structure de fichiers:
```
src/
  locales/
    fr.json
    en.json
```

Contenu des fichiers:
- Tous les textes statiques de l'interface
- Messages d'erreur
- Labels des boutons et titres d'écran
- Textes de placeholder

Categories a couvrir:
- Navigation (titres des onglets definis dans `app/(tabs)/_layout.tsx`, titres des ecrans dans les layouts Expo Router)
- Liste (resultats, filtres, recherche)
- Detail (onglets, labels des stats)
- Favoris (messages, boutons)
- Erreurs et chargement

Note: Avec Expo Router, les titres d'ecrans se configurent via les options de `<Stack.Screen>` ou `<Tabs.Screen>` dans les fichiers `_layout.tsx`. Vous pouvez utiliser la fonction `t()` de i18next pour traduire ces titres dynamiquement.

Questions:
- Comment organiser les clés de traduction? Par écran? Par fonctionnalité?
- Comment gérer les textes longs vs courts?

### 4. Configuration de la bibliothèque i18n

Initialisez i18next ou i18n-js avec vos traductions.

Points de configuration:
- Langue par défaut (détectée depuis le système)
- Langue de fallback (anglais)
- Chargement des fichiers de traduction
- Interpolation pour les variables dynamiques

Initialisation:
- Créez un fichier `src/i18n/index.ts` pour la configuration
- Importez les fichiers de traduction
- Configurez la détection automatique de la langue

### 5. Utilisation dans les composants

Remplacez les textes codés en dur par des traductions.

Avec i18next/react-i18next:
- Utilisez le hook `useTranslation` dans chaque composant
- Appelez `t('cle.de.traduction')` pour obtenir le texte
- Passez des variables pour l'interpolation

Exemples de remplacement:
- "Pokédex" reste "Pokédex" (nom propre)
- "Rechercher" devient `t('search.placeholder')`
- "Aucun résultat" devient `t('search.noResults')`
- "Favoris" devient `t('navigation.favorites')`

### 6. Traduction des données Pokémon

L'API PokeAPI fournit des traductions pour les noms et descriptions.

Sources de traduction dans l'API:
- `pokemon-species.names`: noms traduits dans toutes les langues
- `pokemon-species.flavor_text_entries`: descriptions en plusieurs langues
- `pokemon-species.genera`: catégorie du Pokémon traduite
- `type.names`: noms des types traduits

Implémentation:
- Lors du chargement des données, récupérez les traductions pertinentes
- Filtrez par la langue active
- Affichez le nom traduit au lieu du nom anglais par défaut

Questions:
- Faut-il charger toutes les langues ou seulement la langue active?
- Comment gérer le cache des données traduites?
- Que faire si une traduction n'existe pas pour une langue?

### 7. Sélecteur de langue

Créez une interface pour changer de langue manuellement.

Options de placement:
- Dans un écran de paramètres
- Dans le header de navigation (menu)
- Bouton avec le drapeau de la langue actuelle

Fonctionnalités:
- Liste des langues disponibles avec drapeaux ou codes
- Changement immédiat de toute l'interface
- Persistance du choix avec AsyncStorage
- Indication de la langue active

### 8. Persistance du choix de langue

Sauvegardez la langue choisie par l'utilisateur.

Logique au démarrage:
1. Vérifier si une langue est sauvegardée dans AsyncStorage
2. Si oui, utiliser cette langue
3. Si non, détecter la langue du système
4. Si la langue système n'est pas supportée, utiliser le fallback

### 9. Gestion des pluriels et formats

Adaptez les textes selon les règles de chaque langue.

Exemples:
- "1 Pokémon trouvé" vs "25 Pokémon trouvés"
- Format des nombres: "1,000" (en) vs "1 000" (fr)
- Format des dates si applicable

i18next gère la pluralisation nativement avec des clés spécifiques.

## Points d'attention

### Qualité des traductions

- Vérifiez que les traductions sont naturelles (pas du mot à mot)
- Les termes techniques (Pokédex, Pokémon) restent en anglais
- Adaptez la longueur des boutons selon la langue
- Testez avec des langues à texte long (allemand) et court (chinois)

### Performance

- Ne rechargez pas toutes les données API quand la langue change
- Mettez en cache les traductions des Pokémon
- Le changement de langue doit être instantané pour l'interface
- Les données API peuvent se charger en arrière-plan

### Interface

- Les textes traduits peuvent être plus longs dans certaines langues
- Prévoyez des mises en page flexibles (pas de largeur fixe pour les textes)
- Les boutons doivent s'adapter à la longueur du texte
- Le RTL (arabe, hébreu) nécessite une inversion de la mise en page

### Cohérence

- Utilisez un glossaire pour les termes récurrents
- Les mêmes concepts doivent toujours être traduits de la même manière
- Les noms propres (Pokédex, Pokéball) ne sont pas traduits

## Critères de validation

Votre implémentation est correcte si:

- [ ] La langue du système est détectée automatiquement
- [ ] Tous les textes de l'interface sont traduits
- [ ] Au moins deux langues sont supportées (français, anglais)
- [ ] Un sélecteur permet de changer de langue
- [ ] Le choix de langue persiste après fermeture de l'app
- [ ] Les noms des Pokémon sont traduits (via l'API)
- [ ] Le changement de langue est immédiat sur l'interface
- [ ] Les pluriels sont gérés correctement

## Pour aller plus loin

### Améliorations possibles

- Support de 5+ langues (japonais, coréen, espagnol, allemand)
- Traduction des descriptions des attaques
- Support RTL pour l'arabe et l'hébreu
- Détection automatique de la langue du contenu
- Système de contribution pour ajouter des traductions

### Défis supplémentaires

- Implémenter le support RTL complet
- Créer un éditeur de traductions intégré (pour les contributeurs)
- Ajouter la traduction vocale des noms de Pokémon
- Gérer les variantes régionales (français de France vs français du Canada)

## Ressources

### Documentation officielle

- expo-localization: https://docs.expo.dev/versions/latest/sdk/localization/
- i18next: https://www.i18next.com/
- react-i18next: https://react.i18next.com/

### Documentation API

- Pokemon Species names: https://pokeapi.co/docs/v2#pokemon-species
- Le champ `names` contient les traductions

### Patterns recommandés

- Recherchez "React Native i18next setup"
- "expo-localization example"
- "React Native multi-language app"

### Bibliothèques alternatives

- i18n-js (plus simple, moins de fonctionnalités)
- lingui (compilation des traductions)
- react-intl (populaire dans l'écosystème React web)

## Architecture suggérée

### Structure des fichiers

Avec Expo Router, la configuration i18n s'initialise dans le layout racine `app/_layout.tsx`. Les titres des ecrans et onglets se configurent dans les fichiers `_layout.tsx` correspondants.

```
app/
  _layout.tsx              (initialisation de i18n, LanguageProvider)
  (tabs)/
    _layout.tsx            (titres d'onglets traduits avec t())
src/
  i18n/
    index.ts (configuration)
  locales/
    fr.json
    en.json
    es.json (optionnel)
  hooks/
    useLanguage.ts
  contexts/
    LanguageContext.tsx (si necessaire)
```

### Format des fichiers de traduction

```json
{
  "common": {
    "loading": "Chargement...",
    "error": "Une erreur est survenue",
    "retry": "Réessayer"
  },
  "navigation": {
    "home": "Accueil",
    "favorites": "Favoris",
    "settings": "Paramètres"
  },
  "pokemon": {
    "stats": "Statistiques",
    "types": "Types",
    "height": "Taille",
    "weight": "Poids",
    "abilities": "Talents"
  },
  "search": {
    "placeholder": "Rechercher un Pokémon...",
    "noResults": "Aucun Pokémon trouvé",
    "resultCount_one": "{{count}} Pokémon trouvé",
    "resultCount_other": "{{count}} Pokémon trouvés"
  }
}
```

## Tests à effectuer

- Changer la langue du système et relancer l'app
- Basculer entre les langues via le sélecteur
- Vérifier que tous les écrans sont traduits
- Tester les pluriels (0, 1, 2, 100 résultats)
- Vérifier les noms des Pokémon dans chaque langue
- Tester la persistance du choix de langue
- Vérifier la mise en page avec des textes longs
- Tester le fallback quand une traduction est manquante
