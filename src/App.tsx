import { useState } from 'react'
import './App.css'
import { events } from './assets/events'
import Logo from './assets/icons/logo.svg'
import CalendarView from './components/CalendarView'
import Button from './components/Button'
import AddIcon from './assets/icons/AddIcon'
import {
	Dialog,
	DialogHeading,
	Form,
	FormError,
	FormInput,
	FormLabel,
	useFormStore,
} from '@ariakit/react'

// let counter = 1

function App() {
	const [eventsList] = useState(events as EventProp[])
	const [open, setOpen] = useState(false)
	const eventForm = useFormStore({
		defaultValues: { title: '', start: '', end: '' },
	})

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
			<Dialog open={open} onClose={() => setOpen(false)} className="dialog">
				<DialogHeading>
					<h2 className="text-2xl font-bold">Add New Event</h2>
				</DialogHeading>
				<Form store={eventForm} aria-labelledby="add-new-event">
					<div className="field">
						<FormLabel name={eventForm.names.title}>Title</FormLabel>
						<FormInput
							name={eventForm.names.title}
							placeholder="Event Title"
							required
						/>
					</div>
					<div className="field">
						<FormLabel name={eventForm.names.start}>Start time</FormLabel>
						<FormInput
							name={eventForm.names.start}
							placeholder="Event Title"
							min={0}
							max={719}
							required
						/>
						<FormError name={eventForm.names.start} className="error" />
					</div>
					<div className="field">
						<FormLabel name={eventForm.names.end}>End time</FormLabel>
						<FormInput
							name={eventForm.names.end}
							placeholder="Event Title"
							min={0}
							max={720}
							required
						/>
						<FormError name={eventForm.names.end} className="error" />
					</div>
				</Form>
			</Dialog>
			<main>
				<CalendarView events={eventsList} />
			</main>
		</>
	)
}

export default App
