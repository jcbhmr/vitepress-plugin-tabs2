import markdownItContainer from 'markdown-it-container'
/** @param {import('markdown-it')} md */
export default function markdownItTabs2(md) {
    md.use(markdownItContainer, 'tabs2', {
      render(tokens, index) {
        const token = tokens[index]
        if (token.nesting === 1) {
          const params = parseTabsParams(token.info)
          const shareStateKeyProp = params.shareStateKey
            ? `sharedStateKey="${md.utils.escapeHtml(params.shareStateKey)}"`
            : ''
          return `<Tabs2TabGroup ${shareStateKeyProp}>\n`
        } else {
          return `</Tabs2TabGroup>\n`
        }
      }
    })
    md.block.ruler.after('container_tabs2', 'tabs2', ruleBlockTab)
    const renderTab = (tokens, index) => {
      const token = tokens[index]
      if (token.nesting === 1) {
        const label = token.info
        const labelProp = `label="${md.utils.escapeHtml(label)}"`
        return `<Tabs2TabItem ${labelProp}>\n`
      } else {
        return `</Tabs2TabItem>\n`
      }
    }
    md.renderer.rules['tabs2_open'] = renderTab
    md.renderer.rules['tabs2_close'] = renderTab
  }