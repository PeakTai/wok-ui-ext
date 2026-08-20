---
title: Icons
order: 12
category: General
icon: fa-icons
description: Icon types and built-in icon descriptions.
---

# Icons

Icons in the component library are uniformly received via the `IconInput` type and resolved into mountable modules by the `resolveIcon` function.

## Icon Types

```ts
export type IconInput = SvgIcon | RemoteSvgIcon | string
```

`IconInput` supports the following three forms:

| Type | Description | Example |
|------|------|------|
| `SvgIcon` | Built-in SVG icon instance of wok-ui | `new IconEdit()` |
| `RemoteSvgIcon` | Icon instance loaded via a remote SVG URL | `new RemoteSvgIcon('/assets/icon.svg')` |
| `string` | CSS class name string, inline SVG markup, or image URL | `'fa fa-user'`、`'<svg>...</svg>'`、`'/assets/icon.png'` |

## resolveIcon

```ts
export function resolveIcon(icon: IconInput): ConvertibleModule
```

`resolveIcon` is responsible for resolving `IconInput` into an object that components can mount, with the following rules:

- `SvgIcon` / `RemoteSvgIcon` instances: returned directly
- Strings starting with `<svg`: wrapped as a `SvgIcon` instance
- Strings starting with `http://`, `https://`, `/`, `data:`: rendered as an `<img>` element
- Other strings: rendered as an `<i class="xxx">` element

```ts
import { resolveIcon, IconEdit } from 'wok-ui-ext'

// 内置图标
resolveIcon(new IconEdit())

// 远程 SVG
resolveIcon(new RemoteSvgIcon('https://example.com/icon.svg'))

// CSS 类名
resolveIcon('fa fa-user')

// 内联 SVG
resolveIcon('<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>')
```

## Built-in Icons

The component library provides the following icon classes that can be instantiated directly:

| Icon Class | Description |
|--------|------|
| `IconTimes` | Close / Cross |
| `IconSearch` | Search |
| `IconChevronLeft` | Collapse arrow pointing left |
| `IconChevronRight` | Collapse arrow pointing right |
| `IconChevronDown` | Collapse arrow pointing down |
| `IconInfoCircle` | Info tip |
| `IconCheckCircle` | Success / Check |
| `IconExclamationCircle` | Error tip |
| `IconExclamationTriangle` | Warning tip |
| `IconTimesCircle` | Failure / Close |
| `IconQuestionCircle` | Help / Question mark |
| `IconEdit` | Edit |
| `IconTag` | Tag |
| `IconEllipsisH` | Horizontal ellipsis |
| `IconUser` | User |
| `IconFolderOpen` | Open folder |
| `IconInbox` | Inbox (empty state) |
| `IconFolder` | Folder |
| `IconLock` | Lock |
| `IconAngleRight` | Right angle |
| `IconCloudUpload` | Cloud upload |
| `IconImage` | Image |
| `IconCircleNotch` | Loading circle |

## Usage Notes

It is recommended to pass `IconInput` in components that accept icons, for example:

```ts
new Button({ text: 'Edit', icon: new IconEdit() })
new Dropdown({
  items: [
    { text: 'Edit', icon: new IconEdit() }
  ]
})
```

> **Note**: You must use `new` to create a new icon instance every time, and never reuse the same instance. wok-ui does not allow the same `Module` instance to be mounted multiple times, otherwise an exception will be thrown.
