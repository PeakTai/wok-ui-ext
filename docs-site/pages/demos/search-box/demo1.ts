import { VBox } from 'wok-ui'
import { SearchBox, showInfo } from 'wok-ui-ext'

export default class Demo1 extends VBox {
  constructor() {
    super({
      children: [
        new SearchBox({
          onSearch: value => showInfo(`Searching for "${value}"`)
        })
      ]
    })
  }
}
