import { TextInput } from 'wok-ui'
import { Form, FormItem } from '../form'
import { showModal } from '../modal'
/**
 * 快速输入,返回用户输入的值，取消时返回 undefined
 *
 * @param opts
 * @param opts.title 弹窗标题
 * @param opts.inputLabel 输入框标题，不填就不显示
 * @param opts.placeholder 输入框占位符，不填就不显示
 * @param opts.required 是否必填，默认false
 * @param opts.maxLength 最大长度，不填就不限制
 * @param opts.value 初始值
 * @returns 输入的值，取消时返回 undefined
 */
export function quickInput(opts: {
  title: string
  inputLabel?: string
  placeholder?: string
  required?: boolean
  maxLength?: number
  value?: string
}): Promise<string | undefined> {
  let value = opts.value || ''
  let form: Form
  let input: TextInput
  return new Promise<string | undefined>(resolve => {
    input = new TextInput({
      placeholder: opts.placeholder,
      maxLength: opts.maxLength,
      required: opts.required,
      value,
      onChange: val => {
        value = val
      }
    })
    const modal = showModal({
      title: opts.title,
      width: 500,
      body: (form = new Form({
        labelPosition: 'top',
        children: opts.inputLabel
          ? new FormItem({
              label: opts.inputLabel,
              required: opts.required,
              input
            })
          : input,
        onSubmit: () => {
          resolve(value)
          modal.close()
        }
      })),
      buttons: {
        confirm: true,
        cancel: true
      },
      onShown: () => {
        input.focus()
      },
      onConfirm: () => form.submit(),
      onClose: () => {
        modal.close()
        resolve(undefined)
      }
    })
  })
}
