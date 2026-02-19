import type { IconProps } from '@lucide/svelte';
import type { Component } from 'svelte';
import z from 'zod';
import { zodCoerceJsonValue } from '$lib/validation/zod.ts';

export type Option = {
	value: string;
	label: string;
	icon?: Component<IconProps>;
	disable?: boolean;
};
export type OptionRecord<Values extends string> = Record<
	Values,
	Omit<Option, 'value'>
>;
export type Options =
	| string
	| readonly string[]
	| readonly Option[]
	| Record<string, string>
	| OptionRecord<string>;

export function parseOptions(options: Options): Option[] {
	if (typeof options === 'string') {
		options = zodCoerceJsonValue
			.pipe(z.array(z.string()))
			.default([])
			.parse(options);
	}
	if (Array.isArray(options)) {
		return options.filter(Boolean).map((opt) => {
			if (typeof opt === 'string') return { value: opt, label: opt };
			return opt;
		});
	}
	return Object.entries(options)
		.filter(([value]) => !!value)
		.map(([value, opt]) => {
			if (typeof opt === 'string') return { value, label: opt };
			return { value, ...opt };
		});
}
