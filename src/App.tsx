import { useState } from 'react'
import './App.css'
import { events } from './assets/events'
import Logo from './assets/icons/logo.svg'
import CalendarView from './components/CalendarView'

let counter = 1

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
			<button
				onClick={() => {
					setEventsList([
						...eventsList,
						{
							start: Math.floor(Math.random() * 600),
							get end() {
								return this.start + Math.floor(Math.random() * 120)
							},
							title: `New event ${counter++}`,
						},
					])
				}}
			>
				Add event
			</button>
			<button onClick={() => setEventsList(events)}>Update</button>
		</>
	)
}

export default App
