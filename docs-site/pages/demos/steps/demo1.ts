import { DivModule } from 'wok-ui'
import { Steps } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    super()
    this.addChild(new Steps({
      items: [
        { title: 'Step 1', description: 'Description 1' },
        { title: 'Step 2', description: 'Description 2' },
        { title: 'Step 3', description: 'Description 3' }
      ],
      current: 1
    }))
  }
}
