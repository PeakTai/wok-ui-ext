import { DivModule } from 'wok-ui'
import { Timeline } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    super()
    this.addChild(new Timeline({
      items: [
        { title: 'Step 1', content: 'First step description' },
        { title: 'Step 2', content: 'Second step description' },
        { title: 'Step 3', content: 'Third step description' }
      ]
    }))
  }
}
