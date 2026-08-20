import { DivModule } from 'wok-ui'
import { Timeline } from 'wok-ui-ext'

export default class Demo2 extends DivModule {
  constructor() {
    super()
    this.addChild(new Timeline({
      showIndex: true,
      items: [
        { title: 'Create project', content: 'Initialize project structure' },
        { title: 'Develop', content: 'Implement core features' },
        { title: 'Test', content: 'Testing and bug fixes' },
        { title: 'Deploy', content: 'Release to production' }
      ]
    }))
  }
}
