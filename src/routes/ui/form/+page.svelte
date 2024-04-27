<script lang="ts">
	import Meta from '$lib/Meta.svelte'
	import { Form } from '$lib/index.js'
	import { mdiGenderFemale, mdiGenderMale, mdiGenderNonBinary } from '@mdi/js'

	let form: Form<any>
</script>

<Meta component={form} name="Form">
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
				}
			]
		]}
		sections={[{}, { title: 'Details', isReducible: true }]}
	/>
</Meta>
