import { HBox } from 'wok-ui'
import { Avatar } from 'wok-ui-ext'

export default class Demo1 extends HBox {
  constructor() {
    super({ gap: 16, children: [
      new Avatar({}),
      // 相对路径引用文档站演示图片（站点部署在子路径）；项目中请替换为你的图片地址
      new Avatar({ src: '../imgs/avatar.jpg' })
    ] })
  }
}
