import { format } from 'date-fns'
import { ArrowRight, Share2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

// --- HTML kontentni qirqish (linklarni buzmaydi) ---
const truncateContent = (html, maxLength = 50) => {
	if (!html) return ''
	const div = document.createElement('div')
	div.innerHTML = html
	const text = div.textContent || div.innerText || ''

	if (text.length <= maxLength) return text
	return text.substring(0, maxLength) + '...'
}

const PostCard = ({ post }) => {
	const [copied, setCopied] = useState(false)

	// --- Post linkni ulashish ---
	const handleShare = () => {
		const postUrl = `${window.location.origin}/post/${post._id}`
		navigator.clipboard.writeText(postUrl)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	// --- Sanani formatlash ---
	const formattedDate = post.createdAt
		? format(new Date(post.createdAt), 'MMM dd, yyyy')
		: ''

	return (
		<article className='bg-[#000] dark:bg-[#000] rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full border border-cyan-400'>
			{/* Rasm */}
			<div className='relative overflow-hidden aspect-video p-3'>
				<img
					src={
						post.image || 'https://via.placeholder.com/400x225?text=No+Image'
					}
					alt={post.title}
					className='w-full h-full object-cover transition-transform duration-500 hover:scale-110  rounded-xl'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
			</div>

			{/* Kontent */}
			<div className='p-5 flex flex-col flex-grow'>
				<div className='flex justify-between items-start mb-3'>
					<h2 className='text-xl md:text-2xl font-bold dark:text-white line-clamp-2'>
						{post.title}
					</h2>
					<p className='text-gray-200 text-sm md:text-base'>{formattedDate}</p>
				</div>

				{/* Qirqilgan kontent */}
				<p className='text-gray-200 text-sm md:text-base mb-4'>
					{truncateContent(post.content, 50)}
				</p>

				{/* Tugmalar */}
				<div className='flex gap-2 items-center mt-auto'>
					<Button
						as={Link}
						to={`/post/${post._id}`}
						variant='primary'
						size='md'
						className='flex-1 flex justify-center items-center gap-2'
					>
						Read More <ArrowRight className='w-4 h-4' />
					</Button>

					<div className='relative flex-1'>
						<Button
							onClick={handleShare}
							variant='primary'
							size='md'
							className='flex w-full justify-center items-center gap-2'
						>
							<Share2 className='w-4 h-4' /> Copy Link
						</Button>
						{copied && (
							<span className='absolute -right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded'>
								Copied Post Link
							</span>
						)}
					</div>
				</div>
			</div>
		</article>
	)
}

export default PostCard
