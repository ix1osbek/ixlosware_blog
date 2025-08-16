import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'
import { authAPI } from '../services/authAPI'

const Login = () => {
	const navigate = useNavigate()
	const [form, setForm] = useState({ username: '', password: '' })
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setError('')
		setLoading(true)
		try {
			await authAPI.login(form.username, form.password)
			navigate('/admin')
		} catch (err) {
			setError(err.message || 'Login failed')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
			<div className='max-w-md w-full bg-white rounded-2xl shadow-lg p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 bg-clip-text text-transparent'>
					Admin Login
				</h2>

				{error && (
					<p className='bg-red-50 text-red-600 text-sm p-2 rounded-lg mb-4'>
						{error}
					</p>
				)}

				<form onSubmit={handleSubmit} className='space-y-4'>
					<Input
						label='Username'
						type='text'
						name='username'
						value={form.username}
						onChange={handleChange}
						required
					/>
					<Input
						label='Password'
						type='password'
						name='password'
						value={form.password}
						onChange={handleChange}
						required
					/>
					<Button
						type='submit'
						variant='primary'
						size='lg'
						className='w-full'
						disabled={loading}
					>
						{loading ? 'Logging in...' : 'Login'}
					</Button>
				</form>
			</div>
		</div>
	)
}

export default Login
