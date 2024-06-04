export function msToTime(ms: number | null | undefined): string {
	if (ms === null || ms === undefined) return ''
	const hours = Math.floor(ms / (1000 * 60 * 60))
	const minutes = Math.floor(ms / (1000 * 60) - hours * 60)
	const secondes = Math.floor(ms / 1000 - minutes * 60 - hours * 60 * 60)
	const format = (n: number) => n.toString().padStart(2, '0')
	return [format(hours % 24), format(minutes), format(secondes)].join(':')
}

export function timeToMs(time: string): number {
	const [h = 0, m = 0, s = 0] = time.split(':').map((s) => +s)
	return (h * 60 * 60 + m * 60 + s) * 1000
}
