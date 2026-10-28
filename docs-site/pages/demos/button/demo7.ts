import { HBox } from 'wok-ui'
import { Button, IconSearch, IconEdit, IconCloudUpload, IconUser } from 'wok-ui-ext'

export default class Demo7 extends HBox {
  constructor() {
    super({
      gap: 12,
      wrap: true,
      align: 'center',
      children: [
        new Button({ text: 'Search', icon: new IconSearch() }),
        new Button({ text: 'Edit', icon: new IconEdit(), type: 'primary' }),
        new Button({ text: 'Upload', icon: new IconCloudUpload(), type: 'success' }),
        new Button({ text: 'User', icon: new IconUser(), type: 'dashed' }),
        new Button({ text: 'Search', icon: new IconSearch(), size: 'small', type: 'primary' }),
        new Button({ text: 'Upload', icon: new IconCloudUpload(), size: 'large', type: 'primary' })
      ]
    })
  }
}
