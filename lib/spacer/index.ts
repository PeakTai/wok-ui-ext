import { DivModule } from 'wok-ui'
import './style.less'

/**
 * 垫片基类，尺寸直接取全局间距档位 token（--gap-*）
 */
class BaseSpacer extends DivModule {
  constructor(classNames: string) {
    super(`wok-ui-ext-spacer ${classNames}`)
  }
}

/**
 * 垂直垫片：最紧密的间距
 *
 * 适用于图标与文字之间、角标与主体之间等需要紧贴的相邻元素
 */
export class SpacerTiny extends BaseSpacer {
  constructor() {
    super('wok-ui-ext-spacer-v-tiny')
  }
}

/**
 * 垂直垫片：紧凑间距
 *
 * 适用于按钮组、行内元素之间
 */
export class SpacerTight extends BaseSpacer {
  constructor() {
    super('wok-ui-ext-spacer-v-tight')
  }
}

/**
 * 垂直垫片：标准紧凑间距
 *
 * 适用于同一组内的块级元素、列表项之间
 */
export class SpacerCompact extends BaseSpacer {
  constructor() {
    super('wok-ui-ext-spacer-v-compact')
  }
}

/**
 * 垂直垫片：默认基础间距
 *
 * 适用于默认内容区、卡片内元素之间
 */
export class SpacerBase extends BaseSpacer {
  constructor() {
    super('wok-ui-ext-spacer-v-base')
  }
}

/**
 * 垂直垫片：宽松间距
 *
 * 适用于表单组、区块之间
 */
export class SpacerRelaxed extends BaseSpacer {
  constructor() {
    super('wok-ui-ext-spacer-v-relaxed')
  }
}

/**
 * 垂直垫片：最宽松间距
 *
 * 适用于页面级区块分隔
 */
export class SpacerSpacious extends BaseSpacer {
  constructor() {
    super('wok-ui-ext-spacer-v-spacious')
  }
}

/**
 * 水平垫片：最紧密的间距
 *
 * 适用于图标与文字之间、角标与主体之间等需要紧贴的相邻元素
 */
export class HSpacerTiny extends BaseSpacer {
  constructor() {
    super('wok-ui-ext-spacer-h-tiny')
  }
}

/**
 * 水平垫片：紧凑间距
 *
 * 适用于按钮组、行内元素之间
 */
export class HSpacerTight extends BaseSpacer {
  constructor() {
    super('wok-ui-ext-spacer-h-tight')
  }
}

/**
 * 水平垫片：标准紧凑间距
 *
 * 适用于同一组内的块级元素、列表项之间
 */
export class HSpacerCompact extends BaseSpacer {
  constructor() {
    super('wok-ui-ext-spacer-h-compact')
  }
}

/**
 * 水平垫片：默认基础间距
 *
 * 适用于默认内容区、卡片内元素之间
 */
export class HSpacerBase extends BaseSpacer {
  constructor() {
    super('wok-ui-ext-spacer-h-base')
  }
}

/**
 * 水平垫片：宽松间距
 *
 * 适用于表单组、区块之间
 */
export class HSpacerRelaxed extends BaseSpacer {
  constructor() {
    super('wok-ui-ext-spacer-h-relaxed')
  }
}

/**
 * 水平垫片：最宽松间距
 *
 * 适用于页面级区块分隔
 */
export class HSpacerSpacious extends BaseSpacer {
  constructor() {
    super('wok-ui-ext-spacer-h-spacious')
  }
}
