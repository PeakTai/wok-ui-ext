import { DivModule, VBox } from 'wok-ui'
import { BodyText, Card, SecondaryText, Title } from 'wok-ui-ext'

export default class Demo3 extends DivModule {
  constructor() {
    super()
    this.addChild(
      new Card({
        header: new Title('Comments'),
        content: new VBox({
          gap: 12,
          children: [
            new Card({
              type: 'inner',
              content: new VBox({
                gap: 4,
                children: [
                  new SecondaryText('Alice · 2 hours ago'),
                  new BodyText('The nested card uses an inset background with no shadow.')
                ]
              })
            }),
            new Card({
              type: 'inner',
              content: new VBox({
                gap: 4,
                children: [
                  new SecondaryText('Bob · 1 hour ago'),
                  new BodyText('Looks clear and keeps the hierarchy readable.')
                ]
              })
            })
          ]
        })
      })
    )
  }
}
