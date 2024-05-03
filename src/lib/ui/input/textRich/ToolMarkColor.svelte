<script lang="ts">
	import { Icon } from '$lib/ui/icon/index.js'
	import { tip } from '$lib/action/tip.js'

	export let icon: string
	export let label: string
	export let color: string
	export let setColor: (color: string) => void

	let inputColor: HTMLInputElement

	function handleClick() {
		inputColor.click()
		setColor(color)
	}
</script>

<div class="flex align-bottom">
	<input
		type="color"
		tabindex="-1"
		bind:value={color}
		class="h-0 w-0 translate-y-8 border-none opacity-0 outline-none"
		bind:this={inputColor}
		on:input={() => setColor(color)}
	/>
	<button type="button" class="menu-item gap-2" on:click={handleClick} use:tip={{ content: label }}>
		<div class="indicator">
			<span
				class="badge indicator-item badge-xs scale-75 border transition-none"
				style:background={color}
			/>
			<Icon path={icon} size={19} class="opacity-70" />
		</div>
	</button>
</div>
