import type { StorybookConfig } from '@storybook/react-vite';
import {
  isProduction,
  isDevelopment,
  getStoriesPath,
  getPackageAlias,
} from './environment.mts';

// !https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated

const config: StorybookConfig = {
  stories: [getStoriesPath()],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      resolve: {
        alias: getPackageAlias(),
      },
      // Allow file system access to the packages directory in development
      server: isDevelopment
        ? {
            fs: {
              allow: ['..', '../..', '../../packages'],
            },
          }
        : undefined,
      // Include workspace packages in dependency optimization for development
      optimizeDeps: {
        include: ['react', 'react-dom'],
        exclude: isDevelopment ? ['@gmzh/react-ui'] : [],
      },
    });
  },
};

export default config;
