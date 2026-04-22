import { type TippyInstance, type TippyProps, tippy } from '$lib/utils/tippy.js';

type TipOptions = Partial<TippyProps> & { disable?: boolean };

export function tip(node: HTMLElement, options: TipOptions = { disable: false }) {
	let _tip: TippyInstance | null = null;
	init(options);
	function init({ disable, content, ...tippyProps }: TipOptions) {
		_tip = disable || !content ? null : tippy(node, { ...tippyProps, content });
	}

	return {
		destroy() {
			_tip?.destroy();
		},
		update(newOptions: TipOptions) {
			_tip?.destroy();
			init(newOptions);
		}
	};
}
