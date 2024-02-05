import React from 'react'
import Button from './Button' // Import the Button component if it's not already imported

interface EventFormProps {
	open: boolean
	onClose: () => void
	onSubmit: (formData: FormData) => void
}

export default function EventForm({ open, onClose, onSubmit }: EventFormProps) {
	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		onSubmit(formData)
		e.currentTarget.reset()
	}

	return (
		<div
			className={`modal no-padding | w-[90%] max-w-[var(--width)] z-50 fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] p-4 bg-white shadow-md rounded-md ${
				open ? 'block' : 'hidden'
			}`}
		>
			<h2 className="text-2xl font-bold mb-5">New Event</h2>
			<form className="flex flex-col gap-3 w-full" onSubmit={handleFormSubmit}>
				<div className="flex flex-col gap-2">
					<label htmlFor="title">Title</label>
					<input type="text" name="title" id="title" required autoFocus />
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
						required
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
						required
					/>
				</div>
				<div className="flex justify-end gap-3">
					<Button onClick={onClose} className="bg-red-100 text-red-500">
						Cancel
					</Button>
					<Button className="bg-slate-600 text-slate-100" type="submit">
						Add
					</Button>
				</div>
			</form>
		</div>
	)
}
