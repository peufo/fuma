<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import { jsonParse, urlParam, type Options } from '$lib/index.js'
	import {
		InputText,
		InputBoolean,
		InputSelect,
		InputCombo,
		InputRelation,
		InputRelations,
		InputTextRich
	} from '$lib/ui/index.js'
	import { tiptapParser } from '$lib/ui/input/textRich/tiptapParser.js'
	import Tabs from '$lib/ui/tabs/Tabs.svelte'
	import { mdiAbTesting, mdiAbacus, mdiAbjadArabic, mdiCodeJson, mdiWeb } from '@mdi/js'
	import { onMount } from 'svelte'

	let inputBoolean: InputBoolean
	let inputText: InputText
	let inputSelect: InputSelect
	let inputCombo: InputCombo
	let inputRelation: InputRelation<Item>
	let inputRelations: InputRelations<Item>
	let inputTextRich: InputTextRich

	let inputTextRichValue = '<h2>Hey 👋</h2>'

	let options: Options = {
		a: { label: 'Option A', icon: mdiAbTesting },
		b: { label: 'Option B', icon: mdiAbacus },
		c: { label: 'Option C', icon: mdiAbjadArabic }
	}

	type Item = { id: string; name: string }
	const items: Item[] = [
		{ id: '1', name: 'Item A' },
		{ id: '2', name: 'Item B' },
		{ id: '3', name: 'Item C' }
	]

	async function searchItems(search: string) {
		await wait(600)
		const reg = new RegExp(search, 'i')
		return items.filter((item) => item.name.match(reg))
	}

	async function wait(ms: number): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => resolve(), ms)
		})
	}
</script>

<Meta component={inputText} name="InputText">
	<InputText bind:this={inputText} label="Text input" key="text" />
</Meta>

<Meta component={inputSelect} name="InputSelect">
	<InputSelect bind:this={inputSelect} key="select" label="Input Select" {options} />
</Meta>

<Meta component={inputCombo} name="InputCombo">
	<InputCombo bind:this={inputCombo} key="combo" label="Input combo" {options} />
</Meta>

<Meta component={inputBoolean} name="InputBoolean">
	<InputBoolean bind:this={inputBoolean} label="Boolean input" key="boolean" value={true} />
</Meta>

<Meta component={inputRelation} name="InputRelation">
	<InputRelation
		bind:this={inputRelation}
		label="Input Relation"
		search={searchItems}
		slotItem={(item) => item.name}
		createUrl="/ui/form/inputs?create_item=true"
		createTitle="Créer un item"
	/>

	<InputRelation label="Input Relation" search={searchItems} slotItem={(item) => item.name} />
</Meta>

<Meta component={inputRelations} name="InputRelations">
	<InputRelations
		bind:this={inputRelations}
		label="Input Relations"
		search={searchItems}
		slotItem={(item) => item.name}
		createUrl="/ui/form/inputs?create_item=true"
		createTitle="Créer un item"
	/>

	<InputRelations label="Input Relations" search={searchItems} slotItem={(item) => item.name} />
</Meta>

<Meta component={inputTextRich} name="InputTextRich">
	<InputTextRich bind:this={inputTextRich} bind:value={inputTextRichValue} />

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

<div class="h-60"></div>
