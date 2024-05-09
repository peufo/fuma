import { mdiAccountGroup, mdiFileLockOutline, mdiWeb } from '@mdi/js'
import type { OptionRecord } from '$lib/utils/options.js'

import type { PostPublication } from '@prisma/client'

export const POST_PUBLICATION = {
	private: { label: 'Private', icon: mdiFileLockOutline },
	friends: { label: 'Friends', icon: mdiAccountGroup },
	public: { label: 'Public', icon: mdiWeb }
} satisfies OptionRecord<PostPublication>
