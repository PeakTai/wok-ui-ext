import { DivModule } from 'wok-ui'
import { Table, TableColumn } from 'wok-ui-ext'

interface User {
  name: string
  age: number
  email: string
}

export default class Demo2 extends DivModule {
  constructor() {
    super()
    this.addChild(new Table<User>({
      list: [],
      cols: [
        new TableColumn({ name: 'Name', content: row => row.name }),
        new TableColumn({ name: 'Age', content: row => `${row.age}` }),
        new TableColumn({ name: 'Email', content: row => row.email })
      ],
      emptyDesc: 'No data'
    }))
  }
}
