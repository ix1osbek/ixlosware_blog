import axios from 'axios'

const API_BASE_URL = 'https://ixlosware-blog.onrender.com/api'

// axios instance
const api = axios.create({
	baseURL: API_BASE_URL,
})

// Posts API
export const postsAPI = {
	getAllPosts: async () => {
		const response = await api.get('/posts')
		return response.data
	},

	getPostById: async id => {
		const response = await api.get(`/posts/${id}`)
		return response.data
	},

	createPost: async postData => {
		const token = localStorage.getItem('token')
		const response = await api.post('/admin/posts', postData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data
	},

	updatePost: async (id, postData) => {
		const token = localStorage.getItem('token')
		const response = await api.put(`/admin/posts/${id}`, postData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data
	},

	deletePost: async id => {
		const token = localStorage.getItem('token')
		const response = await api.delete(`/admin/posts/${id}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
		return response.data
	},
}

export default api
