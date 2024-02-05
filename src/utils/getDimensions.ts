export const getTop = (item: EventProp) => {
	return `${29 * (item.start / 60) * 2 + 14}px`
}

export const getHeight = (item: EventProp) => {
	return `${item.end - item.start}px`
}

export const getWidth = (calendarEventsWidth: number, eventLength: number) => {
	return `max(calc(${calendarEventsWidth}px / ${eventLength}), 170px)`
}

export const getLeft = (
	calendarEventsWidth: number,
	eventLength: number,
	index: number
) => {
	return calendarEventsWidth / eventLength > 170
		? `calc(${calendarEventsWidth}px / ${eventLength} * ${index})`
		: `calc(170px * ${index})`
}
