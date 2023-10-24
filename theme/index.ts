import type { Theme } from "vitepress";
import Tabs2TabGroup from "./Tabs2TabGroup.vue"
import Tabs2TabItem from "./Tabs2TabItem.vue"
import { provideTabsSharedState } from "./useTabsSelectedState.ts"

export default {
    enhanceApp({ app, router, siteData }) {
        provideTabsSharedState(app)
        app.component("Tabs2TabGroup", Tabs2TabGroup)
        app.component("Tabs2TabItem", Tabs2TabItem)
    },
} satisfies Theme