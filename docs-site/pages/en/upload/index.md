---
title: Upload
order: 65
category: Data Entry
icon: fa-upload
description: Upload component for file uploads.
---

# Upload

Upload is used for file uploads.

## Basic Usage

After selecting files, the file list is obtained via the `onUpload` callback; here a modal shows the file information.

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

## Restricting File Types

Restrict the selectable file types via `accept`; when the type of a selected or dropped file does not match, a prompt is shown and the upload is blocked.

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

## Restricting File Size

```ts
new Uploader({
  maxSize: 10 * 1024 * 1024, // 10MB
  onUpload: (files) => {}
})
```

<br>

## Multiple Selection Mode

```ts
new Uploader({
  multiple: true,
  onUpload: (files) => {}
})
```

<br>

## Disabled State

`disabled: true` disables the upload area; it turns gray visually and is not clickable. The functionality is intact, just currently unavailable, commonly used for temporary states such as insufficient permissions or an unsaved form.

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

## Display-Only Mode

With `showOnly: true`, the file selection box is not rendered; only the appearance of the upload area is kept, and clicking does not trigger file selection. It suits scenarios such as embedding in an image cropper, where the upload action is implemented by the parent component and this only handles the display.

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

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| hint | `string` | — | Hint text |
| accept | `string` | — | Accepted file types |
| multiple | `boolean` | `false` | Whether multiple selection is supported |
| maxSize | `number` | — | Maximum file size (bytes) |
| onUpload | `(files: File[]) => void` | — | Upload callback |
| showOnly | `boolean` | `false` | Display-only mode; the file selection box is not rendered and upload is implemented by the parent component |
| disabled | `boolean` | `false` | Disabled state; turns gray visually and is not clickable, functionality intact but currently unavailable |
