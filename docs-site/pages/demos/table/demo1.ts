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

export default class Demo1 extends DivModule {
  constructor() {
    super()
    const users: User[] = [
      {
        name: 'John Doe',
        age: 30,
        email: 'john@example.com',
        department: 'Engineering',
        city: 'New York',
        phone: '+1 555-0101',
        status: 'Active'
      },
      {
        name: 'Jane Smith',
        age: 25,
        email: 'jane@example.com',
        department: 'Design',
        city: 'London',
        phone: '+44 20 7946 0102',
        status: 'Active'
      },
      {
        name: 'Bob Johnson',
        age: 35,
        email: 'bob@example.com',
        department: 'Marketing',
        city: 'Tokyo',
        phone: '+81 3 1234 0103',
        status: 'Inactive'
      }
    ]
    this.addChild(new Table<User>({
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
