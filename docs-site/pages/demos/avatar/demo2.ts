import { HBox } from 'wok-ui'
import { Avatar } from 'wok-ui-ext'

export default class Demo2 extends HBox {
  constructor() {
    super({ gap: 16, children: [
      new Avatar({ size: 'sm' }),
      new Avatar({}),
      new Avatar({ size: 'lg' }),
      // 相对路径引用文档站演示图片（站点部署在子路径）；项目中请替换为你的图片地址
      new Avatar({ size: 64, src: '../imgs/avatar.jpg' })
    ] })
  }
}
