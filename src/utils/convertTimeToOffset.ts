/**
 * Convert time to offset from the start time
 * @param time - time in 12 hour format
 * @param offsetStart - start time in 12 hour format
 * @returns offset from the start time in minutes
 */
export function convertTimeToOffset(time: string, offsetStart: number = 9) {
	const [hour, minute] = time.split(':').map((time) => parseInt(time))
	const isPM = time.includes('PM')
	const offset = (hour - offsetStart) * 60 + minute
	if (isPM) {
		return offset + 12 * 60
	}
	return offset
}
