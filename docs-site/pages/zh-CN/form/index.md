---
title: 表单
order: 61
category: 数据录入
icon: fa-edit
description: 表单组件
---

# 表单

wok-ui-ext 在 wok-ui 表单体系之上，扩展了 `Form`、`FormItem` 与 `Select` 三个组件，用于更快捷地搭建带标题的表单布局，并通过全局样式对 wok-ui 原生表单输入控件做了风格统一覆盖。此外还提供了 `showFormModal` 快捷函数，用于在模态框中内嵌表单。

## 扩展的 Form 与 FormItem

### Form

扩展的 `Form` 在 wok-ui `Form` 的基础上，增加了输入框标题（label）相关的配置项，配合 `FormItem` 使用可以统一控制所有条目的标题宽度与布局。

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `labelWidth` | `string \| number` | `120px` | 输入框标题的宽度 |
| `labelPosition` | `'top' \| 'left'` | `'left'` | 标题在上方还是左侧 |
| `labelBold` | `boolean` | `false` | 标题是否加粗 |

其余选项（`children`、`onSubmit`、`autocomplete`、`feedbackMode` 等）与 wok-ui `Form` 完全一致，详情请参阅 wok-ui 表单文档。

### FormItem

`FormItem` 是表单条目容器，默认水平布局：左边标题、右边输入控件。内部通过 CSS 变量 `--form-label-width` 控制标题宽度，因此既可以整体由外层 `Form` 统一控制，也可以通过 `labelWidth` 单独指定某一条目的宽度。

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `label` | `ConvertibleModule` | — | 标题内容 |
| `labelWidth` | `number` | — | 标题宽度（px），不传时继承 Form 的 `labelWidth` |
| `required` | `boolean` | `false` | 是否必填，为 `true` 时标题前显示红色星号 |
| `input` | `SubModulesOpt` | — | 内容输入模块，一般传入 wok-ui 的表单输入组件 |

> 注意：`FormItem` 只是容器，它内部的输入控件依然会被 `Form` 递归识别并参与整体校验，无需额外处理。

## 样式覆盖

wok-ui-ext 通过 `lib/global.less` 对 wok-ui 原生表单控件（`.wok-ui-input`、`select.wok-ui-select`）做了全局样式覆盖：

- 输入框、下拉框宽度铺满容器，圆角加大，边框、背景、占位符颜色全部跟随主题 CSS 变量
- 聚焦时显示主题色边框与柔和阴影

这些覆盖是全局生效的，项目中任何 wok-ui 表单输入控件都会自动获得统一的风格，无需逐个配置。

## 扩展的 Select

wok-ui 自带的 `Select` 使用固定颜色的默认箭头，无法与 wok-ui-ext 的主题化风格统一。wok-ui-ext 因此提供了自己的 `Select` 组件，用法与 wok-ui 的 `Select` 完全一致，可直接替换。

与 wok-ui `Select` 的区别：

- **主题色箭头**：下拉箭头使用主题色（跟随 `--color-primary`），而不是 wok-ui 的固定灰色箭头，与输入框聚焦色、按钮等主题化元素保持一致
- **箭头定位不偏移**：箭头挂在内部一层只包裹 select 的 wrapper 上。校验失败出现反馈提示（`invalid-feedback`）时，箭头依然保持在 select 的垂直中心，不会因为容器被反馈撑高而偏移
- **行为完全兼容**：组件继承 wok-ui 的 `FormInput`，参与 `Form` 整体校验、显示校验反馈等行为与 wok-ui `Select` 一致

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | 尺寸 |
| `required` | `boolean \| string` | `false` | 是否必填，为字符串时作为错误提示文案 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `value` | `string` | — | 默认选中的值 |
| `options` | `Array<{ label: string; value: string } \| string>` | — | 选项列表，字符串会同时用作 `label` 与 `value` |
| `onChange` | `(val: string) => void` | — | 选中值变化时回调 |

> 注意：`Select` 需要从 wok-ui-ext 导入（`import { Select } from 'wok-ui-ext'`），wok-ui 自带的 `Select` 不在 wok-ui-ext 中。

## 完整示例

下面是一个综合示例：使用扩展的 `Form` + `FormItem` 组合 wok-ui 的 `TextInput`、`RadioGroup` 以及 wok-ui-ext 的 `Select` 等表单项，包含必填、长度、格式校验。点击提交后，表单会先整体校验，全部通过后弹出一个模态框，以格式化 JSON 的形式展示提交的数据。

