import { DivModule, CreateDomModuleOptions } from 'wok-ui'
import {
  SpacerTiny,
  SpacerTight,
  SpacerCompact,
  SpacerBase,
  SpacerRelaxed,
  SpacerSpacious
} from 'wok-ui-ext'

function block(text: string): CreateDomModuleOptions {
  return {
    tag: 'div',
    innerText: text,
    style: {
      height: '28px',
      lineHeight: '28px',
      paddingLeft: '12px',
      background: 'var(--bg-hover)',
      borderRadius: '6px',
      fontSize: 'var(--font-size-small)',
      color: 'var(--text-secondary)'
    }
  }
}

export default class Demo1 extends DivModule {
  constructor() {
    super()
    const items: Array<[string, DivModule]> = [
      ['SpacerTiny', new SpacerTiny()],
      ['SpacerTight', new SpacerTight()],
      ['SpacerCompact', new SpacerCompact()],
      ['SpacerBase', new SpacerBase()],
      ['SpacerRelaxed', new SpacerRelaxed()],
      ['SpacerSpacious', new SpacerSpacious()]
    ]
    items.forEach(([label, spacer]) => {
      this.addChild(block(label))
      this.addChild(spacer)
    })
    this.addChild(block('End'))
  }
}
