import callsites from "callsites"
export default async function getUserConfig() {
    const configFileURL = callsites()
        .flatMap(x => x.getFileName() || [])
        .find(x => /(?:\/|\\)config\.m?(?:j|t)s\.timestamp-\d+-\w+\.mjs$/.test(x))
    const { default: userConfigExport } = await import(configFileURL)
    return /** @type {import('vitepress').UserConfig} */ (await userConfigExport)
}