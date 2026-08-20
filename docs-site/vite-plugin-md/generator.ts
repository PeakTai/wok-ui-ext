import type { MdFragment } from './parser'
import type { PageEntry } from './virtual-html'

/**
 * 转义 markdown 文本，使其可安全放入模板字符串 \`...\` 中
 */
function escapeTemplateLiteral(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

/**
 * 根据 fragments 生成 wok-ui Page 组件代码。
 *
 * @param fragments  解析后的 markdown/demo 片段数组
 * @param activePage 当前激活的页面名称（不含语言前缀）
 * @param lang       当前页面所属语言
 * @param allPages   全部语言的所有页面，用于 sidebar 过滤和语言切换
 */
export function generateCode(
  fragments: MdFragment[],
  activePage: string,
  lang: string,
  allPages: PageEntry[],
): string {
  const demoImports: string[] = []
  const contentItems: string[] = []
  let demoIndex = 0

  for (const frag of fragments) {
    if (typeof frag === 'string') {
      contentItems.push(`new Markdown(\`${escapeTemplateLiteral(frag)}\`)`)
    } else {
      demoIndex++
      demoImports.push(`import Demo${demoIndex} from "${frag.path}"`)
      contentItems.push(`new Demo${demoIndex}()`)
    }
  }

  const importBlock = demoImports.join('\n')
  const contentBlock = contentItems.map(item => `      ${item}`).join(',\n')

  // 全部语言的页面数据，每个条目包含 lang 字段
  const pagesJson = JSON.stringify(allPages.map(p => ({
    name: p.name,
    path: p.lang + '/' + p.name + '.html',
    title: p.meta.title,
    lang: p.lang,
    order: p.meta.order,
    description: p.meta.description,
    icon: p.meta.icon,
    category: p.meta.category,
  })))

  return `
import 'wok-ui/dist/style.css'
import '@lib/global.less'
import { getI18n } from 'wok-ui'
import { getWokUiExtI18n } from '@lib'
import { getDocsI18n } from '@docs/i18n'
import {DocsLayout} from '@docs/layout'
import {Markdown} from '@docs/markdown'
${importBlock}

class Page extends DocsLayout {
  constructor() {
    super({
      lang: '${lang}',
      activePage: '${activePage}',
      pages: ${pagesJson}
    })
  }

  buildMainContent() {
    return [
${contentBlock}
    ]
  }
}

// 初始化 i18n 后再挂载页面，确保 wok-ui 和 lib 的文案已切换为目标语言
(async () => {
  getWokUiExtI18n()
  getDocsI18n()
  await getI18n().setLang('${lang}')
  new Page().mount(document.body)
})()
`
}
