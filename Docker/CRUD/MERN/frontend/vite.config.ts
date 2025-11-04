import { defineConfig } from 'vite'

// Basic Vite config. We avoid requiring @vitejs/plugin-react here so the
// dev server can start even if the plugin isn't installed. Vite's esbuild
// will still handle JSX for simple apps. Install the plugin later for
// React-specific transforms and fast refresh.
export default defineConfig({
  // keep defaults; add plugins here if you install @vitejs/plugin-react
})
