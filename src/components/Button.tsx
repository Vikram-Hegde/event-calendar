import { ReactNode } from 'react'

interface ButtonProp {
	onClick?: () => void
	className?: string
	children?: ReactNode
	type?: 'button' | 'submit' | 'reset'
}
export default function Button({
	onClick = () => {},
	className,
	children,
	type = 'button',
}: ButtonProp) {
	return (
		<button
			className={`py-1.5 px-3 flex items-center gap-2 rounded-md font-semibold ${className}`}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	)
}
