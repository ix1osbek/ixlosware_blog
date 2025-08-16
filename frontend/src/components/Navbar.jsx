import { Coffee, Home, Info, Search } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from './Button'

const Navbar = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const [searchQuery, setSearchQuery] = useState('')

	const navItems = [
		{ path: '/', label: 'Home', icon: Home },
		{ path: 'https://ixlosbek.uz', label: 'About', icon: Info, external: true },
	]

	const isActive = path => location.pathname === path

	const handleBuyMeACoffee = () => {
		window.open('https://tirikchilik.uz/ixlosbek_erkinov', '_blank')
	}

	const handleSearch = e => {
		e.preventDefault()
		if (searchQuery.trim()) {
			navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
			setSearchQuery('')
		}
	}

	return (
		<>
			{/* MOBILE TOP BAR */}
			<header className='md:hidden fixed top-0 left-0 w-full bg-blue-500 text-white shadow-lg z-50'>
				<div className='flex items-center justify-between px-3 py-2'>
					<span className='font-bold text-lg'>IxlosWare</span>

					<form
						onSubmit={handleSearch}
						className='flex items-center bg-white rounded-full px-2 py-1'
					>
						<input
							type='text'
							name='q'
							placeholder='Search...'
							value={searchQuery}
							onChange={e => setSearchQuery(e.target.value)}
							className='w-32 bg-transparent outline-none text-sm text-gray-700'
						/>
						<button type='submit' className='text-blue-500 hover:text-blue-600'>
							<Search size={18} />
						</button>
					</form>
				</div>
			</header>

			{/* MOBILE BOTTOM NAVBAR */}
			<div className='fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] bg-white/90 backdrop-blur-lg shadow-xl border border-gray-200 rounded-full flex justify-around items-center py-2 px-3 md:hidden z-50'>
				{navItems.map(item => {
					const active = isActive(item.path)
					const Icon = item.icon
					const textClass = active
						? 'text-blue-500 font-semibold'
						: 'text-gray-500 hover:text-blue-500'

					if (item.external) {
						return (
							<a
								key={item.path}
								href={item.path}
								target='_blank'
								rel='noopener noreferrer'
								className={`flex flex-col items-center text-xs transition-all ${textClass}`}
							>
								<Icon size={20} />
								<span>{item.label}</span>
							</a>
						)
					}

					return (
						<Link
							key={item.path}
							to={item.path}
							className={`flex flex-col items-center text-xs transition-all ${textClass}`}
						>
							<Icon size={20} />
							<span>{item.label}</span>
						</Link>
					)
				})}

				<Button
					onClick={handleBuyMeACoffee}
					className='flex items-center gap-2 bg-gradient-to-r from-[#6f4e37] via-[#a67c52] to-[#d2b48c] text-white font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all'
				>
					<Coffee size={18} className='text-white' /> Buy Me a Coffee
				</Button>
			</div>

			{/* DESKTOP NAVBAR */}
			<nav className='hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-md shadow-lg border border-gray-200 rounded-full px-6 py-3 items-center justify-between z-50'>
				<Link to='/' className='text-xl font-extrabold text-blue-500'>
					IxlosWare
				</Link>

				<form
					onSubmit={handleSearch}
					className='flex items-center bg-gray-100 rounded-full px-2 py-2'
				>
					<input
						type='text'
						name='q'
						placeholder='Search...'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className='bg-transparent outline-none text-sm px-2'
					/>
					<button type='submit' className='text-blue-500 hover:text-blue-600'>
						<Search size={18} />
					</button>
				</form>

				<div className='flex items-center space-x-4'>
					{navItems.map(item => {
						const active = isActive(item.path)
						const textClass = active
							? 'text-blue-500 font-semibold'
							: 'text-gray-700 hover:text-blue-500'

						if (item.external) {
							return (
								<a
									key={item.path}
									href={item.path}
									target='_blank'
									rel='noopener noreferrer'
									className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${textClass}`}
								>
									{item.label}
								</a>
							)
						}

						return (
							<Link
								key={item.path}
								to={item.path}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${textClass}`}
							>
								{item.label}
							</Link>
						)
					})}

					<Button
						onClick={handleBuyMeACoffee}
						className='flex items-center gap-2 bg-gradient-to-r from-[#6f4e37] via-[#a67c52] to-[#d2b48c] text-white font-semibold px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all'
					>
						<Coffee size={18} className='text-white' /> Buy Me a Coffee
					</Button>
				</div>
			</nav>
		</>
	)
}

export default Navbar
