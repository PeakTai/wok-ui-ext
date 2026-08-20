/**
 * wok-ui-ext 扩展国际化消息定义。
 * 使用方可以通过 extend 机制继续扩展这些消息。
 */
export interface WokUiExtI18nMessages {
  // alert
  'alert-warning': string
  'alert-ok': string

  // empty
  'empty-text': string

  // file-picker
  'file-picker-max-size': string

  // form-modal
  'form-modal-confirm': string

  // img-picker
  'img-picker-crop': string
  'img-picker-cancel': string
  'img-picker-confirm': string
  'img-picker-format-error': string
  'img-picker-crop-failed': string

  // loading
  'loading-text': string

  // modal
  'modal-confirm': string
  'modal-cancel': string
  'modal-warning': string
  'modal-close': string

  // pagination
  'pagination-total': string
  'pagination-prev-page': string
  'pagination-next-page': string
  'pagination-page': string
  'pagination-simple-format': string

  // search-box
  'search-box-placeholder': string

  // table
  'table-empty': string

  // toast
  'toast-close': string

  // tree
  'tree-max-selected': string
  'tree-max-level': string

  // upload
  'upload-hint': string
  'upload-hint-secondary': string
  'upload-max-size': string
  'upload-max-count': string
  'upload-before-upload-rejected': string
  'upload-type-not-allowed': string
  'upload-size-b': string
  'upload-size-kb': string
  'upload-size-mb': string
}
