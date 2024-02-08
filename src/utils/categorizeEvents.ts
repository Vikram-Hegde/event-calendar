/**
 * Step by step approach:
 * 1. One main array to hold array of events
 * 2. Loop through the events array
 * 3. Create a sub array to hold events that are overlapping
 * 4. To check if an event is overlapping, first check if the sub array is empty
 * 5. If it is, add the event to the sub array
 * 6. If it is not, check if the start time of event is less than the end time of first event in sub array
 * 7. If it is, add the event to the sub array
 * 8. If it is not, add the sub array to the main array and create a new sub array with the current event
 * 9. While adding the event to second or subsequent indexes, check the equivalent index in the main array to see if the event is overlapping
 * 10. If it is, add an empty object to the sub array
 * 11. If it is not, add the event to the sub array
 * 12. Finally, add the sub array to the main array
 */

export default function categorizeEvents(items: (EventProps | object)[]) {
	const groupedItems: (EventProps | object)[][] = []

	for (const item of items) {
		let addedToSubArray = false

		if ('start' in item) {
			for (let i = 0; i < groupedItems.length; i++) {
				const subArray = groupedItems[i]
				if (item.start < (subArray[0] as EventProps)?.end) {
					let index = subArray.length
					for (let j = 0; j < index; j++) {
						for (const i in groupedItems) {
							const currentItem = groupedItems[i][index] as EventProps
							if (
								item.start > currentItem?.start &&
								item.start < currentItem?.end
							) {
								subArray.push({})
								index++
							}
						}
					}
					item.index = index
					subArray.push(item)
					addedToSubArray = true
					break
				}
			}
		}

		if (!addedToSubArray) {
			const newSubArray = []
			if ('start' in item) {
				item.index = 0
			}
			newSubArray.push(item)
			groupedItems.push(newSubArray)
		}
	}

	function mergeOverlappingArrays(
		dataset: (EventProps | object)[][]
	): (EventProps | object)[][] {
		const mergedDataset = [dataset[0]]

		for (let i = 1; i < dataset.length; i++) {
			const currentArray = dataset[i]
			const previousArray = mergedDataset[mergedDataset.length - 1]

			if (
				(previousArray[previousArray.length - 1] as EventProps).end &&
				(currentArray[0] as EventProps).start <=
					(previousArray[previousArray.length - 1] as EventProps).end
			) {
				const mergedArray = previousArray.concat(currentArray)
				if ('end' in mergedArray[mergedArray.length - 1]) {
					;(mergedArray[mergedArray.length - 1] as EventProps).end = Math.max(
						(previousArray[previousArray.length - 1] as EventProps)?.end,
						(currentArray[currentArray.length - 1] as EventProps)?.end
					)
				}
				mergedDataset[mergedDataset.length - 1] = mergedArray
			} else {
				mergedDataset.push(currentArray)
			}
		}

		return mergedDataset
	}

	console.log(groupedItems)
	const mergedDataset = mergeOverlappingArrays(groupedItems)
	console.log(mergedDataset)

	return mergedDataset
}
