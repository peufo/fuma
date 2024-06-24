import dayjs, { type ConfigType } from 'dayjs'


export type RangeDate = ConfigType
export type Range = { start: RangeDate; end: RangeDate }
export type RangeRequired = {
	start: string | number | Date | dayjs.Dayjs
	end: string | number | Date | dayjs.Dayjs
}
