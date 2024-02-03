/// <reference types="vite/client" />

interface EventProp {
	start: number
	end: number
	title: string
}

type CategorizedEventsProp = {
	[key: string]: EventProp[]
}
