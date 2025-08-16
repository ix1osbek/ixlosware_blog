import api from './api'

export const authAPI = {
	login: async (username, password) => {
		const response = await api.post('/admin/login', { username, password })
		const { token } = response.data
		if (token) {
			localStorage.setItem('token', token)
		}
		return response.data
	},

	logout: () => {
		localStorage.removeItem('token')
	},

	isAuthenticated: () => {
		return !!localStorage.getItem('token')
	},
}
