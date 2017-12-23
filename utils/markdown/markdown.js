import MarkdownIt from 'markdown-it'
import highlight from 'highlight.js'
import emojiPlugin from 'markdown-it-emoji'
import checkboxPlugin from 'markdown-it-checkbox'
import katexPlugin from 'markdown-it-katex'
import 'highlight.js/styles/vs2015.css'
import '~/assets/css/katex/katex.css'
import '~/assets/scss/markdown.scss'

const md = new MarkdownIt({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: true,
  typographer: true,
  quotes: '“”‘’'
}).use(emojiPlugin)
  .use(checkboxPlugin, {
    divWrap: true,
    divClass: 'md-checkbox',

  })
  .use(katexPlugin, {
    throwOnError: false,
    errorColor: '#F56C6C'
  })

// 代码解析
md.renderer.rules.fence = function (tokens, idx, options, env, slf) {
  const token = tokens[idx]
  const lang = token.info ? token.info.replace(/(^\s*)|(\s*$)/g, '') : ''
  const code = token.content ? token.content : ''
  const content = highlight.highlightAuto(code).value
// 解析行号
  const lineNums = content.split('\n').map((line, num) => {
    return `<li class="code-line-num">${num + 1}</li>`
  }).join('')
  return `
        <div class="md-code-wrapper">
            <h2 class="code-title">${lang} Language</h2>
            <pre class="code-main ${lang ? 'lang-' + lang : ''}">
              <ul class="code-lines">${lineNums}</ul>
              <code class="code-content">${content}\n</code>
            </pre>
        </div>
      `.replace('\n', ' ')
}
// code_inline解析
const codeInlineRenderer = md.renderer.rules.code_inline || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}
md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  token.attrJoin('class', 'md-code-inline')
  return codeInlineRenderer(tokens, idx, options, env, self)
}

const imageRenderer = md.renderer.rules.image
// 图片解析
md.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const src = token.attrGet('src')
  if (!src) {
    return ''
  }
  const title = token.attrGet('title')
  const alt = token.attrGet('alt')
  token.attrSet('title', title || alt || 'ryths.cn')
  token.attrSet('alt', alt || title || src)
  token.attrJoin('class', 'md-img')
  return imageRenderer(tokens, idx, options, env, self)
}

// 链接解析
const linkRenderer = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  const href = token.attrGet('href')
  if (!href) {
    return ''
  }
  const title = token.attrGet('title')
  token.attrJoin('class', 'md-link')
  token.attrSet('title', title || href)
  token.attrSet('target', '_blank')

  if (!href.includes('ryths.cn')) {
    token.attrSet('rel', 'extrenal nofollow noopenter')
  }
  return linkRenderer(tokens, idx, options, env, self)
}

// ordered_list_open
const orderedListRenderer = md.renderer.rules.ordered_list_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}
md.renderer.rules.ordered_list_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  token.attrJoin('class', 'md-list md-ol')
  return orderedListRenderer(tokens, idx, options, env, self)
}

// bullet_list_open
const bulletListRenderer = md.renderer.rules.ordered_list_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}
md.renderer.rules.bullet_list_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  token.attrJoin('class', 'md-list md-ul')
  return bulletListRenderer(tokens, idx, options, env, self)
}

// blockquote_open
const blockquoteRenderer = md.renderer.rules.blockquote_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}
md.renderer.rules.blockquote_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  token.attrJoin('class', 'md-blockquote')
  return blockquoteRenderer(tokens, idx, options, env, self)
}

// table
const tableOpenRenderer = md.renderer.rules.table_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}
md.renderer.rules.table_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  token.attrJoin('class', 'md-table')
  const content = tableOpenRenderer(tokens, idx, options, env, self)
  return `<div class="md-table-wrapper">${content}`.replace(/\s+/g, ' ')
}
const tableCloseRenderer = md.renderer.rules.table_close || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}
md.renderer.rules.table_close = (tokens, idx, options, env, self) => {
  const content = tableCloseRenderer(tokens, idx, options, env, self)
  return `${content}</div>`.replace(/\s+/g, ' ')
}

// hr
const hrRenderer = md.renderer.rules.hr || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}
md.renderer.rules.hr = (tokens, idx, options, env, self) => {
  tokens[idx].attrJoin('class', 'md-hr')
  return hrRenderer(tokens, idx, options, env, self)
}

// code-block
const codeBlockRenderer = md.renderer.rules.code_block || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
}
md.renderer.rules.code_block = (tokens, idx, options, env, self) => {
  tokens[idx].attrJoin('class', 'md-code-block')
  return codeBlockRenderer(tokens, idx, options, env, self)
}

export default content => md.render(content)
