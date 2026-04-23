export function createEventEmitter<EventMap extends Record<string, unknown>>() {
	type Events = {
		[K in keyof EventMap]: Callback<EventMap[K]>[];
	};
	const events: Partial<Events> = {};

	return {
		on<K extends keyof EventMap>(eventKey: K, callback: Callback<EventMap[K]>) {
			if (!events[eventKey]) events[eventKey] = [];
			events[eventKey]?.push(callback);
			return function unsubscribe() {
				if (!events[eventKey]) events[eventKey] = [];
				const index = events[eventKey]?.indexOf(callback);
				if (index !== undefined && index > -1) events[eventKey]?.splice(index, 1);
			};
		},
		once<K extends keyof EventMap>(eventKey: K, callback: Callback<EventMap[K]>) {
			if (!events[eventKey]) events[eventKey] = [];
			const _callback = (arg: EventMap[K]) => {
				callback(arg);
				const index = events[eventKey]?.indexOf(callback);
				if (index !== undefined && index > -1) events[eventKey]?.splice(index, 1);
			};
			events[eventKey]?.push(_callback);
			return function unsubscribe() {
				if (!events[eventKey]) events[eventKey] = [];
				const index = events[eventKey]?.indexOf(callback);
				if (index !== undefined && index > -1) events[eventKey]?.splice(index, 1);
			};
		},
		off<K extends keyof EventMap>(eventKey: K, callback: Callback<EventMap[K]>) {
			if (!events[eventKey]) events[eventKey] = [];
			const index = events[eventKey]?.indexOf(callback);
			if (index !== undefined && index > -1) events[eventKey]?.splice(index, 1);
		},
		clean<K extends keyof EventMap>(eventKey: K) {
			events[eventKey] = [];
		},
		emit<K extends keyof EventMap>(...args: EventEmitterArgs<EventMap, K>) {
			if (!events[args[0]]) events[args[0]] = [];
			const param = args[1];
			events[args[0]]?.forEach((callback) => {
				callback(param as EventMap[K]);
			});
		}
	};
}

type Callback<Arg> = (arg: Arg) => unknown;

type EventEmitterArgs<
	EventMap extends Record<string, unknown>,
	K extends keyof EventMap
> = undefined extends EventMap[K]
	? [type: K, parameter?: EventMap[K]]
	: [type: K, parameter: EventMap[K]];
