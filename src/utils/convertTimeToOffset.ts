export function convertTimeToOffset(time: string, offsetStart: number) {
	const [hour, minute] = time.split(':').map((time) => parseInt(time))
	const isPM = time.includes('PM')
	const offset = (hour - offsetStart) * 60 + minute
	if (isPM) {
		return offset + 12 * 60
	}
	return offset
}
