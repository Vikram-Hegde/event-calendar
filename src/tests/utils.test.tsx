import { expect, test } from 'vitest'
import { getHeight, getLeft, getTop, getWidth } from '../utils/getDimensions'
import generateHours from '../utils/generateHours'
import { convertTimeToOffset } from '../utils/convertTimeToOffset'
import categorizeEvents from '../utils/categorizeEvents'
import { events } from '../assets/events'

test('getDimensions', () => {
	const event = {
		start: 60,
		end: 120,
		title: 'some new event',
		index: 0,
	}

	expect(getTop(event)).toBe('72px')
	expect(getHeight(event)).toBe('58px')
	expect(getLeft(170, 1, 1)).toBe(`calc(170px / 1 * 1)`)
	expect(getWidth(170, 1)).toBe('calc(170px / 1)')
})

test('generateHours', () => {
	const hours = generateHours(0, 24)
	expect(hours).toHaveLength(25)
	expect(hours[0].hour).toBe(12)
	expect(hours[0].timeOfTheDay).toBe('AM')
	expect(hours[12].hour).toBe(12)
	expect(hours[12].timeOfTheDay).toBe('PM')
	expect(hours[24].hour).toBe(12)
	expect(hours[24].timeOfTheDay).toBe('PM')
})

const timeToOffset = [
	{ time: '9:00 AM', offset: [9, 0] },
	{ time: '9:30 AM', offset: [9, 30] },
	{ time: '10:30 AM', offset: [10, 90] },
	{ time: '12:00 PM', offset: [12, 180] },
	{ time: '12:30 PM', offset: [12, 210] },
	{ time: '5:00 PM', offset: [5, 480] },
	{ time: '9:00 PM', offset: [9, 720] },
]

test('convertTimeToOffset', () => {
	timeToOffset.forEach(({ time, offset }) => {
		expect(convertTimeToOffset(time)).toEqual(offset)
	})
})

const categorizedEvents = categorizeEvents(events)

test('categorizeEvents', () => {
	expect(categorizedEvents[0]).toHaveLength(4)
	expect(categorizedEvents[1]).toHaveLength(2)
	expect(categorizedEvents[2]).toHaveLength(1)
	expect(categorizedEvents[3]).toHaveLength(9)
	expect(categorizedEvents[4]).toHaveLength(3)
})
