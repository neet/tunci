import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import _import from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: fixupConfigRules(
      compat.extends(
        "eslint:recommended",
        "plugin:import/recommended",
        "plugin:prettier/recommended",
        "next/core-web-vitals",
      ),
    ),

    plugins: {
      import: fixupPluginRules(_import),
      "simple-import-sort": simpleImportSort,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      "simple-import-sort/imports": "error",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],

    extends: fixupConfigRules(
      compat.extends(
        "plugin:@typescript-eslint/strict",
        "plugin:import/typescript",
        "plugin:prettier/recommended",
      ),
    ),

    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
]);
