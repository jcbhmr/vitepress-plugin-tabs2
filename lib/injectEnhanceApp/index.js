import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import.meta.resolve ??= (specifier) => new URL(specifier, import.meta.url)
/**
 * @param {import('vite').ResolvedConfig} config
 * @param {import('node:fs').PathLike} enhanceAppFile
 */
export default function injectEnhanceApp(config, enhanceAppFile) {
    const themeWrapperFilePath = fileURLToPath(import.meta.resolve("./themeWrapper.ts"))
    const enhanceAppFilePath = enhanceAppFile instanceof URL ? fileURLToPath(enhanceAppFile) : enhanceAppFile.toString()
    let themeIndexAlias = config.resolve.alias.find(x => x.find === "@theme/index")
    if (!themeIndexAlias) {
        const themeAlias = config.resolve.alias.find(x => x.find === "@theme")
        themeIndexAlias = { find: "@theme/index", replacement: join(themeAlias.replacement, "index") }
        config.resolve.alias.unshift(themeIndexAlias)
    }
    config.resolve.alias.push({ find: "~vitepress-plugin-tabs2/user-theme", replacement: themeIndexAlias.replacement })
    themeIndexAlias.replacement = themeWrapperFilePath
    config.resolve.alias.push({ find: "~vitepress-plugin-tabs2/enhance-app-theme", replacement: enhanceAppFilePath })
}