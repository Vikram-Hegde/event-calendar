import { useEffect, useState } from 'react'
import './App.css'
import { events } from './assets/events'
import Logo from './assets/icons/logo.svg'
import CalendarView from './components/CalendarView'
import Button from './components/Button'
import AddIcon from './assets/icons/AddIcon'

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

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		function convertTimeToOffset(time: string, offsetStart: number) {
			const [hour, minute] = time.split(':').map((time) => parseInt(time))
			const isPM = time.includes('PM')
			const offset = (hour - offsetStart) * 60 + minute
			if (isPM) {
				return offset + 12 * 60
			}
			return offset
		}

		// convert start-time and end-time to a number which is the offset in terms of minutes from 9:00 AM
		const startTime = formData.get('start-time') as string
		const endTime = formData.get('end-time') as string
		const startOffset = convertTimeToOffset(startTime, 9)
		const endOffset = convertTimeToOffset(endTime, 9)
		const title = formData.get('title') as string

		if (startOffset >= endOffset) {
			console.log(' i was called ')
			return alert('End time should be greater than start time')
		} else if (!title || !startTime || !endTime) {
			return alert('All fields are required')
		}

		// create the event object
		const newEvent = {
			title,
			start: startOffset,
			end: endOffset,
		}
		setEventsList([...eventsList, newEvent])
		setOpen(false)
		e.currentTarget.reset()
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
			{open && (
				<div className="modal no-padding | w-[90%] max-w-[var(--width)] z-50 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-4 bg-white shadow-md rounded-md">
					<h2 className="text-2xl font-bold mb-5">New Event</h2>
					<form
						className="flex flex-col gap-3 w-full"
						onSubmit={handleFormSubmit}
					>
						<div className="flex flex-col gap-2">
							<label htmlFor="title">Title</label>
							<input type="text" name="title" id="title" autoFocus />
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="start-time">Start Time</label>
							<input
								type="time"
								name="start-time"
								id="start-time"
								step={60}
								className="w-full"
								pattern="^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][Mm]$"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<label htmlFor="end-time">End Time</label>
							<input
								type="time"
								name="end-time"
								id="end-time"
								className="w-full"
								step={60}
								pattern="^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][Mm]$"
							/>
						</div>
						<div className="flex justify-end gap-3">
							<Button
								onClick={() => setOpen(false)}
								className="bg-slate-600 text-slate-100"
							>
								Cancel
							</Button>
							<Button className="bg-slate-600 text-slate-100" type="submit">
								Add
							</Button>
						</div>
					</form>
				</div>
			)}
		</>
	)
}

export default App
