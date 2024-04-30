<script lang="ts">
	import { mdiCodeJson, mdiSonyPlaystation, mdiWeb } from '@mdi/js'
	import Meta from '$lib/Meta.svelte'
	import { jsonParse, urlParam } from '$lib/index.js'
	import {
		InputText,
		InputBoolean,
		InputSelect,
		InputCombo,
		InputRelation,
		InputRelations,
		InputTextRich
	} from '$lib/ui/input/index.js'
	import { tiptapParser } from '$lib/ui/input/textRich/tiptapParser.js'
	import { options, searchItems, type Item } from '../example.js'
	import { Icon, Tabs } from '$lib/ui/index.js'
	import LabelPlaystation from './LabelPlaystation.svelte'

	let inputBoolean: InputBoolean
	let inputText: InputText
	let inputSelect: InputSelect
	let inputCombo: InputCombo
	let inputRelation: InputRelation<Item>
	let inputRelations: InputRelations<Item>
	let inputTextRich: InputTextRich

	let inputTextRichValue = '<h2>Hey 👋</h2>'
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
	<InputBoolean label="Boolean input with label right" key="boolean_right" labelPosition="right" />
	<InputBoolean key="boolean_left" labelPosition="left" label={LabelPlaystation} />
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
