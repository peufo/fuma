<script lang="ts">
	import { jsonParse } from '$lib/utils/jsonParse.js'
	import { urlParam } from '$lib/state/param.svelte.js'
	import {
		InputText,
		InputBoolean,
		InputNumber,
		InputSelect,
		InputCombo,
		InputRelation,
		InputRelations,
		InputDate,
		InputDateTime,
		InputTime
	} from '$lib/ui/input/index.js'
	import { InputTextRich, tiptapParser } from '$lib/ui/input/textRich/index.js'
	import { options, searchItems, type Item } from '../example.js'

	let inputTextRichValue = '<h2>Hey 👋</h2>'
	let number = 42
	let datetime = new Date()
	let date: Date | null = null
</script>

<InputText label="Text input" key="text" />

<div class="flex items-center gap-2">
	<button class="btn" on:click={() => number++}> + 1 </button>
	<button class="btn" on:click={() => number--}> - 1 </button>
	<button class="btn" on:click={() => (number = 42)}> set 42 </button>
	<span>Value = {number}</span>
</div>

<InputNumber label="Text number" key="number" bind:value={number} />

<InputBoolean label="Boolean input" key="boolean" value={true} />
<InputBoolean label="Boolean input with label right" key="boolean_right" labelPosition="right" />
<InputBoolean key="boolean_left" labelPosition="left" />

<InputSelect key="select" label="Input Select" {options} />

<InputCombo key="combo" label="Input combo" {options} />

{#snippet snipItem(item: Item)}
	{item.name}
{/snippet}

<InputRelation
	label="Input Relation"
	search={searchItems}
	{snipItem}
	createUrl="/ui/form/inputs?create_item=true"
	createTitle="Créer un item"
/>
<InputRelation label="Input Relation" search={searchItems} {snipItem} />

<InputRelations
	label="Input Relations"
	search={searchItems}
	{snipItem}
	createUrl="/ui/form/inputs?create_item=true"
	createTitle="Créer un item"
/>

<InputRelations label="Input Relations" search={searchItems} {snipItem} />

<InputTextRich bind:value={inputTextRichValue} label="Input text rich" />

<h2 class="title mt-6">Output</h2>

<div class="flex">
	<a
		href={urlParam.with({ outputTextRich: 'html' })}
		class:underline={urlParam.hasValue('outputTextRich', 'html')}
		data-sveltekit-noscroll
		data-sveltekit-replacestate
	>
		HTML
	</a>
	<a
		href={urlParam.with({ outputTextRich: 'json' })}
		class:underline={urlParam.hasValue('outputTextRich', 'json')}
		data-sveltekit-noscroll
		data-sveltekit-replacestate
	>
		JSON
	</a>
</div>

{#if urlParam.hasValue('outputTextRich', 'json')}
	<pre>{JSON.stringify(jsonParse(inputTextRichValue, []), null, 2)}</pre>
{:else}
	<div class="prose">
		{@html tiptapParser.toHTML(inputTextRichValue)}
	</div>
{/if}

<InputDate label="My Date" key="date" bind:value={date} hint={date ? date.toString() : 'null'} />
<InputDate label="My Date binded" key="date" bind:value={datetime} />

<InputDateTime label="My datetime" key="datetime" bind:value={datetime} />

<InputTime label="My time" key="time" bind:value={datetime} input={{ step: 300 }} />

<div class="h-60"></div>
