/**
 * Based on the start time of the event, it categorizes the events into different time slots
 * For example, if an event starts at 9:30 AM to 10:30 AM, it will be categorized under 9AM
 * But if the event starts at a time that is in between the previous slot, then it will be added to previous slot
 * Example: If an event starts at 9:45 AM and ends at 10:45 AM, it will be added to 9AM slot
 * 					since 10:15 is in between 9:45 and 10:45, it will be added to 9AM slot
 * @param events - Array of events
 * @param beginWith - The time to start with, default is 9
 * @returns Object with keys as time of the day and values as events that occur at that time
 */
export default function categorizeEvents(
	events: EventProps[],
	beginWith?: number
) {
	return events.reduce<CategorizedEventsProps>((acc, event) => {
		const startHour = (beginWith ?? 9) + Math.floor(event.start / 60)
		const startIn12HourFormat = startHour % 12 ? startHour % 12 : 12
		const timeOfTheDay = startHour < 12 ? 'AM' : 'PM'
		const prevHourKey = Object.keys(acc)[Object.keys(acc).length - 1]
		const currentHourKey = `${startIn12HourFormat}${timeOfTheDay}`

		if (acc[prevHourKey]) {
			const shouldAddToPrevHour = acc[prevHourKey]?.some((e) => {
				return event.start > e.start && event.start < e.end
			})

			if (shouldAddToPrevHour) {
				acc[prevHourKey].push(event)
				return acc
			}
		}

		if (acc[currentHourKey]) {
			acc[currentHourKey].push(event)
		} else {
			acc[currentHourKey] = [event]
		}

		return acc
	}, {})
}
