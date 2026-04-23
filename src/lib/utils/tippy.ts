import 'tippy.js/dist/tippy.css'
import tippyBadTyped, {
	animateFill,
	createSingleton,
	delegate,
	followCursor,
	hideAll,
	inlinePositioning,
	roundArrow,
	sticky,
	type Tippy,
	type Instance as TippyInstance,
	type Props as TippyProps
} from 'tippy.js'

export const tippy = tippyBadTyped as unknown as Tippy
export type { TippyProps, TippyInstance }
export {
	hideAll,
	delegate,
	createSingleton,
	animateFill,
	followCursor,
	inlinePositioning,
	sticky,
	roundArrow
}
