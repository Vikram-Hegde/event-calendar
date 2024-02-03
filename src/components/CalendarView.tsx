import { CSSProperties, Fragment, useState } from 'react'
import categorizeEvents from '../utils/categorizeEvents'
import generateHours from '../utils/generateHours'

const hours = generateHours(9, 12)

export default function CalendarView({ events }: { events: Event[] }) {
	const categorizedEvents = categorizeEvents(events)
	const maxEventsInAnHour = Math.max(
		...Object.values(categorizedEvents).map((events) => events.length)
	)

	const [maxColumns, setMaxColumns] = useState(maxEventsInAnHour)
	const gridColumnSpan = maxColumns % 2 === 1 ? 2 : 1

	console.log(maxEventsInAnHour)

	// console.log(categorizedEvents)

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
						gridTemplateColumns: `repeat(${maxColumns * gridColumnSpan}, 1fr)`,
					} as CSSProperties
				}
			></div>
		</section>
	)
}
