# 🚀 ClickUp Automation Framework
A scalable, reliable automation suite built with [Playwright] using the Page Object Model (POM) pattern.

## 📋 Table of Contents
1. [Tech Stack](#️-tech-stack)
2. [Prerequisites](#-prerequisites)
3. [Setup](#️-setup)
4. [Main Dependecies](#-main-dependecies)
5. [Project Architecture](#-project-architecture)
6. [Naming Conventions](#-naming-conventions)
7. [Running Tests](#-running-tests)
8. [Best Practices](#-best-practices)
---
## 🛠️ Tech Stack
* [Playwright](https://playwright.dev/) - Automation framework.
* [TypeScript](https://www.typescriptlang.org/docs/) - Programming language.
* [Allure Report](https://allurereport.org) - Test reporting tool.


## 📋 Prerequisites
- **Node.js:** v18.x or higher
- **Package Manager:** npm or yarn
- **IDE:** VS Code (Recommended)

## ⚙️ Setup
1. Clone the repository:
```bash
   git clone [your-repo-link]
```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
Create a .env file based on .env.example.

## 📦 Main Dependecies
The following core libraries are required to run and manage this testing framework:
- **@playwright/test**: Core execution framework.


## 📁 Project Architecture
We use a layered POM approach to separate concerns:
```bash
project-root/
├── src/
│   ├── api/           # API Service Layer
│   ├── pages/         # Page Objects (Locators and UI actions. No assertions here)
│   ├── tests/         # Test Scripts (Logic + Assertions)
│   └── utils/         # Reusable Helpers (API, DB, Logging, date formatters)
├── data/              # JSON/CSV Static Test Data
└── playwright.config.ts
```
## 📏 Naming Conventions
To maintain a clean codebase, all contributors must follow these standards:
| Type | Case | Example |
| :--- | :--- | :--- |
| Variables/Functions | `camelCase` | `loginBtn`, `clickSubmit()` |
| Constants | `UPPER_SNAKE` | `GLOBAL_TIMEOUT` |
| Classes/Pages | `PascalCase` | `AccountPage` |
| Files/Folders | `kebab-case` | `user-auth.spec.ts` |

## 🧪 Running Tests
- Run all tests: `npm run test`
- Run in Headed mode: `npm run pw:headed`
- Run a specific suite: `npx playwright test tests/login.spec.ts`

## ✅ Best Practices
- Zero Hardcoded Sleeps: Use dynamic waits or waitForSelector.
- Atomic Tests: Tests should be independent and runnable in any order.
- Descriptive Selectors: Prefer data-testid or aria-labels over brittle CSS/XPaths.
- Clean Code: If you find yourself copying code more than twice, create a Utility or Page Method.
