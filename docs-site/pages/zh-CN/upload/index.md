---
title: 上传
order: 65
category: 数据录入
icon: fa-upload
description: 上传组件，用于文件上传。
---

# 上传

上传（Upload）用于文件上传。

## 基本用法

选择文件后，通过 `onUpload` 回调拿到文件列表，这里弹窗展示文件信息。

```ts
new Uploader({
  onUpload: (files) => {
    showModal({
      title: 'Uploaded Files',
      width: 480,
      body: new VBox({
        gap: 10,
        children: files.map(file => new VBox({
          children: [
            new SecondaryText(file.name),
            new TinyText(`${formatSize(file.size)} · ${file.type || 'Unknown type'}`)
          ]
        }))
      }),
      buttons: { confirm: true }
    })
  }
})
```

<br>

```demo @docs/pages/demos/upload/demo1.ts
```

<br>

## 限制文件类型

通过 `accept` 限制可选择的文件类型，选择或拖拽的文件类型不匹配时会提示并阻止上传。

```ts
new Uploader({
  accept: '.pdf,.docx',
  hint: 'Only PDF and DOCX files are supported',
  onUpload: (files) => {}
})
```

<br>

```demo @docs/pages/demos/upload/demo4.ts
```

<br>

## 限制文件大小

```ts
new Uploader({
  maxSize: 10 * 1024 * 1024, // 10MB
  onUpload: (files) => {}
})
```

<br>

## 多选模式

```ts
new Uploader({
  multiple: true,
  onUpload: (files) => {}
})
```

<br>

## 禁用状态

`disabled: true` 禁用上传区域，视觉变灰且不可点击。此时功能是完整的，只是当前不可用，常用于权限不足、表单未保存等临时状态。

```ts
new Uploader({
  disabled: true,
  hint: 'Only available after saving'
})
```

<br>

```demo @docs/pages/demos/upload/demo2.ts
```

<br>

## 仅展示模式

`showOnly: true` 时不渲染文件选择框，仅保留上传区域的外观，点击不会触发文件选择。适合嵌入图片裁剪器等场景，上传动作由上层组件实现，这里只负责展示。

```ts
new Uploader({
  showOnly: true,
  hint: 'Upload is handled by the parent component'
})
```

<br>

```demo @docs/pages/demos/upload/demo3.ts
```

<br>

## 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| hint | `string` | — | 提示信息 |
| accept | `string` | — | 接受的文件类型 |
| multiple | `boolean` | `false` | 是否支持多选 |
| maxSize | `number` | — | 最大文件大小（字节） |
| onUpload | `(files: File[]) => void` | — | 上传回调 |
| showOnly | `boolean` | `false` | 仅展示模式，不渲染文件选择框，上传由上层组件实现 |
| disabled | `boolean` | `false` | 禁用状态，视觉变灰且不可点击，功能完整但当前不可用 |
