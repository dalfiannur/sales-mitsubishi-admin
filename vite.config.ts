import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd())
  }
  
  return defineConfig({
    server: {
      port: 8001
    },
    plugins: [
      vue(),
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ]
  })
}
