import { useState } from 'react'
import './App.css'
import { events } from './assets/events'
import Logo from './assets/icons/logo.svg'
import CalendarView from './components/CalendarView'
import Button from './components/Button'
import AddIcon from './assets/icons/AddIcon'

// let counter = 1

function App() {
	const [eventsList, setEventsList] = useState(events as EventProp[])

	return (
		<>
			<header className="bg-slate-100 py-5 flex justify-between">
				<img src={Logo} alt="logo" />

				<div className="header__actions">
					<Button className="bg-slate-600 text-slate-100">
						<AddIcon />
						New event
					</Button>
				</div>
			</header>
			<main>
				<CalendarView events={eventsList} />
			</main>
		</>
	)
}

export default App
