import { CSSProperties, Fragment, useEffect, useRef, useState } from 'react'
import categorizeEvents from '../utils/categorizeEvents'
import generateHours from '../utils/generateHours'

const hours = generateHours(9, 12)

export default function CalendarView({ events }: { events: EventProp[] }) {
	const categorizedEvents = categorizeEvents(events)
	const calendarEvents = useRef<HTMLDivElement>(null)
	const [calendarEventsWidth, setCalendarEventsWidth] = useState<number>(0)

	useEffect(() => {
		if (
			calendarEvents.current &&
			calendarEvents.current.scrollWidth !== calendarEventsWidth
		)
			setCalendarEventsWidth(calendarEvents.current.scrollWidth)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [events])

	console.log(calendarEventsWidth)

	return (
		<section className="calendar | p-[1px] gap-[var(--gap)]">
			<div className="calendar__hours | text-gray-600">
				{hours.map(({ hour, timeOfTheDay }, index) => (
					<Fragment key={index}>
						<div className="calendar__hour">
							<div className="calendar__hour-label | font-semibold text-lg">
								{hour}:00{' '}
								<span className="text-gray-400 text-sm">{timeOfTheDay}</span>
							</div>
						</div>
						<div className="calendar__hour">
							<div className="calendar__hour-label | text-sm text-gray-500">
								{hour}:30
							</div>
						</div>
					</Fragment>
				))}
			</div>
			<div className="calendar__events | px-[10px] bg-gray-100 outline outline-gray-200 outline-1 rounded-md">
				<div
					className="calendar__events-wrapper | relative h-full overflow-y-auto"
					ref={calendarEvents}
				>
					{Object.keys(categorizedEvents).map((key) => {
						const event = categorizedEvents[key]
						return event.map((e, i) => {
							return (
								<div
									key={e.title + e.start + Math.random() * 100}
									className="calendar__event | absolute overflow-hidden grid gap-1.5 content-start bg-white p-1.5 border border-solid border-gray-200 border-l-2 border-l-blue-950 rounded-e"
									style={
										{
											top: `${29 * (e.start / 60) * 2 + 14}px`,
											height: `${e.end - e.start}px`,
											width: `max(calc(${calendarEventsWidth}px / ${event.length}), 170px)`,
											left:
												calendarEventsWidth / event.length > 170
													? `calc(${calendarEventsWidth}px / ${event.length} * ${i})`
													: `calc(170px * ${i}`,
											// width: `calc(${calendarEventsWidth}px / ${event.length})`,
											// left: `calc(${calendarEventsWidth}px / ${event.length} * ${i} + 10px)`,
										} as CSSProperties
									}
								>
									<div className="calendar__event-title | leading-[1cap] text-sm">
										{e.title}
									</div>
									{e.end - e.start > 45 && (
										<div className="calendar__event-subtitle | text-xs text-gray-400">
											Sample location
										</div>
									)}
								</div>
							)
						})
					})}
				</div>
			</div>
		</section>
	)
}
