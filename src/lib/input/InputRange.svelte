<script lang="ts">
	import type { RemoteFormField } from '@sveltejs/kit'
	import Issues from './Issues.svelte'
	import type { InputProps } from './type.js'
	import type { Snippet } from 'svelte'

	let {
		label,
		field,
		value = $bindable(),
		name,
		labelAppend,
		class: klass,
		...props
	}: {
		label: string
		field?: RemoteFormField<number>
		/**
		 * Sans `field`, la valeur liée. Avec, la valeur initiale du champ — celui-ci prend
		 * ensuite le relais et devient la source de vérité.
		 */
		value?: number
		/** Sans `field`, ce qui nomme la valeur soumise. Avec, `field.as()` s'en charge. */
		name?: string
		/** Rendu à droite du libellé, avant la valeur courante. */
		labelAppend?: Snippet
	} & InputProps = $props()
</script>

<label>
	<div class="flex gap-2 px-3 text-sm">
		<span class="label text-wrap">{label}</span>
		{@render labelAppend?.()}
		<span class="label ml-auto">{field?.value() ?? value}</span>
	</div>
	{#if field}
		<!-- `props` avant `field.as()`: le navigateur ramène la valeur d'un `range` sur la grille
		     `min`/`max`/`step` à chaque écriture. Posée en premier, elle est arrondie selon les
		     bornes par défaut (0–100, pas de 1), et poser les vraies bornes ensuite l'y recale une
		     seconde fois — au montage côté client, 0.75 finissait sur le minimum. -->
		<input
			class={['range w-full range-sm', klass]}
			{...props}
			{...value === undefined ? field.as('range') : field.as('range', value)}
		/>
	{:else}
		<input class={['range w-full range-sm', klass]} type="range" {name} bind:value {...props} />
	{/if}
	<Issues {field} />
</label>
