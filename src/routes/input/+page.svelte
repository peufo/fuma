<script lang="ts">
	import type { PropDef } from '../_doc/index.ts'
	import { DocExample, DocProps, DocSection } from '../_doc/index.ts'
	import BooleanExample from './examples/Boolean.svelte'
	import booleanCode from './examples/Boolean.svelte?raw'
	import NumberExample from './examples/Number.svelte'
	import numberCode from './examples/Number.svelte?raw'
	import Radio from './examples/Radio.svelte'
	import radioCode from './examples/Radio.svelte?raw'
	import Range from './examples/Range.svelte'
	import rangeCode from './examples/Range.svelte?raw'
	import Select from './examples/Select.svelte'
	import selectCode from './examples/Select.svelte?raw'
	import SelectNative from './examples/SelectNative.svelte'
	import selectNativeCode from './examples/SelectNative.svelte?raw'
	import StringExample from './examples/String.svelte'
	import stringCode from './examples/String.svelte?raw'
	import Textarea from './examples/Textarea.svelte'
	import textareaCode from './examples/Textarea.svelte?raw'

	const stringProps: PropDef[] = [
		{ name: 'label', type: 'string', required: true, description: 'Field label' },
		{
			name: 'field',
			type: 'RemoteFormField<string>',
			description: 'Form field binding'
		},
		{ name: 'value', type: 'string', description: 'Controller mode binding' },
		{
			name: 'type',
			type: 'string',
			default: "'text'",
			description: 'HTML input type'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes' }
	]

	const numberProps: PropDef[] = [
		{ name: 'label', type: 'string', required: true, description: 'Field label' },
		{
			name: 'field',
			type: 'RemoteFormField<number>',
			description: 'Form field binding'
		},
		{ name: 'value', type: 'number', description: 'Controller mode binding' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes' }
	]

	const booleanProps: PropDef[] = [
		{ name: 'label', type: 'string', required: true, description: 'Field label' },
		{
			name: 'field',
			type: 'RemoteFormField<boolean>',
			description: 'Form field binding'
		},
		{ name: 'checked', type: 'boolean', description: 'Controller mode binding' },
		{ name: 'hint', type: 'string', description: 'Hint text displayed below' },
		{
			name: 'variant',
			type: "'checkbox' | 'switch'",
			default: "'checkbox'",
			description: 'Visual variant'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes' }
	]

	const textareaProps: PropDef[] = [
		{ name: 'label', type: 'string', required: true, description: 'Field label' },
		{
			name: 'field',
			type: 'RemoteFormField<string>',
			description: 'Form field binding'
		},
		{ name: 'value', type: 'string', description: 'Controller mode binding' },
		{
			name: 'maxHeight',
			type: 'number',
			default: '200',
			description: 'Max height in pixels'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes' }
	]

	const rangeProps: PropDef[] = [
		{ name: 'label', type: 'string', required: true, description: 'Field label' },
		{
			name: 'field',
			type: 'RemoteFormField<number>',
			description: 'Form field binding'
		},
		{ name: 'value', type: 'number', description: 'Controller mode binding' },
		{ name: 'min', type: 'number', description: 'Minimum value' },
		{ name: 'max', type: 'number', description: 'Maximum value' },
		{ name: 'step', type: 'number', description: 'Step increment' },
		{ name: 'class', type: 'string', description: 'Additional CSS classes' }
	]

	const radioProps: PropDef[] = [
		{ name: 'label', type: 'string', required: true, description: 'Field label' },
		{
			name: 'field',
			type: 'RemoteFormField<string>',
			description: 'Form field binding'
		},
		{ name: 'value', type: 'string', description: 'Controller mode binding' },
		{
			name: 'options',
			type: 'Options',
			required: true,
			description: 'Radio options'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes' }
	]

	const selectNativeProps: PropDef[] = [
		{ name: 'label', type: 'string', required: true, description: 'Field label' },
		{
			name: 'field',
			type: 'RemoteFormField<string | string[]>',
			description: 'Form field binding'
		},
		{
			name: 'value',
			type: 'string | string[]',
			description: 'Controller mode binding'
		},
		{
			name: 'options',
			type: 'Options',
			required: true,
			description: 'Select options'
		},
		{
			name: 'multiple',
			type: 'boolean',
			description: 'Allow multiple selection'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes' }
	]

	const selectProps: PropDef[] = [
		{ name: 'label', type: 'string', required: true, description: 'Field label' },
		{
			name: 'field',
			type: 'RemoteFormField<string>',
			description: 'Form field binding'
		},
		{ name: 'value', type: 'string', description: 'Controller mode binding' },
		{
			name: 'items',
			type: 'Item[]',
			required: true,
			description: 'Select items'
		},
		{
			name: 'getValue',
			type: '(item: Item) => string',
			required: true,
			description: 'Value extractor'
		},
		{
			name: 'selected',
			type: 'Snippet<[Item]>',
			description: 'Selected item render snippet'
		},
		{
			name: 'proposal',
			type: 'Snippet<[Item, { isSelected; isFocus }]>',
			description: 'Dropdown item render snippet'
		},
		{ name: 'class', type: 'string', description: 'Additional CSS classes' }
	]
</script>

<DocSection title="InputString">
	<DocExample code={stringCode}>
		{#snippet preview()}<StringExample />{/snippet}
	</DocExample>
	<DocProps props={stringProps} />
</DocSection>

<DocSection title="InputNumber">
	<DocExample code={numberCode}>
		{#snippet preview()}<NumberExample />{/snippet}
	</DocExample>
	<DocProps props={numberProps} />
</DocSection>

<DocSection title="InputBoolean">
	<DocExample code={booleanCode}>
		{#snippet preview()}<BooleanExample />{/snippet}
	</DocExample>
	<DocProps props={booleanProps} />
</DocSection>

<DocSection title="InputTextarea">
	<DocExample code={textareaCode}>
		{#snippet preview()}<Textarea />{/snippet}
	</DocExample>
	<DocProps props={textareaProps} />
</DocSection>

<DocSection title="InputRange">
	<DocExample code={rangeCode}>
		{#snippet preview()}<Range />{/snippet}
	</DocExample>
	<DocProps props={rangeProps} />
</DocSection>

<DocSection title="InputRadio">
	<DocExample code={radioCode}>
		{#snippet preview()}<Radio />{/snippet}
	</DocExample>
	<DocProps props={radioProps} />
</DocSection>

<DocSection title="InputSelectNative">
	<DocExample code={selectNativeCode}>
		{#snippet preview()}<SelectNative />{/snippet}
	</DocExample>
	<DocProps props={selectNativeProps} />
</DocSection>

<DocSection title="InputSelect">
	<DocExample code={selectCode}>
		{#snippet preview()}<Select />{/snippet}
	</DocExample>
	<DocProps props={selectProps} />
</DocSection>
