import { forwardRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const RichTextEditor = forwardRef(
	({ value, onChange, placeholder = 'Write your content here...' }, ref) => {
		const modules = {
			toolbar: [
				[{ header: [1, 2, 3, false] }],
				['bold', 'italic', 'underline', 'strike'],
				[{ list: 'ordered' }, { list: 'bullet' }],
				[{ color: [] }, { background: [] }],
				[{ align: [] }],
				['link'],
				['clean'],
			],
		}

		const formats = [
			'header',
			'bold',
			'italic',
			'underline',
			'strike',
			'list',
			'bullet',
			'color',
			'background',
			'align',
			'link',
		]

		return (
			<div className='rich-text-editor'>
				<ReactQuill
					ref={ref}
					theme='snow'
					value={value}
					onChange={onChange}
					modules={modules}
					formats={formats}
					placeholder={placeholder}
					className='bg-white'
					style={{
						maxHeight: '300px',
						overflowY: 'auto',
						marginBottom: '20px',
					}}
				/>
			</div>
		)
	}
)

export default RichTextEditor
