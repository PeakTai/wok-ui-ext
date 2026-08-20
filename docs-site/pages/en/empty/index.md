---
title: Empty
order: 46
category: Data Display
icon: fa-folder-open
description: Empty component, used as a placeholder when there is no data.
---

# Empty

Empty is used as a placeholder when there is no data.

## Basic Usage

When `text` is not passed, the default text is used; when passed, a custom text is displayed.

```ts
new Empty({})
new Empty({ text: 'No data found' })
```

<br>

```demo @docs/pages/demos/empty/demo1.ts
```

<br>

## Borderless

Set `noBorder: true` to hide the border, suitable for embedding in an existing card container.

```ts
new Empty({ text: 'Empty', noBorder: true })
```

<br>

```demo @docs/pages/demos/empty/demo2.ts
```

<br>

## API

| Parameter | Type | Default | Description |
|------|------|--------|------|
| text | `string` | — | Empty state text; the i18n text is used by default |
| noBorder | `boolean` | `false` | Whether to hide the border |
