import { defineConfig } from 'vitepress'
import tabs2 from "vitepress-plugin-tabs2"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [tabs2()]
  }
})
