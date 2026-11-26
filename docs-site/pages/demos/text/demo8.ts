import { VBox, Spacer } from 'wok-ui'
import { BodyText, SecondaryText, getTheme } from 'wok-ui-ext'

export default class Demo8 extends VBox {
  constructor() {
    // 从当前主题中获取颜色
    const { primary, success, danger } = getTheme()
    super({ children: [
      new BodyText({ text: '主题主色', color: primary }),
      new Spacer('sm'),
      new BodyText({ text: '主题成功色', color: success }),
      new Spacer('sm'),
      new BodyText({ text: '主题危险色', color: danger }),
      new Spacer('sm'),
      new SecondaryText({ text: '任意颜色 #ff6b35', color: '#ff6b35' }),
      new Spacer('sm'),
      new SecondaryText({ text: '任意颜色 rgb(120, 80, 255)', color: 'rgb(120, 80, 255)' })
    ] })
  }
}
