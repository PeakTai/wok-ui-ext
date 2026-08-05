import { DivModule, Spacer, VBox } from 'wok-ui'
import { Uploader, showInfo } from 'wok-ui-ext'

export default class Demo4 extends DivModule {
  constructor() {
    super()
    this.addChild(
      new Spacer('sm'),
      new VBox({ gap: 16, children: [
        new Uploader({
          accept: '.pdf,.docx',
          hint: 'Only PDF and DOCX files are supported',
          onUpload: (files) => showInfo(`Uploaded ${files.length} file(s)`)
        })
      ] })
    )
  }
}
