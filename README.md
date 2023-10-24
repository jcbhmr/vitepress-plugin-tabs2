# Tabs plugin for VitePress

📑 Generic tabs directive plugin for VitePress

<p align=center>
  <img src="https://i.imgur.com/IiJvZ62.png">
</p>

## Usage

```js
import { defineConfig } from "vitepress";
import tabs2 from "vitepress-plugin-tabs2";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    clearScreen: false,
    plugins: [tabs2()],
  },
});
```