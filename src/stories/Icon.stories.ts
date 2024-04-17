import type { Meta, StoryObj } from '@storybook/svelte'
import { Icon } from '$lib/index.js'
import { mdiUsb } from '@mdi/js'

const meta = {
	title: 'Icon',
	component: Icon,
	argTypes: {}
} satisfies Meta<Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		path: mdiUsb,
		title: 'My title'
	}
}
