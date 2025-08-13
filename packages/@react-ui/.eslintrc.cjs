module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/jsx-runtime',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'turbo',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/consistent-type-imports': 'warn',
    // Essential compatibility fixes for TypeScript ESLint v8
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    'react/prop-types': 'off',
    // Allow named exports for better refactoring and IDE support
    'import/prefer-default-export': 'off',

    // Enforce ES6+ arrow function components
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    // Discourage defaultProps in favor of default parameters
    'react/require-default-props': 'off',
    'react/default-props-match-prop-types': 'off',
    // Prefer default parameters over defaultProps for function components
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
  },
  parserOptions: {
    project: [
      './tsconfig.json',
      './tsconfig.stories.json',
      './tsconfig.eslint.json',
    ],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  overrides: [
    // Do not type-check ESLint config files with TS project service
    {
      files: ['**/.eslintrc.*'],
      parser: 'espree',
      parserOptions: { project: null },
    },
    {
      files: ['**/tailwind.config.ts'],
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
      },
      rules: {
        'import/no-relative-packages': 'off',
      },
    },
  ],
};
