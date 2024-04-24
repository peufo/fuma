<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import type { Options } from '$lib/index.js'
	import { InputText, InputBoolean, InputSelect, InputCombo } from '$lib/ui/index.js'
	import { mdiAbTesting, mdiAbacus, mdiAbjadArabic } from '@mdi/js'

	let inputBoolean: InputBoolean
	let inputText: InputText
	let inputSelect: InputSelect
	let inputCombo: InputCombo

	let options: Options = {
		a: { label: 'Option A', icon: mdiAbTesting },
		b: { label: 'Option B', icon: mdiAbacus },
		c: { label: 'Option C', icon: mdiAbjadArabic }
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
