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
    'prettier',
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
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
  },
  parserOptions: {
    // Avoid including this config file itself in the TypeScript project
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  overrides: [
    // Ensure config files aren't parsed with TS project service
    {
      files: ['**/.eslintrc.*'],
      parser: 'espree',
      parserOptions: { project: null },
    },
    {
      files: ['apps/**/*.{ts,tsx}'],
      parserOptions: {
        project: ['./apps/*/tsconfig.json'],
      },
    },
    {
      files: ['packages/**/*.{ts,tsx}'],
      parserOptions: {
        project: [
          './packages/*/tsconfig.json',
          './packages/*/tsconfig.stories.json',
          './packages/*/tsconfig.eslint.json',
        ],
      },
    },
    {
      files: ['**/tailwind.config.ts'],
      rules: {
        // Tailwind configs are executed outside TS path alias resolution; allow relative package imports here
        'import/no-relative-packages': 'off',
      },
    },
  ],
};
