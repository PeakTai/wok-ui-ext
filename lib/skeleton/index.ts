import {
  DivModule,
  SubModulesOpt
} from 'wok-ui';
import './style.less';

/**
 * 骨架屏
 */
export class Skeleton extends DivModule {
  /**
   * 骨架屏
   * @param opts
   * @param opts.rows 骨架屏行数，默认 3
   * @param opts.showAvatar 骨架屏是否显示头像，默认 false，设置为 true 时会显示头像在左侧
   */
  constructor(private readonly opts: { rows?: number; showAvatar?: boolean }) {
    super('wok-ui-ext-skeleton')
    if (!this.opts.showAvatar) {
      this.addChild(this.buildLines())
      return
    }
    // 有头像的情况
    /**
     * <div class="wok-ui-ext-skeleton-row">
          <div class="wok-ui-ext-skeleton-avatar"></div>
          <div style="flex:1">
              <div class="wok-ui-ext-skeleton-line" style="width:90%"></div>
              <div class="wok-ui-ext-skeleton-line" style="width:60%"></div>
          </div>
      </div>
     */
    this.addChild({
      classNames: 'wok-ui-ext-skeleton-row',
      children: [
        {
          classNames: 'wok-ui-ext-skeleton-avatar'
        },
        {
          style: {
            flex: '1'
          },
          children: this.buildLines()
        }
      ]
    })
  }
  /**
   * 根据 rows 参数构建线条（line），尽可能让最后两个稍微短一些，倒数第二个 80% 长，最后一个 70% 长
   */
  private buildLines(): SubModulesOpt {
    const res: SubModulesOpt = []
    const rows = this.opts.rows ?? 3
    for (let i = 0; i < rows; i++) {
      // 判断是否要缩短
      if (rows >= 3 && i >= rows - 2) {
        res.push({
          classNames: 'wok-ui-ext-skeleton-line',
          style: {
            width: i === rows - 1 ? '70%' : '80%'
          }
        })
        continue
      }
      res.push({
        classNames: 'wok-ui-ext-skeleton-line'
      })
    }
    return res
  }
}
