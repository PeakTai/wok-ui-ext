import { Button, quickInputNumber, showSuccess } from 'wok-ui-ext'

export default class Demo2 extends Button {
  constructor() {
    super({
      text: 'Quick Input Number',
      type: 'primary',
      onClick: () =>
        quickInputNumber({
          title: 'Enter Your Age',
          placeholder: 'Please enter your age',
          required: true,
          min: 1,
          max: 150
        }).then(val => {
          if (val === undefined) return
          showSuccess(`You entered: ${val}`)
        })
    })
  }
}
