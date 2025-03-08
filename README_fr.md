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

Par défaut, seuls les éléments exportés dans les différents `index.ts` seront accessibles, sauf pour les fichiers du dossiers `steps`.

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