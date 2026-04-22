<script lang="ts">
import { users } from '$lib/data.ts';
import { Spans, useSearch } from '$lib/search/index.ts';

const search = $derived(
	useSearch({
		items: users,
		keys: {
			name: {},
			job: {},
		},
		minMatchCharLength: 2,
		ignoreLocation: true,
		includeScore: true,
	})
);
let value = $state('');
const results = $derived.by(() => search.query(value));
</script>

<div class="p-4">
	<label class="floating-label">
		<span>Search</span>
		<input bind:value type="text" class="input" placeholder="Search" />
	</label>

	<div class="mt-4 flex flex-col gap-1">
		{#each results as { spans, score }}
			<div class="rounded border px-4 py-2">
				<h3 class="text-lg">
					<Spans spans={spans.name} />
				</h3>
				<p><Spans spans={spans.job} /></p>
				<p>score: {score}</p>
			</div>
		{/each}
	</div>
</div>
