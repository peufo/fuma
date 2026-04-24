<script lang="ts">
	import { PrinterCheckIcon } from '@lucide/svelte'
	import { ButtonCopy } from '$lib/ui/copy/index.js'
</script>

<ButtonCopy title="Copy with label" value="Labeled copy" label="Copy" />
<ButtonCopy
	title="Copy with custom icon"
	value="Icon copy"
	class="btn btn-square"
	Icon={PrinterCheckIcon}
/>
