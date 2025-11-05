import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use the official React plugin so Vite produces a proper React build
// (transforms JSX, enables Fast Refresh in dev). The dependency is
// declared in package.json; the builder installs it during image build.
export default defineConfig({
  plugins: [react()],
})
