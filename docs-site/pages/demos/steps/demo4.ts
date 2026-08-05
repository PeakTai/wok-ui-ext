import { DivModule } from 'wok-ui'
import { Steps } from 'wok-ui-ext'

export default class Demo4 extends DivModule {
  constructor() {
    super()
    this.addChild(new Steps({
      items: [
        { title: 'Step 1', description: 'This is a description' },
        { title: 'Step 2', description: 'This is a description' },
        { title: 'Step 3', description: 'This is a description' }
      ],
      current: 1,
      status: 'error'
    }))
  }
}
