const Button = ({
	children,
	variant = 'primary',
	size = 'md',
	className = '',
	disabled = false,
	onClick,
	type = 'button',
	as: Component = 'button',
	fullWidth = false, // yangi prop
	...props
}) => {
	const baseClasses =
		'flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95'

	const variantClasses = {
		primary:
			'bg-gray-800 text-white shadow-md hover:bg-gray-700 focus:ring-gray-600',
		danger: 'bg-red-700 text-white hover:bg-red-600 focus:ring-red-500',
		success: 'bg-green-700 text-white hover:bg-green-600 focus:ring-green-500',
		outline:
			'border-2 border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-white focus:ring-0',
		ghost: 'text-gray-200 hover:bg-gray-700 hover:text-white focus:ring-0',
	}

	const sizeClasses = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base',
		xl: 'px-8 py-4 text-lg',
	}

	const widthClass = fullWidth ? 'w-full' : ''

	const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`

	return (
		<Component
			type={type}
			className={classes}
			disabled={disabled}
			onClick={onClick}
			{...props}
		>
			{children}
		</Component>
	)
}

export default Button
