import { Module } from 'wok-ui'
import { getWokUiExtI18n } from '../i18n'
import { IconCloudUpload } from '../icons'
import { showWarning } from '../toast'
import './style.less'

/**
 * 上传组件
 */
export class Uploader extends Module {
  /**
   * 上传组件
   * @param opts
   * @param opts.hint 提示，说明需要的文件信息，如：仅支持上传 pdf 文件
   * @param opts.accept 接受的文件类型，如：.pdf,.docx
   * @param opts.multiple 是否支持多选
   * @param opts.maxSize 最大文件大小，单位：字节
   * @param opts.onUpload 上传文件的回调函数
   * @param opts.showOnly 是否仅展示，不实现上传文件功能，使用场景是上传由上层的组件来实现，如嵌入图片裁剪器等
   * @param opts.disabled 是否禁用
   */
  constructor(private readonly opts: {
    hint?: string
    accept?: string
    multiple?: boolean
    maxSize?: number
    onUpload?: (files: File[]) => void
    showOnly?: boolean
    disabled?: boolean
  }) {
    super(document.createElement('label'))
    const i18n = getWokUiExtI18n()
    this.el.classList.add('wok-ui-ext-uploader-area')
    this.addChild(new IconCloudUpload(), {
      classNames: 'wok-ui-ext-uploader-hint',
      innerText: i18n.buildMsg('upload-hint')
    })
    if (opts.hint) {
      this.addChild(8, {
        classNames: 'wok-ui-ext-uploader-hint-secondary',
        innerText: opts.hint
      })
    }
    if (opts.disabled) {
      this.el.classList.add('disabled')
    }
    if (!opts.showOnly) {
      this.addChild({
        tag: 'input',
        attrs: {
          type: 'file',
          accept: opts.accept,
          multiple: opts.multiple
        },
        preHandle: el => {
          const input = el as HTMLInputElement
          input.addEventListener('change', () => {
            if (input.files) {
              this.validateAndUpload(Array.from(input.files))
            }
          })
        }
      })
      // 拖拽上传。拖拽会跳过 input 的 accept/multiple 原生限制，这里手动校验
      this.el.addEventListener('dragenter', e => {
        e.preventDefault()
        this.el.classList.add('dragging')
      })
      this.el.addEventListener('dragover', e => {
        e.preventDefault()
        this.el.classList.add('dragging')
      })
      this.el.addEventListener('dragleave', e => {
        if (!(e.relatedTarget instanceof Node) || !this.el.contains(e.relatedTarget)) {
          this.el.classList.remove('dragging')
        }
      })
      this.el.addEventListener('drop', e => {
        e.preventDefault()
        this.el.classList.remove('dragging')
        const files = e.dataTransfer?.files
        if (files && files.length) {
          this.validateAndUpload(Array.from(files))
        }
      })
    }
  }

  /**
   * 校验文件（大小、类型），全部通过后才触发上传回调
   * @param files 待校验的文件列表
   */
  private validateAndUpload(files: File[]) {
    const opts = this.opts
    const i18n = getWokUiExtI18n()
    for (const file of files) {
      if (typeof opts.maxSize === 'number' && file.size > opts.maxSize) {
        showWarning(
          i18n.buildMsg('upload-max-size', file.name, this.formatSize(opts.maxSize))
        )
        return
      }
      if (opts.accept && !this.matchesAccept(file, opts.accept)) {
        showWarning(i18n.buildMsg('upload-type-not-allowed', file.name))
        return
      }
    }
    // multiple 为 false 时只取第一个文件
    const list = opts.multiple === false ? files.slice(0, 1) : files
    opts.onUpload?.(list)
  }

  /**
   * 判断文件是否匹配 accept 规则，支持三种形式：
   * - 扩展名：`.pdf,.docx`
   * - MIME 前缀：`image/*`
   * - 具体 MIME：`application/pdf`
   * @param file 文件
   * @param accept accept 规则
   */
  private matchesAccept(file: File, accept: string): boolean {
    const rules = accept
      .split(',')
      .map(rule => rule.trim().toLowerCase())
      .filter(Boolean)
    const fileName = file.name.toLowerCase()
    const mime = file.type.toLowerCase()
    return rules.some(rule => {
      if (rule.startsWith('.')) {
        return fileName.endsWith(rule)
      }
      if (rule.endsWith('/*')) {
        return mime.startsWith(rule.slice(0, -1))
      }
      return mime === rule
    })
  }

  /**
   * 格式化文件大小,转成人类可读的格式
   * @param size 文件大小，单位：字节
   * @returns 格式化后的文件大小，如：123 B, 123.45 KB, 123.45 MB
   */
  private formatSize(size: number) {
    const i18n = getWokUiExtI18n()
    if (size < 1024) {
      return i18n.buildMsg('upload-size-b', `${size}`)
    }
    if (size < 1024 * 1024) {
      return i18n.buildMsg('upload-size-kb', `${(size / 1024).toFixed(2)}`)
    }
    return i18n.buildMsg('upload-size-mb', `${(size / 1024 / 1024).toFixed(2)}`)
  }
}
