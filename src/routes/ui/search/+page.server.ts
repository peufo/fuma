import { users } from '$lib/server/db.ts';

export const load = () => {
	return {
		users
	};
};
