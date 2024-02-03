import { useState } from 'react'
import './App.css'
import { events } from './assets/events'
import Logo from './assets/logo.svg'
import CalendarView from './components/CalendarView'

function App() {
	const [eventsList, setEventsList] = useState(events as EventProp[])
	return (
		<>
			<header className="bg-slate-100 py-5">
				<img src={Logo} alt="logo" />
			</header>
			<main>
				<CalendarView events={eventsList} />
			</main>
		</>
	)
}

export default App
