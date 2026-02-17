import { users } from './db.ts';

export const load = async () => {
	return {
		users
	};
};
