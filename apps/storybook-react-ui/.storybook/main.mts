import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

// !https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated

const config: StorybookConfig = {
  stories: [
    // consume stories from the installed @gmzh/react-ui package
    `${path.resolve(
      __dirname,
      '../node_modules/@gmzh/react-ui/dist/lib/components',
    )}/**/*.stories.@(js|jsx|ts|tsx|mjs|cjs)`,
    // No local stories; only render package stories
  ],
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
    return mergeConfig(config, {});
  },
};

export default config;
