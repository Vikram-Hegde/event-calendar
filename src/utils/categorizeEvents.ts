export default function categorizeEvents(items: EventProps[]) {
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
	// Step 1: Initialize main array to hold arrays of events
	const groupedItems: (EventProps | object)[][] = []

	// Step 2: Loop through the events array
	for (const item of items) {
		let addedToSubArray = false

		// Step 3: Create a sub array to hold events that are overlapping
		for (let i = 0; i < groupedItems.length; i++) {
			const subArray = groupedItems[i]
			// const lastIndex = subArray.length - 1

			// Step 4: Check if the sub array is empty
			if (subArray.length === 0) {
				subArray.push(item)
				addedToSubArray = true
				break
			}

			// Step 6: Check if the start time of event is less than the end time of first event in sub array
			// if (item.start <= subArray[0]?.end) {
			// Step 10: Check if the event is overlapping with an event in the same index of the main array
			// if (i > 0 && item.start <= groupedItems[i - 1][lastIndex]?.end) {
			// Step 12: If overlapping, add an empty object to the sub array
			// subArray.push({})
			// } else {
			// Step 7: Add the event to the sub array
			// subArray.push(item)
			// }
			// addedToSubArray = true
			// break
			// }

			if (item.start < subArray[0]?.end) {
				subArray.push(item)
				addedToSubArray = true
				break
			}
		}

		// Step 8: If not added to any existing sub array, create a new sub array
		if (!addedToSubArray) {
			const newSubArray = []
			// Step 11: Add the event to the new sub array
			newSubArray.push(item)
			// Step 12: Add the new sub array to the main array
			groupedItems.push(newSubArray)
		}
	}

	return groupedItems
}
