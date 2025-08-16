import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

const ImageUploader = forwardRef(
	({ onImageUpload, currentImage = '', className = '' }, ref) => {
		const [previewUrl, setPreviewUrl] = useState(currentImage)
		const [selectedFile, setSelectedFile] = useState(null)
		const [error, setError] = useState('')

		const fileInputRef = useRef(null)
		useImperativeHandle(ref, () => fileInputRef.current)

		const handleFileSelect = e => {
			const file = e.target.files[0]
			if (!file) return
			if (!file.type.startsWith('image/')) {
				setError('Iltimos rasm faylini tanlang')
				return
			}
			if (file.size > 5 * 1024 * 1024) {
				setError('Rasm hajmi 5MB dan oshmasligi mumkin emas')
				return
			}
			setError('')
			setSelectedFile(file)
			setPreviewUrl(URL.createObjectURL(file))
			onImageUpload(file)
		}

		const handleRemove = () => {
			setSelectedFile(null)
			setPreviewUrl('')
			onImageUpload(null)
			if (fileInputRef.current) fileInputRef.current.value = ''
			setError('')
		}

		return (
			<div className={`flex flex-col items-center ${className}`}>
				<label className='cursor-pointer w-full max-w-md flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-300 text-center'>
					<input
						ref={fileInputRef}
						type='file'
						accept='image/*'
						onChange={handleFileSelect}
						className='hidden'
					/>
					<span className='text-gray-500'>
						{previewUrl
							? 'Rasmni o‘zgartirish uchun bosing'
							: 'Rasm yuklash uchun bosing'}
					</span>
				</label>

				{error && <p className='text-red-600 mt-2 text-sm'>{error}</p>}

				{previewUrl && (
					<div className='relative mt-4 w-full max-w-md'>
						<img
							src={previewUrl}
							alt='Preview'
							className='w-full h-60 sm:h-48 md:h-64 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105'
						/>
						<button
							type='button'
							onClick={handleRemove}
							className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 shadow-lg transition-colors'
						>
							×
						</button>
					</div>
				)}
			</div>
		)
	}
)

export default ImageUploader
