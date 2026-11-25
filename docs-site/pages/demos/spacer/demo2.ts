import { DivModule } from 'wok-ui'
import {
  HSpacerTiny,
  HSpacerTight,
  HSpacerCompact,
  HSpacerBase,
  HSpacerRelaxed,
  HSpacerSpacious
} from 'wok-ui-ext'

export default class Demo2 extends DivModule {
  constructor() {
    super()
    const items: Array<[string, DivModule]> = [
      ['HSpacerTiny', new HSpacerTiny()],
      ['HSpacerTight', new HSpacerTight()],
      ['HSpacerCompact', new HSpacerCompact()],
      ['HSpacerBase', new HSpacerBase()],
      ['HSpacerRelaxed', new HSpacerRelaxed()],
      ['HSpacerSpacious', new HSpacerSpacious()]
    ]
    items.forEach(([label, spacer]) => {
      this.addChild({
        tag: 'div',
        style: { marginBottom: '12px' },
        children: [
          {
            tag: 'span',
            innerText: label,
            style: {
              fontSize: 'var(--font-size-small)',
              color: 'var(--text-secondary)'
            }
          },
          spacer,
          {
            tag: 'span',
            innerText: 'Next',
            style: {
              fontSize: 'var(--font-size-small)',
              color: 'var(--text-secondary)'
            }
          }
        ]
      })
    })
  }
}
