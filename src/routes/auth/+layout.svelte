<script>
	import { Toaster } from 'svelte-sonner'
	import '../../app.pcss'
</script>

<Toaster />

<div class="min-h-screen bg-base-200">
	<slot />
</div>
