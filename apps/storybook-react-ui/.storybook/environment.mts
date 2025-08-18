import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = path.dirname(currentFilename);

// Environment configuration for Storybook
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = !isProduction;

// Paths configuration
export const paths = {
  // Local workspace package path
  localPackage: path.resolve(currentDirname, '../../../packages/@react-ui/src'),
  localComponents: path.resolve(
    currentDirname,
    '../../../packages/@react-ui/src/lib/components',
  ),
  localStyles: path.resolve(
    currentDirname,
    '../../../packages/@react-ui/src/lib/system/globals.css',
  ),

  // Published package paths
  publishedPackage: path.resolve(
    currentDirname,
    '../node_modules/@gmzh/react-ui',
  ),
  publishedComponents: path.resolve(
    currentDirname,
    '../node_modules/@gmzh/react-ui/dist/lib/components',
  ),
};

export const getStoriesPath = () => {
  return isProduction
    ? `${paths.publishedComponents}/**/*.stories.@(js|jsx|ts|tsx|mjs|cjs)`
    : `${paths.localComponents}/**/*.stories.@(js|jsx|ts|tsx|mjs|cjs)`;
};

export const getPackageAlias = () => {
  return isProduction
    ? { '@gmzh/react-ui': paths.publishedPackage }
    : { '@gmzh/react-ui': paths.localPackage };
};
