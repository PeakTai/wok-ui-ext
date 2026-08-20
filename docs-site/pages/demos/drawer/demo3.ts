import { HBox } from 'wok-ui'
import { Button, showDrawer, showInfo } from 'wok-ui-ext'

export default class Demo3 extends HBox {
  constructor() {
    super({ gap: 12, children: [
      new Button({
        text: 'Custom Width (500px)',
        type: 'primary',
        onClick: () => showDrawer({
          title: 'Drawer Title',
          body: 'This drawer has a custom width of 500px.',
          width: 500,
          onShown: () => showInfo('Drawer opened')
        })
      }),
      new Button({
        text: 'Full Custom Content',
        type: 'default',
        onClick: () => showDrawer({
          replaceByBody: true,
          body: {
            tag: 'div',
            children: [
              { tag: 'h2', children: 'Custom Header', style: { padding: '24px 24px 0' } },
              { tag: 'p', children: 'This drawer replaces the entire panel with custom content.', style: { padding: '12px 24px', color: 'var(--text-secondary)' } }
            ]
          },
          onShown: () => showInfo('Drawer opened')
        })
      })
    ] })
  }
}
