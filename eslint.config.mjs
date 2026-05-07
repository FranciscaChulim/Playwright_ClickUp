import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';
import js from "@eslint/js";

export default tseslint.config(
  // 1. STANDALONE GLOBAL IGNORES (Must have ONLY the 'ignores' key)
  {
    ignores: [
      "test-results/",
      "playwright-report/",
      "node_modules/",
      "eslint.config.mjs",
      "allure-results/", 
      "allure-report/",  
      "**/allure-results/**", 
      "**/allure-report/**"
    ],
  },

  // 2. GLOBAL PLUGINS & CONFIGS
  {
    plugins: {
      playwright,
    },
  },
  
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    // 3. TYPE-AWARE LINTING SETUP
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
    }
  },

  {
    // 4. PLAYWRIGHT RULES
    files: ["tests/**", "**/tests/**", "**/*.spec.ts", "**/*.test.ts"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
      "playwright/no-force-option": "warn",
      "playwright/no-get-by-title": "warn",
      "playwright/no-conditional-in-test": "error",
      "playwright/no-skipped-test": "warn",
    },
  },

  {
    // 5. GENERAL TS & STYLE RULES
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "semi": ["error", "always"],
      "prefer-const": "error",
    },
  }
);