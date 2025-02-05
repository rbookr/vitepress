import MarkdownIt from 'markdown-it'
import { RenderRule } from 'markdown-it/lib/renderer'
import Token from 'markdown-it/lib/token'
import container from 'markdown-it-container'

export const containerPlugin = (md: MarkdownIt) => {
  md.use(...createContainer('tip', 'TIP', md))
    .use(...createContainer('info', 'INFO', md))
    .use(...createContainer('warning', 'WARNING', md))
    .use(...createContainer('danger', 'DANGER', md))
    .use(...createContainer('details', 'Details', md))
    // explicitly escape Vue syntax
    .use(container, 'v-pre', {
      render: (tokens: Token[], idx: number) =>
        tokens[idx].nesting === 1 ? `<div v-pre>\n` : `</div>\n`
    })
    .use(container, 'style', {
      //居中
      validate: function (params: string) {
        return params.trim().match(/^style\s+(.*)$/) //以style开头
      },
      render: (tokens: Token[], idx: number) => {
        let m = tokens[idx].info.trim().match(/^style\s+(.*)$/)
        return tokens[idx].nesting === 1
          ? `<div style="${m![1]}" >\n`
          : `</div>\n`
      }
    })
    .use(container, 'class', {
      //直接添加类的名字
      //居中
      validate: function (params: string) {
        return params.trim().match(/^class\s+(.*)$/) //以style开头
      },
      render: (tokens: Token[], idx: number) => {
        let m = tokens[idx].info.trim().match(/^class\s+(.*)$/)
        return tokens[idx].nesting === 1
          ? `<div class="${m![1]}" >\n`
          : `</div>\n`
      }
    })
}

type ContainerArgs = [typeof container, string, { render: RenderRule }]

function createContainer(
  klass: string,
  defaultTitle: string,
  md: MarkdownIt
): ContainerArgs {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx]
        const info = token.info.trim().slice(klass.length).trim()
        if (token.nesting === 1) {
          const title = md.renderInline(info || defaultTitle)
          if (klass === 'details') {
            return `<details class="${klass} custom-block"><summary>${title}</summary>\n`
          }
          return `<div class="${klass} custom-block"><p class="custom-block-title">${title}</p>\n`
        } else {
          return klass === 'details' ? `</details>\n` : `</div>\n`
        }
      }
    }
  ]
}
