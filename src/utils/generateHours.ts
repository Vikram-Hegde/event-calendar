/**
 * Accepts two arguments
 * @param start - start time in 12 hour format
 * @param noOfHours - number of hours to generate
 */
export default function generateHours(start: number, noOfHours: number) {
	const hours = Array.from({ length: noOfHours + 1 }, (_, i) => {
		const hour = (i + start) % 12
		return {
			hour: hour === 0 ? 12 : hour,
			timeOfTheDay: i + start < 12 ? 'AM' : 'PM',
		}
	})
	return hours
}
