import { CSSProperties } from 'react'
import { getHeight, getLeft, getTop, getWidth } from '../utils/getDimensions'

export default function CalendarEvent({
	item,
	index,
	calendarEventsWidth,
	eventLength,
}: {
	item: EventProps
	index: number
	calendarEventsWidth: number
	eventLength: number
}) {
	const eventDimensions: CSSProperties = {
		top: getTop(item),
		height: getHeight(item),
		width: getWidth(calendarEventsWidth, eventLength),
		left: getLeft(calendarEventsWidth, eventLength, index),
		// width: `calc(${calendarEventsWidth}px / ${event.length})`,
		// left: `calc(${calendarEventsWidth}px / ${event.length} * ${i})`,
	}

	return (
		<div
			key={item.title + item.start + Math.random() * 100}
			className="calendar__event | absolute overflow-hidden grid gap-1.5 content-start bg-white p-1.5 border border-solid border-gray-200 border-l-2 border-l-blue-900 rounded-e"
			style={eventDimensions}
		>
			<div className="calendar__event-title | leading-[1cap] text-sm text-blue-500 font-semibold">
				{item.title}
			</div>

			{item.end - item.start > 45 && (
				<div className="calendar__event-subtitle | text-xs text-gray-400">
					Sample location
				</div>
			)}
		</div>
	)
}