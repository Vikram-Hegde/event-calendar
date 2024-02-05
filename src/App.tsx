import { useEffect, useState } from 'react'
import './App.css'
import { events } from './assets/events'
import AddIcon from './assets/icons/AddIcon'
import Logo from './assets/icons/logo.svg'
import Button from './components/Button'
import CalendarView from './components/CalendarView'
import EventForm from './components/EventForm'
import { convertTimeToOffset } from './utils/convertTimeToOffset'

function App() {
	const [eventsList, setEventsList] = useState(events as EventProp[])
	const [open, setOpen] = useState(false)

	if (open) document.body.style.overflow = 'hidden'
	else document.body.style.overflow = 'auto'

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false)
		}
		window.addEventListener('keydown', handleEsc)

		window.addEventListener('click', (e) => {
			const backdrop = e.target as HTMLDivElement
			if (backdrop.dataset.backdrop === 'true') setOpen(false)
		})

		return () => {
			window.removeEventListener('keydown', handleEsc)
		}
	}, [])

	const handleFormSubmit = (formData: FormData) => {
		const startTime = formData.get('start-time') as string
		const endTime = formData.get('end-time') as string
		const title = formData.get('title') as string

		const startOffset = convertTimeToOffset(startTime, 9)
		const endOffset = convertTimeToOffset(endTime, 9)

		if (startOffset >= endOffset) {
			return alert('End time should be greater than start time')
		} else if (!title || !startTime || !endTime) {
			return alert('All fields are required')
		}

		const newEvent = {
			title,
			start: startOffset,
			end: endOffset,
		}
		setEventsList([...eventsList, newEvent])
		setOpen(false)
	}

	return (
		<>
			<header className="bg-slate-100 py-5 flex justify-between">
				<img src={Logo} alt="logo" />

				<div className="header__actions">
					<Button
						onClick={() => setOpen(true)}
						className="bg-slate-600 text-slate-100"
					>
						<AddIcon />
						New event
					</Button>
				</div>
			</header>
			<main>
				<CalendarView events={eventsList} />
			</main>
			<div className="backdrop" data-backdrop={open}></div>
			<EventForm
				open={open}
				onClose={() => setOpen(false)}
				onSubmit={handleFormSubmit}
			/>
		</>
	)
}

export default App
