<script lang="ts">
	import DialogCode from '$lib/ui/dialog/Dialog.svelte?raw'
	import DialogConfirmCode from '$lib/ui/dialog/DialogConfirm.svelte?raw'
	import DocExample from '$lib/_doc/DocExample.svelte'
	import { DocProps, DocSection } from '$lib/_doc/index.ts'
	import { parseProps } from '$lib/_doc/parse-props.ts'
	import { openDialog } from '$lib/ui/dialog/index.js'
	import Usage from './Usage.svelte'
	import usageCode from './Usage.svelte?raw'
	import UsageCallable from './UsageCallable.svelte'
	import usageCallableCode from './UsageCallable.svelte?raw'
	import UsagePrompt from './UsagePrompt.svelte'
	import usagePromptCode from './UsagePrompt.svelte?raw'
</script>

<DocSection
	title="Dialog"
	description="Modale native (`<dialog>` + `showModal()`), avec en-tête, corps défilant et pied. L'`activator` reçoit `showModal`, ou bien on pilote l'élément via `bind:dialog`."
>
	<DocProps props={parseProps(DialogCode)} />
	<DocExample title="Déclaratif" code={usageCode}>
		{#snippet preview()}<Usage />{/snippet}
	</DocExample>
</DocSection>

<DocSection
	title="openDialog / confirmDialog"
	description="Version impérative: `openDialog(Composant, props)` monte le composant à la demande et retourne une `Promise` réglée par sa prop `resolve` — ou `undefined` s'il est fermé autrement (Échap, backdrop, bouton X). `confirmDialog(options)` en est le raccourci `Promise<boolean>` bâti sur `DialogConfirm`."
>
	<DocProps props={parseProps(DialogConfirmCode)} />
	<DocExample title="Appel" code={usageCallableCode}>
		{#snippet preview()}<UsageCallable />{/snippet}
	</DocExample>
	<DocExample title="Dialogue sur mesure (UsagePrompt.svelte)" code={usagePromptCode}>
		{#snippet preview()}
			<button class="btn" onclick={() => openDialog(UsagePrompt, { label: 'Nouveau nom' })}>
				Ouvrir
			</button>
		{/snippet}
	</DocExample>
</DocSection>
