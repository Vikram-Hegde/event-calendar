import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from '../App'

describe('AppComponent tests', () => {
	it('should render the modal component', () => {
		const { container } = render(<App />)
		fireEvent.click(screen.getByText('New event'))
		expect(container.querySelector('.modal')).toBeInTheDocument()
	})

	it('should close the modal component', () => {
		const { container } = render(<App />)
		fireEvent.click(screen.getByText('New event'))
		fireEvent.click(screen.getByText('Cancel'))
		expect(container.querySelector('.modal')).not.toBeInTheDocument()

		fireEvent.click(screen.getByText('New event'))
		fireEvent.click(
			container.querySelector('div[data-backdrop="true"]') as HTMLDivElement
		)
		expect(container.querySelector('.modal')).not.toBeInTheDocument()
	})

	vi.mock('../assets/events', () => {
		return {
			events: [
				{ start: 0, end: 60, title: 'some new event' },
				{ start: 60, end: 120, title: 'some new event 1' },
				{ start: 80, end: 140, title: 'some new event 2' },
				{ start: 120, end: 180, title: 'some new event 3' },
				{ start: 190, end: 240, title: 'some new event 4' },
			],
		}
	})

	it('should render the events', () => {
		render(<App />)
		expect(screen.getByText('some new event')).toBeInTheDocument()
		expect(screen.getByText('some new event 4')).toBeInTheDocument()
	})
})
