import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { postsAPI } from '../services/api'

const SearchResults = () => {
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const searchQuery = queryParams.get('q') || ''

	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true)
			setError('')
			try {
				const res = await postsAPI.getAllPosts()
				const allPosts = res.data || []

				// HTML teglarni olib tashlash
				const filteredPosts = allPosts.filter(post => {
					const text = (post.title + ' ' + (post.content || ''))
						.replace(/<[^>]+>/g, '')
						.toLowerCase()
					return text.includes(searchQuery.toLowerCase())
				})

				setPosts(filteredPosts)
			} catch (err) {
				console.error(err)
				setError('Postlarni olishda xatolik yuz berdi!')
			} finally {
				setLoading(false)
			}
		}

		if (searchQuery.trim()) {
			fetchPosts()
		} else {
			setPosts([])
		}
	}, [searchQuery])

	return (
		<div className='max-w-7xl mx-auto px-4 pt-28 pb-12'>
			<h1 className='text-3xl md:text-4xl font-bold text-center mb-10'>
				Qidiruv natijalari: <span className='text-blue-500'>{searchQuery}</span>
			</h1>

			{loading && (
				<p className='text-center text-gray-500 text-lg'>Yuklanmoqda...</p>
			)}
			{error && <p className='text-center text-red-600 text-lg'>{error}</p>}

			{!loading && !error && posts.length === 0 && (
				<p className='text-center text-gray-500 text-lg'>
					Hech qanday post topilmadi.
				</p>
			)}

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6'>
				{posts.map(post => (
					<PostCard key={post._id} post={post} />
				))}
			</div>
		</div>
	)
}

export default SearchResults
