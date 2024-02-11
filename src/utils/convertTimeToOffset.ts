/**
 * Convert time to offset from the start in minutes
 * @param time - time in 12 hour format
 * @param offsetStart - start time in 12 hour format
 * @returns startHour & offset from the start time in minutes
 */
export function convertTimeToOffset(time: string, offsetStart: number = 9) {
	const [hour, minute] = time.split(':').map((time) => parseInt(time))
	const isPM = time.includes('PM')

	let offset = hour - offsetStart
	if (isPM && hour < 12) {
		offset = offset + 12
	}
	offset = offset * 60 + minute
	return [hour, offset]
}
