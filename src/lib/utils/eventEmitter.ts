export function createEventEmitter<EventMap extends Record<string, any>>(initialEvents: {
	[K in keyof EventMap]: Callback<EventMap[K]>[]
}) {
	const events = { ...initialEvents }

	return {
		on<K extends keyof EventMap>(eventKey: K, callback: Callback<EventMap[K]>) {
			events[eventKey].push(callback)
		},
		off<K extends keyof EventMap>(eventKey: K, callback: Callback<EventMap[K]>) {
			const index = events[eventKey].indexOf(callback)
			events[eventKey].splice(index, 1)
		},
		emit<K extends keyof EventMap>(...args: EventEmitterArgs<EventMap, K>) {
			// @ts-ignore
			events[args[0]].forEach((callback) => callback(args[1]))
		}
	}
}

type Callback<Arg> = (arg: Arg) => unknown

type EventEmitterArgs<
	EventMap extends Record<string, any>,
	K extends keyof EventMap
> = undefined extends EventMap[K]
	? [type: K, parameter?: EventMap[K]]
	: [type: K, parameter: EventMap[K]]
