/// <reference types="vite/client" />

interface Event {
	start: number
	end: number
	title: string
}

type CategorizedEvents = {
	[key: string]: Event[]
}
