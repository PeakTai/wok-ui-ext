import { SvgIcon, RemoteSvgIcon, ConvertibleModule } from 'wok-ui'

/**
 * 图标输入类型。
 * 组件接收图标时统一使用此类型，支持：
 * - `SvgIcon` / `RemoteSvgIcon` 实例：已有封装好的图标
 * - `string`：CSS class 字符串（如 `"fa fa-user"`）、内联 SVG 标记（如 `<svg>...</svg>`）、或图片 URL
 */
export type IconInput = SvgIcon | RemoteSvgIcon | string

/**
 * 将图标输入解析为可挂载的模块类型。
 * - SvgIcon / RemoteSvgIcon 实例：直接返回
 * - 以 `<svg` 开头的字符串：创建 SvgIcon 实例
 * - 以 `http://`、`https://`、`/`、`data:` 开头的字符串：返回 `<img>` 元素配置
 * - 其他字符串：返回 `<i class="xxx">` 元素配置
 */
export function resolveIcon(icon: IconInput): ConvertibleModule {
  if (icon instanceof SvgIcon || icon instanceof RemoteSvgIcon) {
    return icon
  }
  if (typeof icon === 'string') {
    if (icon.startsWith('<svg')) {
      return new SvgIcon(icon)
    }
    if (
      icon.startsWith('http://') ||
      icon.startsWith('https://') ||
      icon.startsWith('/') ||
      icon.startsWith('data:')
    ) {
      return { tag: 'img', attrs: { src: icon, alt: '' } }
    }
    return { tag: 'i', classNames: icon }
  }
  return icon
}

// ===== 可实例化的图标类（推荐用法） =====
// 每次 new 创建独立实例，避免多组件复用时 "已存在父模块" 错误

export class IconTimes extends SvgIcon {
  constructor() {
    super(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
    )
  }
}

export class IconSearch extends SvgIcon {
  // Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
  // License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
  constructor() {
    super(
      '<svg viewBox="0 0 512 512" fill="currentColor"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>'
    )
  }
}

export class IconChevronLeft extends SvgIcon {
  constructor() {
    super(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>'
    )
  }
}

export class IconChevronRight extends SvgIcon {
  constructor() {
    super(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>'
    )
  }
}

export class IconChevronDown extends SvgIcon {
  constructor() {
    super(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>'
    )
  }
}

export class IconInfoCircle extends SvgIcon {
  // Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
  // License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
  constructor() {
    super(
      '<svg viewBox="0 0 512 512" fill="currentColor"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/></svg>'
    )
  }
}

export class IconCheckCircle extends SvgIcon {
  // Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
  // License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
  constructor() {
    super(
      '<svg viewBox="0 0 512 512" fill="currentColor"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>'
    )
  }
}

export class IconExclamationCircle extends SvgIcon {
  // Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
  // License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
  constructor() {
    super(
      '<svg viewBox="0 0 576 512" fill="currentColor"><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>'
    )
  }
}

export class IconExclamationTriangle extends SvgIcon {
  // Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
  // License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
  constructor() {
    super(
      '<svg viewBox="0 0 576 512" fill="currentColor"><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>'
    )
  }
}

export class IconTimesCircle extends SvgIcon {
  // Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
  // License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
  constructor() {
    super(
      '<svg viewBox="0 0 512 512" fill="currentColor"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/></svg>'
    )
  }
}

export class IconQuestionCircle extends SvgIcon {
  // Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
  // License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
  constructor() {
    super(
      '<svg viewBox="0 0 512 512" fill="currentColor"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"/></svg>'
    )
  }
}

export class IconEdit extends SvgIcon {
  // Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
  // License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
  constructor() {
    super(
      '<svg viewBox="0 0 576 512" fill="currentColor"><path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"/></svg>'
    )
  }
}

export class IconTag extends SvgIcon {
  constructor() {
    super(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>'
    )
  }
}

export class IconEllipsisH extends SvgIcon {
  constructor() {
    super(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>'
    )
  }
}

export class IconUser extends SvgIcon {
  constructor() {
    super(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
    )
  }
}

export class IconInbox extends SvgIcon {
  // Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
  // License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
  constructor() {
    super(
      '<svg viewBox="0 0 576 512" fill="currentColor"><path d="M567.938 243.908L462.25 85.374A48.003 48.003 0 0 0 422.311 64H153.689a48 48 0 0 0-39.938 21.374L8.062 243.908A47.994 47.994 0 0 0 0 270.533V400c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V270.533a47.994 47.994 0 0 0-8.062-26.625zM162.252 128h251.497l85.333 128H376l-32 64H232l-32-64H76.918l85.334-128z"/></svg>'
    )
  }
}

export class IconFolderOpen extends SvgIcon {
  // Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
  // License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
  constructor() {
    super(
      '<svg viewBox="0 0 576 512" fill="currentColor"><path d="M527.9 224H480v-48c0-26.5-21.5-48-48-48H272l-64-64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h400c16.5 0 31.9-8.5 40.7-22.6l79.9-128c20-31.9-3-73.4-40.7-73.4zM48 118c0-3.3 2.7-6 6-6h134.1l64 64H426c3.3 0 6 2.7 6 6v42H152c-16.8 0-32.4 8.8-41.1 23.2L48 351.4zm400 282H72l77.2-128H528z"/></svg>'
    )
  }
}

export class IconFolder extends SvgIcon {
  constructor() {
    super(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>'
    )
  }
}

export class IconLock extends SvgIcon {
  // Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
  // License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
  constructor() {
    super(
      '<svg viewBox="0 0 448 512" fill="currentColor"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"/></svg>'
    )
  }
}

export class IconAngleRight extends SvgIcon {
  constructor() {
    super(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>'
    )
  }
}

export class IconCloudUpload extends SvgIcon {
  // Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
  // License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
  constructor() {
    super(
      '<svg viewBox="0 0 640 512" fill="currentColor"><path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"/></svg>'
    )
  }
}

export class IconImage extends SvgIcon {
  constructor() {
    super(
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'
    )
  }
}

export class IconBell extends SvgIcon {
  // Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
  // License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
  constructor() {
    super(
      '<svg viewBox="0 0 448 512" fill="currentColor"><path d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"/></svg>'
    )
  }
}

export class IconCircleNotch extends SvgIcon {
  // Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com
  // License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
  constructor() {
    super(
      '<svg viewBox="0 0 512 512" fill="currentColor"><path d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"/></svg>'
    )
  }
}
