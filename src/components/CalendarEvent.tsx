import { CSSProperties } from 'react'

export default function CalendarEvent({
	item,
	index,
	calendarEventsWidth,
	eventLength,
}: {
	item: EventProp
	index: number
	calendarEventsWidth: number
	eventLength: number
}) {
	return (
		<div
			key={item.title + item.start + Math.random() * 100}
			className="calendar__event | absolute overflow-hidden grid gap-1.5 content-start bg-white p-1.5 border border-solid border-gray-200 border-l-2 border-l-blue-900 rounded-e"
			style={
				{
					top: `${29 * (item.start / 60) * 2 + 14}px`,
					height: `${item.end - item.start}px`,
					width: `max(calc(${calendarEventsWidth}px / ${eventLength}), 170px)`,
					left:
						calendarEventsWidth / eventLength > 170
							? `calc(${calendarEventsWidth}px / ${eventLength} * ${index})`
							: `calc(170px * ${index})`,
					// width: `calc(${calendarEventsWidth}px / ${event.length})`,
					// left: `calc(${calendarEventsWidth}px / ${event.length} * ${i})`,
				} as CSSProperties
			}
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
