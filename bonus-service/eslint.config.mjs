// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import { getRestrictedImportsEslint } from './get-restricted-imports.eslint.mjs';
import { getDependenciesFlowInward } from './get-dependencies-flow-inward.mjs';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      'no-restricted-imports': ['error', {
        paths: getRestrictedImportsEslint(),
      }],
      'import/no-restricted-paths': ['error', {
        zones: getDependenciesFlowInward(
          { pathTo: './src/0-business-rules', name: 'Business Rules' },
          { pathTo: './src/1-application-rules', name: 'Application Rules' },
          { pathTo: './src/2-adapters', name: 'Adapters' },
          { pathTo: './src/3-drivers', name: 'Drivers' },
        )
      }],
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        }
      }
    }
  },
  {
    files: ['./src/3-drivers/**/*', './test/**/*', './src/main.ts'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn'
    },
  },
);