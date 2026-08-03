<script lang="ts">
	import DocExample from '$lib/_doc/DocExample.svelte'
	import { DocProps, DocSection } from '$lib/_doc/index.ts'
	import { parseProps } from '$lib/_doc/parse-props.ts'
	import InputMultiSelectCode from '$lib/input/InputMultiSelect.svelte?raw'
	import InputSelectCode from '$lib/input/InputSelect.svelte?raw'
	import Usage from './Usage.svelte'
	import usageCode from './Usage.svelte?raw'
	import UsageItems from './UsageItems.svelte'
	import usageItemsCode from './UsageItems.svelte?raw'
	import UsageMulti from './UsageMulti.svelte'
	import usageMultiCode from './UsageMulti.svelte?raw'
	import UsageQuery from './UsageQuery.svelte'
	import usageQueryCode from './UsageQuery.svelte?raw'
	import UsageSearch from './UsageSearch.svelte'
	import usageSearchCode from './UsageSearch.svelte?raw'
</script>

<DocSection
	title="InputSelect"
	description="`items` accepte les trois façons d'alimenter une liste: un tableau déjà chargé (filtré en local), une fonction — synchrone ou asynchrone — qui porte son propre filtre, ou une remote query filtrée par le serveur. `value` porte l'item lui-même, pas sa valeur soumise: la sélection initiale s'affiche donc sans requête."
>
	<DocProps props={parseProps(InputSelectCode)} />
	<DocExample title="Tableau court" code={usageCode}>
		{#snippet preview()}<Usage />{/snippet}
	</DocExample>
	<DocExample title="Tableau, recherche locale" code={usageItemsCode}>
		{#snippet preview()}<UsageItems />{/snippet}
	</DocExample>
	<DocExample title="Fonction asynchrone" code={usageSearchCode}>
		{#snippet preview()}<UsageSearch />{/snippet}
	</DocExample>
	<DocExample title="Remote query" code={usageQueryCode}>
		{#snippet preview()}<UsageQuery />{/snippet}
	</DocExample>
</DocSection>

<DocSection
	title="InputMultiSelect"
	description="Même chose, mais sélectionne plusieurs items. Le popover ne se referme pas à chaque choix, et chaque valeur retenue se soumet par une case cochée cachée."
>
	<DocProps props={parseProps(InputMultiSelectCode)} />
	<DocExample title="Remote query" code={usageMultiCode}>
		{#snippet preview()}<UsageMulti />{/snippet}
	</DocExample>
</DocSection>
