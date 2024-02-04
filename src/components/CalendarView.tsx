import { CSSProperties, Fragment } from 'react'
import categorizeEvents from '../utils/categorizeEvents'
import generateHours from '../utils/generateHours'

const hours = generateHours(9, 12)

export default function CalendarView({ events }: { events: EventProp[] }) {
	const categorizedEvents = categorizeEvents(events)

	const maxEventsInAnHour = Math.max(
		...Object.values(categorizedEvents).map((events) => events.length)
	)
	const gridColumnSpan = maxEventsInAnHour % 2 === 1 ? 2 : 1

	console.log(maxEventsInAnHour)

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
			<div
				className="calendar__events | bg-gray-100 outline outline-gray-200 outline-1 rounded-md"
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
								className="calendar__event | grid gap-1.5 content-start bg-white outline outline-1 outline-gray-200 p-1.5 border-l-2 border-blue-950 rounded-e"
								style={
									{
										gridRow: `${e.start + 20} / span ${e.end - e.start + 5}`,
										gridColumn: `${gridColumn}`,
									} as React.CSSProperties
								}
							>
								<div className="calendar__event-title | leading-[1cap] text-sm">
									{e.title}
								</div>
								<div className="calendar__event-subtitle | text-xs text-gray-400">
									Sample location
								</div>
							</div>
						)
					})
				})}
			</div>
		</section>
	)
}
