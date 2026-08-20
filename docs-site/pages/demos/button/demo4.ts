import { Button } from 'wok-ui-ext'

export default class Demo4 extends Button {
  constructor() {
    super({ text: 'Block Button（full width）', type: 'primary', block: true })
  }
}
