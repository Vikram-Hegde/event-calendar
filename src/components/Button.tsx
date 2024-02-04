import { ReactNode } from 'react'

interface ButtonProp {
	onClick?: () => void
	className: string
	children: ReactNode
}
export default function Button({
	onClick = () => {},
	className,
	children,
}: ButtonProp) {
	return (
		<button
			className={`py-1.5 px-2 flex items-center gap-2 rounded-md ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
