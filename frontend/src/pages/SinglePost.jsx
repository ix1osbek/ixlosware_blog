import { Coffee, Share2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import { postsAPI } from '../services/api'

const SinglePost = () => {
	const { id } = useParams()
	const [post, setPost] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		const fetchPostData = async () => {
			try {
				setLoading(true)
				const data = await postsAPI.getPostById(id)
				setPost(data.data || data)
				setError('')
			} catch (err) {
				console.error(err)
				setError('Postni yuklashda xatolik yuz berdi.')
			} finally {
				setLoading(false)
			}
		}
		fetchPostData()
	}, [id])

	const handleBuyMeACoffee = () => {
		window.open('https://buymeacoffee.com/yourusername', '_blank')
	}

	const handleShare = () => {
		const postUrl = window.location.href
		navigator.clipboard.writeText(postUrl)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const formatDate = dateString => {
		if (!dateString) return ''
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}

	if (loading)
		return (
			<div className='flex justify-center items-center py-20'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700'></div>
			</div>
		)

	if (error)
		return (
			<div className='text-center py-20'>
				<p className='text-red-600 text-lg mb-4'>{error}</p>
				<Link to='/'>
					<Button variant='primary'>Back to Posts</Button>
				</Link>
			</div>
		)

	if (!post)
		return (
			<div className='text-center py-20'>
				<p className='text-gray-500 text-lg mb-4'>Post topilmadi.</p>
				<Link to='/'>
					<Button variant='primary'>Back to Posts</Button>
				</Link>
			</div>
		)

	return (
		<div className='max-w-4xl mx-auto px-4 pt-24 pb-24'>
			<Link to='/'>
				<Button variant='ghost' className='mb-6'>
					← Back to Posts
				</Button>
			</Link>

			<article className='bg-white rounded-2xl shadow-xl overflow-hidden'>
				{post.image && (
					<div className='w-full h-64 md:h-96 overflow-hidden'>
						<img
							src={post.image}
							alt={post.title}
							className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
						/>
					</div>
				)}

				<div className='p-6 md:p-10'>
					<h1 className='text-3xl md:text-4xl font-extrabold text-black mb-4'>
						{post.title}
					</h1>

					{/* Linklar ko‘k bo‘lib chiqadi */}
					<div
						className='post-content text-gray-700 leading-relaxed'
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>

					<div className='flex justify-center gap-4 mt-12 pt-8 border-t border-gray-200 items-center relative'>
						<Button
							onClick={handleBuyMeACoffee}
							className='flex items-center gap-2 bg-gradient-to-r from-[#6f4e37] via-[#a67c52] to-[#d2b48c] text-white font-semibold 
								px-3 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all
								text-sm sm:text-base'
							size='lg'
						>
							<Coffee className='w-4 h-4 sm:w-5 sm:h-5' />
							<span className='truncate'>Buy Me a Coffee</span>
						</Button>

						<div className='relative flex items-center'>
							<Button onClick={handleShare} variant='outline' size='md'>
								<Share2 /> Copy Post Link
							</Button>
							{copied && (
								<span className='absolute -right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded'>
									Copied!
								</span>
							)}
						</div>
					</div>

					{post.createdAt && (
						<p className='text-gray-500 text-sm mt-4 text-right'>
							{formatDate(post.createdAt)}
						</p>
					)}
				</div>
			</article>
		</div>
	)
}

export default SinglePost
