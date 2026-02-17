import z from 'zod';
import { form, query } from '$app/server';
import { userSchema, users } from './db.ts';

export const getUser = query(z.object({ age: z.number() }), async ({ age }) => {
	return {
		name: 'Jonas',
		age,
	};
});

export const createUser = form(userSchema, async (data) => {
	users.push(data);
	return data;
});
