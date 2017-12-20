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
          `.replace('\n', ' ')
}

renderer.list = (body, ordered) => {
  if (ordered) {
    return `<ol class="marked-list-wrapper ol">${body}</ol>`
  }
  return `<ul class="marked-list-wrapper ul">${body}</ul>`.replace(/\s+/g, ' ')
}

renderer.blockquote = quote => {
  return `<blockquote class="marked-blockquote">${quote}</blockquote>`.replace(/\s+/g, ' ')
}

// 连接进行处理，防外链
renderer.link = (href, title, text) => {
  const isSelf = href.includes('ryths.cn')
  const textIsImage = text.includes('<img')
  const str = `
                <a class="marked-link" href="${href}"
                    target="_blank" 
                    title="${title || (textIsImage ? href : text)}" 
                    ${isSelf ? '' : 'rel="external nofollow noopenter"'}>
                    ${text}
                </a>
              `
  return str.replace(/\s+/g, ' ')
}

renderer.image = (src, title, alt) => {
  return `
          <img class="marked-img" src="${src}"
            title="${title || alt || 'ryths.cn'}"
            alt="${alt || title || src}"
          />
         `.replace(/\s+/g, ' ')
}

renderer.table = (header, body) => {
  return `
          <div class="marked-table-wrapper">
            <table class="table">
              <thead class="thead">${header}</thead>
              <tbody class="tbody">${body}</tbody>
            </table>
          </div>
        `.replace(/\s+/g, ' ')
}

renderer.hr = () => {
  return `<hr class="marked-hr"/>`
}

marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true
})

export default content => marked(content)
