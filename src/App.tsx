import { useState } from 'react'
import './App.css'
import { events } from './assets/events'
import Logo from './assets/logo.svg'
import CalendarView from './components/CalendarView'

function App() {
	const [eventsList, setEventsList] = useState(events as EventProp[])

	const sortedEventsList = eventsList.sort((a, b) => a.start - b.start)

	console.log(sortedEventsList)

	return (
		<>
			<header className="bg-slate-100 py-5">
				<img src={Logo} alt="logo" />
			</header>
			<main>
				<CalendarView events={sortedEventsList} />
			</main>
			<button
				onClick={() => {
					setEventsList([
						...eventsList,
						{
							start: 30,
							end: 100,
							title: 'New event',
						},
					])
				}}
			>
				Add event
			</button>
		</>
	)
}

export default App
