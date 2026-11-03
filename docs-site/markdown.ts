import { DivModule } from "wok-ui"
import { marked, Renderer } from "marked"
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import 'github-markdown-css/github-markdown.css'

/**
 * 站点部署的子路径（如 GitHub Pages 的 /wok-ui-ext/），来自 vite.config.ts 的 base 配置。
 * dev 与 build 统一使用该值。
 */
const BASE_URL: string = import.meta.env.BASE_URL

// 配置 marked 代码高亮
const renderer = new Renderer()
renderer.code = function (token: { text: string; lang?: string }): string {
  const lang = token.lang || ''
  const code = token.text
  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
  const highlighted = hljs.highlight(code, { language }).value
  return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`
}

/**
 * 站内绝对路径链接自动拼接 BASE_URL，兼容子路径部署。
 * - 以 / 开头的站内链接（如 /zh-CN/icons.html）→ 加上前缀
 * - 外部链接（http/https）、相对链接、锚点链接保持不变
 */
renderer.link = function ({ href, title, tokens }: {
  href: string
  title?: string | null
  tokens: unknown[]
}): string {
  let url = href
  if (url.startsWith('/') && !url.startsWith('//')) {
    url = BASE_URL.replace(/\/$/, '') + url
  }
  // 复用 marked 内置的 inline 解析，保留链接文字中的行内格式（如 `code`、**bold**）
  const text = (this.parser as { parseInline: (toks: unknown[]) => string }).parseInline(tokens)
  const titleAttr = title ? ` title="${title}"` : ''
  const isExternal = /^https?:\/\//.test(href)
  const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
  return `<a href="${url}"${titleAttr}${targetAttr}>${text}</a>`
}

marked.setOptions({ renderer })

export class Markdown extends DivModule {
  constructor(content: string) {
    super()
    this.el.classList.add('markdown-body')
    this.el.innerHTML = marked.parse(content) as string
  }
}
