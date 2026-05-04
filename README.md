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
- **eslint** & **eslint-plugin-playwright**: Static code analysis and Playwright best practices.


## 📁 Project Architecture
We use a layered POM approach to separate concerns:
```bash
project-root/
├── .github/                        # GitHub specific configurations
│   ├── workflows                   # GitHub actions 
│   │   ├──playwright.yml           
│   ├── pull_request_template.md    # Pull Request template
├── auth/                           # Authentication Layer
│   ├── auth.json                   # Stores session state (cookies & localStorage) to bypass login in subsequent tests. 
│   ├── auth.setup.ts.              # Handles the global authentication flow (Logic to reuse or create a new session)
├── data/                           # Static Test Data. Centralized location for JSON or CSV files containing test constants
│   └── constants.js
├── src/
│   ├── api/                        # API Service Layer (Contains logic for direct API interactions)
│   ├── fixtures/                   # Fixtures configuration
│   │   ├──fixture                  # Extends Playwright's base test to inject Page Objects.
│   ├── pages/                      # Page Objects (Locators and UI actions. No assertions here)
│   │   ├── login.page.ts        
│   │   ├── worksapce.page.ts        
│   ├── tests/                      # Test Suites (This is the only layer where business logic and assertions (expect) reside.)
│   │   ├── api                     # Standalone backend verification.
│   │   ├── ui                      # End-to-end user flow verification. 
│   │   │   ├── login
│   │   │   │   ├── login.spec.ts
│   │   │   ├── workspace
│   │   │   │   ├── workspace.spec.ts
│   └── utils/                      # Reusable Helpers (API, DB, Logging, date formatters)
├── .env                            # Environment variables (Credentials, URLs)
├── .gitignore                      # Files and folders excluded from Git
└── eslint.config.mjs.              # Linter rules configuration
├── package.json                    # Project dependencies and scripts
└── playwright.config.ts            # Playwright global Configuration.
└── tsconfig.json.                  # TypeScript Configuration. Manages path mapping aliases (e.g., @pages/*, @data/*) 
└── README.md                       # Project documentation
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

| Description | Command |
| :--- | :--- |

| Execute linter to verify the code quality | `npm run lint` |
| Run all tests | `npm run pw` |
| Run in Headed mode | `npm run pw:headed` |
| Run a specific suite | `npm run pw:login` |
| Run a specific suite | `npm run pw:workspace` |


## ✅ Best Practices
- Zero Hardcoded Sleeps: Use dynamic waits or waitForSelector.
- Atomic Tests: Tests should be independent and runnable in any order.
- Descriptive Selectors: Prefer data-testid or aria-labels over brittle CSS/XPaths.
- Clean Code: If you find yourself copying code more than twice, create a Utility or Page Method.
