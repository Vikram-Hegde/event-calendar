export default function CalendarHour({
	hour,
	timeOfTheDay,
}: {
	hour: number
	timeOfTheDay: string
}) {
	return (
		<>
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
		</>
	)
}
