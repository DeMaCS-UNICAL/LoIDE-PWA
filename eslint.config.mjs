import { defineConfig } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import jest from "eslint-plugin-jest";
import reactHooks from "eslint-plugin-react-hooks";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:@typescript-eslint/recommended",
        "plugin:jest/recommended",
        "prettier",
    )),
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    plugins: {
        react: fixupPluginRules(react),
        "react-hooks": fixupPluginRules(reactHooks),
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        jest: fixupPluginRules(jest),
        prettier,
    },

    languageOptions: {
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
        globals: {
            ...globals.serviceworker,
            ...globals.browser,
            ...globals.jest,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
    },

    settings: {
        "import/resolver": {
            typescript: {},
        },
        "react": {
            "version": "detect"
        }
    },

    rules: {
        // Core
        "no-duplicate-imports": "error",
        // React
        "react/jsx-uses-react": "warn",
        "react/jsx-uses-vars": "error",
        "react/no-unescaped-entities": "warn",
        // React hooks
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        // TypeScript
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-expressions": "warn",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/ban-ts-comment": "warn",
        // Prettier
        "prettier/prettier": "error",
        // Jest
        "jest/valid-expect": "error",
        "jest/no-conditional-expect": "error",
    },
}]);