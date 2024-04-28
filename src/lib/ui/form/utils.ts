import type { ComponentProps } from 'svelte'
import type { InputRelation, InputRelations } from '../input/index.js'

export function relationProps<Item extends { id: string }>(
	props: ComponentProps<InstanceType<typeof InputRelation<Item>>>
) {
	return props
}
export function relationsProps<Item extends { id: string }>(
	props: ComponentProps<InstanceType<typeof InputRelations<Item>>>
) {
	return props
}
