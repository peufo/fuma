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
		InputRelations
	} from '$lib/ui/input/index.js'
	import { Tabs } from '$lib/ui/tabs/index.js'
	import { InputTextRich, tiptapParser } from '$lib/ui/input/textRich/index.js'
	import { options, searchItems, type Item } from '../example.js'
	import LabelPlaystation from './LabelPlaystation.svelte'

	let inputText: InputText
	let inputNumber: InputNumber
	let inputBoolean: InputBoolean
	let inputSelect: InputSelect
	let inputCombo: InputCombo
	let inputRelation: InputRelation<Item>
	let inputRelations: InputRelations<Item>
	let inputTextRich: InputTextRich

	let inputTextRichValue = '<h2>Hey 👋</h2>'

	let number = 42
</script>

<Meta component={inputText} name="InputText">
	<InputText bind:this={inputText} label="Text input" key="text" />
</Meta>

<Meta component={inputNumber} name="InputNumber">
	<div class="flex items-center gap-2">
		<button class="btn" on:click={() => number++}> + 1 </button>
		<button class="btn" on:click={() => number--}> - 1 </button>
		<button class="btn" on:click={() => (number = 42)}> set 42 </button>
		<span>Value = {number}</span>
	</div>

	<InputNumber bind:this={inputNumber} label="Text number" key="number" bind:value={number} />
</Meta>

<Meta component={inputBoolean} name="InputBoolean">
	<InputBoolean bind:this={inputBoolean} label="Boolean input" key="boolean" value={true} />
	<InputBoolean label="Boolean input with label right" key="boolean_right" labelPosition="right" />
	<InputBoolean key="boolean_left" labelPosition="left" label={LabelPlaystation} />
</Meta>
<Meta component={inputSelect} name="InputSelect">
	<InputSelect bind:this={inputSelect} key="select" label="Input Select" {options} />
</Meta>

<Meta component={inputCombo} name="InputCombo">
	<InputCombo bind:this={inputCombo} key="combo" label="Input combo" {options} />
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
	<InputTextRich
		bind:this={inputTextRich}
		bind:value={inputTextRichValue}
		label="Input text rich"
	/>

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
