<script lang="ts">
	import type { RemoteForm, RemoteFormInput } from '@sveltejs/kit';
	import debounce from 'debounce';
	import type { FormEventHandler } from 'svelte/elements';
	import { userSchema } from './db.ts';
	import InputString from './InputString.svelte';
	import { formCreateUser } from './test.remote.ts';

	let { data } = $props();

	const { oninput } = useForm(formCreateUser);

	function useForm<Input extends RemoteFormInput | undefined, Output>(
		remoteForm: RemoteForm<Input, Output>
	) {
		const validateDebounced = debounce(() => remoteForm.validate(), 1000);
		// TODO: oninput can be an attachement

		const oninput: FormEventHandler<HTMLFormElement> = ({ target }) => {
			if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement)) return;
			console.log(target, target.ariaInvalid);
			if (target.ariaInvalid === 'true') {
				remoteForm.validate();
			} else {
				validateDebounced();
			}
		};
		return {
			oninput
		};
	}
</script>

<div class="flex gap-2">
	<div>
		<form {...formCreateUser} {oninput} class="flex flex-col gap-3 p-3">
			<InputString field={formCreateUser.fields.name} label="Name" />

			<!-- <label class="floating-label">
				<span>Name</span>
				<input
					class="validator input"
					{...createUser.fields.name.as('text')}
					oninput={() => {
						createUser.fields.name.issues()?.length ? createUser.validate() : validateDebounced();
					}}
				/>
				<div class="validator-hint">
					{#each createUser.fields.name.issues() as issue}
						{issue.message}<br />
					{/each}
				</div>
			</label> -->
			<label class="floating-label">
				<span>Age</span>
				<input class="validator input" {...formCreateUser.fields.age.as('number')} />
				<div class="validator-hint">
					{#each formCreateUser.fields.age.issues() as issue}
						{issue.message}<br />
					{/each}
				</div>
			</label>
			<div>
				<label class="label">
					<input class="validator toggle" {...formCreateUser.fields.isValided.as('checkbox')} />
					<span>Valided ?</span>
				</label>
				<div class="validator-hint">
					{#each formCreateUser.fields.age.issues() as issue}
						{issue.message}<br />
					{/each}
				</div>
			</div>

			<label class="floating-label">
				<span>Inscription</span>
				<input class="validator input" {...formCreateUser.fields.subscribeAt.as('date')} />
				<div class="validator-hint">
					{#each formCreateUser.fields.subscribeAt.issues() as issue}
						{issue.message}<br />
					{/each}
				</div>
			</label>

			<button class="btn">Create</button>
		</form>
	</div>

	<div>
		{#each data.users as user}
			<div class="flex flex-col gap-1 border px-2 py-1">
				<span>{user.name} - {user.age}</span>
				<span>Valided: {user.isValided}</span>
				<span>Subscribe: {user.subscribeAt}</span>
			</div>
		{/each}
	</div>
</div>
