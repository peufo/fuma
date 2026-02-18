import type { HTMLInputAttributes } from 'svelte/elements';

export type InputProps = Omit<
	HTMLInputAttributes,
	'name' | 'value' | 'aria-invalid'
>;
