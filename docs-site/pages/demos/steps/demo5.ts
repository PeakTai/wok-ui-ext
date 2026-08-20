import { DivModule } from 'wok-ui'
import { Steps, showInfo } from 'wok-ui-ext'

export default class Demo5 extends DivModule {
  constructor() {
    super()
    this.addChild(new Steps({
      items: [
        { title: 'Step 1', description: 'This is a description' },
        { title: 'Step 2', description: 'This is a description' },
        { title: 'Step 3', description: 'This is a description' }
      ],
      current: 1,
      onChange: (index: number) => showInfo(`click step ${index + 1}`)
    }))
  }
}
