import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{ts,js}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
]);
