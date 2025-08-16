import { Coffee, Home, Info } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png' // Adjust the path as necessary

const Navbar = () => {
	const location = useLocation()

	const navItems = [
		{ path: '/', label: 'Home', icon: Home },
		{ path: 'https://ixlosbek.uz/', label: 'About me', icon: Info },
	]

	const isActive = path => location.pathname === path

	const handleBuyMeACoffee = () => {
		window.open('https://tirikchilik.uz/ixlosbek_erkinov', '_blank')
	}

	return (
		<>
			{/* ===== Desktop Navbar ===== */}
			<header className='hidden md:block fixed top-0 left-0 w-full bg-black border-b border-gray-800 z-50'>
				<div className='max-w-6xl mx-auto px-6 py-3 flex items-center justify-between'>
					{/* Logo */}
					<Link
						to='/'
						className='flex items-center gap-2 text-xl font-extrabold text-cyan-400'
					>
						<img
							src={logo}
							alt='logo'
							className='h-10 w-10 object-contain' // balandlikni tugmaga mosladim
						/>
						<span>IxlosWare</span>
					</Link>

					{/* Center nav */}
					<nav className='flex items-center space-x-6'>
						{navItems.map(item => (
							<Link
								key={item.path}
								to={item.path}
								className={`text-sm font-medium transition-colors ${
									isActive(item.path)
										? 'text-cyan-400 font-semibold'
										: 'text-white hover:text-cyan-400'
								}`}
							>
								{item.label}
							</Link>
						))}
					</nav>

					{/* Buy me a coffee button */}
					<button
						onClick={handleBuyMeACoffee}
						className='flex items-center gap-2 border border-cyan-400 text-white px-4 py-2 rounded-full hover:bg-cyan-400 hover:text-black transition-all'
					>
						<Coffee size={18} />
						Buy me a coffee
					</button>
				</div>
			</header>

			{/* ===== Mobile Top Navbar ===== */}
			<header className='md:hidden fixed top-0 left-0 w-full bg-black border-b border-gray-800 z-50'>
				<div className='flex items-center justify-between px-4 py-3'>
					{/* Logo */}
					<Link
						to='/'
						className='flex items-center gap-2 text-lg font-extrabold text-cyan-400'
					>
						<img src={logo} alt='logo' className='h-8 w-8 object-contain' />
						<span>IxlosWare</span>
					</Link>

					{/* Coffee icon */}
					<button
						onClick={handleBuyMeACoffee}
						className='p-2 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all flex items-center gap-2'
					>
						<Coffee size={22} /> Buy me a coffee
					</button>
				</div>
			</header>

			{/* ===== Mobile Bottom Navbar (Sidebar style) ===== */}
			<nav className='md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-black border border-cyan-400 rounded-full shadow-lg flex justify-around items-center py-2 z-50'>
				{navItems.map(item => {
					const active = isActive(item.path)
					return (
						<Link
							key={item.path}
							to={item.path}
							className={`flex flex-col items-center text-xs ${
								active
									? 'text-cyan-400 font-semibold'
									: 'text-white hover:text-cyan-400'
							}`}
						>
							<item.icon size={20} />
							<span>{item.label}</span>
						</Link>
					)
				})}
			</nav>
		</>
	)
}

export default Navbar
