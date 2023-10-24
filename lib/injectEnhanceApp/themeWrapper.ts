import type { EnhanceAppContext, Theme } from "vitepress"
// @ts-ignore
import UserTheme from "~vitepress-plugin-tabs2/user-theme"
declare const UserTheme: Theme
// @ts-ignore
import EnhanceAppTheme from "~vitepress-plugin-tabs2/enhance-app-theme"
declare const EnhanceAppTheme: Theme
const { enhanceApp: myEnhanceApp } = EnhanceAppTheme
UserTheme.enhanceApp ??= () => {}
const originalEnhanceApp = UserTheme.enhanceApp
UserTheme.enhanceApp = async function ({ app, router, siteData }: EnhanceAppContext) {
    await myEnhanceApp!.apply(this, arguments)
    await originalEnhanceApp.apply(this, arguments)
}
export default UserTheme
// @ts-ignore
export * from "~vitepress-plugin-tabs2/user-theme"