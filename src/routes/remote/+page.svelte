<script lang="ts">
	import type { PropDef } from '../_doc/index.ts'
	import { DocExample, DocProps, DocSection } from '../_doc/index.ts'
	import Usage from './Usage.svelte'
	import usageCode from './Usage.svelte?raw'

	const props: PropDef[] = [
		{
			name: 'label',
			type: 'string',
			required: true,
			description: 'Field label displayed above the input.'
		},
		{
			name: 'field',
			type: 'RemoteFormField<T>',
			required: true,
			description: 'Form field binding from a remote form.'
		},
		{
			name: 'placeholder',
			type: 'string',
			description: 'Placeholder text for the input.'
		},
		{
			name: 'class',
			type: 'string',
			description: 'Additional CSS classes for the input element.'
		},
		{
			name: 'hint',
			type: 'string',
			description: 'Hint text displayed below the field (InputBoolean).'
		},
		{
			name: 'options',
			type: 'Options',
			required: true,
			description: 'Options for select and radio inputs.'
		},
		{
			name: 'type',
			type: 'string',
			default: "'text'",
			description: 'Input type for InputString (text, email, date, etc.).'
		},
		{
			name: 'variant',
			type: "'checkbox' | 'switch'",
			default: "'checkbox'",
			description: 'Visual variant for InputBoolean.'
		},
		{
			name: 'step / min / max',
			type: 'number',
			description: 'Range constraints for InputNumber and InputRange.'
		},
		{
			name: 'searchItems',
			type: 'RemoteQueryFunction',
			required: true,
			description: 'Search function for InputRelation.'
		},
		{
			name: 'getValue',
			type: '(item: Item) => string',
			required: true,
			description: 'Value extractor for InputRelation items.'
		}
	]
</script>

<DocSection title="Form Inputs" description="TODO: write a small description">
	<DocProps {props} />
	<DocExample code={usageCode}>
		{#snippet preview()}<Usage />{/snippet}
	</DocExample>
</DocSection>
