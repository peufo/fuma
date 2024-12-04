<script lang="ts">
	import { mdiGenderFemale, mdiGenderMale, mdiGenderNonBinary } from '@mdi/js'
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
						female: { label: 'Female', icon: mdiGenderFemale },
						male: { label: 'Male', icon: mdiGenderMale },
						nonBinary: { label: 'Non binary', icon: mdiGenderNonBinary }
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
	sections={[{}, { title: 'Details', isReducible: true }]}
/>
