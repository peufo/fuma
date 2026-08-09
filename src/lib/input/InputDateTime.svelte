<script lang="ts">
	import { MinusIcon, PlusIcon } from '@lucide/svelte'
	import type { RemoteFormField } from '@sveltejs/kit'
	import dayjs, { type Dayjs } from 'dayjs'
	import timezonePlugin from 'dayjs/plugin/timezone.js'
	import utcPlugin from 'dayjs/plugin/utc.js'
	import Issues from './Issues.svelte'
	import type { InputProps } from './type.js'

	dayjs.extend(utcPlugin)
	dayjs.extend(timezonePlugin)

	let {
		label,
		field,
		name,
		value = $bindable(),
		timezone,
		layout = 'split',
		variant = 'block',
		hint,
		transform = (v) => v,
		onchange,
		class: klass,
		...props
	}: {
		label: string
		/** La date part en ISO dans un champ caché: au schéma de la reconstruire. */
		field?: RemoteFormField<string>
		/** Sans `field`, le nom du champ caché. Sans l'un ni l'autre, rien n'est soumis. */
		name?: string
		value?: Date | null
		/** Zone IANA d'affichage et de saisie; à défaut, celle du navigateur. */
		timezone?: string
		/** `split`: l'heure au-dessus de la date, avec ses boutons ±jour. */
		layout?: 'split' | 'datetime'
		/** Sans effet sur `split`, dont la ligne de label porte le `hint`. */
		variant?: 'floating' | 'block'
		hint?: string
		/** Ajuste la valeur avant qu'elle ne soit posée — borne, arrondi, décalage. */
		transform?: (value: Date) => Date
		onchange?: (value: Date) => void
	} & InputProps = $props()

	const inputId = $props.id()
	const inputProps = $derived({ id: inputId, class: 'input w-full', step: 300, ...props })

	const current = $derived(value ? inZone(dayjs(value)) : null)

	function inZone(date: Dayjs) {
		return timezone ? date.tz(timezone) : date
	}

	/** Une saisie partielle sur un champ vide se raccroche à maintenant. */
	function base() {
		return current ?? inZone(dayjs())
	}

	function setTime(time: string) {
		if (!time) return
		const [h, m] = time.split(':').map(Number)
		setValue(base().set('h', h).set('m', m))
	}

	function setDate(date: string) {
		if (!date) return
		const [y, m, d] = date.split('-').map(Number)
		setValue(
			base()
				.set('y', y)
				.set('M', m - 1)
				.set('D', d)
		)
	}

	function setDateTime(datetime: string) {
		if (!datetime) return
		const [date, time] = datetime.split('T')
		const [y, M, d] = date.split('-').map(Number)
		const [h, m] = time.split(':').map(Number)
		setValue(
			base()
				.set('y', y)
				.set('M', M - 1)
				.set('D', d)
				.set('h', h)
				.set('m', m)
				.startOf('m')
		)
	}

	function setValue(newValue: Dayjs) {
		const date = transform(newValue.toDate())
		value = date
		// Le champ caché suffit à soumettre; `set` garde la validation du formulaire à jour.
		field?.set(date.toJSON())
		onchange?.(date)
	}
</script>

{#if value}
	{#if field}
		<input {...field.as('hidden', value.toJSON())} />
	{:else if name}
		<input type="hidden" {name} value={value.toJSON()} />
	{/if}
{/if}

{#snippet inputDateTime()}
	<input
		{...inputProps}
		type="datetime-local"
		value={current ? current.format('YYYY-MM-DDTHH:mm') : ''}
		oninput={(event) => setDateTime(event.currentTarget.value)}
	/>
{/snippet}

{#snippet inputSplit()}
	<div>
		<input
			{...inputProps}
			type="time"
			value={current ? current.format('HH:mm') : ''}
			oninput={(event) => setTime(event.currentTarget.value)}
		/>

		<div class="join mt-1 flex w-full">
			<!-- `preventDefault` sur le `mousedown`: le bouton ne prend pas le focus, donc aucun
			     `focusout` n'est émis. Dans un popover, ce focus qui se déplace est ce qui déclenche
			     la fermeture; le focus reste sur le champ, ce qui permet aussi d'enchaîner les pas. -->
			<button
				type="button"
				class="btn join-item btn-square bg-base-200/30 btn-xs"
				disabled={!current}
				onmousedown={(event) => event.preventDefault()}
				onclick={() => current && setValue(current.add(-1, 'day'))}
			>
				<MinusIcon size={12} />
			</button>
			<input
				type="date"
				class="border-soft input join-item border-x-0 input-ghost input-xs"
				value={current ? current.format('YYYY-MM-DD') : ''}
				oninput={(event) => setDate(event.currentTarget.value)}
			/>
			<button
				type="button"
				class="btn join-item btn-square bg-base-200/30 btn-xs"
				disabled={!current}
				onmousedown={(event) => event.preventDefault()}
				onclick={() => current && setValue(current.add(1, 'day'))}
			>
				<PlusIcon size={12} />
			</button>
		</div>
	</div>
{/snippet}

{#if layout === 'datetime' && variant === 'floating'}
	<label class={['floating-label', klass]}>
		<span>{label}</span>
		{@render inputDateTime()}
		<Issues {field} />
	</label>
{:else}
	<fieldset class={['fieldset', klass]}>
		<label class="label" for={inputId}>
			<span>{label}</span>
			{#if hint}
				<span class="ml-auto">{hint}</span>
			{/if}
		</label>
		{#if layout === 'datetime'}
			{@render inputDateTime()}
		{:else}
			{@render inputSplit()}
		{/if}
		<Issues {field} />
	</fieldset>
{/if}

<style>
	input[aria-invalid='true'] {
		--input-color: var(--color-error);
	}
</style>
