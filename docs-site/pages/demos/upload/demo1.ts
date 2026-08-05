import { DivModule, VBox } from 'wok-ui'
import { Uploader, showModal, SecondaryText, TinyText, ModalHandle } from 'wok-ui-ext'

/** 格式化文件大小，转为人类可读格式 */
function formatSize(size: number): string {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`
  return `${(size / 1024 / 1024).toFixed(2)} MB`
}

export default class Demo1 extends DivModule {
  constructor() {
    super()
    this.addChild(
      new Uploader({
        onUpload: (files) => {
          let modal: ModalHandle
          modal = showModal({
            title: 'Uploaded Files',
            width: 480,
            body: new VBox({
              gap: 10,
              children: files.map(
                (file) =>
                  new VBox({
                    children: [
                      new SecondaryText(file.name),
                      new TinyText(
                        `${formatSize(file.size)} · ${file.type || 'Unknown type'}`
                      )
                    ]
                  })
              )
            }),
            buttons: { confirm: true },
            onConfirm: () => modal.close()
          })
        }
      })
    )
  }
}
