<script lang="ts">
	import InputCheckboxsTreeNodes, {
		type OptionsNode
	} from '$lib/ui/input/InputCheckboxsTreeNodes.svelte'

	export let label: string
	export let options: OptionsNode
	let klass = ''
	export { klass as class }
</script>

<div class={klass}>
	<div class="label">
		<span class="label-text">{label}</span>
		<slot name="label_append" />
	</div>
	<InputCheckboxsTreeNodes {options} />
</div>
