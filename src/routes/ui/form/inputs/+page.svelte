<script lang="ts">
	import { mdiCodeJson, mdiWeb } from '@mdi/js'
	import Meta from '$lib/private/Meta.svelte'
	import { jsonParse } from '$lib/utils/jsonParse.js'
	import { urlParam } from '$lib/store/param.js'
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
	import { Tabs } from '$lib/ui/tabs/index.js'
	import { InputTextRich, tiptapParser } from '$lib/ui/input/textRich/index.js'
	import { options, searchItems, type Item } from '../example.js'

	let inputTextRichValue = '<h2>Hey 👋</h2>'
	let number = 42
	let datetime = new Date()
	let date: Date | null = null
</script>

<Meta name="InputText">
	<InputText label="Text input" key="text" />
</Meta>

<Meta name="InputNumber">
	<div class="flex items-center gap-2">
		<button class="btn" on:click={() => number++}> + 1 </button>
		<button class="btn" on:click={() => number--}> - 1 </button>
		<button class="btn" on:click={() => (number = 42)}> set 42 </button>
		<span>Value = {number}</span>
	</div>

	<InputNumber label="Text number" key="number" bind:value={number} />
</Meta>

<Meta name="InputBoolean">
	<InputBoolean label="Boolean input" key="boolean" value={true} />
	<InputBoolean label="Boolean input with label right" key="boolean_right" labelPosition="right" />
	<InputBoolean key="boolean_left" labelPosition="left" />
</Meta>
<Meta name="InputSelect">
	<InputSelect key="select" label="Input Select" {options} />
</Meta>

<Meta name="InputCombo">
	<InputCombo key="combo" label="Input combo" {options} />
</Meta>

{#snippet slotItem(item: Item)}
	{item.name}
{/snippet}

<Meta name="InputRelation">
	<InputRelation
		label="Input Relation"
		search={searchItems}
		{slotItem}
		createUrl="/ui/form/inputs?create_item=true"
		createTitle="Créer un item"
	/>
	<InputRelation label="Input Relation" search={searchItems} {slotItem} />
</Meta>

<Meta name="InputRelations">
	<InputRelations
		label="Input Relations"
		search={searchItems}
		{slotItem}
		createUrl="/ui/form/inputs?create_item=true"
		createTitle="Créer un item"
	/>

	<InputRelations label="Input Relations" search={searchItems} {slotItem} />
</Meta>

<Meta name="InputTextRich">
	<InputTextRich bind:value={inputTextRichValue} label="Input text rich" />

	<h2 class="title mt-6">Output</h2>

	<Tabs
		tabs={[
			{
				href: $urlParam.with({ outputTextRich: 'html' }),
				isActive: !$urlParam.hasValue('outputTextRich', 'json'),
				icon: mdiWeb,
				label: 'HTML'
			},
			{
				href: $urlParam.with({ outputTextRich: 'json' }),
				isActive: $urlParam.hasValue('outputTextRich', 'json'),
				icon: mdiCodeJson,
				label: 'JSON'
			}
		]}
	/>
	{#if $urlParam.hasValue('outputTextRich', 'json')}
		<pre>{JSON.stringify(jsonParse(inputTextRichValue, []), null, 2)}</pre>
	{:else}
		<div class="prose">
			{@html tiptapParser.toHTML(inputTextRichValue)}
		</div>
	{/if}
</Meta>

<Meta name="InputDate">
	<InputDate label="My Date" key="date" bind:value={date} hint={date ? date.toString() : 'null'} />
	<InputDate label="My Date binded" key="date" bind:value={datetime} />
</Meta>

<Meta name="InputDateTime">
	<InputDateTime label="My datetime" key="datetime" bind:value={datetime} />
</Meta>

<Meta name="InputTime">
	<InputTime label="My time" key="time" bind:value={datetime} input={{ step: 300 }} />
</Meta>

<div class="h-60"></div>
