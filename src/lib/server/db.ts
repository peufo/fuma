import { faker } from '@faker-js/faker/locale/fr_CH';
import type { User } from '../../routes/ui/remote/db.ts';
import { cuid } from './cuid.ts';

function createRandomUser(): User {
	return {
		id: cuid(),
		name: faker.person.fullName(),
		age: Math.round(Math.random() * 100),
		level: Math.round(Math.random() * 100),
		cv: faker.person.bio(),
		isValided: Math.random() < 0.5,
		subscribeAt: faker.date.past().toISOString(),
		gender: faker.person.sexType() as User['gender'],
		gender2: faker.person.sexType() as User['gender']
	};
}

export const users = faker.helpers.multiple(createRandomUser, {
	count: 40
});
