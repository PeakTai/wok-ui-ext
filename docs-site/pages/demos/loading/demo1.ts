import { Button, showLoading, hideLoading } from 'wok-ui-ext'

export default class Demo1 extends Button {
  constructor() {
    super({
      text: 'Show Loading',
      type: 'primary',
      onClick: () => {
        showLoading('Loading...')
        setTimeout(() => hideLoading(), 2000)
      }
    })
  }
}
