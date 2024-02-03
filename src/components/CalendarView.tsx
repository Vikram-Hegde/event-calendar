import { CSSProperties, Fragment } from 'react'
import categorizeEvents from '../utils/categorizeEvents'
import generateHours from '../utils/generateHours'

const hours = generateHours(9, 12)

export default function CalendarView({ events }: { events: Event[] }) {
	const categorizedEvents = categorizeEvents(events)
	const maxEventsInAnHour = Math.max(
		...Object.values(categorizedEvents).map((events) => events.length)
	)
	const gridColumnSpan = maxEventsInAnHour % 2 === 1 ? 2 : 1

	return (
		<section className="calendar">
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
							<div className="calendar__hour-label | text-sm">{hour}:30</div>
						</div>
					</Fragment>
				))}
			</div>
			<div
				className="calendar__events"
				style={
					{
						gridTemplateColumns: `repeat(${
							maxEventsInAnHour * gridColumnSpan
						}, 1fr)`,
					} as CSSProperties
				}
			>
				{Object.keys(categorizedEvents).map((key) => {
					const event = categorizedEvents[key]
					return event.map((e) => {
						const gridColumn =
							event.length === 1
								? `span ${maxEventsInAnHour * gridColumnSpan}`
								: `span ${(maxEventsInAnHour / event.length) * gridColumnSpan}`
						return (
							<div
								key={e.title + e.start}
								className="calendar__event"
								style={
									{
										gridRow: `${e.start + 10} / span ${e.end - e.start + 5}`,
										backgroundColor: `${
											Math.random() * 5 < 2.5 ? 'green' : 'blue'
										}`,
										gridColumn: `${gridColumn}`,
									} as React.CSSProperties
								}
							>
								<div className="calendar__event-title">{e.title}</div>
							</div>
						)
					})
				})}
			</div>
		</section>
	)
}
