import { DivModule } from 'wok-ui'
import { Breadcrumb } from 'wok-ui-ext'

export default class Demo2 extends DivModule {
  constructor() {
    super()
    this.addChild(new Breadcrumb({
      separator: '>',
      items: [
        { text: 'Home', onClick: () => console.log('home') },
        { text: 'Category', onClick: () => console.log('category') },
        { text: 'Current Page' }
      ]
    }))
  }
}
