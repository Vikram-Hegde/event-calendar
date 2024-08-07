import { CSSProperties } from 'react'
import { getHeight, getLeft, getTop, getWidth } from '../utils/getDimensions'

export default function CalendarEvent({
	item,
	index,
	calendarEventsWidth,
	eventLength,
}: {
	item: EventProps | object
	index: number
	calendarEventsWidth: number
	eventLength: number
}) {
	if (!('title' in item)) return null

	const eventDimensions: CSSProperties = {
		top: getTop(item),
		height: getHeight(item),
		width: getWidth(calendarEventsWidth, eventLength),
		left: getLeft(calendarEventsWidth, eventLength, index),
	}

	return (
		<div
			key={item.title + item.start + Math.random() * 100}
			className="calendar__event | absolute overflow-hidden grid gap-[6px] content-start bg-white p-1.5 border border-solid border-gray-200 border-l-4 border-l-[#181e30] rounded-e"
			style={eventDimensions}
		>
			<div
				className="calendar__event-title | leading-[1cap] text-sm text-[#181e30] font-semibold"
				title={`${item.title}`}
			>
				{item.title}
			</div>

			{item.end - item.start > 30 && (
				<div className="calendar__event-subtitle | text-xs text-gray-400 leading-[1cap]">
					Sample location
				</div>
			)}
		</div>
	)
}
