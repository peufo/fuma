import dayjs from 'dayjs'

const formater = new Intl.DateTimeFormat('fr-ch', {
	weekday: 'long',
	day: 'numeric',
	month: 'numeric',
	year: '2-digit',
	hour: 'numeric',
	minute: 'numeric',
	timeZone: 'Europe/Zurich'
})

const formaterShort = new Intl.DateTimeFormat('fr-ch', {
	weekday: 'short',
	hour: 'numeric',
	minute: 'numeric',
	timeZone: 'Europe/Zurich'
})

type Range = { start?: Date | number | null; end?: Date | number | null }
type RequiredRange = { start: Date | number; end: Date | number }

function isRequiredRange(range: Range): range is RequiredRange {
	return (
		range.start !== null &&
		range.start !== undefined &&
		range.end !== null &&
		range.end !== undefined
	)
}

export const formatRange = (range: Range) => {
	if (!isRequiredRange(range)) return ''
	return formater.formatRange(range.start, range.end)
}

export const formatRangeShort = (range: Range) => {
	if (!isRequiredRange(range)) return ''
	formaterShort.formatRange(range.start, range.end)
}

export const formatRangeHour = (range: Range) => {
	if (!isRequiredRange(range)) return ''
	const _start = dayjs(range.start)
	const _end = dayjs(range.end)
	if (_start.isSame(_end)) return _start.format('HH:mm')
	return [_start.format('HH:mm'), _end.format('HH:mm')].join(' – ')
}
