/**
 * Let's break down the logic for calculating the dimensions of the event items.
 * The numbers here are based on the design of the calendar.
 * 29 pixels is the height of half an hour.
 * item.start / 60 would give us the number of hours.
 * We multiply it by 2 because we'll get for an hour
 * We add 14 pixels to position the event half way through the hour.
 * @param item - EventItem
 * @returns Calculated top position for the event
 */
export const getTop = (item: EventProps) => {
	return `${29 * (item.start / 60) * 2 + 14}px`
}

/**
 * @param item - EventItem
 * @returns Height of the event item
 */
export const getHeight = (item: EventProps) => {
	return `${item.end - item.start}px`
}

/**
 * This function is used to calculate the width of the event items.
 * We need to distribute the width of the event items based on the number of events in that row.
 * If the width of the event items is less than var(--event-min-width), we set the width to that css variable instead.
 * var(--event-min-width) can be found in @file src/styles/variables.css
 * @param calendarEventsWidth - Width of the calendar events container
 * @param eventLength - Number of events in that row
 * @returns Distributes the width of the event items based on the number of events in that row
 */
export const getWidth = (calendarEventsWidth: number, eventLength: number) => {
	return `max(calc(${calendarEventsWidth}px / ${eventLength}), var(--event-min-width))`
}

/**
 * Calculates the left position of the event items based on its index.
 * If the width of the event items is less than var(--event-min-width), then left position will be offset by var(--event-min-width).
 * var(--event-min-width) can be found in @file src/styles/variables.css
 * @param calendarEventsWidth - Width of the calendar events container
 * @param eventLength - Number of events in that row
 * @param index - Index of the event item
 * @returns Determines the left position of the event items based on its index
 */
export const getLeft = (
	calendarEventsWidth: number,
	eventLength: number,
	index: number
) => {
	return `max(${calendarEventsWidth}px / ${eventLength} * ${index}, var(--event-min-width) * ${index})`
}
