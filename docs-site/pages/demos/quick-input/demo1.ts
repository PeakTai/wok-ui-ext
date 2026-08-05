import { Button, quickInput, showSuccess } from 'wok-ui-ext'

export default class Demo1 extends Button {
  constructor() {
    super({
      text: 'Quick Input',
      type: 'primary',
      onClick: () =>
        quickInput({
          title: 'Enter Your Name',
          placeholder: 'Please enter your name',
          required: true,
          maxLength: 16
        }).then(val => {
          if (val === undefined) return
          showSuccess(`You entered: ${val}`)
        })
    })
  }
}
