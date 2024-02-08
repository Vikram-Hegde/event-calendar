/// <reference types="vite/client" />

interface EventProps {
	start: number
	end: number
	title: string
	index: number
}

type CategorizedEventsProps = {
	[key: string]: EventProps[]
}
