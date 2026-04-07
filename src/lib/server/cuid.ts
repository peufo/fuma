import { randomBytes } from 'node:crypto';

export function cuid() {
	return randomBytes(16).toString('hex');
}
