import { useEffect } from 'react'

interface BackdropProps {
	open: boolean
	setOpen: (open: boolean) => void
}

export default function Backdrop({ open, setOpen }: BackdropProps) {
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false)
		}
		const handleBackdropClick = (e: MouseEvent) => {
			const backdrop = e.target as HTMLDivElement
			if (backdrop.dataset.backdrop === 'true') setOpen(false)
		}

		window.addEventListener('keydown', handleEsc)
		window.addEventListener('click', handleBackdropClick)

		return () => {
			window.removeEventListener('keydown', handleEsc)
			window.removeEventListener('click', handleBackdropClick)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return <div className="backdrop" data-backdrop={open} />
}
