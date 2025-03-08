# 🎭 Playwright + Cucumber (BDD) Template (TypeScript)

This template makes it easy to write End-to-End tests in TypeScript by combining **Playwright** and **Cucumber (Gherkin)** with **`playwright-bdd`**.

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)  
- [Bun](https://bun.sh/) installed globally (pnpm or npm also work)  

## 🚀 Installation

Install dependencies with **Bun**:

```bash
bun install
```

---

## 📂 Project Structure

```bash
tests/
├── features/
│   └── *.feature         # Gherkin files
├── steps/
│   └── *.steps.ts        # TypeScript step definitions
├── pages/
│   └── *.ts              # Page Objects
├── support/
│   └── *.ts              # Test setup/teardown
├── utils/
│   └── *.ts              # Utility/reusable functions  
├── playwright.config.ts  # Playwright configuration
└── tsconfig.json         # TypeScript configuration
└── biome.json            # Biome configuration
```

Each folder can be imported using the paths defined in `tsconfig.json`:
- `@features` for `tests/features`
- `@steps` for `tests/steps`
- `@pages` for `tests/pages`
- `@support` for `tests/support`
- `@utils` for `tests/utils`

By default, only exported elements from the different `index.ts` files will be accessible, except for the files in the `steps` folder.

---

## ⚙️ Available Scripts

### **Run tests (headless mode)**:

```bash
bun run test
```
→ Runs `bddgen` (automatic generation) and then executes Playwright tests in headless mode.

### **Run tests (with UI)**:

```bash
bun run test:ui
```
→ Runs `bddgen`, then executes the tests and automatically displays the interactive HTML report.

### **Run tests in headful mode (visible browser windows)**:

```bash
bun run test:headful
```
→ Runs `bddgen`, then executes the tests with browser windows visible.

### **Manually display the last generated test report**:

```bash
bun run report
```
→ Starts an HTTP server to display the last generated HTML report.

### Lint / Format

By default, this uses [biomejs](https://biomejs.dev) for linting and formatting.

```bash
bun run lint
```

Biome configuration can be modified in the `biome.json` file.

---

## 📝 Writing Tests

1. Create a `.feature` file in `tests/features`:

```gherkin
Feature: Example test

  Scenario: Check the page title
    Given the user is on the homepage
    Then the title should contain "Example"
```

2. Add the corresponding step definitions in `tests/steps`:

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
