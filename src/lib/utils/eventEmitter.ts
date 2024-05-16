type Callback<Arg> = (arg: Arg) => unknown

export function createEventEmitter<Events extends Record<string, unknown>>(initialEvents: {
	[K in keyof Events]: Callback<Events[K]>[]
}) {
	const events = { ...initialEvents }

	return {
		on<K extends keyof Events>(eventKey: K, callback: Callback<Events[K]>) {
			events[eventKey].push(callback)
		},
		off<K extends keyof Events>(eventKey: K, callback: Callback<Events[K]>) {
			const index = events[eventKey].indexOf(callback)
			events[eventKey].splice(index, 1)
		},
		emit<K extends keyof Events>(eventKey: K, arg: Parameters<Callback<Events[K]>>[0]) {
			events[eventKey].forEach((callback) => callback(arg))
		},
	}
}
