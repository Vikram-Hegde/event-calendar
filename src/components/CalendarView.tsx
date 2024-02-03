import generateHours from '../utils/generateHours'

const hours = generateHours(9, 12)

export default function CalendarView({ events }) {
	return (
		<section className="calendar">
			<div className="calendar__hours | text-gray-600">
				{hours.map(({ hour, timeOfTheDay }, index) => (
					<>
						<div key={index} className="calendar__hour">
							<div className="calendar__hour-label | font-semibold text-lg">
								{hour}:00{' '}
								<span className="text-gray-400 text-sm">{timeOfTheDay}</span>
							</div>
						</div>
						<div key={index} className="calendar__hour">
							<div className="calendar__hour-label | text-sm">{hour}:30</div>
						</div>
					</>
				))}
			</div>
		</section>
	)
}
