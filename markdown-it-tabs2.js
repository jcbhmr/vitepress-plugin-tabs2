import markdownItContainer from 'markdown-it-container'
/** @param {import('markdown-it')} md */
export default function markdownItTabs2(md) {
    md.use(markdownItContainer, 'tabs2', {
      render(tokens, index) {
        const token = tokens[index]
        if (token.nesting === 1) {
          const key = token.info.match(/key:(\S+)/)?.[1]
          const extraProps = key
            ? `sharedStateKey="${md.utils.escapeHtml(key)}"`
            : ''
          return `<Tabs2TabGroup ${extraProps}>\n`
        } else {
          return `</Tabs2TabGroup>\n`
        }
      }
    })
    md.block.ruler.after('container_tabs2', 'tab2', (state, startLine, endLine, silent) => {
      let pos = state.bMarks[startLine] + state.tShift[startLine]
      const max = state.eMarks[startLine]
      if (state.parentType !== 'container') {
        return false
      }
      if (pos + 2 > max) {
        return false
      }
      const marker = state.src.charCodeAt(pos)
      if (marker !== '='.charCodeAt(0)) {
        return false
      }
      // scan marker length
      const mem = pos
      pos = state.skipChars(pos + 1, marker)
      const tabMarkerLen = pos - mem
      if (tabMarkerLen < 2 - 1) {
        return false
      }
      // for validation mode
      if (silent) {
        return true
      }
      // search for the end of the block
      let nextLine = startLine
      let endStart = mem
      let endPos = pos
      while (true) {
        nextLine++
        if (nextLine >= endLine) {
          break // unclosed block is autoclosed
        }
    
        endStart = state.bMarks[nextLine] + state.tShift[nextLine]
        const max = state.eMarks[nextLine]
    
        if (endStart < max && state.sCount[nextLine] < state.blkIndent) {
          // non-empty line with negative indent should stop the list:
          // - ```
          //  test
          break
        }
    
        const startCharCode = state.src.charCodeAt(endStart)
        if (startCharCode !== '='.charCodeAt(0)) {
          continue
        }
    
        const p = state.skipChars(endStart + 1, marker)
        if (p - endStart !== tabMarkerLen) {
          continue
        }
        endPos = p
        break
      }
    
      const oldParent = state.parentType
      const oldLineMax = state.lineMax
      state.parentType = 'tab2'
      // this will prevent lazy continuations from ever going past our end marker
      state.lineMax = nextLine
    
      const startToken = state.push('tab2_open', 'div', 1)
      startToken.markup = state.src.slice(mem, pos)
      startToken.block = true
      startToken.info = state.src.slice(pos, max).trimStart()
      startToken.map = [startLine, nextLine - 1]
    
      state.md.block.tokenize(state, startLine + 1, nextLine)
    
      const endToken = state.push('tab2_close', 'div', -1)
      endToken.markup = state.src.slice(endStart, endPos)
      endToken.block = true
    
      state.parentType = oldParent
      state.lineMax = oldLineMax
      state.line = nextLine
      return true
    })
    md.renderer.rules['tab2_open'] = md.renderer.rules['tab2_close'] = (tokens, index) => {
      const token = tokens[index]
      if (token.nesting === 1) {
        const label = token.info
        const labelProp = `label="${md.utils.escapeHtml(label)}"`
        return `<Tabs2TabItem ${labelProp}>\n`
      } else {
        return `</Tabs2TabItem>\n`
      }
    }
  }