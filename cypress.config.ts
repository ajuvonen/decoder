import {defineConfig} from 'cypress';

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1100,
  },
  component: {
    viewportWidth: 1100,
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
