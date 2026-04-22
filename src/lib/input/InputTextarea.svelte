<script lang="ts">
import type { RemoteFormField } from '@sveltejs/kit';
import { TextareaAutosize } from 'runed';
import Issues from './Issues.svelte';
import type { TextareaProps } from './type.ts';

let {
	label,
	field,
	value = $bindable(),
	class: klass,
	maxHeight = 200,
	...props
}: {
	label: string;
	field?: RemoteFormField<string>;
	value?: string;
	maxHeight?: number;
} & TextareaProps = $props();

let textarea = $state<HTMLTextAreaElement>();
new TextareaAutosize({
	element: () => textarea,
	input: () => field?.value() || value || '',
	// svelte-ignore state_referenced_locally
	maxHeight,
});
</script>

<label class="floating-label">
	<span>{label}</span>
	<textarea
		placeholder={label}
		class={['textarea', klass]}
		bind:this={textarea}
		{...field?.as('text')}
		bind:value
		{...props}
	></textarea>
	<Issues {field} />
</label>

<style>
	textarea[aria-invalid='true'] {
		--input-color: var(--color-error);
	}
</style>
