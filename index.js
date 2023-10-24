import injectThemeWrapper from "./lib/injectEnhanceApp/index.js";
import getUserConfig from "./lib/getUserConfig.js";
import markdownItTabs2 from "./markdown-it-tabs2.js";
import.meta.resolve ??= (specifier) => new URL(specifier, import.meta.url);
export default async function tabs2() {
  const userConfig = await getUserConfig();
  userConfig.markdown ??= {};
  userConfig.markdown.config ??= () => {};
  const originalUserConfigMarkdownConfig = userConfig.markdown.config;
  userConfig.markdown.config = function (md) {
    md.use(markdownItTabs2);
    originalUserConfigMarkdownConfig.apply(this, arguments);
  };
  return /** @type {import('vite').PluginOption} */ ({
    name: "vitepress-plugin-tabs2",
    config(config) {
      injectThemeWrapper(config, import.meta.resolve("./theme/index.ts"));
    },
  });
}
