import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import ImageUploader from '../components/ImageUploader'
import Navbar from '../components/Navbar'
import RichTextEditor from '../components/RichTextEditor'
import { postsAPI } from '../services/api'

const Admin = () => {
	const [posts, setPosts] = useState([])
	const [searchTerm, setSearchTerm] = useState('') // 🔍 qidiruv uchun state
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [imageFile, setImageFile] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')
	const [editingPostId, setEditingPostId] = useState(null)

	const fileInputRef = useRef(null)

	// Postlarni olish
	const fetchPosts = async () => {
		setLoading(true)
		try {
			const res = await postsAPI.getAllPosts()
			setPosts(res.data || [])
			setError('')
		} catch (err) {
			console.error(err)
			setError('Postlarni olishda xatolik yuz berdi!')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchPosts()
	}, [])

	// Post yaratish yoki yangilash
	const handleSubmit = async () => {
		if (!title.trim() || !content.trim()) {
			setError('Title va Content bo‘sh bo‘lishi mumkin emas!')
			setTimeout(() => setError(''), 2000)
			return
		}

		setLoading(true)
		setError('')
		setSuccess('')

		try {
			const formData = new FormData()
			formData.append('title', title)
			formData.append('content', content)
			if (imageFile) formData.append('image', imageFile)

			if (editingPostId) {
				await postsAPI.updatePost(editingPostId, formData)
				setSuccess('Post muvaffaqiyatli yangilandi!')
			} else {
				await postsAPI.createPost(formData)
				setSuccess('Post muvaffaqiyatli yaratildi!')
			}

			// Reset form
			setTitle('')
			setContent('')
			setImageFile(null)
			setEditingPostId(null)
			if (fileInputRef.current) fileInputRef.current.value = ''
			fetchPosts()
		} catch (err) {
			console.error(err)
			setError('Post yaratishda yoki yangilashda xatolik yuz berdi!')
		} finally {
			setLoading(false)
		}

		setTimeout(() => {
			setError('')
			setSuccess('')
		}, 2000)
	}

	// Edit
	const handleEdit = post => {
		setEditingPostId(post._id)
		setTitle(post.title)
		setContent(post.content)
		setImageFile(null)
		if (fileInputRef.current) fileInputRef.current.value = ''
	}

	// Delete
	const handleDelete = async id => {
		if (!window.confirm('Haqiqatan ham ushbu postni o‘chirmoqchimisiz?')) return
		try {
			await postsAPI.deletePost(id)
			fetchPosts()
		} catch (err) {
			console.error(err)
			alert('Postni o‘chirishda xatolik yuz berdi!')
		}
	}

	// 🔍 Qidiruv bo‘yicha filterlangan postlar
	const filteredPosts = posts.filter(
		post =>
			post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			post.content.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<>
			<Navbar />
			<div className='mt-6 max-w-6xl mx-auto space-y-8 pt-16 pb-24 px-4'>
				<h1 className='text-3xl md:text-4xl font-bold text-center mb-6'>
					Admin Panel
				</h1>

				{/* Logout */}
				<div className='flex justify-end mb-6'>
					<Button
						variant='danger'
						onClick={() => {
							localStorage.removeItem('token')
							window.location.href = '/'
						}}
						className='px-6 py-2'
					>
						Logout
					</Button>
				</div>

				{/* Post yaratish / edit */}
				<div className='bg-white shadow-lg rounded-2xl p-6 space-y-4'>
					<div>
						<label className='block font-medium mb-1'>Title</label>
						<input
							type='text'
							value={title}
							onChange={e => setTitle(e.target.value)}
							className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-400'
							placeholder='Post sarlavhasi'
						/>
					</div>

					<div>
						<label className='block font-medium mb-1'>Content</label>
						<RichTextEditor
							value={content}
							onChange={setContent}
							placeholder='Postning matni shu yerda...'
						/>
					</div>

					<div>
						<label className='block font-medium mb-1'>Image</label>
						<ImageUploader
							key={success || editingPostId}
							currentImage=''
							onImageUpload={fileOrUrl => setImageFile(fileOrUrl)}
							className='mb-4'
							ref={fileInputRef}
						/>
					</div>

					<div className='flex items-center gap-4'>
						<Button
							onClick={handleSubmit}
							disabled={loading}
							className='px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
						>
							{loading
								? 'Jarayon...'
								: editingPostId
								? 'Yangilash'
								: 'Yaratish'}
						</Button>

						{error && <p className='text-red-600 text-sm'>{error}</p>}
						{success && <p className='text-green-600 text-sm'>{success}</p>}
					</div>
				</div>

				{/* Postlar */}
				<div className='mt-8'>
					<h2 className='text-2xl font-semibold mb-4'>Barcha postlar</h2>

					{/* 🔍 Search input */}
					<div className='mb-6'>
						<input
							type='text'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className='w-full md:w-1/2 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-400 outline-none'
							placeholder='Postlarni qidirish...'
						/>
					</div>

					{loading && <p>Yuklanmoqda...</p>}
					{!loading && filteredPosts.length === 0 && (
						<p className='text-gray-500'>Hech narsa topilmadi.</p>
					)}

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredPosts.map(post => (
							<div
								key={post._id}
								className='bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300'
							>
								{post.image && (
									<img
										src={post.image}
										alt={post.title}
										className='h-48 w-full object-cover rounded mb-3'
									/>
								)}
								<h3 className='font-bold text-lg mb-2 line-clamp-2'>
									{post.title}
								</h3>
								<p className='text-gray-600 mb-3 line-clamp-3'>
									{post.content.replace(/<[^>]+>/g, '').substring(0, 120)}...
								</p>
								<div className='flex justify-between mt-2'>
									<Button
										onClick={() => handleEdit(post)}
										variant='outline'
										className='px-3 py-1 text-sm'
									>
										Edit
									</Button>
									<Button
										onClick={() => handleDelete(post._id)}
										variant='danger'
										className='px-3 py-1 text-sm'
									>
										Delete
									</Button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default Admin
