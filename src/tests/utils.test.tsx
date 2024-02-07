// testing the util functions from src/utils/*

import { expect, test } from 'vitest'
import { getHeight, getLeft, getTop, getWidth } from '../utils/getDimensions'
import generateHours from '../utils/generateHours'
import { convertTimeToOffset } from '../utils/convertTimeToOffset'
// import categorizeEvents from '../utils/categorizeEvents'

test('getDimensions', () => {
	const event = {
		start: 60,
		end: 120,
		title: 'some new event',
	}

	expect(getTop(event)).toBe('72px')
	expect(getHeight(event)).toBe('58px')
	expect(getLeft(170, 1, 1)).toBe(
		`max(170px / 1 * 1, var(--event-min-width) * 1)`
	)
	expect(getWidth(170, 1)).toBe('max(170px / 1, var(--event-min-width))')
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

const testCases = [
	{ time: '9:00 AM', offsetStart: 9, expected: 0 },
	{ time: '9:00 PM', offsetStart: 9, expected: 12 * 60 },
	{ time: '10:00 AM', offsetStart: 9, expected: 60 },
	{ time: '10:00 PM', offsetStart: 9, expected: 13 * 60 },
	{ time: '12:00 AM', offsetStart: 9, expected: 3 * 60 },
	{ time: '12:00 PM', offsetStart: 9, expected: 15 * 60 },
]

testCases.forEach((testCase) => {
	test(`convertTimeToOffset: ${testCase.time}`, () => {
		expect(convertTimeToOffset(testCase.time, testCase.offsetStart)).toBe(
			testCase.expected
		)
	})
})

// const events = [
// 	{ start: 0, end: 60, title: 'some new event' },
// 	{ start: 60, end: 120, title: 'some new event' },
// 	{ start: 80, end: 140, title: 'some new event' },
// 	{ start: 120, end: 180, title: 'some new event' },
// 	{ start: 190, end: 240, title: 'some new event' },
// ]

// const categorizedEvents = categorizeEvents(events, 9)

// test('categorizeEvents', () => {
// 	expect(categorizedEvents['9AM']).toHaveLength(1)
// 	expect(categorizedEvents['10AM']).toHaveLength(3)
// 	expect(categorizedEvents['12PM']).toHaveLength(1)
// })
