import marked from 'marked'
import highlight from 'highlight.js'
import '~/assets/scss/marked.scss'

const renderer = new marked.Renderer()
renderer.code = (code, lang) => {
  const content = highlight.highlightAuto(code).value
  // 解析行号
  const lineNums = content.split('\n').map((line, num) => {
    return `<li class="code-line-num">${num + 1}</li>`
  }).join('')
  return `
            <div class="marked-code-wrapper">
                <h2 class="code-title">${lang} Language</h2>
                <pre class="code-main ${lang ? 'lang-' + lang : ''}">
                  <ul class="code-lines">${lineNums}</ul>
                  <code class="code-content">${content}\n</code>
                </pre>
            </div>
          `.replace('\n', '')
}

renderer.list = (body, ordered) => {
  if (ordered) {
    return `<ol class="marked-list-wrapper">${body}</ol>`
  }
  return `<ul class="marked-list-wrapper">${body}</ul>`
}

renderer.blockquote = quote => {
  return `<blockquote class="marked-blockquote">${quote}</blockquote>`
}

marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

export default content => marked(content)
