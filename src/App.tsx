import { useState } from 'react'
import './App.css'
import { events } from './assets/events'
import AddIcon from './assets/icons/AddIcon'
import Logo from './assets/icons/logo.svg'
import Backdrop from './components/Backdrop'
import Button from './components/Button'
import CalendarView from './components/CalendarView'
import EventForm from './components/EventForm'

function App() {
	const [eventsList, setEventsList] = useState(events as EventProps[])
	const [open, setOpen] = useState(false)

	const handleNewEvent = (event: EventProps) => {
		setEventsList([...eventsList, event])
		setOpen(false)
	}

	return (
		<>
			<header className="bg-slate-100 py-5 flex justify-between">
				<img src={Logo} alt="logo" />

				<div className="header__actions">
					<Button
						onClick={() => setOpen(true)}
						className="bg-slate-600 hover:bg-slate-700 active:scale-95 text-slate-100"
					>
						<AddIcon />
						New event
					</Button>
				</div>
			</header>
			<main>
				<CalendarView events={eventsList} />
			</main>
			<EventForm
				open={open}
				onClose={() => setOpen(false)}
				onSubmit={handleNewEvent}
			/>
			<Backdrop open={open} setOpen={setOpen} />
		</>
	)
}

export default App
