import { TextInput, Spacer } from 'wok-ui'
import { FormItem, Select, showFormModal, showSuccess, Button } from 'wok-ui-ext'

export default class Demo2 extends Button {
  constructor() {
    super({
      text: 'Open Form Modal',
      type: 'primary',
      onClick: () => {
        // Form data
        const formData = {
          name: '',
          department: ''
        }
        showFormModal({
          title: 'Add Member',
          width: 480,
          formContent: [
            new FormItem({
              label: 'Name',
              required: true,
              input: new TextInput({
                placeholder: 'Enter your name',
                required: true,
                onChange: val => (formData.name = val)
              })
            }),
            new Spacer('lg'),
            new FormItem({
              label: 'Department',
              required: true,
              input: new Select({
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
            })
          ],
          handleSubmit: async () => {
            // Simulate an API request; the modal closes automatically on success
            await new Promise(resolve => setTimeout(resolve, 800))
            showSuccess(`Member added: ${formData.name} (${formData.department})`)
          }
        })
      }
    })
  }
}
