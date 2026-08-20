---
title: Form
order: 61
category: Data Entry
icon: fa-edit
description: Form component
---

# Form

On top of the wok-ui form system, wok-ui-ext extends three components: `Form`, `FormItem` and `Select`, for building labeled form layouts more quickly, and applies a unified style override to wok-ui native form input controls through global styles. It also provides the `showFormModal` shortcut function for embedding a form in a modal.

## Extended Form and FormItem

### Form

The extended `Form` adds configuration options related to input labels on top of the wok-ui `Form`; used together with `FormItem`, it can uniformly control the label width and layout of all items.

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `labelWidth` | `string \| number` | `120px` | Width of the input label |
| `labelPosition` | `'top' \| 'left'` | `'left'` | Whether the label is on top or on the left |
| `labelBold` | `boolean` | `false` | Whether the label is bold |

The remaining options (`children`, `onSubmit`, `autocomplete`, `feedbackMode`, etc.) are exactly the same as the wok-ui `Form`. For details, please refer to the wok-ui form documentation.

### FormItem

`FormItem` is a form item container with a default horizontal layout: label on the left, input control on the right. Internally, the label width is controlled by the CSS variable `--form-label-width`, so it can either be uniformly controlled by the outer `Form`, or a single item's width can be specified individually via `labelWidth`.

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `label` | `ConvertibleModule` | — | Label content |
| `labelWidth` | `number` | — | Label width (px); inherits the `Form`'s `labelWidth` when not set |
| `required` | `boolean` | `false` | Whether required; when `true`, a red asterisk is shown before the label |
| `input` | `SubModulesOpt` | — | Content input module; usually a wok-ui form input component |

> Note: `FormItem` is only a container. The input control inside it is still recursively recognized by the `Form` and participates in the overall validation, with no extra handling needed.

## Style Override

wok-ui-ext overrides the styles of wok-ui native form controls (`.wok-ui-input`, `select.wok-ui-select`) globally via `lib/global.less`:

- Input and select widths fill the container, with a larger corner radius; border, background and placeholder colors all follow the theme CSS variables
- Shows the theme-colored border and a soft shadow on focus

These overrides take effect globally. Any wok-ui form input control in a project automatically gets a unified style without per-item configuration.

## Extended Select

The `Select` built into wok-ui uses a fixed-color default arrow that cannot be unified with wok-ui-ext's themed style. wok-ui-ext therefore provides its own `Select` component with usage identical to wok-ui's `Select`, so it can be used as a drop-in replacement.

Differences from the wok-ui `Select`:

- **Theme-colored arrow**: the dropdown arrow uses the theme color (following `--color-primary`) instead of wok-ui's fixed gray arrow, staying consistent with themed elements such as the input focus color and buttons
- **No arrow position offset**: the arrow is attached to an inner wrapper that only wraps the select. When validation feedback (`invalid-feedback`) appears after a failed validation, the arrow stays vertically centered in the select and is not offset by the container being expanded by the feedback
- **Fully compatible behavior**: the component inherits wok-ui's `FormInput`, participating in the `Form` overall validation and showing validation feedback exactly like the wok-ui `Select`

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size |
| `required` | `boolean \| string` | `false` | Whether required; when a string, it is used as the error message |
| `disabled` | `boolean` | `false` | Whether disabled |
| `value` | `string` | — | Default selected value |
| `options` | `Array<{ label: string; value: string } \| string>` | — | Option list; a string is used as both `label` and `value` |
| `onChange` | `(val: string) => void` | — | Callback when the selected value changes |

> Note: `Select` must be imported from wok-ui-ext (`import { Select } from 'wok-ui-ext'`); wok-ui's built-in `Select` is not included in wok-ui-ext.

## Complete Example

Here is a comprehensive example: it combines the extended `Form` + `FormItem` with wok-ui's `TextInput`, `RadioGroup` and wok-ui-ext's `Select` form items, including required, length and format validation. After clicking submit, the form is first validated as a whole; when everything passes, a modal pops up showing the submitted data as formatted JSON.

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

`showFormModal` is a shortcut function provided by wok-ui-ext for embedding an extended `Form` (which uses `labelPosition: 'top'` internally) in a modal, automatically chaining the complete "validate → submit → close" flow:

1. Clicking the modal's confirm button first triggers the `Form` overall validation
2. When all validation passes, `handleSubmit` is called
3. After the Promise returned by `handleSubmit` resolves, the modal closes automatically
4. If the Promise rejects, the error message is shown as a warning toast and the modal stays open

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

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `width` | `number` | `500` | Modal width (px) |
| `title` | `string` | — | Modal title |
| `formContent` | `SubModulesOpt` | — | Form content; the inner Form uses `labelPosition: 'top'` |
| `handleSubmit` | `() => Promise<void>` | — | Submit handler; the modal closes automatically on resolve, and shows a warning toast on reject |
| `confirmButtonText` | `string` | `确定` | Confirm button text |
| `onShown` | `() => void` | — | Triggered after the modal entrance animation completes |

> Tip: For a form with only a single text input, the `quickInput` function from wok-ui-ext is recommended, as it is simpler and more efficient.

<br>

```demo @docs/pages/demos/form/demo2.ts
```
