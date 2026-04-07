import z from 'zod';
import { form, query } from '$app/server';
import { cuid } from '$lib/server/cuid.ts';
import { users } from '$lib/server/db.ts';
import { schemaUser } from './db.ts';

export const getUser = query(z.object({ age: z.number() }), async ({ age }) => {
	return {
		name: 'Jonas',
		age
	};
});

export const searchUsers = query(z.object({ search: z.string() }), ({ search }) => {
	const reg = new RegExp(search, 'ig');
	return users.filter((user) => user.name.match(reg) || user.cv.match(reg));
});

export const formCreateUser = form(schemaUser, async (data) => {
	users.push({
		id: cuid(),
		...data
	});
	return data;
});
