<script lang="ts" context="module">
	import { type Options } from '$lib/index.js'

	export const menuOptions = {
		facebook: { label: 'Facebook', icon: mdiFacebook },
		insta: { label: 'Instagram', icon: mdiInstagram },
		google: { label: 'Google', icon: mdiGoogle }
	} satisfies Options
</script>

<script lang="ts">
	import { mdiGoogle, mdiFacebook, mdiInstagram } from '@mdi/js'
	import { Icon } from '$lib/index.js'
</script>

<ul>
	{#each Object.entries(menuOptions) as [value, { label, icon }]}
		<li>
			<a class="menu-item" href="#{value}">
				<Icon path={icon} size={18} />
				<span>{label}</span>
			</a>
		</li>
	{/each}
</ul>
