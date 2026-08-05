import { Button, showModal } from 'wok-ui-ext'
import { VBox } from 'wok-ui'

export default class Demo6 extends Button {
  constructor() {
    super({
      text: 'Replace By Body',
      type: 'primary',
      onClick: () => {
        const modal = showModal({
          replaceByBody: true,
          body: add => {
            add({
              style: {
                background: 'var(--bg-card)',
                borderRadius: '32px',
                padding: '24px'
              },
              children: new VBox({
                gap: 12,
                children: [
                  { tag: 'h3', innerText: 'Custom Title' },
                  {
                    tag: 'p',
                    innerText: 'The modal header, buttons and footer are replaced by this body.'
                  },
                  new Button({ text: 'Close', onClick: () => modal.close() })
                ]
              })
            })
          }
        })
      }
    })
  }
}
