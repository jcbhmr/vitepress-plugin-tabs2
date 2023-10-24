import { fileURLToPath } from 'node:url'

import.meta.resolve ??= (specifier) => new URL(specifier, import.meta.url)

export default function tabs2() {
    /** @type {import('vite').PluginOption} */
    const plugin = {
        config(config) {
            config.resolve.alias["vitepress-plugin-tabs2"] = fileURLToPath(import.meta.resolve("./index.client.js"))
        }
    }
    return plugin
}