import { SubModulesOpt } from 'wok-ui'
import { getWokUiExtI18n } from '../../i18n'
import { showModal } from '../../modal'
import { showWarning } from '../../toast'
import { Form } from '../form'
/**
 * 显示带表单的模态框，如果是只有一个文本框的表单，请使用 quickInput 函数，更简洁高效
 * @param opts
 * @param opts.width 模态框宽度，默认500px
 * @param opts.title 模态框标题
 * @param opts.formContent 表单内容配置
 * @param opts.handleSubmit 提交处理函数，如果没有异常，将会自动关闭模态框
 * @param opts.confirmButtonText 确认按钮文本，默认为"确定"
 */
export function showFormModal(opts: {
  width?: number
  title: string
  formContent: SubModulesOpt
  handleSubmit: () => Promise<void>
  onShown?: () => void
  confirmButtonText?: string
}) {
  let form: Form
  const modal = showModal({
    title: opts.title,
    width: opts.width,
    body: (form = new Form({
      labelPosition: 'top',
      children: opts.formContent,
      onSubmit: () => {
        opts
          .handleSubmit()
          .then(() => {
            modal.close()
          })
          .catch(showWarning)
      }
    })),
    buttons: {
      confirm: opts.confirmButtonText || getWokUiExtI18n().buildMsg('form-modal-confirm'),
      cancel: true
    },
    onShown: opts.onShown,
    onConfirm: () => form.submit()
  })
}
