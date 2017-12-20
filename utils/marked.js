import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/vs2015.css'
import '~/assets/scss/marked.scss'

const renderer = new marked.Renderer()
renderer.code = (code, lang) => {
  const content = highlight.highlightAuto(code).value
  // 解析行号
  const lineNums = content.split('\n').map((line, num) => {
    return `<li class="code-line-num">${num + 1}</li>`
  }).join('')
  return `
            <div class="code-wrapper">
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
    return `<ol class="list-wrapper">${body}</ol>`
  }
  return `<ul class="list-wrapper">${body}</ul>`
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
