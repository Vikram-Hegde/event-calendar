import { memo, useEffect, useRef, useState } from 'react'
import categorizeEvents from '../utils/categorizeEvents'
import generateHours from '../utils/generateHours'
import CalendarEvent from './CalendarEvent'
import CalendarHour from './CalendarHour'

const hours = generateHours(9, 12)

export default memo(function CalendarView({
	events,
}: {
	events: EventProps[]
}) {
	const sortedEvents = events.sort((a, b) => a.start - b.start)
	const categorizedEvents = categorizeEvents(sortedEvents)
	const calendarEvents = useRef<HTMLDivElement>(null)
	const [calendarEventsWidth, setCalendarEventsWidth] = useState<number>(0)

	// console.log('i was rendered')

	useEffect(() => {
		if (
			calendarEvents.current &&
			calendarEvents.current.scrollWidth !== calendarEventsWidth
		)
			setCalendarEventsWidth(calendarEvents.current.scrollWidth)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [events])

	return (
		<section className="calendar | p-[1px] gap-[var(--gap)]">
			<div className="calendar__hours | text-gray-600">
				{hours.map(({ hour, timeOfTheDay }, index) => (
					<CalendarHour key={index} hour={hour} timeOfTheDay={timeOfTheDay} />
				))}
			</div>
			<div className="calendar__events | px-[10px] bg-gray-100 outline outline-gray-200 outline-1 rounded-md">
				<div
					className="calendar__events-wrapper | relative h-full overflow-y-auto outline-none"
					ref={calendarEvents}
				>
					{Object.keys(categorizedEvents).map((key) => {
						const event = categorizedEvents[key]

						return event.map((item, index) => (
							<CalendarEvent
								key={index}
								item={item}
								index={index}
								calendarEventsWidth={calendarEventsWidth}
								eventLength={event.length}
							/>
						))
					})}
				</div>
			</div>
		</section>
	)
})
