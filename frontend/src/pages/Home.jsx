import { Coffee, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import Button from '../components/Button'
import PostCard from '../components/PostCard'
import { postsAPI } from '../services/api'

const Home = () => {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(() => {
		fetchPosts()
	}, [])

	const fetchPosts = async () => {
		try {
			setLoading(true)
			const res = await postsAPI.getAllPosts()
			const postsData = res.data || []

			const sortedPosts = Array.isArray(postsData)
				? postsData.sort(
						(a, b) =>
							new Date(b.updatedAt || b.createdAt) -
							new Date(a.updatedAt || a.createdAt)
				  )
				: []

			setPosts(sortedPosts)
			setError('')
		} catch (err) {
			console.error('Error fetching posts:', err)
			setError('Failed to load posts. Please try again later.')
		} finally {
			setLoading(false)
		}
	}

	const handleBuyMeACoffee = () => {
		window.open('https://tirikchilik.uz/ixlosbek_erkinov', '_blank')
	}

	// Search orqali filter
	const filteredPosts = posts.filter(post =>
		post.title.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className='min-h-screen bg-[#010101] dark:bg-[#010101]'>
			<div className='dark:bg-[#010101] dark:text-gray-100 space-y-8 pt-16 md:pt-24 pb-24 md:pb-8 max-w-6xl mx-auto px-4 transition-colors duration-300 mt-4'>
				{/* Page Title */}
				<h1 className='text-3xl md:text-4xl font-bold dark:text-cyan-400 mb-4 text-center'>
					Posts
				</h1>

				{/* Search Input */}
				<div className='relative mb-8 w-full md:w-1/2 text-center mx-auto'>
					<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none' />
					<input
						type='text'
						placeholder='Search...'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						className='w-full pl-12 pr-4 py-2 rounded-lg bg-gray-800 dark:bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors'
					/>
				</div>

				{/* Loading State */}
				{loading && (
					<div className='flex justify-center items-center py-20'>
						<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-400 border-opacity-80'></div>
					</div>
				)}

				{/* Error State */}
				{!loading && error && (
					<div className='text-center py-16'>
						<p className='text-red-400 text-lg mb-4'>{error}</p>
						<Button onClick={fetchPosts} variant='primary'>
							Qayta urinib ko‘rish
						</Button>
					</div>
				)}

				{/* Posts Grid */}
				{!loading &&
					!error &&
					(filteredPosts.length === 0 ? (
						<div className='text-center py-16'>
							<p className='text-gray-400 text-lg'>
								Hozircha postlar topilmadi!
							</p>
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{filteredPosts.map(post => (
								<PostCard key={post._id} post={post} />
							))}
						</div>
					))}

				{/* Bottom Buy Me a Coffee Section */}
				{!loading && posts.length > 0 && (
					<div className='text-center py-12 mt-8 rounded-2xl'>
						<h3 className='text-2xl font-semibold dark:text-cyan-400 mb-4'>
							Support
						</h3>
						<p className='text-gray-400 mb-6 max-w-md mx-auto'>
							Agar siz ushbu blogni yoqtirsangiz va uni qo‘llab-quvvatlamoqchi
							bo‘lsangiz, Buy Me a Coffee orqali yordam bera olasiz.
						</p>
						<div className='max-w-xs mx-auto'>
							{' '}
							{/* tugmani markazga olish va kengligini cheklash */}
							<button
								onClick={handleBuyMeACoffee}
								className='p-2 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all flex items-center gap-2 mx-auto'
							>
								<Coffee size={22} /> Buy me a coffee
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
