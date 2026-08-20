---
title: Pagination
order: 24
category: Navigation
icon: fa-forward
description: Pagination component, used for page navigation.
---

# Pagination

Pagination is used for page navigation.

## Basic Usage

```ts
new Pagination({
  total: 100,
  pz: 10,
  pn: 1,
  onChange: (pn, pz) => console.log('page', pn)
})
```

<br>

```demo @docs/pages/demos/pagination/demo1.ts
```

<br>

## Simple Mode

```ts
new Pagination({
  total: 100,
  pz: 10,
  pn: 1,
  simple: true,
  onChange: (pn, pz) => {}
})
```

<br>

```demo @docs/pages/demos/pagination/demo2.ts
```

<br>

## Parameters

| Parameter | Type | Default | Description |
|------|------|--------|------|
| total | `number` | — | Total number of items |
| pz | `number` | — | Number of items per page |
| pn | `number` | — | Current page number |
| simple | `boolean` | `false` | Whether to enable simple mode |
| onChange | `(pn: number, pz: number) => void` | — | Pagination callback |
