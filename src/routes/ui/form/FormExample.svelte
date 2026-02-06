<script lang="ts">
	import { MarsIcon, VenusIcon, VenusAndMarsIcon } from '@lucide/svelte'
	import { Form } from '$lib/ui/form/index.js'
	import { searchItems } from './example.js'

	export let form: Form<any>
</script>

{#snippet slotItem(item: any)}
	{item.name}
{/snippet}

<Form
	bind:this={form}
	fields={[
		[
			{ key: 'name', text: { label: 'Name' } },
			{ key: 'age', number: { label: 'Age', input: { min: 0, max: 140 } } },
			{
				key: 'country',
				relation: { label: 'Country', search: searchItems, slotItem }
			}
		],
		[
			{
				key: 'gender',
				select: {
					label: 'Gender',
					options: {
						female: { label: 'Female', icon: VenusIcon },
						male: { label: 'Male', icon: MarsIcon },
						nonBinary: { label: 'Non binary', icon: VenusAndMarsIcon }
					}
				}
			},
			{
				key: 'description',
				textarea: {
					label: 'Description'
				}
			},
			{
				key: 'cv',
				colSpan: 4,
				textrich: {
					label: 'Curiculum Vitae'
				}
			}
		]
	]}
/>
