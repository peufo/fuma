<script lang="ts">
	import { Form } from '$lib/index.js'
	import { mdiGenderFemale, mdiGenderMale, mdiGenderNonBinary } from '@mdi/js'

	export let form: Form<any>
</script>

<Form
	bind:this={form}
	fields={[
		[
			{ key: 'name', text: { label: 'Name' } },
			{ key: 'age', number: { label: 'Age', input: { min: 0, max: 140 } } }
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
