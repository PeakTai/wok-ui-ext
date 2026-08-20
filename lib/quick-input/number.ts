import { NumberInput } from 'wok-ui'
import { Form, FormItem } from '../form'
import { showModal } from '../modal'

export interface QuickInputNumberOpts {
  /**
   * 弹窗标题
   */
  title: string
  /**
   * 输入框标题，不填就不显示
   */
  inputLabel?: string
  /**
   * 输入框占位符，不填就不显示
   */
  placeholder?: string
  /**
   * 是否必填，默认false
   */
  required?: boolean
  /**
   * 最大长度，不填就不限制
   */
  max?: number
  /**
   * 最小长度，不填就不限制
   */
  min?: number
  /**
   * 初始值
   */
  value?: number
}

export function quickInputNumber(opts: QuickInputNumberOpts): Promise<number | undefined>
export function quickInputNumber(
  opts: QuickInputNumberOpts & { onSuccess: (value: number) => void; onCancel?: () => void }
): void

/**
 * 快速输入,返回用户输入的值
 *
 * @param opts
 * @returns
 */
export function quickInputNumber(
  opts: QuickInputNumberOpts & { onSuccess?: (value: number) => void; onCancel?: () => void }
): Promise<number | undefined> | void {
  function doInput(
    onSuccess: (value: number | undefined) => void,
    onCancel: () => void
  ) {
    let value = opts.value
    let form: Form
    let input: NumberInput
    input = new NumberInput({
      placeholder: opts.placeholder,
      min: opts.min,
      max: opts.max,
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
          onSuccess(value)
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
        onCancel()
      }
    })
  }
  if (opts.onSuccess) {
    const { onSuccess, onCancel } = opts
    doInput(
      val => {
        if (typeof val === 'number') {
          onSuccess(val)
        }
      },
      onCancel ?? (() => {})
    )
    return
  }

  return new Promise<number | undefined>(resolve => {
    doInput(resolve, () => resolve(undefined))
  })
}
