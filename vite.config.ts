import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

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
        '@': path.resolve(__dirname, './src'),
        "@components": path.resolve(__dirname, './src/components'),
        "@graphql": path.resolve(__dirname, './src/graphql'),
        "@services": path.resolve(__dirname, './src/services'),
        "@interfaces": path.resolve(__dirname, './src/interfaces'),
      }
    },
    base: env.VITE_BASE_PATH || "/",
  }
})
