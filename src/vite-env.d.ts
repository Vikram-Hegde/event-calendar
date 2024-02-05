/// <reference types="vite/client" />

interface EventProps {
	start: number
	end: number
	title: string
}

type CategorizedEventsProps = {
	[key: string]: EventProps[]
}
