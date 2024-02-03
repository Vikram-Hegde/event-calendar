import generateHours from '../utils/generateHours'

const hours = generateHours(9, 12)

export default function CalendarView({ events }) {
	return (
		<section className="calendar">
			<div className="calendar__hours">
				{hours.map(({ hour, timeOfTheDay }, index) => (
					<>
						<div key={index} className="calendar__hour">
							<div className="calendar__hour-label | font-bold text-lg text-gray-600">
								{hour}:00{' '}
								<span className="font-extralight text-sm">{timeOfTheDay}</span>
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
