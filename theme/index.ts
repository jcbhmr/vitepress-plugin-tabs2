import type { Theme } from "vitepress";

export default {
    enhanceApp({ app, router, siteData }) {
        app.component("Tabs2TabGroup", Tabs2TabGroup)
        app.component("Tabs2TabItem", Tabs2TabItem)
    },
} satisfies Theme