```ts
import { TextInput, RadioGroup, HBox, Spacer } from 'wok-ui'
import { Form, FormItem, Select, showModal, Button } from 'wok-ui-ext'

const formData = {
  name: '',
  gender: 'prefer-not-to-say',
  department: '',
  email: ''
}

new Form({
  labelWidth: 110,
  labelBold: true,
  children: [
    new FormItem({
      label: 'Name',
      required: true,
      input: new TextInput({
        value: formData.name,
        placeholder: 'Enter your name',
        required: true,
        minLength: 2,
        maxLength: 16,
        onChange: val => (formData.name = val)
      })
    }),
    new Spacer('lg'),
    new FormItem({
      label: 'Gender',
      input: new RadioGroup({
        value: formData.gender,
        inline: true,
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Prefer not to say', value: 'prefer-not-to-say' }
        ],
        onChange: val => (formData.gender = val)
      })
    }),
    new Spacer('lg'),
    new FormItem({
      label: 'Department',
      required: true,
      input: new Select({
        value: formData.department,
        required: 'Please select a department',
        options: [
          { label: 'Select a department', value: '' },
          { label: 'Frontend', value: 'frontend' },
          { label: 'Backend', value: 'backend' },
          { label: 'QA', value: 'qa' },
          { label: 'Product', value: 'product' }
        ],
        onChange: val => (formData.department = val)
      })
    }),
    new Spacer('lg'),
    new FormItem({
      label: 'Email',
      required: true,
      input: new TextInput({
        value: formData.email,
        placeholder: 'Enter your email',
        required: 'Please enter your email',
        validator: val => {
          if (val && !/^[\w.+-]+@[\w-]+(\.[\w-]+)+$/.test(val)) {
            return { valid: false, msg: 'Invalid email format' }
          }
          return { valid: true }
        },
        onChange: val => (formData.email = val)
      })
    }),
    new Spacer('lg'),
    new FormItem({
      label: '',
      input: new HBox({
        gap: 12,
        children: [
          new Button({ text: 'Submit', type: 'primary', formType: 'submit' }),
          new Button({ text: 'Reset', formType: 'reset' })
        ]
      })
    })
  ],
  onSubmit: () => {
    const modal = showModal({
      title: 'Submitted Data',
      body: {
        tag: 'pre',
        style: {
          margin: '0',
          maxHeight: '360px',
          overflow: 'auto'
        },
        innerText: JSON.stringify(formData, null, 2)
      },
      buttons: { confirm: true },
      onConfirm: () => modal.close()
    })
  }
})
```

<br>

```demo @docs/pages/demos/form/demo1.ts
```

<br>

## showFormModal

`showFormModal` 是 wok-ui-ext 提供的快捷函数，用于在模态框中内嵌一个扩展 `Form`（内部使用 `labelPosition: 'top'`），自动串联「校验 → 提交 → 关闭」的完整流程：

1. 点击弹窗的确认按钮，会先触发 `Form` 整体校验
2. 校验全部通过后调用 `handleSubmit`
3. `handleSubmit` 返回的 Promise resolve 后自动关闭弹窗
4. 如果 Promise reject，则以警告 toast 展示错误信息，弹窗保持打开

```ts
showFormModal({
  title: 'Add Member',
  width: 480,
  formContent: [
    new FormItem({
      label: 'Name',
      required: true,
      input: new TextInput({
        placeholder: 'Enter your name',
        required: true,
        onChange: val => (formData.name = val)
      })
    }),
    new Spacer('lg'),
    new FormItem({
      label: 'Department',
      required: true,
      // Select 为 wok-ui-ext 提供的 Select，用法与 wok-ui 一致
      input: new Select({
        required: 'Please select a department',
        options: [
          { label: 'Select a department', value: '' },
          { label: 'Frontend', value: 'frontend' },
          { label: 'Backend', value: 'backend' },
          { label: 'QA', value: 'qa' },
          { label: 'Product', value: 'product' }
        ],
        onChange: val => (formData.department = val)
      })
    })
  ],
  handleSubmit: async () => {
    // Call the API; the modal closes automatically on success
  }
})
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | `number` | `500` | 模态框宽度（px） |
| `title` | `string` | — | 模态框标题 |
| `formContent` | `SubModulesOpt` | — | 表单内容，内部 Form 使用 `labelPosition: 'top'` |
| `handleSubmit` | `() => Promise<void>` | — | 提交处理函数，resolve 后自动关闭弹窗，reject 时以警告 toast 提示 |
| `confirmButtonText` | `string` | `确定` | 确认按钮文案 |
| `onShown` | `() => void` | — | 模态框入场动画完成后触发 |

> 提示：如果只是单个文本框的表单，推荐使用 wok-ui-ext 的 `quickInput` 函数，更加简洁高效。

<br>

```demo @docs/pages/demos/form/demo2.ts
```
