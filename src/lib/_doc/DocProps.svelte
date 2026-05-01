<script lang="ts" module>
	export type PropDef = {
		name: string
		type: string
		default?: string
		required?: boolean
		description?: string
	}
</script>

<script lang="ts">
	let {
		props
	}: {
		props: PropDef[]
	} = $props()
</script>

<div class="not-prose my-6">
	<div class="collapse-arrow collapse rounded-lg border bg-base-100">
		<input type="checkbox" />
		<div class="collapse-title text-sm font-semibold">{props.length} Props</div>
		<div class="collapse-content p-0">
			<div class="overflow-x-auto">
				<table class="table table-zebra table-sm">
					<thead class="bg-base-200/80 text-sm">
						<tr>
							<th>Name</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{#each props as prop (prop.name)}
							<tr>
								<td class="whitespace-nowrap">
									<code class="font-mono text-sm">{prop.name}</code>
									{#if prop.required}
										<span class="ml-1 badge badge-xs badge-error">required</span>
									{/if}
								</td>
								<td>
									<code class="font-mono text-xs opacity-70">{prop.type}</code>
								</td>
								<td class="text-sm opacity-80">
									{#if prop.default}
										<code class="font-mono text-xs">{prop.default}</code>
									{:else}
										<span class="opacity-50">—</span>
									{/if}
								</td>
								<td class="text-sm">{prop.description ?? ''}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
