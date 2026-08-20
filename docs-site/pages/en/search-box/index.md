---
title: Search Box
order: 62
category: Data Entry
icon: fa-search
description: Search box component for quick search.
---

# Search Box

SearchBox is used for quick search.

## Basic Usage

```ts
new SearchBox({
  onSearch: (value) => console.log('search', value)
})
```

<br>

```demo @docs/pages/demos/search-box/demo1.ts
```

<br>

## Custom Placeholder

```ts
new SearchBox({
  placeholder: 'Search...',
  onSearch: (value) => {}
})
```

<br>

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| placeholder | `string` | — | Placeholder |
| maxLength | `number` | — | Maximum length |
| value | `string` | — | Default value |
| onSearch | `(value: string) => void` | — | Search callback |
