import { TextInput, RadioGroup, HBox, Spacer, DivModule } from 'wok-ui'
import { Form, FormItem, Select, showModal, Button } from 'wok-ui-ext'

export default class Demo1 extends DivModule {
  constructor() {
    // Form data
    const formData = {
      name: '',
      gender: 'prefer-not-to-say',
      department: '',
      email: ''
    }

    super()
    this.addChild(
      new Form({
        labelWidth: 110,
        labelBold: true,
        children: [
          new FormItem({
            label: 'Name',
            required: true,
            input: new TextInput({
              value: formData.name,
              placeholder: 'Enter your name',
              required: true,
              minLength: 2,
              maxLength: 16,
              onChange: val => (formData.name = val)
            })
          }),
          new Spacer('lg'),
          new FormItem({
            label: 'Gender',
            input: new RadioGroup({
              value: formData.gender,
              inline: true,
              options: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
                { label: 'Prefer not to say', value: 'prefer-not-to-say' }
              ],
              onChange: val => (formData.gender = val)
            })
          }),
          new Spacer('lg'),
          new FormItem({
            label: 'Department',
            required: true,
            input: new Select({
              value: formData.department,
              required: 'Please select a department',
              options: [
                { label: 'Select a department', value: '' },
                { label: 'Frontend', value: 'frontend' },
                { label: 'Backend', value: 'backend' },
                { label: 'QA', value: 'qa' },
                { label: 'Product', value: 'product' }
              ],
              onChange: val => (formData.department = val)
            })
          }),
          new Spacer('lg'),
          new FormItem({
            label: 'Email',
            required: true,
            input: new TextInput({
              value: formData.email,
              placeholder: 'Enter your email',
              required: 'Please enter your email',
              validator: val => {
                if (val && !/^[\w.+-]+@[\w-]+(\.[\w-]+)+$/.test(val)) {
                  return { valid: false, msg: 'Invalid email format' }
                }
                return { valid: true }
              },
              onChange: val => (formData.email = val)
            })
          }),
          new Spacer('lg'),
          new FormItem({
            label: '',
            input: new HBox({
              gap: 12,
              children: [
                new Button({ text: 'Submit', type: 'primary', formType: 'submit' }),
                new Button({ text: 'Reset', formType: 'reset' })
              ]
            })
          })
        ],
        onSubmit: () => {
          const modal = showModal({
            title: 'Submitted Data',
            width: 480,
            body: {
              tag: 'pre',
              style: {
                margin: '0',
                maxHeight: '360px',
                overflow: 'auto'
              },
              innerText: JSON.stringify(formData, null, 2)
            },
            buttons: { confirm: true },
            onConfirm: () => modal.close()
          })
        }
      })
    )
  }
}
