<script lang="ts">
	import { userSchema } from './db.ts';
	import { createUser, getUser } from './test.remote.ts';

	let { data } = $props();

	let age = $state(42);
	const user = $derived(getUser({ age }));
</script>

<h2>REMOTE</h2>

<input type="number" class="" bind:value={age} />

<pre>{JSON.stringify(user.loading, null, 2)}</pre>
<pre>{JSON.stringify(user.current, null, 2)}</pre>

<div class="flex gap-2">
	<div>
		<form {...createUser.preflight(userSchema)} class="flex flex-col gap-3 p-3">
			<label class="floating-label">
				<span>Name</span>
				<input class="validator input" {...createUser.fields.name.as('text')} />
				<div class="validator-hint">
					{#each createUser.fields.name.issues() as issue}
						{issue.message}<br />
					{/each}
				</div>
			</label>
			<label class="floating-label">
				<span>Age</span>
				<input class="validator input" {...createUser.fields.age.as('number')} />
				<div class="validator-hint">
					{#each createUser.fields.age.issues() as issue}
						{issue.message}<br />
					{/each}
				</div>
			</label>
			<div>
				<label class="label">
					<input class="validator toggle" {...createUser.fields.isValided.as('checkbox')} />
					<span>Valided ?</span>
				</label>
				<div class="validator-hint">
					{#each createUser.fields.age.issues() as issue}
						{issue.message}<br />
					{/each}
				</div>
			</div>

			<button class="btn">Create</button>
		</form>
		<pre>{JSON.stringify(createUser.fields.allIssues(), null, 2)}</pre>
	</div>

	<div>
		{#each data.users as user}
			<span>{user.name} - {user.age} - {user.isValided ? 'ok' : 'nok'}</span>
		{/each}
	</div>
</div>
