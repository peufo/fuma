<script lang="ts">
	import { slide } from 'svelte/transition'
	import { page } from '$app/stores'
	import { InputText, InputPassword } from '$lib/ui/input/index.js'
	import { useForm } from '$lib/validation/form.js'

	export let onSuccess:
		| ((action: URL, data?: Record<string, unknown> | undefined) => any)
		| undefined = undefined

	const { enhance } = useForm({
		onSuccess,
		successMessage(action) {
			if (action.search === '?/reset_password') {
				recorverDialog.close()
				state = 'login'
				return "Un lien de récupération t'a été envoyé par email"
			}
			return 'Bienvenue'
		},
		onError(err) {
			if (err === 'This account already exists') {
				state = 'login'
				return
			}
			if (err === 'This account already created from an invitation') {
				recorverDialog.showModal()
				return
			}
		}
	})
	let state: 'login' | 'register' = 'login'

	$: redirectTo = $page.url.searchParams.get('redirectTo')

	let recorverDialog: HTMLDialogElement
</script>

<div class="grid place-content-center p-10">
	<div style:width="min(24rem, calc(100vw - 1rem))" class="card place-content-center shadow-lg">
		<div class="tabs tabs-lifted w-full">
			<span
				role="button"
				tabindex="0"
				class="tab-lg tab h-10 grow"
				class:tab-active={state === 'login'}
				on:click={() => (state = 'login')}
				on:keyup={() => (state = 'login')}
			>
				Connexion
			</span>
			<span
				role="button"
				tabindex="0"
				class="tab-lg tab h-10 grow"
				class:tab-active={state === 'register'}
				on:click={() => (state = 'register')}
				on:keyup={() => (state = 'register')}
			>
				Nouveau compte
			</span>
		</div>

		<form
			class="card-body rounded-b-lg border border-t-0 border-base-300 bg-base-100"
			method="post"
			use:enhance
		>
			<InputText key="username" label="Nom d'utilisateur" input={{ autocomplete: 'username' }} />

			{#if state === 'register'}
				<div transition:slide|local>
					<InputText
						key="email"
						label="Email"
						input={{ autocomplete: 'email', inputmode: 'email' }}
					/>
				</div>
			{/if}

			<InputPassword key="password" label="Mot de passe" />

			{#if redirectTo}
				<input type="hidden" name="redirectTo" value={redirectTo} />
			{/if}

			<div class="card-actions flex-row-reverse items-center pt-4">
				<button class="btn" formaction="/auth?/{state}">
					{state === 'login' ? 'Connexion' : 'Valider'}
				</button>
				<div class="grow"></div>

				<button class="link-hover link" formaction="/auth?/reset_password">
					Mot de passe oublié
				</button>
			</div>
		</form>
	</div>
</div>
