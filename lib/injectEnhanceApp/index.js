import { fileURLToPath } from 'node:url'
import.meta.resolve ??= (specifier) => new URL(specifier, import.meta.url)
/**
 * @param {import('vite').ResolvedConfig} config
 * @param {import('node:fs').PathLike} enhanceAppFile
 */
export default function injectEnhanceApp(config, enhanceAppFile) {
    const themeWrapperFilePath = fileURLToPath(import.meta.resolve("./themeWrapper.ts"))
    const enhanceAppFilePath = enhanceAppFile instanceof URL ? fileURLToPath(enhanceAppFile) : enhanceAppFile.toString()
    const themeIndexAlias = config.resolve.alias.find(x => x.find === "@theme/index")
    config.resolve.alias.push({ find: "~user-theme", replacement: themeIndexAlias.replacement })
    themeIndexAlias.replacement = themeWrapperFilePath
    config.resolve.alias.push({ find: "~enhance-app-theme", replacement: enhanceAppFilePath })
}