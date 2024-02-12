/**
 * Step by step approach on solving the layout:
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
 * 12. Add the sub array to the main array
 * 13. Merge overlapping arrays
 */

export default function categorizeEvents(items: (EventProps | object)[]) {
	const groupedItems: (EventProps | object)[][] = []

	for (const item of items) {
		let addedToSubArray = false
		const subArray = groupedItems[groupedItems.length - 1]
		if (
			'start' in item &&
			subArray &&
			item.start < (subArray[0] as EventProps)?.end
		) {
			let index = subArray.length
			for (let j = 0; j < groupedItems.length; j++) {
				const currentItem = groupedItems[j][index] as EventProps
				if (!currentItem) continue
				if (item.start > currentItem.start && item.start < currentItem.end) {
					subArray.push({})
					index++
				}
			}
			item.index = index
			subArray.push(item)
			addedToSubArray = true
		}

		if (subArray?.length > 1)
			for (let i = 0; i < subArray?.length; i++) {
				if (subArray[i] && subArray[i + 1]) {
					const currentItem = subArray[i] as EventProps
					const nextItem = subArray[i + 1] as EventProps
					if (nextItem.start >= currentItem.end) {
						nextItem.index = currentItem.index
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

	const mergedDataset = mergeOverlappingArrays(groupedItems)

	console.log(groupedItems)

	return mergedDataset
}

function mergeOverlappingArrays(
	dataset: (EventProps | object)[][]
): (EventProps | object)[][] {
	if (dataset.length <= 1) {
		return dataset
	}

	const mergedDataset: (EventProps | object)[][] = [dataset[0]]

	for (let i = 1; i < dataset.length; i++) {
		const currentArray = dataset[i]
		const previousArray = mergedDataset[mergedDataset.length - 1]
		const currentStart = (currentArray[0] as EventProps).start
		const previousEnd = (previousArray[previousArray.length - 1] as EventProps)
			.end

		if (currentStart <= previousEnd) {
			const mergedArray = previousArray.concat(currentArray)
			mergedDataset[mergedDataset.length - 1] = mergedArray
		} else {
			mergedDataset.push(currentArray)
		}
	}

	return mergedDataset
}
