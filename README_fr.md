# 🎭 Playwright + Cucumber (BDD) Template (TypeScript)

Ce template permet d'écrire facilement des tests End-to-End en TypeScript en combinant **Playwright** et **Cucumber (Gherkin)** grâce à **`playwright-bdd`**.

---

## 📋 Pré-requis

- [Node.js](https://nodejs.org/) (version LTS recommandée)
- [Bun](https://bun.sh/) installé globalement (pnpm ou npm fonctionnent également)


## 🚀 Installation

Installer les dépendances avec **Bun** :

```bash
bun install
```

---

## 📂 Structure du projet

```bash
tests/
├── features/
│   └── *.feature         # Fichiers Gherkin
├── steps/
│   └── *.steps.ts        # Steps definitions TypeScript
├── pages/
│   └── *.ts              # Page Objects
├── support/
│   └── *.ts              # test setup/teardown
├── utils/
│   └── *.ts              # Fonctions utilitaire/réutilisables  
├── fixtures/
│   └── *.json            # Fichiers à lire pour vos tests e2e. ie: data.json, en.json...
├── playwright.config.ts  # Configuration Playwright
└── tsconfig.json         # Configuration TypeScript
└── biome.json            # Configuration Biome
```

Chaque dossier peut être importé avec l'aide des chemins définis dans `tsconfig.json`:
- `@features` pour `tests/features`
- `@steps` pour `tests/steps`
- `@pages` pour `tests/pages`
- `@support` pour `tests/support`
- `@utils` pour `tests/utils`
- `@fixtures` pour `tests/fixtures`

Par défaut, seuls les éléments exportés dans les différents `index.ts` seront accessibles, sauf pour les fichiers du dossiers `steps`.

### Importer des JSON directement pour les fixtures

Avec Typescript 4.0, vous pouvez importer des fichiers JSON directement dans vos tests. Par exemple, si vous avez un fichier `data.json` dans le dossier `fixtures`, vous pouvez l'importer comme ceci :

```ts
import * as data from '@fixtures/data.json' with {type: "json"}
//you can have the autocomplete for the data object!
console.log(data.hello) // "world"
```

Cela peut être utile si vous ne connaissez que les clé que l'objet que vous souhaitez utiliser, et non son contenu (comme pour des codes d'erreurs). Par exemple, dans votre Gherkin, vous pouvez utiliser :

```gherkin
Then Le message d'erreur doit correspondre à "error.invalid.email"
```

Et dans la définition du step :

```ts
import * as errors from '@fixtures/errors.json' with {type: "json"}

Then('Le message d\'erreur doit correspondre à {string}', async ({ page }, errorKey: string) => {
  await expect(page).toHaveText(errors[errorKey]);
});
```

---
## ⚙️ Scripts disponibles

### **Lancer les tests (headless)** :

```bash
bun run test
```
→ Exécute `bddgen` (génération automatique) puis lance les tests Playwright en mode headless.

### **Lancer les tests (avec UI)** :

```bash
bun run test:ui
```
→ Exécute `bddgen` puis lance les tests et affiche automatiquement le rapport HTML interactif.

### **Lancer les tests en mode headful (navigateur visible)** :

```bash
bun run test:headful
```
→ Exécute `bddgen` puis lance les tests en affichant les fenêtres du navigateur.

### **Afficher manuellement le rapport des derniers tests exécutés** :

```bash
bun run report
```
→ Lance un serveur HTTP pour afficher le dernier rapport HTML généré.

### Lint / format
Par défaut, utilise [biomejs](https://biomejs.dev) pour le linting et le formatage.

```bash
bun run lint
```

La configuration de biome peut être modifié à partir du fichier `biome.json`.

---
## 📝 Écrire des tests

1. Créer un fichier `.feature` dans `tests/features` :

```gherkin
Feature: Exemple de test

  Scenario: Vérifier le titre de la page
    Given the user is on the homepage
    Then the title should contain "Exemple"
```

2. Ajouter les steps correspondants dans `tests/steps` :

```ts
import { createBdd } from 'playwright-bdd';
import { test, expect } from '@playwright/test';

const { Given, Then } = createBdd(test);

Given('the user is on the homepage', async ({ page }) => {
  await page.goto('https://example.com');
});

Then('the title should contain {string}', async ({ page }, title: string) => {
  await expect(page).toHaveTitle(new RegExp(title));
});
```