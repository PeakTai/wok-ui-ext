import { DivModule } from 'wok-ui'
import { Table, TableColumn } from 'wok-ui-ext'

interface User {
  name: string
  age: number
  email: string
  department: string
  city: string
  phone: string
  status: string
}

export default class Demo3 extends DivModule {
  constructor() {
    super()
    const users: User[] = Array.from({ length: 30 }, (_, i) => ({
      name: `User ${i + 1}`,
      age: 20 + (i % 20),
      email: `user${i + 1}@example.com`,
      department: `Dept ${i % 5}`,
      city: `City ${i % 8}`,
      phone: `+1 555-${String(1000 + i).slice(1)}`,
      status: i % 3 === 0 ? 'Active' : 'Inactive'
    }))
    this.addChild(new Table<User>({
      fixedHeader: true,
      height: 300,
      list: users,
      cols: [
        new TableColumn({ name: 'Name', width: 140, content: row => row.name }),
        new TableColumn({ name: 'Age', width: 80, content: row => `${row.age}` }),
        new TableColumn({ name: 'Email', width: 200, content: row => row.email }),
        new TableColumn({ name: 'Department', width: 140, content: row => row.department }),
        new TableColumn({ name: 'City', width: 120, content: row => row.city }),
        new TableColumn({ name: 'Phone', width: 160, content: row => row.phone }),
        new TableColumn({ name: 'Status', width: 100, content: row => row.status })
      ]
    }))
  }
}
