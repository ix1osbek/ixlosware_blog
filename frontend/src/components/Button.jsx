const Button = ({
	children,
	variant = 'primary',
	size = 'md',
	className = '',
	disabled = false,
	onClick,
	type = 'button',
	as: Component = 'button', // default component = 'button'
	...props
}) => {
	const baseClasses =
		'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95'

	const variantClasses = {
		primary:
			'bg-gradient-to-r from-[#34a4b0] to-black text-white shadow-lg hover:shadow-xl focus:ring-[#34a4b0]',
		danger:
			'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg focus:ring-red-400',
		success:
			'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg focus:ring-green-400',
		outline:
			'border-2 border-[#34a4b0] text-[#34a4b0] hover:bg-[#34a4b0]/10 focus:ring-0',
		ghost: 'text-[#34a4b0] hover:bg-[#34a4b0]/10 focus:ring-0',
	}

	const sizeClasses = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-sm',
		lg: 'px-6 py-3 text-base',
		xl: 'px-8 py-4 text-lg',
	}

	const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

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
