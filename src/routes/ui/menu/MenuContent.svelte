<script lang="ts" module>
	import { type Options } from '$lib/utils/options.js'
	import { InstagramIcon, FacebookIcon, TwitterIcon } from '@lucide/svelte'

	export const menuOptions = {
		facebook: { label: 'Facebook', icon: FacebookIcon },
		insta: { label: 'Instagram', icon: InstagramIcon },
		twitter: { label: 'Twitter', icon: TwitterIcon }
	} satisfies Options
</script>

<ul>
	{#each Object.entries(menuOptions) as [value, option]}
		<li>
			<a class="menu-item" href="#{value}">
				<option.icon />
				<span>{option.label}</span>
			</a>
		</li>
	{/each}
</ul>
