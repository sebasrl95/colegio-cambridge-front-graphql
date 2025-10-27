import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
    ],
    resolve: {
      alias: {
        "@components": "/src/components",
        "@graphql": "/src/graphql",
        "@services": "/src/services",
        "@types": "/src/types",
      }
    },
    base: env.VITE_BASE_PATH || "/",
  }
})
