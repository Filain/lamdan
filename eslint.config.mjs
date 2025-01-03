import pluginJs from "@eslint/js";
import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import importPlugin from 'eslint-plugin-import';

export default [
  {
    files: ["**/src/**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        browser: "readonly"
      },
      parser: tsParser,
      sourceType: "module",
      ecmaVersion: 2021,
    },
    plugins: {
      "@eslint/js": pluginJs,
      "@typescript-eslint": tsEslint,
      "import": importPlugin,
      "prettier": prettierPlugin,
    },
    rules: {
      "indent": ["error", 4,{ "SwitchCase": 1 }],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "import/prefer-default-export": "off",
      "import/no-extraneous-dependencies": "off",
      'import/order': [
        'error',
        {
          "groups": [
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
        },
      ],
      "no-underscore-dangle": "off",
      "no-unused-expressions": "off",
      "no-useless-constructor": "off",
      "class-methods-use-this": "off",
      "consistent-return": "off",
      "no-unused-vars": "warn",
      "no-shadow": "off",
      "no-param-reassign": "off",
      "prettier/prettier": "error"
    },
  },
  {
    files: ["**/src/**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
    rules: {
    },
  },

  {
    files: ["**/src/**/*.ts"],
    rules: {
      ...tsEslint.configs.recommended.rules,
    },
  },

  {
    ignores: ["node_modules/*", "dist/*"],
  },
];
