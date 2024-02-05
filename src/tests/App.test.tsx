import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
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
})
