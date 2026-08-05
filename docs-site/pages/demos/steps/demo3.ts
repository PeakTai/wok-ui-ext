import { DivModule } from 'wok-ui'
import { Steps } from 'wok-ui-ext'

export default class Demo3 extends DivModule {
  constructor() {
    super()
    this.addChild(new Steps({
      direction: 'vertical',
      items: [
        { title: 'Step 1', description: 'This is a description' },
        { title: 'Step 2', description: 'This is a description' },
        { title: 'Step 3', description: 'This is a description' }
      ],
      current: 1
    }))
  }
}
