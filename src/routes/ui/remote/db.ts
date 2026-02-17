import z from 'zod';
import type { ShapeOf } from '$lib/index.ts';

export type UserGender = (typeof userGenders)[number];
export type UserTag = (typeof userTags)[number];
export type User = {
	name: string;
	age: number;
	isValided: boolean;
	birth: Date | string;
	gender: UserGender;
	tags: UserTag[];
};

export const userGenders = ['male', 'female', 'other'] as const;
export const userTags = ['rider', 'biker', 'skater'] as const;

export const users: User[] = [];

export const userSchema = z.object({
	name: z.string().min(3),
	age: z.number().min(18).max(120),
	isValided: z.boolean().catch(false),
	birth: z.iso.date(),
	gender: z.enum(userGenders),
	tags: z.array(z.enum(userTags)).default([]),
} satisfies ShapeOf<User>);
