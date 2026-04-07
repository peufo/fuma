import {
	AppleIcon,
	BananaIcon,
	BikeIcon,
	CableCarIcon,
	CherryIcon,
	CitrusIcon,
	GrapeIcon,
	MarsIcon,
	MotorbikeIcon,
	VenusAndMarsIcon,
	VenusIcon
} from '@lucide/svelte';
import z from 'zod';
import type { OptionRecord, Options, ShapeOf } from '$lib/index.ts';

export type UserGender = (typeof userGenders)[number];
export type UserTag = (typeof userTags)[number];
export type User = {
	id: string;
	name: string;
	age: number;
	level: number;
	cv: string;
	isValided: boolean;
	subscribeAt: string;
	gender: UserGender;
	gender2: UserGender;
	loveId?: string | null;
	// tags: UserTag[];
};

export const userGenders = ['male', 'female', 'other'] as const;
export const userTags = ['rider', 'biker', 'skier'] as const;

export const schemaUser = z.object({
	name: z.string().min(3),
	age: z.number().min(18).max(120),
	level: z.number().min(0).max(100),
	cv: z.string(),
	isValided: z.literal(true, 'Validation requise'),
	subscribeAt: z.iso.date(),
	gender: z.enum(userGenders),
	gender2: z.enum(userGenders),
	loveId: z.string().optional()
	// tags: z.array(z.enum(userTags)).default([]),
} satisfies ShapeOf<Omit<User, 'id'>>);

export const userGenderOptions = {
	male: { label: 'Homme', icon: MarsIcon },
	female: { label: 'Femme', icon: VenusIcon },
	other: { label: 'Autre', icon: VenusAndMarsIcon }
} satisfies OptionRecord<UserGender>;

export const userTagOptions = {
	biker: { label: 'Biker', icon: BikeIcon },
	rider: { label: 'Rider', icon: MotorbikeIcon },
	skier: { label: 'Skier', icon: CableCarIcon }
} satisfies OptionRecord<UserTag>;

export const fruitsOptions = {
	apple: { label: 'Apple', icon: AppleIcon },
	banana: { label: 'Banana', icon: BananaIcon },
	cherry: { label: 'Cherry', icon: CherryIcon },
	citrus: { label: 'Citrus', icon: CitrusIcon },
	grape: { label: 'Grape', icon: GrapeIcon }
} satisfies Options;
