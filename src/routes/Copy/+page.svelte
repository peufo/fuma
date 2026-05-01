<script lang="ts">
	import type { PropDef } from '$lib/_doc/index.ts'
	import ButtonCopyCode from '$lib/ui/copy/ButtonCopy.svelte?raw'
	import DocExample from '$lib/_doc/DocExample.svelte'
	import { DocProps, DocSection } from '$lib/_doc/index.ts'
	import { parseProps } from '$lib/_doc/parse-props.ts'
	import UsageAsync from './UsageAsync.svelte'
	import usageAsyncCode from './UsageAsync.svelte?raw'
	import UsageLabel from './UsageLabel.svelte'
	import usageLabelCode from './UsageLabel.svelte?raw'
	import UsageSimple from './UsageSimple.svelte'
	import usageSimpleCode from './UsageSimple.svelte?raw'
	import UsageUseCopy from './UsageUseCopy.svelte'
	import usageUseCopyCode from './UsageUseCopy.svelte?raw'

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

<DocSection title="useCopy" description="TODO: write a small description">
	<DocProps props={useCopyProps} />
	<DocExample title="Direct usage" code={usageUseCopyCode}>
		{#snippet preview()}<UsageUseCopy />{/snippet}
	</DocExample>
</DocSection>

<DocSection title="ButtonCopy" description="TODO: write a small description">
	<DocProps props={parseProps(ButtonCopyCode)} />
	<DocExample title="Simple copy" code={usageSimpleCode}>
		{#snippet preview()}<UsageSimple />{/snippet}
	</DocExample>
	<DocExample title="Async copy" code={usageAsyncCode}>
		{#snippet preview()}<UsageAsync />{/snippet}
	</DocExample>
	<DocExample title="With label and custom icon" code={usageLabelCode}>
		{#snippet preview()}<UsageLabel />{/snippet}
	</DocExample>
</DocSection>
