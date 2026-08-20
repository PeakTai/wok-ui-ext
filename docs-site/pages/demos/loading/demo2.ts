import { Button, showLoading, hideLoading } from 'wok-ui-ext'

export default class Demo2 extends Button {
  constructor() {
    super({
      text: 'Load Data',
      type: 'primary',
      onClick: () => {
        showLoading('Loading data...')
        setTimeout(() => hideLoading(), 2000)
      }
    })
  }
}
