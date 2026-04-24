<script lang="ts">
	import type { PropDef } from '../_doc/index.ts'
	import { DocExample, DocProps, DocSection } from '../_doc/index.ts'
	import UsageAsync from './UsageAsync.svelte'
	import usageAsyncCode from './UsageAsync.svelte?raw'
	import UsageLabel from './UsageLabel.svelte'
	import usageLabelCode from './UsageLabel.svelte?raw'
	import UsageSimple from './UsageSimple.svelte'
	import usageSimpleCode from './UsageSimple.svelte?raw'
	import UsageUseCopy from './UsageUseCopy.svelte'
	import usageUseCopyCode from './UsageUseCopy.svelte?raw'

	const buttonCopyProps: PropDef[] = [
		{
			name: 'value',
			type: 'string | (() => Promise<string>)',
			required: true,
			description: 'Value to copy or async function returning it'
		},
		{ name: 'title', type: 'string', default: "''", description: 'Tooltip text' },
		{ name: 'label', type: 'string', default: "''", description: 'Button label' },
		{
			name: 'Icon',
			type: 'Component<IconProps>',
			default: 'CopyIcon',
			description: 'Icon component'
		},
		{
			name: 'class',
			type: 'string',
			default: "''",
			description: 'Additional CSS classes'
		},
		{
			name: 'successMessage',
			type: 'string',
			default: "'Copied'",
			description: 'Toast message on success'
		},
		{
			name: 'onSuccess',
			type: '() => void',
			description: 'Callback after successful copy'
		}
	]

	const useCopyProps: PropDef[] = [
		{
			name: 'value',
			type: 'string | (() => Promise<string>)',
			required: true,
			description: 'Value to copy or async function returning it'
		},
		{
			name: 'successMessage',
			type: 'string',
			default: "'Copied'",
			description: 'Toast message on success'
		},
		{
			name: 'onSuccess',
			type: '() => void',
			description: 'Callback after successful copy'
		}
	]
</script>

<DocSection
	title="useCopy"
	description="A Svelte 5 runes store that handles clipboard copy logic. Returns reactive state and an attachment for binding to any element."
>
	<DocExample title="Direct usage" code={usageUseCopyCode}>
		{#snippet preview()}
			<UsageUseCopy />
		{/snippet}
	</DocExample>

	<DocProps props={useCopyProps} />
</DocSection>

<DocSection
	title="ButtonCopy"
	description="A button that copies a value to the clipboard with visual feedback via tooltip and toast notification."
>
	<DocExample title="Simple copy" code={usageSimpleCode}>
		{#snippet preview()}
			<UsageSimple />
		{/snippet}
	</DocExample>

	<DocExample title="Async copy" code={usageAsyncCode}>
		{#snippet preview()}
			<UsageAsync />
		{/snippet}
	</DocExample>

	<DocExample title="With label and custom icon" code={usageLabelCode}>
		{#snippet preview()}
			<UsageLabel />
		{/snippet}
	</DocExample>

	<DocProps props={buttonCopyProps} />
</DocSection>
