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
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-imports': 'warn',
  },
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.stories.json', './tsconfig.eslint.json'],
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
