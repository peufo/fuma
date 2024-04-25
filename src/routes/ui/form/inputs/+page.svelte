<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import type { Options } from '$lib/index.js'
	import {
		InputText,
		InputBoolean,
		InputSelect,
		InputCombo,
		InputRelation,
		InputRelations
	} from '$lib/ui/index.js'
	import { mdiAbTesting, mdiAbacus, mdiAbjadArabic } from '@mdi/js'

	let inputBoolean: InputBoolean
	let inputText: InputText
	let inputSelect: InputSelect
	let inputCombo: InputCombo
	let inputRelation: InputRelation<Item>
	let inputRelations: InputRelations<Item>

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

<div class="h-60"></div>
