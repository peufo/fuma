import { Dayjs } from 'dayjs'

export type RangeDate = Date | Dayjs | null | undefined
export type Range = { start: RangeDate; end: RangeDate }
export type RangeRequired = {
	start: Date | Dayjs
	end: Date | Dayjs
}
