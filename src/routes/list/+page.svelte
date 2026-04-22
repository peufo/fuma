<script lang="ts">
import type { PropDef } from '../_doc/index.ts';
import { DocExample, DocProps, DocSection } from '../_doc/index.ts';
import Usage from './Usage.svelte';
import usageCode from './Usage.svelte?raw';

const props: PropDef[] = [
	{
		name: 'items',
		type: 'Type[]',
		description:
			'Items to reorder. Required for onChange to return the updated list.',
	},
	{
		name: 'onChange',
		type: '(newOrder: Type[]) => void',
		description:
			'Called when the order changes, returning the reordered items.',
	},
	{
		name: 'onReindex',
		type: '(newOrder: number[]) => void',
		description:
			'Called when the order changes, returning the new index order.',
	},
	{
		name: 'onMove',
		type: '(indexFrom: number, indexTo: number) => void',
		description: 'Called when an item is moved from one index to another.',
	},
	{
		name: 'onHover',
		type: '(newOrder: number[]) => void',
		description: 'Called while hovering during a drag operation.',
	},
	{
		name: 'onDragStart',
		type: '() => void',
		description: 'Called when dragging starts.',
	},
	{
		name: 'onDragMove',
		type: '() => void',
		description: 'Called while dragging.',
	},
	{
		name: 'onDragEnd',
		type: '() => void',
		description: 'Called when dragging ends.',
	},
	{
		name: 'onDelete',
		type: '(index: number, items?: Type[]) => void',
		description: 'Called when an item is deleted.',
	},
	{
		name: 'dragElementsSelector',
		type: 'string',
		description:
			'CSS selector for elements that trigger drag. Defaults to the item itself.',
	},
];
</script>

<DocSection title="listEditable">
	<DocExample code={usageCode}>
		{#snippet preview()}
			<Usage />
		{/snippet}
	</DocExample>
	<DocProps {props} />
</DocSection>
